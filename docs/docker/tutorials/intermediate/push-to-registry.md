# Tag and Push to a Registry

You've built your own image. Right now it only exists on your machine. In this lesson you'll put it on a **registry** so anyone, including your other computers and future servers, can pull and run it. 📦

## What we will do (in very simple steps)

1. Understand what a registry is
2. Create a free Docker Hub account and log in
3. Tag your image with your username
4. Push it to Docker Hub
5. Prove it worked by pulling it back

---

## What is a registry?

A **registry** is a shelf in the cloud where images live. **Docker Hub** is the default public one, and you've already used it: back in the beginner track, `docker run nginx` quietly **pulled** the nginx image from Docker Hub.

In kitchen terms, Docker Hub is a giant public pantry of meal kits that anyone can take from. So far you've only taken kits off the shelf. Now you'll put one of your own kits on it. 🥫

---

## Step 1: Create a Docker Hub account

1. Go to [hub.docker.com](https://hub.docker.com) and sign up for a free account.
2. Remember your **username** (your "Docker ID"). You'll use it in every command below.

The free plan gives you unlimited **public** repositories, which is all we need.

---

## Step 2: Log in from your terminal

```bash
docker login
```

Enter your Docker ID and password when prompted.

> 💡 If you have two-factor authentication turned on, your normal password won't work here. Instead, create an **access token** under Docker Hub → Account Settings → Security, and paste that in place of the password.

When it works, you'll see `Login Succeeded`. ✅

---

## Step 3: Tag your image with your username

Docker Hub needs your image to be named in a specific way so it knows where it belongs:

```
YOUR_USERNAME/repository-name:version
```

The image you built is currently just called `my-first-app`. Let's give it a proper name pointing at your account. Replace `YOUR_USERNAME` with your real Docker ID:

```bash
docker tag my-first-app YOUR_USERNAME/my-first-app:1.0
```

`docker tag` doesn't make a copy. It adds a second name pointing at the same image. Check it with:

```bash
docker images
```

You'll see both names, `my-first-app` and `YOUR_USERNAME/my-first-app`, sharing the same IMAGE ID.

> 💡 The `:1.0` on the end is the **version tag**. If you leave it off, Docker uses `latest` by default. Tagging real versions (`1.0`, `1.1`, and so on) is a good habit, because `latest` quietly changes meaning over time.

---

## Step 4: Push it to Docker Hub

```bash
docker push YOUR_USERNAME/my-first-app:1.0
```

Docker uploads your image layer by layer. When it finishes, go to [hub.docker.com](https://hub.docker.com), and you'll see `my-first-app` listed under your account. 🎉

Your image is now public. Anyone in the world could run it with a single command.

---

## Step 5: Prove it really lives in the cloud

Let's confirm the image is truly stored remotely, not just locally. First, remove your local copies:

```bash
docker rmi my-first-app YOUR_USERNAME/my-first-app:1.0
```

Check they're gone:

```bash
docker images
```

Now pull your image back down from Docker Hub:

```bash
docker pull YOUR_USERNAME/my-first-app:1.0
```

And run it:

```bash
docker run -d -p 8000:5000 --name myapp YOUR_USERNAME/my-first-app:1.0
```

Visit [http://localhost:8000](http://localhost:8000) and there's your app again, this time downloaded fresh from the cloud. 🌍

Clean up when you're done:

```bash
docker rm -f myapp
```

---

## ✅ Checkpoint

You've finished this lesson if:

- `docker login` showed **Login Succeeded**
- `docker push YOUR_USERNAME/my-first-app:1.0` uploaded successfully
- Your image appears on your Docker Hub page
- You removed it locally, pulled it back, and ran it again

---

## 🩹 Common hiccups

- **"denied: requested access to the resource is denied"**: the image name doesn't match your logged-in username, or you're not logged in. Check the username in your tag, and run `docker login` again.
- **"repository does not exist" when pulling**: double-check the exact spelling of `YOUR_USERNAME/my-first-app:1.0`, including the version tag.
- **Password rejected at login**: you probably have two-factor authentication on. Use an access token instead, as described in Step 2.
- **`docker rmi` says the image is in use**: stop and remove any container using it first with `docker rm -f myapp`, then try again.

---

**Next up:** [Use Environment Variables](environment-variables.md), where you'll move settings out of your code so the same image can behave differently in different places.