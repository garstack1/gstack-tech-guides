## Part 5: Services – Make Your App Reachable

In the previous sections we created Pods and a Deployment — our "pizzas" are now being made automatically in the kitchen (cluster).  
But there's a problem: customers (you, on your laptop) can't order anything yet.

Pods have temporary, random IP addresses inside the cluster.  
If a Pod dies and restarts, its IP changes.  
We need a **stable front door** that always points to the right pizzas, no matter which kitchen is baking them.

In the pizza chain analogy:  
A **Service** is the **single phone number, website, or delivery app** — customers call one number, and the call gets routed to whichever restaurant has a ready pizza.

#### Goal for this section

Expose our nginx Deployment so we can see the "Welcome to nginx!" page in our browser.  
We'll use the simplest types first.

### Step 1: Make sure your Deployment is still running
1. Check that the deployment is still running:
```bash
kubectl get deployments
````

2. You should see `nginx-deployment` with `READY 3/3` (or whatever number you scaled to). If not, re-apply your `nginx-deployment.yaml` created in the [Deployments](04-deployments.md.md#deployment-file)
   To re-apply the deployment, run the following from your terminal:
   ```bash
   kubectl apply -f nginx-deployment.yaml
   ```


### Step 2: Create a Service (the stable phone number)
1. Create a file called nginx-service.yaml:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx           # Points to our Deployment's Pods (via label)
  ports:
    - protocol: TCP
      port: 80           # Port we expose on the Service
      targetPort: 80     # Port inside the Pods
  type: NodePort         # Makes it reachable from outside the cluster
```

**What this says in plain English**:
- Create a Service named **nginx-service**
- Send traffic to any Pod with label **app: nginx**
- Listen on **port 80**
- Use **NodePort** type → Kubernetes opens a random high port (30000–32767) on your computer so you can reach it

2. Apply the nginx-service.yaml by running the bash command:
```bash
kubectl apply -f nginx-service.yaml
```


3. After applying the Service YAML file, you should see the following output:
```console
service/nginx-service created
```


### Step 3: See the Service
1. To check the status of the service, run the following bash command:
```bash
kubectl get services
```

2. You should see an output similar to the following:
```console
NAME            TYPE          CLUSTER-IP      EXTERNAL-IP      PORT(S)         AGE
kubernetes      ClusterIP     10.96.0.1       <none>           443/TCP         10m
nginx-service   NodePort      10.108.123.45   <none>           80:31234/TCP    45s
```

3. Look at the **PORT(S)** column for the value 80:31234/TCP:
- 80 = port inside cluster
- 31234 = the random high port opened on your computer (NodePort)

### Step 4: Open it in your browser (the fun part!)
1. Minikube makes this super easy:
   ```bash
   minikube service nginx-service
   ```
   
- This automatically opens your default browser
- URL looks like: [http://192.168.49.2:31234](http://192.168.49.2:31234) (or similar)
- You should see the **"Welcome to nginx!"** page, served by one of your 3 Pods!

2. If it doesn't open automatically, copy the URL from the terminal output and paste it into your browser.

→ Proof: your app is now reachable from outside the cluster!



### Step 5: Clean up (optional)
When you're done, run the following bash command:
```bash
kubectl delete -f nginx-service.yaml
```
Or alternatively run this bash command:
```bash
kubectl delete service nginx-service
```


The Deployment and Pods stay running, only the entry point is removed.

#### What we learned

- A **Service** gives Pods a stable, load-balanced network identity
- type: NodePort is great for local testing (opens a port on your laptop)
- kubectl get services shows the ports
- minikube service is a shortcut to access local clusters in the browser
- Labels (app: nginx) connect Services to Pods/Deployments

Now our tiny app is actually **useful**: it's running, scaling, and reachable.

#### Next steps for beginners
You've now completed the following:
- Understood containers & Kubernetes basics
- Run a local cluster
- Created & scaled Pods via Deployment
- Exposed the app with a Service
This covers the absolute core of Kubernetes for beginners!



[→ Continue to Part 6: Recap and Tips](../01-beginners/06-recap-and-tips.md)