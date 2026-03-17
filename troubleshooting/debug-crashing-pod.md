# Debug a Crashing Pod

## Problem

A Kubernetes pod repeatedly restarts or enters a `CrashLoopBackOff` state.  
This usually means the container starts but the application inside the container crashes.

This guide walks through a **systematic process** to identify the cause.

---

## Quick Diagnosis

Use this table to quickly identify the cause of a failing pod.

| If you see | Go to |
|-------------|------|
| `CrashLoopBackOff` | Check container logs |
| `ImagePullBackOff` | [Debug Image Pull Errors](debug-imagepullbackoff.md) |
| `Pending` | Investigate scheduling issues |
| `OOMKilled` | Increase memory limits |
| `Error: env variable missing` | Verify environment variables |

---

## Quick Debug Commands

Run these commands to quickly identify the cause of a crashing pod.

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl logs <pod-name> --previous
kubectl get events --sort-by=.metadata.creationTimestamp
```
If the pod keeps restarting, these commands will reveal the cause in most cases.

---




## Common Symptoms
| Symptom |	Likely Cause | Fix |
|---------|--------------|-----|
| CrashLoopBackOff | Application crash during startup |	Check container logs |
| ImagePullBackOff | Invalid or missing container image | Verify image name and registry access |
| OOMKilled | Container exceeded memory limit | Increase memory limits |
| Error: env variable missing |	Missing environment variable | Add variable in deployment |
| Connection refused | Dependency service unavailable | Verify service and networking |

---







## Step 1 — Check Pod Status

Start by listing pods in the current namespace.

```bash
kubectl get pods
```

Example output:
```bash
NAME                     READY   STATUS             RESTARTS   AGE
web-app-6f9c8c7b7d-xk92  0/1     CrashLoopBackOff   5          2m
```

Important fields:

- STATUS → CrashLoopBackOff means the container repeatedly fails
- RESTARTS → high numbers indicate repeated crashes

---



## Step 2 — Describe the Pod

Next, inspect detailed information about the pod.
```bash
kubectl describe pod web-app-6f9c8c7b7d-xk92
```
Focus on these sections:

Container State
```bash
State:          Waiting
Reason:         CrashLoopBackOff
```

Last Container State
This shows the previous crash reason.
Example:
```bash
Last State:     Terminated
Reason:         Error
Exit Code:      1
```

Events
Events often reveal deployment problems.
Example:
```bash
Warning  BackOff  kubelet  Back-off restarting failed container
```

---




## Step 3 — Check Container Logs
Logs usually reveal the root cause.
```bash
kubectl logs web-app-6f9c8c7b7d-xk92
```

Example:
```bash
Error: missing DATABASE_URL environment variable
```
If the container crashed quickly, view logs from the previous run:

```bash
kubectl logs web-app-6f9c8c7b7d-xk92 --previous
```

---



## Step 4 — Inspect Pod Configuration

Verify the container configuration.
```bash
kubectl get pod web-app-6f9c8c7b7d-xk92 -o yaml
```
Check:

- container image
- environment variables
- mounted volumes
- resource limits

---


## Step 5 — Check Namespace Events

Cluster events sometimes reveal scheduling or configuration issues.
```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```
Look for warnings such as:

- Failed scheduling
- Image pull errors
- Volume mount failures

---

## Common Causes of Crashing Pods
**Missing Environment Variables**

Example log:
```console
Error: DATABASE_URL not defined
```
Fix by adding the variable to the deployment.

---



**Incorrect Container Image**

The application may crash due to a bad image version.

Verify:
```bash
kubectl describe pod <pod-name>
```

---


**Application Startup Errors**

Examples:

- invalid configuration
- missing dependencies
- database connection failures
These will appear in container logs.

---



**Resource Limits Too Low**

If a container exceeds its memory limit it may be terminated.

Check:
```bash
kubectl describe pod <pod-name>
```
Look for:
```bash
Reason: OOMKilled
```

---



**Quick Debugging Workflow**

In most cases the problem can be found using these three commands:
```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

These commands reveal the majority of Kubernetes runtime failures.

---


**Next Steps**

Once the issue is identified, update the deployment configuration and redeploy the application.

For example:
```bash
kubectl apply -f deployment.yaml
```
or restart the deployment:
```bash
kubectl rollout restart deployment <deployment-name>
```


---