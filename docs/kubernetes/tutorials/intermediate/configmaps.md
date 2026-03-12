# Intermediate Part 2: ConfigMaps – External Configuration

Most real apps need settings that change depending on environment:
- Development: database = localhost, log level = debug
- Production: database = prod-db.company.com, log level = info
- Staging: different API key or feature flags

Hard-coding these inside the container image is bad : you’d have to rebuild/redeploy for every change.  
**ConfigMaps** let you inject configuration **outside** the image.

Think of it as the pizza chain’s **recipe adjustments**:
- Base pizza is the same (container image)
- But some locations add extra cheese or change sauce type (config) without remaking the whole kitchen

## Goal for this section

Inject two config values into our nginx Pods:
- `APP_ENV = development`
- `LOG_LEVEL = debug`

We’ll see them as environment variables inside the running Pods.

---



## Step 1: Create a ConfigMap
1. Run this command (literal values – quick way):
```bash
kubectl create configmap app-settings \
--from-literal=APP_ENV=development \
--from-literal=LOG_LEVEL=debug
```

2. Check it exists:
```bash
kubectl get configmap
kubectl describe configmap app-settings
```
You should see your two keys/values.

---



## Step 2: Update your Deployment to use the ConfigMap
1. Edit your `nginx-deployment.yaml` (from beginner track) and add this under `spec.template.spec.containers`:
```yaml
env: 
		- name: APP_ENV
		  valueFrom: 
			  configMapKeyRef:
				  name: app-settings
				  key: APP_ENV
		  - name: LOG_LEVEL
		    valueFrom:
			    configMapKeyRef:
				    name: app-settings
				    key: LOG_LEVEL
```

(Full container block might now look like the following:)
  ```yaml
  containers:
	  - name: nginx
	    image: nginx:1.25 ports:
  	  - containerPort: 80
  		env: 
  			- name: APP_ENV
	  		  valueFrom: 
		  		  configMapKeyRef:
			  		  name: app-settings
				  	  key: APP_ENV
  			  - name: LOG_LEVEL
	  		    valueFrom:
		  		    configMapKeyRef:
			  		    name: app-settings
				  	    key: LOG_LEVEL
  ```


2. Apply the change:
```bash
kubectl apply -f nginx-deployment.yaml
```
Kubernetes will roll out new Pods with the config injected.

---



## Step 3: Verify the config is inside the Pods
1. Find one Pod name:
   ```bash
   kubectl get pods
   ```

2. Then run:
   ```bash
   kubectl exec -it <pod-name> -- env | grep -E 'APP_ENV|LOG_LEVEL'
   ```

3. You should see the following output:
   ```console
   APP_ENV=development
   LOG_LEVEL=debug
   ```
   Success! The values came from the ConfigMap, not the image.

---




## Bonus: ConfigMap as Volume Mount – Inject Files into the Container
1. Environment variables are great for single values, but many apps need **configuration files** (e.g. nginx.conf, app.yaml, .properties files).
2. You can mount a ConfigMap as a **volume** : Kubernetes creates files inside the container with the exact key/value content from the ConfigMap.

### Step A: Create a ConfigMap with file-like content
1. We'll make a simple custom nginx.conf snippet.
   Run the following in your terminal:
```bash
kubectl create configmap nginx-conf \
  --from-literal=nginx.conf="server {
    listen 80;
    location / {
      return 200 'Hello from custom ConfigMap config!\n';
    }
  }"
```

2. Check it to confirm:
```bash
kubectl describe configmap nginx-conf
```

---



### Step B: Update your Deployment to mount the ConfigMap as a volume
1. Edit nginx-deployment.yaml and add these two sections under spec.template.spec:
```yaml
volumes:
      - name: config-volume
        configMap:
          name: nginx-conf           # The ConfigMap we created
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80
        volumeMounts:
        - name: config-volume
          mountPath: /etc/nginx/conf.d/default.conf   # nginx reads config from here
          subPath: nginx.conf                         # only mount this one key
```

2. Apply the change:
```bash
kubectl apply -f nginx-deployment.yaml
```
Kubernetes rolls out new Pods with the custom config mounted.

---



### Step C: Verify the file is mounted
1. Get one new Pod name:
```bash
kubectl get pods
```

2. Then run inside the Pod:
```bash
kubectl exec -it <pod-name> -- cat /etc/nginx/conf.d/default.conf
```

3. You should see your custom config:
```console
server {
    listen 80;
    location / {
      return 200 'Hello from custom ConfigMap config!\n';
    }
  }
```

---



### Step D: Test it in the browser
1. Make sure your Service is still running:
```bash
minikube service nginx-service
```

2. Refresh the page → you should now see:
```console
Hello from custom ConfigMap config!
```
→ Proof: the Pod is using the config file we injected via ConfigMap volume!

---



### Step E: Cleanup (when done)
1. Run the following Bash command
```bash
kubectl delete configmap nginx-conf
```
(The Deployment stays : it just loses the custom config on next rollout.)

---



## What we learned

- ConfigMaps hold non-sensitive configuration
- Inject as environment variables (env) or as files (volumes : we’ll cover later)
- Change config → restart rollout → new values applied
- Keeps images generic and reusable across environments

---


[→ Continue to Part 3: Secrets](../intermediate/secrets.md)