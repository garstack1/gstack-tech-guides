# Permission Denied

## Problem

A job fails because it is not allowed to do something, often pushing an image or committing back to the repo.

## Symptoms

Errors such as:

```text
denied: permission_denied
requested access to the resource is denied
remote: Permission to ... denied
```

## Common Causes

- The job is missing a `permissions:` block (for example `packages: write` to push images, or `contents: write` to push commits)
- The image name does not match the account you are logged in as
- You are trying to push to a registry without logging in first

## Investigation

- Check the failing step. Is it pushing an image, or pushing a commit?
- Confirm the job has the matching `permissions:` block.
- For image pushes, confirm the login step ran and the image name uses your username.

## Resolution

Add the right permission to the job:

```yaml
    permissions:
      contents: read
      packages: write
```

Use `contents: write` instead when the job needs to push commits back to the repo.

## Prevention

- Grant each job only the permissions it needs
- Match image names to the logged-in account