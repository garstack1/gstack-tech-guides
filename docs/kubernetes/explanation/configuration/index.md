# Kubernetes Configuration

Kubernetes provides several mechanisms for configuring applications running inside containers.

Configuration in Kubernetes is designed around a key principle:

> **Application code and configuration should be separated.**

This allows applications to run in different environments without modifying container images.

For example, the same container image might run in:

- development
- staging
- production

Each environment can provide different configuration values.




---
## Why Configuration Matters

Applications typically require configuration such as:

- database connection strings
- API endpoints
- feature flags
- logging levels
- credentials

Hardcoding this information inside container images creates problems:

- images must be rebuilt for every environment
- sensitive data may be exposed
- deployments become less flexible

Kubernetes solves this by providing dedicated configuration resources.





---
## Kubernetes Configuration Resources

Kubernetes provides several objects for managing configuration.

| Resource | Purpose |
|---------|---------|
| ConfigMaps | Store non-sensitive configuration |
| Secrets | Store sensitive data such as passwords |
| Environment Variables | Inject configuration into containers |
| Resource Requests & Limits | Define CPU and memory usage |

These resources allow applications to remain **portable, secure, and configurable**.





---
## Configuration Flow

A typical configuration workflow looks like this:

1. Configuration values are stored in Kubernetes resources.
2. Pods reference those resources.
3. Containers receive the values at runtime.

This allows configuration to change without rebuilding container images.

<div class="mermaid">
flowchart TD

ConfigMap["ConfigMap"]
Secret["Secret"]

Pod["Pod"]

Container["Application Container"]

ConfigMap --> Pod
Secret --> Pod

Pod --> Container
</div>



---
## Next

Explore the configuration mechanisms in Kubernetes:

- Configuration Overview
- ConfigMaps
- Secrets
- Environment Variables
- Resource Management

---