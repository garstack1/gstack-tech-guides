# Add Environment Variables
## Problem

Applications frequently rely on environment variables for runtime configuration.

These values must be injected into containers at runtime.

---



## Step 1 — Define Environment Variables

Update container configuration.

`deployment.yaml`
```yaml
env:
  - name: APP_ENV
    value: production
  - name: LOG_LEVEL
    value: info
```

Full example:
```yaml
containers:
  - name: app
    image: nginx
    env:
      - name: APP_ENV
        value: production
      - name: LOG_LEVEL
        value: info
```


---



## Step 2 — Apply Deployment

Run:
```bash
kubectl apply -f deployment.yaml
```


---



## Step 3 — Verify Variables

Enter container.
```bash
kubectl exec -it <pod-name> -- /bin/sh
```

Check:
```bash
env
```

Expected:
```console
APP_ENV=production
LOG_LEVEL=info
```

---