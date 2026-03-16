# Pods

## Description

A **Pod** is the smallest deployable unit in Kubernetes.

A pod represents one or more containers that share:

- network namespace
- storage volumes
- lifecycle

Containers inside the same pod can communicate using `localhost`.

Pods are typically created and managed by higher-level controllers such as Deployments.



---
## Key Fields

| Field | Description |
|------|-------------|
| `metadata.name` | Name of the pod |
| `spec.containers` | List of containers running in the pod |
| `spec.volumes` | Storage volumes attached to the pod |
| `spec.restartPolicy` | Container restart behavior |



---
## Example Pod Manifest

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    - containerPort: 80
```



---
## Common Commands

Create a pod:
```bash
kubectl apply -f pod.yaml
```

List pods:
```bash
kubectl get pods
```

View pod details:
List pods:
```bash
kubectl describe pod nginx-pod
```




---
## Use Cases

Pods are typically used for:

- running containers
- testing workloads
- debugging container images
In production environments, pods are usually managed by controllers such as Deployments.



---
## Related Resources

- Deployments
- Services

---