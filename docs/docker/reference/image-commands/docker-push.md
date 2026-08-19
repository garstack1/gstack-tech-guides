# docker push

## Description

Uploads an image to a registry so others can pull it. The image name must include your registry username.

## Syntax

```bash
docker push [OPTIONS] IMAGE[:TAG]
```

## Common Options

| Option | Description |
|---|---|
| `-a` | Push all tags of the image |
| `-q` | Quiet output |

## Example

```bash
docker push YOUR_USERNAME/my-app:1.0
```

Run `docker login` first if you are not already authenticated.

## Related Commands

- [docker pull](docker-pull.md)
- [docker build](docker-build.md)