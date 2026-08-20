# CI vs CD

## Overview

The terms CI and CD are used together so often they blur into one. But they name different stages, and "CD" itself has two meanings worth separating.

---

## Continuous Integration

**Continuous Integration** is about the **code coming together**. Developers merge their changes frequently, and each change is automatically built and tested. The goal is to catch integration problems early and keep the main branch always in a working, tested state.

CI ends with a trusted, tested artifact, such as a built image.

---

## Continuous Delivery

**Continuous Delivery** extends CI so the artifact is **always ready to release**. The pipeline can deploy at any moment, but the final push to production is a **deliberate choice**, often a button press or an approval.

This is the model used in the intermediate track: a release deploys to staging automatically, then waits for a human to approve production.

---

## Continuous Deployment

**Continuous Deployment** goes one step further: every change that passes the pipeline is released to production **automatically**, with no manual gate at all.

---

## The distinction at a glance

| Stage | What it automates | Reaches production |
|---|---|---|
| Continuous Integration | Build and test | No |
| Continuous Delivery | Build, test, and ready to release | With manual approval |
| Continuous Deployment | Build, test, and release | Automatically |

Most teams practise continuous **delivery**, keeping a human approval before production. Continuous **deployment** suits teams with strong testing and a high tolerance for automated releases.

---

## Next

- [What is CI/CD?](what-is-cicd.md) for the bigger picture.
- [Triggers and Events](../pipelines/triggers-and-events.md) for what starts a pipeline.