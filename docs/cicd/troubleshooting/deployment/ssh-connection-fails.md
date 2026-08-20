# SSH Connection Fails

## Problem

The deploy job cannot connect to your server.

## Symptoms

Errors such as:

```text
Permission denied (publickey)
ssh: connect to host ... port 22: Connection timed out
```

## Common Causes

- The public key is not in the server's `~/.ssh/authorized_keys`
- The `SSH_PRIVATE_KEY` secret is incomplete or malformed
- The host or username secret is wrong
- The server's firewall blocks SSH (port 22)

## Investigation

- Confirm the deploy key's **public** half is on the server, in `authorized_keys`.
- Confirm `SSH_PRIVATE_KEY` holds the **whole** private key, including its first and last lines.
- Check `SSH_HOST` and `SSH_USER` are correct.

## Resolution

Fix whichever is wrong: add the public key to the server, paste the complete private key into the secret, or correct the host and user. If it times out, allow inbound SSH in the server's firewall.

## Prevention

- Test the key with a manual `ssh` before wiring it into the pipeline
- Use a dedicated deploy key, not your personal one