# Your First Pod 🍕 (Your First “Pizza Order”)

Now that your **local Kubernetes cluster is running** (the pizza chain head office is open), it’s time to **place our first order**.

In Kubernetes terms: we’re creating our **first Pod**, the smallest unit Kubernetes can run.

Think of a **Pod** as **one customer order**: usually one main pizza, sometimes with a side or drink that must arrive together.

---




## 🎯 Goal for this Section

- Run a very simple web server container (**nginx**) inside your cluster  
- Watch it appear in Kubernetes  
- Check that it’s healthy  
- Delete it when done  

> No files to create yet : just a few commands.

---



## Step 1: Make Sure Your Cluster is Running ✅

In your terminal / PowerShell:

```bash
minikube status
```
You should see output like this:
```console
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```
⚠️ If it says Stopped, run:
```bash
minikube start
```
This ensures your cluster is up and ready to accept orders.

---



## Step 2: Run Your First Pod 🐳

We’re going to create a Pod with a simple web server (nginx). This is the fastest way to see Kubernetes in action.

=== "🪟 Windows | 🍎 Mac | 🐧 Linux"
```bash
kubectl run my-first-pizza --image=nginx --port=80
```

What happens here:

- kubectl run → “Hey Kubernetes, create something”
- my-first-pizza → the name of the Pod (like naming an order “Order #1”)
- --image=nginx → use the official nginx container (tiny web server)
- --port=80 → container listens on HTTP port 80
After a few seconds, you should see:

```bash
pod/my-first-pizza created
```

---



## Step 3: Check That It’s Running 👀

```bash
kubectl get pods
```
Expected output:
```console
NAME                 READY   STATUS    RESTARTS   AGE
my-first-pizza       1/1     Running   0          45s
```

**Column explanations:**

- READY 1/1 → Pod is healthy and ready
- STATUS Running → everything works
- AGE → how long the Pod has been alive
⚠️ If it says ContainerCreating, wait 10–30 seconds and run the command again.

---




## Step 4: See What’s Inside 🔍
Get detailed information about the Pod:
```bash
kubectl describe pod my-first-pizza
```
This shows:

- Which node (restaurant) it’s running on
- Events: what Kubernetes did (pulled image, started container…)
- Internal IP address
Scroll to Events at the bottom to see the story of how your first Pod started.

---




## Step 5: (Optional) Open the Nginx Welcome Page 🌐
```bash
kubectl port-forward my-first-pizza 8080:80
```
Leave this command running (it creates a tunnel).
Open your browser and visit: http://localhost:8080

  You should see the classic “Welcome to nginx!” page.
  ✅ This proves your first container is running inside Kubernetes!

Press Ctrl + C to stop the port-forward.

---




## Step 6: Clean Up 🧹

Delete the Pod when you’re done:
```bash
kubectl delete pod my-first-pizza
```

```console
pod "my-first-pizza" deleted
```

Verify it’s gone:
```bash
kubectl get pods
```

---


### 🧠 What We Learned

- A Pod is the smallest unit Kubernetes runs (like one pizza order)
- kubectl run ... --image=... is the quickest way to create a single Pod
- kubectl get pods → see what’s running
- kubectl describe pod → view details and history
- Pods are temporary by default : deleted Pods disappear
✅ You just ran your first real container in Kubernetes

---



### Next Step 🚀
Right now, the Pod disappears if deleted or the cluster restarts. In real-world apps, we want:

- Persistent apps that auto-restart
- Multiple copies for high availability
Next, we’ll create a Deployment : the “always keep 3 pizzas ready” rule.

---





[→ Continue to Part 4: Deployments – Keep Your Pizzas Coming](../beginner/deployments.md)