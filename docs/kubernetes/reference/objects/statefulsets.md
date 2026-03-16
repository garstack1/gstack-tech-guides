# StatefulSets

## Description

A **StatefulSet** manages stateful applications that require stable network identities and persistent storage.

Unlike Deployments, StatefulSets provide:

- stable pod names
- ordered pod creation
- persistent storage for each pod

StatefulSets are commonly used for databases and distributed systems.

---
## Key Features

| Feature | Description |
|-------|-------------|
| Stable network identity | Pods have predictable names |
| Persistent storage | Each pod gets its own volume |
| Ordered deployment | Pods start sequentially |



---
## Example StatefulSet

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: database
spec:
  serviceName: database
  replicas: 3
  selector:
    matchLabels:
      app: db
  template:
    metadata:
      labels:
        app: db
    spec:
      containers:
      - name: postgres
        image: postgres
```




---
## Common Commands

View StatefulSets:
```bash
kubectl get statefulsets
```


Describe StatefulSet:
```bash
kubectl describe statefulset database
```




---
## Use Cases

StatefulSets are typically used for:

- databases
- distributed storage systems
- message queues




---
## Related Resources

- Pods
- Persistent Volumes

---