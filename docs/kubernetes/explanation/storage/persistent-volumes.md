# Persistent Volumes (PV)

## Overview

A Persistent Volume (PV) is a cluster-wide resource that provides storage.

It represents actual storage provisioned from:

- Local disks
- Network storage (NFS)
- Cloud providers (AWS EBS, Azure Disk, etc.)




---
## Key Characteristics

- Exists independently of Pods
- Managed by Kubernetes or an administrator
- Has a defined capacity and access mode




---
## Example PV

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data
```


---
## Access Modes

- ReadWriteOnce (RWO) - Mounted by a single node
- ReadOnlyMany (ROX) - Read-only by multiple nodes
- ReadWriteMany (RWX) - Read/write by multiple nodes



---
## Lifecycle

<div class="mermaid">
graph TD
    Available --> Bound
    Bound --> Released
    Released --> Available
</div>

- **Available** - Not yet claimed
- **Bound** - Connected to a PVC
- **Released** - Claim deleted but not yet reusable



---
## Static vs Dynamic Provisioning
### Static

- Admin manually creates PVs

### Dynamic

- Kubernetes creates PVs automatically using StorageClasses




---
## Real-World Implications

- Storage can outlive Pods
- Data is preserved across failures
- Enables stateful applications (databases, queues)




---
## Key Takeaways

- PVs represent actual storage resources
- They are independent of Pods
- They are consumed via PVCs

---
