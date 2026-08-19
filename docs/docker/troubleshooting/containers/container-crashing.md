# Container Crashing

## Problem

A container starts but keeps crashing, often restarting again and again.

## Symptoms

```bash
docker ps
```

The container shows a status like `Restarting`, or it appears in `docker ps -a` with a non-zero exit code.

## Common Causes

- The application hits an error during startup
- A required environment variable is missing or wrong
- It cannot reach a service it depends on, such as a database
- The wrong start command is being run

## Investigation

Read the logs first. They almost always contain the real error.

```bash
docker logs CONTAINER_NAME
```

Check the exit code and status.

```bash
docker ps -a
```

## Resolution

Fix whatever the logs reveal: supply the missing variable, correct the start command, or make sure any service it depends on is running and reachable.

## Prevention

- Test the image locally before relying on it
- Pass required configuration explicitly
- Add a healthcheck so dependencies are ready before the app starts