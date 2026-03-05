

# Advanced Kubernetes Part 5: StatefulSets + Headless Services – Running Stateful Apps

So far our nginx app was **stateless** — any Pod could be replaced without losing data.  
Real-world apps like databases (PostgreSQL, MySQL, MongoDB), Kafka, Redis clusters, or ZooKeeper need:
- Stable, unique Pod names (pod-0, pod-1, not random hashes)
- Ordered startup/shutdown (master before replicas)
- Persistent identity for discovery (e.g. pod-0 always has the same DNS)
- Persistent storage that follows the Pod

**StatefulSets** handle this — they are like Deployments but for stateful workloads.

**Headless Services** provide stable DNS entries for each Pod (no load balancing — just direct access).

Pizza chain analogy:  
- Deployment = stateless pizza ovens (replace any oven, no issue)  
- StatefulSet = numbered specialty ovens (oven-0 is the wood-fired one, oven-1 is gas — they must stay in order, clients need to know exactly which oven has their favorite style)

## Goal for this section

Deploy a small PostgreSQL cluster using StatefulSet  
See stable Pod names, ordered rollout, and direct Pod-to-Pod communication via headless Service

(We'll use Bitnami PostgreSQL chart for simplicity — Helm again!)

## Step 1: Make sure Helm is ready

(If not already added:)

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

````


## Step 2: Install PostgreSQL via Helm (creates StatefulSet)

Bash

```
helm install pg-db bitnami/postgresql \
  --set auth.postgresPassword=supersecret \
  --set primary.persistence.enabled=true \
  --set primary.persistence.size=1Gi \
  --set replicaCount=1
```

What this does:

- Deploys a StatefulSet named pg-db-postgresql
- 1 primary + 0 replicas (for simplicity)
- PersistentVolumeClaim for data
- Headless Service pg-db-postgresql-headless
- Password set via values

Check:

Bash

```
kubectl get statefulset
kubectl get pods -l app.kubernetes.io/name=postgresql
kubectl get pvc
kubectl get svc
```

→ See:

- StatefulSet: pg-db-postgresql
- Pod: pg-db-postgresql-0 (stable name!)
- PVC: data-pg-db-postgresql-0
- Headless Service: pg-db-postgresql-headless (clusterIP: None)

## Step 3: Connect & write data

Port-forward to primary Pod:

Bash

```
kubectl port-forward svc/pg-db-postgresql 5432:5432
```

In another terminal, use psql (install if needed: choco install postgresql on Windows, brew install libpq on macOS):

Bash

```
psql -h localhost -U postgres -d postgres
```

Password: supersecret

Inside psql:

SQL

```
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  pizza_type VARCHAR(50)
);

INSERT INTO orders (pizza_type) VALUES ('margherita');

SELECT * FROM orders;
\q
```

→ Data saved.

## Step 4: Test persistence & stable identity

Delete the Pod:

Bash

```
kubectl delete pod pg-db-postgresql-0
```

Watch:

Bash

```
kubectl get pods -w
```

→ StatefulSet recreates pg-db-postgresql-0 immediately (same name!)

Reconnect with psql → data is still there (volume persisted).

Check DNS stability (inside cluster):

Create a temp Pod:

Bash

```
kubectl run -it --rm debug --image=busybox -- sh
```

Inside:

sh

```
nslookup pg-db-postgresql-0.pg-db-postgresql-headless.default.svc.cluster.local
```

→ Resolves to Pod IP — stable identity!

Exit & delete temp Pod.

## Step 5: Cleanup

Bash

```
helm uninstall pg-db
```

→ Deletes StatefulSet, Pods, PVCs, Services (data gone unless PVC retained)

## Key Takeaways

- **StatefulSet** = ordered, stable Pods (pod-0, pod-1…) with persistent identity
- **Headless Service** (clusterIP: None) = DNS for each Pod (pod-0.service-name.namespace.svc.cluster.local)
- Use for databases, Kafka, Redis clusters, ZooKeeper, etc.
- Storage: Always pair with PVCs
- Production: Use operators (Crunchy Postgres, Strimzi Kafka) or cloud-managed (RDS, ElastiCache)

You've now handled stateless **and** stateful workloads — a complete advanced skill set.

→ Final Advanced Part: Wrap-up, Portfolio Tips & What's Beyond