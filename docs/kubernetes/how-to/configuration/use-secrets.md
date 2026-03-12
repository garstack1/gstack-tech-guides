# Use Secrets
## Problem

Applications often require sensitive data:

- database passwords
- API keys
- tokens

These should not be stored in plain configuration.

Kubernetes **Secrets** store sensitive values securely.

---



## Step 1 — Create a Secret

Run:
```bash
kubectl create secret generic db-secret \
  --from-literal=DB_PASSWORD=mysecretpassword
```

Verify:
```bash
kubectl get secrets
```

Expected output:
```console
NAME        TYPE
db-secret   Opaque
```


---



## Step 2 — Use Secret in Deployment

Example container configuration.
```yaml
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db-secret
        key: DB_PASSWORD
```

Apply deployment.
```bash
kubectl apply -f deployment.yaml
```

---



## Step 3 — Verify Secret Injection

Enter the running pod.
```bash
kubectl exec -it <pod-name> -- /bin/sh
```

Once inside the container, check that the secret value is available as an environment variable.
```bash
echo $DB_PASSWORD
```

Example output:
```console
super-secret-password
```

If the value appears, the Kubernetes Secret has been successfully injected into the container environment.

---

## What Happened

In this guide you:

- Created a **Kubernetes Secret**
- Referenced the secret inside a **Deployment**
- Injected the secret as an **environment variable**
- Verified the value from inside the container

Secrets allow sensitive data such as:

- passwords
- API tokens
- database credentials

to be stored separately from application code.

---

## Clean Up (Optional)

Remove the example resources.

```bash
kubectl delete deployment secret-demo
kubectl delete secret db-secret
```

---




## Next Steps

Now that you understand Kubernetes Secrets, you can explore:

- Mounting secrets as **files instead of environment variables**
- Using **external secret managers** (AWS Secrets Manager, HashiCorp Vault)
- Encrypting secrets at rest with **Kubernetes encryption providers**

Secrets are a critical building block for **secure production workloads**.

---


