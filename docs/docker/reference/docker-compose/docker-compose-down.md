# docker compose down

## Description

Stops and removes the containers and network created by `docker compose up`.

## Syntax

```bash
docker compose down [OPTIONS]
```

## Common Options

| Option | Description |
|---|---|
| `-v` | Also remove named volumes (deletes their data) |
| `--rmi all` | Also remove images used by the services |

## Example

```bash
docker compose down
```

By default, volumes are kept so your data is safe. Add `-v` only for a clean slate.

## Related Commands

- [docker compose up](docker-compose-up.md)