# Pod Stuck in Pending State

## Problem

A pod remains in the **Pending** state and is not scheduled on a node.

## Symptoms

```bash
kubectl get pods
```

Output:
```text
NAME       READY   STATUS    AGE
web-app    0/1     Pending   3m
```



## Common Causes

Possible causes include:

- insufficient cluster resources
- node selector constraints
- resource limits too high
- persistent volume unavailable
- taints preventing scheduling

**Investigation**

Check pod events:
```bash
kubectl describe pod web-app
```

Inspect node availability:
```bash
kubectl get nodes
```

Check resource usage:
```bash
kubectl describe node <node-name>
```

**Resolution**

Possible fixes include:

- adding additional cluster nodes
- adjusting resource limits
- removing restrictive node selectors
- resolving persistent volume issues

**Prevention**

Best practices:

- monitor cluster capacity
- configure resource requests carefully
- review scheduling constraints

---