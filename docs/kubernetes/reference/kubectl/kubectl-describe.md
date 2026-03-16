# kubectl describe

## Description

`kubectl describe` provides detailed information about a specific Kubernetes resource.

It displays configuration, status information, and recent events.

## Syntax
```bash
kubectl describe [resource] [name]
```

---
## Examples

**Describe a Pod**
```bash
kubectl describe pod nginx-pod
```


**Describe a Node**
```bash
kubectl describe node worker-node-1
```


**Describe a Deployment**
```bash
kubectl describe deployment nginx
```


**Output Includes**

- container configuration
- resource limits
- environment variables
- event logs
- scheduling details



**Typical Use Cases**

- debugging failing pods
- viewing event logs
- inspecting resource configuration


---
## Related Commands

- kubectl get
- kubectl logs

---