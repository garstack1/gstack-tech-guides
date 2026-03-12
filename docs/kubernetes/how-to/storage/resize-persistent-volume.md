# Resize Persistent Volume
## Problem

Your application storage is full and needs to be expanded.

Pods may start failing with errors like:
```console
no space left on device
```
or
```console
disk full
```


Kubernetes allows **PersistentVolumeClaims (PVCs)** to be resized if the **StorageClass supports expansion.**

---



## Prerequisites

Check if your storage class allows resizing.

Run:
```bash
kubectl get storageclass
```

Then inspect the storage class:
```bash
kubectl describe storageclass <storage-class-name>
```

Look for:
```text
AllowVolumeExpansion: true
```


If this is **false**, resizing will not work.

---



## Step 1 — Check Current PVC Size

Run:
```bash
kubectl get pvc
```

Example output:
```text
NAME           STATUS   VOLUME       CAPACITY
app-storage    Bound    pvc-12345    5Gi
```


---



## Step 2 — Edit the PVC

Run:
```bash
kubectl edit pvc app-storage
```


Find:
```yaml
resources:
  requests:
    storage: 5Gi
```

Increase the size:
```yaml
resources:
  requests:
    storage: 10Gi
```


Save and exit.

---



## Step 3 — Verify the Resize

Check PVC status.
```bash
kubectl get pvc
```

Example:
```text
NAME           STATUS   VOLUME       CAPACITY
app-storage    Bound    pvc-12345    10Gi
```


---



## Step 4 — Verify Inside the Pod

Enter the container.
```bash
kubectl exec -it <pod-name> -- /bin/sh
```

Check disk size.
```bash
df -h
```

Expected output:
```text
Filesystem      Size  Used Avail Use%
/data           10G   2G   8G   20%
```

---



## Troubleshooting
**Resize Not Applied**

Check events.
```bash
kubectl describe pvc app-storage
```

Look for:
```console
Waiting for file system resize
```

Restart the pod if necessary.

---
