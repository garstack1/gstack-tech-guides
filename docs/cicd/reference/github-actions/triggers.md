# Triggers

## Description

The `on:` block declares which events start a workflow.

## Common events

| Event | Runs when |
|---|---|
| `push` | Commits or tags are pushed |
| `pull_request` | A pull request is opened or updated |
| `workflow_dispatch` | A person runs it manually |
| `schedule` | A timer fires (cron) |

## Filtering a push

```yaml
on:
  push:
    branches:
      - main
    tags:
      - 'v*'
    paths:
      - 'src/**'
```

- `branches` and `tags` limit which refs trigger the run.
- `paths` limits it to changes in certain files.

## Manual inputs

```yaml
on:
  workflow_dispatch:
    inputs:
      version:
        description: "Version to deploy"
        required: true
```

Read the value with `${{ inputs.version }}`.

## Related

- [Workflow Syntax](workflow-syntax.md)