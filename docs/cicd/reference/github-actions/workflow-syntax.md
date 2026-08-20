# Workflow Syntax

## Description

A GitHub Actions workflow is a YAML file in `.github/workflows/`. It has a trigger and one or more jobs, each made of steps.

## Minimal structure

```yaml
name: CI
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "hello"
```

## Key fields

| Field | Description |
|---|---|
| `name` | The workflow's display name |
| `on` | The event(s) that trigger the workflow |
| `jobs` | The jobs to run |
| `runs-on` | The runner a job uses, e.g. `ubuntu-latest` |
| `steps` | The ordered actions in a job |
| `uses` | Run a prebuilt action |
| `run` | Run a shell command |
| `needs` | Make a job wait for another |
| `permissions` | Grant a job specific rights |
| `environment` | Tie a job to an environment (and its rules) |
| `if` | Run a job or step only if a condition holds |

## Related

- [Triggers](triggers.md)
- [Common Actions](common-actions.md)