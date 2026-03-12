# Kubernetes Troubleshooting

Kubernetes workloads can fail for many reasons, including application crashes, configuration errors, container image issues, or resource constraints.

This section provides practical guides for diagnosing and resolving common problems in Kubernetes clusters.

Most troubleshooting follows the same workflow:

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get events
```

These commands reveal the majority of runtime issues.

---




# Common Problems

| Problem |	Guide |
|---------|-------|
| Pod repeatedly restarting	| Debug a Crashing Pod |
| Container image cannot be pulled | Debug ImagePullBackOff |
| Need to inspect application logs | View Container Logs |

---

# Key Troubleshooting Commands
```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl get events --sort-by=.metadata.creationTimestamp
```


These commands form the **core Kubernetes debugging workflow.**


---

