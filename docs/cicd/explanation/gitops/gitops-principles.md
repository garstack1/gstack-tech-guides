# GitOps Principles

## Overview

GitOps is a way of running systems where **Git is the single source of truth** for what should be deployed. Rather than pushing changes into a cluster, you describe the desired state in Git, and an agent makes reality match it.

---

## The core principles

- **Declarative**: the whole system is described as declarative files (what you want), not scripts (how to do it).
- **Versioned in Git**: those files live in Git, so the desired state is versioned, reviewable, and auditable. Git history is a complete record of every change.
- **Pulled, not pushed**: an agent inside the cluster pulls the desired state from Git, rather than an outside system pushing into the cluster.
- **Continuously reconciled**: the agent constantly compares the cluster to Git and corrects any difference, automatically.

---

## Why pull instead of push

The pull model is a deliberate choice with real benefits:

- **Security**: no external system holds credentials to change the cluster. The agent only needs to read Git.
- **Continuous**: a push happens once, at deploy time. A pulling agent runs always, so it also heals drift, not just deploys.

---

## Why teams adopt it

Because every change goes through Git, GitOps gives you review, history, and easy rollback for free: reverting a deployment is reverting a commit. Combined with continuous reconciliation, the cluster becomes predictable and self-correcting, which is what makes large systems manageable.

---

## Next

- [Reconciliation and Drift](reconciliation-and-drift.md) explains the loop that keeps everything in line.
- The [GitOps tutorials](../../tutorials/advanced/what-is-gitops.md) put these ideas into practice.