# Environment Variables

Environment variables are one of the most common ways to provide configuration to applications running in Kubernetes.

They allow containers to receive configuration values at runtime without modifying the container image.

Environment variables are widely used because most programming languages and frameworks can easily read them.

---

## What Are Environment Variables

Environment variables are key-value pairs available to a running process.

For example:

APP_ENV=production  
LOG_LEVEL=info  
API_URL=https://api.example.com

Applications can read these values during startup and configure their behavior accordingly.

Many containerized applications expect configuration to be provided this way.

---

## Environment Variables in Kubernetes

In Kubernetes, environment variables can be defined directly inside a container specification.

Example:

```yaml
env:
  - name: APP_ENV
    value: production
```

When the container starts, the application receives this value as an environment variable.

Using ConfigMaps as Environment Variables

Environment variables can also be populated using values stored in a ConfigMap.

This allows configuration to be managed separately from the pod definition.

In this setup:

1. Configuration values are stored in a ConfigMap.
2. The pod references the ConfigMap.
3. The container receives those values as environment variables.



---
## ConfigMap to Environment Variable

<div class="mermaid">
flowchart TD

ConfigMap["ConfigMap
(app-config)"]

Pod["Pod"]

Container["Container"]

Env["Environment Variables"]

ConfigMap --> Pod
Pod --> Container
Container --> Env
</div>



---
## Using Secrets as Environment Variables

Secrets can also populate environment variables.

This allows sensitive values such as passwords or tokens to be injected into the container at runtime.

The container can then access these values using normal environment variable access methods.




---
## Secret to Environment Variable

<div class="mermaid">
flowchart TD

Secret["Secret
(db-credentials)"]

Pod["Pod"]

Container["Container"]

Env["Environment Variables"]

Secret --> Pod
Pod --> Container
Container --> Env
</div>



---
## Benefits of Environment Variables

Environment variables provide several advantages for containerized applications.

| Benefit | Explanation |
|---------|-------------|
| Simple integration | Most applications already support environment variables |
| Decoupled configuration | Configuration can change without rebuilding images |
| Flexibility | Values can come from ConfigMaps or Secrets |
| Standard practice | Widely used in cloud-native systems |




---
## Limitations

Environment variables also have some limitations.

| Limitation | Explanation |
|------------|-------------|
| Static at startup | Changes require restarting the pod |
| Visibility | Environment variables may appear in process listings |
| Size limits | Not suitable for large configuration files |

For large configuration files, mounting configuration as a volume is usually a better approach.



---
## Key Takeaway

Environment variables provide a simple and widely supported way to inject configuration values from ConfigMaps or Secrets into containers running in Kubernetes.



---
## Next

The next page explains how Kubernetes manages CPU and memory resources using requests and limits.


---