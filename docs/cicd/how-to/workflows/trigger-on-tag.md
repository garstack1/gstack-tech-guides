# Trigger on a Tag

## When to Use This Guide

Use this guide to run a workflow when you push a version tag like `v1.0.0`, instead of on every push.

---

!!! tip "Quick Command"

    ```yaml
    on:
      push:
        tags:
          - 'v*'
    ```

---

## Step 1: Set the trigger

In your workflow file, set the `on:` block to react to tags:

```yaml
on:
  push:
    branches:
      - main
    tags:
      - 'v*'
```

This runs on pushes to `main` and on any tag starting with `v`.

## Step 2: Push a tag

```bash
git tag v1.0.0
git push origin v1.0.0
```

The tag triggers the workflow. Inside it, `${{ github.ref_name }}` holds the tag name, handy for tagging images.

---

## Common Issues

**Nothing runs after tagging**

A plain `git push` does not send tags. You must push the tag explicitly with `git push origin v1.0.0`.

---

## Related Guides

- [Build and Push an Image](build-and-push.md)
- [Run Tests in CI](run-tests.md)