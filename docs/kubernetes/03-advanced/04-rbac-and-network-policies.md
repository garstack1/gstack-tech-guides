


# Advanced Kubernetes Part 4: RBAC & Network Policies – Securing the Cluster

By default, Kubernetes gives broad access (especially in local clusters like Minikube).  
In real environments, that's dangerous:
- A compromised Pod could delete everything
- One team's app could talk to another's database
- Developers might accidentally change production resources

Two main security layers:
- **RBAC** (Role-Based Access Control) — controls **who** (users/service accounts) can do **what** (verbs like get/create/delete) on **which** resources  
- **Network Policies** — controls **which Pods** can talk to **which other Pods** (network-level firewall)

Pizza chain analogy:  
- RBAC = who has keys to the kitchen door, who can change recipes, who can fire staff  
- Network Policies = which kitchens can send deliveries to which restaurants (prevent cross-contamination)

## Goal for this section

Create a restricted user/role that can only read Pods  
Create a Network Policy that blocks all traffic except from our Service

## Step 1: RBAC – Create a read-only role

Create `read-only-role.yaml`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods-binding
  namespace: default
subjects:
- kind: User
  name: readonly-user
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
  
  
  ``````
  ``
  
  
````


Apply:

Bash

```
kubectl apply -f read-only-role.yaml
```

This creates:

- A Role that allows only reading Pods
- A binding that gives it to a user named readonly-user

## Step 2: Test the restricted user

Switch to the restricted user (simulated locally):

Bash

```
kubectl config set-credentials readonly-user --username=readonly-user
kubectl config set-context readonly-context --cluster=minikube --user=readonly-user --namespace=default
kubectl config use-context readonly-context
```

Try commands:

Bash

```
kubectl get pods          # Works — allowed
kubectl get deployments   # Fails — not allowed
kubectl delete pod ...    # Fails — not allowed
```

Switch back to admin:

Bash

```
kubectl config use-context minikube
```

→ Proof: RBAC restricts access per user/role.

## Step 3: Network Policies – Block unwanted traffic

By default, all Pods can talk to all other Pods. Network Policies act like a firewall.

Create deny-all-except-service.yaml:

YAML

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-except-service
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: nginx
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector: {}           # Allow from any Pod in same namespace
    ports:
    - protocol: TCP
      port: 80
```

Apply:

Bash

```
kubectl apply -f deny-all-except-service.yaml
```

This says:

- Apply to Pods with label app: nginx
- Allow inbound traffic **only** on port 80 from Pods in the same namespace
- Deny everything else

Test (create a temporary test Pod):

Bash

```
kubectl run test-pod --image=busybox --rm -it -- sh
```

Inside the test Pod shell:

sh

```
wget -qO- nginx-service:80   # Works (Service routes to nginx port 80)
wget -qO- nginx-service:8080 # Fails (not allowed)
exit
```

→ Network Policy blocks unauthorized traffic.

## Step 4: Cleanup

Bash

```
kubectl delete networkpolicy deny-all-except-service
kubectl delete role pod-reader
kubectl delete rolebinding read-pods-binding
```

## Key Takeaways

- **RBAC** controls API access (users/roles/verbs/resources) — always least privilege
- **Network Policies** control Pod-to-Pod traffic — default is "allow all", so you must explicitly allow
- Most clusters use both + admission controllers + pod security standards
- Production: Use tools like Kyverno/OPA Gatekeeper for policy enforcement

You've now added real security controls — a big step toward production readiness.

→ Next & Final Advanced Part: StatefulSets + Headless Services – Running Databases & Stateful Apps
