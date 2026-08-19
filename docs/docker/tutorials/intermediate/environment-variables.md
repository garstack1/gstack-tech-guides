# Use Environment Variables

Right now your app always says the same thing, because the message is baked into the code. In this lesson you'll move that setting **out** of the code, so the same image can behave differently depending on where it runs. This is one of the most important habits in real Docker work. ⚙️

## What we will do (in very simple steps)

1. Make the app read a setting from its environment
2. Change that setting at run time, without rebuilding
3. Set a default inside the Dockerfile
4. Manage several settings with an env file

---

## Why move settings out of code?

Think of your image as a recipe. You don't want to rewrite the recipe every time you fancy a different seasoning. You want to season to taste **when you cook**. 🧂

Settings like messages, modes, and (soon) database passwords are that seasoning. They change from place to place, dev versus production, your laptop versus a server. If they're hard-coded, you'd need a different image for each place. With **environment variables**, one image serves them all.

---

## Step 1: Make the app read a setting

Open `~/my-docker-app/app.py` and update it to read a `GREETING` value from the environment:

```python
import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    greeting = os.environ.get("GREETING", "Hello")
    return {"message": f"{greeting} from my first Docker image!"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

`os.environ.get("GREETING", "Hello")` reads the environment variable `GREETING`. If it isn't set, it falls back to `"Hello"`.

Because you changed the code, you must **rebuild** the image:

```bash
cd ~/my-docker-app
docker build -t my-first-app .
```

> ⚠️ Forgetting to rebuild after a code change is the most common mistake here. If your change doesn't appear, rebuild first.

---

## Step 2: Change the setting at run time

First run it normally, with no setting passed:

```bash
docker run -d -p 8000:5000 --name myapp my-first-app
curl http://localhost:8000
```

You'll get the fallback:

```json
{"message": "Hello from my first Docker image!"}
```

Now remove it and run again, this time passing a value with `-e`:

```bash
docker rm -f myapp
docker run -d -p 8000:5000 -e GREETING="Bonjour" --name myapp my-first-app
curl http://localhost:8000
```

The message changes:

```json
{"message": "Bonjour from my first Docker image!"}
```

Same image, different behaviour, no rebuild. 🎯 That `-e GREETING="Bonjour"` is the seasoning added at serving time.

Clean up:

```bash
docker rm -f myapp
```

---

## Step 3: Set a default inside the Dockerfile

Passing `-e` every single time is tedious. You can bake a sensible default into the image with `ENV`. Add this line to your Dockerfile, just above the `CMD` line:

```dockerfile
ENV GREETING=Hi
```

So the end of your Dockerfile now reads:

```dockerfile
COPY . .
EXPOSE 5000
ENV GREETING=Hi
CMD ["python", "app.py"]
```

Rebuild and run with no `-e`:

```bash
docker build -t my-first-app .
docker run -d -p 8000:5000 --name myapp my-first-app
curl http://localhost:8000
```

Now the default is `Hi`, coming from the Dockerfile:

```json
{"message": "Hi from my first Docker image!"}
```

You can still override it at run time with `-e`. The order of priority, from weakest to strongest, is:

1. The fallback in your code (`"Hello"`)
2. The `ENV` default in the Dockerfile (`Hi`)
3. The `-e` value passed at run time (wins over everything)

Clean up again:

```bash
docker rm -f myapp
```

---

## Step 4: Use an env file for several settings

Real apps have many settings. Listing a dozen `-e` flags gets messy, so Docker can read them from a file instead.

In `~/my-docker-app`, create a file named `app.env`:

```
GREETING=Hola
```

Then point Docker at it:

```bash
docker run -d -p 8000:5000 --env-file app.env --name myapp my-first-app
curl http://localhost:8000
```

You'll see `Hola`. As your settings grow, you just add more lines to that file. Clean up:

```bash
docker rm -f myapp
```

> 🔒 A note on secrets: environment variables are perfect for ordinary settings, and they're commonly used for passwords too. Just be aware that for truly sensitive values in production, there are safer tools than plain env vars. We'll touch on that later. For now, keep any real secrets out of files you commit to Git.

---

## Where this is heading 🔜

In the next two lessons your app gains a **database**. Its location and password will be passed in as environment variables, exactly the pattern you just learned, never hard-coded. So this small lesson is the foundation for connecting real services together.

---

## ✅ Checkpoint

You've finished this lesson if:

- Your app returns the fallback message when no setting is passed
- `-e GREETING="Bonjour"` changes the message without a rebuild
- An `ENV` line in the Dockerfile sets a default of `Hi`
- `--env-file app.env` sets the message to `Hola`

---

## 🩹 Common hiccups

- **Your change doesn't show up**: you edited `app.py` but didn't rebuild. Run `docker build -t my-first-app .` again.
- **The value still looks like the old one**: an old container is still running. `docker rm -f myapp` and start fresh.
- **Env file not applied**: check you're in the folder containing `app.env`, and that the filename matches exactly.
- **Spaces around the equals sign**: in the env file, write `GREETING=Hola`, not `GREETING = Hola`. Spaces become part of the value.

---

**Next up:** [Docker Volumes in Practice](docker-volumes.md), where your app meets a database and you make sure its data survives even when the container is removed.