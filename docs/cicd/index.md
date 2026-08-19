# 🚀 CI/CD & GitOps

In the **Docker** course you learned to package an application. In **Kubernetes**, to run it reliably at scale. This course closes the loop: getting your code from a commit all the way into a running deployment, **automatically**.

That completes the story: **build** it (Docker), **orchestrate** it (Kubernetes), **deliver** it (here).

---

## Why this matters

Right now, shipping a change is a manual chore. You build the image by hand, push it by hand, and deploy it by hand. It is slow, repetitive, and easy to get wrong at 5 p.m. on a Friday.

**CI/CD** automates all of it. Every commit can be built, tested, and shipped with no manual steps, reliably, every time.

---

## What you'll build

Across this course you build a complete **delivery pipeline** for the Snapshot app, the same application from the Docker course. Think of it as a conveyor belt: code goes in one end, and a running app comes out the other. 🏭

<div class="grid cards" markdown>

-   :material-cog-play: **Beginner: Automate the Build**

    Set up Continuous Integration. Every commit gets built, tested, and published automatically.

    [:octicons-arrow-right-24: Start here](tutorials/beginner/index.md)

-   :material-rocket-launch: **Intermediate: Automate the Delivery**

    Set up Continuous Delivery. Tagged releases deploy themselves to a server, with approvals and rollbacks.

    [:octicons-arrow-right-24: Continue](tutorials/intermediate/index.md)

-   :material-sync: **Advanced: GitOps to Kubernetes**

    Use Git as the source of truth, and let Argo CD keep your cluster in sync automatically.

    [:octicons-arrow-right-24: Go deeper](tutorials/advanced/index.md)

</div>

---

## One app, all the way through

The pipeline is built around **Snapshot**, the app you already know. Here it stops being something you deploy by hand and becomes something that deploys itself, first to a server, then to a Kubernetes cluster.

---

## Prerequisites

- The [Docker course](../docker/) (required)
- Basic Git
- The [Kubernetes course](../kubernetes/) (needed only for the Advanced GitOps section)

---

## Where to start

[:octicons-arrow-right-24: Why Automate?](tutorials/beginner/why-automate.md) begins the course by turning the manual pain into an automated pipeline.