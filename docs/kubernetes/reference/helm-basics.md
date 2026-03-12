# Helm Basics

Helm is the package manager for Kubernetes.

It allows applications to be installed using **charts**, which bundle Kubernetes manifests into reusable packages.

---

## Core Concepts

| Concept             | Description                             |
|---------------------|-----------------------------------------|
| Chart               | Package containing Kubernetes resources |
| Release             | Running instance of a chart             |
| Repository          | Collection of charts                    |
| Values              | Configuration overrides                 |

---





## Install Helm

Example installation:

```bash
brew install helm
```

Check version:
```bash
helm version
```

---





## Add a Repository

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```


Update repositories:
```bash
helm repo update
```

---




## Install a Chart

Example:
```bash
helm install my-nginx bitnami/nginx
```

---




## Upgrade a Release
```bash
helm upgrade my-nginx bitnami/nginx
```

---




## Uninstall a Release
```bash
helm uninstall my-nginx
```

---




## Values Example
Override chart configuration:
```bash
helm install my-nginx bitnami/nginx \
  --set service.type=NodePort
```


Or with a values file:
```bash
helm install my-nginx -f values.yaml bitnami/nginx
```

---




## Useful Commands
List installed releases:
```bash
helm list
```


Show chart information:
```bash
helm show chart <chart>
```


Inspect values:
```bash
helm show values <chart>
```
---