# Kubernetes Architecture

Kubernetes is a distributed system designed to run containerized applications across clusters of machines.

A Kubernetes cluster consists of two primary components:

- **Control Plane** – manages the cluster
- **Worker Nodes** – run application workloads

Understanding this architecture is critical for operating, debugging, and scaling Kubernetes environments.

---

## Kubernetes Architecture Overview

<div class="mermaid">
flowchart TB

    User["User / kubectl"]

    subgraph ControlPlane["Control Plane"]
        APIServer["API Server"]
        Scheduler["Scheduler"]
        Controller["Controller Manager"]
        ETCD["etcd"]
    end

    subgraph WorkerNode1["Worker Node"]
        Kubelet1["kubelet"]
        PodA["Pod"]
    end

    subgraph WorkerNode2["Worker Node"]
        Kubelet2["kubelet"]
        PodB["Pod"]
    end

    User --> APIServer

    APIServer --> Scheduler
    APIServer --> Controller
    APIServer --> ETCD

    Scheduler --> Kubelet1
    Scheduler --> Kubelet2

    Kubelet1 --> PodA
    Kubelet2 --> PodB
</div>


This diagram illustrates the core architecture of a Kubernetes cluster.

Users interact with the cluster through the API Server, which coordinates scheduling and cluster state management.

---



## Control Plane

The control plane is responsible for managing the entire cluster.

It performs tasks such as:

- scheduling workloads
- monitoring cluster state
- maintaining desired configuration
- recovering from failures

The control plane continuously compares the desired state with the actual state of the cluster and makes adjustments as needed.

Core control plane components include:

| **Component**	| **Purpose** |
|-----------|---------|
| API Server | Entry point for cluster operations |
| Scheduler | Assigns pods to nodes |
| Controller Manager | Maintains cluster state |
| etcd | Distributed key-value database |

---

## Worker Nodes

Worker nodes are the machines that actually run containerized applications.

Each worker node contains several components that enable it to communicate with the control plane and run containers.

Key components include:

| Component | Purpose |
|-----------|---------|
| kubelet | Ensures containers are running |
| container runtime | Executes containers |
| kube-proxy | Handles networking rules |

These components work together to run the pods scheduled by the control plane.

---

## How the System Works

When you deploy an application in Kubernetes, the following process occurs:

1. A user submits a configuration file using kubectl
2. The request is sent to the API Server
3. The configuration is stored in etcd
4. The Scheduler selects a node
5. The kubelet on the selected node starts the container
6. Controllers continuously monitor the system to maintain the desired state

---



## Key Takeaway

Kubernetes operates using a control loop model.

Rather than executing one-time commands, the system continuously monitors the cluster and adjusts resources to maintain the desired configuration.

---