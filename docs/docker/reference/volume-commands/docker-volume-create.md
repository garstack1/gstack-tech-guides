# docker volume create

## Description

Creates a named volume, Docker-managed storage that persists independently of any container.

## Syntax

```bash
docker volume create [OPTIONS] NAME
```

## Common Options

| Option | Description |
|---|---|
| `-d DRIVER` | Volume driver to use (default `local`) |
| `--label KEY=VALUE` | Attach a label for organisation |

## Example

```bash
docker volume create my-data
```

Attach it to a container with `-v my-data:/path/in/container`.

## Related Commands

- [docker volume ls](docker-volume-ls.md)