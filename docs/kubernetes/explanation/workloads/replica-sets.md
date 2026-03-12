# ReplicaSets

A **ReplicaSet** ensures that a specified number of pod replicas are running at all times.

Its primary purpose is **maintaining availability**.

---

## How ReplicaSets Work

ReplicaSets monitor the cluster and ensure the required number of pods are running.

If a pod fails or is deleted, the ReplicaSet automatically creates a replacement.


<div class="mermaid">
flowchart TD

    ReplicaSet["ReplicaSet"]

    Pod1["Pod"]
    Pod2["Pod"]
    Pod3["Pod"]

    ReplicaSet --> Pod1
    ReplicaSet --> Pod2
    ReplicaSet --> Pod3
</div>


If one pod fails:

The ReplicaSet restores the desired number of replicas.



---
## ReplicaSets and Deployments

In modern Kubernetes usage, ReplicaSets are rarely created directly.

Instead, they are managed automatically by Deployments.

<div class="mermaid">
flowchart TD

    ReplicaSet["ReplicaSet"]

    Pod1["Pod"]
    Pod2["Pod"]
    NewPod["Replacement Pod"]

    ReplicaSet --> Pod1
    ReplicaSet --> Pod2
    ReplicaSet --> NewPod
</div>

This allows Kubernetes to manage application updates safely.

Key Takeaway

ReplicaSets provide self-healing and scaling capabilities, but they are typically controlled by Deployments.