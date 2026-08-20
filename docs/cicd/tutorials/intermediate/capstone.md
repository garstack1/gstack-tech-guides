# Capstone: Full Delivery Pipeline

You have built a complete delivery pipeline, piece by piece. This capstone takes a real change all the way from a commit to production, through every stage you built, with no step-by-step hand-holding. 💪

## The goal

Ship a new feature to production the professional way: tested, built, versioned, deployed to staging, approved, and released, all driven by a single tag.

---

## Your task

1. Add a small feature to the app: a `/version` endpoint that returns `{"version": "1.3.0"}`.
2. Add a **test** for it.
3. Commit and push, so the pipeline tests and builds on `main`.
4. Cut the release: tag `v1.3.0` and push the tag.
5. Watch the full flow: test, build, publish, deploy to staging, then **wait for approval**.
6. Approve the production deploy, and confirm the new version is live.
7. For practice, use your **Rollback** workflow to return to `v1.2.0`, then roll forward to `v1.3.0` again.

You should not need to touch the workflow files. The pipeline you built already does all of this.

---

## Hints

- The new route goes in `app.py`; the test in `test_app.py`.
- A plain push runs test and build. The **tag** is what triggers deployment.
- Production waits on the **Review deployments** button.

??? note "Reference solution"

    Add to `app.py`:

    ```python
    @app.route("/version")
    def version():
        return {"version": "1.3.0"}
    ```

    Add to `test_app.py`:

    ```python
    def test_version_endpoint():
        client = app.test_client()
        response = client.get("/version")
        assert response.status_code == 200
        assert response.get_json() == {"version": "1.3.0"}
    ```

    Push and release:

    ```bash
    git add .
    git commit -m "Add version endpoint"
    git push
    git tag v1.3.0
    git push origin v1.3.0
    ```

    Then approve the production deploy in the Actions tab.

---

## ✅ Success criteria

You have completed the intermediate track if:

- Pushing to `main` ran test and build, but did not deploy
- Pushing the `v1.3.0` tag deployed to staging automatically
- Production waited for your approval before going live
- The `/version` endpoint is live in production
- You rolled back to `v1.2.0` and forward again with the rollback workflow

---

## 🎓 What you've built

Your pipeline now delivers, not just integrates. On a release tag it:

1. Runs the tests
2. Builds and publishes a **versioned** image
3. Deploys to **staging** automatically
4. Waits for a **human approval**
5. Deploys to **production**

And if anything goes wrong, you can **roll back** to a known-good version in seconds. That is a genuine, production-grade delivery pipeline.

---

**Next up:** the [Advanced track](../advanced/index.md), where delivery levels up to **GitOps**, and your pipeline deploys to a Kubernetes cluster that keeps itself in sync with Git.