

## Bonus: ConfigMap as Volume Mount – Inject Files into the Container

Environment variables are great for single values, but many apps need **configuration files** (e.g. nginx.conf, app.yaml, .properties files).

You can mount a ConfigMap as a **volume** — Kubernetes creates files inside the container with the exact key/value content from the ConfigMap.

### Step 1: Create a ConfigMap with file-like content
1. We'll make a simple custom nginx.conf snippet. Run the following bash command:
   ```bash
   kubectl create configmap nginx-conf \
  --from-literal=nginx.conf="server {
    listen 80;
    location / {
      return 200 'Hello from custom ConfigMap config!\n';
    }
  }"
   ```

2. Verify
```bash
kubectl describe configmap nginx-conf
```
You’ll see the key `nginx.conf` with the config content.

### Step 2: Update your Deployment to mount the ConfigMap as a volume
1. Edit `nginx-deployment.yaml` and add these two sections under spec.template.spec:
```yaml
volumes:
      - name: config-volume
        configMap:
          name: nginx-conf           # The ConfigMap we created
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80
        volumeMounts:
        - name: config-volume
          mountPath: /etc/nginx/conf.d/default.conf   # nginx reads config from here
          subPath: nginx.conf                         # only mount this one key
```

**What this does in plain English**:
- **volumes**: defines a volume called `custom-config-volume` sourced from the ConfigMap
- **volumeMounts:** mounts that volume inside the container at `/etc/nginx/conf.d/default.conf`
- **subPath: nginx.conf:** tells Kubernetes to use only the `nginx.conf` key from the ConfigMap as the single file (instead of creating a folder with all keys)

2. Apply the change:
```bash
kubectl apply -f nginx-deployment.yaml
```
Kubernetes will roll out new Pods with the custom config mounted.

### Step 3: Verify the file is mounted
1. Find one of the new Pods (after rollout):
```Bash
kubectl get pods
```

2. Then run inside the Pod:
```Bash
kubectl exec -it <pod-name> -- cat /etc/nginx/conf.d/default.conf
```

3. You should see your custom config:
```console
server {
    listen 80;
    location / {
      return 200 'Hello from custom ConfigMap config!\n';
    }
  }
```


### Step 4: Test it in the browser
1. Make sure your Service is still running:
```bash
minikube service nginx-service
```

2. Refresh the page → you should now see:
```text
Hello from custom ConfigMap config!
```

→ Proof: the Pod is using the config file we injected via ConfigMap volume!

### Step 5: Cleanup (when done)
Run the following in your terminal.
```bash
kubectl delete configmap nginx-conf
```
(The Deployment stays — it just loses the custom config on next rollout.)

### Key Takeaways

- Use **ConfigMap volumes** when apps need full config files (not just env vars)
- mountPath = where the files appear inside the container
- subPath = mount only one key (useful for single-file overrides)
- Changes to ConfigMap don’t auto-reload in running Pods — you usually need to restart the Deployment (kubectl rollout restart deployment/nginx-deployment)

This pattern is used constantly in production (e.g. injecting log configs, feature flags, database connection strings).

→ Next: Part 3 – Secrets – Handling Passwords & Keys Securely
