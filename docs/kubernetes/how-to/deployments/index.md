# Managing Deployments

Deployments manage the lifecycle of applications running in Kubernetes.

They control:

- the number of running pods
- application updates
- rollouts and rollbacks
- scaling workloads

This section explains how to perform common operational tasks when managing deployments.

---

## Common Tasks

| Task | Guide |
|-----|------|
| Increase or decrease application replicas | [Scale a Deployment](scale-deployment.md) |
| Restore a previous working version | Roll Back a Deployment |
| Restart application pods | Restart a Deployment |

---

## Key Commands

```bash
kubectl get deployments
kubectl describe deployment <deployment-name>
kubectl scale deployment <deployment-name> --replicas=5
kubectl rollout status deployment <deployment-name>
```

These commands allow operators to inspect and manage application deployments.

---