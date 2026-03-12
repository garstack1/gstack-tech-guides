# Advanced Kubernetes Part 1: Ingress - Proper Web Exposure & Routing

In the beginner/intermediate tracks, we used Services (NodePort/LoadBalancer) to expose apps.  
That works locally, but in production you want:
- Clean domain names (e.g. myapp.example.com)  
- Multiple apps on one IP (path-based routing: /api → backend, / → frontend)  
- TLS/HTTPS  
- Load balancing, rate limiting, rewrites

**Ingress** is Kubernetes' way to manage external HTTP/HTTPS access at L7 (application layer).  
It requires an **Ingress Controller** (like NGINX Ingress, Traefik, or HAProxy) : Minikube has a built-in one.

Pizza analogy:  
- Service = the phone number for one restaurant  
- Ingress = the central delivery app/website that routes orders to the right restaurant based on what you want (margherita → kitchen A, vegan → kitchen B)

## Goal for this section

Deploy the NGINX Ingress Controller in Minikube  
Create an Ingress resource to route traffic to your nginx Deployment  
Access it via a fake domain in browser (with HTTPS optional)

---



## Step 1: Enable Ingress in Minikube

Run:
```bash
minikube addons enable ingress
```
Wait a minute, it installs the NGINX Ingress Controller as Pods in ingress-nginx namespace.

Check:
```bash
kubectl get pods -n ingress-nginx
```

→ You should see controller Pods running.

---



## Step 2: Create an Ingress resource

Create nginx-ingress.yaml:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /   # Optional: clean paths
spec:
  rules:
  - host: nginx.local     # Fake domain – we'll map it locally
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service   # Your Service from beginner track
            port:
              number: 80
```

Apply:
```bash
kubectl apply -f nginx-ingress.yaml
```

Check:
```bash
kubectl get ingress
```

→ Shows ADDRESS as <pending> at first, wait 30 - 60s.

---



## Step 3: Access via Ingress (local domain)

Minikube gives an IP for Ingress:
```bash
minikube ip
```

Add to your hosts file (/etc/hosts on macOS/Linux, C:\Windows\System32\drivers\etc\hosts on Windows):
```text
192.168.49.2   nginx.local   # replace with your minikube ip
```

Open browser: [http://nginx.local](http://nginx.local)

→ You should see "Welcome to nginx!" (or your custom config) → Requests now go through Ingress!

---



## Step 4: (Optional) Enable HTTPS with self-signed cert

Create a self-signed cert Secret:
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout tls.key -out tls.crt -subj "/CN=nginx.local"
```

```bash
kubectl create secret tls nginx-tls --cert=tls.crt --key=tls.key
```

Update Ingress YAML (add tls section):
```yaml
spec:
  tls:
  - hosts:
    - nginx.local
    secretName: nginx-tls
  rules:
  - host: nginx.local
    ...
```

Re-apply:
```bash
kubectl apply -f nginx-ingress.yaml
```

Access [https://nginx.local](https://nginx.local) (accept self-signed warning) : now secure!

---



## Step 5: Cleanup

```bash
kubectl delete -f nginx-ingress.yaml
kubectl delete secret nginx-tls
minikube addons disable ingress   # Optional – removes controller
```

---



## Key Takeaways

- Ingress manages **HTTP/HTTPS routing** at L7 (path/host-based)
- Needs an Ingress Controller (Minikube has NGINX built-in)
- Rules map domains/paths to Services
- Annotations add features (rewrite, rate-limit, auth, many more in production)
- Production: Use cert-manager for real TLS, external DNS, cloud load balancers

This is a huge step up, you now expose apps like real websites.

---



→ Next: Part 2 – Helm Basics – Packaging & Managing Apps

---