
---

# Storage Overview

`docs/kubernetes/how-to/storage/index.md`

```markdown
# Persistent Storage

Containers are ephemeral by default, meaning data stored inside a container is lost when the container stops.

Kubernetes provides persistent storage mechanisms that allow applications to store data outside the container lifecycle.

These mechanisms include:

- **Persistent Volumes (PV)**
- **Persistent Volume Claims (PVC)**
- **Storage Classes**

This section explains how to manage persistent storage for applications running in Kubernetes.

---

## Common Tasks

| Task | Guide |
|-----|------|
| Attach persistent storage to a pod | Mount a Persistent Volume |
| Inspect persistent storage resources | Inspect Persistent Volumes |

---

## Key Commands

```bash
kubectl get pv
kubectl get pvc
kubectl describe pvc <pvc-name>
```
These commands allow you to inspect and troubleshoot storage resources.

---