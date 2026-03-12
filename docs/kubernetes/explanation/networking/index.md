# Kubernetes Networking

Kubernetes networking allows containers running across multiple nodes to communicate reliably.

The networking model is designed around several key principles.




---
## Core Networking Principles

Kubernetes networking follows these rules:

| Rule | Description |
|-----|-------------|
| Pod-to-Pod Communication | Pods can communicate with each other without NAT |
| Pod IP Addressing | Every pod receives its own IP address |
| Service Discovery | Applications can find each other through services |
| Load Balancing | Traffic can be distributed across pods |




---
## Networking Components

Several Kubernetes resources enable networking functionality.

| Component | Purpose |
|----------|---------|
| Services | Stable access point for pods |
| kube-proxy | Implements service routing |
| Ingress | HTTP/HTTPS routing into the cluster |
| DNS | Service discovery |
| Network Policies | Control traffic between pods |




---
## How Traffic Flows

Applications inside Kubernetes typically communicate using this path:

Client → Service → Pod

Services provide a stable endpoint even when pods are created or destroyed.





---
## Next

Explore the core networking components:

- Services
- kube-proxy
- Ingress
- DNS
- Network Policies

---