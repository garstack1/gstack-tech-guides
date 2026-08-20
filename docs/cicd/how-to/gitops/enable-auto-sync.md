# Enable Auto-Sync

## When to Use This Guide

Use this guide to have Argo CD deploy Git changes automatically, and optionally undo manual cluster changes.

---

!!! tip "Quick Command"

    In the app's **App Details**, enable **Auto-Sync** (and **Self Heal**).

---

## Step 1: Turn on auto-sync

In the Argo CD dashboard, open the app, click **App Details**, then **Enable Auto-Sync**. Now any change to the watched Git path is applied to the cluster without clicking Sync.

## Step 2: Optionally turn on self-heal

In the same sync policy, enable **Self Heal**. Argo CD will now also revert changes made directly to the cluster, so the cluster always matches Git.

## The declarative way

In the Application manifest:

```yaml
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

- `prune` removes resources deleted from Git.
- `selfHeal` reverts manual cluster changes.

---

## Common Issues

**Manual changes are not reverted**

Auto-sync reacts to **Git** changes. To undo **cluster** changes, you also need **Self Heal** enabled.

**It reacts slowly**

Reconciliation is periodic. Use **Refresh** to prompt an immediate check.

---

## Related Guides

- [Create an Argo CD App](create-argocd-app.md)