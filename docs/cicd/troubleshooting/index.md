# CI/CD Troubleshooting

When a pipeline or deployment goes wrong, this section helps you find the cause and fix it. Each page gives a **problem**, its **symptoms**, the **common causes**, and how to **investigate and resolve** it.

The most useful habit across all of them: open the failing run, find the red step, and **read the log from the bottom**.

---

## Categories

<div class="grid cards" markdown>

-   :material-cog: **Pipelines**

    Workflows that will not trigger, will not parse, or fail.

    [:octicons-arrow-right-24: Pipeline problems](pipelines/workflow-not-triggering.md)

-   :material-key: **Secrets and Permissions**

    Denied pushes and secrets that are not found.

    [:octicons-arrow-right-24: Secret problems](secrets/permission-denied.md)

-   :material-server: **Deployment**

    SSH failures and images that will not pull.

    [:octicons-arrow-right-24: Deployment problems](deployment/ssh-connection-fails.md)

-   :material-sync: **GitOps**

    Argo CD apps stuck out of sync or unable to reach the repo.

    [:octicons-arrow-right-24: GitOps problems](gitops/argocd-out-of-sync.md)

</div>