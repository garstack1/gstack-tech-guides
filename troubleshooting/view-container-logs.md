# View Container Logs

## When to Use This Guide

Use this guide when you need to inspect logs from a container running in a Kubernetes pod.

Logs are the **primary way to diagnose application failures**, configuration issues, and runtime errors.

---

!!! tip "Quick Commands"

    ```bash
    kubectl logs <pod-name>
    kubectl logs <pod-name> --previous
    kubectl logs -f <pod-name>
    kubectl logs <pod-name> -c <container-name>
    ```

    These commands cover most logging scenarios in Kubernetes.

---

## Common Log Commands

| Task | Command |
|-----|--------|
| View logs from a pod | `kubectl logs <pod-name>` |
| Follow logs in real time | `kubectl logs -f <pod-name>` |
| View logs from previous container crash | `kubectl logs <pod-name> --previous` |
| View logs from a specific container | `kubectl logs <pod-name> -c <container-name>` |

---




## Step 1 — List Pods

Find the name of the pod.

```bash
kubectl get pods
```

Example output:
```bash
NAME                     READY   STATUS    RESTARTS   AGE
web-app-6f9c8c7b7d-xk92  1/1     Running   0          10m
```

---



## Step 2 — View Logs

Retrieve logs from the pod.
```bash
kubectl logs web-app-6f9c8c7b7d-xk92
```


Example:
```bash
Starting web server...
Connected to database
Listening on port 8080
```
---




## Step 3 — Stream Logs in Real Time

Follow logs as they are generated.
```bash
kubectl logs -f web-app-6f9c8c7b7d-xk92
```

This is useful for debugging applications during deployment or testing.

---





## Step 4 — View Logs From a Previous Crash

If a container restarts, Kubernetes keeps logs from the previous instance.
```bash
kubectl logs web-app-6f9c8c7b7d-xk92 --previous
```

This is especially useful when diagnosing CrashLoopBackOff errors.

---





## Step 5 — View Logs From a Specific Container

If a pod contains multiple containers, specify which container to inspect.
```bash
kubectl logs <pod-name> -c <container-name>
```


Example:
```bash
kubectl logs web-app-6f9c8c7b7d-xk92 -c nginx
```

---




## Troubleshooting
**No Logs Returned**

Possible causes:

- container has not started yet
- incorrect pod name
- logs already rotated

Verify the pod status:
```bash
kubectl get pods
```

---




**Pod Has Multiple Containers**

Check container names:
```bash
kubectl describe pod <pod-name>
```


Then specify the container:
```bash
kubectl logs <pod-name> -c <container-name>
```


---




## Next Steps

Logs are often the first step in diagnosing Kubernetes issues.

You may also want to read:

- Debug a Crashing Pod
- Debug ImagePullBackOff Errors
- Investigate a Pending Pod


---

