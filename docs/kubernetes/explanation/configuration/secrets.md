# Secrets

A **Secret** is a Kubernetes object used to store sensitive configuration data.

Secrets allow applications to securely access confidential information such as:

- passwords
- API tokens
- SSH keys
- TLS certificates
- database credentials

Like ConfigMaps, Secrets separate configuration from container images, but they are specifically designed for **sensitive data**.




---
## Why Secrets Exist

Sensitive information should never be stored directly inside container images or application code.

Embedding secrets inside images creates several risks:

| Risk | Description |
|-----|-------------|
Image exposure | Anyone with access to the image can read the secret |
Version control leaks | Secrets may be accidentally committed to repositories |
Difficult rotation | Updating credentials requires rebuilding images |

Kubernetes Secrets solve this by storing sensitive data separately and injecting it into pods only when needed.





---
## How Secrets Store Data

Secrets store values as **key-value pairs**, similar to ConfigMaps.

Example structure:

DB_USERNAME=admin
DB_PASSWORD=mysecretpassword


When stored in Kubernetes, secret values are **base64 encoded**.

Base64 encoding is **not encryption**, but it prevents accidental exposure in plain text when viewing resource definitions.






---
## How Applications Use Secrets
Pods can access secrets in two main ways.

| Method | Description |
|------|-------------|
Environment Variables | Inject secret values into container environment variables |
Mounted Files | Provide secrets as files inside the container filesystem |

Applications then read the secret values when they start.

**Secret Injection**
<div class="mermaid">
flowchart TD

Secret["Secret
(db-credentials)"]

Pod["Pod"]

Container["Application Container"]

Secret --> Pod
Pod --> Container
</div>


In this example:

1. Sensitive values are stored in a Secret.
2. The pod references the Secret.
3. The container receives the secret values at runtime.




---
## Security Considerations

Although Kubernetes Secrets provide a structured way to manage sensitive data, they require additional security practices.

Important considerations include:

| Practice | Purpose |
|--------|--------|
RBAC access control | Restrict who can read secrets |
Encryption at rest | Protect secrets stored in etcd |
Network policies | Prevent unauthorized pod access |
Secret rotation | Regularly update credentials |

Without encryption at rest enabled, secrets stored in etcd may be accessible to cluster administrators.




---
## Secret Types

Kubernetes supports several built-in secret types.

| Type | Purpose |
|----|----|
Opaque | Generic key-value secrets |
kubernetes.io/tls | TLS certificates |
kubernetes.io/dockerconfigjson | Container registry credentials |
kubernetes.io/service-account-token | Service account authentication |

Most application secrets use the **Opaque** type.





---
## Secrets vs ConfigMaps
Secrets and ConfigMaps serve similar purposes but are used for different types of data.

| Feature | ConfigMap | Secret |
|-------|---------|--------|
Sensitive data | ❌ No | ✅ Yes |
Base64 encoding | ❌ No | ✅ Yes |
Security focus | Low | Higher |
Typical usage | Application configuration | Credentials and tokens |

Both resources allow configuration to be injected into containers at runtime.




---
## Key Takeaway
Secrets provide a secure way to store and distribute sensitive configuration data to applications running in Kubernetes.




---
## Next
The next page explains how configuration values are delivered to containers using **environment variables**.

---