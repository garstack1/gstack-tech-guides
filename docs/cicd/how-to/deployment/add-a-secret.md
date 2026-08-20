# Add a Secret

## When to Use This Guide

Use this guide to store a credential (a server login, an API key) so a workflow can use it without exposing it in your code.

---

!!! tip "Quick Command"

    ```yaml
    env:
      MY_VALUE: ${{ secrets.MY_SECRET }}
    ```

---

## Step 1: Store the secret

On GitHub: **Settings**, then **Secrets and variables**, then **Actions**, then **New repository secret**. Give it a name and value, and save. You will not see the value again.

## Step 2: Use it in a workflow

Pass it in through `env`, never hard-coded:

```yaml
      - name: Use the secret
        env:
          MY_VALUE: ${{ secrets.MY_SECRET }}
        run: echo "The value has ${#MY_VALUE} characters"
```

Report its length, not its value. GitHub masks known secrets in logs, but you should never print them anyway.

---

## Environment secrets

If a job names an `environment:`, add the secret **inside that environment** instead of at repository level, so staging and production can hold different values under the same name.

---

## Common Issues

**Secret is empty**

The name is case-sensitive and must match exactly. If the job uses an environment, the secret must live in that environment.

---

## Related Guides

- [Deploy over SSH](deploy-over-ssh.md)
- [Require an Approval](require-approval.md)