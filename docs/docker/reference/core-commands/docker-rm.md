# docker rm

## Description

Removes one or more containers. The container must be stopped first, unless you force it.

## Syntax

```bash
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

## Common Options

| Option | Description |
|---|---|
| `-f` | Force removal of a running container (stops it first) |
| `-v` | Also remove volumes anonymous to the container |

## Examples

```bash
docker rm web
docker rm -f web
```

Remove all stopped containers at once with `docker container prune`.

## Related Commands

- [docker stop](docker-stop.md)
- [docker ps](docker-ps.md)