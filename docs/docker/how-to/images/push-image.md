# Push to Docker Hub

## When to Use This Guide

Use this guide to publish an image to Docker Hub so it can be pulled and run on other machines.

---

!!! tip "Quick Command"

    ```bash
    docker push YOUR_USERNAME/my-app:1.0
    ```

---

## Step 1: Log In

```bash
docker login
```

Enter your Docker ID and password. If you use two-factor authentication, use an access token in place of the password.

---

## Step 2: Tag with Your Username

The image name must start with your Docker ID.

```bash
docker tag my-app YOUR_USERNAME/my-app:1.0
```

---

## Step 3: Push

```bash
docker push YOUR_USERNAME/my-app:1.0
```

When it finishes, the image will appear on your Docker Hub page.

---

## Common Issues

**"requested access to the resource is denied"**

The image name does not match your logged-in username, or you are not logged in. Check the name and run `docker login` again.

**Push is slow**

The first push uploads every layer. Later pushes only upload the layers that changed.

---

## Related Guides

- [Tag an Image](tag-image.md)
- [Build an Image](build-image.md)