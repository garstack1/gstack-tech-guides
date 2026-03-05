## Deployments – Keep Your Pizzas Running Automatically

In the last section we created a single Pod with `kubectl run`.  
It worked — but if we delete it, or if it crashes, it's gone forever.  
We had to manually recreate it.

In real life we want apps to:
- Stay running even if something goes wrong
- Automatically restart if a Pod dies
- Scale to more copies when busy
- Update to a new version without downtime

That's what a **Deployment** does.

Think back to the pizza chain:  
A **Deployment** is the rule: "Always keep 3 margherita pizzas ready. If one burns or demand increases, make more. When we improve the recipe, roll out the new version gradually."

### Goal for this section

Create a Deployment that does the following:

- Runs 3 copies of the nginx web server
- Automatically restarts if one fails
- Lets us scale up/down easily

We will use a small YAML file this time — don't worry, it's very short.


### <a id="deployment-file"></a>Step 1: Create a simple Deployment YAML file
1. In your terminal, create a file called `nginx-deployment.yaml` (you can use Notepad, VS Code, or any text editor):
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3                # We want 3 copies (3 pizzas always ready)
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25      # Use a specific version for stability
        ports:
        - containerPort: 80``          
```


2. Save the file in the same folder where you're running commands.
   **What this file says in plain English**:
   - Create a Deployment named `nginx-deployment`
   - Always run **3 replicas** (3 Pods)
   - Use the label `app: nginx` so Kubernetes knows which Pods belong to this Deployment
   - Each Pod should run one container from the `nginx:1.25` image
   - Listen on port 80 inside the container


### Step 2: Apply the Deployment
1. Run the following Bash command in the terminal:
```bash
kubectl apply -f nginx-deployment.yaml
```

2. You should see the following output:
```console
deployment.apps/nginx-deployment created
```


### Step 3: Check that it's working
1. Run the following Bash Command:
```bash
kubectl get deployments
```


2. You should see an output like the following:
```console
NAME                         READY     UP-TO-DATE      AVAILABLE       AGE
nginx-deployment             3/3       3               3               45s
```
- READY 3/3 → All 3 desired Pods are running and healthy


3. Now check the actual Pods, by running the following bash command:
```bash
kubectl get pods
```


4. You should see **three Pods** (names like `nginx-deployment-xyz-abcde`):
```console
NAME                                  READY      STATUS      RESTARTS     AGE
nginx-deployment-5d8f7c6b9f-abcde     1/1        Running     0            50s
nginx-deployment-5d8f7c6b9f-defgh     1/1        Running     0            50s
nginx-deployment-5d8f7c6b9f-ijklm     1/1        Running     0            50s
```
- They all have the same prefix — Kubernetes created and manages them.


### Step 4: Scale it (change the number of pizzas)
1. Try scaling to 5 replicas:
```bash
kubectl scale deployment nginx-deployment --replicas=5
```


2. Then check the Pods again:
```bash
kubectl get pods
```
- You should now see **5 Pods** running.


3. Scale back down to 2 if you want:
```bash
kubectl scale deployment nginx-deployment --replicas=2
```
- Kubernetes automatically deletes extra Pods.


### Step 5: Clean up when done
1. Delete the Deployment (this also deletes all its Pods):
```yaml
kubectl delete -f nginx-deployment.yaml
```

- Alternatively delete them by name:
```yaml
kubectl delete deployment nginx-deployment
```




#### What we learned

- A **Deployment** manages multiple Pods for you
- You define **desired state** in YAML (e.g., "3 replicas")
- Kubernetes makes reality match that state (creates Pods, restarts if they crash, scales on command)
- kubectl apply → create or update resources from YAML
- kubectl get deployments and kubectl get pods → see status
- Scaling is instant with kubectl scale

This is how real applications run in Kubernetes, not single Pods, but Deployments.

#### Next step

Right now our nginx Pods are running inside the cluster, but we can't reach them from our browser yet. We need a **Service** to create a stable entry point (the "single phone number" for ordering pizza).



[→ Continue to Part 5: Services – Make Your App Accessible](../01-beginners/05-services.md)