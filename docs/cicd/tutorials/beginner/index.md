# Beginner: Automate the Build

This track sets up **Continuous Integration**: a pipeline that tests, builds, and publishes your app automatically on every commit. You build it one station at a time.

You will learn how to:

- Put your app in a repository a pipeline can watch
- Write a GitHub Actions workflow
- Build your Docker image automatically on every push
- Run tests in the pipeline, and read a failing build
- Publish the finished image with no manual login

---

## Prerequisites

You should have:

- Finished the [Docker course](../../../docker/), or be comfortable building and running images
- Basic familiarity with Git
- A free GitHub account

---

## Tutorials

<div class="grid cards" markdown>

-   :material-lightbulb-on: **Why Automate?**

    The manual pain, what CI/CD is, and getting your app onto GitHub.

    [:octicons-arrow-right-24: Start Tutorial](why-automate.md)

-   :material-cog: **Meet GitHub Actions**

    Workflows, triggers, jobs, and steps. Run your first pipeline.

    [:octicons-arrow-right-24: Start Tutorial](github-actions-intro.md)

-   :material-hammer-wrench: **Building in the Pipeline**

    Build your Docker image automatically on every push.

    [:octicons-arrow-right-24: Start Tutorial](build-in-pipeline.md)

-   :material-check-circle: **Testing in the Pipeline**

    Add tests so the pipeline checks your app actually works.

    [:octicons-arrow-right-24: Start Tutorial](test-in-pipeline.md)

-   :material-alert-circle: **Reading a Red Build**

    Break a test on purpose, read the log, and fix it calmly.

    [:octicons-arrow-right-24: Start Tutorial](reading-failures.md)

-   :material-cloud-upload: **Publishing Automatically**

    Push the finished image to a registry using built-in credentials.

    [:octicons-arrow-right-24: Start Tutorial](publish-image.md)

-   :material-flag-checkered: **Capstone: Build, Test, Push**

    Ship a real new feature through the whole pipeline.

    [:octicons-arrow-right-24: Start Capstone](capstone.md)

</div>

---

When you finish, move on to the [Intermediate track](../intermediate/index.md), where the pipeline starts deploying your app, not just publishing it.