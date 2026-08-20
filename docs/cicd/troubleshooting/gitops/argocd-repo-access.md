# Argo CD Repo Access

## Problem

Argo CD cannot read your repository, so it has nothing to deploy.

## Symptoms

Errors such as:

```text
repository not accessible
failed to list refs
authentication required
```

## Common Causes

- The repository URL is wrong or has a typo
- The repository is **private**, and Argo CD has no credentials for it
- The branch or revision named in the Application does not exist

## Investigation

- Recheck the `repoURL` in the Application, exactly as it appears on GitHub.
- Confirm whether the repository is public or private.
- Confirm the `targetRevision` (branch or tag) exists.

## Resolution

For a public repository, correct the URL. For a private one, add repository credentials to Argo CD (Settings, then Repositories) so it can authenticate. Fix the branch name if it is wrong.

## Prevention

- Keep learning repositories public for simplicity
- Copy the repository URL directly from GitHub rather than typing it