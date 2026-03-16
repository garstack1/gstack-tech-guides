# kubectl logs

## Description

`kubectl logs` retrieves logs from containers running in a Kubernetes pod.

It is commonly used for debugging applications and monitoring runtime behavior.

## Syntax

```bash
kubectl logs [pod-name]
```


---
## Examples

**View Pod Logs**
```bash
kubectl logs nginx-pod
```


**Stream Logs in Real Time**
```bash
kubectl logs -f nginx-pod
```


**View Logs for a Specific Container**
```bash
kubectl logs nginx-pod -c nginx
```


**View Previous Container Logs**
```bash
kubectl logs --previous nginx-pod
```


---
## Common Flags
| Flag | Description |
|------|-------------|
| -f | Follow logs in real time |
| -c | Specify container |
| --previous | Show logs from previous container instance |



---
## Related Commands

- kubectl get
- kubectl describe

---