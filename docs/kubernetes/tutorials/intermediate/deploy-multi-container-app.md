# Deploy a Multi-Container Application
## Goal

In this tutorial you will deploy an application that runs multiple containers in a single pod.

By the end you will understand:

- how containers share a pod
- how containers communicate via localhost
- how the sidecar pattern works

---



## Problem

Some applications require multiple cooperating containers.

Examples include:

- application + logging agent
- application + metrics exporter
- application + proxy
- application + file processor

Instead of running these separately, Kubernetes allows multiple containers in one pod.

All containers inside a pod:

- share the same network
- share volumes
- start and stop together

---



## Architecture

Traffic flow in this example:

```bash
User → Service → Pod
               ├─ App Container
               └─ Logger Container
```
The application writes logs to a shared directory, and a second container reads those logs.

This pattern is called a sidecar container.

---



## Prerequisites

Ensure the following are installed and configured:

- Kubernetes cluster
- kubectl configured
- a working namespace

Verify cluster access:

```bash
kubectl get nodes
```
Expected output:
```console
NAME           STATUS   ROLES
worker-node1   Ready    <none>
```
---


## Step 1 : Create a Multi-Container Pod

Create the file:

`multi-container-pod.yaml`
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: multi-container-demo
spec:
  volumes:
    - name: shared-data
      emptyDir: {}

  containers:
    - name: app
      image: busybox
      command: ["/bin/sh", "-c"]
      args:
        - while true; do
            echo "Hello from app container" >> /data/app.log;
            sleep 5;
          done
      volumeMounts:
        - name: shared-data
          mountPath: /data

    - name: logger
      image: busybox
      command: ["/bin/sh", "-c"]
      args:
        - tail -f /data/app.log
      volumeMounts:
        - name: shared-data
          mountPath: /data
```


This pod contains two containers:

| Container | Purpose |
|-----------|---------|
| app | writes log entries |
| logger | reads and prints logs |

The shared volume allows both containers to access the same data.

---



## Step 2 : Deploy the Pod

Apply the configuration.

```bash
kubectl apply -f multi-container-pod.yaml
```
Verify the pod is running.

```bash
kubectl get pods
```
Expected output:
```console
NAME                    READY   STATUS
multi-container-demo    2/2     Running
```
Notice 2/2 containers are running.

---



## Step 3 : Inspect the Pod

View details about the pod.
```bash
kubectl describe pod multi-container-demo
```
Look for the containers section.

You should see:
```console
Containers:
  app
  logger
```

---



## Step 4 : View Logs from the Logger Container

Check logs from the logger container.

```bash
kubectl logs multi-container-demo -c logger
```
Expected output:
```console
Hello from app container
Hello from app container
Hello from app container
```
The logger container is reading the log file written by the app container.

---



## Step 5 : Access the App Container

Open a shell in the app container.
```bash
kubectl exec -it multi-container-demo -c app -- sh
```
View the log file.
```bash
cat /data/app.log
```
You should see entries being written continuously.

---



## What Just Happened

The two containers share:

| Resource | Description |
|----------|-------------|
| Network | both containers use localhost |
| Storage | shared emptyDir volume |
| Lifecycle | containers start and stop together |

The app container writes logs, and the logger container reads them.

This architecture is called a sidecar pattern.

---



## Common Sidecar Use Cases

Sidecars are widely used in production clusters.

Examples include:

| Use Case | Example |
|----------|---------|
| Logging | Fluentd sidecar |
| Metrics | Prometheus exporters |
| Proxies | Envoy / Istio |
| Security | service mesh proxies |

---


## Troubleshooting
**Pod Not Starting**

Check pod status.
```yaml
kubectl get pods
```

Inspect events.
```yaml
kubectl describe pod multi-container-demo
```

---



**Container Logs Not Appearing**
Ensure the logger container is running.
```yaml
kubectl get pods
```


Then check container logs.
```yaml
kubectl logs multi-container-demo -c logger
```

**Shared Volume Not Working**

Confirm both containers mount the same volume.

Look for:
```yaml
volumeMounts:
  - name: shared-data
```


---


## Clean Up

Delete the pod when finished.
```bash
kubectl delete pod multi-container-demo
```


---


## Key Takeaways

You learned how to:

- deploy a pod with multiple containers
- share data between containers using volumes
- inspect individual container logs
- implement the sidecar pattern

Multi-container pods are a foundational pattern used in many Kubernetes architectures.

---

[→ Continue to Part 2: Configure App With Configmaps](../intermediate/configmaps.md)