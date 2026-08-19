# What is Docker?

## Overview

Docker is a platform for **building, sharing, and running applications in containers**. A container packages an application together with everything it needs to run, so it behaves the same way on any machine that has Docker.

The problem it solves is an old one, summed up by a familiar complaint:

> "But it works on my machine."

Software often breaks when it moves between environments, because the machines differ: different library versions, different settings, missing dependencies. Docker removes those differences by packaging the application and its environment together.

---

## What a container actually is

It is tempting to picture a container as a small virtual machine, but that is not what it is. A container is really just **a normal process running on your computer**, with some clever isolation applied so that it behaves as if it has the machine to itself.

That isolation comes from features built into the Linux kernel:

- **Namespaces** give the process its own private view of the system: its own filesystem, its own network, its own list of processes. It cannot see the rest of the machine.
- **Control groups (cgroups)** limit how much CPU and memory the process can use, so one container cannot starve the others.

Because a container is just an isolated process sharing the host's kernel, it starts in milliseconds and uses very little memory. There is no second operating system booting up inside it.

---

## What Docker adds

The isolation features existed before Docker. What Docker provides is a simple, consistent way to use them, built around three ideas:

- **Images**: read-only templates that contain your application and its dependencies.
- **Containers**: running instances created from images.
- **Registries**: shared stores, like Docker Hub, where images are published and pulled.

With these, the workflow becomes: build an image once, push it to a registry, and run it as a container anywhere. Build, ship, run.

---

## When to use Docker, and when not to

Docker is an excellent fit for packaging web services, APIs, databases, and background workers, and for making development and production environments match.

It is less suited to desktop GUI applications, and it is not a security boundary as strong as a full virtual machine, because containers share the host kernel. For workloads that need the hardest possible isolation, virtual machines still have a place.

---

## Next

- [Containers vs Virtual Machines](containers-vs-vm.md) explores that difference in detail.
- [Docker Architecture Overview](../architecture/docker-architecture.md) shows how a command becomes a running container.