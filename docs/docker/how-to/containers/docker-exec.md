# Exec into a Container

## When to Use This Guide

Use this guide when you need to run a command inside a running container, or open a shell to look around while debugging.

---

!!! tip "Quick Command"

    ```bash
    docker exec -it web sh
    ```

---

## Step 1: Confirm the Container Is Running

`exec` only works on a running container.

```bash
docker ps
```

---

## Step 2: Open a Shell Inside It

```bash
docker exec -it web sh
```

- `-it` makes the session interactive
- `sh` is the shell to run (some images also have `bash`)

Your prompt changes to show you are now inside the container.

---

## Step 3: Run Commands, Then Leave

Inside the container you can inspect files or environment variables.

```bash
ls
env
```

Type `exit` to return to your own terminal.

---

## Run a Single Command Without a Shell

To run one command and get the output directly:

```bash
docker exec web ls /usr/share/nginx/html
```

---

## Common Issues

**"container is not running"**

You cannot exec into a stopped container. Check `docker ps -a`, and view its logs instead.

**"executable file not found" for bash**

The image may not include `bash`. Use `sh` instead.

---

## Related Guides

- [View Container Logs](view-logs.md)
- [Run a Container](run-container.md)