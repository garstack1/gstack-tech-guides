# Secrets Done Right

Soon your pipeline will deploy to a server, which means it needs credentials: a server address, a login, a key. Those must **never** be written in your workflow file, where anyone who sees your code could read them. This lesson shows the safe way: **GitHub Secrets**. 🔒

## What we will do (in very simple steps)

1. Understand why hard-coded credentials are dangerous
2. Add a secret to your repository
3. Use it in a workflow without ever exposing it

---

## Why not just put them in the file?

Your workflow file lives in your Git repository, in plain text, visible to anyone who can see the code. A password written there is a password leaked. Even in a private repo, it ends up in your history forever.

You already used one secret safely: `GITHUB_TOKEN`, which GitHub creates automatically. Now you will add your **own** secrets for things GitHub does not provide, like your server login.

---

## GitHub Secrets: the safe store

A **secret** is an encrypted value you store in your repository settings. GitHub decrypts it only at run time, hands it to the workflow, and **masks it in the logs** so it cannot be printed by accident.

---

## Step 1: Add a secret

On GitHub, in your `snapshot-app` repository:

1. Go to **Settings**.
2. In the sidebar, open **Secrets and variables**, then **Actions**.
3. Click **New repository secret**.
4. Name it `DEMO_SECRET`, give it any value (for example `hello-secret-world`), and click **Add secret**.

The value is now stored encrypted. You will never see it again in the interface, only its name.

---

## Step 2: Use it safely in a workflow

Create a small workflow to prove the secret is available without leaking it. Add `.github/workflows/secrets-demo.yml`:

```yaml
name: Secrets Demo

on: workflow_dispatch

jobs:
  demo:
    runs-on: ubuntu-latest
    steps:
      - name: Use a secret safely
        env:
          MY_SECRET: ${{ secrets.DEMO_SECRET }}
        run: |
          if [ -z "$MY_SECRET" ]; then
            echo "Secret is NOT set"
          else
            echo "Secret is set and has ${#MY_SECRET} characters"
          fi
```

Two good habits are built in here:

- The secret is passed in through `env`, not written into a command directly.
- The step reports the **length** of the secret, never its value. Notice it never prints the secret itself.

`on: workflow_dispatch` means this workflow has a manual **Run workflow** button. Push the file, then in the **Actions** tab open **Secrets Demo** and click **Run workflow**. The log confirms the secret is set and shows its length, but never reveals it. Even if you tried to print it, GitHub would replace it with `***`.

---

## The secrets you'll need soon

When you deploy to a server in a couple of lessons, you will add a few real secrets the same way:

- `SSH_HOST`: your server's address
- `SSH_USER`: the login name
- `SSH_PRIVATE_KEY`: the key used to connect

You do not need them yet. Just know that this is where they will live.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- You added a `DEMO_SECRET` in the repository settings
- Your demo workflow reports the secret is set, showing its length only
- You understand why the value must never be written in the workflow file

---

## 🩹 Common hiccups

- **"Secret is NOT set"**: the secret name in the file must match exactly, including capitals. It is `DEMO_SECRET`.
- **You cannot see the secret's value again**: that is intended. If you forget it, delete and recreate it.
- **Run workflow button missing**: it only appears for workflows with `workflow_dispatch`, and only on the default branch.

You can delete `secrets-demo.yml` once you are done experimenting.

---

**Next up:** [Multi-Stage Pipelines](multi-stage-pipelines.md), where you split the pipeline into separate jobs that run in sequence.