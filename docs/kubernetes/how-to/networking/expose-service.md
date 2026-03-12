# Expose a Service

## When to Use This Guide

Use this guide when you need to make an application accessible through a Kubernetes Service.

Services provide a **stable network endpoint** that allows other pods or external clients to access your application.

---

!!! tip "Quick Commands"

    ```bash
    kubectl expose deployment web-app --port=80 --target-port=8080
    kubectl get services
    ```

---

## Service Types

| Type | Description | Use Case |
|-----|-------------|----------|
| `ClusterIP` | Internal cluster access | Communication between pods |
| `NodePort` | External access via node IP | Simple external exposure |
| `LoadBalancer` | External load balancer | Cloud environments |

---

## Step 1 — Verify the Deployment

Check that your application pods are running.

```bash
kubectl get pods
```

Example:
```console
web-app-6f9c8c7b7d-xk92
web-app-6f9c8c7b7d-lm12a
```


---



## Step 2 — Create the Service

Expose the deployment.
```bash
kubectl expose deployment web-app \
  --type=ClusterIP \
  --port=80 \
  --target-port=8080
```


This creates a service that forwards traffic to the application pods.

---



## Step 3 — Verify the Service

Check service status.
```bash
kubectl get services
```


Example:
```bash
NAME      TYPE        CLUSTER-IP     PORT(S)
web-app   ClusterIP   10.96.120.45   80/TCP
```


---



## Step 4 — Test Internal Access

Test the service from another pod.
```bash
kubectl run curl --image=curlimages/curl -it --rm -- sh
```


Then inside the pod:
```bash
curl http://web-app
```


---



## Common Issues
**Service Cannot Reach Pods**
Check service selectors.
```bash
kubectl describe service web-app
```


Verify labels match pod labels.

---



**Pods Not Ready**

Services only route traffic to ready pods.

Check readiness:
```bash
kubectl get pods
```


---



**Quick Workflow**
```bash
kubectl get pods
kubectl expose deployment web-app --port=80 --target-port=8080
kubectl get services
```


---



## Related Guides
**Networking**

- Expose Service with Ingress
- Port Forward Pod

**Troubleshooting**

- Debug a Crashing Pod

---