
#### Kubectl
- kubectl cluster-info : 마스터 클러스터의 정보 확인
- kubectl get nodes : 모든 노드의 정보 확인
- kubectl get pod -o wide : 전역적으로 포드가 어디 노드에서 실행되었는지 까지 확인
- kubectl delete pod \[포드 이름] : 포드 삭제
- kubectl get all : 현재 네임스페이스에 있는 주요 리소스(Pod, Service, Deployment, Replicaset 등)를 한 번에 모두 조회는 명령
- kubectl apply -f \[ymlFileName] : yml 파일로정의된 원하는 상태를 클러스터에 적용 하는 것 (포드 생성 및 배포 등등 )
- kubectl delete -f nginx-test01.yml : `kind: Pod`, `name: nginx-test01`인 리소스를 삭제해달라는 명령
- kubectl create deployment deploy-hello -image = hello-world --replicas= n :  디플로이먼트를 실행, 이때 replicas = n 이므로 포드를 n개 생성
- kubectl get po(pod), rc(replicaset), deploy(deployment)
- kubectl rollout \[subcommand] \[RESOURCE_TYPE/NAME] : 리비전에 대한 명령어 구조
- kubectl exec -it \[podName] -- \[명령] : 이는 포드 내부의 컨테이너에 대해 명령을 줄 때 사용
 --> "--" 가 있는 이유는 이 것이 kubectl의 인자가 아님을 나타내기 위한 경계 구분

#### kubeadm