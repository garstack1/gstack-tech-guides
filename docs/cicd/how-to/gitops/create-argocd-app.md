# Create an Argo CD App

## When to Use This Guide

Use this guide to point Argo CD at a repository so it deploys and manages an app from Git.

---

!!! tip "Quick Command"

    In the Argo CD dashboard: **New App**, then fill in the repo, path, and destination.

---

## Step 1: Create the Application (dashboard)

In the Argo CD dashboard, click **New App** and fill in:

- **Application Name**: `snapshot`
- **Repository URL**: your repo's HTTPS URL
- **Revision**: `HEAD`
- **Path**: the manifests folder, for example `k8s`
- **Cluster URL**: `https://kubernetes.default.svc`
- **Namespace**: `default`

Click **Create**, then **Sync** to deploy.

## The declarative way

You can define the Application as a manifest and commit it to Git instead:

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

Apply it with `kubectl apply -f`, and even Argo CD's config lives in Git.

---

## Common Issues

**"repository not accessible"**

Check the URL, and that the repo is public or has credentials in Argo CD.

**Stuck OutOfSync**

Click the failing resource to read why, usually a bad manifest or image tag.

---

## Related Guides

- [Enable Auto-Sync](enable-auto-sync.md)