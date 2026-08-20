# Install Argo CD

Time to add the GitOps agent to your cluster. **Argo CD** is the tool that will watch your Git repository and keep the cluster in sync with it. In this lesson you install it and open its dashboard. 🎛️

> ℹ️ This lesson needs a running Kubernetes cluster. We use **minikube**, the same local cluster from the Kubernetes course. Start it first with `minikube start`.

## What we will do (in very simple steps)

1. Install Argo CD into the cluster
2. Wait for it to be ready
3. Open its dashboard and log in

---

## Step 1: Install Argo CD

Argo CD runs inside its own namespace. Create it, then apply the official install manifest:

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

This installs everything Argo CD needs: its controllers, its API server, and its web dashboard.

---

## Step 2: Wait for it to be ready

Argo CD has several components that take a minute to start. Watch them:

```bash
kubectl get pods -n argocd
```

Keep running that until every pod shows `Running`. When they are all up, Argo CD is ready. ✅

---

## Step 3: Open the dashboard

The dashboard is not exposed outside the cluster by default, so forward its port to your machine:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Leave that running, and open [https://localhost:8080](https://localhost:8080) in your browser. Your browser will warn about the certificate, since it is self-signed for local use. Accept the warning to continue.

---

## Step 4: Log in

The username is `admin`. Argo CD generates a one-time password and stores it in a secret. Fetch it in a **new terminal**:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

Copy the value it prints, log in as `admin`, and you are looking at the Argo CD dashboard. 🎉 Right now it is empty, no apps yet. In the next lesson you point it at your repo and watch it deploy Snapshot.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- All Argo CD pods in the `argocd` namespace are `Running`
- The dashboard opens at `https://localhost:8080`
- You logged in as `admin` with the generated password

---

## 🩹 Common hiccups

- **Pods stuck not ready**: give it a minute or two. Re-run `kubectl get pods -n argocd` to check progress.
- **Dashboard will not open**: the `port-forward` command must stay running in its terminal. If it stopped, run it again.
- **Password command prints nothing**: the secret may not exist yet, or was already changed. Make sure the pods are running first.
- **Port 8080 in use**: forward to a different local port, such as `8081:443`, and open that.

---

**Next up:** [Your First Synced App](first-sync.md), where you point Argo CD at your repository and watch it deploy Snapshot on its own.