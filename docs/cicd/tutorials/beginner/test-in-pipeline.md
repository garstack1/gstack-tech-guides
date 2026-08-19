# Testing in the Pipeline

A build that succeeds only proves the image *assembles*. It says nothing about whether your app actually *works*. This lesson adds **automated tests**, so every push checks the app behaves correctly, and blocks the build if it does not. ✅

## What we will do (in very simple steps)

1. Write a couple of small tests for the Snapshot API
2. Add a test station to the pipeline
3. Watch the pipeline run your tests on every push

---

## Why test in the pipeline?

You could run tests by hand, but you would forget, or skip them when rushing. Running them in the pipeline means they happen **every single time**, automatically, before anything ships. A broken app turns the pipeline red the moment it is pushed, so problems are caught in minutes, not in production.

---

## Step 1: Write the tests

In your `snapshot-app` folder, create a file called `test_app.py`:

```python
from app import app

def test_home_returns_ok():
    client = app.test_client()
    response = client.get("/")
    assert response.status_code == 200

def test_home_returns_message():
    client = app.test_client()
    response = client.get("/")
    assert response.get_json() == {"message": "Hello from Snapshot!"}
```

These use Flask's built-in **test client**, which calls your app without needing a running server. The first test checks the home route responds successfully. The second checks it returns the exact message you expect.

`pytest` automatically finds any file named `test_*.py` and runs every function starting with `test_`.

---

## Step 2: Add a test station to the pipeline

Open `.github/workflows/ci.yml` and replace its contents with this:

```yaml
name: CI

on: push

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install dependencies
        run: pip install -r requirements.txt pytest

      - name: Run tests
        run: pytest

      - name: Build the image
        run: docker build -t snapshot-app .
```

Notice the order: the tests run **before** the build. Steps run top to bottom, and if any step fails, the rest are skipped. So a failing test stops the build from happening at all. Tests now guard the gate.

---

## Step 3: Push and watch

```bash
git add .
git commit -m "Add tests to the pipeline"
git push
```

In the **Actions** tab, open the run and expand the **Run tests** step. You will see pytest report `2 passed`. The belt now tests, then builds. 🎉

---

## ✅ Checkpoint

You are ready for the next lesson if:

- You have a `test_app.py` file with two tests
- The pipeline runs `pytest` before the build
- The Actions log shows `2 passed`

---

## 🩹 Common hiccups

- **"No module named app"**: pytest runs from the repository root, where `app.py` lives. Make sure `test_app.py` is in the same folder as `app.py`.
- **"pytest: command not found"**: the install step must include `pytest`. Check the `Install dependencies` line.
- **Tests fail unexpectedly**: read the pytest output. It shows exactly which assertion failed and what it expected versus what it got.

---

**Next up:** [Reading a Red Build](reading-failures.md), where you break a test on purpose and learn to read a failing pipeline calmly.