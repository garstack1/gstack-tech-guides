# Kubernetes Reference

The reference section provides quick access to Kubernetes concepts, configuration examples, and command syntax.

These pages are designed for **fast lookup** when you already understand the basics but need to quickly review configuration details or commands.

---

## Reference Topics

<div class="grid cards" markdown>

-   :material-web: **Ingress**

    Configure external HTTP and HTTPS access to services inside the cluster.

    [:octicons-arrow-right-24: Open Reference](ingress.md)

-   :material-package-variant: **Helm Basics**

    Install and manage Kubernetes applications using Helm charts.

    [:octicons-arrow-right-24: Open Reference](helm-basics.md)

-   :material-chart-line: **Resource Limits & HPA**

    Control container resource usage and automatically scale applications.

    [:octicons-arrow-right-24: Open Reference](hpa.md)

-   :material-shield-lock: **RBAC & Network Policies**

    Manage permissions and control communication between pods.

    [:octicons-arrow-right-24: Open Reference](rbac-network-policies.md)

-   :material-database: **StatefulSets**

    Deploy stateful workloads that require persistent storage.

    [:octicons-arrow-right-24: Open Reference](statefulsets.md)

</div>

---

## Quick Kubernetes Commands

Common commands used when working with Kubernetes:

```bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```