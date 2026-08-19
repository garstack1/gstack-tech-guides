# Stop Compose Services

## When to Use This Guide

Use this guide to stop and clean up the containers a Compose file started.

---

!!! tip "Quick Command"

    ```bash
    docker compose down
    ```

---

## Step 1: Stop and Remove the Stack

Run this from the folder containing your `compose.yaml`.

```bash
docker compose down
```

This stops and removes the containers and the network. Your named volumes are **kept**, so data is safe.

---

## Step 2: Remove Volumes Too (Optional)

To wipe the data as well, add `-v`.

```bash
docker compose down -v
```

!!! warning

    `docker compose down -v` permanently deletes the volumes and everything in them. Use it only for a clean start.

---

## Stop Without Removing

To pause the stack but keep the containers for later:

```bash
docker compose stop
```

Start them again with `docker compose start`.

---

## Common Issues

**Data disappeared**

You likely ran `down -v`, which removes volumes. Use plain `down` to keep data.

---

## Related Guides

- [Run a Multi-Container App](run-compose.md)
- [Create a Compose File](create-compose-file.md)