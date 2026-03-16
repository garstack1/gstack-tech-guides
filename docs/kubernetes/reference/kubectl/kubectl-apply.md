# kubectl apply

## Description

`kubectl apply` creates or updates Kubernetes resources using configuration files.

It compares the configuration defined in a file with the current cluster state and applies the necessary changes.

## Syntax

```bash
kubectl apply -f [file]
```


---
## Examples
**Apply a Configuration File**
```bash
kubectl apply -f deployment.yaml
```

**Apply a Directory of Manifests**
```bash
kubectl apply -f manifests/
```

**Apply Resources from a URL**
```bash
kubectl apply -f https://example.com/deployment.yaml
```

**Example Manifest**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
```




---
## Typical Use Cases

- deploying applications
- updating configurations
- managing infrastructure as code


---
## Related Commands

- kubectl get
- kubectl describe

---