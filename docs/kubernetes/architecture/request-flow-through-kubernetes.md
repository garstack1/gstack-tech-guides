# Request Flow Through Kubernetes

## Overview

This section explains what happens when you run:

```bash
kubectl apply -f deployment.yaml
```

---
## End-to-End Flow

<div class="mermaid">
sequenceDiagram
    participant User
    participant APIServer
    participant etcd
    participant Scheduler
    participant Kubelet
    participant ContainerRuntime

    User->>APIServer: kubectl apply (Deployment)
    APIServer->>etcd: Store desired state

    Scheduler->>APIServer: Watch for unscheduled Pods
    Scheduler->>APIServer: Bind Pod to Node

    Kubelet->>APIServer: Watch for assigned Pods
    Kubelet->>ContainerRuntime: Pull image & start container

    ContainerRuntime-->>Kubelet: Container running
    Kubelet-->>APIServer: Report status

    APIServer->>etcd: Update current state
</div>


---
## Step-by-Step Breakdown
### 1. User Request

- kubectl sends request to API Server


---
### 2. API Server

- Validates request
- Stores object in etcd


---
### 3. Scheduler

- Detects unscheduled Pod
- Assigns it to a node


---
### 4. Kubelet

- Watches API Server
- Pulls assigned Pod spec
- Starts containers



---
### 5. Continuous Reconciliation

- Controllers ensure:

    - Correct number of replicas
    - Failed Pods are replaced



---
## Real-World Implications

- Delays in scheduling → resource constraints
- Pod stuck Pending → scheduler issue
- CrashLoopBackOff → runtime or app issue




---
## Key Takeaways

- Everything starts with the API Server
- Scheduling is asynchronous
- Kubernetes is event-driven and declarative

---