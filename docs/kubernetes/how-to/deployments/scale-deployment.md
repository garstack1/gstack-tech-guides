# Scale a Deployment

## When to Use This Guide

Use this guide when you need to increase or decrease the number of running pods for an application.

Scaling deployments is commonly required when:

- application traffic increases
- testing high availability
- reducing resource usage
- preparing for load testing

---

!!! tip "Quick Commands"

    ```bash
    kubectl scale deployment <deployment-name> --replicas=5
    kubectl get deployment <deployment-name>
    kubectl get pods
    ```

    These commands allow you to quickly adjust the number of pods running in a deployment.

---

## Common Scaling Tasks

| Task | Command |
|-----|--------|
| Increase replicas | `kubectl scale deployment web-app --replicas=5` |
| Reduce replicas | `kubectl scale deployment web-app --replicas=2` |
| Check replica status | `kubectl get deployment web-app` |
| View running pods | `kubectl get pods` |

---

## Step 1 — Check Current Deployment Status

List deployments in the namespace.

```bash
kubectl get deployments
```

Example:
```console
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
web-app   2/2     2            2           10m
```


This indicates the deployment currently runs 2 pods.

---





## Step 2 — Scale the Deployment

Increase the number of replicas.
```bash
kubectl scale deployment web-app --replicas=5
```


Output:
```console
deployment.apps/web-app scaled
```


Kubernetes immediately begins creating additional pods.

---





## Step 3 — Verify the New Pods

Check that new pods are starting.
```bash
kubectl get pods
```


Example:
```console
web-app-7f8d9c6d4b-abc12
web-app-7f8d9c6d4b-def34
web-app-7f8d9c6d4b-ghi56
web-app-7f8d9c6d4b-jkl78
web-app-7f8d9c6d4b-mno90
```


---





## Step 4 — Confirm Deployment Status

Verify that the deployment has reached the desired state.
```bash
kubectl get deployment web-app
```


Example:
```console
NAME      READY   UP-TO-DATE   AVAILABLE
web-app   5/5     5            5
```


---





## Automatic Scaling with HPA

For dynamic workloads, Kubernetes can automatically scale deployments using the Horizontal Pod Autoscaler (HPA).

Create an autoscaler:
```bash
kubectl autoscale deployment web-app --cpu-percent=70 --min=2 --max=10
```

This tells Kubernetes to:

- maintain CPU usage around 70%
- run **2–10 pods depending on load**

---





## Verify Autoscaling

Check autoscaler status:
```bash
kubectl get hpa
```


Example:
```console
NAME      REFERENCE            TARGETS   MINPODS   MAXPODS
web-app   Deployment/web-app   40%/70%   2         10
```


---




## Common Issues
**New Pods Remain Pending**

Possible causes:

- insufficient cluster resources
- node scheduling constraints
- missing persistent volumes

Investigate using:
```bash
kubectl describe pod <pod-name>
```


---





**Pods Crash After Scaling**

This usually indicates an application issue rather than a scaling problem.

Check logs:
```bash
kubectl logs <pod-name>
```


---




Quick Scaling Workflow

Most scaling tasks follow this pattern:
```bash
kubectl get deployments
kubectl scale deployment <deployment-name> --replicas=5
kubectl get pods
```


---




## Related Guides
**Deployment Management**

- Roll Back a Deployment
- Restart a Deployment

**Troubleshooting**

- Debug a Crashing Pod
- View Container Logs

---