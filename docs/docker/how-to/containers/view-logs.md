# View Container Logs

## When to Use This Guide

Use this guide when you need to see what a container has printed, usually to work out why something is not behaving as expected.

---

!!! tip "Quick Command"

    ```bash
    docker logs web
    ```

---

## Step 1: View the Logs

Show everything the container has printed so far.

```bash
docker logs web
```

---

## Step 2: Follow Logs Live

Stream new log lines as they happen, like watching a live feed.

```bash
docker logs -f web
```

Press `Ctrl + C` to stop following.

---

## Step 3: Show Only the Most Recent Lines

Handy when the log is very long.

```bash
docker logs --tail 50 web
```

---

## Common Issues

**No output at all**

The application may write logs to a file inside the container rather than to the screen. Docker only captures what an app prints to standard output.

**Container already exited**

Logs still work on stopped containers. Run `docker logs web` to see what happened before it stopped.

---

## Related Guides

- [Exec into a Container](docker-exec.md)
- [Stop and Remove Containers](stop-remove.md)