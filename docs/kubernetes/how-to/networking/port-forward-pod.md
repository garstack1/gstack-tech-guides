# Port Forward to a Pod

## When to Use This Guide

Use this guide when you want to access an application running inside a pod from your local machine.

Port forwarding is useful for:

- debugging services
- testing APIs
- accessing internal dashboards

---

!!! tip "Quick Command"

    ```bash
    kubectl port-forward pod/<pod-name> 8080:80
    ```

---

## Step 1 — Find the Pod

List running pods.

```bash
kubectl get pods
```

Example:
```bash
web-app-6f9c8c7b7d-xk92
```


---


## Step 2 — Forward the Port

Forward a local port to the pod.
```bash
kubectl port-forward pod/web-app-6f9c8c7b7d-xk92 8080:80
```


Now access the application locally:
```bash
http://localhost:8080
```


---



## Step 3 — Test the Application

Open a browser or run:
```bash
curl http://localhost:8080
```


---



## Common Issues
**Port Already in Use**

Choose a different local port.
```bash
kubectl port-forward pod/web-app 9090:80
```


---



**Pod Not Running**

Verify pod status.
```bash
kubectl get pods
```


---



## Related Guides
**Networking**


- Expose a Service
- Expose a Service with Ingress

---