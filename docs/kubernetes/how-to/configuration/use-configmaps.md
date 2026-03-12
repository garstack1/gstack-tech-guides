# Use ConfigMaps
## Problem

Applications often require configuration such as:

- API endpoints
- feature flags
- application settings

Hardcoding these values inside container images makes them difficult to change.

Kubernetes **ConfigMaps** allow configuration to be injected into pods.

---



## Step 1 — Create a ConfigMap

Create configmap.yaml.
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  API_URL: https://api.example.com
```


Apply it.
```bash
kubectl apply -f configmap.yaml
```

Verify.
```bash
kubectl get configmap
```

Expected output:
```console
NAME         DATA
app-config   2
```


---



## Step 2 — Use ConfigMap in Deployment

Update the deployment.

`deployment.yaml`
```yaml
envFrom:
  - configMapRef:
      name: app-config
```

Full container example:
```yaml
containers:
  - name: app
    image: nginx
    envFrom:
      - configMapRef:
          name: app-config
```


Apply.
```bash
kubectl apply -f deployment.yaml
```


---



## Step 3 — Verify Environment Variables

Enter the pod.
```bash
kubectl exec -it <pod-name> -- /bin/sh
```

Check variables.
```bash
env
```

Expected:
```console
APP_ENV=production
API_URL=https://api.example.com
```

---



## Troubleshooting
**ConfigMap Not Found**

Check:
```bash
kubectl get configmap
```
---



**Pod Not Restarting**

ConfigMap updates do not restart pods automatically.

Restart deployment.
```bash
kubectl rollout restart deployment <deployment-name>
```


---