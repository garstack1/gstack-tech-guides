
# Kubernetes Networking

Kubernetes networking enables communication between pods, services, and external clients.

Applications in a cluster typically communicate through:

- **Pods** for individual containers
- **Services** for stable networking endpoints
- **Ingress** for external HTTP and HTTPS access

This section explains how to configure and troubleshoot networking for Kubernetes applications.

---

## Common Tasks

| Task | Guide |
|-----|------|
| Expose an application within the cluster | Expose a Service |
| Expose an application to external users | Expose a Service with Ingress |
| Access a pod locally for debugging | Port-Forward to a Pod |

---

## Key Commands

```bash
kubectl get services
kubectl describe service <service-name>
kubectl port-forward pod/<pod-name> 8080:80
```

These commands help inspect and interact with cluster networking resources.

---