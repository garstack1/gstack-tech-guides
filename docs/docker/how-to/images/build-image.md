# Build an Image

## When to Use This Guide

Use this guide when you have a `Dockerfile` and want to build it into an image you can run or share.

---

!!! tip "Quick Command"

    ```bash
    docker build -t my-app .
    ```

---

## Step 1: Build the Image

Run this from the folder that contains your `Dockerfile`.

```bash
docker build -t my-app .
```

- `-t my-app` names (tags) the image
- the `.` is the build context: the current folder

---

## Step 2: Confirm It Was Created

```bash
docker images my-app
```

You should see `my-app` listed with a size and image ID.

---

## Step 3: Run It

```bash
docker run -d -p 8000:5000 --name app my-app
```

---

## Common Issues

**"failed to read dockerfile"**

You are not in the folder containing the `Dockerfile`, or the file is not named exactly `Dockerfile`. Check with `ls`.

**Build is slow every time**

Copy dependency files and install them before copying your code, so Docker can reuse cached layers.

---

## Related Guides

- [Tag an Image](tag-image.md)
- [Push to Docker Hub](push-image.md)