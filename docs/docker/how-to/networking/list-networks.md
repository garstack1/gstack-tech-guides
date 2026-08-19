# List Networks

## When to Use This Guide

Use this guide to see the Docker networks on your machine, or to inspect one and find out which containers are attached to it.

---

!!! tip "Quick Command"

    ```bash
    docker network ls
    ```

---

## Step 1: List All Networks

```bash
docker network ls
```

You will always see a few built-in networks, including `bridge`, `host`, and `none`, plus any you or Compose have created.

---

## Step 2: Inspect a Network

See its details, including which containers are attached.

```bash
docker network inspect my-net
```

Look under the `Containers` section of the output to see what is connected.

---

## Common Issues

**Too many networks left over**

Compose and old projects can leave networks behind. Remove unused ones with:

```bash
docker network prune
```

---

## Related Guides

- [Create a Network](create-network.md)
- [Connect Containers](connect-containers.md)