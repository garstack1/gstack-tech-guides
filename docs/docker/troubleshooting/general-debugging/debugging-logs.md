# Debugging with Logs

## Problem

Something is not working, and you need to find out what the container is actually doing.

## Symptoms

A container errors, returns an unexpected result, or behaves differently than you expect.

## The First Move

Almost every Docker problem starts here. Read what the container printed.

```bash
docker logs CONTAINER_NAME
```

## Useful Variations

Follow logs live as they happen.

```bash
docker logs -f CONTAINER_NAME
```

Show only the most recent lines.

```bash
docker logs --tail 50 CONTAINER_NAME
```

For Compose, view all services together.

```bash
docker compose logs
```

## Reading the Output

- A stack trace or error message points directly at the cause
- "connection refused" or "could not resolve host" suggests a networking problem
- No output at all may mean the app logs to a file instead of the screen

## Why This Matters

A browser or client often shows only a vague error. The logs show the real cause. When in doubt, check the logs before changing anything.

## Related

- [Inspecting Containers](docker-inspect.md)