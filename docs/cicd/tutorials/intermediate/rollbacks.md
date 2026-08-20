# Rollbacks

Even with tests and approvals, a bad release sometimes reaches production. When it does, you need to get back to a working version **fast**. This lesson gives you a one-click rollback. 🔙

## What we will do (in very simple steps)

1. Understand why rolling back is easy when you version your images
2. Build a rollback workflow you can trigger by hand
3. Roll back to a previous version

---

## Why versioning makes this simple

Remember that every release published a versioned image: `v1.0.0`, `v1.1.0`, and so on. Those old images are still sitting in the registry, untouched.

That means a rollback is not some special reverse operation. It is just a normal deploy, pointed at an **earlier** version. Going forward and going back are the same action: "deploy version X." This only works because you versioned your images instead of overwriting `latest` every time.

---

## Step 1: Create a rollback workflow

This workflow lets you pick a version and deploy it on demand. Create `.github/workflows/rollback.yml`:

```yaml
name: Rollback

on:
  workflow_dispatch:
    inputs:
      version:
        description: "Version tag to deploy (for example v1.1.0)"
        required: true

jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy a specific version
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull ghcr.io/${{ github.repository }}:${{ inputs.version }}
            docker rm -f snapshot || true
            docker run -d --name snapshot -p 80:5000 ghcr.io/${{ github.repository }}:${{ inputs.version }}
```

The new idea is `workflow_dispatch` with **inputs**. When you run this workflow by hand, GitHub asks you to type a version, and passes it in as `${{ inputs.version }}`. The deploy script then pulls and runs exactly that version.

---

## Step 2: Roll back

Push the workflow:

```bash
git add .
git commit -m "Add a rollback workflow"
git push
```

Now imagine your latest release, `v1.2.0`, has a serious bug in production. To recover:

1. Open the **Actions** tab and choose the **Rollback** workflow.
2. Click **Run workflow**.
3. Enter a known-good version, for example `v1.1.0`, and run it.

Within seconds the server is running the older, working image again. Crisis handled, calmly. 🎉 Later, you fix the bug, cut `v1.2.1`, and roll forward the normal way.

---

## A note on speed

Because this rollback targets the `production` environment, its approval gate still applies. That is fine for many teams. Others let rollbacks skip the gate so recovery is instant, since going back to a known-good version is low risk. Choose whichever suits how careful you need to be.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- You have a `Rollback` workflow with a version input
- You can run it by hand and pass a version
- You understand that rolling back is just deploying an earlier versioned image

---

## 🩹 Common hiccups

- **"manifest unknown" when rolling back**: that version was never published. Roll back only to a tag that exists in the registry.
- **Input is empty**: the `version` input is required. Type the exact tag, including the leading `v`.
- **Nothing to run**: `workflow_dispatch` workflows only show the Run button once the file is on your default branch.

---

**Next up:** [Capstone: Full Delivery Pipeline](capstone.md), where you take a change from commit all the way to production through the complete pipeline.