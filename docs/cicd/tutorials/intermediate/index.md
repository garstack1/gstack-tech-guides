# Intermediate: Automate the Delivery

This track turns Continuous Integration into Continuous **Delivery**. Your pipeline stops at publishing an image in the beginner track. Here it goes further, deploying your app automatically, with the safety rails real teams depend on.

You will learn how to:

- Publish versioned releases from Git tags
- Store credentials safely with GitHub secrets
- Split the pipeline into chained jobs
- Deploy automatically to a real server over SSH
- Add staging, production, and a manual approval gate
- Speed pipelines up with caching
- Roll back a bad deploy in seconds

---

## Prerequisites

You should have:

- Finished the [Beginner track](../beginner/index.md)
- A GitHub repository with a working CI pipeline
- Optionally, a server with Docker, for the deployment lessons

---

## Tutorials

<div class="grid cards" markdown>

-   :material-tag: **Versioning and Releases**

    Publish versioned images when you push a tag like `v1.0.0`.

    [:octicons-arrow-right-24: Start Tutorial](versioning-releases.md)

-   :material-key: **Secrets Done Right**

    Store credentials safely, out of your code.

    [:octicons-arrow-right-24: Start Tutorial](secrets.md)

-   :material-source-branch: **Multi-Stage Pipelines**

    Split into chained jobs that run only if the last passed.

    [:octicons-arrow-right-24: Start Tutorial](multi-stage-pipelines.md)

-   :material-server: **Deploy to a Server**

    Ship the app to a real VM over SSH, automatically.

    [:octicons-arrow-right-24: Start Tutorial](deploy-to-server.md)

-   :material-check-decagram: **Environments and Gates**

    Add staging, production, and a manual approval.

    [:octicons-arrow-right-24: Start Tutorial](environments-gates.md)

-   :material-lightning-bolt: **Faster Pipelines**

    Cache dependencies to speed runs up.

    [:octicons-arrow-right-24: Start Tutorial](caching.md)

-   :material-backup-restore: **Rollbacks**

    Undo a bad deploy by returning to a previous version.

    [:octicons-arrow-right-24: Start Tutorial](rollbacks.md)

-   :material-flag-checkered: **Capstone: Full Delivery Pipeline**

    Take a change from commit to production, end to end.

    [:octicons-arrow-right-24: Start Capstone](capstone.md)

</div>

---

When you finish, move on to the [Advanced track](../advanced/index.md), where delivery becomes GitOps and targets a Kubernetes cluster.