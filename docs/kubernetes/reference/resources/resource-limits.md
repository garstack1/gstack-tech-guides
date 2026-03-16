# Resource Requests and Limits

## Description

Kubernetes allows you to define **resource requests and limits** for containers to control how much CPU and memory they can use.

Resource management ensures that workloads receive the resources they need while preventing individual containers from consuming excessive cluster resources.

These settings are defined in the container specification of a Pod or Deployment.

## Resource Requests

A **request** defines the minimum amount of CPU or memory guaranteed for a container.

The Kubernetes scheduler uses requests to determine which node can run the pod.

Example:

```yaml
resources:
  requests:
    cpu: "250m"
    memory: "128Mi"
```
This ensures the container is scheduled on a node with at least the specified resources available.


---
## Resource Limits

A limit defines the maximum amount of resources a container can consume.

If a container exceeds its defined limit:

- CPU usage is throttled
- Memory usage may cause the container to be terminated

Example:
```yaml
resources:
  limits:
    cpu: "500m"
    memory: "256Mi"
```

Example Pod Configuration
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    resources:
      requests:
        cpu: "250m"
        memory: "128Mi"
      limits:
        cpu: "500m"
        memory: "256Mi"
```


Units
| Resource | Unit Example | Description |
|----------|--------------|-------------|
| CPU | 500m | 500 millicpu (0.5 CPU core) |
| Memory | 128Mi | 128 mebibytes |



---
## View Resource Usage

You can inspect resource usage using:
```bash
kubectl top pods
```


View node resource usage:
```bash
kubectl top nodes
```



---
## Best Practices

- Always define resource requests and limits
- Avoid extremely high limits that could destabilize nodes
- Monitor resource usage using metrics tools
- Test workloads under expected load



---
## Related Resources

- Horizontal Pod Autoscaler
- Pod scheduling

---