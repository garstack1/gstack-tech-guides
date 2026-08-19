# docker compose up

## Description

Creates and starts all the services defined in a Compose file.

## Syntax

```bash
docker compose up [OPTIONS]
```

## Common Options

| Option | Description |
|---|---|
| `-d` | Run in the background (detached) |
| `--build` | Rebuild images before starting |
| `--force-recreate` | Recreate containers even if unchanged |

## Example

```bash
docker compose up -d --build
```

Run this from the folder containing your `compose.yaml`.

## Related Commands

- [docker compose down](docker-compose-down.md)