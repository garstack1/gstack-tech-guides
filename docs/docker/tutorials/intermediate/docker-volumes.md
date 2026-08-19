# Docker Volumes in Practice

Back in the beginner track, you made a change inside a container, removed the container, and watched your change disappear. That's fine for a web server, but imagine it was a database full of orders or photos. Losing everything on each restart would be a disaster. 😰

This lesson fixes that for good. Your app is getting a real **database**, and you'll make sure its data lives on no matter what happens to the container.

## What we will do (in very simple steps)

1. Understand why a database needs storage that outlives its container
2. Run a Postgres database with a **volume**
3. Add some data
4. Destroy the container and prove the data survived
5. Learn to manage volumes safely

---

## The problem, one more time

A container's own scratch space is thrown in the bin the moment the container is removed. A database keeps all its files in that space by default, so removing the database container would wipe every row. 🗑️

We need a place to keep data that is **not** tied to any single container.

## Meet volumes 🧊

A **volume** is storage that Docker manages for you, living **outside** any container. Containers come and go, but the volume stays.

In kitchen terms: the container is disposable cookware you throw away after the meal. The volume is your **fridge**. Bin the pots and pans all you like, the food in the fridge is untouched.

---

## Step 1: Run a database with a volume

We'll run **Postgres**, a popular database, and attach a volume to it. Run this as a single command:

```bash
docker run -d --name snapshot-db -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=snapshot -v snapshot-data:/var/lib/postgresql/data postgres:16
```

Let's unpack the new parts (notice the `-e` flags are the environment variables you learned last lesson, doing real work now):

- `-e POSTGRES_PASSWORD=secret` sets the database password
- `-e POSTGRES_DB=snapshot` creates a database called `snapshot`
- `-v snapshot-data:/var/lib/postgresql/data` is the important bit. It attaches a volume named `snapshot-data` to the exact folder where Postgres keeps its files. Anything the database writes goes into the volume, not the container's scratch space.

Give it a few seconds to start up. You can watch it become ready with:

```bash
docker logs snapshot-db
```

When you see a line mentioning "database system is ready to accept connections", you're good. ✅

---

## Step 2: Add some data

Let's create a table and add two rows. Run these one at a time:

```bash
docker exec -it snapshot-db psql -U postgres -d snapshot -c "CREATE TABLE photos (id serial PRIMARY KEY, title text);"
```

```bash
docker exec -it snapshot-db psql -U postgres -d snapshot -c "INSERT INTO photos (title) VALUES ('sunset'), ('mountain');"
```

`docker exec` runs a command inside the running database container, and `psql` is Postgres's built-in command line. Now read the data back:

```bash
docker exec -it snapshot-db psql -U postgres -d snapshot -c "SELECT * FROM photos;"
```

You should see your two rows:

```
 id |  title
----+----------
  1 | sunset
  2 | mountain
(2 rows)
```

---

## Step 3: Destroy the container and prove the data survived

This is the moment of truth. Completely remove the database container:

```bash
docker rm -f snapshot-db
```

It's gone. Now start a brand new database container, attaching the **same volume**:

```bash
docker run -d --name snapshot-db -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=snapshot -v snapshot-data:/var/lib/postgresql/data postgres:16
```

Wait a few seconds, then read the data again:

```bash
docker exec -it snapshot-db psql -U postgres -d snapshot -c "SELECT * FROM photos;"
```

Your `sunset` and `mountain` rows are **still there**. 🎉

The container was destroyed and recreated, but the data lived safely in the `snapshot-data` volume the whole time. That's the fridge surviving while the cookware got thrown out. If you had run Postgres *without* the `-v` flag, those rows would be gone right now.

---

## Step 4: Manage your volumes

See all your volumes:

```bash
docker volume ls
```

`snapshot-data` will be in the list. To see details, including where Docker stores it:

```bash
docker volume inspect snapshot-data
```

There is exactly **one** way to lose this data: deleting the volume itself. A volume can only be removed once no container is using it:

```bash
docker rm -f snapshot-db
docker volume rm snapshot-data
```

> ⚠️ Removing a volume permanently deletes its data. This is the one action that actually throws away what's in the fridge, so be sure before you run it.

---

## Volumes vs bind mounts

You'll see two ways to attach storage, and it helps to know the difference:

- A **named volume** (what you just used, `snapshot-data:/path`) is managed by Docker. You don't care where it physically sits. This is the right choice for databases.
- A **bind mount** maps a specific folder on **your computer** into the container, for example `./photos:/app/photos`. You control exactly where it lives on your host. This is ideal during development, when you want to edit files on your machine and have the container see the changes instantly.

Rule of thumb: **volumes for data your app produces (like a database), bind mounts for files you're actively editing (like source code).** You'll use a bind mount for live development in a later lesson.

---

## ✅ Checkpoint

You've finished this lesson if:

- You started Postgres with a `-v snapshot-data:/var/lib/postgresql/data` volume
- You created a `photos` table and added two rows
- You removed the container, recreated it with the same volume, and the rows were still there
- You can explain, in one sentence, why a database needs a volume

---

## 🩹 Common hiccups

- **`psql` says "the database system is starting up" or the connection is refused**: Postgres needs a few seconds after starting. Wait, check `docker logs snapshot-db`, and try again.
- **`psql` asks for a password**: enter the one you set, `secret`.
- **"volume is in use" when removing it**: a container is still attached. Run `docker rm -f snapshot-db` first, then remove the volume.
- **Data was NOT there after recreating**: check you used the exact same volume name (`snapshot-data`) in both `docker run` commands. A typo makes a brand new, empty volume.

---

**Next up:** [Docker Networking Basics](docker-networking.md), where you finally connect your web app to this database so they can talk to each other.