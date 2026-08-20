# Versioning and Releases

Welcome to the Intermediate track! 🚀

So far your pipeline publishes an image tagged `latest`. But `latest` is a moving target: it changes meaning every time you push, so nobody can tell which version they are actually running. Real projects publish **versioned releases** instead, marked with tags like `v1.0.0`. This lesson makes your pipeline do that.

## What we will do (in very simple steps)

1. Learn how version numbers work
2. Learn what a Git tag is
3. Make the pipeline publish a versioned image when you push a tag

---

## Semantic versioning

Version numbers are not random. The common scheme, **semantic versioning**, looks like `v1.4.2` and reads as `vMAJOR.MINOR.PATCH`:

- **MAJOR** (`1`): goes up on a breaking change
- **MINOR** (`4`): goes up when you add a feature that does not break anything
- **PATCH** (`2`): goes up for a small bug fix

So `v1.0.0` is your first release, `v1.1.0` adds a feature, and `v1.1.1` fixes a bug.

---

## Git tags

A **tag** is a label you attach to a specific commit to mark it as a release. Unlike a branch, a tag does not move. `v1.0.0` always points at the exact code that was released as `v1.0.0`.

You create and push a tag like this (do not run it yet):

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## Step 1: Make the pipeline react to tags

Open `.github/workflows/ci.yml` and update the trigger and the image tag. The full file becomes:

```yaml
name: CI

on:
  push:
    branches:
      - main
    tags:
      - 'v*'

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - name: Check out the code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install dependencies
        run: pip install -r requirements.txt pytest

      - name: Run tests
        run: pytest

      - name: Log in to the registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push the image
        run: |
          docker build -t ghcr.io/${{ github.repository }}:${{ github.ref_name }} .
          docker push ghcr.io/${{ github.repository }}:${{ github.ref_name }}
```

Two things changed:

- The trigger now also fires on tags matching `v*`, so any version tag starts the pipeline.
- The image is now tagged with `${{ github.ref_name }}`, which is the name of whatever triggered the run. On a push to `main` it is `main`; on the tag `v1.0.0` it becomes `v1.0.0`.

---

## Step 2: Cut your first release

Commit the workflow change first:

```bash
git add .
git commit -m "Publish versioned images on tags"
git push
```

Now create and push a version tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

In the **Actions** tab you will see a run triggered by the tag. When it finishes, check **Packages**: your image is now published as `snapshot-app:v1.0.0`, a real, named release. 🎉

---

## ✅ Checkpoint

You are ready for the next lesson if:

- You understand what MAJOR, MINOR, and PATCH mean
- Pushing the tag `v1.0.0` triggered a pipeline run
- The registry shows an image tagged `v1.0.0`, not just `latest`

---

## 🩹 Common hiccups

- **The tag did not trigger anything**: you must push the tag itself with `git push origin v1.0.0`. A normal `git push` does not send tags.
- **"tag already exists"**: you already made that tag. Use the next number, such as `v1.0.1`.
- **Wrong image tag published**: check the build step uses `${{ github.ref_name }}`, not a hard-coded value.

---

**Next up:** [Secrets Done Right](secrets.md), where you store credentials safely so the pipeline can log in to places beyond GitHub.