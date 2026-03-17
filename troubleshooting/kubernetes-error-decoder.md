# Kubernetes Error Decoder
## Problem

Applications sometimes fail with Kubernetes error states that are not immediately clear.

This guide maps common Kubernetes errors to their most likely causes and fixes.

CrashLoopBackOff
**What it Means**

The container starts, crashes, and Kubernetes repeatedly restarts it.

**Diagnose**

Run:
```bash
kubectl describe pod <pod-name>
```


Check logs:
```bash
kubectl logs <pod-name>
```


**Common Causes**

| Cause | Description |
|-------|-------------|
| Application crash	| Runtime error inside container |
| Bad configuration	| Missing environment variables |
| Dependency failure | Database or API unreachable |
| Port conflict	| Application cannot bind port |


**Fix**
Inspect container logs:
```bash
kubectl logs <pod-name> --previous
```

Fix the underlying application error.

---



## ImagePullBackOff
**What it Means**

Kubernetes cannot pull the container image.

Diagnose
```bash
kubectl describe pod <pod-name>
```


Look for:
```console
Failed to pull image
```



**Common Causes**
| Cause	| Description |
|-------|-------------|
| Wrong image name | Typo in image |
| Private registry | Authentication missing |
| Tag not found	| Image tag does not exist |

**Fix**

Verify the image.

docker pull <image>

If using private registry, configure image pull secrets.

---



## Pending Pods
**What it Means**

Pod cannot be scheduled on a node.

**Diagnose**
```bash
kubectl describe pod <pod-name>
```


Look for scheduling errors.

**Common Causes**

| Cause	| Description |
|-------|-------------|
| Insufficient CPU | Cluster resources exhausted |
| Insufficient memory | Node memory limit reached |
| Node selectors | Pod requires specific nodes |
| PVC Pending | Storage not available |

**Fix**

Check node resources.
```bash
kubectl describe nodes
```


---



## PVC Pending
**What it Means**

Persistent storage cannot be allocated.

**Diagnose**
```bash
kubectl get pvc
```
Output:
```console
STATUS: Pending
```

**Fix**
Check storage classes.
```bash
kubectl get storageclass
```


---



## Pod Stuck Terminating
**What it Means**

Pod cannot shut down properly.

**Diagnose**
```bash
kubectl get pod
```

Status:
```bash
Terminating
```

**Fix**

Force delete.
```bash
kubectl delete pod <pod-name> --force --grace-period=0
```


---