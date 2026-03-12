# Pod Networking
Pod networking is one of the core concepts in Kubernetes.

Every pod in a Kubernetes cluster receives its own **unique IP address**.  
This allows pods to communicate with each other directly, without the need for Network Address Translation (NAT).

This design simplifies communication between applications running across different nodes.



---
## Kubernetes Networking Model

Kubernetes networking follows several important rules:

| Rule | Description |
|-----|-------------|
| Every pod has its own IP address | Pods are directly addressable |
| Pods can communicate with other pods | Even across nodes |
| Containers inside a pod share the same network | They communicate using localhost |
| Nodes can communicate with pods | Direct routing is supported |

These rules create a **flat cluster network**.




---
## Pod-to-Pod Communication

Pods can communicate directly using their IP addresses.

For example:

frontend pod → backend pod

Even if those pods are running on different nodes.



---
## Communication Inside a Pod

Containers inside the same pod share a **network namespace**.

This means they share:

- the same IP address
- the same network interfaces
- the same ports

Containers communicate using **localhost**.

<div class="mermaid">
flowchart TB

Pod["Pod
IP: 10.1.2.3"]

ContainerA["App Container"]
ContainerB["Sidecar Container"]

Pod --> ContainerA
Pod --> ContainerB

ContainerA <-->|localhost| ContainerB
</div>

In this example:

- both containers share the same pod IP
- communication happens over **localhost**




---
## Pod Communication Across Nodes

Kubernetes clusters typically run multiple nodes.

Pods running on different nodes can still communicate directly.

This is made possible through the **Container Network Interface (CNI)**.

CNI plugins handle networking between nodes.

Common CNI plugins include:

- Calico
- Flannel
- Cilium
- Weave

These plugins ensure that pod IP addresses are routable across the cluster.

Pod Communication Across Nodes

<div class="mermaid">
flowchart LR

Node1["Node 1"]
Node2["Node 2"]

PodA["Pod A
10.1.1.2"]

PodB["Pod B
10.1.2.3"]

Node1 --> PodA
Node2 --> PodB

PodA <-->|Pod Network| PodB
</div>

Even though the pods are running on different nodes, they communicate directly using their pod IP addresses.




---
## Why This Design Matters

This networking model makes application development easier.

Developers can treat pods like regular network hosts.

Applications can communicate using:

- IP addresses
- DNS names
- services

without worrying about complex networking rules.




---
## Services and Pod Networking

Although pods have IP addresses, they are **ephemeral**.

Pods can be created and destroyed at any time.

Because of this, applications usually communicate through **Services**, which provide stable network endpoints.

The typical communication flow looks like this:

Client → Service → Pod

Services automatically route traffic to the correct pods.




---
## Key Takeaway

Kubernetes provides a **flat networking model where every pod can communicate with every other pod**, regardless of which node they run on.

This design simplifies application networking and enables highly dynamic container environments.




---
## Next

To understand how applications reliably communicate with pods, see:

- Services
- DNS
- Ingress


---