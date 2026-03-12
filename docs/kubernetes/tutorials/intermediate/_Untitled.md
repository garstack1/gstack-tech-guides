
# Intermediate Part 5: Namespaces – Organizing Large Projects

So far everything we've done lives in the **default** namespace — Kubernetes' built-in "room" for resources.  
When projects grow (multiple teams, dev/test/prod environments, or many apps), the default namespace becomes messy — like putting all pizza orders from every location into one giant kitchen.

**Namespaces** are virtual clusters inside one physical cluster:
- Separate resources (Pods, Deployments, Services, Secrets, etc.)  
- Avoid name conflicts  
- Apply different policies (RBAC, resource quotas, network policies) per namespace  
- Make dev/test/prod look like separate worlds

Analogy:  
- Default namespace = the main kitchen  
- dev namespace = a test kitchen for experimenting with new recipes  
- prod namespace = the live kitchen for real customers  
Same building (cluster), but clear separation.

Namespaces are **lightweight** — no extra cost, just logical isolation.

## Goal for this section

Create two namespaces (dev and prod), deploy the same nginx app in each, and see they don't interfere.

## Step 1: Create namespaces

Run:

```bash
kubectl create namespace dev
kubectl create namespace prod
```


Check:

Bash

```
kubectl get namespaces
```

You should see:

text

```
NAME              STATUS   AGE
default           Active   1h
dev               Active   10s
kube-system       Active   1h
prod              Active   10s
```

## Step 2: Deploy nginx in dev namespace

Use your existing nginx-deployment.yaml and nginx-service.yaml from beginner track, but apply with --namespace:

Bash

```
kubectl apply -f nginx-deployment.yaml -n dev
kubectl apply -f nginx-service.yaml -n dev
```

Check resources **only in dev**:

Bash

```
kubectl get all -n dev
```

→ You see Deployment, ReplicaSet, Pods, Service — all in dev

Now switch context so future commands default to dev:

Bash

```
kubectl config set-context --current --namespace=dev
```

(You can switch back later with --namespace=default)

## Step 3: Deploy the same app in prod namespace

Apply again, but in prod:

Bash

```
kubectl apply -f nginx-deployment.yaml -n prod
kubectl apply -f nginx-service.yaml -n prod
```

Check:

Bash

```
kubectl get all -n prod
```

→ Same resources appear in prod, but completely separate from dev.

Try listing without namespace:

Bash

```
kubectl get pods
```

→ Shows only Pods in current namespace (dev, if you set it). No overlap — perfect isolation!

## Step 4: Access the prod Service

Since we have two Services named nginx-service in different namespaces:

Bash

```
minikube service nginx-service -n prod
```

→ Opens the prod version in browser (Do the same with -n dev for the dev version)

## Step 5: Cleanup

Delete namespaces (this deletes everything inside them):

Bash

```
kubectl delete namespace dev
kubectl delete namespace prod
```

(Or delete resources individually if you prefer.)

## Key Takeaways

- Namespaces provide **logical separation** inside one cluster
- Use them for dev/test/prod, teams, or large apps
- Resources in different namespaces can have the same name (nginx-service in dev vs prod)
- Most kubectl commands accept -n <namespace> or --namespace=<name>
- Switch default namespace with kubectl config set-context --current --namespace=<name>
- System namespaces (kube-system, default) exist — don't delete them!

This is a core intermediate skill — almost every real cluster uses multiple namespaces.

→ Next & Final Intermediate Part: Troubleshooting & Debugging