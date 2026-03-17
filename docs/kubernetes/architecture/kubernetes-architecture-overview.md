# Kubernetes Architecture Overview

## What is Kubernetes Architecture?

Kubernetes architecture defines how the system is structured to manage containerized applications across a cluster of machines.

At a high level, Kubernetes is split into two main parts:

- **Control Plane** – Makes decisions about the cluster
- **Worker Nodes** – Run your applications

---

## Why This Architecture Exists

Kubernetes is designed to:

- Decouple **decision-making** from **execution**
- Enable **horizontal scalability**
- Provide **self-healing systems**
- Support **declarative infrastructure**

This separation is what allows Kubernetes to manage thousands of containers reliably.

---

## High-Level Architecture

<div class="mermaid">
graph TD
    User -->|kubectl/API| APIServer
    APIServer --> Scheduler
    APIServer --> ControllerManager
    APIServer --> etcd

    Scheduler --> Node1
    Scheduler --> Node2

    Node1 --> Kubelet1
    Node1 --> KubeProxy1

    Node2 --> Kubelet2
    Node2 --> KubeProxy2
</div>




---
## Core Components
**Control Plane**

- API Server
- Scheduler
- Controller Manager
- etcd

**Worker Nodes**

- Kubelet
- Kube Proxy
- Container Runtime



---
## How It Works (Simple View)

1. User submits a request (e.g. deploy a Pod)
2. API Server validates and stores it in etcd
3. Scheduler assigns the workload to a node
4. Kubelet runs the container on that node
5. Controllers continuously ensure desired state is maintained




---
## Real-World Implications

- If the Control Plane fails, the cluster stops making decisions
- If a Node fails, workloads are rescheduled automatically
- Everything is driven by desired state, not manual intervention





---
## Key Takeaways

- Kubernetes separates control from execution
- The API Server is the central communication hub
- The system continuously reconciles desired vs actual state

---