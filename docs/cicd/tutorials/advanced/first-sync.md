# Your First Synced App

Argo CD is running. Your manifests are in Git. Now you connect the two: you tell Argo CD to watch your repository, and it deploys Snapshot into the cluster for you. This is your first real GitOps deployment. 🎉

## What we will do (in very simple steps)

1. Understand what an Argo CD Application is
2. Point Argo CD at your repository
3. Sync it, and watch Snapshot appear

---

## What an Application is

In Argo CD, an **Application** is a small definition that says: *watch this folder, in this repository, and keep this cluster namespace matching it.* Once it exists, Argo CD takes over the deploying.

---

## Step 1: Create the Application

In the Argo CD dashboard, click **New App**, then fill in:

- **Application Name**: `snapshot`
- **Project**: `default`
- **Sync Policy**: `Manual` (we will sync by hand this first time)
- **Repository URL**: `https://github.com/YOUR_USERNAME/snapshot-app.git`
- **Revision**: `HEAD`
- **Path**: `k8s`
- **Cluster URL**: `https://kubernetes.default.svc` (the in-cluster option)
- **Namespace**: `default`

Click **Create**.

Your app appears on the dashboard, marked **OutOfSync**. That means Argo CD can see what Git wants, but has not applied it yet.

---

## Step 2: Sync it

Click into the `snapshot` app, then click **Sync**, then **Synchronize**.

Watch the diagram come to life. Argo CD reads your `k8s/` folder and creates the Deployment and the Service. Within moments the app turns **Synced** and **Healthy**, and you can see the two Snapshot pods appear as boxes on the screen. You did not run a single `kubectl apply`. Argo CD did it, from Git. ✨

---

## Step 3: Verify from the terminal

```bash
kubectl get pods
kubectl get svc
```

You will see two `snapshot` pods running and the `snapshot` service. To reach the app, forward its port:

```bash
kubectl port-forward svc/snapshot 8000:80
```

Open [http://localhost:8000](http://localhost:8000) and there is Snapshot, deployed by GitOps.

---

## The more GitOps way

You created the Application through the dashboard, which is great for learning. In a full GitOps setup, the Application **itself** is a manifest committed to Git, so even Argo CD's configuration is version-controlled:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: snapshot
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/YOUR_USERNAME/snapshot-app.git
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: default
```

You would apply this once, and from then on everything lives in Git. Keep it in mind, we build on it next.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- You created a `snapshot` Application in Argo CD
- Syncing it deployed the Deployment and Service
- The app shows **Synced** and **Healthy**, and you reached Snapshot in the browser

---

## 🩹 Common hiccups

- **"repository not accessible"**: the repo URL must be correct, and the repo public (or Argo CD given credentials).
- **Stuck OutOfSync after syncing**: open the app and read the message on the failing resource. A bad image tag or a manifest typo is the usual cause.
- **Pods not starting**: check the image in `deployment.yaml` exists and is public. Argo CD deploys it, but the cluster still has to pull it.

---

**Next up:** [Closing the Loop](closing-the-loop.md), where a new image from CI flows all the way to the cluster automatically.