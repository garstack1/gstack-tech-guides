# Port Already in Use

## Problem

A container fails to start because the host port you asked for is already taken.

## Symptoms

```text
Error: port is already allocated
```

Or a "bind: address already in use" message when running the container.

## Common Causes

- Another container is already published on that host port
- A program on your machine (not Docker) is using the port
- A previous container was not removed and still holds the port

## Investigation

See what containers are using ports.

```bash
docker ps
```

## Resolution

Either free the port, or publish your container on a different host port.

```bash
docker run -d -p 8081:80 --name web nginx
```

Then visit the new port, for example `http://localhost:8081`.

If an old container is holding it, remove that container.

```bash
docker rm -f OLD_CONTAINER
```

## Prevention

- Keep track of which host ports your containers use
- Remove containers you are finished with