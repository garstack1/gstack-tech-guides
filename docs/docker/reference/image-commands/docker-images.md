# docker images

## Description

Lists the images stored on your machine, with their tags, IDs, and sizes.

## Syntax

```bash
docker images [OPTIONS] [REPOSITORY]
```

## Common Options

| Option | Description |
|---|---|
| `-a` | Show all images, including intermediate layers |
| `-q` | Show only image IDs |
| `--filter KEY=VALUE` | Filter the list, e.g. `dangling=true` |

## Examples

```bash
docker images
docker images my-app
```

## Related Commands

- [docker build](docker-build.md)
- [docker pull](docker-pull.md)