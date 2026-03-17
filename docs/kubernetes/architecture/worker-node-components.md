# Worker Node Components

## What is a Worker Node?

Worker nodes are the machines where your applications actually run.

Each node contains the components needed to execute and manage containers.

---
## Core Components

### Kubelet

The Kubelet is the node agent.

- Receives instructions from API Server
- Ensures containers are running
- Reports node status



---
### Kube Proxy

Handles networking for the node.

- Maintains network rules
- Enables communication between services and pods





---
### Container Runtime

Responsible for running containers.

Examples:

- containerd
- CRI-O



---
## How It Works

<div class="mermaid">
graph TD
    APIServer --> Kubelet
    Kubelet --> ContainerRuntime
    Kubelet --> Pods

    KubeProxy --> Network
</div>



---
## Real-World Implications

- If Kubelet stops → Pods stop being managed
- If runtime fails → containers crash
- Networking issues often trace back to kube-proxy



---
## Key Takeaways

- Kubelet is the most critical node component
- Nodes execute, Control Plane decides
- Runtime stability is essential for workloads

---