# Services

## Description

A **Service** exposes a set of pods as a network endpoint.

Services provide a stable IP address and DNS name for accessing pods.

Since pods are ephemeral and may be recreated, services ensure consistent connectivity.


---
## Service Types

| Type | Description |
|-----|-------------|
| `ClusterIP` | Internal cluster access |
| `NodePort` | Exposes service on a node port |
| `LoadBalancer` | External load balancer |
| `ExternalName` | Maps to external DNS name |



---
## Example Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
```


---
## Common Commands
List services:
```bash
kubectl get services
```


Describe a service:
```bash
kubectl describe service web-service
```



---
## Use Cases

Services are used for:

- exposing applications inside the cluster
- providing load balancing
- enabling service discovery



---
## Related Resources

- Pods
- Deployments

---