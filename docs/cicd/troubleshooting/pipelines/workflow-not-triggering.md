# Workflow Not Triggering

## Problem

You pushed a change, but no pipeline ran.

## Symptoms

The **Actions** tab shows no new run for your push or tag.

## Common Causes

- The workflow's `on:` trigger does not match what you did (for example, it only runs on tags, and you pushed to a branch)
- The file is not in `.github/workflows/`, or does not end in `.yml`
- You pushed a commit, but the workflow only triggers on tags, and you did not push the tag
- The commit message contains `[skip ci]`
- Actions are disabled for the repository

## Investigation

- Open the workflow file and read its `on:` block. Does it match your action?
- Confirm the file lives at `.github/workflows/name.yml`.
- If it triggers on tags, remember `git push` does not send tags. You need `git push origin v1.0.0`.

## Resolution

Adjust the trigger to match, move the file to the right folder, or push the tag explicitly. If Actions are off, enable them under Settings, then Actions.

## Prevention

- Keep triggers simple and intentional
- Remember tags must be pushed separately from commits