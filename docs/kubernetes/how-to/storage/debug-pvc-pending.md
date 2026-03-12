# Debug PVC Pending
## Problem

A PersistentVolumeClaim remains stuck in Pending.

Example:
```bash
kubectl get pvc
```

Output:
```text
NAME           STATUS    VOLUME
app-storage    Pending
```

This means Kubernetes cannot find storage to satisfy the claim.

---



## Step 1 — Check Storage Classes

Run:
```bash
kubectl get storageclass
```

Example:
```text
NAME                 PROVISIONER
standard (default)   kubernetes.io/aws-ebs
```

---



## Step 2 — Inspect the PVC

Run:
```bash
kubectl describe pvc app-storage
```

Look at **events.**

Example error:
```console
no persistent volumes available
```

or
```console
storageclass not found
```


---



## Step 3 — Check Persistent Volumes

Run:
```bash
kubectl get pv
```


Example:
```text
NAME      CAPACITY   ACCESS MODES
pv-data   5Gi        RWO
```


Ensure:

- size is sufficient
- access mode matches PVC

---



## Step 4 — Fix StorageClass

Add a storage class if missing.

Example PVC:
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-storage
spec:
  storageClassName: standard
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```


Apply again.
```bash
kubectl apply -f pvc.yaml
```

---




**Expected Result**

PVC becomes Bound.
```console
NAME           STATUS   VOLUME
app-storage    Bound    pvc-1234
```

---
