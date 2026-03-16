# Horizontal Pod Autoscaler (HPA)

## Description

The **Horizontal Pod Autoscaler (HPA)** automatically adjusts the number of running pods in a deployment or replica set based on resource utilization.

HPA helps applications scale dynamically in response to increased demand.

Common scaling metrics include:

- CPU usage
- memory usage
- custom metrics

## How HPA Works

The Horizontal Pod Autoscaler periodically checks resource usage metrics and adjusts the number of pod replicas.

Typical workflow:

1. Metrics server collects resource metrics.
2. HPA evaluates current utilization.
3. If usage exceeds the defined threshold, Kubernetes increases replicas.
4. If usage decreases, replicas may be reduced.




---
## Example HPA Configuration

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60
```

This configuration scales the deployment when average CPU usage exceeds 60%.


---
## Create an HPA Using kubectl

Example command:
```bash

```
kubectl autoscale deployment web-app --cpu-percent=60 --min=2 --max=10



---
## View Autoscaler Status

Check HPA configuration:
```bash
kubectl get hpa
```


View detailed status:
```bash
kubectl describe hpa web-app-hpa
```

Example output:
```text
NAME        REFERENCE          TARGETS   MINPODS   MAXPODS
web-app-hpa Deployment/web-app 45%/60%   2         10
```


---
## Requirements

The Horizontal Pod Autoscaler requires a metrics server to collect resource usage metrics.

Without metrics, autoscaling cannot function.



---
## Best Practices

- Define resource requests for containers
- Set realistic scaling thresholds
- monitor scaling behaviour in production
- avoid excessive scaling ranges



---
## Related Resources

Resource Requests and Limits

Deployments

---