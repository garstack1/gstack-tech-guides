# Application Configuration

Applications running in Kubernetes often require configuration such as environment variables, application settings, and credentials.

Kubernetes provides several mechanisms for managing configuration:

- **Environment variables**
- **ConfigMaps** for application configuration
- **Secrets** for sensitive data

This section explains how to manage configuration for Kubernetes workloads.

---

## Common Tasks

| Task | Guide |
|-----|------|
| Provide configuration values to applications | Use ConfigMaps |
| Store sensitive information | Use Secrets |
| Add environment variables to containers | Add Environment Variables |

---

## Key Commands

```bash
kubectl get configmaps
kubectl get secrets
kubectl describe configmap <name>
kubectl describe secret <name>
```
These commands help inspect configuration resources used by applications.

---