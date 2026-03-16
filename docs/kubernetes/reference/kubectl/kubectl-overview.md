# kubectl Overview

## Description

`kubectl` is the command-line interface used to interact with a Kubernetes cluster.  
It allows users to deploy applications, inspect resources, view logs, and manage cluster objects.

`kubectl` communicates with the Kubernetes API server and translates user commands into API requests.

## Basic Syntax

```bash
kubectl [command] [resource] [name] [flags]
```

Example:
`kubectl get pods`




---
## Common Commands

| Command | Purpose |
|--------|----------|
| kubectl get | List resources |
| kubectl describe | Show detailed resource information |
| kubectl logs | View container logs |
| kubectl exec | Execute commands inside a container |
| kubectl apply | Create or update resources from configuration files |




---
## Configuration

kubectl uses a configuration file called kubeconfig to determine:

- cluster endpoint
- authentication credentials
- default namespace

Default location:
`~/.kube/config`



---
## Check kubectl Version
`kubectl version`



---
## Related Commands

- kubectl get
- kubectl describe
- kubectl logs
- kubectl exec
- kubectl apply


---