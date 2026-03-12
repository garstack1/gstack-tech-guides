# Part 5: Services : Making Your Application Reachable

In the previous sections you created Pods and then a Deployment.
Your application is now running reliably inside the Kubernetes cluster.

But there is a problem.

Pods are ephemeral. They can be created, destroyed, or replaced at any time. When this happens:

- Their internal IP address changes
- The number of running Pods may change (scaling)
- Clients would not know which Pod to contact

This is where Services come in.

A Service provides a stable network endpoint that always routes traffic to the correct Pods : even if those Pods change.

Conceptually

Think back to the pizza analogy:

- Pods = individual pizzas being cooked
- Deployment = the rule that keeps multiple pizzas ready
- Service = the single phone number customers call

Customers never call the kitchen directly. They call the phone number, and the system routes the order to whichever kitchen has capacity.
Kubernetes works the same way.
A Service load-balances traffic across all healthy Pods that match a label selector.

---



## Goal of This Section
By the end of this section you will:
- Create a Service
- Connect it to your Deployment
- Access your application from your web browser
Your nginx web server will finally be reachable outside the cluster.

---




## Step 1: Verify Your Deployment Is Running
Before exposing the application, confirm that your Deployment is still active.

Run:
```bash
kubectl get deployments
```

You should see something similar to:
```console
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   3/3     3            3           5m
```

Explanation:

- READY 3/3 → All desired Pods are running and healthy
- UP-TO-DATE → Kubernetes has applied the latest configuration
- AVAILABLE → Pods are ready to receive traffic
If the deployment is missing, reapply it:

```bash
kubectl apply -f nginx-deployment.yaml
```

---




## Step 2: Create a Service

Now we create a Service resource that exposes the Pods.

Create a new file named:
```yaml
nginx-service.yaml
```


Add the following configuration:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: NodePort
```

---




### Understanding the YAML Configuration
Let's break down what each part means.

**Resource Type**
```yaml
kind: Service
```

This tells Kubernetes we are creating a network Service.

---




**Metadata**
```yaml
metadata:
  name: nginx-service
```


This assigns a unique name to the Service within the cluster.

---




**Selector (Connecting Service to Pods)**
```yaml
selector:
  app: nginx
```
This is extremely important.
The Service sends traffic to any Pod with the label:
```yaml
app: nginx
```
Your Deployment created Pods with this exact label.
This label matching is how Kubernetes links Services to Pods automatically.

---




**Ports**
```yaml
ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```


This defines how traffic flows.
| Field        | Meaning |
|--------------|---------|
| port         | The port exposed by the Service |
| targetPort   | The port inside the container |
| protocol     | Network protocol (usually TCP) |

So traffic arriving at the Service on port 80 is forwarded to port 80 inside the container.

---




**Service Type**
```yaml
type: NodePort
```
This determines how the Service is exposed.
For local development we use:

**NodePort**

This means Kubernetes will:

- Open a high-numbered port on the node (your machine)
- Route traffic from that port to the Service

Typical NodePort range:
```yaml
30000–32767
```

---




## Step 3: Apply the Service

Now create the Service inside the cluster.

Run:
```bash
kubectl apply -f nginx-service.yaml
```

You should see:
```console
service/nginx-service created
```

The Service now exists and is routing traffic internally.

---




## Step 4: Inspect the Service
Check the Service configuration.
```bash
kubectl get services
```


Example output:
```console
NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes      ClusterIP   10.96.0.1      <none>        443/TCP        15m
nginx-service   NodePort    10.108.123.45  <none>        80:31234/TCP   2m
```


Important part:
```console
80:31234/TCP
```


This means:

| Value        | Meaning |
|--------------|---------|
| 80 | Service port inside the cluster |
| 31234 | External NodePort opened on your machine |

Requests hitting port 31234 will be routed to nginx Pods on port 80.

---





## Step 5: Access the Application

Minikube provides a convenient shortcut for opening Services.

Run:
```bash
minikube service nginx-service
```


Minikube will automatically:

- Detect the NodePort
- Open your default browser
- Navigate to the correct URL

The URL will look similar to:
```console
http://192.168.49.2:31234
```

If it does not open automatically, copy the URL from the terminal and paste it into your browser.
You should see the classic: **Welcome to nginx!** page.

This confirms:

- Your Deployment is running
- The Service is routing traffic
- The application is reachable from outside the cluster

---




### What Happens Behind the Scenes
When you open the page:
1. Your browser sends a request to the NodePort
2. The request hits the Kubernetes Service
3. The Service load balances the request
4. One of the nginx Pods responds
If you have multiple Pods, Kubernetes distributes traffic between them.

---




## Step 6: Clean Up (Optional)
If you want to remove the Service:
```bash
kubectl delete -f nginx-service.yaml
```

or
```bash
kubectl delete service nginx-service
```
This removes the network entry point, but your Deployment and Pods remain running.

---




## What We Learned
Key Kubernetes concepts introduced in this section:

- Services provide stable networking for Pods
- Pods are dynamic, but Services provide a consistent endpoint
- NodePort exposes applications for local testing
- Label selectors connect Services to Pods
- Kubernetes automatically load balances traffic


Your application is now:

- Running inside Kubernetes
- Managed by a Deployment
- Reachable through a Service

This is the core workflow used in real Kubernetes applications.

---




## Next Step
You have now covered the most important Kubernetes building blocks:

- Pods
- Deployments
- Services
In the final section we will recap what you learned and cover some useful tips for beginners.

---




[→ Continue to Part 6: Recap and Tips](../beginner/recap-and-tips.md)