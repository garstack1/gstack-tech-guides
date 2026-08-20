# Snapshot on Kubernetes

GitOps needs the desired state written down as files in Git. In Kubernetes, those files are **manifests**. This lesson writes the manifests for Snapshot and commits them, so that in the next lessons Argo CD has something to sync. 📄

> ℹ️ This lesson touches Kubernetes directly. For the full depth on Deployments, Services, and multi-tier apps, see the **Kubernetes course**. Here we write just enough to drive the GitOps loop.

## What we will do (in very simple steps)

1. Decide where the manifests live
2. Write a Deployment and a Service for Snapshot
3. Commit them as the desired state

---

## Where the manifests live

We will keep them in a `k8s/` folder inside your `snapshot-app` repository. That is simple and works well for learning.

> 💡 Larger teams often keep manifests in a **separate** config repository, so application code and deployment config have their own histories. The GitOps idea is the same either way.

---

## Step 1: Write the Deployment

In your `snapshot-app` repo, create `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: snapshot
  labels:
    app: snapshot
spec:
  replicas: 2
  selector:
    matchLabels:
      app: snapshot
  template:
    metadata:
      labels:
        app: snapshot
    spec:
      containers:
        - name: snapshot
          image: ghcr.io/YOUR_USERNAME/snapshot-app:v1.3.0
          ports:
            - containerPort: 5000
```

This declares that the cluster should keep **two copies** of your `snapshot-app:v1.3.0` image running. Replace `YOUR_USERNAME` with yours, and make sure the image tag matches a version you published.

---

## Step 2: Write the Service

Create `k8s/service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: snapshot
spec:
  selector:
    app: snapshot
  ports:
    - port: 80
      targetPort: 5000
```

The Service sends traffic on port 80 to the app's port 5000. The `selector: app: snapshot` is what links it to the Deployment, whose pods carry the same label.

---

## Step 3: Commit the desired state

```bash
git add k8s/
git commit -m "Add Kubernetes manifests for Snapshot"
git push
```

That is the important shift. These files now **are** the source of truth for what should run. In the next lessons, Argo CD will read this `k8s/` folder and make the cluster match it.

---

## Going further: the full stack

For a complete Snapshot on Kubernetes, you would also add manifests for the **database** (a StatefulSet with storage, and a secret for its password) and the **frontend** (a Deployment, a Service, and its config). Those bring in Kubernetes concepts covered fully in the [Kubernetes course](../../../kubernetes/). The single Deployment above is enough to learn GitOps here.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- You have `k8s/deployment.yaml` and `k8s/service.yaml` in your repo
- The image name and tag match a version you actually published
- The manifests are committed and pushed

---

## 🩹 Common hiccups

- **Image will not pull later**: the image must be reachable. Keep the ghcr package public, or your cluster will need pull credentials.
- **Selector and labels do not match**: the Service `selector` must match the labels on the Deployment's pods. Both use `app: snapshot` here.
- **Wrong image tag**: the tag must be one you published. Check your Packages if unsure.

---

**Next up:** [Install Argo CD](install-argocd.md), where you add the GitOps agent to your cluster.