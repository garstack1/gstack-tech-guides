# DNS in Kubernetes

Kubernetes includes an internal DNS service that allows applications to discover services by name.

This eliminates the need to hardcode IP addresses.




---
## DNS Service

Most Kubernetes clusters run **CoreDNS** as the DNS server.

CoreDNS watches the Kubernetes API and automatically creates DNS records for services.




---
## Service DNS Names

Services receive DNS names based on this pattern.

service-name.namespace.svc.cluster.local

Example:
database.default.svc.cluster.local

database when communicating within the same namespace.




---
## Why DNS Matters

DNS enables:

- service discovery
- dynamic scaling
- decoupled application architecture

Applications can connect using **names instead of IP addresses**.




---
## Key Takeaway

Kubernetes DNS allows services to be discovered dynamically using predictable naming conventions.

---