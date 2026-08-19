# Optimize Image Size

Multi-stage builds were the biggest lever for shrinking images. This lesson covers the rest of the toolkit: choosing the right base, keeping junk out, and ordering your Dockerfile so builds stay fast. We'll apply these to your Python API image from the intermediate track. 🧹

## What we will do (in very simple steps)

1. Understand how the base image sets your starting size
2. Add a `.dockerignore` to keep junk out of your image
3. Order your Dockerfile so rebuilds stay fast
4. Learn the cleanup habit for system packages

---

## Lever 1: Pick the right base image

Your base image (`FROM ...`) decides how much you start with before you add a single thing. For Python, there are three common choices:

| Base image | Approx size | What it is |
|---|---|---|
| `python:3.12` | ~1 GB | A fully stocked professional kitchen. Everything, most unused. |
| `python:3.12-slim` | ~150 MB | A compact kitchen with the essentials. The usual sweet spot. |
| `python:3.12-alpine` | ~50 MB | A tiny camping stove. Smallest, but some ingredients cook differently. |

Your API Dockerfile already uses `python:3.12-slim`, which is the right default for most Python apps. 👍

A word on **alpine**: it's tempting because it's tiny, but it uses a different core library (musl instead of glibc). Some Python packages have no ready-made build for it and must be compiled, which can make builds slower and occasionally break. For example, the `psycopg2` database driver needs extra build tools on alpine. Reach for `slim` first, and only consider `alpine` when size is truly critical and you've tested it.

Check your current image's size:

```bash
docker images my-first-app
```

---

## Lever 2: Add a `.dockerignore`

When you run `docker build`, Docker copies the whole folder (the "build context") and your `COPY . .` line can pull unwanted files into the image: caches, local settings, secrets. A `.dockerignore` file tells Docker what to leave out.

In `~/my-docker-app`, create a file named exactly `.dockerignore`:

```
.venv/
__pycache__/
*.pyc
*.env
.git/
```

What each line keeps out:

- `.venv/` a local Python environment, never wanted in an image
- `__pycache__/` and `*.pyc` Python's compiled cache files
- `*.env` your `app.env` and any other env files. Keeping secrets **out** of images is important, and you pass them at run time anyway
- `.git/` version history, irrelevant inside an image

Rebuild and your image is cleaner and smaller, with no risk of baking in that `app.env`:

```bash
docker build -t my-first-app .
```

> 💡 A `.dockerignore` works just like a `.gitignore`, but for Docker builds. Most real projects have both.

---

## Lever 3: Order your Dockerfile for caching

Docker builds in layers, and it **caches** each one. If a layer hasn't changed, Docker reuses it instead of redoing the work. The trick is to put the things that rarely change **before** the things that change often.

Look at your Dockerfile's order:

```dockerfile
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
```

This ordering is deliberate. Dependencies (`requirements.txt`) change rarely, so installing them comes first. Your code changes constantly, so it's copied last. See it in action: make a tiny edit to `app.py`, then rebuild:

```bash
docker build -t my-first-app .
```

The rebuild is **fast**, because Docker reused the cached dependency layer and only redid the final code copy. ⚡

Now imagine the wrong order, with `COPY . .` before the install. Every single code change would throw away the cache and reinstall every dependency from scratch, every time. Same result, far slower. Order matters.

> 💡 You'll also notice `--no-cache-dir` on the pip line. That stops pip from keeping its own download cache inside the image, saving more space.

---

## Lever 4: Clean up in the same layer

Your Python app doesn't install system packages, but many images do, and this is where size quietly balloons. When you install with a package manager, clean up in the **same** `RUN` command, because each `RUN` is a permanent layer. Cleaning up in a later step doesn't shrink the earlier one.

The pattern to remember, using Debian's `apt` as an example:

```dockerfile
RUN apt-get update \
    && apt-get install -y --no-install-recommends some-package \
    && rm -rf /var/lib/apt/lists/*
```

Everything happens in one layer: update, install only what's needed, then delete the package lists. Splitting these across separate `RUN` lines would leave the junk baked into an earlier layer forever.

---

## Check your work

See all your images and their sizes together:

```bash
docker images
```

A well-built Python API image on `slim`, with a `.dockerignore` and sensible layering, typically lands around 150 to 200 MB. If yours is far larger, one of these four levers is usually the reason.

---

## ✅ Checkpoint

You've finished this lesson if:

- You can name the trade-off between `slim` and `alpine`
- You added a `.dockerignore` and rebuilt your API image
- You understand why `requirements.txt` is copied before your code
- You know to clean up package caches in the same `RUN` line

---

## 🩹 Common hiccups

- **`.dockerignore` seems ignored**: it must be named exactly `.dockerignore` and sit in the same folder you build from.
- **Rebuild still slow after a code change**: check that `COPY requirements.txt` and the install come **before** `COPY . .` in your Dockerfile.
- **Switched to alpine and the build broke**: that's the musl trade-off. Go back to `slim` unless you're ready to add build tools and test carefully.
- **Image still large**: run `docker history my-first-app` to see which layer is heaviest, and target that one.

---

**Next up:** [Debugging Containers](debugging-containers.md), the final lesson of the track, where you'll learn to read logs, inspect containers, and calmly track down why something isn't working.