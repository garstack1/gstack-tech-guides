# Volumes vs Bind Mounts

## Overview

By default, everything a container writes goes into its **writable layer**, which is destroyed when the container is removed. To keep data, or to share files with the host, Docker offers storage that lives **outside** the container. There are a few kinds, and choosing the right one matters.

---

## The options

- **Writable layer** (the default): temporary, private to one container, and gone the moment that container is removed. Fine for scratch work, useless for anything you need to keep.
- **Named volume**: storage that Docker creates and manages for you. You refer to it by name and let Docker decide where it physically sits. This is the right choice for data your application produces.
- **Bind mount**: maps a specific folder on **your host machine** into the container. You control exactly where it lives. Ideal when you want to edit files on your machine and have the container see the changes.
- **tmpfs**: stored only in memory, never written to disk, and gone when the container stops. Useful for sensitive or purely temporary data.

---

## Volumes vs bind mounts

The two you will reach for most are volumes and bind mounts. They solve different problems:

| | Named volume | Bind mount |
|---|---|---|
| Managed by | Docker | You |
| Location | Docker decides | A path you choose on the host |
| Best for | Data the app owns (databases, uploads) | Files you actively edit (source code) |
| Portable | Yes | Tied to a host path |

The rule of thumb from the volumes lesson holds: **volumes for data your app produces, bind mounts for files you are actively editing.**

---

## Next

- [Data Persistence](data-persistence.md) explains the idea behind keeping data safe.
- [Image Layers](../images/image-layers.md) explains the writable layer these options replace.