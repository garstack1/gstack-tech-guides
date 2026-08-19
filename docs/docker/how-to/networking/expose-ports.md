# Expose Ports

## When to Use This Guide

Use this guide to make a container reachable from your own machine or the outside world, by publishing one of its ports.

---

!!! tip "Quick Command"

    ```bash
    docker run -d -p 8080:80 nginx
    ```

---

## Step 1: Publish a Port

Map a port on your host to a port inside the container.

```bash
docker run -d -p 8080:80 --name web nginx
```

The format is `-p HOST:CONTAINER`. Here host port 8080 connects to container port 80.

---

## Step 2: Access It

```bash
curl http://localhost:8080
```

---

## Publish Multiple Ports

Repeat `-p` for each port you need.

```bash
docker run -d -p 8080:80 -p 8443:443 --name web nginx
```

---

## EXPOSE vs Publishing

A `EXPOSE` line in a Dockerfile only **documents** which port an app uses. It does not open it. Only `-p` at run time actually publishes a port to the host.

---

## Common Issues

**"port is already allocated"**

Another process is using that host port. Pick a different one, such as `-p 8081:80`.

**Reachable from the container network but not the host**

You did not publish the port. Add `-p` to make it reachable from your machine.

---

## Related Guides

- [Connect Containers](connect-containers.md)
- [Run a Container](../containers/run-container.md)