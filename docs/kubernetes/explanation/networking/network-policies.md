# Network Policies

Network Policies control how pods communicate with each other.

By default, Kubernetes allows all pods to communicate freely.

Network policies enable administrators to restrict traffic.

**Network Policy Isolation**

<div class="mermaid">
flowchart LR

Frontend["Frontend Pod"]
Backend["Backend Pod"]
Database["Database Pod"]

Frontend --> Backend

Backend --> Database

Frontend -.blocked.-> Database
</div>


---

## Why Network Policies Exist

In secure environments, unrestricted communication can create risks.

Network policies allow administrators to define rules such as:

- which pods can communicate
- which namespaces can access services
- which ports are allowed

---

## Policy Types

Network policies can control:

| Policy Type | Description |
|------------|-------------|
Ingress | Incoming traffic |
Egress | Outgoing traffic |

Policies are applied using **label selectors**.

---

## Example Policy Concept

A policy might allow:

- frontend pods
- to access
- backend pods on port 80

All other traffic would be blocked.

---

## Key Takeaway

Network policies provide **micro-segmentation and security controls inside Kubernetes clusters**.