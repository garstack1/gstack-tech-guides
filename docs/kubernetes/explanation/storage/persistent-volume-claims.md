# Persistent Volume Claims (PVC)

## Overview

A Persistent Volume Claim (PVC) is a request for storage by a Pod.

It allows developers to request storage without needing to know how it is provisioned.





---
## How PVC Works

A PVC:

1. Requests storage (size, access mode)
2. Kubernetes finds a matching PV
3. The PV is bound to the PVC




---
## Example PVC

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: example-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```




---
## Binding Process

<div class="mermaid">
graph TD
    Pod --> PVC
    PVC --> PV
</div>

- PVC searches for a matching PV
- If found → binding occurs
- If not → dynamic provisioning may create one





---
## Using PVC in a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - mountPath: "/data"
      name: storage
  volumes:
  - name: storage
    persistentVolumeClaim:
      claimName: example-pvc
```




---
## Why PVC Exists

Without PVCs:

- Developers would need to understand storage infrastructure
- Applications would be tightly coupled to storage backends

PVCs abstract this complexity.




---
## Real-World Implications

- Teams can work independently (dev vs infra)
- Storage becomes reusable and scalable
- Supports dynamic cloud-native environments





---
## Key Takeaways

- PVCs request storage
- PVs provide storage
- Kubernetes handles the binding automatically

---