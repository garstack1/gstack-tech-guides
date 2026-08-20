# Require an Approval

## When to Use This Guide

Use this guide to pause the pipeline for a human to approve before it deploys to production.

---

!!! tip "Quick Command"

    ```yaml
    environment: production
    ```

---

## Step 1: Create a protected environment

On GitHub: **Settings**, then **Environments**, then **New environment**, named `production`. Under **Protection rules**, enable **Required reviewers** and add yourself.

> Approvals are free on public repositories.

## Step 2: Tie the job to the environment

```yaml
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy
        run: echo "deploying..."
```

Because `production` requires a reviewer, this job pauses and waits for approval before running.

## Step 3: Approve

When the run reaches the job, a **Review deployments** button appears. Approve it to let the deploy continue.

---

## Common Issues

**It deployed without asking**

The required reviewer rule is not set on the environment, or the job does not name that environment.

---

## Related Guides

- [Deploy over SSH](deploy-over-ssh.md)
- [Roll Back a Deploy](roll-back.md)