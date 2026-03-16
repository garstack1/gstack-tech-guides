# Service Not Reachable

## Problem

Applications cannot access a Kubernetes service.

## Symptoms

- application cannot connect to service
- requests time out
- service returns connection errors

## Investigation

Verify the service exists:

```bash
kubectl get services
```

Check endpoints:
```bash
kubectl get endpoints
```

Inspect service configuration:
```bash
kubectl describe service my-service
```

Verify pods are running:
```bash
kubectl get pods
```

---
## Common Causes

Typical causes include:

- pods not running
- incorrect service selector
- network policy blocking traffic
- incorrect service type

Resolution

Possible solutions:

- update service selectors
- ensure pods match labels
- review network policies
- verify container ports

**Prevention**

Best practices:

- validate service selectors
- monitor service endpoints
- use consistent labeling

---