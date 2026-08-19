# Advanced: Production-Ready Docker

You can build and connect images. This track is about doing it *well*: smaller images, cleaner builds, and the skills to fix things when they break.

You will learn how to:

- Use multi-stage builds to produce lean images
- Shrink image size and understand what drives it
- Run a multi-service application with Docker Compose
- Debug containers that misbehave

---

## Prerequisites

You should have finished the [Intermediate track](../intermediate/index.md), or be comfortable with:

- Writing a Dockerfile and building images
- Using volumes and networks
- Configuring containers with environment variables

---

## Tutorials

<div class="grid cards" markdown>

-   :material-layers-triple: **Multi-Stage Builds**

    Build in one stage, ship from a clean one, and drop the extra weight.

    [:octicons-arrow-right-24: Start Tutorial](multi-stage-builds.md)

-   :material-arrow-collapse: **Optimize Image Size**

    See what makes images large and how to make them small.

    [:octicons-arrow-right-24: Start Tutorial](optimize-images.md)

-   :material-view-grid-plus: **Docker Compose Multi-Service App**

    Run a whole stack of containers with a single command.

    [:octicons-arrow-right-24: Start Tutorial](docker-compose-app.md)

-   :material-bug: **Debugging Containers**

    Read logs, inspect containers, and track down common failures.

    [:octicons-arrow-right-24: Start Tutorial](debugging-containers.md)

</div>

---

When you finish, you're ready for the [End-to-End tutorials](../end-to-end/deploy-web-app.md), and for the Kubernetes course, where these containers get orchestrated at scale.