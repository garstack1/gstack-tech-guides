# Deployments

## Description

A **Deployment** manages a set of identical pods and ensures that the desired number of replicas are running.

Deployments provide features such as:

- rolling updates
- scaling
- rollback to previous versions

Deployments are commonly used to run stateless applications.

## Key Fields

| Field | Description |
|------|-------------|
| `spec.replicas` | Number of desired pods |
| `spec.selector` | Labels used to identify pods |
| `spec.template` | Pod template used to create pods |
| `spec.strategy` | Update strategy |

## Example Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx
```


---
## Common Commands

Create a deployment:
```bash
kubectl apply -f deployment.yaml
```

Scale deployment:
```bash
kubectl scale deployment web-app --replicas=5
```

Check deployment status:
```bash
kubectl get deployments
```




---
## Use Cases

Deployments are commonly used for:

- web applications
- API services
- stateless workloads



---
## Related Resources

- Pods
- Services
- Horizontal Pod Autoscaler