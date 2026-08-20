# Common Actions

## Description

Actions are reusable steps invoked with `uses:`. These are the ones you meet most often.

## Frequently used actions

| Action | Purpose |
|---|---|
| `actions/checkout@v4` | Copy your repository onto the runner |
| `actions/setup-python@v5` | Install a Python version (supports `cache: 'pip'`) |
| `docker/login-action@v3` | Log in to a container registry |
| `appleboy/ssh-action@v1` | Run commands on a server over SSH |

## Example

```yaml
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: 'pip'
```

## A note on versions

Pin an action to a version with `@v4`, so a new release cannot change your build unexpectedly.

## Related

- [Workflow Syntax](workflow-syntax.md)
- [Triggers](triggers.md)