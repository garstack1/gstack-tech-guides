# 🐳 Docker

Docker is a container platform that allows you to package applications and their dependencies into **portable, reproducible environments** called containers.

Containers ensure that software runs the same way across different machines, making Docker one of the core tools in modern DevOps, cloud infrastructure, and local development workflows.

This course takes you from your very first container all the way to a deployed, multi-service application, and then hands you off to Kubernetes.

---

## Why Docker Matters

Traditional software deployments often fail due to environment differences:

- Different OS versions
- Missing dependencies
- Configuration drift

Docker solves this by packaging everything an application needs into a **container image**.

Benefits include:

- Reproducible environments
- Fast deployments
- Lightweight isolation
- Consistent development and production environments

---

## What You'll Learn

This course is organised into five parts, each doing a different job. Use whichever fits what you need right now.

<div class="grid cards" markdown>

-   :material-school: **Tutorials**

    Step-by-step learning, from installing Docker to deploying a full-stack app. Start here if you are new.

    [:octicons-arrow-right-24: Start learning](tutorials/index.md)

-   :material-wrench: **How-To Guides**

    Practical recipes for specific tasks, for when you already understand the basics.

    [:octicons-arrow-right-24: Get things done](how-to/index.md)

-   :material-lightbulb-on: **Explanation**

    Conceptual deep dives into how Docker works internally: architecture, layers, and isolation.

    [:octicons-arrow-right-24: Understand Docker](explanation/index.md)

-   :material-book-open-variant: **Reference**

    Quick lookup for Docker CLI commands, their syntax, and common options.

    [:octicons-arrow-right-24: Look up commands](reference/index.md)

-   :material-bug: **Troubleshooting**

    Problem, symptoms, and fix for the errors you are most likely to hit.

    [:octicons-arrow-right-24: Fix a problem](troubleshooting/index.md)

</div>

---

## One App, Start to Finish

The tutorials are built around a single application, **Snapshot**, that grows as you learn. It begins as a one-container greeting, gains a database and lasting storage, connects into a multi-service system, adds a frontend, and finally runs as a deployed three-tier stack. Nothing is a throwaway demo. Every lesson builds on the last.

---

## Quick Example

Run your first container:

```bash
docker run hello-world
```

Docker will:

- Pull the `hello-world` image
- Create a container from it
- Run it
- Print a success message

That is the whole cycle in one command.

---

## Docker in the Modern Stack

Docker is rarely used alone. It is the foundation for a wider toolset:

- **Kubernetes**, for running containers at scale
- **CI/CD pipelines**, for building and shipping automatically
- **Cloud platforms**, for hosting containerised apps
- **Infrastructure automation**, for managing it all as code

Understanding Docker is a foundational step before learning any of these.

---

## Where to Start

If you are new to Docker, start here:

[:octicons-arrow-right-24: Get Docker Installed](tutorials/beginner/install-docker.md)

From there you will run your first container and begin building images. Once you finish the course, the [Kubernetes course](../kubernetes/) is your natural next step.