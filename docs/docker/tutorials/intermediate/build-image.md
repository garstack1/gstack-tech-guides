# Build a Docker Image (Your First Dockerfile)

Welcome to the Intermediate track! 🎉

So far you've cooked from meal kits that other people packed (nginx, hello-world). In this lesson you'll write your own recipe and pack your own kit. That recipe is called a **Dockerfile**, and the kit it produces is your very own **image**. 🔨

This is also where we meet the small app we'll keep building on for the rest of the track.

## What we will do (in very simple steps)

1. Create a tiny web app
2. Write a Dockerfile (the recipe for your image)
3. Build the image from it
4. Run your image and see your own app in the browser

---

## Meet the app

We'll containerize a tiny Python web app. It does one thing: reply with a friendly message when you visit it. It's intentionally small so we can focus on Docker, not on Python. As the track goes on, this same app will grow a database and talk to other containers.

We only need two small files, which we'll create in the next step.

---

## Step 1: Create the project folder and app files

This app is separate from your tutorials website, so give it its own folder. In your terminal:

```bash
mkdir ~/my-docker-app
cd ~/my-docker-app
```

Create a file called `app.py` with this content:

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return {"message": "Hello from my first Docker image!"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

One detail that matters: `host="0.0.0.0"` tells the app to listen on all addresses inside the container. If you leave it as the default, Docker's port mapping can't reach it and the page won't load.

Now create a second file called `requirements.txt` listing what the app needs:

```
flask
```

That's the whole app: one file of code, one file listing its single dependency.

---

## Step 2: Write the Dockerfile

In the same folder, create a file named exactly `Dockerfile` (no extension) with this content:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

Here's what each line does, in plain English:

- `FROM python:3.12-slim` starts from an official image that already has Python installed. It's the pre-packed base of your meal kit, so you don't start from an empty box.
- `WORKDIR /app` sets the working folder inside the image. Everything after this happens in `/app`.
- `COPY requirements.txt .` copies just the requirements file in first.
- `RUN pip install --no-cache-dir -r requirements.txt` installs Flask inside the image.
- `COPY . .` copies the rest of your app (your `app.py`) into the image.
- `EXPOSE 5000` documents that the app uses port 5000. This is a label for humans, it does not publish the port by itself.
- `CMD ["python", "app.py"]` is the command that runs when a container starts from this image.

> 💡 Why copy `requirements.txt` before the rest of the code? Docker caches each step. By installing dependencies before copying your code, Docker can reuse the cached install whenever you change only your code, making rebuilds much faster. More on this in the Optimize Image Size lesson.

---

## Step 3: Build the image

Make sure you're in the `~/my-docker-app` folder, then run:

```bash
docker build -t my-first-app .
```

Two new pieces here:

- `-t my-first-app` gives your image a name (a "tag")
- the `.` at the end is the **build context**: it tells Docker to use the current folder, where your Dockerfile and app files live

You'll watch Docker work through your Dockerfile line by line. When it finishes, confirm your image exists:

```bash
docker images
```

You should see `my-first-app` in the list, right alongside the official images you pulled earlier. You just built that one. 🏗️

---

## Step 4: Run your image

Start a container from your brand new image:

```bash
docker run -d -p 8000:5000 --name myapp my-first-app
```

You've seen most of this before. Note the port mapping `8000:5000`: your app listens on 5000 inside the container, and we're connecting it to port 8000 on your computer.

Now visit [http://localhost:8000](http://localhost:8000) in your browser, or run:

```bash
curl http://localhost:8000
```

You should see your message:

```json
{"message": "Hello from my first Docker image!"}
```

That response is coming from code **you** wrote, running inside an image **you** built. 🎉

---

## Step 5: Clean up

```bash
docker rm -f myapp
```

Your image stays on your machine (remember, removing a container never removes the image), so you can run it again any time.

---

## ✅ Checkpoint

You've finished this lesson if:

- `docker build -t my-first-app .` completed without errors
- `docker images` lists `my-first-app`
- Visiting **http://localhost:8000** showed your JSON message
- `docker rm -f myapp` removed the container

---

## 🩹 Common hiccups

- **"failed to read dockerfile" or "no such file"**: you're not in the `~/my-docker-app` folder, or the file isn't named exactly `Dockerfile`. Run `ls` and check.
- **Page won't load, but the container is running**: you likely missed `host="0.0.0.0"` in `app.py`. Fix it, rebuild with `docker build -t my-first-app .`, and run again.
- **"port is already allocated"**: something is using port 8000. Use a different host port, e.g. `-p 8001:5000`, and visit `http://localhost:8001`.
- **Build is slow every time**: that's expected on the first build. Later builds reuse cached layers and are much faster, as long as you don't change `requirements.txt`.

---

**Next up:** [Tag and Push to a Registry](push-to-registry.md), where you'll share the image you just built so others (and other machines) can pull and run it.