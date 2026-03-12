# Perform a Rolling Update and Rollback
## Goal

In this tutorial you will learn how to safely update an application in Kubernetes and roll back to a previous version if something goes wrong.

You will learn how to:

- perform a rolling update
- monitor deployment progress
- roll back to a previous release

---



## Problem

Applications often need to be updated with new versions.

Updating containers incorrectly can cause:

- downtime
- service interruptions
- failed deployments

Kubernetes solves this with rolling updates, which gradually replace old pods with new ones.

---



## Architecture

During a rolling update Kubernetes replaces pods one at a time.

```text
Old Pods → New Pods
```

Traffic continues flowing to healthy pods during the update.

Example:
```text
Version 1 Pods → Version 2 Pods
```

---



## Prerequisites

Ensure:

- Kubernetes cluster is running
- `kubectl` configured

Verify access:
```bash
kubectl get nodes
```

Expected output:
```text
NAME           STATUS
worker-node1   Ready
```
---




## Step 1 : Deploy the Initial Application

Create a deployment file `deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: nginx:1.21
          ports:
            - containerPort: 80
```

Apply the deployment.
```bash
kubectl apply -f deployment.yaml
```

Verify the pods.
```bash
kubectl get pods
```

Example output:
```text
NAME                     READY   STATUS
web-app-abc123           1/1     Running
web-app-def456           1/1     Running
web-app-ghi789           1/1     Running
```

---



## Step 2 : Update the Container Image

Update the deployment to use a newer version.

Run:
```bash
kubectl set image deployment/web-app web=nginx:1.25
```
This triggers a rolling update.

---



## Step 3 : Monitor the Rollout

Watch the rollout progress.
```bash
kubectl rollout status deployment web-app
```

Expected output:
```text
deployment "web-app" successfully rolled out
```

You can also watch pods being replaced.
```bash
kubectl get pods -w
```

You will see new pods created while old pods terminate.

---



## Step 4 : View Deployment History

Kubernetes tracks rollout history.

Run:
```bash
kubectl rollout history deployment web-app
```

Example output:
```text
REVISION  CHANGE-CAUSE
1         nginx:1.21
2         nginx:1.25
```

Each update creates a new revision.

---



## Step 5 : Simulate a Failed Deployment

Update the image to an invalid version.
```bash
kubectl set image deployment/web-app web=nginx:invalid
```

Check the pod status.
```bash
kubectl get pods
```

You may see:
```text
ImagePullBackOff
```
This simulates a broken deployment.

---



## Step 6 : Roll Back the Deployment

Roll back to the previous working version.
```bash
kubectl rollout undo deployment web-app
```

Verify the rollout.
```bash
kubectl rollout status deployment web-app
```
Kubernetes restores the previous working revision.

---



## Verify the Rollback

Check the running image.
```bash
kubectl describe deployment web-app
```

Look for:
```text
Image: nginx:1.25
```
Your application is now running the last stable version.

---



## What Just Happened

Kubernetes performed two important operations:

| **Operation** | **Description** |
|-----------|-------------|
| Rolling update | Gradually replaced pods with a new version |
| Rollback | Restored a previous deployment revision |

This allows updates **without downtime.**

---



## Troubleshooting
**Rollout Stuck**

Check deployment status.
```bash
kubectl describe deployment web-app
```

---



**Pods Failing**

Inspect pod logs.
```bash
kubectl logs <pod-name>
```

---



**Image Pull Errors**

Verify the image exists.
```bash
docker pull nginx:1.25
```

---



## Clean Up

Delete the deployment when finished.
```bash
kubectl delete deployment web-app
```

---



## Key Takeaways

You learned how to:

- update applications using rolling deployments
- monitor rollout progress
- view deployment revision history
- roll back to a previous version

Rolling updates are the standard deployment strategy in Kubernetes.

---

[→ Next: Part 6 – Expose App With Ingress](../intermediate/expose-app-with-ingress.md)