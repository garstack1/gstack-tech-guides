

# Intermediate Part 3: Secrets – Handling Passwords & Keys Securely

In the last section we used ConfigMaps to inject non-sensitive configuration (like log levels or app environments).  
Now we need to handle **sensitive** data: database passwords, API keys, OAuth tokens, private keys, etc.

You **never** want these in plain text in images, Git repos, logs, or ConfigMaps — that's a security risk.

**Secrets** are Kubernetes' built-in way to store and inject sensitive data **securely**:
- Base64-encoded (not encrypted by default, but protected from casual viewing)
- Stored in etcd (with RBAC access controls)
- Injected as env vars or files (just like ConfigMaps)
- Not logged by default in many tools

Analogy:  
ConfigMaps = the pizza chain's public recipe adjustments (extra cheese for some locations)  
Secrets = the **secret sauce recipe** only the head chef knows — passed securely to the right kitchens.

## Goal for this section
Create a Secret with a fake database password and API key.  
Inject them into our nginx Pods as:
- Environment variables (quick demo)
- Mounted files (more realistic for apps)

We'll see them inside the Pods.

## Step 1: Create a Secret (two easy ways)

### Option 1: From literals (quick for testing)

```bash
kubectl create secret generic app-secrets \
--from-literal=DB_PASSWORD=super-secret-123 \
--from-literal=API_KEY=abc123xyz789
```

### Option 2: From a file (better for real secrets)

Create a file secrets.txt with:
```text
DB_PASSWORD=super-secret-123
API_KEY=abc123xyz789
```

Then:
```bash
kubectl create secret generic app-secrets --from-file=secrets.txt
```

Check it exists:
```bash
kubectl get secrets
kubectl describe secret app-secrets
```

→ You'll see the keys, but **values are hidden** (shown as <redacted>). This is intentional — prevents accidental exposure in describe or logs.

## Step 2: Inject Secrets as Environment Variables

Edit your nginx-deployment.yaml and add this under the container spec (similar to ConfigMaps):

YAML

```
env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: DB_PASSWORD
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: API_KEY
```

Apply:

Bash

```
kubectl apply -f nginx-deployment.yaml
```

Kubernetes rolls out new Pods with the secrets as env vars.

Verify inside a Pod:

Bash

```
kubectl get pods   # find a pod name
kubectl exec -it <pod-name> -- env | grep -E 'DB_PASSWORD|API_KEY'
```

You should see:

text

```
DB_PASSWORD=super-secret-123
API_KEY=abc123xyz789
```

→ Secrets are now available to the app securely.

## Step 3: Mount Secrets as Files (more common for real apps)

Apps often read secrets from files (e.g. /secrets/db-pass, .env, cert files).

Update the Deployment YAML again — add a volume + volumeMount:

YAML

```
volumes:
      - name: secret-volume
        secret:
          secretName: app-secrets           # Mount the whole Secret
      containers:
      - name: nginx
        # ... existing ports/env if any ...
        volumeMounts:
        - name: secret-volume
          mountPath: /etc/secrets           # Folder inside container
          readOnly: true
```

Apply:

Bash

```
kubectl apply -f nginx-deployment.yaml
```

Check inside a Pod:

Bash

```
kubectl exec -it <pod-name> -- ls /etc/secrets
# Output: API_KEY  DB_PASSWORD

kubectl exec -it <pod-name> -- cat /etc/secrets/DB_PASSWORD
# Output: super-secret-123
```

→ Each key becomes a file with the secret value as content. This is the preferred way for many apps (e.g. database drivers, API clients).

## Step 4: Security Notes & Cleanup

- Secrets are **base64-encoded** (not encrypted) — anyone with get secret -o yaml access can decode them.
- Use **RBAC** in real clusters to limit who can read Secrets.
- Never commit secrets to Git — use tools like Sealed Secrets, External Secrets, or Vault for production.

Cleanup:

Bash

```
kubectl delete secret app-secrets
```

(The Deployment remains — it just loses the secrets on next rollout.)

## Key Takeaways

- Use **Secrets** for anything sensitive (passwords, keys, tokens, certs)
- Inject as env vars (quick) or mounted files (more secure/common)
- Secrets are hidden in most kubectl outputs
- Changes to Secrets require Pod restart/rollout (no auto-reload)
- Always combine with RBAC and proper access controls in production

This is a core intermediate skill — almost every real Kubernetes app uses Secrets.

→ Next: Part 4 – Persistent Volumes & Storage – Saving Data