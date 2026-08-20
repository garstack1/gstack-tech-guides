# Build and Push an Image

## When to Use This Guide

Use this guide to build a Docker image in the pipeline and publish it to a registry.

---

!!! tip "Quick Command"

    ```bash
    docker build -t ghcr.io/OWNER/APP:TAG . && docker push ghcr.io/OWNER/APP:TAG
    ```

---

## Step 1: Grant permission and log in

The job needs permission to publish, and a login step:

```yaml
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Log in to the registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
```

## Step 2: Build and push

```yaml
      - name: Build and push
        run: |
          docker build -t ghcr.io/${{ github.repository }}:${{ github.ref_name }} .
          docker push ghcr.io/${{ github.repository }}:${{ github.ref_name }}
```

`GITHUB_TOKEN` is provided automatically, so no password is stored.

---

## Common Issues

**"permission_denied" on push**

Add the `permissions: packages: write` block to the job.

**"invalid reference format"**

`ghcr.io` names must be lowercase. Lowercase the image name if your username has capitals.

---

## Related Guides

- [Trigger on a Tag](trigger-on-tag.md)
- [Add a Secret](../deployment/add-a-secret.md)