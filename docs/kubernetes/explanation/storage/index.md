# Kubernetes Storage Overview

## Why Storage Matters

Containers are ephemeral by default.

This means:

- When a container stops → its data is lost
- When a Pod is rescheduled → local data disappears

Kubernetes storage solves this by providing **persistent data across container restarts and rescheduling**.



---
## Key Concepts

Kubernetes storage is built around three core resources:

- **Volumes** – Temporary storage attached to a Pod
- **Persistent Volumes (PV)** – Cluster-wide storage resources
- **Persistent Volume Claims (PVC)** – Requests for storage by Pods



---
## Storage Model

<div class="mermaid">
graph TD
    Pod --> PVC
    PVC --> PV
    PV --> StorageBackend

    StorageBackend --> Disk
</div>





---
## Types of Storage
### Ephemeral Storage

- Lives and dies with the Pod
- Example: emptyDir

### Persistent Storage

- Survives Pod restarts
- Backed by external systems (disk, cloud storage, NFS)




---
## Why This Design Exists

Kubernetes separates:

- Storage provisioning (PV)
- Storage consumption (PVC)

This allows:

- Infrastructure teams to manage storage
- Developers to request storage without knowing backend details




---
## Real-World Implications

- Pods can restart without losing data
- Storage can be dynamically provisioned
- Applications can scale while maintaining state



---
## Key Takeaways

- Containers are stateless by default
- Kubernetes introduces persistent storage via PVs and PVCs
- Storage is decoupled from application logic

---