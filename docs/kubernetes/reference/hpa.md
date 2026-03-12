# Resource Limits & Horizontal Pod Autoscaling (HPA)

Kubernetes allows you to control how much CPU and memory a container can use and automatically scale applications based on resource usage.

This page provides a quick reference for **resource limits, requests, and horizontal pod autoscaling (HPA).**

---

## Resource Requests vs Limits

Example configuration:

```yaml
resources:
  requests:
    cpu: "250m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "256Mi"
```



| Field     | Meaning                                           |
|-----------|---------------------------------------------------|
| Requests  | Minimum resources guaranteed to the container     |
| Limits    | Maximum resources the container is allowed to use |

---





CPU Units

| Value     | Meaning                                            |
|-----------|----------------------------------------------------|
| 1000m     | 1 CPU core                                         |
| 500m      | 0.5 CPU                                            |
| 250m      | 0.25 CPU                                           |


Explanation:

- 250m CPU = 0.25 CPU core
- 128Mi = 128 mebibytes of memory

Requests affect pod scheduling, while limits control runtime enforcement.

---





## Why Resource Limits Matter

Without limits:

- Containers may consume excessive CPU or memory
- Other workloads may starve
- Nodes may become unstable

Setting limits helps Kubernetes maintain **cluster stability and fairness.**

---




## Horizontal Pod Autoscaler (HPA)

The **Horizontal Pod Autoscaler** automatically adjusts the number of pod replicas based on metrics such as CPU usage.

Example:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```
This configuration means:

- Minimum pods: 2
- Maximum pods: 10
- Scale when CPU usage exceeds 70%

---




## Useful Commands

Check HPA status:
```bash
kubectl get hpa
```

View detailed information:
```bash
kubectl describe hpa <name>
```
---




## Metrics Requirement

HPA requires the metrics server to be installed.

Check if it is running:
```bash
kubectl get deployment metrics-server -n kube-system
```
If it is missing, install the Kubernetes metrics server.

---




## Common Scaling Strategy

Typical production configuration:

```console
minReplicas: 2
maxReplicas: 10
CPU target: 60–75%
```


This provides:

- Baseline redundancy
- Ability to scale under load
- Controlled resource consumption

---




## Related Topics

- Deployments
- Resource Requests and Limits
- Kubernetes Metrics Server