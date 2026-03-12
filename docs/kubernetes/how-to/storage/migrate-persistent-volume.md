# Migrate Persistent Volume
## Problem

You may need to migrate data when:

- changing storage classes
- moving clusters
- replacing disks

This requires copying data between volumes.

---



## Step 1 — Create New PVC

Create new-pvc.yaml.
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: new-storage
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```


Apply:
```bash
kubectl apply -f new-pvc.yaml
```

---




## Step 2 — Create Migration Pod

Create migration-pod.yaml.
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: migration
spec:
  containers:
    - name: migrate
      image: busybox
      command: ["sleep","3600"]
      volumeMounts:
        - mountPath: /old
          name: old-volume
        - mountPath: /new
          name: new-volume
  volumes:
    - name: old-volume
      persistentVolumeClaim:
        claimName: app-storage
    - name: new-volume
      persistentVolumeClaim:
        claimName: new-storage
```


Apply:
```bash
kubectl apply -f migration-pod.yaml
```

---




## Step 3 — Copy Data

Enter pod.
```bash
kubectl exec -it migration -- sh
```

Copy data.
```bash
cp -r /old/* /new/
```

Verify:
```bash
ls /new
```

---



## Step 4 — Update Deployment

Update your deployment to use the new PVC.

Example:
```yaml
persistentVolumeClaim:
  claimName: new-storage
```


Apply the deployment update.

---