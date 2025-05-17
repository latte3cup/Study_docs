DNS 설정의 오류로 보임.
1.  docker image pull python:3.11.6
	Error response from daemon: Get "https://registry-1.docker.io/v2/": dial tcp: lookup registry-1.docker.io on 172.25.208.1:53: read udp 172.25.214.192:53048->172.25.208.1:53: i/o timeout
 - 도커 허브 레지스트리 연결 시도 중 DNS 해석에 오류  172.25.208.1:53 질의 하였으나 타임아웃 
 ---> /etc/docker/daemon.json 에 google dns 8.8.8.8 추가