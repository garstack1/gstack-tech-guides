# What is CI/CD?

## Overview

CI/CD is the practice of **automating the path from source code to running software**. Instead of building, testing, and releasing by hand, a pipeline does it, consistently, on every change.

The problem it solves is the manual release process: slow, repetitive, and easy to get wrong. A forgotten test or a mistyped command can ship a broken build. Automation removes those chances for human error and makes releases routine.

---

## Continuous Integration

**Continuous Integration (CI)** means every change is automatically **built and tested** as soon as it is committed. Problems surface within minutes, while the change is small and fresh in mind, rather than days later when it is tangled with other work.

## Continuous Delivery and Deployment

**Continuous Delivery/Deployment (CD)** takes the tested result and **ships it onward**, to a server or a cluster, automatically. Where CI ends with a trusted artifact, CD gets that artifact running.

```mermaid
flowchart LR
    Commit --> Build --> Test --> Publish --> Deploy
```

---

## Why it matters

Automating this path brings three things teams rely on:

- **Speed**: changes reach users in minutes, not days.
- **Reliability**: the same steps run every time, so releases are predictable.
- **Confidence**: because every change is tested and every release is repeatable, shipping stops being scary.

CI/CD is less a single tool than a habit: keep the path from code to production automated, tested, and always ready to run.

---

## Next

- [CI vs CD](ci-vs-cd.md) untangles the terms.
- [Pipeline Anatomy](../pipelines/pipeline-anatomy.md) breaks down how a pipeline is built.