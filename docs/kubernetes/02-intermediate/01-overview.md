
# Intermediate Kubernetes – Welcome & Overview

You've finished the beginner track — you can now:
- Run a local cluster
- Create & scale Deployments
- Expose apps with Services
- Use basic kubectl commands

That's a **huge** win! Most people stop here and feel they "get" Kubernetes.

Now we move to **intermediate level**:  
Real-world apps need more than just running and exposing.  
They need:
- Configurable settings (dev vs prod databases, logging levels…)
- Secure secrets (API keys, passwords, certificates…)
- Persistent data (databases, files that survive restarts)
- Organization for big teams/projects (namespaces)
- Debugging when things break

This track will teach those step-by-step, still with small, local examples on Minikube.

### What to expect

- Shorter sections than beginner (you already know the basics)
- More YAML (but still simple and explained line-by-line)
- Real-world patterns (what companies actually use)
- Slightly more commands & troubleshooting
- Same pizza chain analogy when it helps
- Exercises that build on your nginx Deployment from beginner level

### Recommended order

1. ConfigMaps – external configuration (start here!)
2. Secrets – safely handling passwords/API keys
3. Volumes & Persistent Storage – saving data beyond Pod lifetime
4. Namespaces – organizing large projects (dev/test/prod)
5. Basic troubleshooting & logs
6. (Optional later) Ingress, Helm basics, resource limits

### Before we start – quick refresh
1. Make sure your cluster is ready:
```bash
minikube status
```

2. If the cluster is stopped, start it again:
```bash
minikube start
```

3. Re-apply your nginx Deployment & Service from beginner track (if deleted):
```bash
kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-service.yaml
```

4. Check everything is healthy:
```bash
kubectl get all
```

5. If you see similar to the following, you're ready to continue to the next section:
	- 1 Deployment
	- 1 ReplicaSet
	- 2 - 3 Pods (or however many you scaled to)
	- 1 Service



→ Continue to Part 2: ConfigMaps – External Configuration