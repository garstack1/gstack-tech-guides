# Intermediate Kubernetes Tutorials

These tutorials build on the basics and introduce real-world Kubernetes application patterns.

You will learn how to configure applications, manage storage, and deploy multi-container workloads.

---

## Prerequisites

Before starting these tutorials you should understand:

- Pods
- Deployments
- Services
- Basic kubectl commands

Complete the **Beginner Tutorials** if you are new to Kubernetes.

---

## Tutorials

<div class="grid cards" markdown>

- :material-docker: **Deploy a Multi-Container Application**

  Run multiple containers in the same Pod and understand how they communicate.

  [:octicons-arrow-right-24: Start Tutorial](deploy-multi-container-app.md)

- :material-cog-outline: **Configure Applications with ConfigMaps**

  Inject configuration into applications without rebuilding containers.

  [:octicons-arrow-right-24: Start Tutorial](configure-app-with-configmap.md)

- :material-shield-lock-outline: **Secure Applications with Secrets**

  Store sensitive data such as passwords and tokens securely.

  [:octicons-arrow-right-24: Start Tutorial](secure-app-with-secrets.md)

- :material-database: **Deploy an App with Persistent Storage**

  Attach persistent volumes so application data survives pod restarts.

  [:octicons-arrow-right-24: Start Tutorial](deploy-app-with-persistent-storage.md)

- :material-update: **Rolling Updates and Rollbacks**

  Safely release new versions of applications and revert when needed.

  [:octicons-arrow-right-24: Start Tutorial](rolling-update-and-rollback.md)

- :material-web: **Expose Applications with Ingress**

  Route external HTTP traffic to services inside your cluster.

  [:octicons-arrow-right-24: Start Tutorial](expose-app-with-ingress.md)

</div>

---

## What You Will Learn

After completing this section you will understand:

- Application configuration management
- Secure secret handling
- Persistent storage in Kubernetes
- Production-safe deployments
- HTTP routing with Ingress

These skills are commonly required when deploying **real applications to Kubernetes**.

---

## Next Step

Continue to the **Advanced Tutorials** to explore production-scale patterns.

[:material-arrow-right: Go to Advanced Tutorials](../advanced/index.md)