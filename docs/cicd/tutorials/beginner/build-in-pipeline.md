# Building in the Pipeline

Your pipeline runs, but so far it only prints a message. Time for the first real station on the belt: **building your Docker image automatically** on every push. 🏗️

## What we will do (in very simple steps)

1. Learn how a job gets your code
2. Replace the "hello" step with a real build
3. Watch GitHub build your image for you

---

## First, a new idea: getting your code

Remember that every job starts on a **fresh, empty machine**. It has Docker installed, but it does not have your code yet. Before you can build, you have to copy your repository onto the runner.

GitHub provides a ready-made **action** for this. That introduces the second kind of step:

- `run:` runs a shell command you write
- `uses:` runs a prebuilt action someone else wrote

The action `actions/checkout` fetches your repository onto the runner. You will use it at the start of almost every job.

---

## Step 1: Update your workflow

Open `.github/workflows/ci.yml` and replace its contents with this:

```yaml
name: CI

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the code
        uses: actions/checkout@v4

      - name: Build the image
        run: docker build -t snapshot-app .
```

What changed:

- The job is now called `build`.
- The first step uses `actions/checkout@v4` to copy your repo onto the runner. The `@v4` pins the version, so it does not change unexpectedly.
- The second step runs the exact same `docker build` command you know from the Docker course.

---

## Step 2: Push and watch

```bash
git add .
git commit -m "Build the image in the pipeline"
git push
```

Open the **Actions** tab on GitHub and click into the new run. Expand the **Build the image** step, and you will see Docker working through your Dockerfile, step by step, on GitHub's machine. When it finishes with a green tick, your image built successfully in the cloud, with no effort from you. 🎉

From now on, every push automatically confirms that your image still builds. If someone breaks the Dockerfile, the pipeline goes red immediately.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- Your workflow has a `checkout` step followed by a `docker build` step
- The Actions run completes with a green tick
- The build log shows Docker working through your Dockerfile

---

## 🩹 Common hiccups

- **"failed to read dockerfile" or "no such file"**: you are missing the `checkout` step, so the runner has no code. Make sure `actions/checkout@v4` comes first.
- **The build fails at a specific step**: the log points at the exact instruction. It fails here for the same reasons it would fail on your machine, so fix the Dockerfile and push again.
- **YAML error before anything runs**: check indentation. Every level uses two spaces, and never a tab.

---

**Next up:** [Testing in the Pipeline](test-in-pipeline.md), where you add automated tests so the pipeline checks your app actually works, not just that it builds.