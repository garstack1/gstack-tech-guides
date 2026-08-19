# docker network ls

## Description

Lists the Docker networks on your machine, including the built-in ones and any you have created.

## Syntax

```bash
docker network ls [OPTIONS]
```

## Common Options

| Option | Description |
|---|---|
| `-q` | Show only network IDs |
| `--filter KEY=VALUE` | Filter the list, e.g. `driver=bridge` |

## Example

```bash
docker network ls
```

To see which containers are attached to a network, use `docker network inspect NAME`.

## Related Commands

- [docker network create](docker-network-create.md)