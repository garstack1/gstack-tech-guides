# RBAC & Network Policies

Kubernetes provides security controls through:

- Role Based Access Control (RBAC)
- Network Policies

RBAC controls **who can access Kubernetes resources**.

---

## Core RBAC Objects

| Object                 | Purpose                                |
|------------------------|----------------------------------------|
| Role                   | Permissions within a namespace         |
| ClusterRole            | Permissions cluster-wide               |
| RoleBinding            | Assign role to user/service account    |
| ClusterRoleBinding     | Assign cluster role globally           |

---

## Role Example

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```
---




## Role Binding Example

```yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: read-pods
subjects:
- kind: User
  name: jane
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

---




## Network Policies

Network policies control traffic between pods.

Without policies, pods can communicate freely.

---




## Example Network Policy
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-api
spec:
  podSelector:
    matchLabels:
      app: api
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
```

This allows traffic:
```yaml
frontend pods → api pods
```

---




## Commands

View policies:
```bash
kubectl get networkpolicy
```


Describe policy:
```bash
kubectl describe networkpolicy <name>
```
