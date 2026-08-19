# docker pull

## Description

Downloads an image from a registry, such as Docker Hub, to your machine.

## Syntax

```bash
docker pull [OPTIONS] IMAGE[:TAG]
```

## Common Options

| Option | Description |
|---|---|
| `-a` | Pull all tags of the image |
| `-q` | Quiet output |

## Examples

```bash
docker pull nginx
docker pull postgres:16
```

If you leave the tag off, Docker pulls `latest`.

## Related Commands

- [docker push](docker-push.md)
- [docker images](docker-images.md)