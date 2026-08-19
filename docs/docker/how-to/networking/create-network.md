# Create a Network

## When to Use This Guide

Use this guide to create a user-defined network, so containers on it can find each other by name.

---

!!! tip "Quick Command"

    ```bash
    docker network create my-net
    ```

---

## Step 1: Create the Network

```bash
docker network create my-net
```

This creates a user-defined bridge network, which includes automatic name-based discovery.

---

## Step 2: Confirm It Exists

```bash
docker network ls
```

`my-net` will appear in the list.

---

## Step 3: Run Containers On It

Attach a container at run time with `--network`.

```bash
docker run -d --name web --network my-net nginx
```

Any other container started on `my-net` can now reach this one by the name `web`.

---

## Common Issues

**Network already exists**

Pick a different name, or remove the old one first with `docker network rm my-net`.

---

## Related Guides

- [Connect Containers](connect-containers.md)
- [List Networks](list-networks.md)