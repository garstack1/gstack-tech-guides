# docker build

## Description

Builds an image from a Dockerfile and a build context (a folder of files).

## Syntax

```bash
docker build [OPTIONS] PATH
```

## Common Options

| Option | Description |
|---|---|
| `-t NAME:TAG` | Name and tag the image |
| `-f FILE` | Use a Dockerfile with a different name or location |
| `--no-cache` | Build without using the layer cache |
| `--build-arg KEY=VALUE` | Pass a build-time variable |

## Example

```bash
docker build -t my-app .
```

The `.` is the build context: the current folder.

## Related Commands

- [docker images](docker-images.md)
- [docker push](docker-push.md)