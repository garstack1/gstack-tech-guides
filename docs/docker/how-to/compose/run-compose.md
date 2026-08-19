# Run a Multi-Container App

## When to Use This Guide

Use this guide to start every service in a Compose file with a single command.

---

!!! tip "Quick Command"

    ```bash
    docker compose up -d
    ```

---

## Step 1: Start the Stack

Run this from the folder containing your `compose.yaml`.

```bash
docker compose up -d
```

- `up` creates and starts every service
- `-d` runs them in the background

Add `--build` to rebuild your images first.

```bash
docker compose up -d --build
```

---

## Step 2: Check the Services

```bash
docker compose ps
```

Every service should show as running.

---

## Step 3: View the Logs

See the combined output of all services.

```bash
docker compose logs
```

Follow them live with `docker compose logs -f`.

---

## Common Issues

**"docker compose: command not found"**

Some older installs use the hyphenated `docker-compose`. Try that, or update Docker.

**A service keeps restarting**

Check its logs with `docker compose logs SERVICE_NAME` to see the error.

---

## Related Guides

- [Create a Compose File](create-compose-file.md)
- [Stop Compose Services](stop-compose.md)