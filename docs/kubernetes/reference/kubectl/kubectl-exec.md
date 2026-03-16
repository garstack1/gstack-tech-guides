# kubectl exec

## Description

`kubectl exec` runs a command inside a running container within a Kubernetes pod.

It is commonly used for debugging applications or performing administrative tasks.


## Syntax
```bash
kubectl exec [pod-name] -- [command]
```


---
## Examples
**Run a Command in a Container**
kubectl exec nginx-pod -- ls


**Open a Shell Inside a Container**
kubectl exec -it nginx-pod -- /bin/bash


**Run a Command in a Specific Container**
kubectl exec nginx-pod -c nginx -- ls



---
## Common Flags
| Flag | Description |
|------|-------------|
| -it | Interactive terminal |
| -c | Specify container |



---
## Use Cases
- debugging application containers
- inspecting container file systems
- running administrative commands


---
## Related Commands

kubectl logs

kubectl describe


