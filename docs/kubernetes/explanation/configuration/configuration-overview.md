# Configuration Overview

Applications rarely run with default settings.  
Most require configuration values that define how they behave.

Examples include:

- database connection strings
- API endpoints
- logging levels
- feature flags
- authentication credentials

In traditional deployments, these values were often embedded directly inside the application code or configuration files packaged with the application.

This approach creates several problems.






---
## Problems with Embedded Configuration

When configuration is bundled with the application, it becomes difficult to manage across multiple environments.

For example, an application may run in:

- development
- staging
- production

Each environment requires different configuration values.

If configuration is embedded inside the application image, every environment requires a **separate build of the application**.

This creates several risks:

| Problem | Impact |
|-------|-------|
Frequent image rebuilds | Slower deployments |
Configuration errors | Incorrect values may reach production |
Security risks | Secrets may be stored in images |
Reduced portability | Images become environment-specific |

To avoid these issues, modern systems separate **application code from configuration**.





---
## Configuration in Kubernetes

Kubernetes follows a design principle from the **Twelve-Factor App methodology**:

> Store configuration outside the application.

This allows the same container image to run in any environment while receiving different configuration values at runtime.

Configuration is provided to applications using Kubernetes resources.





---
## Kubernetes Configuration Objects

Kubernetes provides several mechanisms for managing configuration.

| Resource | Purpose |
|--------|--------|
ConfigMaps | Store non-sensitive configuration data |
Secrets | Store sensitive data such as passwords or tokens |
Environment Variables | Inject configuration into containers |
Volumes | Mount configuration files into containers |

These resources allow configuration to be **defined, managed, and updated independently from application images**.





---
## How Configuration Reaches Applications

Configuration values are stored in Kubernetes resources and then referenced by pods.

Containers receive these values when they start.

Configuration can be injected in several ways:

- environment variables
- mounted configuration files
- command-line arguments

This flexible approach allows applications to consume configuration in whatever format they expect.

**Configuration Flow**
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


In this example:

1. Configuration values are stored in Kubernetes resources.
2. A pod references those resources.
3. The container receives the configuration at runtime.





---
## Benefits of External Configuration

Separating configuration from application code provides several advantages.

| Benefit | Explanation |
|-------|-------------|
Environment flexibility | Same image works in multiple environments |
Security | Sensitive data can be stored separately |
Operational simplicity | Configuration can change without rebuilding images |
Scalability | Multiple applications can share configuration resources |

This approach makes applications easier to operate in large distributed environments.




---
## Key Takeaway

Kubernetes separates **application code from configuration**, allowing containers to remain portable while configuration is managed dynamically through Kubernetes resources.




---
## Next

The following pages explore the configuration mechanisms provided by Kubernetes:

- ConfigMaps
- Secrets
- Environment Variables
- Resource Management


---
