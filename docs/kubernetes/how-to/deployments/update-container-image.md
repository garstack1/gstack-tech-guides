# Update a Container Image

## When to Use This Guide

Use this guide when you need to deploy a new version of an application by updating the container image used by a deployment.

This commonly happens when:

- releasing a new application version
- patching vulnerabilities
- deploying bug fixes

---

!!! tip "Quick Command"

    ```bash
    kubectl set image deployment <deployment-name> <container>=<image>:<tag>
    ```

---

## Step 1 — Check Current Image

Inspect the deployment configuration.

```bash
kubectl describe deployment web-app
```

Look for:
```console
Image: web-app:v1
```


---



## Step 2 — Update the Image

Deploy a new container version.
```bash
kubectl set image deployment web-app web-app=web-app:v2
```


Example output:
```bash
deployment.apps/web-app image updated
```


---



## Step 3 — Monitor the Rollout

Watch the deployment update.
```bash
kubectl rollout status deployment web-app
```


---



## Step 4 — Verify Pods

Check that new pods are running.
```bash
kubectl get pods
```

Pods should now use the updated image.

---



## Common Issues
**Pods Fail After Image Update**

If pods crash after the update, check logs.
```bash
kubectl logs <pod-name>
```


If necessary, roll back the deployment.
```bash
kubectl rollout undo deployment web-app
```

---



**Quick Update Workflow**
```bash
kubectl set image deployment web-app web-app=web-app:v2
kubectl rollout status deployment web-app
kubectl get pods
```
---




## Related Guides
**Deployment Management**

- Scale a Deployment
- Restart a Deployment
- Roll Back a Deployment

**Troubleshooting**

- Debug a Crashing Pod

---