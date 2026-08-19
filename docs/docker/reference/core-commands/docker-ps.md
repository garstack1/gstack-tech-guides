# docker ps

## Description

Lists containers. By default it shows only running containers.

## Syntax

```bash
docker ps [OPTIONS]
```

## Common Options

| Option | Description |
|---|---|
| `-a` | Show all containers, including stopped ones |
| `-q` | Show only container IDs |
| `-l` | Show the most recently created container |
| `--filter KEY=VALUE` | Filter the list, e.g. `status=exited` |

## Examples

```bash
docker ps
docker ps -a
```

## Related Commands

- [docker run](docker-run.md)
- [docker stop](docker-stop.md)
- [docker rm](docker-rm.md)