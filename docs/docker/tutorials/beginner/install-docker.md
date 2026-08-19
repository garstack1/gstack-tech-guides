# Get Docker Installed (Your Container Engine)

Welcome to your very first hands-on Docker step! Before we can build or run anything, we need Docker itself on your computer.

Think of Docker as a **kitchen appliance for software**. Once it's installed and switched on, you can take any packaged "meal" (called an **image**) and heat it up into a running program (called a **container**) - and it will work the same on your machine as on anyone else's. 🍱

Right now we're just installing the appliance. We'll start cooking with it in the very next lesson.

This guide covers **Windows 🪟, Mac 🍎, and Linux 🐧**. Just pick your tab at each step.

## What we will do (in very simple steps)

1. Install Docker for your operating system
2. Start it up and check it's running
3. Prove it works with one tiny command

There are no container concepts to learn today - this lesson is only about getting the appliance plugged in. 🔌

---

## Step 1: Install Docker

=== "🪟 Windows"

    The easiest way on Windows is **Docker Desktop**, which runs Docker using WSL 2 behind the scenes (the same WSL you're already using).

    1. Download Docker Desktop from the official site: [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
    2. Run the installer. When prompted, keep **"Use WSL 2 instead of Hyper-V"** ticked.
    3. If it asks you to restart your computer, go ahead and restart.

=== "🍎 Mac"

    On Mac, use **Docker Desktop**.

    1. Download it from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
    2. Pick the right chip: **Apple Silicon** (M1/M2/M3) or **Intel**. Not sure which you have? Click the Apple menu  → **About This Mac** and look at the "Chip" line.
    3. Open the downloaded `.dmg` file and drag the Docker whale 🐳 into your Applications folder.

=== "🐧 Linux"

    On Ubuntu/Debian, we install **Docker Engine** directly. Run these two commands in your terminal:

    ```bash
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    ```

    Then let your user run Docker without typing `sudo` every time:

    ```bash
    sudo usermod -aG docker $USER
    ```

    Log out and back in (or just close and reopen your terminal) for that last change to take effect.

---

## Step 2: Start Docker and check it's running

=== "🪟 Windows"

    Open **Docker Desktop** from the Start menu. Wait for the whale icon 🐳 in your system tray (bottom-right of the screen) to stop animating - that means the engine is ready.

    Then, in your WSL terminal, check the version:

    ```bash
    docker --version
    ```

=== "🍎 Mac"

    Open **Docker Desktop** from Applications. Wait for the whale icon 🐳 in your menu bar (top-right) to go steady.

    Then, in your terminal:

    ```bash
    docker --version
    ```

=== "🐧 Linux"

    Docker Engine starts on its own after installing. Check it in your terminal:

    ```bash
    docker --version
    ```

You should see something like this:

```
Docker version 27.3.1, build ce12230
```

The exact numbers will be different for you - any version is fine. Seeing a version number means Docker is installed. ✅

---

## Step 3: Prove it works

Run this one command:

```bash
docker run hello-world
```

Docker will download a tiny test image and run it. If everything is working, you'll see a friendly message that begins:

```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

🎉 That's it - Docker is installed and working!

Don't worry about *what* just happened - we'll pull that apart in the next lesson. Seeing **"Hello from Docker!"** is the only proof we need today.

---

## ✅ Checkpoint

Before moving on, make sure both of these worked:

- `docker --version` printed a version number
- `docker run hello-world` showed the **"Hello from Docker!"** message

If both worked, you're ready for the next lesson. If either gave an error, check the common hiccups below.

## 🩹 Common hiccups

- **`docker: command not found`** (Windows/Mac): Docker Desktop probably isn't running, or - on Windows - WSL integration isn't switched on. Open **Docker Desktop → Settings → Resources → WSL Integration** and enable your Ubuntu distro.
- **`permission denied while trying to connect to the Docker daemon`** (Linux): you likely skipped logging out after the `usermod` step. Fully close your terminal and reopen it.
- **`Cannot connect to the Docker daemon`**: the engine isn't started. On Windows/Mac, open Docker Desktop and wait for the whale 🐳 to settle before trying again.

---

**Next up:** [Run Your First Container](../first-container/) - where we'll run something real and finally explain what a container actually *is*.