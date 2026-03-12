# StatefulSets

StatefulSets manage stateful applications that require stable identities and persistent storage.

They are commonly used for:

- databases
- distributed systems
- clustered applications

---

## Key Characteristics

| Feature | Description |
|------|------|
| Stable Pod Names | pods keep consistent names |
| Ordered Deployment | pods start sequentially |
| Persistent Storage | each pod gets its own volume |
| Stable Network Identity | predictable DNS names |

---

## StatefulSet Example

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: "mysql"
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8
```

Pod Naming

Pods are named sequentially:
```console
mysql-0
mysql-1
mysql-2
```

---





## Persistent Volume Claims

Each pod receives its own storage:
```console
mysql-data-mysql-0
mysql-data-mysql-1
mysql-data-mysql-2
```

---





## Commands

View StatefulSets:
```bash
kubectl get statefulset
```


Describe:
```bash
kubectl describe statefulset <name>
```


Delete:
```bash
kubectl delete statefulset <name>
```


---