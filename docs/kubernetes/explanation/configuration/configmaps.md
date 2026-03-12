# ConfigMaps

A **ConfigMap** is a Kubernetes object used to store non-sensitive configuration data.

ConfigMaps allow applications to receive configuration values **without modifying the container image**.

This enables the same container image to run in multiple environments while using different configuration settings.




---
## What ConfigMaps Store

ConfigMaps store configuration as **key-value pairs**.

Examples of configuration stored in ConfigMaps include:

- application settings
- configuration files
- feature flags
- environment-specific values
- service endpoints

Example structure:

APP_ENV=production
LOG_LEVEL=info
API_URL=https://api.example.com



These values are stored in Kubernetes and can be referenced by pods when containers start.





---
## Why ConfigMaps Exist

Container images should ideally be **immutable**.

This means an image should not change once it has been built.

However, applications often require configuration that changes between environments.

For example:

| Environment | Database |
|-------------|----------|
Development | dev-db |
Staging | staging-db |
Production | prod-db |

Instead of building three different images, Kubernetes allows configuration to be **provided dynamically using ConfigMaps**.




---
## How Applications Use ConfigMaps

Pods can consume ConfigMaps in several ways.

| Method | Description |
|------|-------------|
Environment Variables | Inject configuration values into containers |
Command Arguments | Pass configuration to startup commands |
Mounted Files | Provide configuration files inside containers |

This flexibility allows applications to receive configuration in whatever format they expect.





---
## ConfigMaps and Pods

Pods reference ConfigMaps when they start.

The configuration values are then injected into the containers.


ConfigMap Injection

<div class="mermaid">
flowchart TD

ConfigMap["ConfigMap
(app-config)"]

Pod["Pod"]

Container["Application Container"]

ConfigMap --> Pod
Pod --> Container
</div>


In this example:

1. Configuration values are stored in a ConfigMap.
2. The pod references the ConfigMap.
3. The container receives the configuration values.





---
## When to Use ConfigMaps

ConfigMaps should be used for **non-sensitive configuration**.

Typical use cases include:

- application settings
- feature flags
- configuration files
- environment configuration
- service URLs






---
## When Not to Use ConfigMaps

ConfigMaps should **not** be used for sensitive information.

Examples of sensitive data include:

- passwords
- API tokens
- private keys
- database credentials

Sensitive information should be stored using **Secrets** instead.




---
## Key Takeaway

ConfigMaps allow applications to receive **environment-specific configuration without modifying container images**, making deployments more flexible and maintainable.




---
## Next

The next page explores **Secrets**, which are used for storing sensitive configuration data.


---