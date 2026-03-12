# Debug ImagePullBackOff

## When to Use This Guide

Use this guide when a pod cannot start because Kubernetes is unable to pull the container image.

Pods in this state usually show the status:
```console
ImagePullBackOff
```
or
```console
ErrImagePull
```




This commonly happens when:

- the container image name is incorrect
- the image tag does not exist
- the container registry requires authentication
- network or registry access is restricted

---

!!! tip "Quick Debug Commands"

    ```bash
    kubectl get pods
    kubectl describe pod <pod-name>
    kubectl get events --sort-by=.metadata.creationTimestamp
    ```

    These commands usually reveal the reason Kubernetes cannot pull the container image.

---

## Common Symptoms

| Symptom | Likely Cause | Fix |
|--------|--------------|-----|
| `ImagePullBackOff` | Kubernetes cannot pull the container image | Verify image name and tag |
| `ErrImagePull` | Image does not exist or registry unreachable | Check registry URL |
| `pull access denied` | Private registry requires authentication | Configure image pull secret |
| `manifest unknown` | Image tag does not exist | Use a valid tag |
| `unauthorized` | Registry credentials invalid | Update authentication secret |

---

## Step 1 — Check Pod Status

List pods in the current namespace.

```bash
kubectl get pods
```

Example:
```bash
NAME                     READY   STATUS             RESTARTS   AGE
web-app-6f9c8c7b7d-xk92  0/1     ImagePullBackOff   0          1m
```


The STATUS column indicates Kubernetes failed to retrieve the container image.

---





## Step 2 — Inspect the Pod

Use describe to see why the image pull failed.
```bash
kubectl describe pod web-app-6f9c8c7b7d-xk92
```


Look at the Events section near the bottom.

Example:
```bash
Failed to pull image "myrepo/web-app:latest"
Error response from daemon: pull access denied
```

These messages usually reveal the exact issue.

---





## Step 3 — Verify the Container Image

Check the container image defined in the pod.
```bash
kubectl get pod <pod-name> -o jsonpath="{.spec.containers[*].image}"
```


Example output:
```bash
myrepo/web-app:latest
```


Verify that:

- the repository name is correct
- the image tag exists
- the registry URL is correct

---





## Step 4 — Check Registry Authentication

If the image is stored in a private registry, Kubernetes must authenticate.

Check if the pod uses an image pull secret.
```bash
kubectl get pod <pod-name> -o yaml
```


Look for:
```bash
imagePullSecrets:
- name: registry-secret
```


If missing, create one.

Example:
```bash
kubectl create secret docker-registry registry-secret \
  --docker-server=<registry-url> \
  --docker-username=<username> \
  --docker-password=<password>
```

Then reference it in the deployment.

---





## Step 5 — Check Cluster Events

Cluster events often reveal additional details.
```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

Example:
```bash
Failed to pull image "web-app:v2"
manifest unknown
```

This usually means the **image tag does not exist.**

---




## Common Causes
**Incorrect Image Name**

Example configuration:
```bash
image: webapp:latest
```


If the image actually exists as:
```bash
image: myrepo/webapp:latest
```
Kubernetes will fail to pull it.

---






**Invalid Image Tag**

Example:
```bash
image: web-app:v3
```


If the registry only contains:
```bash
web-app:v1
web-app:v2
```


The pull will fail with:
```bash
manifest unknown
```

---





**Private Registry Authentication**

Private registries require credentials.

Examples:

- Docker Hub private repositories
- AWS ECR
- Google Artifact Registry
- Azure Container Registry

These require **imagePullSecrets.**

---





**Registry Rate Limits**

Public registries such as Docker Hub may limit anonymous pulls.

Symptoms:
```bash
toomanyrequests: rate limit exceeded
```

Solutions include:

- authenticate to the registry
- use a mirror registry
- use a private registry

---





**Quick Diagnosis Workflow**

In most cases the issue can be identified using:
```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl get events
```

Focus on the Events section in the describe output.

This is where Kubernetes reports image pull failures.

---




## Related Guides
**Troubleshooting**

- Debug a Crashing Pod
- View Container Logs

**Deployment Management**

- Scale a Deployment
- Roll Back a Deployment

---