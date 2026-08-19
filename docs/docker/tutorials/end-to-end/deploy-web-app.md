# Deploy a Web App with Docker

Everything so far has run on your own machine. In this end-to-end lesson you'll put your app on a **real server**, reachable from anywhere on the internet. This is the moment your work stops being a local experiment and becomes something you could actually share. 🌍

It pulls together skills from across the course: pushing to a registry, writing a Compose file, and passing configuration with environment variables.

> ℹ️ **You can read this one without following along.** The steps need a cloud server, which costs a little money. If you have one, great. If not, read through so you understand how deployment works, and come back when you're ready.

## What we will do (in very simple steps)

1. Get a small Linux server in the cloud
2. Install Docker on it
3. Push your app image so the server can pull it
4. Run the whole stack on the server with Compose
5. Visit your app on its public address

---

## Step 1: Get a server

Create a small **Ubuntu** server with any cloud provider (DigitalOcean, Hetzner, AWS, and others all work). The smallest, cheapest size is plenty for this. You'll end up with two things:

- A **public IP address**, for example `203.0.113.10`
- **SSH access**, usually a key or password set during creation

Connect to it from your terminal (replace with your server's address):

```bash
ssh root@YOUR_SERVER_IP
```

From here on, commands run **on the server**, not your laptop, unless we say otherwise.

---

## Step 2: Install Docker on the server

The same one-line installer you used at the very start works here too:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Check it worked:

```bash
docker --version
```

Your server now has the same container engine your laptop does. 🐳

---

## Step 3: Push your image so the server can pull it

A server doesn't build images, it **pulls** finished ones. So back **on your laptop**, make sure your API image is on Docker Hub (from the registry lesson):

```bash
docker push YOUR_USERNAME/my-first-app:1.0
```

If you need to rebuild and push it first:

```bash
cd ~/my-docker-app
docker build -t YOUR_USERNAME/my-first-app:1.0 .
docker push YOUR_USERNAME/my-first-app:1.0
```

Now the server can fetch your app from anywhere.

---

## Step 4: Run the stack on the server

Back **on the server**, create a folder and two files. First `compose.yaml`:

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: snapshot
    volumes:
      - snapshot-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  app:
    image: YOUR_USERNAME/my-first-app:1.0
    ports:
      - "80:5000"
    environment:
      DB_HOST: db
    depends_on:
      - db

volumes:
  snapshot-data:
```

Two differences from your local Compose file, both important:

- The app uses `image: YOUR_USERNAME/my-first-app:1.0` instead of `build: .`, because the server pulls your finished image rather than building it.
- The app maps to port **80**, the standard web port, so visitors don't need to add a port number to the address.

Then the same seed file, `init.sql`:

```sql
CREATE TABLE IF NOT EXISTS photos (id serial PRIMARY KEY, title text);
INSERT INTO photos (title) VALUES ('sunset'), ('mountain');
```

Start it all:

```bash
docker compose up -d
```

The server pulls Postgres and your app, creates the network and volume, and starts everything, exactly as it did on your laptop.

---

## Step 5: Visit your app

Open your browser and go to your server's public address:

```
http://YOUR_SERVER_IP/photos
```

Your app responds, live on the internet, serving data from its database. 🎉 You built this, and now anyone can reach it.

> 🔥 If it doesn't load, your provider's firewall may be blocking port 80. Most providers have a firewall or "security group" setting where you allow inbound HTTP (port 80). Check that first.

---

## A word on real production

This is a deliberately simple deploy, perfect for learning, but not yet hardened for serious use. A real production setup would also add:

- **HTTPS** so traffic is encrypted
- **Proper secrets** instead of a password sitting in a Compose file
- **Backups** of the database volume
- **Automatic restarts** if the server reboots

Those are worthwhile next steps once the basics feel comfortable.

---

## ✅ Checkpoint

You've finished this lesson if:

- You installed Docker on a remote server
- Your app image is on Docker Hub and the server pulled it
- `docker compose up -d` started the stack on the server
- Visiting `http://YOUR_SERVER_IP/photos` returned your data

---

## 🩹 Common hiccups

- **Page won't load**: the provider firewall is likely blocking port 80. Allow inbound HTTP in your server's network settings.
- **"pull access denied"**: the image name or tag is wrong, or the repository is private. Check `YOUR_USERNAME/my-first-app:1.0` exactly.
- **App error on `/photos`**: give Postgres a few seconds to start, and confirm `init.sql` is in the same folder as `compose.yaml`.
- **Can't SSH in**: check your key or password and that your provider allows SSH (port 22).

---

## 🚀 Where this leads: Kubernetes

Look at what you just did, and what it cost. You deployed to **one** server, **by hand**. Now ask the hard questions:

- What happens if that server crashes at 3 a.m.?
- What if your app needs ten servers to handle traffic?
- How do you update to a new version with no downtime?

Doing all of that by hand, across many machines, quickly becomes impossible. That is exactly the problem **Kubernetes** was built to solve. It takes the very containers you've built here and runs them reliably at scale, healing, updating, and balancing them automatically.

You now have the perfect foundation for it. Everything Kubernetes orchestrates is a container, and you understand containers deeply. The [Kubernetes course](../../../kubernetes/) is your natural next step.

**Next up:** [Full Stack App with Compose](fullstack-compose.md), where you'll bring the frontend, API, and database together into one complete local stack.