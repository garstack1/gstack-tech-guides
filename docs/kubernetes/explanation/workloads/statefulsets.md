
# StatefulSets

A **StatefulSet** is a workload resource designed for applications that require stable identity and persistent storage.

Examples include:

- databases
- distributed systems
- message queues

---

## Why StatefulSets Exist

Standard deployments treat pods as interchangeable.

Stateful applications require:

- stable network identities
- ordered deployment
- persistent storage

StatefulSets provide these guarantees.

---

## StatefulSet Architecture

<div class="mermaid">
flowchart TD

    StatefulSet["StatefulSet"]

    Pod0["Pod<br>database-0"]
    Pod1["Pod<br>database-1"]
    Pod2["Pod<br>database-2"]

    StatefulSet --> Pod0
    StatefulSet --> Pod1
    StatefulSet --> Pod2
</div>

Each pod receives:

- a unique name
- stable storage
- persistent network identity

Example pod names:

- database-0
- database-1
- database-2

Ordered Deployment

StatefulSets create pods in sequence.

<div class="mermaid">
flowchart LR

    Pod0["database-0"] --> Pod1["database-1"] --> Pod2["database-2"]
</div>

If a pod fails, Kubernetes replaces it with the same identity.




---
## Persistent Storage

StatefulSets are typically used with Persistent Volume Claims so that data survives pod restarts.



---
## Key Takeaway

StatefulSets enable Kubernetes to run stateful distributed applications safely.

---