## Employee Attendance System

A beginner-friendly full-stack project using:
Frontend: HTML + CSS + JavaScript
Backend: Node.js + Express
Database: PostgreSQL

## Folder Structure
``` bash
  employee-attendance-system/
│
├── backend/
|   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── db.js
│   ├── .env
│   ├── schema.sql
│   └── routes/
│       └── attendanceRoutes.js
│
├── frontend/
|   ├── Dockerfile
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```
## FINAL TARGET ARCHITECTURE

``` bash
Developer Push Code
        ↓
     GitHub
        ↓
     Jenkins
        ↓
 Docker Image Build
        ↓
 Push to Docker Hub
        ↓
 Update K8s YAML
        ↓
     ArgoCD
        ↓
    Minikube
```

## Install ArgoCD in Minikube

Create namespace:
``` bash
kubectl create namespace argocd
```
# Install:
``` bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
# Check:
``` bash
kubectl get pods -n argocd
```
# Access ArgoCD UI
``` bash
kubectl port-forward svc/argocd-server -n argocd 8081:443
```
# Get ArgoCD Password
``` bash
kubectl get secret argocd-initial-admin-secret \
-n argocd \
-o jsonpath="{.data.password}" | base64 -d
```
# Login:
``` bash
username: admin
password: <output>
```
