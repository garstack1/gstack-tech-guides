# Node Components

A **node** is a machine in a Kubernetes cluster that runs your applications.

Nodes are responsible for executing containers and maintaining the runtime environment required by pods.

Nodes can be:

- Physical machines
- Virtual machines
- Cloud instances

Each node contains several components that allow it to communicate with the Kubernetes control plane and manage workloads.

---

## Node Architecture

<div class="mermaid">
flowchart TB

    subgraph Node

        Kubelet["kubelet"]
        KubeProxy["kube-proxy"]
        ContainerRuntime["Container Runtime"]

        Pods["Pods"]
        Containers["Containers"]

        ContainerRuntime --> Containers
        Containers --> Pods

        Kubelet --> Pods
        KubeProxy --> Pods

    end
</div>

Nodes execute workloads by running containers inside pods while staying synchronized with the control plane.

---



## Key Node Components

Every Kubernetes node runs three core components:

| **Component** | **Purpose** |
|-----------|---------|
| kubelet | Communicates with the control plane and manages pods |
| kube-proxy | Handles networking and service routing |
| Container Runtime | Runs containers on the node |

---



**kubelet**

The kubelet is the primary agent running on every node.

It ensures that containers described in Kubernetes manifests are running correctly.

Responsibilities include:

- Receiving pod specifications from the API server
- Starting containers via the container runtime
- Monitoring container health
- Restarting failed containers
- Reporting node and pod status to the control plane

**Simplified Flow**

<div class="mermaid">
flowchart LR

    APIServer["API Server"]
    Kubelet["kubelet"]
    Runtime["Container Runtime"]
    Pod["Pod"]

    APIServer --> Kubelet
    Kubelet --> Runtime
    Runtime --> Pod
</div>

The kubelet acts as the **bridge between Kubernetes and the underlying host system.**


---



**kube-proxy**

kube-proxy manages networking rules that allow services to communicate with pods.

It maintains network rules on each node and routes traffic to the correct pods.

Responsibilities include:

- Implementing Kubernetes Services
- Load balancing traffic across pod replicas
- Managing network forwarding rules
- Handling cluster networking

**Traffic Routing Example**

<div class="mermaid">
flowchart LR

    Client["Client Request"]
    Service["Kubernetes Service"]
    Proxy["kube-proxy"]

    Pod1["Pod A"]
    Pod2["Pod B"]
    Pod3["Pod C"]

    Client --> Service
    Service --> Proxy
    Proxy --> Pod1
    Proxy --> Pod2
    Proxy --> Pod3
</div>
This allows Kubernetes to distribute requests across multiple pods.

---



**Container Runtime**

The **container runtime** is the software responsible for running containers.

It pulls container images and starts containers based on instructions from the kubelet.

Common runtimes include:

| Runtime | Description |
|---------|-------------|
| containerd | Lightweight runtime widely used in Kubernetes |
| CRI-O	| Kubernetes-focused container runtime |
| Docker (legacy) | Historically common but now replaced by containerd |

The runtime performs tasks such as:

- Pulling container images
- Starting and stopping containers
- Managing container resources
- Handling container isolation

---



**Node Responsibilities**

Each node performs several key functions within a cluster:

- Running application workloads
- Managing container lifecycle
- Enforcing resource limits
- Handling networking for pods
- Reporting status to the control plane

The control plane decides **where pods should run**, but nodes are responsible for **actually executing them.**

---



## Control Plane vs Node

| **Control Plane**	| **Nodes** |
|---------------|-------|
| Makes scheduling decisions | Runs application workloads |
| Stores cluster state | Executes containers |
| Manages cluster operations | Reports status and health |

This separation allows Kubernetes to scale workloads across many machines while maintaining centralized control.

---



## Summary

Nodes are the machines that run containers in a Kubernetes cluster.

Each node includes:

- kubelet – manages pods and communicates with the control plane
- kube-proxy – manages networking and service routing
- Container runtime – runs containers

Together, these components allow Kubernetes to deploy and manage applications across distributed infrastructure.

---