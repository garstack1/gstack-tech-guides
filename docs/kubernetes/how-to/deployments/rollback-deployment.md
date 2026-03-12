# Roll Back a Deployment

## When to Use This Guide

Use this guide when a new deployment version introduces errors and you need to quickly restore a previously working version.

Rolling back deployments is common when:

- a new application release causes failures
- a container image update breaks functionality
- configuration changes introduce errors

---

!!! tip "Quick Commands"

    ```bash
    kubectl rollout history deployment <deployment-name>
    kubectl rollout undo deployment <deployment-name>
    kubectl rollout status deployment <deployment-name>
    ```

---

## Common Rollback Tasks

| Task | Command |
|-----|--------|
| View rollout history | `kubectl rollout history deployment web-app` |
| Roll back to previous version | `kubectl rollout undo deployment web-app` |
| Roll back to specific revision | `kubectl rollout undo deployment web-app --to-revision=2` |
| Check rollout progress | `kubectl rollout status deployment web-app` |

---

## Step 1 — View Deployment History

Check previous deployment versions.

```bash
kubectl rollout history deployment web-app
```

Example:
```console
REVISION  CHANGE-CAUSE
1         Initial deployment
2         Update container image
3         Updated configuration
```


---





## Step 2 — Roll Back the Deployment

Restore the previous working revision.
```bash
kubectl rollout undo deployment web-app
```

Kubernetes replaces the current pods with the previous version.

---





## Step 3 — Verify Rollback Status

Check rollout progress.
```bash
kubectl rollout status deployment web-app
```

Then confirm pods are running.
```bash
kubectl get pods
```


---





## Common Issues
**Rollback Does Not Fix the Problem**

Possible causes:

- configuration issue still present
- external dependency failure
- database migration mismatch

Inspect logs:
```bash
kubectl logs <pod-name>
```


---


**Quick Rollback Workflow**
```bash
kubectl rollout history deployment web-app
kubectl rollout undo deployment web-app
kubectl rollout status deployment web-app
```

---

## Related Guides

**Deployment Management**
- Scale a Deployment
- Restart a Deployment
- Update Container Image

**Troubleshooting**

- Debug a Crashing Pod

---