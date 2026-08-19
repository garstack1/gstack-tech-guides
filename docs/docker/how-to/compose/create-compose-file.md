# Create a Compose File

## When to Use This Guide

Use this guide to write a Compose file that describes a multi-container application in one place.

---

!!! tip "Quick Command"

    ```bash
    docker compose up -d
    ```

---

## Step 1: Create the File

In your project folder, create a file named `compose.yaml`.

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "8000:5000"
    environment:
      DB_HOST: db
    depends_on:
      - db

volumes:
  db-data:
```

---

## Step 2: Understand the Parts

- **services**: each container in your app
- **image** or **build**: use a ready image, or build from a local Dockerfile
- **ports**: publish a port to your host
- **environment**: pass settings in
- **volumes** (at the bottom): declare named volumes for lasting data

Services reach each other by their service name, so `app` connects to the database at the host `db`.

---

## File Naming

The modern name is `compose.yaml`. The older `docker-compose.yml` still works, and Docker recognises both.

---

## Common Issues

**Indentation errors**

YAML is strict about spaces. Use consistent two-space indentation, and never use tabs.

---

## Related Guides

- [Run a Multi-Container App](run-compose.md)
- [Stop Compose Services](stop-compose.md)