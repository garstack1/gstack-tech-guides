# Intermediate: Building Real Images

Now that you can run containers, it's time to build your own. This track turns you from a Docker user into a Docker author.

You will learn how to:

- Write a Dockerfile and build your own image
- Share images by pushing them to a registry
- Configure containers with environment variables
- Keep data alive with volumes
- Let containers talk to each other over a network

---

## Prerequisites

You should have finished the [Beginner track](../beginner/index.md), or be comfortable with:

- Running containers with `docker run`
- The difference between an image and a container
- Basic container lifecycle commands

---

## Tutorials

<div class="grid cards" markdown>

-   :material-hammer-wrench: **Build a Docker Image**

    Write your first Dockerfile and build a custom image.

    [:octicons-arrow-right-24: Start Tutorial](build-image.md)

-   :material-cloud-upload: **Tag and Push to a Registry**

    Share your image by pushing it to Docker Hub.

    [:octicons-arrow-right-24: Start Tutorial](push-to-registry.md)

-   :material-tune: **Use Environment Variables**

    Move settings out of your code and into the container's environment.

    [:octicons-arrow-right-24: Start Tutorial](environment-variables.md)

-   :material-database: **Docker Volumes in Practice**

    Store data outside a container so it survives being removed.

    [:octicons-arrow-right-24: Start Tutorial](docker-volumes.md)

-   :material-lan: **Docker Networking Basics**

    Connect containers so they can find and talk to each other.

    [:octicons-arrow-right-24: Start Tutorial](docker-networking.md)

</div>

---

When you finish, move on to the [Advanced track](../advanced/index.md), where you make your images smaller, safer, and production-ready.