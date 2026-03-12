# Services

A **Service** provides a stable network endpoint for accessing a group of pods.

Pods in Kubernetes are ephemeral. Their IP addresses can change when they restart or are replaced.

Services solve this problem by providing a consistent way to access applications.


**Service Routing**

<div class="mermaid">
flowchart TD

Client["Client"]

Service["Service
ClusterIP"]

Pod1["Pod"]
Pod2["Pod"]
Pod3["Pod"]

Client --> Service

Service --> Pod1
Service --> Pod2
Service --> Pod3
</div>


---

## Why Services Exist

Without services:

- pod IP addresses would change frequently
- applications would lose connectivity
- service discovery would be difficult

Services provide a **stable virtual IP address**.

---

## Service Types

Kubernetes supports several service types.

| Type | Description |
|----|----|
ClusterIP | Internal cluster communication |
NodePort | Exposes service on a node port |
LoadBalancer | Exposes service through a cloud load balancer |
ExternalName | Maps service to an external DNS name |

---

## How Services Route Traffic

A service selects pods using **labels**.

Traffic sent to the service is automatically distributed across the matching pods.

---

## Key Takeaway

Services provide a **stable access point** for applications running in Kubernetes.





