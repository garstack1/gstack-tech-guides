# Docker Compose Multi-Service App

At the end of the Intermediate track, starting your app took a lot of typing: create a network, run the database with a volume, rebuild the app, run it on the network with the right environment variables. Miss one flag and nothing works. 😮‍💨

There's a better way. **Docker Compose** lets you describe your entire setup in a single file, then start all of it with one command. This is how real projects run multiple containers.

## What we will do (in very simple steps)

1. Write one file describing your whole app
2. Start everything with a single command
3. See the app and database working together
4. Tear it all down cleanly

---

## The idea

Instead of cooking each dish by hand and remembering every step, Compose is a **written menu for the whole kitchen**. It lists every part of your system, how they connect, and prepares the entire meal with one command. 📋

A Compose file describes **services** (your containers), and Compose handles the network and names for you automatically.

---

## Step 1: Create the Compose file

In your `~/my-docker-app` folder (the same one with your `Dockerfile` and `app.py`), create a file named `compose.yaml`:

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
    build: .
    ports:
      - "8000:5000"
    environment:
      DB_HOST: db
      GREETING: Hi
    depends_on:
      - db

volumes:
  snapshot-data:
```

Let's read it like a menu:

- **`db` service**: uses the `postgres:16` image, sets the same environment variables you used by hand, and attaches the `snapshot-data` volume so data survives.
- **`app` service**: `build: .` tells Compose to build your image from the Dockerfile right here. It publishes port 8000, and passes environment variables.
- **`depends_on`**: start the database before the app.
- **`volumes:` at the bottom**: declares the named volume Compose will manage.

Here's the detail that ties the whole track together: the app's `DB_HOST` is just **`db`**, the service name. Compose puts every service on a shared network automatically, so services find each other by their service name. No manual network, no container-name juggling. The networking you did by hand last lesson now happens for free. ✨

---

## Step 2: Add a database seed file

So the app has something to show, create one more file in the same folder called `init.sql`:

```sql
CREATE TABLE IF NOT EXISTS photos (id serial PRIMARY KEY, title text);
INSERT INTO photos (title) VALUES ('sunset'), ('mountain');
```

Postgres runs any `.sql` file placed in that special `docker-entrypoint-initdb.d` folder **the first time** it starts with an empty volume. That means your table and sample rows get created automatically.

> 💡 For a clean first run, if you still have the `snapshot-data` volume from earlier lessons, remove it so the seed can run on a fresh database: `docker volume rm snapshot-data` (do this only if no container is using it).

---

## Step 3: Start everything with one command

From inside `~/my-docker-app`:

```bash
docker compose up -d --build
```

- `up` creates and starts everything in your Compose file
- `-d` runs it in the background
- `--build` makes sure your app image is rebuilt from the latest code

Compose builds your app, pulls Postgres, creates the network and volume, and starts both containers, all from that one command. Check they're both running:

```bash
docker compose ps
```

Now test it:

```bash
curl http://localhost:8000/photos
```

```json
{"photos": [{"id": 1, "title": "sunset"}, {"id": 2, "title": "mountain"}]}
```

Your whole system, up and talking, from a single file. 🎉

Want to see what's happening inside? Compose gives you all the logs together:

```bash
docker compose logs
```

---

## Step 4: Tear it down

One command stops and removes everything Compose created:

```bash
docker compose down
```

This removes the containers and the network, but **keeps your volume**, so your data is safe. If you ever want to wipe the data too, add `-v`:

```bash
docker compose down -v
```

> ⚠️ `docker compose down -v` deletes the volume and everything in it. Use it only when you truly want a clean slate.

---

## A note on `depends_on`

`depends_on` makes the app **start** after the database container starts, but it does not wait for Postgres to be fully **ready** to accept connections. For our test that's fine, because by the time you run `curl`, the database is ready. In production, you'd add a **healthcheck** so the app waits for a genuinely ready database. That's a topic for later.

---

## ✅ Checkpoint

You've finished this lesson if:

- `docker compose up -d --build` started both services
- `docker compose ps` shows `app` and `db` running
- `curl http://localhost:8000/photos` returned your rows
- `docker compose down` cleanly removed everything but the volume

---

## 🩹 Common hiccups

- **`docker compose` command not found**: some older setups use the hyphenated `docker-compose` instead of `docker compose`. Try that. If neither works, update Docker Desktop.
- **`/photos` errors or is empty**: your database volume predates the table. For a clean seed, run `docker compose down`, then `docker volume rm snapshot-data`, then `docker compose up -d --build` so `init.sql` runs on a fresh database.
- **"port is already allocated"**: something is using 8000. Change the app's ports line to `"8001:5000"` and visit `http://localhost:8001/photos`.
- **App can't reach the database**: check that `DB_HOST` is `db`, matching the service name exactly.

---

**Next up:** [Multi-Stage Builds](multi-stage-builds.md), where you'll make your images dramatically smaller by separating how an image is built from what actually ships.