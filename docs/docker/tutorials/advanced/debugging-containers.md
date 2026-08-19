# Debugging Containers

Sooner or later a container won't start, or an app returns an error, and you need to find out why. The good news: a broken container is not a mystery. It's a patient with symptoms, and Docker gives you the tools to read the chart. The golden rule of this lesson is simple: **don't guess, look.** 🔍

## What we will do (in very simple steps)

1. Learn the four tools you'll reach for every time
2. Break a container on purpose and diagnose it
3. Break the app-to-database connection and diagnose that too
4. Build a quick symptom-to-fix reference

---

## The four tools

Almost every Docker problem is solved with these four commands. Learn them and you'll rarely be stuck:

- `docker ps -a` shows **all** containers, including ones that crashed, with their exit codes
- `docker logs` shows what a container **printed**, which is usually the real answer
- `docker inspect` shows a container's **full configuration**
- `docker exec` lets you **go inside** a running container and look around

Let's use each one on real failures.

---

## Tool 1 and 2: `ps -a` and `logs` (a crash)

Run a container that fails on purpose:

```bash
docker run --name crash-demo python:3.12-slim python -c "print(1/0)"
```

It returns to your prompt straight away, seemingly with nothing to show. Where did it go? Look for it:

```bash
docker ps -a
```

`docker ps` alone wouldn't show it (it's not running), but `docker ps -a` reveals it with a status like `Exited (1)`. That `1` is the **exit code**, and a non-zero code means something went wrong.

Now ask what it said:

```bash
docker logs crash-demo
```

There's your answer, in plain sight:

```
ZeroDivisionError: division by zero
```

This is the single most important debugging habit: when a container misbehaves, **read its logs first.** Nine times out of ten the answer is right there. Clean up:

```bash
docker rm crash-demo
```

### Exit codes worth knowing

| Exit code | Usually means |
|---|---|
| `0` | Clean, successful exit |
| `1` | The app hit an error (read the logs) |
| `127` | Command not found |
| `137` | Killed, often out of memory |

---

## A 500 error is not the whole story

Browsers hide the real cause behind a generic error. Let's see this using your API image. Run it pointing at a database that doesn't exist:

```bash
docker run -d -p 8000:5000 --name app-demo -e DB_HOST=nowhere my-first-app
```

Hit the database route:

```bash
curl http://localhost:8000/photos
```

You get a vague **Internal Server Error**. Unhelpful on its own. But the container is still running, so check its logs:

```bash
docker logs app-demo
```

Now the real cause appears:

```
could not translate host name "nowhere" to address
```

The app is fine. It simply can't find a database called `nowhere`. That points you straight at the fix you learned in the networking lesson: a correct `DB_HOST` and both containers on the same network. The lesson here is that **the browser shows the symptom, the logs show the cause.** Clean up:

```bash
docker rm -f app-demo
```

---

## Tool 3: `inspect` (the full configuration)

`docker inspect` dumps everything Docker knows about a container as detailed data. It's a lot, so pull out just what you need with `--format`. A few genuinely useful queries:

```bash
docker inspect --format '{{.State.ExitCode}}' CONTAINER_NAME
```

```bash
docker inspect --format '{{.State.Status}}' CONTAINER_NAME
```

Inspect is how you answer questions like "which network is this actually on?" or "what environment variables did it really start with?", when logs alone don't tell you.

---

## Tool 4: `exec` (go inside and look)

For a **running** container, you can step inside and poke around, just like being at its command line:

```bash
docker exec -it CONTAINER_NAME sh
```

Inside, you can list files, check environment variables with `env`, or test connections. Type `exit` to leave.

One key distinction: `exec` only works on a **running** container. If a container has crashed and exited, you can't `exec` into it, so you fall back to `logs` to see what happened before it died.

---

## Quick reference: symptom to fix

| Symptom | Look here first |
|---|---|
| Container exited immediately | `docker ps -a` for the exit code, then `docker logs` |
| App returns Internal Server Error | `docker logs` on the app container |
| Containers can't reach each other | Check they share a network, confirm the hostname matches the service or container name |
| "port is already allocated" | `docker ps` to find what's using it, or change the host port |
| Database "connection refused" | The database may still be starting. Wait, then check `docker logs` on it |

---

## ✅ Checkpoint

You've finished this lesson, and the Advanced track, if you can:

- Find a crashed container with `docker ps -a` and read its exit code
- Use `docker logs` to find the real cause behind an error
- Explain why `docker exec` works on running containers but not crashed ones
- Say, from memory, the first command to run when something breaks (`docker logs`)

---

## 🏁 Track complete

You've reached the end of the Advanced track. You can now run a whole stack from one Compose file, build lean images with multi-stage builds, trim them further, and calmly debug them when things go wrong. That's the full lifecycle of working with containers, from a single `hello-world` all the way to a production-minded, multi-service application. 🎉

**Where to go next:**

- The [End-to-End tutorials](../end-to-end/deploy-web-app.md) put every skill together into complete, real-world builds.
- The **Kubernetes course** is the natural next step. Everything you've containerized here is exactly what Kubernetes orchestrates, at scale, across many machines.