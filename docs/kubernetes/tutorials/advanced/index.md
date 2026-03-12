# Advanced Kubernetes Tutorials

These tutorials explore production-grade Kubernetes patterns used in large-scale systems.

They focus on reliability, scalability, and security.

---

## Prerequisites

You should already understand:

- Pods
- Deployments
- Services
- ConfigMaps
- Secrets
- Persistent Volumes
- Ingress

If you are unsure about these topics, complete the **Intermediate Tutorials first**.

---

## Tutorials

<div class="grid cards" markdown>

- :material-traffic-light: **Canary Deployments**

  Gradually release new versions of an application to a small subset of users.

  [:octicons-arrow-right-24: Start Tutorial](canary-deployments.md)

- :material-chart-line: **Horizontal Pod Autoscaling**

  Automatically scale applications based on CPU or memory usage.

  [:octicons-arrow-right-24: Start Tutorial](horizontal-pod-autoscaling.md)

- :material-shield-check: **Role-Based Access Control (RBAC)**

  Control who can access and modify resources in the cluster.

  [:octicons-arrow-right-24: Start Tutorial](rbac.md)

- :material-shield-network: **Network Policies**

  Restrict communication between Pods to improve security.

  [:octicons-arrow-right-24: Start Tutorial](network-policies.md)

- :material-lan-connect: **Service Mesh Introduction**

  Learn how service meshes improve observability, security, and traffic management.

  [:octicons-arrow-right-24: Start Tutorial](service-mesh-intro.md)

</div>

---

## What You Will Learn

After completing these tutorials you will understand:

- Progressive deployment strategies
- Automatic scaling of workloads
- Production cluster security
- Network isolation between services
- Advanced service communication

These patterns are commonly used in **enterprise Kubernetes environments**.

---

## Where to Go Next

Once you complete the tutorials, explore the **How-To Guides** for task-focused operations.

Examples include:

- Troubleshooting production issues
- Updating container images
- Managing persistent storage
- Configuring application settings