# ConfigMaps

## Description

A **ConfigMap** stores configuration data for applications running in Kubernetes.

ConfigMaps allow you to separate configuration from container images.

Applications can consume ConfigMaps as:

- environment variables
- configuration files
- command-line arguments

## Example ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  LOG_LEVEL: info
```


---
## Using ConfigMap as Environment Variables
```yaml
envFrom:
- configMapRef:
    name: app-config
```




---
## Common Commands
Create ConfigMap:
```bash
kubectl apply -f configmap.yaml
```

View ConfigMaps:
```bash
kubectl get configmaps
```




---
## Use Cases
ConfigMaps are commonly used for:

- application configuration
- environment variables
- feature flags




---
## Related Resources

- Secrets
- Pods

---