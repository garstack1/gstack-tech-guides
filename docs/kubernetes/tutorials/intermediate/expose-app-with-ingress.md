# Expose an Application with Ingress
## Goal

In this tutorial you will expose an application to external users using Kubernetes Ingress.

By the end you will understand how traffic flows through the cluster and how Ingress routes requests to services.

---



## Problem

Applications running inside Kubernetes are not accessible from outside the cluster by default.

Pods run on an internal network, so external users cannot reach them directly.

Ingress solves this problem by providing HTTP and HTTPS routing into the cluster.

---



## Architecture

Traffic flow in this tutorial:
```text
User → Ingress → Service → Pod
```

Each component plays a specific role:

| **Component**	| **Role** |
|-----------|------|
| Ingress | entry point for external traffic |
| Service | stable internal endpoint |
| Pod | runs the application container |

---



## Prerequisites

Before starting ensure:

- a Kubernetes cluster is running
- kubectl is configured
- an Ingress controller is installed

Check cluster access:
```bash
kubectl get nodes
```

Expected output:
```text
NAME           STATUS   ROLES
worker-node1   Ready    <none>
```
---



## Step 1 : Deploy the Application

Create a deployment file `deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: nginx
          ports:
            - containerPort: 80
```

Apply the deployment.
```bash
kubectl apply -f deployment.yaml
```

Verify the pods are running.
```bash
kubectl get pods
```

Expected output:
```text
NAME                       READY   STATUS
web-app-abc123             1/1     Running
web-app-def456             1/1     Running
```
---



## Step 2 : Create a Service

Pods are ephemeral and their IP addresses change.

A Service provides a stable internal endpoint for the application.

Create `service.yaml`.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

Apply the service.
```bash
kubectl apply -f service.yaml
```

Verify it exists.
```bash
kubectl get services
```

Expected output:
```text
NAME           TYPE        CLUSTER-IP
web-service    ClusterIP   10.96.x.x
```
---



## Step 3 : Create the Ingress Resource

The Ingress resource defines how external traffic reaches the service.
Create `ingress.yaml`.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
    - host: myapp.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-service
                port:
                  number: 80
```

Apply the Ingress configuration.
```bash
kubectl apply -f ingress.yaml
```

Verify the Ingress resource.
```bash
kubectl get ingress
```

Expected output:
```text
NAME          CLASS   HOSTS
web-ingress           myapp.local
```
---



## Step 4 : Test the Application

Find the address of the Ingress controller.
```bash
kubectl get ingress
```

Example output:
```text
NAME          HOSTS         ADDRESS
web-ingress   myapp.local   192.168.49.2
```

Add an entry to your hosts file if necessary:
```text
192.168.49.2 myapp.local
```

Then open the application in a browser:
```text
http://myapp.local
```
You should see the default Nginx welcome page.

---



## Step 5 : Verify Traffic Flow

You can verify the components involved.

Check the Ingress:
```bash
kubectl get ingress
```

Check the service:
```bash
kubectl get svc web-service
```

Check the pods:
```bash
kubectl get pods
```

This confirms the full routing path.

---
## What Just Happened

You created a complete request path:

| Layer | Resource |
|-------|----------|
| External entry point | Ingress |
| Internal routing | Service |
| Application | Pods |

Traffic now flows through the cluster like this:
```bash
User → Ingress → Service → Pod
```
This is the standard pattern for exposing HTTP applications in Kubernetes.

---



## Troubleshooting
**Ingress Not Accessible**

Verify the Ingress controller is installed.
```bash
kubectl get pods -A
```

Look for something like:
```bash
ingress-nginx-controller
```
---



**Service Not Routing Traffic**

Check service endpoints.
```bash
kubectl get endpoints web-service
```

Expected output:
```text
NAME          ENDPOINTS
web-service   10.244.x.x:80
```
---



**Pods Not Running**

Check deployment status.
```bash
kubectl get deployment
```

Inspect pod logs if needed.
```bash
kubectl logs <pod-name>
```
---



## Clean Up

Delete the resources when finished.

```bash
kubectl delete -f ingress.yaml
kubectl delete -f service.yaml
kubectl delete -f deployment.yaml
```

---



## Key Takeaways

In this tutorial you learned how to:

- deploy an application
- create a Kubernetes Service
- expose the service using Ingress
- route external HTTP traffic to pods
Ingress is the standard method for exposing web applications in Kubernetes.

---

[➡ Continue to the Advanced Kubernetes Guides](../advanced/index.md)

---