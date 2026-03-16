# ImagePullBackOff

## Problem

The container image cannot be pulled from the container registry.

Kubernetes retries the pull operation and eventually places the pod in **ImagePullBackOff** state.

## Symptoms

```bash
kubectl get pods
```

Output:
```text
NAME        READY   STATUS             RESTARTS
web-app     0/1     ImagePullBackOff   0
```


---
## Common Causes

Common causes include:

- incorrect image name
- invalid image tag
- private registry authentication failure
- network connectivity issues
- image does not exist in registry

**Investigation**

Inspect pod events:
```bash
- kubectl describe pod web-app
```

Look for messages such as:
```text
Failed to pull image
```

Verify the image exists in the container registry.

**Resolution**

Possible fixes:

- correct the image name
- update the image tag
- configure registry credentials
- verify network connectivity

Update the deployment configuration:
```bash
kubectl apply -f deployment.yaml
```

**Prevention**

Best practices:

- verify container images before deployment
- use image tags instead of latest
- configure registry authentication


---
