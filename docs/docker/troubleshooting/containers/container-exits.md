# Container Exits Immediately

## Problem

A container exits the instant it starts, and never stays running.

## Symptoms

```bash
docker ps
```

Nothing appears. But `docker ps -a` shows the container as `Exited` just seconds after it was created.

## Common Causes

- The container's main process finished and exited (a container lives only as long as its main process)
- The start command runs a task that completes and returns, rather than a long-running service
- The command errored out immediately

## Investigation

Check the logs and the exit code.

```bash
docker logs CONTAINER_NAME
docker ps -a
```

An exit code of `0` means it finished cleanly; a non-zero code means it errored.

## Resolution

Make sure the container runs a **long-lived foreground process**, such as a web server. If you only ran a one-off command, exiting is expected and correct.

## Prevention

Remember the rule: a container runs for exactly as long as its main process does. Design the start command to stay in the foreground.