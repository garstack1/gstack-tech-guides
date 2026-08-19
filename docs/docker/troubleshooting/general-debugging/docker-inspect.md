# Inspecting Containers

## Problem

You need to see a container's full configuration: its exit code, its networks, its environment, or its mounts.

## The Tool

`docker inspect` returns everything Docker knows about a container as detailed data.

```bash
docker inspect CONTAINER_NAME
```

The output is long, so it is usually best to pull out just one field.

## Useful Queries

Check why a container stopped.

```bash
docker inspect --format '{{.State.ExitCode}}' CONTAINER_NAME
```

Check its current status.

```bash
docker inspect --format '{{.State.Status}}' CONTAINER_NAME
```

See which networks it is attached to.

```bash
docker inspect --format '{{json .NetworkSettings.Networks}}' CONTAINER_NAME
```

## When to Use It

Reach for `inspect` when the logs alone do not answer a question like "which network is this really on?" or "what environment variables did it actually start with?"

## Related

- [Debugging with Logs](debugging-logs.md)