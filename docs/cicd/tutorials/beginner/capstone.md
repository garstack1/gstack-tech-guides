# Capstone: Build, Test, Push

You have built a complete Continuous Integration pipeline, one station at a time. This capstone proves it works end to end by shipping a **real new feature** through it, with no step-by-step hand-holding this time. You know how to do each piece now. 💪

## The goal

Add a new feature to the Snapshot app, cover it with a test, and push. Your pipeline should test it, build the image, and publish it, all green, all on its own.

---

## Your task

1. Add a **health check** endpoint at `/health` that returns `{"status": "ok"}`.
2. Add a **test** that confirms `/health` responds correctly.
3. Commit and push, then watch the pipeline run the whole belt: test, build, publish.

You should not need to change the workflow at all. The pipeline you built already does everything. That is the point.

---

## Hints

- The new route goes in `app.py`, alongside the existing one.
- The new test goes in `test_app.py`, using the same `app.test_client()` pattern.
- After pushing, watch the **Actions** tab, then check **Packages** for the updated image.

Give it a real try before opening the solution below.

---

??? note "Reference solution"

    Add to `app.py`:

    ```python
    @app.route("/health")
    def health():
        return {"status": "ok"}
    ```

    Add to `test_app.py`:

    ```python
    def test_health_returns_ok():
        client = app.test_client()
        response = client.get("/health")
        assert response.status_code == 200
        assert response.get_json() == {"status": "ok"}
    ```

    Then push:

    ```bash
    git add .
    git commit -m "Add health check endpoint"
    git push
    ```

    The pipeline runs `3 passed`, builds, and publishes the updated image.

---

## ✅ Success criteria

You have completed the beginner track if:

- The app has a working `/health` endpoint
- A new test covers it, and the pipeline reports `3 passed`
- The build and publish steps run only after the tests pass
- The updated image appears under **Packages**

---

## 🎓 What you've built

Look at what your pipeline now does, entirely on its own, every time you push:

1. Runs your tests
2. Stops immediately if any test fails
3. Builds the Docker image
4. Publishes it to the registry

That is real Continuous Integration. You never build, test, or publish by hand again.

---

**Next up:** the [Intermediate track](../intermediate/index.md), where the pipeline stops just publishing images and starts **deploying** them, automatically, to a real server.