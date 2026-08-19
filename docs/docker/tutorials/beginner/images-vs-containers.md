# Understanding Images vs Containers (The Big One)

If you remember only one idea from this whole course, make it this one. Almost every confusing Docker moment comes from mixing up **images** and **containers** - so let's make the difference crystal clear. 💡

## What we will do (in very simple steps)

1. Learn the difference between an image and a container
2. Prove it by running the same image twice
3. Show that removing containers doesn't remove the image

---

## The mental model 🍱

Back to our kitchen:

- An **image** is a **meal kit** sitting on a shelf. It's a template - the recipe plus all the packed ingredients. It never changes, and you can keep as many copies as you like.
- A **container** is a **meal you actually cook and serve** from that kit. It's alive, it does its job, and when you're done you clear it away.

The key insight: **one image can make many containers.** You can cook the same meal kit again and again - each cooked meal is separate, even though they all came from the same kit.

> 👩‍💻 **If you've programmed before:** an image is like a *class*, and a container is like an *object* (an instance) created from that class. Same idea.

---

## Let's prove it

We'll run the **same nginx image twice**, creating two separate containers.

```bash
docker run -d --name web1 nginx
docker run -d --name web2 nginx
```

Now look at your running containers:

```bash
docker ps
```

You'll see **two** containers - `web1` and `web2` - both made from `nginx`:

```
CONTAINER ID   IMAGE   STATUS         NAMES
f1e2d3c4b5a6   nginx   Up 3 seconds   web2
a1b2c3d4e5f6   nginx   Up 5 seconds   web1
```

Now look at your **images**:

```bash
docker images
```

You'll see just **one** nginx image:

```
REPOSITORY   TAG       IMAGE ID       SIZE
nginx        latest    a1b2c3d4e5f6   188MB
```

There it is: **two containers, one image.** 🎯 The single meal kit on the shelf, cooked twice.

---

## Removing containers doesn't remove the image

Let's clear away both containers (the `-f` forces them to stop and be removed in one go):

```bash
docker rm -f web1 web2
```

Check they're gone:

```bash
docker ps
```

Empty - no running containers. But now check your images again:

```bash
docker images
```

The nginx image is **still there**. 🧊

That's the meal kit still on the shelf after you've cleared away the cooked meals. You can cook from it again any time, without re-downloading anything.

---

## The cheat sheet

| | **Image** | **Container** |
|---|---|---|
| What it is | A template (recipe + ingredients) | A running instance made from an image |
| Kitchen analogy | Meal kit on the shelf | The cooked, served meal |
| Changes over time? | No - it's read-only | Yes - it's live and disposable |
| How many? | One image... | ...can create many containers |
| Command to list | `docker images` | `docker ps` |

---

## ✅ Checkpoint

You've got this lesson if you can answer:

- You ran nginx twice. How many **images** did that use? *(One.)*
- How many **containers** did it create? *(Two.)*
- After `docker rm -f web1 web2`, does `docker images` still show nginx? *(Yes - removing containers never removes the image.)*

If those make sense, the hardest concept in Docker is now behind you. 🙌

---

## 🩹 Common hiccups

- **"name is already in use"**: you already have a `web1` or `web2` from earlier. Remove it with `docker rm -f web1` and try again.
- **`docker images` shows extra images**: that's fine - it lists every image you've ever pulled, including `hello-world` from lesson one.
- **Mixing up the two commands**: remember `docker images` = the shelf (templates), `docker ps` = what's cooking right now (running containers).

---

**Next up:** [Basic Container Lifecycle](../container-lifecycle/) - how containers are born, paused, restarted, and removed, and why the changes you make inside them can disappear.