# CrashLoopBackOff

## Problem

A pod repeatedly crashes and Kubernetes places the container in a **CrashLoopBackOff** state.

Kubernetes continuously attempts to restart the container but delays future restarts after repeated failures.

---
## Symptoms

Pods display a status similar to:

```bash
kubectl get pods
```

Output:
```text
NAME        READY   STATUS             RESTARTS
web-app     0/1     CrashLoopBackOff   5
```

## Common Causes

Typical causes include:

- application startup failure
- invalid container command
- missing environment variables
- configuration errors
- application dependencies unavailable

**Investigation**

Inspect pod details:
```bash
kubectl describe pod web-app
```

Check container logs:
```bash
kubectl logs web-app
```

Check previous container logs:
```bash
kubectl logs --previous web-app
```

**Resolution**

Steps depend on the root cause.

Examples:

- fix application startup command
- correct environment variables
- update configuration files
- ensure dependent services are available

After fixing the issue, redeploy the pod:

```bash
kubectl apply -f deployment.yaml
```

**Prevention**

Best practices:

- validate container commands
- implement health checks
- monitor application logs
- test container images before deployment


---