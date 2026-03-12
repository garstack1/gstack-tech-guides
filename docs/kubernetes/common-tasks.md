## List Pods
```bash
kubectl get pods
```


List pods in all namespaces:
```bash
kubectl get pods -A
```


---



## Describe a Resource

Get detailed information about a pod.
```bash
kubectl describe pod <pod-name>
```


Useful for diagnosing:

- scheduling failures
- container crashes
- volume errors

---



## View Pod Logs

View logs from a container.
```bash
kubectl logs <pod-name>
```


If a container has restarted:
```bash
kubectl logs <pod-name> --previous
```


---



## Execute Command in Pod

Open a shell inside a container.
```bash
kubectl exec -it <pod-name> -- /bin/sh
```


For bash shells:
```bash
kubectl exec -it <pod-name> -- /bin/bash
```


---



## Port Forward to Pod

Forward local port to pod.
```bash
kubectl port-forward pod/<pod-name> 8080:80
```


Access the application locally.
```text
http://localhost:8080
```


---



## Restart a Deployment

Force pods to restart.
```bash
kubectl rollout restart deployment <deployment-name>
```


---



## Check Deployment Status

View rollout status.
```bash
kubectl rollout status deployment <deployment-name>
```


---



## Scale a Deployment

Change number of replicas.
```bash
kubectl scale deployment <deployment-name> --replicas=3
```


---


## List Services
```bash
kubectl get services
```


---



## List Persistent Volume Claims
```bash
kubectl get pvc
```


---



## View Cluster Nodes
```bash
kubectl get nodes
```


Show node details.
```bash
kubectl describe node <node-name>
```


---



## Delete a Pod

Delete a pod manually.
```bash
kubectl delete pod <pod-name>
```


Force delete if stuck.
```bash
kubectl delete pod <pod-name> --force --grace-period=0
```


---



## Apply Configuration

Create or update resources.
```bash
kubectl apply -f deployment.yaml
```


---



## Delete Resources from File
```bash
kubectl delete -f deployment.yaml
```


---