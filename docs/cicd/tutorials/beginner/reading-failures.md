# Reading a Red Build

A red pipeline is not a disaster. It is the pipeline doing its job: catching a problem before it reaches anyone. The real skill is staying calm and reading the log to find out what happened. In this lesson you will break something on purpose, watch it fail, and fix it. 🔴 to 🟢

## What we will do (in very simple steps)

1. Break a test on purpose
2. Watch the pipeline go red
3. Read the log to find the cause
4. Fix it and go green again

---

## Step 1: Break it on purpose

Open `app.py` and change the message the app returns:

```python
@app.route("/")
def home():
    return {"message": "Hello from Snapshot v2!"}
```

Your test still expects the old message, so this change will make it fail. Push it:

```bash
git add .
git commit -m "Change the greeting"
git push
```

---

## Step 2: Watch it go red

Open the **Actions** tab. This time the run finishes with a **red X**. The pipeline has stopped, and importantly, because the test failed, the build step never ran. The gate held. 🚧

---

## Step 3: Read the log

Here is the calm, repeatable method for any red build:

1. Click into the failed run.
2. Find the job with the red X and click it.
3. Find the step marked red (here it is **Run tests**) and expand it.
4. Read the error, usually near the bottom of the log.

You will see pytest report a failure like this:

```
assert {'message': 'Hello from Snapshot v2!'} == {'message': 'Hello from Snapshot!'}
```

That line tells you everything: the app returned "v2", but the test expected the original. The test caught your change, exactly as it should.

---

## Step 4: Fix it

You have a choice, and this is the real lesson. Was the change intended?

- If **yes**, the test is now out of date. Update it to match.
- If **no**, revert the app change.

Let's say the new message was intended. Update `test_app.py`:

```python
def test_home_returns_message():
    client = app.test_client()
    response = client.get("/")
    assert response.get_json() == {"message": "Hello from Snapshot v2!"}
```

Push again:

```bash
git add .
git commit -m "Update test for new greeting"
git push
```

The Actions tab goes **green**. 🎉 You read a failure, understood it, and fixed it.

---

## The takeaway

A red build is a message, not a defeat. The method is always the same: open the run, find the red step, read the log near the bottom, fix the cause. Tests exist precisely to catch changes like this before they ship.

---

## ✅ Checkpoint

You are ready for the next lesson if:

- You made a change that turned the pipeline red
- You found the failing assertion in the log
- You fixed it and the pipeline went green again

---

## 🩹 Common hiccups

- **The build ran anyway**: it should not have. Check that the `Run tests` step comes before the build step, so a failure stops the job.
- **Cannot find the error in the log**: scroll to the bottom of the failing step. The most useful line is usually last.
- **Still red after the fix**: make sure you pushed the fix, and that you are looking at the newest run, not the old one.

---

**Next up:** [Publishing Automatically](publish-image.md), where a green pipeline pushes your finished image to a registry with no manual login.