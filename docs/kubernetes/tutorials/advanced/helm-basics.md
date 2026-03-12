# Advanced Kubernetes Part 2: Helm Basics – Packaging & Managing Apps

By now you've hand-written Deployments, Services, ConfigMaps, Secrets, etc.  
That's great for learning, but in real projects, repeating that YAML for every app (or version) is painful and error-prone.

**Helm** is Kubernetes' official package manager.  
It bundles YAML templates + values into **charts**, reusable, versioned packages.  
You can install, upgrade, rollback, or delete entire apps with one command.

Pizza chain analogy:  
- Hand-written YAML = writing a new recipe from scratch every time  
- Helm chart = a pre-made recipe book with fill-in-the-blanks (values.yaml)  
  → Change sauce type or number of ovens → run `helm upgrade` → done

---



## Goal for this section

Install Helm locally  
Deploy nginx using the official Bitnami nginx chart  
Customize it (replicas, config)  
Upgrade & rollback  
See how much easier this is than raw kubectl

---



## Step 1: Install Helm
Helm is just a client binary, no cluster-side component.

=== "🪟 Windows"

    ```bash
    choco install kubernetes-helm
    ```

=== "🍎 Mac"

    ```bash
    brew install helm
    ```

=== "🐧 Linux"

    ```bash
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
    ```


Verify:
```bash
helm version
```

→ You should see something like version.BuildInfo{Version:"v3.16.x"...}

---



## Step 2: Add a chart repository

Helm charts are hosted in repos (like Docker Hub for images).

Add the popular Bitnami repo (lots of high-quality charts):
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

Search for nginx:
```bash
helm search repo nginx
```

→ You'll see bitnami/nginx (official, well-maintained)

---



## Step 3: Install nginx via Helm

Run:
```bash
helm install my-nginx bitnami/nginx \
  --set replicaCount=3 \
  --set service.type=NodePort
```

What this does:

- Installs the chart named my-nginx
- Overrides defaults: 3 replicas, NodePort service
- Helm creates Deployment, Service, ConfigMap, etc. automatically

Check:
```bash
kubectl get all
helm list
```

→ See the 3 Pods, Service, and Helm release.

Open in browser:
```bash
minikube service my-nginx-nginx
```

→ Welcome to nginx!

---



## Step 4: Customize with values.yaml (real power)

Create a file custom-values.yaml:
```yaml
replicaCount: 5

image:
  tag: "1.25"           # pin version

service:
  type: NodePort
  nodePorts:
    http: 30080         # fixed port (optional)

ingress:
  enabled: true
  hostname: nginx.local
  path: /
```

Upgrade the release:
```bash
helm upgrade my-nginx bitnami/nginx -f custom-values.yaml
```

→ Replicas → 5, Ingress created (if you enabled Ingress addon earlier), port fixed

Check:
```bash
kubectl get pods   # 5 replicas now
helm get values my-nginx   # see applied values
```

---




## Step 5: Rollback if something breaks

Simulate a bad change : set wrong image tag:
```bash
helm upgrade my-nginx bitnami/nginx --set image.tag=bad-tag
```

Pods will fail (ImagePullBackOff).

Rollback to previous revision:
```bash
helm rollback my-nginx 1   # or 2, 3... (check with helm history my-nginx)
```

→ Back to working state instantly.

---



## Step 6: Cleanup

Uninstall the chart:
```bash
helm uninstall my-nginx
```

→ Deletes all resources created by the chart (Deployment, Service, etc.)

---



## Key Takeaways

- Helm = templated, reusable YAML + one-command install/upgrade/rollback
- Charts = pre-packaged apps (bitnami/nginx, bitnami/postgresql, wordpress, etc.)
- values.yaml = your customizations (replicas, images, config, ingress…)
- helm repo + search → discover charts
- Production: Use Helmfile, Helmfile + GitOps, or ChartMuseum for private charts

This is a game-changer for managing complexity, most advanced Kubernetes users rely on Helm daily.

---

[→ Next: Part 3 – Resource Limits, Requests & Horizontal Pod Autoscaler (HPA)](../advanced/resource-limits-and-requests.md)

---