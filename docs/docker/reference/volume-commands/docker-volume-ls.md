# docker volume ls

## Description

Lists the volumes stored on your machine.

## Syntax

```bash
docker volume ls [OPTIONS]
```

## Common Options

| Option | Description |
|---|---|
| `-q` | Show only volume names |
| `--filter KEY=VALUE` | Filter the list, e.g. `dangling=true` |

## Example

```bash
docker volume ls
```

To see details of a volume, including where it is stored, use `docker volume inspect NAME`.

## Related Commands

- [docker volume create](docker-volume-create.md)