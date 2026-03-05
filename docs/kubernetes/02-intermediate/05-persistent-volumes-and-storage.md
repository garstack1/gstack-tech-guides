

# Intermediate Part 4: Persistent Volumes & Storage – Saving Data

So far our nginx app is stateless — if a Pod dies or we scale to zero, all data inside it is lost.  
Real apps need **persistent data**: databases, uploaded files, logs, user sessions, etc.

Kubernetes separates **storage concerns** from the app using **Persistent Volumes (PV)** and **PersistentVolumeClaims (PVC)**.

Pizza chain analogy:  
- Pods are the kitchens — temporary and replaceable  
- Persistent Volumes are the **walk-in fridges** — the ingredients (data) stay even if the kitchen burns down and gets rebuilt  
- A PersistentVolumeClaim is the kitchen manager saying: "I need a 100-liter fridge with fast access"

In Minikube, we use **hostPath** or **local** storage (simple for learning — not production-grade).

## Goal for this section

Run a tiny file server (or database) that saves a file.  
Delete the Pod → recreate it → file is still there.

We'll use a simple busybox Pod + PVC.

## Step 1: Create a PersistentVolumeClaim (PVC)

The PVC is what your app requests: "I need 1 GB of storage."

Create `pvc.yaml`:

`apiVersion: v1
``kind: PersistentVolumeClaim
``metadata:
  ``name: my-pvc
``spec:
  ``accessModes:
``    - ReadWriteOnce          # Can be mounted by one Pod at a time
 `` resources:
 ``   requests:
 ``     storage: 1Gi           # 1 GiB


Apply:

Bash

```
kubectl apply -f pvc.yaml
```

Check:

Bash

```
kubectl get pvc
```

You should see my-pvc with STATUS: Bound (Minikube auto-provisions a PV).

## Step 2: Run a Pod that uses the PVC

Create storage-pod.yaml:

YAML

```
apiVersion: v1
kind: Pod
metadata:
  name: storage-demo
spec:
  containers:
  - name: storage-container
    image: busybox
    command: ["/bin/sh", "-c", "sleep 3600"]
    volumeMounts:
    - mountPath: /data
      name: storage-volume
  volumes:
  - name: storage-volume
    persistentVolumeClaim:
      claimName: my-pvc
```

Apply:

Bash

```
kubectl apply -f storage-pod.yaml
```

Wait until Ready:

Bash

```
kubectl get pods -w
```

## Step 3: Write data to the volume

Exec into the Pod:

Bash

```
kubectl exec -it storage-demo -- sh
```

Inside the Pod shell:

sh

```
echo "Hello from persistent storage!" > /data/hello.txt
cat /data/hello.txt
exit
```

→ You wrote a file to the mounted volume.

## Step 4: Delete & recreate the Pod – data survives

Delete the Pod:

Bash

```
kubectl delete pod storage-demo
```

Recreate it (same YAML):

Bash

```
kubectl apply -f storage-pod.yaml
```

Wait for Ready, then check the file:

Bash

```
kubectl exec -it storage-demo -- cat /data/hello.txt
```

→ "Hello from persistent storage!" is still there!

→ Proof: the data survived Pod deletion/recreation — the PVC kept it alive.

## Step 5: Cleanup

Bash

```
kubectl delete pod storage-demo
kubectl delete pvc my-pvc
```

(The PV might stay in Minikube — harmless.)

## Key Takeaways

- **PVC** = what your app requests ("give me storage")
- **PV** = the actual storage (Minikube auto-creates simple ones)
- Mount as a volume → data persists beyond Pod lifetime
- **ReadWriteOnce** = common for single-node or single-writer apps
- In production: use cloud PVs (AWS EBS, GCP PD, Azure Disk), CSI drivers, or distributed storage (Longhorn, Rook Ceph)

This is how databases (PostgreSQL, MySQL), file servers, or stateful apps run on Kubernetes.

→ Next: Part 5 – Namespaces – Organizing Large Projects