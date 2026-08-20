# Triggers and Events

## Overview

A pipeline does not run on its own. Something has to **start** it. That something is an event, and the `on:` block of a workflow declares which events it listens for.

---

## Common triggers

- **Push**: run when commits are pushed. You can narrow this to specific branches or tags.
- **Tags**: run when a version tag like `v1.0.0` is pushed. This is how releases are usually started.
- **Pull request**: run when a pull request is opened or updated, useful for checking changes before they merge.
- **Manual (`workflow_dispatch`)**: run when a person clicks a button, optionally passing in values. Used for on-demand tasks like a rollback.
- **Schedule**: run on a timer, for recurring jobs.

---

## Narrowing a trigger

Triggers can be filtered so a workflow runs only when it should:

```yaml
on:
  push:
    branches:
      - main
    tags:
      - 'v*'
```

This runs on pushes to `main` and on version tags, but ignores pushes to other branches.

---

## Reacting to what triggered a run

A workflow can behave differently depending on the event. Two common tools:

- `github.ref_name` holds the branch or tag that triggered the run, useful for naming images.
- An `if:` condition can gate a job. For example, `if: startsWith(github.ref, 'refs/tags/v')` runs a job only on version tags, which is how deployment is limited to releases.

---

## Why this matters

Choosing the right trigger is what separates "test on every change" from "deploy only on a release." Most of a pipeline's behaviour is shaped by which events it reacts to, and how it filters them.

---

## Next

- [Pipeline Anatomy](pipeline-anatomy.md) for the structure a trigger sets in motion.
- [CI vs CD](../fundamentals/ci-vs-cd.md) for how triggers map to stages.