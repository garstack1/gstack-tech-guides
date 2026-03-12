# Mount Persistent Volume

## Problem

Your application needs persistent storage, but Kubernetes pods are ephemeral.

When a pod restarts:

- local container data is lost
- application state disappears
- logs or uploaded files vanish

You need a Persistent Volume (PV) mounted to your pod.

---



## Prerequisites

Before starting, ensure:

- A Kubernetes cluster is running
- kubectl is configured
- A StorageClass exists in the cluster

Check available storage classes:
```bash
kubectl get storageclass
```
Example output:
```bash
NAME                 PROVISIONER
standard (default)   kubernetes.io/gce-pd
fast-ssd             kubernetes.io/aws-ebs
```

## Quick Diagnosis (When Storage Is Not Working)

Use this quick checklist.

| Check | Command |
|-------|---------|
| PVC status | kubectl get pvc |
| PV binding | kubectl get pv |
| Pod mount errors | kubectl describe pod <pod-name> |
| Volume events	| kubectl describe pvc <pvc-name> |

If the PVC is stuck in Pending, a storage class may be missing.

## Step 1 — Create a PersistentVolumeClaim

Most clusters use dynamic provisioning, so you create a PVC, not a PV.

Create pvc.yaml.
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-storage
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

Apply it:
```bash
kubectl apply -f pvc.yaml
```

Verify it:
```bash
kubectl get pvc
```

Expected output:
```console
NAME          STATUS   VOLUME      CAPACITY
app-storage   Bound    pvc-12345   5Gi
```

---



## Step 2 — Mount the Volume in a Pod

Update your pod or deployment.

Example deployment.yaml.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: storage-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: storage-demo
  template:
    metadata:
      labels:
        app: storage-demo
    spec:
      containers:
        - name: app
          image: nginx
          volumeMounts:
            - name: app-storage
              mountPath: /data
      volumes:
        - name: app-storage
          persistentVolumeClaim:
            claimName: app-storage
```


Apply it:
```bash
kubectl apply -f deployment.yaml
```

---




## Step 3 — Verify the Volume Mount

Check the pod.
```bash
kubectl get pods
```


Enter the container.
```bash
kubectl exec -it <pod-name> -- /bin/sh
```


Test the storage.
```bash
echo "hello" > /data/test.txt
cat /data/test.txt
```

If the pod restarts, the file should still exist.

---



## Expected Result

Your application now has persistent storage.

Key characteristics:

- data survives pod restarts
- volume managed by Kubernetes
- storage dynamically provisioned

---


## Troubleshooting
**PVC Stuck in Pending**

Check storage class.
```bash
kubectl get storageclass
```


Specify it explicitly if required.
```yaml
storageClassName: standard
```

---




**Pod Fails to Start**

Check events.
```bash
kubectl describe pod <pod-name>
```


Look for:
```bash
MountVolume.SetUp failed
```


Common causes:

- PVC not bound
- incorrect access mode
- storage limit exceeded

---



**Volume Mounted but Not Writable**

Check permissions inside the container.
```bash
ls -la /data
```


Fix with a security context.
```bash
securityContext:
  fsGroup: 1000
```
---




## Pro Tip

Use PVCs with Deployments, not raw pods.

Pods get replaced frequently, but Deployments maintain stable storage attachments.

---