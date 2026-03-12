# Rolling Updates

Rolling updates allow applications to be updated **without downtime**.

Instead of replacing all pods at once, Kubernetes gradually replaces old pods with new ones.

---

## How Rolling Updates Work

During an update:

1. New pods are created with the updated configuration
2. Old pods are gradually terminated
3. Traffic shifts to the new pods

---

## Benefits

Rolling updates provide:

- zero-downtime deployments
- safer releases
- automatic rollback capabilities

---

## Update Strategy

Deployments use the RollingUpdate strategy by default.

Key parameters include:

- maxUnavailable
- maxSurge

---