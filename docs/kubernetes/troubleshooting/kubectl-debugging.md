# Debugging with kubectl

## Overview

`kubectl` provides several commands that help diagnose problems in Kubernetes clusters.

These commands allow users to inspect resource status, view logs, and interact with running containers.

## Inspect Cluster Resources

List cluster resources:
```bash
kubectl get pods
```

List nodes:
```bash
kubectl get nodes
```

List services:
```bash
kubectl get services
```

**Inspect Resource Details**

View detailed information:
```bash
kubectl describe pod <pod-name>
```

This command shows:

- container configuration
- events
- resource usage
- scheduling information

**View Logs**

Inspect container logs:
```bash
kubectl logs <pod-name>
```

Stream logs in real time:
```bash
kubectl logs -f <pod-name>
```

**Run Commands Inside Containers**

Open a shell:
```bash
kubectl exec -it <pod-name> -- /bin/bash
```

Run a command:
```bash
kubectl exec <pod-name> -- ls
```
**View Cluster Events**

Check recent cluster events:
```bash
kubectl get events
```


Events can reveal scheduling failures, image pull issues, and container crashes.

**Related Documentation**

- CrashLoopBackOff
- ImagePullBackOff
- Pod scheduling issues

---