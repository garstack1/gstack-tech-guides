# Ingress

Ingress provides HTTP and HTTPS routing into a Kubernetes cluster.

It allows external traffic to reach services based on rules such as:

- hostnames
- URL paths



**Ingress Traffic Flow**
<div class="mermaid">
flowchart TD

Internet["Internet"]

Ingress["Ingress Controller"]

ServiceA["Service: API"]
ServiceB["Service: Frontend"]

PodA["API Pod"]
PodB["Frontend Pod"]

Internet --> Ingress

Ingress --> ServiceA
Ingress --> ServiceB

ServiceA --> PodA
ServiceB --> PodB
</div>


---
## Why Ingress Exists

Without ingress, applications would typically be exposed using NodePort or LoadBalancer services.

Ingress allows:

- centralized routing
- SSL termination
- virtual hosting




---
## Ingress Components

Ingress networking involves two main parts.

| Component | Purpose |
|----------|---------|
Ingress Resource | Defines routing rules |
Ingress Controller | Implements the rules |

Common controllers include:

- NGINX Ingress
- Traefik
- HAProxy




---
## Example Routing

Ingress can route traffic like this:

example.com/api → API service
example.com/app → Frontend service



---
## Key Takeaway

Ingress provides **layer 7 routing for HTTP and HTTPS traffic entering the cluster**.

---