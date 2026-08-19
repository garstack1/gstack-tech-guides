# Mount a Volume

## When to Use This Guide

Use this guide to attach a named volume to a container, so the data it writes there survives the container being removed.

---

!!! tip "Quick Command"

    ```bash
    docker run -d -v my-data:/var/lib/postgresql/data postgres:16
    ```

---

## Step 1: Mount the Volume

Attach a volume with `-v NAME:PATH`, where `PATH` is the folder inside the container.

```bash
docker run -d --name db -e POSTGRES_PASSWORD=secret -v my-data:/var/lib/postgresql/data postgres:16
```

Docker creates the volume automatically if it does not exist yet.

---

## Step 2: Prove the Data Survives

Remove the container.

```bash
docker rm -f db
```

Start a new one with the **same** volume, and the data is still there.

```bash
docker run -d --name db -e POSTGRES_PASSWORD=secret -v my-data:/var/lib/postgresql/data postgres:16
```

---

## Common Issues

**Data was not there after recreating**

Check you used the exact same volume name both times. A typo creates a new, empty volume.

**Wrong path inside the container**

The volume must be mounted at the folder where the application actually stores its data. For Postgres that is `/var/lib/postgresql/data`.

---

## Related Guides

- [Create a Volume](create-volume.md)
- [Use Bind Mounts](bind-mounts.md)