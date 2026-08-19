# Tag an Image

## When to Use This Guide

Use this guide to give an image an additional name, usually to add a version number or to prepare it for pushing to a registry.

---

!!! tip "Quick Command"

    ```bash
    docker tag my-app YOUR_USERNAME/my-app:1.0
    ```

---

## Step 1: Tag the Image

Point a new name at an existing image.

```bash
docker tag my-app YOUR_USERNAME/my-app:1.0
```

This does not make a copy. It adds a second name for the same image.

---

## Step 2: Confirm

```bash
docker images
```

Both `my-app` and `YOUR_USERNAME/my-app` will appear, sharing the same IMAGE ID.

---

## Understanding the Format

A full image name looks like this:

```
YOUR_USERNAME/repository:version
```

If you leave the version off, Docker uses `latest` by default. Tagging real versions like `1.0` is a good habit, because `latest` changes meaning over time.

---

## Common Issues

**No such image**

The source image name is wrong. List your images with `docker images` and copy the name exactly.

---

## Related Guides

- [Build an Image](build-image.md)
- [Push to Docker Hub](push-image.md)