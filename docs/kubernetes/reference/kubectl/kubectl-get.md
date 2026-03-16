# kubectl get

## Description

`kubectl get` lists Kubernetes resources in the cluster.

It is commonly used to inspect the current state of workloads and infrastructure components.

## Syntax

```bash
kubectl get [resource] [flags]
```


---
## Common Resource Types

| Resource | Description |
|----------|-------------|
| pods | Running containers |
| deployments | Application deployments |
| services | Network access points |
| nodes | Cluster worker nodes |


---
## Examples

**List Pods**
```bash
kubectl get pods
```


**List Pods with Additional Details**
```bash
kubectl get pods -o wide
```


**List Deployments**
```bash
kubectl get deployments
```


**Watch Resources in Real Time**
```bash
kubectl get pods -w
```


**Output Example**
```text
NAME        READY   STATUS    RESTARTS   AGE
nginx-pod   1/1     Running   0          2m
```

---
## Related Commands

- kubectl describe
- kubectl logs

---