# Capstone: Full GitOps Loop

This is the final challenge of the whole pillar. You will send one change through the **entire** system: from a commit, through CI, into Git as new desired state, and out to a self-healing Kubernetes deployment, all automatically. 🏁

## The goal

Prove your complete GitOps pipeline works end to end, then prove it heals itself.

---

## Your task

1. Add a small feature: a `/ready` endpoint that returns `{"ready": true}`.
2. Add a **test** for it.
3. Commit and push, then cut the release `v1.5.0`.
4. Watch the full loop with no manual steps:
    - CI tests, builds, and publishes the image
    - CI updates `k8s/deployment.yaml` to `v1.5.0` and pushes it
    - Argo CD auto-syncs and deploys the new version
5. Confirm the new version is live in the cluster.
6. Then test self-healing: run `kubectl scale deployment snapshot --replicas=6` and watch Argo CD revert it to the count in Git.

You should not need to change any pipeline or Argo CD settings. Everything you built already does this.

---

## Hints

- The route goes in `app.py`; the test in `test_app.py`.
- The **tag** drives the whole thing. A plain push only tests and builds.
- Watch it in three places: the Actions tab, your Git history, and the Argo CD dashboard.

??? note "Reference solution"

    Add to `app.py`:

    ```python
    @app.route("/ready")
    def ready():
        return {"ready": True}
    ```

    Add to `test_app.py`:

    ```python
    def test_ready_endpoint():
        client = app.test_client()
        response = client.get("/ready")
        assert response.status_code == 200
        assert response.get_json() == {"ready": True}
    ```

    Release it:

    ```bash
    git add .
    git commit -m "Add ready endpoint"
    git push
    git tag v1.5.0
    git push origin v1.5.0
    ```

    Then watch CI, the manifest commit, and Argo CD deploy `v1.5.0` on their own.

---

## ✅ Success criteria

You have completed the Advanced track if:

- Releasing `v1.5.0` ran the full pipeline with no manual steps
- CI updated the manifest, and Argo CD deployed the new image
- The `/ready` endpoint is live in the cluster
- Scaling the deployment by hand was reverted by self-healing

---

## 🎓 What you've built

Step back and look at the machine you have assembled. A single `git push` of a tag now:

1. Runs your tests
2. Builds and publishes a versioned image
3. Records the new version in Git as desired state
4. Deploys it to Kubernetes through GitOps
5. Keeps the cluster healed and matching Git, forever

That is a complete, modern, production-grade delivery system.

---

## 🏆 The full journey

You have now completed all three pillars, and they tell one story:

- **Docker**: package the app into a container
- **Kubernetes**: run it reliably at scale
- **CI/CD & GitOps**: deliver it automatically, and keep it in sync

Build it, orchestrate it, deliver it. You can take an idea from source code to a self-healing production deployment, entirely through automation. That is a genuine platform-engineering skill set. Congratulations. 🎉

If you have not taken it yet, the [Kubernetes course](../../../kubernetes/) is the piece that sits right in the middle of this story.