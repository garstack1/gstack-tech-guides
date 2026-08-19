# Connect Containers

## When to Use This Guide

Use this guide to let two containers talk to each other, for example an app container reaching a database container.

---

!!! tip "Quick Command"

    ```bash
    docker run -d --name app --network my-net my-app
    ```

---

## Step 1: Create a Shared Network

```bash
docker network create my-net
```

---

## Step 2: Run Both Containers On It

Start each container with `--network my-net`.

```bash
docker run -d --name db --network my-net postgres:16
docker run -d --name app --network my-net my-app
```

---

## Step 3: Reach One From the Other by Name

The `app` container can now reach the database using the hostname `db`, its container name. No IP addresses needed.

---

## Connect an Existing Container

If a container is already running, attach it to a network without restarting it.

```bash
docker network connect my-net existing-container
```

---

## Common Issues

**"could not resolve host"**

Both containers must be on the **same** user-defined network, and the hostname must match the target container's name exactly.

**Name resolution not working on the default bridge**

The built-in `bridge` network has no name discovery. Always create your own network for this.

---

## Related Guides

- [Create a Network](create-network.md)
- [Expose Ports](expose-ports.md)