

# Intermediate Part 6: Basic Troubleshooting & Debugging

You've now built and configured real Kubernetes resources:  
Deployments that scale, Services that expose apps, ConfigMaps/Secrets for settings, Persistent Volumes for data, and Namespaces for organization.

But things break.  
Pods crash, Services don't respond, config doesn't apply — and you need to know **how to investigate**.

This final intermediate section covers the most useful troubleshooting commands and patterns.

## Goal for this section

Use common kubectl commands to:
- Check logs when a Pod fails
- Describe resources for events/history
- Debug inside a running Pod
- Watch rollout progress & history
- Fix a simple problem (intentional crash)

We'll intentionally break our nginx Deployment to practice.

## Step 1: Make sure your app is running

Re-apply if needed:

```bash
kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-service.yaml````
```

Check status:

Bash

```
kubectl get all
```

Everything should be Running / Ready.

## Step 2: Check logs (when something crashes)

Logs are usually the first place to look.

Force a crash (temporary bad image):

Edit nginx-deployment.yaml → change image: nginx:1.25 to image: nginx:bad-tag (non-existent tag).

Apply:

Bash

```
kubectl apply -f nginx-deployment.yaml
```

Watch Pods:

Bash

```
kubectl get pods -w
```

You'll see Pods in ImagePullBackOff or ErrImagePull — they can't start.

Get logs from one failed Pod:

Bash

```
kubectl logs <pod-name>
```

→ You'll see pull errors like "no such image" or "unauthorized".

Fix it (change back to nginx:1.25), re-apply, and logs should show nginx startup.

## Step 3: Describe resources (events & history)

The describe command is your best friend — it shows **events** (what Kubernetes did or failed to do).

Run:

Bash

```
kubectl describe pod <pod-name>
kubectl describe deployment nginx-deployment
kubectl describe service nginx-service
```

Look for:

- **Events** section (bottom) — success/failure messages Example: "Failed to pull image" or "Pod became ready"
- Conditions (Ready, Initialized, etc.)
- Container statuses

## Step 4: Exec into a running Pod (debug inside)

Exec lets you open a shell inside a container:

Bash

```
kubectl exec -it <pod-name> -- bash   # or sh if no bash
```

Inside the Pod:

Bash

```
ls /etc/nginx
cat /etc/nginx/nginx.conf
env | grep NGINX
exit
```

→ You can check files, env vars, processes, etc. Great for "why isn't my config applied?"

## Step 5: Watch rollouts & history

Force another change (scale to 5):

Bash

```
kubectl scale deployment nginx-deployment --replicas=5
```

Watch rollout:

Bash

```
kubectl rollout status deployment/nginx-deployment
```

→ "Waiting for deployment... replica set updated"

See history:

Bash

```
kubectl rollout history deployment/nginx-deployment
```

→ Shows each change (scale, image update, etc.)

Rollback if something breaks:

Bash

```
kubectl rollout undo deployment/nginx-deployment
```

→ Reverts to previous version

## Step 6: Common Beginner/Intermediate Errors & Fixes

- **ImagePullBackOff / ErrImagePull** → Wrong image name/tag or no internet/pull permission Fix: Check kubectl describe pod Events, correct image
- **CrashLoopBackOff** → Container starts but exits immediately (bad code/config) Fix: kubectl logs <pod>, fix app, kubectl rollout restart
- **Service not reachable** → Wrong selector labels or no Pods ready Fix: kubectl describe service, ensure app: nginx matches Pods
- **Config/Secret not appearing** → Typo in secretKeyRef/configMapKeyRef or wrong namespace Fix: kubectl describe pod, check Events

## Cleanup

Delete everything when done:

Bash

```
kubectl delete deployment nginx-deployment
kubectl delete service nginx-service
kubectl delete configmap app-settings nginx-conf
kubectl delete secret app-secrets
minikube stop   # or minikube delete
```

## Final Intermediate Takeaways

- **kubectl logs** → app output/errors
- **kubectl describe** → events, status, history
- **kubectl exec** → debug inside container
- **kubectl rollout** → manage changes safely
- Always start with get all, then describe, then logs

You've now covered the essentials from beginner to intermediate: running apps, configuring them, securing them, persisting data, organizing them, and debugging them.

This puts you at a level where you can contribute to real Kubernetes projects or start experimenting with production-like setups.