# Deployments – Keep Your Pizzas Running Automatically 🍕

In the last section, we created a **single Pod** using `kubectl run`.  
It worked : but if it crashes or is deleted, it’s gone forever.  

In real life, we want apps to:

- Stay running even if something goes wrong  
- Automatically restart if a Pod dies  
- Scale up or down when demand changes  
- Update to a new version **without downtime**

A **Deployment** does exactly that.

---

## 🎯 Goal for this Section

Create a Deployment that:

- Runs **3 copies** of the nginx web server  
- Automatically restarts Pods if one fails  
- Allows **easy scaling** up or down  
- Uses a small YAML file to define desired state  

> Think back to the pizza chain analogy:  
> **Deployment** = “Always keep 3 margherita pizzas ready. If one burns or demand increases, make more. When the recipe improves, roll out the new version gradually.”

---

## Step 1: Create a Deployment YAML File ✏️

In your terminal, create a file called `nginx-deployment.yaml` using any editor (Notepad, VS Code, etc.):

```yaml
id="nginx-deployment-yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3                # Always keep 3 pizzas ready
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
        image: nginx:1.25     # Use a specific version for stability
        ports:
        - containerPort: 80
```

Plain English explanation:

- Create a Deployment named nginx-deployment
- Always run 3 replicas (3 Pods)
- Use the label app: nginx so Kubernetes knows which Pods belong to this Deployment
- Each Pod runs one container using nginx:1.25
- Listen on port 80 inside the container
- Save this file in the same folder where you’re running commands.

---



## Step 2: Apply the Deployment 🚀

Apply the YAML to create the Deployment:
```bash
kubectl apply -f nginx-deployment.yaml
```


Expected output:
```console
deployment.apps/nginx-deployment created
```

💡 kubectl apply creates or updates resources defined in YAML files.

---




## Step 3: Check That It’s Working 👀
Check the Deployment status:
```bash
kubectl get deployments
```

Sample output:
```console
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment     3/3     3            3           45s
```

- READY 3/3 → All 3 desired Pods are running and healthy

Check the actual Pods:
```bash
kubectl get pods
```

Expected output (names will vary):
```console
NAME                                  READY   STATUS    RESTARTS   AGE
nginx-deployment-5d8f7c6b9f-abcde     1/1    Running   0          50s
nginx-deployment-5d8f7c6b9f-defgh     1/1    Running   0          50s
nginx-deployment-5d8f7c6b9f-ijklm     1/1    Running   0          50s
```


✅ All Pods share the same prefix : Kubernetes manages them automatically.

---




## Step 4: Scale the Deployment 📈

Change the number of pizzas (Pods) with kubectl scale:
```bash
kubectl scale deployment nginx-deployment --replicas=5
kubectl get pods
```


You should now see 5 Pods running.

Scale back down if desired:
```bash
kubectl scale deployment nginx-deployment --replicas=2
kubectl get pods
```
Kubernetes automatically creates or deletes Pods to match the desired number.

---





## Step 5: Clean Up 🧹
Delete the Deployment (also deletes all its Pods):
```bash
kubectl delete -f nginx-deployment.yaml
```

Or delete by name:
```
kubectl delete deployment nginx-deployment
```

Verify it’s gone:
```bash
kubectl get pods
```

🧠 What We Learned

- A Deployment manages multiple Pods for you
- You define the desired state in YAML (e.g., 3 replicas)
- Kubernetes ensures reality matches that state:
 - Creates Pods
 - Restarts them if they crash
 - Scales automatically on command
- kubectl apply → create or update resources
- kubectl get deployments and kubectl get pods → monitor status
- Scaling is instant with kubectl scale
- This is how real applications run in Kubernetes : not single Pods, but Deployments.

---





## Next Step 🚀
Right now, your nginx Pods are running inside the cluster, but they are not reachable from your browser.
We need a Service to provide a stable entry point : the “single phone number” for ordering pizza.

---




[→ Continue to Part 5: Services – Make Your App Accessible](../beginner/services.md)