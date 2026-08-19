# docker network create

## Description

Creates a user-defined network. Containers on it can reach each other by name.

## Syntax

```bash
docker network create [OPTIONS] NAME
```

## Common Options

| Option | Description |
|---|---|
| `-d DRIVER` | Network driver to use (default `bridge`) |
| `--subnet CIDR` | Set a custom subnet |

## Example

```bash
docker network create my-net
```

Attach containers with `--network my-net` when you run them.

## Related Commands

- [docker network ls](docker-network-ls.md)