# Secrets

## Description

A **Secret** stores sensitive data such as credentials, tokens, and API keys.

Secrets allow applications to access confidential data securely without embedding it in container images.

Examples of secret data include:

- database passwords
- API tokens
- TLS certificates


---
## Example Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  password: cGFzc3dvcmQ=
```

Values must be base64 encoded.

Using Secrets in a Pod
```yaml
env:
- name: DB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: db-secret
      key: password

```



---
## Common Commands

Create secret:
```bash
kubectl apply -f secret.yaml
```


View secrets:
```bash
kubectl get secrets
```





---
## Security Considerations

- restrict access using RBAC
- avoid committing secrets to version control
- rotate credentials regularly




---
## Related Resources

- ConfigMaps
- Pods

---