# kube-proxy

kube-proxy is a networking component that runs on every node in a Kubernetes cluster.

Its role is to implement the networking rules required for **services**.

**kube-proxy Traffic Flow**

<div class="mermaid">
flowchart LR

Client["Client"]

Node["Node"]

Service["Service"]

kubeProxy["kube-proxy"]

Pod["Pod"]

Client --> Node
Node --> Service
Service --> kubeProxy
kubeProxy --> Pod
</div>


---
## What kube-proxy Does

kube-proxy watches the Kubernetes API for service changes.

When services or endpoints change, kube-proxy updates network rules on the node.

These rules route traffic from services to the correct pods.




---
## How kube-proxy Works

kube-proxy typically uses one of these mechanisms:

| Mode | Description |
|----|----|
iptables | Uses Linux packet filtering |
IPVS | Uses kernel-level load balancing |
Userspace | Legacy mode |

Most clusters today use **iptables or IPVS**.



---
## Traffic Flow

When traffic reaches a service:

1. kube-proxy intercepts the request
2. selects a backend pod
3. forwards the traffic to the pod


---
## Key Takeaway

kube-proxy enables **service networking by managing routing rules on every node**.


---