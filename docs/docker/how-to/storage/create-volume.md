# Create a Volume

## When to Use This Guide

Use this guide to create a named volume, Docker-managed storage that keeps data safe even when a container is removed.

---

!!! tip "Quick Command"

    ```bash
    docker volume create my-data
    ```

---

## Step 1: Create the Volume

```bash
docker volume create my-data
```

---

## Step 2: Confirm It Exists

```bash
docker volume ls
```

`my-data` will appear in the list.

---

## Step 3: Inspect It

See its details, including where Docker stores it.

```bash
docker volume inspect my-data
```

---

## Removing a Volume

A volume stays until you delete it deliberately. Remove one with:

```bash
docker volume rm my-data
```

To clear all volumes not used by any container:

```bash
docker volume prune
```

---

## Common Issues

**"volume is in use"**

A container is still attached. Remove that container first, then remove the volume.

---

## Related Guides

- [Mount a Volume](mount-volume.md)
- [Use Bind Mounts](bind-mounts.md)