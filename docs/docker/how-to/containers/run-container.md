# Run a Container

## When to Use This Guide

Use this guide when you want to start a container from an image, whether it is an official image like nginx or one you built yourself.

---

!!! tip "Quick Command"

    ```bash
    docker run -d -p 8080:80 --name web nginx
    ```

---

## Step 1: Run the Container

Start a container in the background and map a port.

```bash
docker run -d -p 8080:80 --name web nginx
```

- `-d` runs it in the background
- `-p 8080:80` maps host port 8080 to container port 80
- `--name web` names it for easy reference

---

## Step 2: Confirm It Is Running

```bash
docker ps
```

You should see `web` listed with a status of `Up`.

---

## Step 3: Access It

```bash
curl http://localhost:8080
```

Or open `http://localhost:8080` in a browser.

---

## Common Issues

**Port is already allocated**

Use a different host port.

```bash
docker run -d -p 8081:80 --name web nginx
```

**Name is already in use**

Remove the old container first.

```bash
docker rm -f web
```

---

## Related Guides

- [Stop and Remove Containers](stop-remove.md)
- [View Container Logs](view-logs.md)