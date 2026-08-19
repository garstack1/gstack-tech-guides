# Docker Troubleshooting

When something goes wrong, this section helps you find the cause and fix it. Each page describes a **problem**, its **symptoms**, the **common causes**, and how to **investigate and resolve** it.

The single most useful habit across all of them: when in doubt, **read the logs** with `docker logs`.

---

## Categories

<div class="grid cards" markdown>

-   :material-cube-outline: **Containers**

    Containers that crash or exit as soon as they start.

    [:octicons-arrow-right-24: Container problems](containers/container-crashing.md)

-   :material-layers: **Images**

    Errors pulling images or building them.

    [:octicons-arrow-right-24: Image problems](images/image-pull-errors.md)

-   :material-lan: **Networking**

    Port clashes and containers that cannot reach each other.

    [:octicons-arrow-right-24: Networking problems](networking/port-in-use.md)

-   :material-bug: **General Debugging**

    Techniques that apply to any problem: logs and inspection.

    [:octicons-arrow-right-24: Debugging techniques](general-debugging/debugging-logs.md)

</div>