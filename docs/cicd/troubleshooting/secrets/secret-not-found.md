# Secret Not Found

## Problem

A workflow runs, but a value that should come from a secret is empty.

## Symptoms

A step behaves as if the secret is blank: a login fails, or a check reports the value is not set.

## Common Causes

- The secret name in the workflow does not match the stored name (names are case-sensitive)
- The secret was added at repository level, but the job uses an **environment** that does not have it
- The secret was never created

## Investigation

- Compare the name in `${{ secrets.NAME }}` against the exact name in Settings.
- If the job names an `environment:`, check the secret exists **inside that environment**, not only at repository level.

## Resolution

Add the secret with the exact name, in the right place (repository or the specific environment the job targets). Re-run the workflow.

## Prevention

- Use consistent, obvious secret names
- Remember that environment jobs read the environment's secrets
- Never print a secret to check it. Test its length instead