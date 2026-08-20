# Argo CD CLI

## Description

The `argocd` command-line tool manages Argo CD applications from the terminal, an alternative to the dashboard.

## Common commands

| Command | What it does |
|---|---|
| `argocd login HOST` | Log in to an Argo CD server |
| `argocd app list` | List applications |
| `argocd app get NAME` | Show an application's status |
| `argocd app sync NAME` | Sync an application now |
| `argocd app create ...` | Create an application |
| `argocd app delete NAME` | Delete an application |

## Example

```bash
argocd app get snapshot
argocd app sync snapshot
```

## Note

Most tasks in this course use the Argo CD **dashboard**, which mirrors these commands. The CLI is handy for scripting and automation.

## Related

- [Application Spec](application-spec.md)