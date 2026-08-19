# Remove Images

## When to Use This Guide

Use this guide to delete images you no longer need and reclaim disk space.

---

!!! tip "Quick Command"

    ```bash
    docker rmi my-app
    ```

---

## Step 1: List Your Images

See what you have and how much space each uses.

```bash
docker images
```

---

## Step 2: Remove a Specific Image

```bash
docker rmi my-app
```

You can also remove by image ID.

```bash
docker rmi a1b2c3d4e5f6
```

---

## Step 3: Clean Up Unused Images

Remove images that no longer have a name (often leftovers from rebuilds).

```bash
docker image prune
```

To remove **all** images not currently used by a container, add `-a`.

```bash
docker image prune -a
```

---

## Common Issues

**"image is being used by running container"**

Stop and remove the container first, then remove the image.

```bash
docker rm -f app
docker rmi my-app
```

**"image has dependent child images"**

Other images are built on top of it. Remove those first, or use `docker image prune -a` to clear unused ones.

---

## Related Guides

- [Build an Image](build-image.md)
- [Remove Containers](../containers/stop-remove.md)