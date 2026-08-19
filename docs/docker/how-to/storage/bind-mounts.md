# Use Bind Mounts

## When to Use This Guide

Use this guide to map a folder on your own machine into a container. This is ideal during development, when you want the container to see files you edit live.

---

!!! tip "Quick Command"

    ```bash
    docker run -d -v "$(pwd)":/app my-app
    ```

---

## Step 1: Mount a Host Folder

Use `-v HOST_PATH:CONTAINER_PATH`. The host path must be absolute, so `$(pwd)` (your current folder) is handy.

```bash
docker run -d --name app -v "$(pwd)":/app my-app
```

Now the container's `/app` folder is your current folder on the host.

---

## Step 2: Edit and See Changes

Edit a file on your machine, and the container sees the change immediately, with no rebuild needed.

---

## Volume vs Bind Mount

- A **named volume** is managed by Docker. Best for data your app produces, like a database.
- A **bind mount** points at a folder you choose. Best for source code you are actively editing.

---

## Common Issues

**"invalid mount path: must be absolute"**

Bind mounts need a full path. Use `$(pwd)` or an absolute path, not a relative one like `./app`.

**Changes not appearing**

Confirm the container path matches where the app actually reads its files, and that the app reloads on change.

---

## Related Guides

- [Mount a Volume](mount-volume.md)
- [Create a Volume](create-volume.md)