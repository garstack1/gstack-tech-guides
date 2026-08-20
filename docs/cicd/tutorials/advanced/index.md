# Advanced: GitOps to Kubernetes

This track levels delivery up to **GitOps**. Instead of pushing changes into a cluster, you make Git the single source of truth, and let Argo CD keep the cluster continuously in sync. This is where the delivery pillar meets Kubernetes.

You will learn how to:

- Explain what GitOps is and why it pulls rather than pushes
- Describe your app as Kubernetes manifests in Git
- Install and use Argo CD
- Deploy automatically from Git, and close the full commit-to-cluster loop
- Let the cluster heal itself when it drifts
- Recognise safer rollout strategies like canary and blue-green

---

## Prerequisites

You should have:

- Finished the [Intermediate track](../intermediate/index.md)
- Taken, or be comfortable with, the [Kubernetes course](../../../kubernetes/)
- A local cluster (minikube) you can run

---

## Tutorials

<div class="grid cards" markdown>

-   :material-source-repository: **What is GitOps?**

    Git as the single source of truth, and the reconciliation loop.

    [:octicons-arrow-right-24: Start Tutorial](what-is-gitops.md)

-   :material-swap-horizontal: **Push vs Pull Delivery**

    Why GitOps pulls, and why that is safer.

    [:octicons-arrow-right-24: Start Tutorial](push-vs-pull.md)

-   :material-file-document-outline: **Snapshot on Kubernetes**

    Write the manifests that describe the app as desired state.

    [:octicons-arrow-right-24: Start Tutorial](kubernetes-manifests.md)

-   :material-download-network: **Install Argo CD**

    Add the GitOps agent to your cluster.

    [:octicons-arrow-right-24: Start Tutorial](install-argocd.md)

-   :material-sync: **Your First Synced App**

    Point Argo CD at your repo and watch it deploy Snapshot.

    [:octicons-arrow-right-24: Start Tutorial](first-sync.md)

-   :material-all-inclusive: **Closing the Loop**

    A new image flows from CI all the way to the cluster automatically.

    [:octicons-arrow-right-24: Start Tutorial](closing-the-loop.md)

-   :material-heart-pulse: **Drift and Self-Healing**

    Change the cluster by hand, and watch Argo CD put it back.

    [:octicons-arrow-right-24: Start Tutorial](drift-self-healing.md)

-   :material-chart-timeline-variant: **Progressive Delivery**

    Safer rollouts with canary and blue-green.

    [:octicons-arrow-right-24: Start Tutorial](progressive-delivery.md)

-   :material-flag-checkered: **Capstone: Full GitOps Loop**

    From a commit to a self-healing deployment, end to end.

    [:octicons-arrow-right-24: Start Capstone](capstone.md)

</div>

---

When you finish, you have completed the full path: **build** with Docker, **orchestrate** with Kubernetes, and **deliver** with CI/CD and GitOps.