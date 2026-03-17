# Control Plane Components

## What is the Control Plane?

The Control Plane is the brain of Kubernetes.

It is responsible for:

- Making scheduling decisions
- Maintaining cluster state
- Responding to changes




---
## Core Components

### API Server

The API Server is the front door to Kubernetes.

- All communication goes through it
- Validates and processes requests
- Persists state to etcd




---
### etcd

A distributed key-value store.

- Stores all cluster data
- Acts as the **source of truth**
- Highly consistent and fault-tolerant




---
### Scheduler

Assigns workloads to nodes.

- Watches for unscheduled Pods
- Selects the best node based on:
  - Resources
  - Constraints
  - Policies





---
### Controller Manager

Runs controllers that maintain system state.

Examples:

- Node Controller
- Deployment Controller
- ReplicaSet Controller

Each controller follows:

> Desired State → Compare → Act

---

## How They Work Together

<div class="mermaid">
graph TD
    User --> APIServer
    APIServer --> etcd
    APIServer --> Scheduler
    APIServer --> ControllerManager

    Scheduler --> Node
    ControllerManager --> APIServer
</div>


---
## Real-World Implications

- API Server downtime = cluster unusable
- etcd corruption = cluster state loss
- Controllers are what make Kubernetes "self-healing"




---
## Key Takeaways

- Everything flows through the API Server
- etcd is the single source of truth
- Controllers enforce desired state continuously


---