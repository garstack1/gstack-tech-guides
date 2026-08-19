# docker run

## Description

Creates and starts a new container from an image. This is "create" and "start" combined into one command.

## Syntax

```bash
docker run [OPTIONS] IMAGE [COMMAND]
```

## Common Options

| Option | Description |
|---|---|
| `-d` | Run in the background (detached) |
| `-p HOST:CONTAINER` | Publish a port to the host |
| `--name NAME` | Give the container a name |
| `-e KEY=VALUE` | Set an environment variable |
| `-v NAME:PATH` | Attach a volume |
| `--network NAME` | Attach to a network |
| `--rm` | Remove the container automatically when it exits |
| `-it` | Interactive session with a terminal |

## Example

```bash
docker run -d -p 8080:80 --name web nginx
```

## Related Commands

- [docker ps](docker-ps.md)
- [docker stop](docker-stop.md)
- [docker exec](docker-exec.md)