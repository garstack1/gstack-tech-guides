# Meet GitHub Actions

Your app is on GitHub. Now let's build the machine that will watch it. **GitHub Actions** is a tool built right into GitHub that runs automated jobs whenever something happens in your repository, like a push. It is the engine that powers your conveyor belt, and you do not have to install or host anything. ⚙️

## What we will do (in very simple steps)

1. Learn the four words that describe every pipeline
2. Write your first workflow
3. Push it and watch GitHub run it for you

---

## The four words to know

Every GitHub Actions pipeline is made of the same few parts. In conveyor-belt terms:

- **Workflow**: the whole belt. You describe it in a YAML file in your repository.
- **Trigger** (written as `on`): what starts the belt, such as a push.
- **Job**: a station on the belt. Each job runs on its own fresh machine.
- **Step**: a single action at a station, usually a command to run.

The machine a job runs on is called a **runner**, and GitHub provides them for free. Every run starts on a clean one.

---

## Step 1: Create your first workflow

Workflows live in a special folder: `.github/workflows/`. GitHub looks there automatically.

In your `snapshot-app` folder, create that folder:

```bash
cd ~/snapshot-app
mkdir -p .github/workflows
```

Now create a file called `.github/workflows/ci.yml` with this content:

```yaml
name: CI

on: push

jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: Print a message
        run: echo "Hello from my first pipeline!"
```

Reading it line by line:

- `name: CI` names the workflow, shown in GitHub's Actions tab
- `on: push` is the trigger: run this every time you push
- `jobs:` lists the jobs (the stations)
- `say-hello:` is the name of our one job
- `runs-on: ubuntu-latest` asks GitHub for a fresh Ubuntu machine
- `steps:` lists what the job does
- `run: echo ...` runs a shell command

---

## Step 2: Push it

```bash
git add .
git commit -m "Add first workflow"
git push
```

---

## Step 3: Watch it run

On GitHub, open your `snapshot-app` repository and click the **Actions** tab at the top.

You will see your `CI` workflow running, or already finished with a green tick. Click into it, then into the `say-hello` job, and expand the **Print a message** step. Your message is there in the log. 🎉

You just ran your first pipeline. Every push from now on will trigger it automatically.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- You have a file at `.github/workflows/ci.yml`
- The Actions tab shows a completed run with a green tick
- You can find your "Hello from my first pipeline!" message in the log

---

## 🩹 Common hiccups

- **Nothing appears in the Actions tab**: check the file is at exactly `.github/workflows/ci.yml`. The folder names and location must be precise.
- **The run shows a red X**: open the failing step and read the log. Most early failures are YAML indentation mistakes. Use two spaces, never tabs.
- **"Actions" tab is missing or disabled**: on some repositories Actions must be enabled first, under Settings, then Actions.

---

**Next up:** [Building in the Pipeline](build-in-pipeline.md), where the pipeline stops printing messages and starts actually building your Docker image.