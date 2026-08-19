# docker exec

## Description

Runs a command inside a running container, often used to open a shell for debugging.

## Syntax

```bash
docker exec [OPTIONS] CONTAINER COMMAND
```

## Common Options

| Option | Description |
|---|---|
| `-it` | Interactive session with a terminal |
| `-e KEY=VALUE` | Set an environment variable for the command |
| `-w PATH` | Set the working directory |
| `-u USER` | Run as a specific user |

## Examples

```bash
docker exec -it web sh
docker exec web ls /usr/share/nginx/html
```

Only works on a running container.

## Related Commands

- [docker logs](docker-logs.md)
- [docker run](docker-run.md)