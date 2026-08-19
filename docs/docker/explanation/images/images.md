# What is a Docker Image?

## Overview

An **image** is a read-only template that contains an application together with everything it needs to run: the code, the runtime, the libraries, and the settings. Containers are created from images. If a container is a running meal, the image is the sealed meal kit it came from.

---

## What is inside an image

An image holds two things:

- **A filesystem**, built as a stack of read-only layers. This is everything the application sees as its files.
- **Metadata**, a set of instructions bundled with it: which command to run on start, which environment variables to set, which port the app uses, and so on.

When you run an image, the daemon reads that metadata to know how to start the container.

---

## Tags and identity

An image is named as a **repository** and a **tag**, for example `nginx:1.27`. The tag is usually a version.

- If you leave the tag off, Docker assumes `latest`. This is a **moving label**, not a fixed version, so `latest` today and `latest` next month can be different images.
- Beneath the friendly name, every image has an immutable **digest**, a long `sha256` fingerprint. Two images with the same digest are guaranteed byte-for-byte identical. Pinning a digest is how production systems guarantee they run the exact image they tested.

---

## Images are immutable

Once built, an image never changes. There is no way to edit an image in place. To "change" one, you build a **new** image, which gets its own digest. This immutability is what makes images reproducible: the same image runs the same way everywhere, forever.

---

## Next

- [Image Layers](image-layers.md) explains how that layered filesystem is structured.
- [Image Caching](image-caching.md) explains why builds are fast the second time.