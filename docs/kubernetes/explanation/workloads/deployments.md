# Deployments

A **Deployment** is the most commonly used workload resource in Kubernetes.

Deployments manage the lifecycle of applications by controlling:

- pod creation
- scaling
- rolling updates
- rollbacks




---
## Why Deployments Exist

Running pods directly would require manual management.

Deployments automate this process by ensuring the desired number of pods are always running.

If a pod crashes, Kubernetes automatically replaces it.





---
## Deployment Architecture

<div class="mermaid">
flowchart TD

    Deployment["Deployment"]

    ReplicaSet["ReplicaSet"]

    Pod1["Pod"]
    Pod2["Pod"]
    Pod3["Pod"]

    Deployment --> ReplicaSet

    ReplicaSet --> Pod1
    ReplicaSet --> Pod2
    ReplicaSet --> Pod3
</div>

When a Deployment is created:

1. Kubernetes creates a ReplicaSet
2. The ReplicaSet creates Pods
3. The ReplicaSet ensures the correct number of pods remain running



---
## Rolling Updates

One of the most powerful features of Deployments is rolling updates.

<div class="mermaid">
flowchart LR

    OldPods["Old Version Pods"]
    NewPods["New Version Pods"]

    OldPods --> NewPods
</div>

This allows applications to update gradually without downtime.

During a rolling update:

- new pods are started
- old pods are terminated gradually

This ensures the application remains available.




---
## Rollbacks

If a deployment fails, Kubernetes allows quick rollback to a previous version.

This makes deployments safer and reduces downtime during application updates.



---
## Key Takeaway

Deployments provide a declarative way to manage application updates and scaling in Kubernetes.

---