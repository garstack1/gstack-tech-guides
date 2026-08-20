# YAML Errors

## Problem

The workflow fails before any job runs, because the file cannot be read.

## Symptoms

GitHub shows an **"Invalid workflow file"** message, and the run goes red immediately, with no jobs starting.

## Common Causes

- Indentation with **tabs** instead of spaces
- Inconsistent indentation between lines
- A missing colon, or a value on the wrong line
- A quoted string that needed quoting but was left bare

## Investigation

Read the error. GitHub points at the **line and column** of the problem. Open that line and check its indentation against the lines around it.

## Resolution

Fix the indentation so every level uses **two spaces** and no tabs. Correct any missing colons. Push again and the file should parse.

## Prevention

- Use an editor that highlights YAML and shows whitespace
- Copy examples exactly, keeping their indentation
- Quote values that contain special characters like a colon