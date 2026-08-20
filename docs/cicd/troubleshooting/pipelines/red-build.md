# Red Build

## Problem

A workflow ran, but a job failed.

## Symptoms

The run shows a **red X**, and later jobs may be skipped.

## Common Causes

- A test failed
- The `docker build` failed
- A command in a step returned an error
- A missing file or dependency

## Investigation

Use the same calm method every time:

1. Open the failed run.
2. Click the job with the red X.
3. Expand the step marked red.
4. Read the error, usually near the **bottom** of the log.

The log names exactly what failed. A failing test shows the assertion; a failing build shows the Dockerfile step.

## Resolution

Fix the specific cause the log points to, then push again. If a later job was skipped, that is expected: a failed step stops the rest.

## Prevention

- Run tests locally before pushing
- Keep steps small, so a failure is easy to place