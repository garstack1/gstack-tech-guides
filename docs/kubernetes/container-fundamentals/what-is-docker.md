# What is Docker?

## Overview

Docker is a platform for building, packaging, and running applications in containers.

A container bundles:

- Application code
- Runtime
- Dependencies
- System libraries

This allows the application to run consistently across environments.




---
## Why Docker Exists

Before containers, applications often failed due to environment differences:

> "It works on my machine"

Docker solves this by:

- Standardising environments
- Isolating applications
- Making deployments reproducible

---

## What is a Container?

A container is:

- A lightweight, isolated process
- Running on a shared host OS kernel
- Packaged with everything it needs to run

Unlike virtual machines, containers do not include a full operating system.




---
## Docker Architecture

<div class="mermaid">
graph TD
    Developer --> DockerCLI
    DockerCLI --> DockerDaemon
    DockerDaemon --> Images
    DockerDaemon --> Containers
    DockerDaemon --> Registry

    Registry -->|Pull/Push| DockerDaemon
</div>






---
## Key Components
### Docker CLI

Command-line interface used by developers.

### Docker Daemon

Background service that builds and runs containers.

### Docker Images

Immutable templates used to create containers.

### Docker Containers

Running instances of images.

### Docker Registry

Stores and distributes images (e.g., Docker Hub).




---
## How Docker Works

1. Developer writes a Dockerfile
2. Docker builds an image
3. Image is stored locally or in a registry
4. Container is started from the image




---
## Real-World Implications

- Containers start in seconds (vs minutes for VMs)
- Applications become portable across environments
- Infrastructure becomes easier to automate




---
## Key Takeaways

- Docker packages applications with dependencies
- Containers are lightweight and fast
- Images are immutable; containers are runtime instances

---