# Deploy over SSH

## When to Use This Guide

Use this guide to have the pipeline connect to a server and update the running app.

---

!!! tip "Quick Command"

    ```yaml
    uses: appleboy/ssh-action@v1
    ```

---

## Step 1: Add the server secrets

Store `SSH_HOST`, `SSH_USER`, and `SSH_PRIVATE_KEY` as secrets. The matching **public** key must be in the server's `~/.ssh/authorized_keys`.

## Step 2: Add the deploy job

```yaml
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v')
    steps:
      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull ghcr.io/${{ github.repository }}:${{ github.ref_name }}
            docker rm -f snapshot || true
            docker run -d --name snapshot -p 80:5000 ghcr.io/${{ github.repository }}:${{ github.ref_name }}
```

The `script` runs **on the server**: pull the new image, remove the old container, start the new one.

---

## Common Issues

**Permission denied (publickey)**

The public key is not on the server, or `SSH_PRIVATE_KEY` is incomplete. Include the whole private key, first and last lines included.

**Pull fails on the server**

The image must be public, or the server needs registry credentials.

---

## Related Guides

- [Add a Secret](add-a-secret.md)
- [Roll Back a Deploy](roll-back.md)