# Run Your First Container (and Meet nginx)

In the last lesson you ran `docker run hello-world` and saw a friendly message. That was your **first container** - but it ran for a split second and then vanished. In this lesson we'll slow down, understand what actually happened, and then run a real web server you can open in your browser. 🌐

## What we will do (in very simple steps)

1. Understand what `hello-world` actually did
2. Run a real web server called **nginx**
3. Open it in your browser
4. Check on it, then clean it up

---

## Step 1: What did `hello-world` actually do?

When you ran that command, Docker quietly did four things:

1. **Looked** for the `hello-world` image on your computer
2. **Downloaded** it (because you didn't have it yet)
3. **Started a container** from that image
4. The container **printed its message and immediately finished**

Remember our kitchen analogy? The **image** is the packaged meal (a template, sitting on a shelf). A **container** is that meal actually being served. The `hello-world` meal is tiny - it says hello and it's done, like a single bite. 🍬

Most real containers aren't like that. They stay running and keep doing a job - which is exactly what we'll see next.

---

## Step 2: Run a real web server

We're going to run **nginx** (say it "engine-x"), a popular web server. Unlike `hello-world`, it stays running and waits to serve web pages.

Run this:

```bash
docker run -d -p 8080:80 --name my-web nginx
```

That's a few new pieces, so here's each one in plain English:

- `docker run` - start a new container
- `-d` - "detached": run it in the **background** so you get your prompt back
- `-p 8080:80` - connect **port 8080 on your computer** to **port 80 inside the container** (think of it as running a hallway between your door and the container's door)
- `--name my-web` - give the container a friendly name so it's easy to refer to later
- `nginx` - the image to run

Docker will download nginx the first time (a few seconds), then print a long string of letters and numbers. That's the container's ID, and it means nginx is now running in the background. ✅

> 💡 Why port **8080** and not 80? Port 80 is often already in use or needs special permissions. 8080 is a safe, free choice for local practice.

---

## Step 3: See it in your browser

Open your web browser and go to:

```
http://localhost:8080
```

You should see a page that says **"Welcome to nginx!"** 🎉

Take a second to appreciate this: a fully working web server is running on your machine, and you never installed nginx directly. It came fully packaged inside the container.

---

## Step 4: Check on your container

Back in your terminal, run:

```bash
docker ps
```

`ps` lists your **running** containers. You'll see something like this (it's wide, so it may wrap on your screen):

```
CONTAINER ID   IMAGE   STATUS         PORTS                    NAMES
a1b2c3d4e5f6   nginx   Up 2 minutes   0.0.0.0:8080->80/tcp     my-web
```

That confirms your `my-web` container is **Up** (running) and shows the port hallway we built: `8080->80`.

---

## Step 5: Stop and clean up

Let's switch it off tidily. First stop it:

```bash
docker stop my-web
```

Then remove it completely:

```bash
docker rm my-web
```

- **stop** turns the container off (like switching off the appliance)
- **rm** removes it entirely (throws the switched-off container away)

Run `docker ps` again and the list will be empty - your container is gone. Don't worry, we'll go much deeper into stopping, starting, and removing in the **Container Lifecycle** lesson. This was just tidying up after ourselves.

---

## ✅ Checkpoint

You've finished this lesson if:

- `docker run -d -p 8080:80 --name my-web nginx` started without errors
- **http://localhost:8080** showed the "Welcome to nginx!" page
- `docker ps` listed `my-web` as **Up**
- `docker stop my-web` and `docker rm my-web` left `docker ps` empty

---

## 🩹 Common hiccups

- **"port is already allocated"**: something is already using 8080. Either stop that program, or pick another port, e.g. `-p 8081:80`, and visit `http://localhost:8081`.
- **"The container name '/my-web' is already in use"**: you still have a container with that name from a previous try. Remove it with `docker rm -f my-web`, then run the command again.
- **Browser page won't load**: check `docker ps` shows the container as **Up**. If it's missing, the container may have failed to start - re-run the `docker run` command and read any error message.

---

**Next up:** [Understanding Images vs Containers](../images-vs-containers/) - the single most useful mental model in all of Docker.