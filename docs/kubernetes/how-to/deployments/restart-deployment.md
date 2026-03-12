# Restart a Deployment

## When to Use This Guide

Use this guide when you need to restart all pods in a deployment without changing the deployment configuration.

This is useful when:

- configuration changes were applied
- pods become unstable
- applications require a clean restart

---

!!! tip "Quick Command"

    ```bash
    kubectl rollout restart deployment <deployment-name>
    ```

---

## Step 1 — Restart the Deployment

Restart all pods managed by the deployment.

```bash
kubectl rollout restart deployment web-app
```
Example output:

deployment.apps/web-app restarted

Kubernetes gradually terminates old pods and creates new ones.

---


## Step 2 — Monitor the Rollout

Track restart progress.
```bash
kubectl rollout status deployment web-app
```

---


## Step 3 — Verify New Pods

Confirm new pods are running.
```bash
kubectl get pods
```

New pods will have different identifiers.

---



## Common Issues
Pods Fail After Restart

If pods fail after restart, inspect logs.
```bash
kubectl logs <pod-name>
```


Check pod events.
```bash
kubectl describe pod <pod-name>
```
---



## Quick Restart Workflow
```bash
kubectl rollout restart deployment web-app
kubectl rollout status deployment web-app
kubectl get pods
```

---



## Related Guides
**Deployment Management**

- Scale a Deployment
- Roll Back a Deployment
- Update Container Image

**Troubleshooting**

- Debug a Crashing Pod

---