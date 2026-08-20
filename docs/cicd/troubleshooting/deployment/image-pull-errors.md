# Image Pull Errors

## Problem

The server or cluster cannot download the image during deployment.

## Symptoms

Errors such as:

```text
pull access denied
manifest unknown
ErrImagePull / ImagePullBackOff
```

## Common Causes

- The image package is **private**, and the target has no credentials to pull it
- The image name or tag is wrong, or that version was never published
- On `ghcr.io`, an uppercase letter in the name (names must be lowercase)

## Investigation

- Confirm the exact image name and tag exist in your registry.
- Check whether the package is public or private.
- For `ImagePullBackOff` in Kubernetes, run `kubectl describe pod POD` to see the underlying reason.

## Resolution

Make the package **public**, or give the target pull credentials. Correct the name and tag to a version that actually exists. Lowercase the name if needed.

## Prevention

- Deploy only tags you have published
- Decide early whether images are public or private, and set credentials to match