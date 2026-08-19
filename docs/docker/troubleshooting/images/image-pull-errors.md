# Image Pull Errors

## Problem

Docker cannot download an image when you run or pull it.

## Symptoms

Errors such as:

```text
pull access denied
manifest unknown
repository does not exist
```

## Common Causes

- A typo in the image name or tag
- The tag does not exist for that image
- The image is private and you are not logged in
- No internet connection, or a registry rate limit

## Investigation

Check the exact name and tag you asked for, and confirm you are logged in.

```bash
docker login
```

Try pulling a known public image to rule out a network problem.

```bash
docker pull hello-world
```

## Resolution

Correct the image name and tag, log in if the repository is private, or use a tag that actually exists.

## Prevention

- Use specific, known tags rather than assuming `latest` exists
- Log in ahead of time when working with private images