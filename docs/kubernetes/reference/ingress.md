# Ingress

Ingress provides HTTP and HTTPS routing to services inside a Kubernetes cluster.

It allows external traffic to reach internal services based on rules such as hostnames or URL paths.

Ingress requires an **Ingress Controller** to function.

Common controllers include:

- NGINX Ingress Controller
- Traefik
- HAProxy

---

## Basic Ingress Example

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-app-service
            port:
              number: 80
```

This configuration routes traffic from:
```console
myapp.example.com → my-app-service
```


---





## Common Commands

View ingress resources:
```bash
kubectl get ingress
```


Describe an ingress:
```bash
kubectl describe ingress <name>
```


---





## TLS Example
```yaml
spec:
  tls:
  - hosts:
      - myapp.example.com
    secretName: tls-secret
```


The TLS secret must contain:
```console
tls.crt
tls.key
```
---





## Key Concepts

| Concept            | Description                                          |
|--------------------|------------------------------------------------------|
|Ingress	         | Routing rules for external traffic                   |
|Ingress             | Controller	Component that implements ingress rules |
|Host rules	         | Route based on domain name                           |
|Path rules	         | Route based on URL path                              |

---






## When to Use Ingress

Use ingress when:

- Exposing HTTP services
- Routing multiple apps through one IP
- Terminating TLS