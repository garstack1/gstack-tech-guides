# What is Docker Compose?

## Overview

Docker Compose is a tool for defining and running applications made of **multiple containers**. Instead of typing a long series of `docker` commands to start each piece, you describe the whole system in one file and bring it all up with a single command.

---

## Declarative, not step by step

This is the key shift in thinking. With `docker run`, you give **step-by-step instructions**: create this network, run that container, attach this volume, set these variables. If you miss a step, it breaks.

With Compose, you **describe the end result you want**: these services should exist, on this network, with these volumes. Compose then figures out how to make reality match your description. You say *what* you want, not *how* to assemble it.

---

## The Compose file

A `compose.yaml` file lists the parts of your system:

- **services**: the containers, each saying which image to use or build, its ports, its environment, and what it depends on.
- **networks** and **volumes**: declared once and shared by the services that need them.

Compose reads this file and creates everything in it, including a shared network so the services can find each other by name automatically.

---

## Why it matters

- **Reproducible**: the file is the single source of truth for the entire stack. The same file produces the same system every time.
- **Shareable**: hand someone the file and they can run your whole application, no lengthy setup instructions needed.
- **Version-controlled**: it lives in Git alongside your code, so changes to your architecture are tracked like any other change.

`docker compose up` builds it all; `docker compose down` cleanly removes it.

---

## Next

- [Multi-Container Architecture](multi-container.md) explains why apps are split into several containers.
- The [Docker Compose tutorial](../../tutorials/advanced/docker-compose-app.md) puts it into practice.