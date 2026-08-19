# Build Failures

## Problem

`docker build` stops partway through with an error.

## Symptoms

The build output ends at a particular step with a red error message, and no image is produced.

## Common Causes

- A file referenced by `COPY` does not exist, or is excluded by `.dockerignore`
- A `RUN` command fails
- A syntax mistake in the Dockerfile
- The base image name or tag is wrong

## Investigation

Read the error carefully. Docker tells you **which step** failed and why. If a `RUN` command failed, try running that same command yourself to see the full error.

Confirm the files you are copying actually exist.

```bash
ls
```

## Resolution

Fix the specific instruction that failed: correct the `COPY` path, repair the failing command, or fix the base image name.

## Prevention

- Build frequently, so failures are small and easy to trace
- Keep a `.dockerignore` so you do not accidentally exclude needed files
- Order instructions so cached layers are reused