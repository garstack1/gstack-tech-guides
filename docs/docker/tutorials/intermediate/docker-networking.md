# Docker Networking Basics

You have a web app. You have a database. In this final lesson of the Intermediate track, you'll make them **talk to each other**, turning two separate containers into one working system. 🔌

This is where everything you've learned so far clicks together: the image you built, the environment variables for configuration, and the database with its volume.

## What we will do (in very simple steps)

1. Create a network for your containers to share
2. Run the database on that network
3. Update the app to read from the database
4. Run the app on the same network and see them connect
5. Break the connection on purpose, to understand how it works

---

## Why containers need a network

By default, two containers can't easily find each other. They're like guests at a party who don't know each other's names.

When you put containers on the same **user-defined network**, Docker gives them a phone book. Each container can reach another simply by using its **name**. No IP addresses to hunt down. That name lookup is the key idea of this whole lesson. 📖

---

## Step 1: Create a network

```bash
docker network create snapshot-net
```

That's it. You now have a private network called `snapshot-net` for your app and database to share.

---

## Step 2: Run the database on the network

Start Postgres, this time attached to the network with `--network`:

```bash
docker run -d --name snapshot-db --network snapshot-net -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=snapshot -v snapshot-data:/var/lib/postgresql/data postgres:16
```

Notice there's no `-p` port mapping this time. The database doesn't need to be reachable from your computer, only from the app. Keeping it off the host is tidier and safer. 🔒

Give it a few seconds, then create the table and add some data (the `IF NOT EXISTS` makes this safe to run even if you still have the table from the last lesson):

```bash
docker exec -it snapshot-db psql -U postgres -d snapshot -c "CREATE TABLE IF NOT EXISTS photos (id serial PRIMARY KEY, title text);"
```

```bash
docker exec -it snapshot-db psql -U postgres -d snapshot -c "INSERT INTO photos (title) VALUES ('sunset'), ('mountain');"
```

---

## Step 3: Update the app to read from the database

Open `~/my-docker-app/requirements.txt` and add the Postgres driver:

```
flask
psycopg2-binary
```

Now update `app.py` to connect to the database and add a new `/photos` route:

```python
import os
import psycopg2
from flask import Flask

app = Flask(__name__)

def get_db_connection():
    return psycopg2.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        dbname=os.environ.get("DB_NAME", "snapshot"),
        user=os.environ.get("DB_USER", "postgres"),
        password=os.environ.get("DB_PASSWORD", "secret"),
    )

@app.route("/")
def home():
    greeting = os.environ.get("GREETING", "Hello")
    return {"message": f"{greeting} from my first Docker image!"}

@app.route("/photos")
def photos():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, title FROM photos ORDER BY id;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return {"photos": [{"id": row[0], "title": row[1]} for row in rows]}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

The important part is `host=os.environ.get("DB_HOST", ...)`. The app doesn't hard-code where the database is. It reads that from an environment variable, just like you practised earlier. We'll set `DB_HOST` to the database's container name in a moment.

Rebuild the image, since the code and dependencies changed:

```bash
cd ~/my-docker-app
docker build -t my-first-app .
```

---

## Step 4: Run the app on the same network

Now start the app, on the **same network**, and tell it where the database is:

```bash
docker run -d --name snapshot-app --network snapshot-net -p 8000:5000 -e DB_HOST=snapshot-db my-first-app
```

The magic is `-e DB_HOST=snapshot-db`. The app will try to connect to a host called `snapshot-db`, and because both containers share `snapshot-net`, Docker's phone book resolves that name straight to your database container. (The other database settings default to values that match how we ran Postgres, so we only need to pass the host.)

Test the new route:

```bash
curl http://localhost:8000/photos
```

You should see your data, served by the app, fetched live from the database:

```json
{"photos": [{"id": 1, "title": "sunset"}, {"id": 2, "title": "mountain"}]}
```

Two containers, one working system. 🎉 The app didn't need to know the database's address, only its name.

---

## Step 5: Break it on purpose

Let's prove the name only works on the shared network. Remove the app and run it again **without** `--network`:

```bash
docker rm -f snapshot-app
docker run -d --name snapshot-app -p 8000:5000 -e DB_HOST=snapshot-db my-first-app
```

Now try the route again:

```bash
curl http://localhost:8000/photos
```

This time you'll get an **Internal Server Error**. Off the shared network, the name `snapshot-db` means nothing to the app, so the connection fails. 🚫

This is exactly why the network matters. Fix it by putting the app back on `snapshot-net`:

```bash
docker rm -f snapshot-app
docker run -d --name snapshot-app --network snapshot-net -p 8000:5000 -e DB_HOST=snapshot-db my-first-app
```

`curl http://localhost:8000/photos` works again. ✅

---

## Clean up

```bash
docker rm -f snapshot-app snapshot-db
docker network rm snapshot-net
```

(Your `snapshot-data` volume stays, with your data safe inside it, until you remove it deliberately.)

---

## Networking commands recap

| Command | What it does |
|---|---|
| `docker network create NAME` | Create a user-defined network |
| `docker network ls` | List networks |
| `docker network inspect NAME` | See which containers are attached |
| `--network NAME` (on `docker run`) | Attach a container to a network |

The one rule to remember: **containers on the same user-defined network can reach each other by name.**

---

## ✅ Checkpoint

You've completed the Intermediate track if:

- You created `snapshot-net` and ran both containers on it
- `curl http://localhost:8000/photos` returned your rows from the database
- Running the app off the network caused it to fail
- Putting it back on the network fixed it

---

## 🩹 Common hiccups

- **Internal Server Error even on the network**: the database may still be starting, or the table doesn't exist. Check `docker logs snapshot-db`, and re-run the `CREATE TABLE` and `INSERT` commands from Step 2.
- **"could not translate host name"**: the app and database aren't on the same network, or `DB_HOST` doesn't match the database's `--name`. Both must line up.
- **Old code still running**: you edited `app.py` but didn't rebuild. Run `docker build -t my-first-app .` again.
- **Port 8000 in use**: use a different host port, e.g. `-p 8001:5000`.

---

## 🏁 Track complete

You've gone from running other people's containers to building your own image, sharing it, configuring it, giving it a database with lasting storage, and connecting the pieces into a real system. That's a genuine, working multi-container application.

**Next up:** the [Advanced track](../advanced/index.md). It opens with a fair question: running all these `docker run` commands by hand is tedious. **Docker Compose** will let you describe this entire setup in a single file and start it with one command.