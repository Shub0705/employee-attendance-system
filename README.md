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
# ERROR: 
permission denied while trying to connect to the docker API at unix:///var/run/docker.sock
``` bash
sudo usermod -aG docker jenkins  
```
# PART — Secure SonarQube Setup
  ## Create proper directories:
``` bash
mkdir -p sonarqube_data
mkdir -p sonarqube_logs
mkdir -p sonarqube_extensions
```
  # Give permissions:
``` bash
sudo chmod -R 777 sonarqube_data sonarqube_logs sonarqube_extensions  
```

  ## Then run again:
``` bash
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  -v $(pwd)/sonarqube_data:/opt/sonarqube/data \
  -v $(pwd)/sonarqube_logs:/opt/sonarqube/logs \
  -v $(pwd)/sonarqube_extensions:/opt/sonarqube/extensions \
  sonarqube:lts-community
```  
  ## Default login:
  ``` bash
admin
admin
```
## Administration -------->  Webhooks ---------> Create Webhook -------> Add any Name and then add URLhttp://Jenkins:8080/sonarqube-webhook

## Install SonarQube Scanner Plugin 
  ---> Manage Jenkins → Plugins → Available Plugins
        ## Install:
           SonarQube Scanner
  ## Configure Sonar Scanner
Go to:
          Manage Jenkins → Global Tool Configuration
Find:
          SonarQube Scanner
Click:
          Add SonarQube Scanner
Set:
          Name: sonar-scanner

   ## Configure SonarQube Server
Go to:
      Manage Jenkins → Configure System
Find:
      SonarQube servers
Add:
       Name: Sonar_qube
Server URL:
             http://<your-sonarqube-ip>:9000

========================================================================================================================================================


## Install ArgoCD in Minikube

Create namespace:
``` bash
kubectl create namespace argocd
```
## Install:
``` bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
## Check:
``` bash
kubectl get pods -n argocd
```
## Access ArgoCD UI
``` bash
kubectl port-forward svc/argocd-server -n argocd 8081:443
```
## Get ArgoCD Password
``` bash
kubectl get secret argocd-initial-admin-secret \
-n argocd \
-o jsonpath="{.data.password}" | base64 -d
```
## Login:
``` bash
username: admin
password: <output>
```
