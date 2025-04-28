Docker  :리눅스의 응용 프로그램 들을 프로세스 격리 기술들을 사용해 컨테이너로 실행하고 관리하는 오픈 소스 프로젝트

#### WSL 과 hyper-v 차이

|구분|Hyper-V|WSL|
|---|---|---|
|주된 목적|완전한 가상 머신|윈도우 안에서 리눅스 실행|
|리눅스 설치|설치 필요 (OS 레벨)|앱처럼 설치 (초경량)|
|시스템 자원|많이 먹음|적게 먹음|
|부팅 속도|느림|매우 빠름|
|가상화 방식|하이퍼바이저 기반|변환 계층(WSL1) / 경량 Hyper-V(WSL2)|
|활용 대상|시스템 엔지니어링, 인프라 테스트|개발자, 가벼운 리눅스 사용|
|Hyper-V 필요성|직접 사용|WSL2는 내부적으로 사용|


#### 도커 사용 방법 (Windows)
1. Docker Desktop
2.  wsl2 에 Docker 설치

|평가 항목|Docker Desktop|WSL2 + Docker Engine|우세|
|---|---|---|---|
|설치 및 구성 편의성|🟢 쉬움|🟡 중간|**Docker Desktop**|
|리소스 효율성|🔴 낮음|🟢 높음|**WSL2 + Docker**|
|성능|🔴 느림|🟢 빠름|**WSL2 + Docker**|
|GUI 편의성|🟢 뛰어남|🟡 기본 CLI만 제공|**Docker Desktop**|
|유연성|🔴 낮음|🟢 높음|**WSL2 + Docker**|
|라이선스 비용|🔴 중견기업 이상 유료|🟢 완전 무료|**WSL2 + Docker**|
|호환성 및 안정성|🟡 보통|🟢 높음|**WSL2 + Docker**|

## 따라서 조금 어렵더라도 WSL2 를 이용한 도커를 사용


### 설치 방법
1. windows cmd --> wsl --install (자동최신)
2. sudo apt update
3. sudo apt install -y ca-certificates curl gnupg lsb-release
4. sudo mkdir -p /etc/apt/keyrings
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
5. echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
6. sudo apt update
7. sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
8. sudo usermod -aG docker $(whoami)
9. sudo service docker start  

% 3. docker 패키지를 Url로 통해 다운하기 위해 패키지를 다운 받음
 - ca-certificates : HTTPS 통신을 위한 SSL 인증서 모음
 - curl : URL 요청을 보내는 패키지
 - gnupg (GNU Privacy Guard) : 공개키 관리 패키지
 - lsb-release :(Linux-standard base 릴리즈) 제공 유틸리티, 즉 우분투 버전에 맞는 패키지 탐색
 % 4. 도커 GPG 공개키 등록
 % 5. 도커 공식 저장소를 apt 저장소 리스트에 등록 , 즉 도커 다운 공식 서버를 관리할 패키지를 리스트에 등록
 % 6. apt 패키지 리스트가 올바른지 확인 하고 업데이트(버전이 맞는지)
 % 7. 설치
 % 8. 도커 서버 확인을 위한 권한 부여