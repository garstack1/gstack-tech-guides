# Roll Back a Deploy

## When to Use This Guide

Use this guide to return production to a previous, working version after a bad release.

---

!!! tip "Quick Command"

    Run the **Rollback** workflow and enter an earlier version, such as `v1.1.0`.

---

## Step 1: Create a rollback workflow

A manual workflow that deploys a version you choose:

```yaml
name: Rollback

on:
  workflow_dispatch:
    inputs:
      version:
        description: "Version tag to deploy"
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

## Step 2: Run it

In the **Actions** tab, open **Rollback**, click **Run workflow**, and enter a known-good version. The server returns to that version in seconds.

Rolling back works because you publish **versioned** images. Going back is just deploying an earlier tag.

---

## Common Issues

**"manifest unknown"**

That version was never published. Roll back only to a tag that exists in the registry.

---

## Related Guides

- [Deploy over SSH](deploy-over-ssh.md)
- [Require an Approval](require-approval.md)