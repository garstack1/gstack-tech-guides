# Resource Management

Applications running in Kubernetes consume system resources such as CPU and memory.

If these resources are not managed carefully, a single application can consume excessive resources and negatively impact other workloads running in the cluster.

Kubernetes solves this problem through **resource requests and limits**, which define how much CPU and memory a container can use.





---
## Why Resource Management Matters

In a shared cluster, many applications run on the same nodes.

Without resource controls, problems can occur such as:

| Problem | Impact |
|-------|-------|
Resource starvation | One application consumes resources needed by others |
Unpredictable performance | Applications compete for CPU and memory |
Node instability | Excessive memory usage may cause node failures |

Resource management allows Kubernetes to schedule workloads efficiently while protecting system stability.





---
## Resource Requests

A **resource request** defines the minimum amount of CPU or memory a container needs.

When Kubernetes schedules a pod, it ensures the node has enough available resources to satisfy these requests.

Example:

```yaml
resources:
  requests:
    cpu: "500m"
    memory: "256Mi"
```

This means the container requires:

- 500 millicores of CPU
- 256 megabytes of memory

The Kubernetes scheduler uses these values to determine where the pod can run.




---
### Scheduling with Resource Requests


<div class="mermaid>
flowchart TD

Scheduler["Kubernetes Scheduler"]

Pod["Pod
Request:
CPU: 500m
Memory: 256Mi"]

NodeA["Node A
Available:
CPU: 200m"]

NodeB["Node B
Available:
CPU: 2 CPU"]

Scheduler --> Pod
Pod --> NodeB
</div>

In this example:

1. The pod requests specific resources.
2. The scheduler evaluates available nodes.
3. The pod is scheduled to a node with sufficient resources.





---
## Resource Limits

A **resource limit** defines the maximum amount of CPU or memory a container is allowed to use.

Example:

```yaml
resources:
  limits:
    cpu: "1"
    memory: "512Mi"
```

This configuration ensures the container cannot exceed:

- 1 CPU core
- 512 MB of memory

Limits protect the node from runaway workloads.



---
## Requests vs Limits

Requests and limits serve different purposes.

| Resource Setting | Purpose |
|------------------|---------|
| Requests | Used by the scheduler to place pods |
| Limits | Prevent containers from exceeding resource usage |

Both settings are usually defined together.

Example:
```yaml
resources:
  requests:
    cpu: "500m"
    memory: "256Mi"
  limits:
    cpu: "1"
    memory: "512Mi"
```



---
## CPU vs Memory Behavior

CPU and memory limits behave differently in Kubernetes.

**CPU Limits**

If a container exceeds its CPU limit, Kubernetes throttles the CPU usage.
The container continues running but receives less CPU time.

**Memory Limits**

Memory limits behave differently.
If a container exceeds its memory limit, it is **terminated by the system.**
This results in an **Out Of Memory (OOM) kill.**


---
## Memory Limit Behavior

<div class="mermaid">
flowchart TD

Container["Container"]

MemoryLimit["Memory Limit
512Mi"]

OOM["OOM Kill"]

Container --> MemoryLimit
MemoryLimit --> OOM
</div>

This mechanism protects the node from memory exhaustion.





---
## Resource Units

Kubernetes measures CPU and memory using specific units.

| Resource | Unit | Example |
|--------|------|--------|
CPU | millicores | 500m = half a CPU |
Memory | bytes | 256Mi = 256 megabytes |

Common memory units include:

- Mi (mebibytes)
- Gi (gibibytes)





---
## Key Takeaway

Resource requests and limits allow Kubernetes to schedule workloads efficiently while protecting nodes from resource exhaustion.
By defining minimum and maximum resource usage, clusters can run multiple applications safely and predictably.




---
## Next

The configuration section introduced how Kubernetes manages application settings and system resources.
The next sections explore how workloads, networking, and storage work together to run applications inside a Kubernetes cluster.

---



