# Kubernetes Architecture

Kubernetes is a distributed system designed to manage containerized workloads across clusters of machines.

A Kubernetes cluster consists of two major components:

- **Control Plane**
- **Worker Nodes**

---

## Architecture Overview

The control plane manages the cluster and makes scheduling decisions.

Worker nodes run the containers that make up your applications.

---

## Key Components

| Component | Role |
|-----------|------|
| API Server | Entry point for all cluster operations |
| Scheduler | Assigns pods to nodes |
| Controller Manager | Maintains cluster state |
| etcd | Distributed key-value store for cluster data |

---

## Learn More

- Control Plane Components
- Node Components
- Cluster Architecture

---