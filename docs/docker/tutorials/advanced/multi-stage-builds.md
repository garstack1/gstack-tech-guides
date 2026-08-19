# Multi-Stage Builds

Some images carry a lot of dead weight. They ship the tools used to **build** the app, even though those tools are useless once the app is just **running**. Multi-stage builds fix that, often shrinking an image from over a gigabyte to a few dozen megabytes. 📉

In this lesson your Snapshot app gains a small **frontend**, and it's the perfect example: a frontend needs a big toolbox to build, but only some static files and a tiny web server to run.

## What we will do (in very simple steps)

1. Create a tiny frontend
2. Build it the naive way and see how huge the image is
3. Rebuild it with a multi-stage Dockerfile
4. Compare the two sizes

---

## The idea 🧰

Imagine baking a cake. You need a messy kitchen full of bowls, mixers, and flour to **make** it. But to **serve** it, you just need the cake on a plate. You wouldn't hand someone the entire dirty kitchen.

A multi-stage build does exactly this. One stage is the messy kitchen where the app is built. A second, clean stage takes only the finished result and throws the kitchen away.

---

## Step 1: Create the frontend

Give the frontend its own folder, separate from your API:

```bash
mkdir ~/snapshot-frontend
cd ~/snapshot-frontend
```

Create `package.json`:

```json
{
  "name": "snapshot-frontend",
  "version": "1.0.0",
  "scripts": {
    "build": "vite build"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

Create `index.html`:

```html
<!doctype html>
<html>
  <head>
    <title>Snapshot</title>
  </head>
  <body>
    <h1>Snapshot Gallery</h1>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

Create a `src` folder with a file `main.js` inside it:

```bash
mkdir src
```

`src/main.js`:

```javascript
document.querySelector("#app").textContent = "Welcome to Snapshot!";
```

Don't worry about the frontend code itself. The point of this lesson is the Dockerfile, not the JavaScript.

---

## Step 2: Build it the naive way (and weigh it)

First, let's build it the obvious way, in a single stage. Create a file called `Dockerfile`:

```dockerfile
FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
```

Build it with a `naive` tag:

```bash
docker build -t snapshot-frontend:naive .
```

Now weigh it:

```bash
docker images snapshot-frontend
```

You'll see something startling, an image around **1.1 GB**. 😳 It contains all of Node, every build tool, and the whole `node_modules` folder, none of which is needed just to serve a few static files.

---

## Step 3: Rebuild it as a multi-stage build

Now replace the entire contents of your `Dockerfile` with this:

```dockerfile
# Stage 1: the messy kitchen, where we build the app
FROM node:20 AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2: the clean plate, where we only serve the result
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

Two new pieces do all the work:

- `FROM node:20 AS build` names the first stage `build`. This is the messy kitchen.
- `FROM nginx:alpine` starts a brand new, tiny stage from scratch. Nothing from the first stage carries over automatically.
- `COPY --from=build /app/dist /usr/share/nginx/html` reaches back into the `build` stage and copies **only** the finished static files into the clean image.

Everything in the build stage, Node, npm, all the tools, is thrown away. Only the built files survive. Build it with a `multi` tag:

```bash
docker build -t snapshot-frontend:multi .
```

---

## Step 4: Compare, and run the small one

Weigh both images side by side:

```bash
docker images snapshot-frontend
```

| Tag | Approx size |
|---|---|
| `naive` | ~1.1 GB |
| `multi` | ~50 MB |

Same app, roughly **twenty times smaller**. 🎯 That difference is pure build-time clutter that the multi-stage version left behind.

Now run the small one and see it works perfectly:

```bash
docker run -d -p 8080:80 --name frontend snapshot-frontend:multi
```

Visit [http://localhost:8080](http://localhost:8080) and you'll see your **Snapshot Gallery** page. Clean up when done:

```bash
docker rm -f frontend
```

---

## Why smaller images matter

A leaner image is not just tidy, it's practical:

- **Faster to pull and deploy**, especially across a slow network
- **Cheaper to store** in a registry
- **Safer**, because fewer tools inside means fewer things that can be exploited

The same technique applies to any language that has a separate build step, including compiled apps and, as you'll often see in the wild, the exact frontend pattern you just used.

---

## ✅ Checkpoint

You've finished this lesson if:

- The `naive` image built and was very large (around a gigabyte)
- The `multi` image built and was tiny (tens of megabytes)
- `docker images snapshot-frontend` shows the dramatic difference
- The `multi` image ran and served your page at port 8080

---

## 🩹 Common hiccups

- **`npm install` is slow**: that's normal on the first build. Later builds reuse cached layers.
- **"vite: not found"**: the build stage didn't run `npm install`. Check the Dockerfile matches exactly.
- **"/app/dist not found" during COPY**: the build didn't produce a `dist` folder. Make sure `RUN npm run build` is in the build stage and the stage is named `AS build`.
- **Page won't load**: confirm you ran the `:multi` image and mapped `-p 8080:80`.

---

**Next up:** [Optimize Image Size](optimize-images.md), where you'll shrink images even further with smaller base images, fewer layers, and a `.dockerignore` file.