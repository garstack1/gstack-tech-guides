# docker logs

## Description

Shows the output a container has printed to the screen. Usually the first tool for diagnosing a problem.

## Syntax

```bash
docker logs [OPTIONS] CONTAINER
```

## Common Options

| Option | Description |
|---|---|
| `-f` | Follow the log output live |
| `--tail N` | Show only the last N lines |
| `--since TIME` | Show logs since a time, e.g. `10m` |
| `-t` | Show timestamps |

## Examples

```bash
docker logs web
docker logs -f web
docker logs --tail 50 web
```

## Related Commands

- [docker exec](docker-exec.md)
- [docker ps](docker-ps.md)