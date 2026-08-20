# Application Spec

## Description

An Argo CD **Application** is a manifest that tells Argo CD what to deploy, from where, and to where.

## Example

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
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

## Key fields

| Field | Description |
|---|---|
| `source.repoURL` | The Git repository to watch |
| `source.targetRevision` | The branch, tag, or commit to track |
| `source.path` | The folder of manifests within the repo |
| `destination.server` | The cluster to deploy to |
| `destination.namespace` | The namespace to deploy into |
| `syncPolicy.automated` | Turn on auto-sync |
| `prune` | Remove resources deleted from Git |
| `selfHeal` | Revert manual changes to the cluster |

## Related

- [Argo CD CLI](argocd-cli.md)