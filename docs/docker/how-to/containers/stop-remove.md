# Stop and Remove Containers

## When to Use This Guide

Use this guide to switch off a running container, delete one you no longer need, or clean up all stopped containers at once.

---

!!! tip "Quick Command"

    ```bash
    docker rm -f web
    ```

---

## Step 1: Stop a Container

Switch it off gracefully.

```bash
docker stop web
```

The container stops but still exists. You can confirm with `docker ps -a`.

---

## Step 2: Remove a Container

Delete a stopped container.

```bash
docker rm web
```

To stop and remove in one step, force it:

```bash
docker rm -f web
```

---

## Step 3: Clean Up All Stopped Containers

Remove every stopped container at once.

```bash
docker container prune
```

You will be asked to confirm before anything is deleted.

---

## Common Issues

**Cannot remove a running container**

Either stop it first, or use `docker rm -f` to force it.

**Container name still in use after removal**

Confirm it is gone with `docker ps -a`. If it lingers, force-remove it.

---

## Related Guides

- [Run a Container](run-container.md)
- [View Container Logs](view-logs.md)