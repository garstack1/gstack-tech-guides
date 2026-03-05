## Run Your First Pod (Your First "Pizza Order")
Now that your tiny Kubernetes cluster is running (the pizza chain head office is open), let's place our first order.

In Kubernetes terms: we are going to create our first **Pod**, the smallest thing Kubernetes can run.

Think of a Pod as **one customer order**: usually one main pizza, sometimes with a side or drink that must arrive together.

### Goal for this section

Run a very simple web server container (nginx) inside your cluster  
→ See it appear  
→ Check that it's healthy  
→ Delete it when done

No files to create yet, just two or three commands.



### Step 1: Make sure your cluster is running
1. In your terminal / PowerShell, run:
```bash
minikube status
```

2. You should see the following output on your terminal:
```console
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

3. If it says "Stopped", just run minikube start again.
```bash
minikube start
```



### Step 2: Run your first Pod (the easiest way)
1. To run your first Pod, enter the following command in the terminal:
```bash
kubectl run my-first-pizza --image=nginx --port=80
```

What this does:
- **kubectl run** : "Hey Kubernetes, create something"
- **my-first-pizza** : name we give this Pod (like naming the order "Order #123")
- **--image=nginx** : use the official nginx web server container (a tiny web server that says "Welcome to nginx!")
- **--port=80** : this container listens on port 80 (normal web port)

After a few seconds you should see the following output in your terminal window:
```console
pod/my-first-pizza created
```



### Step 3: Check that it's running
To check if the Pod is running, enter the following command:
```bash
kubectl get pods
```

You should see something like the following in your terminal window:
```console
NAME                 READY       STATUS       RESTARTS       AGE
my-first-pizza       1/1         Running      0              45s
```

- **READY 1/1** : the Pod is healthy and ready (1 container out of 1 is running)
- **STATUS Running** : it's working!
- **AGE** : how long it's been alive

If it says ContainerCreating → wait 10–30 seconds and run the command again.



### Step 4: See what’s inside (describe the Pod)
1. To get a description of the Pod, run the following Bash command:
```bash
kubectl describe pod my-first-pizza
```

This shows lots of details:
- Which node (restaurant) it's running on
- Events (what Kubernetes did: pulled image, started container…)
- IP address inside the cluster

Scroll to the bottom, look for "Events" to see the story of how it started.



### Step 5: (Optional but fun) Open the nginx welcome page
1. Expose the Pod temporarily so you can see it in your browser
   Enter the following in the terminal window:
```bash
kubectl port-forward my-first-pizza 8080:80
```


- Leave this command running (it creates a tunnel)
- Open your browser and go to: [http://localhost:8080](http://localhost:8080)
- You should see the classic "Welcome to nginx!" page
  This proves your first container is really running inside Kubernetes!

2. Press **Ctrl + C** in the terminal to stop the port-forward when done.



### Step 6: Clean up
1. When you're ready to delete the Pod, enter the following Bash command:
```bash
kubectl delete pod my-first-pizza
```

2. You should see the following output:
```console
pod "my-first-pizza" deleted
```

3. Run kubectl get pods again, it should be gone.
```bash
kubectl get pods
```

### What we learned
- A **Pod** is the smallest unit Kubernetes runs (like one customer order)
- **kubectl run ... --image=...** is the quickest way to create a single Pod (good for testing)
- **kubectl get pods** : see what's running
- **kubectl describe pod <name>** : get details and history
- Pods are temporary by default, if deleted, they're gone (later we'll learn Deployments that keep them alive)

#### You just ran your first real container inside Kubernetes, congratulations!

#### Next step

Right now our Pod disappears when we delete it or the cluster restarts. In real life we want apps to stay running, auto-restart if they crash, and scale to multiple copies.

Next we will create a **Deployment** — the "always keep 3 pizzas ready" rule.



[→ Continue to Part 4: Deployments – Keep Your Pizzas Coming](../01-beginners/04-deployments.md)