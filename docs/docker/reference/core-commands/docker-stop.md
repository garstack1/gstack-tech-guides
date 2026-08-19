# docker stop

## Description

Stops one or more running containers gracefully, giving each process a moment to shut down before it is forced.

## Syntax

```bash
docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

## Common Options

| Option | Description |
|---|---|
| `-t SECONDS` | How long to wait before forcing the stop (default 10) |

## Examples

```bash
docker stop web
docker stop web db worker
```

Start a stopped container again with `docker start`.

## Related Commands

- [docker rm](docker-rm.md)
- [docker ps](docker-ps.md)