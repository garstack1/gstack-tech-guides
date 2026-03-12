# Expose a Service with Ingress

## When to Use This Guide

Use this guide when you want to expose a Kubernetes service to external users through HTTP or HTTPS.

Ingress allows multiple services to share a single external IP address and supports routing based on hostnames or paths.

---

!!! tip "Quick Workflow"

    ```bash
    kubectl apply -f ingress.yaml
    kubectl get ingress
    ```

---

## Step 1 — Verify the Service

Ensure your application service exists.

```bash
kubectl get services
```

Example:
```bash
web-app   ClusterIP   10.96.120.45   80/TCP
```

---



## Step 2 — Create an Ingress Resource

Example configuration:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
spec:
  rules:
  - host: web-app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-app
            port:
              number: 80
```


Apply the configuration.
```bash
kubectl apply -f ingress.yaml
```

---



## Step 3 — Verify Ingress

Check the ingress resource.
```bash
kubectl get ingress
```


Example:
```bash
NAME              HOSTS               ADDRESS
web-app-ingress   web-app.example.com 192.168.1.20
```

---



## Common Issues
**Ingress Has No Address**

Your cluster may not have an Ingress controller installed.

Check:
```bash
kubectl get pods -n ingress-nginx
```

**Service Returns 404**

Verify service name and port in the ingress configuration.

---



## Related Guides

- Expose a Service
- Port Forward Pod