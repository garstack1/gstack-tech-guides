# Your First Tiny Kubernetes Cluster (Local on Your Computer)
Now that we understand the big picture (containers + the pizza chain manager), let’s see Kubernetes in action.

We are going to create a **tiny Kubernetes cluster** right on your own computer.  
It’s safe, free, and only takes just a few minutes to install.



## What we will do (in very simple steps)

1. Install a tool called **Minikube** (it creates a fake "single restaurant" Kubernetes cluster on your laptop)
2. Start the cluster with one command
3. Check that it’s alive with another command
4. See the dashboard, a pretty web page that shows what’s happening

That’s it for this part. No containers or apps yet, just making sure the "head office" is open.



## Minikube: First Cluster Setup
Minikube is the easiest way for beginners to try Kubernetes locally.

This guide walks you through installing Minikube and running your first Kubernetes cluster on **Windows 🪟, Mac 🍎, and Linux 🐧**. Each step has OS-specific instructions.

---



## Step 1: Install Minikube
=== "🪟 Windows"

    ```bash
    choco install minikube
    ```

=== "🍎 Mac"

    ```bash
    brew install minikube
    ```

=== "🐧 Linux"

    ```bash
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    sudo install minikube-linux-amd64 /usr/local/bin/minikube
    ```

> 💡 Tip: After installing, run `minikube version` to confirm the installation.

---



## Step 2: Start the Cluster
=== "🪟 Windows"

    ```bash
    minikube start --driver=hyperv
    ```

=== "🍎 Mac"

    ```bash
    minikube start --driver=hyperkit
    ```

=== "🐧 Linux"

    ```bash
    minikube start --driver=none
    ```

- This downloads a small virtual machine + Kubernetes components (first time takes 2–5 minutes)
- After that it usually starts in ~30 seconds
- You should see output similar to the following:

```console
minikube v1.34.0 on Microsoft Windows 11 Home Single Language 10.0.26100
Using the docker driver based on user configuration
Starting control plane node minikube in cluster minikube
Creating docker container (CPUs=2, Memory=2200MB) ...
Preparing Kubernetes v1.31.0 on Docker 24.0.9 ...
Verifying Kubernetes components...
Done! kubectl is now configured to use "minikube" cluster```
```
> ⚠️ Note: Linux users may need `sudo` privileges for the `none` driver.

Congratulations! 
You now have a real (tiny) Kubernetes cluster running on your computer.

---



## Step 3: Verify Installation
All OSs share the same verification command:

```bash
minikube status
```


You should see output indicating that cluster components are running:
```console
host: Running
kubelet: Running
apiserver4: Running
kubeconfig: Configured
```

---



## Step 4: Check that it’s alive
Now that Minikube is installed, we want to check that it is running
Run the following command:
```bash
kubectl get nodes
```

You should see something like:
```console
NAME       STATUS   ROLES           AGE     VERSION
minikube   Ready    control-plane   2m30s   v1.31.0
```

- This means: "Show me all the restaurants (nodes) in the pizza chain"
- You have **one restaurant** called minikube and it’s **Ready** (healthy)

---



## Step 5: Access the Kubernetes Dashboard (Optional)
Minikube provides a built-in dashboard to visualize your cluster.

=== "🪟 Windows  |  🍎 Mac  |  🐧 Linux"

    ```bash
    minikube dashboard
    ```

💡 The dashboard opens in your default browser.


- This opens a web browser showing the Kubernetes dashboard

1. You’ll see graphs, lists of things running (right now almost nothing), and a nice visual of your tiny cluster
![Kubernetes Dashboard](../../images/kubernetes/beginners/dashboard-01.png "Kubernetes Dashboard")

2. Close the browser tab when done, the dashboard keeps running in the background until you stop Minikube.
![Kubernetes Dashboard](../../images/kubernetes/beginners/dashboard-02.png "Kubernetes Dashboard")

---



## Step 6: Create Your First Pod
=== "🪟 Windows  |  🍎 Mac  |  🐧 Linux"

    ```bash
    kubectl run hello-minikube --image=k8s.gcr.io/echoserver:1.4 --port=8080
    kubectl get pods
    ```


✅ You should see your pod in the Running state.

---



## Step 7: Expose the Pod

=== "🪟 Windows  |  🍎 Mac  |  🐧 Linux"

    ```bash
    kubectl expose pod hello-minikube --type=NodePort
    kubectl get svc
    ```


💡 Use the minikube service hello-minikube command to open the service in your browser.

---



## Step 8: Cleanup (when you’re done playing)
1. To stop the cluster run this Bash Command (saves CPU/RAM):

```bash
minikube stop
```

2. To delete it completely (start fresh next time):

```bash
minikube delete
```
⚠️ This removes all pods, services, and the cluster.


✅ Summary

- We turned your computer into a **real Kubernetes cluster** (even if just one node)
- We used **kubectl** the main command-line tool to talk to Kubernetes
- We proved the "head office" is listening
Next time we will actually **deploy our first pizza** (run a simple container inside this cluster).

---

⚠️ (If you run into issues, search “install minikube [your OS]” official docs are very good.)

---



[→ Continue to Part 3: Run Your First Container (Pod)](../beginner/your-first-pod-and-deployment.md)

---