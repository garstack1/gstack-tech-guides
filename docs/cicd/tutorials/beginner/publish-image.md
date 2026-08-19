# Publishing Automatically

Your pipeline tests and builds. The last station is to **publish** the finished image to a registry, so it is ready to deploy. And we will do it without ever typing a password, using credentials GitHub creates for the pipeline automatically. 📦

## What we will do (in very simple steps)

1. Understand how the pipeline logs in without a stored password
2. Add a publish step to the workflow
3. Find your published image on GitHub

---

## The credentials problem

Pushing to a registry needs a login. But you must never paste a real password into a workflow file, since it would be visible to anyone who can see your code.

We solve this in two ways at once:

- We use the **GitHub Container Registry** (`ghcr.io`), which is built into your GitHub account.
- We log in with `GITHUB_TOKEN`, a temporary password GitHub **creates automatically for each run** and throws away afterwards. Nothing to store, nothing to leak.

---

## Step 1: Add publishing to the workflow

Open `.github/workflows/ci.yml` and replace its contents with this:

```yaml
name: CI

on: push

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
          docker build -t ghcr.io/${{ github.repository }}:latest .
          docker push ghcr.io/${{ github.repository }}:latest
```

The new pieces:

- `permissions: packages: write` gives this workflow the right to publish images.
- The **Log in** step uses `secrets.GITHUB_TOKEN`, the automatic password mentioned above, and `github.actor`, which is you.
- `github.repository` expands to `your-username/snapshot-app`, so the image is named `ghcr.io/your-username/snapshot-app`.
- The final step builds the image with that name and pushes it.

---

## Step 2: Push and watch it publish

```bash
git add .
git commit -m "Publish the image to the registry"
git push
```

In the **Actions** tab, open the run and expand **Build and push the image**. You will see Docker build, then upload the image layer by layer to `ghcr.io`. Green tick means it published. 🎉

---

## Step 3: Find your image

On your GitHub profile or the repository page, look for **Packages**. Your `snapshot-app` image is now listed there, published straight from the pipeline.

Your belt is now complete for Continuous Integration: every push tests, builds, and publishes a ready-to-run image, all on its own.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- Your workflow logs in using `secrets.GITHUB_TOKEN`
- The pipeline pushes the image without any manual login
- The image appears under **Packages** on GitHub

---

## 🩹 Common hiccups

- **"denied" or "permission" error on push**: the `permissions: packages: write` block is missing or misplaced. It belongs under the job, as shown.
- **"invalid reference format" on the image name**: `ghcr.io` requires all-lowercase names. If your GitHub username has capital letters, the name must be lowercased first. Ask and we can add a small step for that.
- **Login step fails**: check the registry is `ghcr.io` and the password is exactly `${{ secrets.GITHUB_TOKEN }}`.

---

**Next up:** [Capstone: Build, Test, Push](capstone.md), where you confirm the whole beginner pipeline works end to end on a fresh change.