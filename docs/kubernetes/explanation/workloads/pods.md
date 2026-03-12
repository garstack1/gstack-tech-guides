# Pods

A **Pod** is the smallest deployable unit in Kubernetes.

A pod represents **one or more containers running together on the same node**.

These containers share:

- network namespace
- storage volumes
- lifecycle

---

## Why Pods Exist

Containers are lightweight and ephemeral. Kubernetes groups containers into pods so they can operate as a **single logical unit**.

Typical reasons for multiple containers in a pod include:

- sidecar containers
- logging agents
- proxy containers

---



## Pod Architecture

A pod groups containers that need to work together.

<div class="mermaid">
flowchart TB

    subgraph Pod

        Container1["App Container"]
        Container2["Sidecar Container"]

        Volume["Shared Volume"]

        Container1 --> Volume
        Container2 --> Volume

    end
</div>

All containers inside a pod share the same resources.

---
## Shared Pod Resources

Containers within the same pod share several key resources.

| Resource | Description |
|----------|-------------|
| Network | All containers share the same IP address |
| Ports | Containers communicate via localhost |
| Storage | Containers can mount shared volumes |
| Lifecycle | Containers start and stop together |

This allows containers to communicate as if they were running on the same machine.

---



## Pod Networking

Each pod receives a unique IP address within the cluster.

Containers inside the pod communicate using localhost.

<div class="mermaid">
flowchart TB

    Pod["Pod<br>IP: 10.1.2.3"]

    ContainerA["Container A<br>Application"]
    ContainerB["Container B<br>Sidecar"]

    Pod --> ContainerA
    Pod --> ContainerB

    ContainerA <-->|localhost| ContainerB
</div>

External services communicate with pods using their pod IP or through Kubernetes services.
---



External services communicate with pods using their pod IP or through Kubernetes services.

## Single-Container Pods

Most pods run a single container.

Example:

```console
Pod
 └── nginx container
```

This is the most common deployment pattern used by Kubernetes applications.

---



## Multi-Container Pods

Some pods contain multiple containers that work together.

Common patterns include:

| Pattern | Purpose |
|---------|---------|
| Sidecar | Adds supporting functionality (logging, proxies) |
| Adapter | Converts output format |
| Ambassador | Handles external communication |

Example:
```console
Pod
 ├── Application container
 └── Logging sidecar
```

---



## Pod Lifecycle

Pods move through several phases:

| Phase | Meaning |
|------|--------|
| Pending | Pod accepted but not scheduled |
| Running | Containers started successfully |
| Succeeded | Containers completed successfully |
| Failed | Container terminated with error |

If a pod fails, Kubernetes may restart it depending on the restart policy.

---



## Pod Creation Flow

Pods are usually created indirectly through higher-level controllers.

Most applications create pods using:

- Deployments
- StatefulSets
- Jobs
- DaemonSets

These controllers manage pod scaling and lifecycle automatically.

---



## Why Pods Exist

You might wonder why Kubernetes does not run containers directly.

Pods provide several benefits:

| Benefit | Explanation |
|---------|-------------|
| Shared networking | Containers communicate via localhost |
| Shared storage | Containers share volumes |
| Atomic scheduling | Containers run together on the same node |
| Lifecycle management | Containers start and stop together |

Pods are essentially a **wrapper around containers that provides shared context.**

---



## Key Takeaways

Pods are the fundamental execution unit in Kubernetes.

A pod:

- Contains one or more containers
- Runs on a single node
- Shares networking and storage
- Is managed by higher-level controllers

In production systems, pods are almost always managed by Deployments or other controllers rather than being created manually.

---
