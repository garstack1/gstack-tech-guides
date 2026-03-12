# Persistent Volumes

Containers are normally **stateless**.

When a container stops, any data stored inside the container is lost.

Persistent Volumes provide durable storage for Kubernetes workloads.

---

## Storage Abstraction

Kubernetes separates storage into two layers:

| Resource | Purpose |
|---------|--------|
| PersistentVolume | Actual storage resource |
| PersistentVolumeClaim | Request for storage |

---

## Benefits

Persistent volumes allow applications to:

- store data safely
- survive pod restarts
- scale across nodes

---

## Storage Backends

Persistent volumes can use many storage systems:

- local disks
- NFS
- cloud block storage
- distributed storage systems

---