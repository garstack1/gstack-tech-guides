# Kubernetes Reference

## Overview

This section provides reference documentation for commonly used Kubernetes
commands and objects.

Reference documentation is designed for quick lookup rather than step-by-step
learning.

## kubectl Commands

The following commands are commonly used to interact with Kubernetes clusters.

- kubectl overview
- kubectl get
- kubectl describe
- kubectl logs
- kubectl exec
- kubectl apply

These commands allow users to inspect resources, retrieve logs, run commands
inside containers, and manage cluster workloads.

## Kubernetes Objects

Kubernetes resources are represented as objects managed by the Kubernetes API.

Common objects include:

- Pods
- Deployments
- Services
- ConfigMaps
- Secrets
- StatefulSets

Each object page describes its purpose, configuration fields, and typical
usage patterns.

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