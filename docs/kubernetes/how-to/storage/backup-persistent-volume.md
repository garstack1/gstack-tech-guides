# Backup Persistent Volume
## Problem

Persistent volumes store critical application data.

Without backups, data loss may occur during:

- cluster failure
- accidental deletion
- storage corruption

---



## Step 1 — Identify the PVC

List PVCs.
```bash
kubectl get pvc
```


Example:
```console
NAME           STATUS   VOLUME
app-storage    Bound    pvc-1234
```


---



## Step 2 — Launch Temporary Backup Pod

Create backup-pod.yaml.
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: backup-pod
spec:
  containers:
    - name: backup
      image: busybox
      command: ["sleep","3600"]
      volumeMounts:
        - mountPath: /data
          name: storage
  volumes:
    - name: storage
      persistentVolumeClaim:
        claimName: app-storage
```


Apply:
```bash
kubectl apply -f backup-pod.yaml
```

---



## Step 3 — Create Backup Archive

Enter the pod.
```bash
kubectl exec -it backup-pod -- sh
```


Create backup:
```bash
tar czf /tmp/backup.tar.gz /data
```

---



## Step 4 — Copy Backup Locally

Run:
```bash
kubectl cp backup-pod:/tmp/backup.tar.gz ./backup.tar.gz
```

Verify:
```bash
ls -lh backup.tar.gz
```

---



**Cleanup**

Delete backup pod.
```bash
kubectl delete pod backup-pod
```


---
