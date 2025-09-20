- [[#AWS Lambda|AWS Lambda]]
- [[#Amazon API Gateway - 서버리스|Amazon API Gateway - 서버리스]]
- [[#Amazon Kinesis|Amazon Kinesis]]
- [[#AWS CloudFront|AWS CloudFront]]
- [[#Amazon Route 53|Amazon Route 53]]


### 애플리케이션 배포


#### AWS Lambda
- 각종 이벤트에 반응해 백엔드 코드를 실행하는 컴퓨팅 리소스를 제공하는 `서버리스` 서비스
- 현재 1ms 단위 요금 부과 + 요청 백만건 부터 부과

##### 서버리스의 조건
1. 인프라 관리 필요성 일절 없음
2. 확장성 : 스케일 업 / 다운 지원 및 가능 해야함. (일반적으로 자동적으로)
3. 내재된 중복 구현성 : 항상 고가용성 유지할 수 있어야 함.
4. 사용량에 따른 과금 : 오직 사용만에만 부과되며 유휴된 어떠한 자원에서는 과금 받지 않음

###### AWS 주요 서버리스 서비스
	- Amazon S3
	- Amazon DynamoDB 
	- Amazon Api Gateway
	- AWS Lambda
	- Amazon SNS and SQS
	- Amazon CloudWatch Events
	- Amazon Kinesis

##### Lambda의 개요
- 가장 단순한 아킻텍처를 보여줌. 이벤트 소스 -> 이벤트 -> 람다 실행 -> 서비스 작동(무엇이든)
- 병렬적으로도 실행가능. 함수 갯수 제한 없음
- Stateless 속성을 가지므로 운영 단순성, 격리된 보안성, 무한확장성, 비용최적화의 장점
- 보통의 프로그래밍 코드를 작성하여 기능 사용 

##### 람다 사용 단계
1. 코드 준비 : 원하는 언어로 함수 코드 작성  
2. 함수에 롤을 추가하거나 함수에 필요한 롤을 생성
3. 함수를 생성한 뒤 Lambda 함수를 호출하기 위한 트리거 추가
4. 실행 및 테스트
5. 모니터링 및 운영

###### Lambda가 지원하는 네이티브 언어
	- java
	- Node.js
	- Python
	- C#
	- Go
	- Powershell
	- Ruby
###### 리소스 용량 제한
| 항목                           | 제한 값                                                   |
| ---------------------------- | ------------------------------------------------------ |
| **메모리 (Memory)**             | 최소 **128 MB** ~ 최대 **10 240 MB (10GB)**, 1 MB 단위 조정 가능 |
| **CPU (vCPU)**               | 메모리 크기에 비례해 자동 할당, 최대 약 **6 vCPU**                     |
| **실행 시간 (Timeout)**          | 기본값 **3초**, 최대 **900초 (15분)**                          |
| **임시 스토리지 (/tmp)**           | 기본 **512MB**, 확장 시 최대 **10GB**                         |
| **환경 변수 (Environment Vars)** | 최대 **4KB**                                             |
| **배포 패키지 (코드 + 라이브러리)**      | ZIP 업로드: **50MB** / S3 업로드: **250MB**                  |
| **Lambda 레이어 (Layer)**       | 함수당 최대 **5개**, 각 레이어는 **50MB** 한도                      |
| **동시 실행 (Concurrency)**      | 기본 **1,000**, 요청 시 증가 가능                               |
| **코드 저장소 총량**                | 리전(Region)당 최대 **75GB**                                |
| **파일 디스크립터/스레드**             | 각 **1,024개** 제한                                        |
| **ENI (VPC 연결 시)**           | 함수당 최대 **500개**                                        |

###### 람다에 적합한 패턴
1. 실시간 파일 데이터 처리
2. 실시간 스트렘 데이터 처리
3. ETL 작업
4. Cron 대체 : 크론식으로 함수 실행 가능
5. Aws Events 처리

---

#### Amazon API Gateway - 서버리스
- WS에서 완전관리형(Managed Service)으로 제공하는 API 게이트웨이. 서버를 직접 띄우지 않고, AWS가 인프라를 운영.
- 백엔드 HTTP  엔드포인트, AWS 람다 함수 또는 기타 AWS 서비스에 연결하기 위한 레스트풀 API 생성, 배포 관리
- 프론트엔드 HTTP 엔드포인트를 통해 외부로 노출된 API 호출 (즉 외부 공개 API)
- API 호출 및 전송된 데이터의 양에 따라 과금 
- 지원하는 API 유형
	1. REST API : 사용량 계획, API 키, API 배포 및 수익화 등 다양한 관리 기능 제공
	2. WebSocket API : 클라이언트와 지속형 연결 유지 기능 제공
	3. Http API : 람다함수 또는 HTTP 백엔드의 프록시 역할을 하는 API 구현에 최적화.
- 장점
	1. 확장성과 관리 효율
		- **완전관리형 서비스**라 서버 인프라 구성 및 확장, 운영체제·보안 패치 관리가 불필요
		- **대규모 동시 호출** 처리: 수백만 건의 API 호출도 효과적으로 처리 가능 
	2. 다양한 인증·보안 기능
		- **IAM 역할(Auth)**, **Lambda Authorizer**, **Amazon Cognito** 등 다양한 인증 방식 지원 
		- **AWS WAF(Web Application Firewall)**로 API에 대한 방화벽 규칙 적용 가능 
	3. 모니터링 및 배포 지원
		- **CloudWatch**를 통한 호출 수, 지연 시간, 오류율 등 다양한 메트릭 모니터링 가능
		- **캔더리(추단계) 배포**를 통해 안전하게 새로운 버전 배포 가능
	4. 비용 및 성능 최적화 (HTTP APIs)
		- HTTP APIs는 **REST APIs보다 비용이 낮고 지연도 짧음**
		- **자동 배포(auto deploy)**, **CORS (Cross-Origin Resource Sharing)** 지원 자동화
	5. 백엔드 통합 유연성
		- AWS Lambda, EC2, ECS, 외부 HTTP 엔드포인트, VPC 내부의 ALB/NLB, Cloud Map 등 다양한 백엔드로 통합 가능
		- 특히 HTTP APIs는 private integration (VPC 환경의 로드밸런서 포함)도 지원
	6. 라이플 사이클 관리
		- 동일한 API의 다양한 버전 관리 가능
	7. Open API 명세서 (Swagger)(2.0) 및 3.0 지원
	8. iOS, Android, JavaScript용  SDK 지원으로 API-Gateway 관리 및 제어가능

--- 
#### Amazon Kinesis
- 대규모 데이터 스트림(초당 수백 MB~GB)을 실시간으로 수집, 저장, 처리할 수 있는 관리형 서비스.
- 로그, IoT 센서 데이터, 클릭스트림, 애플리케이션 이벤트, 비디오 스트림 등 **끊임없이 발생하는 데이터**를 지연 없이 처리.
- 서버 관리 불필요(완전 관리형), 확장성 자동 제공, 다양한 AWS 서비스와 연계.
- 대부분 키네시스가 람다를 트리거함.

##### 실시간 애플리케이션 시나리오
- 배치 분서에서 스트리밍 분석으로 진화 : 데이터 유입하자마자 처리하므로 분석 결과의 최신성 및 신뢰성 상승
- 실시간 애플리케이션 개발 : 거의 중단없는 콘텐츠 제공할수 있도록 도움

##### **주요 서비스 구성**
Amazon Kinesis는 크게 네 가지 서비스로 나뉩니다.

1. **Kinesis Data Streams (KDS)**
    - 초당 대규모 데이터 스트림을 **실시간 수집·저장**. (샤드로서 **스트림에 저장**)
    - 생산자(Producer)가 데이터를 스트림에 넣으면, 소비자(Consumer) 앱이나 Lambda가 데이터를 읽어서 처리.
    - 데이터를 샤드(shard) 단위로 분산 저장해 확장성 확보.
    - 다중 AZ에 복제 저장, 보존기간 24h~356d, **at-least-once(최소 1회 전달 보장)** 모델
    - 병렬 처리 - 여러 컨슈머가 각자 독립적으로 데이터를 읽을 수 있음
    - 스트림의 성능을 동적 스케일링 가능
    - **샤드 관리 필요**
    - **실시간 버퍼**의 역할
    - 예: 클릭 로그, IoT 센서 값, 게임 이벤트 수집.

2. **Kinesis Data Firehose**
    - 스트림 데이터를 자동으로 **다른 저장소(스토리지)로 적재(Load)**.
    - 대상: Amazon S3, Redshift, OpenSearch, Splunk 등.
    - 서버나 코드 작성 불필요, 거의 실시간(몇 초 단위)으로 전송. --> 근실시간 수준
    - 간단한 데이터 변환 및 사용편리성
    - 지속적 관리 필요 없음. 다른 스토리지에 저장되기 때문
    - **저장·적재 파이프라인**의 역할
    - 예: 실시간 로그를 S3에 쌓고 Athena/Redshift로 분석.

3. **Kinesis Data Analytics**
    - 스트림 데이터를 **SQL, Apache Flink**로 실시간 분석.
    - 스트림에서 들어오는 이벤트를 집계·변환·필터링.
    - 샤드의 묶음(하나의 스트림)을 원천으로 SQL, FLink 가 데이터 처리
    - 스트리밍 데이터를 직접 수집·저장하는 엔진이 아니라, **분석/처리**하는 엔진의 역할
    - 예: 실시간 대시보드, . 시계열 분석
    - 이상 탐지(Anomaly Detection) -> 대시보드 및 실시간 경고&알림

4. **Kinesis Video Streams**
    - 실시간으로 들어오는 영상·오디오 스트림을 **AWS가 자동으로 캡처하고 암호화·저장**
    - 멀티 미디어 스트림을 처리
    - IoT 카메라, CCTV, 드론 영상 등에서 발생하는 영상 데이터를 클라우드로 전송.
    - ML(예: Rekognition)과 결합해 객체 탐지, 얼굴 인식 가능. 수백만개의 디바이스로부터 비디오 스트리밍. 실시간 영상 송출 및 라이브 비디오 재생 등

---
#### AWS CloudFront
- 글로벌 CDN(Content Download Network) 서비스
- 저지연성 고속전송 속성을 지닌 콘텐츠 배포 기능을 제공. 
- 엣지로케이션에 네트워크망을 구축하고 지역별 엣지 캐시를 통해  UX 수준 높임
- 사용자가 실제로 요청 및 전송한 데이터에 대한 비용 부담.
- 리전과 CloudFront 엣지 로케잇견 간의 전송 비용은 부담하지 않음
###### 활용처
- 정적 콘텐츠 캐싱 : 사진/영상/스타일시트/Js등 정적 콘텐츠 전송 속도 상승
- 동적 콘텐츠 : EC2 / 앱 등 통합 가능
- DDoS 공격 대응 및 강화된 보안성 : CloudFront는 기본 TLS/Signed Url에 , 보안 레이어 3, 4 ,7에  보호가능한 AWS Shield , AWS WAF 와 통합해 보안 기능 제공
- API 호출 가속화 : API - Gateway 와 통합해 API 호출 가속화 . vmfhrtl aptjem wldnjs
- 소프트웨어 배포
- 비디오 스트리밍

##### CloudFront 핵심 개념
- 엣지 로케이션(Edge Location) : 글로벌 데이터 센터 네트워크. 세계 주요 대도시에 위치. 리전과 위치가 다를 수 있음
- 지역별 엣지 캐시 : 오리진 웹 서버와 엣지 로케이션 사이에 위치해 사용자에게 직접 콘텐츠 전송
  자주 사용하느냐에 따라 캐싱 유지 기간이 달라짐
- 배포 : 원본 파일의 위치를 나타내는 CLoudFront 경로로, CloudFront.net 도메인 네임으로 표시되며, 글로벌 엣지로케이션에서 사용자의 객체 참조 시 사용할 수 있음. 
  => CDN 동작을 위한 설정 패키지
- 오리진 : CloudFront가 가져올 원본 서버 (EC2, S3, ALB, API-gateway, 외부 Http 서버 등)
- 제어 동작(Behaviors) - 캐시 동작(Cache Behavior)” : **라이언트 요청이 들어왔을 때 CloudFront가 어떤 오리진을 선택하고, 어떻게 캐싱·보안·라우팅을 적용할지**를 정의하는 설정
  CDN과 관련된 정책의 허용, 요청 타입에 따른 반응 변경, 객체의 캐싱 기능 조절 등 CloudFront의 세부적인 제어 동작을 의미

#### 주요 제어 동작
1. 경로 패턴 매칭(Path Pattern Matching) 
	- URL 경로에 따라 캐시 제어 동작 설정
	- 경로 패턴에 따라 Http/s 프로토콜 설정, 헤더 또는 캐싱 옵션, 쿠키 및 쿼리 문자열, 접근제한 등의 방식으로 특정 오리진으로 요청을 전송함.
2. 헤더
	- 헤더 값을 통해 요청 헤더를 오리진 캐시로 포워딩하여 동작을 적용 시킬 수 있음
3.  쿼리 문자열 및 쿠키
	- 쿼리 스트링과 쿠키를 통해 다른 캐싱 콘텐츠 제공
4.  서명 URL 및 서명 쿠키
	- 만료일 및 만료시간, 개별 리소스 제한, 특정 IP 범위 접근 제한 등 조건부 접근 (여기에 지역 제한 가능)에 대한 내용을 URL이나 쿠키에 담아 클라이언트는 접속하고 CloudFront는 해당 정보를 검증하여 제어
	- 보통 서명 URL 및 서명 쿠키 사용할떄 콘텐츠즐 즐기는 URL과 콘텐츠를 접근하는 URL을 분리하여 운영
5. 프로토콜 정책 : HTTP/ HTTPS 구별하게함.
6. 유지시간 : TTL을 통해 엣지 캐시가 유지되는 시간 설정.
7. gzip 압축 : 배포 설정시 자동 gzip 압축을 적용하여 대역폭 절감, 속도 향상, 오리진 부하 감소 가능
#### 배포 방식
##### 1. 배포 유형 (Distribution Type)
현재 CloudFront에서는 사실상 **웹 배포(Web Distribution)** 방식만 사용합니다.
- **웹 배포 (Web Distribution)**
    - 정적 파일 (HTML, CSS, JS, 이미지 등)
    - 동적 콘텐츠 (API 응답, GraphQL, JSON 등)
    - 미디어 스트리밍 (HLS, DASH)
    - 가장 일반적인 형태
- **RTMP 배포 (Deprecated)**
    - 과거 플래시 기반 스트리밍용 (RTMP 프로토콜)
    - 현재는 지원 중단 → 웹 배포로 HLS/DASH를 사용
 따라서 현재는 **웹 배포 하나로 모든 사용 사례(정적·동적·스트리밍)를 처리**
##### 2. 콘텐츠 제공 방식
###### 🔹 Pull 방식 (일반적)
- 사용자가 요청하면 CloudFront 엣지가 **오리진에서 가져와 캐시에 저장** 후 전달.
- 다음 요청부터는 엣지 캐시에서 바로 응답.
- 예:
    - 오리진: S3, ALB, EC2, API Gateway
    - CloudFront가 필요할 때만 가져와서 캐시 → **Lazy Loading**
###### 🔹 Push 방식 (사전 캐싱, Pre-populate)
- CloudFront는 기본적으로 Pull 방식이지만, 관리자가 **Invalidation(무효화)**, **Lambda@Edge**, 또는 **사전 Warm-up 요청**을 통해 캐시를 미리 채울 수도 있음.
- 사용자가 처음 접근하기 전에 캐시에 담아두는 전략.
- 대규모 이벤트/신제품 발표처럼 초기 트래픽이 폭발할 때 활용.

###### 오류처리 기능
- 콘텐츠 요청에 대해 오리진 서버가 400 , 500번대의 상태 코드 반환시 클라우드 프론트에서 커스텀 오류페이지 반환 가능. TTL을 정의해 캐시 오류도 유지 시킬 수 있음.

---
#### Amazon Route 53
- 고가용성·확장성 있는 관리형 DNS 서비스
- **도메인 등록 → DNS 라우팅 → 상태 확인(Health Check)** 까지 하나로 통합해 제공

##### DNS 지원 타입
| 레코드 타입    | 풀네임                                   | 설명                                                     | 예시                                      |
| --------- | ------------------------------------- | ------------------------------------------------------ | --------------------------------------- |
| **A**     | Address                               | 도메인 → IPv4 주소 매핑                                       | `example.com → 192.0.2.1`               |
| **AAAA**  | Quad A (IPv6 Address)                 | 도메인 → IPv6 주소 매핑                                       | `example.com → 2001:db8::1`             |
| **CNAME** | Canonical Name                        | 별칭 도메인 → 실제 도메인 매핑                                     | `www.example.com → example.com`         |
| **Alias** | (AWS 전용)                              | AWS 리소스(CloudFront, ALB, S3 등)에 직접 매핑. 루트 도메인에서도 사용 가능 | `example.com → CloudFront 배포`           |
| **MX**    | Mail Exchange                         | 메일 서버 지정                                               | `example.com → mail.example.com`        |
| **TXT**   | Text                                  | 텍스트 정보 저장 (SPF, DKIM, 도메인 검증)                          | `"v=spf1 include:amazonses.com ~all"`   |
| **NS**    | Name Server                           | 도메인의 권한 네임서버 지정                                        | `ns-123.awsdns-45.org`                  |
| **PTR**   | Pointer                               | IP → 도메인 이름 매핑 (역방향 조회)                                | `192.0.2.1 → example.com`               |
| **SRV**   | Service Locator                       | 특정 서비스(프로토콜, 포트) 위치 지정                                 | `_sip._tcp.example.com`                 |
| **SOA**   | Start of Authority                    | 존의 기본 정보(관리자, 시리얼 번호 등)                                | 자동 생성됨                                  |
| **CAA**   | Certification Authority Authorization | 어떤 인증 기관(CA)이 SSL/TLS 인증서 발급 가능할지 지정                   | `example.com. CAA 0 issue "amazon.com"` |
| **SPF**   | Sender Policy Framework               | 이메일 발송 권한 서버 지정 (보통 TXT 레코드로 구현됨)                      | `"v=spf1 include:amazonses.com -all"`   |
| **NAPTR** | Naming Authority Pointer              | 다른 레코드(SRV 등)로 라우팅. VoIP, ENUM 같은 서비스에 사용              | `_sip._udp.example.com → SRV`           |
##### Zone Apex (루트 도메인 ) : 도메인의 최상위 주소로서 RFC 규약상 CNAME이 안됨. 따라서 Alias를 사용하면 가능

##### 헬스 체크
- 헬스 상태가 좋은 리소스만을 활용. 나쁜 리소스를 체크하고 좋은 리소스로 트래픽을 유도함(Failover)
- 따라서 반드시 가용성을 확보해야함. 우회할 리소스가 없으면 서비스 중단됨.

##### - 헬스 체크 방식
1) 엔드포인트 헬스 체크
	- 특정 리소스(웹 서버, API, ALB 등)를 직접 모니터링.
	- 프로토콜: **HTTP, HTTPS, TCP** 지원.
	- 설정 가능한 것:
	    - 체크 경로 (예: `/health`)
	    - 정상 응답 코드 범위 (2xx, 3xx 등)
	    - 간격 (30초 또는 10초 고속 체크)
	    - 실패 허용 횟수 (예: 3번 연속 실패 시 비정상 판정)
2) CloudWatch 알람 기반 헬스 체크
	- 직접 엔드포인트에 접근하지 않고, **CloudWatch 지표/알람**을 기반으로 상태 판정.
	- 예: EC2 CPU 사용률, ELB 상태 지표 등을 기준으로 헬스 체크.
3) 다른 헬스 체크 상태를 종합 (Calculated Health Check)
	- 여러 개의 헬스 체크 결과를 조합해서 최종 상태를 계산.
	- 예: “헬스 체크 A와 B가 둘 다 정상일 때 Healthy” 같은 조건 설정 가능.

##### - Route 53 라우팅 정책
1. Failover 라우팅 + 헬스 체크
	- **구조**: Primary 리소스 + Secondary 리소스
	- **동작**:
	    1. Primary(서울 ALB)에 트래픽을 보냄
	    2. 헬스 체크 실패 시 Secondary(도쿄 ALB)로 자동 전환
	- **사용 사례**:
	    - DR(재해 복구) 아키텍처
	    - “장애 나면 백업 리전에 자동 전환” 구조
👉 장점: 고가용성 확보  
👉 단점: 평소 Secondary 리소스는 놀고 있다가 장애 시에만 사용 (비용/효율성 낮음)

2. Latency 기반 라우팅 + 헬스 체크
	- **구조**: 여러 리전에 배포된 리소스 (서울, 도쿄, 오하이오 등)
	- **동작**:
	    1. 클라이언트의 지연 시간(Latency)이 가장 낮은 리전에 우선 연결
	    2. 해당 리전 헬스 체크 실패 시, 자동으로 다른 건강한 리전으로 우회
	- **사용 사례**:
	    - 글로벌 서비스 (동영상 스트리밍, API 서비스)
	    - 사용자 위치에 따라 최적의 리전으로 연결하면서 장애 시 우회
	👉 장점: 빠른 응답 + 고가용성  
	👉 단점: 리전마다 인프라 중복 배포 필요 → 비용 증가

3. 가중치 기반 라우팅 + 헬스 체크  
	- **구조**: 여러 서버(또는 리전)에 가중치 설정 (예: A=70%, B=30%)
	- **동작**:
	    1. 트래픽을 비율대로 분산 (부하 테스트, 신규 버전 Canary 배포 가능)
	    2. 특정 서버가 헬스 체크 실패 시 → 자동으로 대상에서 제외
	- **사용 사례**:
	    - 신규 버전 서비스 점진 배포 (Canary Release, Blue/Green 배포)
	    - 특정 서버/리전에 일부 트래픽만 보내는 실험
	👉 장점: 점진적 배포, 리스크 완화  
	👉 단점: 가중치 설계가 잘못되면 트래픽 불균형 발생
	
4. 지리적 라우팅 (Geolocation Routing)
	- **기준**: 클라이언트의 **IP 기반 국가/대륙/특정 지역**
	- **동작**:
	    - 한국 사용자 → 서울 리전 ALB
	    - 미국 사용자 → 오하이오 리전 ALB
	- **사용 사례**:
	    - 법적 제약(저작권, 규제) 때문에 국가별 콘텐츠 분리
	    - 지역별 가격 정책 (예: KR 가격, US 가격)
	    - 특정 지역 사용자만 접근 허용 (Geo Restriction)
	👉 특징: **정확한 지리 기반 제어 가능**.  
	👉 단점: VPN으로 쉽게 우회 가능.

5. 지리 근접 라우팅 (Geoproximity Routing, Traffic Flow 전용)
	- **기준**: 클라이언트와 리소스 간의 **위치 + 가중치 조정**
	- **동작**:
	    - 기본적으로 가까운 리전에 트래픽 보냄
	    - 관리자가 특정 리전에 더 많은 트래픽을 강제로 보낼 수도 있음 (bias 조정)
	- **사용 사례**:
	    - 리전 간 인프라 비용 최적화
	    - 글로벌 서비스에서 특정 리전에 부하 분산 조정
	👉 특징: Latency 라우팅과 유사하지만, 지리학적 위치를 기준으로 하고 관리자가 **의도적으로 비율 조정 가능**.
###### **Route 53 Traffic Flow**는 **Route 53 라우팅 정책들을 시각적으로 설계·관리할 수 있는 서비스**

---
#### AWS 웹 어플리케이션 방화벽 (WAF)
- 보안 침해 자체가 데이터 침탈, 시스템 성능 저하, 과도한 리소스 문제로 이어지므로 WAF로 커스텀한 보안 규칙 정의로 웹을 보호한다.
- 용도
	1. 침해 시도 보호 : SQL 주입, XSS 로부터 보호/ 리소스 및 애플리케이션 단위로 적용 가능
	2. 악성 요청 대응 : 웹 크롤러등 봇에 대한 데이터 침탈 시도 방지
	3. DDoS 공격 방어 : 보안 규칙에 따라 대응
- WAF는 CloudFront와 통합해 CDN의 배포 용량과 확장성을 늘릴 수 있음. 이로써 오리진 서버의 로딩 시간 단축, 트래픽 증가에 대응, CDN의 SPOF 문제를 극복 가능
- ALB와 통합해 오리진 웹서버를 보호 가능
- WAF는 7계층 수준의 보호를 수행함.
- 보안 규칙 종류
	1. 일반 규칙 (Normal Rule)
		- 요청이 들어올 때 **조건(Condition)** 을 기준으로 즉시 매칭해서 동작합니다.
		- 예시:
		    - 특정 IP 차단 (IPSet)
		    - URI 경로 `/admin` 차단 (String match)
		    - SQL Injection 시도 차단 (AWS Managed Rule)
		- 액션: Allow / Block / Count / Captcha 등
		- 특징: **단일 요청 기준으로 필터링**
		👉 예를 들어, `/admin` 페이지로 들어오는 요청은 무조건 차단 같은 방식.
	2. 비율 규칙 (Rate-based Rule)
		- **특정 조건을 만족하는 요청 수를 일정 기간(5분 단위) 동안 집계**합니다.
		- 설정한 임계치(Rate Limit)를 초과하면 차단.
		- 예시:
		    - “5분 동안 동일한 IP에서 2000회 이상 요청 시 차단”
		    - “짧은 시간 안에 폭발적으로 들어오는 API 요청 차단”
		- 액션: Block / Count
		- 특징: **과도한 요청(DoS 스타일 공격, 봇 트래픽)을 탐지/차단**에 적합
		👉 예를 들어, 로그인 API에 대해 같은 IP가 5분간 1000번 이상 요청하면 자동으로 차단.

- WAF의 리소스는 API(CLI,SDK 등)로 관리할 수 있으며, 리스트에 IP를 추가하는 등의 모든 보안 규칙 작업을 API로 처리 가능
- Cloudwatch로 WAF의 실시간 처리 결과를 1분 메트릭스로 확인 및 모니터링 가능

--- 
#### Amazon Sheild
- DDoS(분산 서비스 거부 공격, Distributed Denial of Service) 방어 서비스

#####  1.  AWS Shield Standard
- **모든 AWS 고객에게 자동 제공, 무료**
- L3/L4 계층의 일반적인 DDoS 공격을 완화
- 예: SYN Flood, UDP Reflection, DNS Query Flood 등
- CloudFront, Route 53, ALB, Global Accelerator 같은 **엣지 서비스**에 자동 적용
##### 2. AWS Shield Advanced (유료, 엔터프라이즈급)
- 더 강력한 보호 및 운영 지원 제공
- 기능:
    1. **확장된 DDoS 방어** (대규모 공격, 애플리케이션 계층 L7 공격 포함)
    2. **AWS DRT (DDoS Response Team)** 24/7 지원
    3. **비용 보호**: DDoS로 인한 확장 비용(예: Auto Scaling, CloudFront 데이터 전송료) 보상
    4. **세밀한 탐지/대응**: CloudWatch 지표, 경보와 통합
    5. **다른 보안 서비스와 통합**: WAF, Firewall Manager와 연계

---
#### Amazon SQS (Simple Queue Service)

- 클라우드 기반 애플리케이션 설계 및 기존 애플리케이션을 클라우드로 마이그레이션할 때 가장 큰 과제는 , **클라우드의 고분산성**을 구현
- 분산시스템 구현을 위해 CAP 이론, 분산 트랜잯ㄴ, 분산 디자인 패턴 적용 필요
- 메시징 기법 -> 비동기성 , 확장성 , 결합도 감소, 내결함성 

※ CAP 이론 : 분산 시스템 설계에서 반드시 고려해야하는 세가지 속성을 설명
1. 일관성 (**C**onsistency) : 모든 노드가 같은 시점에 동일한 데이터를 보여주며 최신 상태 보장
2. 가용성 (**A**vailability) : 노드 일부가 고장 나도 항상 요청에 응답.
3. 분할 내성(**P**artition Tolerance) : 네트워크가 끊어지 일부 노드들이 서로 통신 없는 상황에도 시스템이 계속 동작
-->  이론적으로 CAP 모두를 만족할 수 없다는 것이 이론. + P는 항상 일어나므로 C와 A 중 선택

##### 그래서 SQS는 무엇인가
- **완전 관리형 메시지 큐 서비스**
- AWS가 메시지 저장, 중복 제거, 장애 복구, 확장을 모두 책임짐
- 사용자는 **큐를 생성하고 Producer/Consumer를 연결만 하면 됨**.
- 메시지는 기본적으로 **비동기적(Asynchronous)** 으로 처리

##### SQS 주요 기능
###### 1. 큐 타입 선택
- **표준 큐(Standard Queue)**
    - 무제한 처리량.
    - 메시지 중복 가능, **순서는 보장하지 않음**. but, Best-effort Ordering.
    - 대부분의 MSA에서 기본적으로 사용.
- **FIFO 큐(First-In-First-Out Queue)**
    - 메시지 순서 보장.
    - 중복 제거(Deduplication) 가능.
    - 처리량은 제한적이지만 금융·결제 시스템처럼 순서가 중요한 곳에 적합.
    - 초당 300회의 처리량 제한
    - Message Group ID, Message Deduplication ID 개념 숙지
###### 2. 메시지 보관과 전달
- **멀티 AZ 분산 저장**: 메시지를 여러 가용 영역에 자동으로 복제. --> 가용성 확보
- **Visibility Timeout**: Consumer가 메시지를 가져간 후 일정 시간 동안은 다른 Consumer가 동일 메시지를 가져가지 않도록 보호.
- **메시지 보관 기간**: 1분 ~ 14일 설정 가능. (기본 4일)
- 최대 메시지 크기 : 최소 1KB ~ 최대 256KB
###### 3. 확장성과 성능
- **자동 확장**: 트래픽이 몰려도 큐가 자동으로 확장됨.
- **무제한 메시지 처리**: 표준 큐 기준 TPS(초당 처리량) 제약 없음.
- **짧은 지연 시간**: 일반적으로 수십 ms 이내.
###### 4. 오류 처리 기능
- **Dead Letter Queue(DLQ)**
    - 지정 횟수 이상 처리(1번 실패로 끝나지 않음)에 실패한 메시지를 별도 큐에 저장.
    - 지정 횟수는 1~1000번 까지 지정 가능
    - 장애 원인 분석 및 재처리 가능.
- **Delay Queue**
    - **메시지 전달을 일정 시간 지연시킬 수 있음. (최소 0초 ~ 최대 15분)** 
###### 5. 보안 및 제어
- **IAM 기반 권한 관리** → 특정 사용자/서비스만 큐 접근 가능.
- **암호화 지원**
    - 전송 중 암호화(SSL/TLS).
    - 저장 시 암호화(AWS KMS).
- **메시지 속성(Message Attributes)** → 메타데이터 추가 가능 (예: 타입, 우선순위).
###### 6. 통합과 연계
- **SNS 연동**: Pub/Sub 패턴 구현 가능. (SNS → 여러 SQS)
- **Lambda 트리거**: 메시지를 소비할 때 서버리스 함수 자동 실행.
- **CloudWatch 모니터링**: 큐 길이, 처리 실패 횟수 등 실시간 모니터링.

| 구분     | **숏 폴링(Short Polling)** | **롱 폴링(Long Polling)**       |
| ------ | ----------------------- | ---------------------------- |
| 응답 방식  | 즉시 응답                   | 메시지 있을 때까지 대기(최대 20초)        |
| 비용     | 호출이 많아져 비용 증가           | 호출 횟수 줄어 비용 절감               |
| 메시지 처리 | 놓칠 수 있음 (즉시 응답으로 빈손 가능) | 안정적으로 메시지 수신                 |
| 적합한 상황 | 테스트, 메시지가 항상 많은 경우      | 대부분의 운영 환경, 메시지가 간헐적으로 오는 경우 |

----
#### Amazon SNS (Simple Notification Service)
- **퍼블리시/구독(Pub/Sub) 방식의 관리형 메시징 서비스**.
- 하나의 Producer가 보낸 메시지를 **여러 Consumer에게 동시에 전달** (배포) 
- Consumer는 SQS, Lambda, HTTP 엔드포인트, 이메일, SMS 등 다양
👉 즉, SNS는 **이벤트를 한 번 발행하면 여러 곳으로 동시에 뿌려주는 역할**

#####  동작 구조
1. **Topic 생성**
    - 이벤트를 발행할 주제(Topic)를 만듭니다.
2. **Subscriber 등록**
    - SQS 큐, Lambda 함수, 이메일, HTTP 엔드포인트 등을 Topic에 구독시킵니다.
3. **Publish** 
    - Producer가 Topic에 메시지를 발행(Publish)합니다.
    - 이건 단순히 메시지를 SNS에 등록한 것
4. **Fan-out**
    - SNS가 메시지를 모든 Subscriber에게 동시에 전송합니다.
##### 주요 특징
- **Fan-out 분배**
    - 동일한 메시지를 여러 Consumer가 각자 독립적으로 받음.
- **다양한 프로토콜 지원**
    - SQS, Lambda, HTTP/S, 이메일, SMS(크기 크면 분할 전송).
- **확장성 & 내결함성**
    - 다중 AZ 저장 → 메시지 유실 위험 최소화.
    - CloudWatch로 모니터링
- **실시간 푸시** 및 지연 가능
    - 메시지가 들어오는 즉시 Subscriber에게 전달.
---

#### AWS Step Function & Amazon Simple Workflow(SWF)
- AWS Step Functions는 시각화된 워크플로우를 통해 분산 애플리케이션 및 마이크로 서비스 컴포넌트의 관리를 톱는 완전 관리형 서비스.
- SWF를 대체하기 위해 Step Fuction이 만들어짐
- 완전 관리형 서버리스 서비스
- 개발자는 비즈니스 단계만 정의하고 실행/에러처리/재시도는  Step Functions가 관리
- **스테이트 머신**이 단계와 단계간의 전환을 정의에 따라 특정 동작을 수행

| 타입(Type)     | 역할 (무슨 일을 하는지)                                                 | 특징 / 주의할 점                                                    |
| ------------ | -------------------------------------------------------------- | ------------------------------------------------------------- |
| **Task**     | 실제 작업(Task)을 실행                                                | Lambda 실행, AWS 서비스 API 호출, 외부 HTTP 호출 등. 작업 결과를 받아 다음 상태로 넘김. |
| **Choice**   | 조건 분기                                                          | 입력값(Input)을 보고 여러 분기(branch) 중 하나를 선택. 예: if / else 같은 역할.    |
| **Wait**     | 지연 시간을 주거나 특정 시점까지 대기                                          | 일정 시간(seconds) 혹은 날짜/타임스탬프까지 기다리는 용도. 흐름 제어용.                 |
| **Parallel** | 병렬(branch) 실행                                                  | 여러 흐름(분기)을 동시에 실행 가능. 각 병렬 흐름 끝나면 다시 합침.                      |
| **Map**      | 컬렉션(Collection)의 각 원소(item)에 대해 동일한 하위 상태(sub-workflow)를 반복 실행 | 리스트 같은 데이터를 각각 처리할 때 유용. 반복(iteration) 구조.                    |
| **Pass**     | 입력을 그대로 통과시키거나 일부 필터/추가 작업만 수행                                 | 작업을 실행하진 않음. 흐름 중간에 흐름 구조 유지하거나 데이터 변형(예: 상수 넣기) 용도           |
| **Succeed**  | 워크플로우를 정상 종료                                                   | 흐름이 성공적으로 완료됨을 나타냄. Next 상태 없음                                |
| **Fail**     | 워크플로우를 실패 상태로 종료                                               | 오류나 실패 처리할 때 사용. 종료 상태.                                       |
여기서 병렬 상태는 정의된 모든 브랜치가 성공해야 다음 상태로 넘어갈 수 있음

###### SWF는 Ec2 위에서 동작함
---
#### AWS Elastic Beanstalk
- **애플리케이션을 쉽게 배포·관리할 수 있는 PaaS(Platform as a Service)**.
- 사용자가 코드만 업로드하면, 자동으로 **EC2, 로드밸런서, 오토 스케일링, 모니터링** 등을 설정x
- 개발자는 인프라를 직접 설계하지 않고도 빠르게 애플리케이션을 운영
👉 즉, **“코드만 올리면 나머지는 AWS가 알아서”** 해주는 서비스.
- Beanstalk는 실행 환경, 애플리케이션 버전, 저장 환경 설정 등 3가지 핵심 요소로 구성
```Application (최상위 단위)
		 ├── Application Versions (코드 패키지, S3 저장)
		 └── Environments (실행 단위)
		        ├── Web Server Environment (HTTP 요청 수신)
		        │     └── EC2 + Auto Scaling + Load Balancer
		        ├── Worker Environment (백그라운드 작업 수행)
		        │     └── EC2 + Auto Scaling + SQS
		        ├── Environment Configuration (환경 설정 - 리소스 설정)
		        ├── Saved Configuration (설정 템플릿)
		        └── Platform (OS + Runtime + 서버)
```
- 어떻게 보면 AWS 식 Terraform 이라 생각하면 편함 (관리 자유도가 떨어지는) -- 자동화 중심

##### 작동 순서
작성 코드 -> 리전 -> 스택  -> 환경 생성(인프라) -> RDS -> 배포 완료 및 헬스체크

---
#### AWS  OpsWorks
- **구성 관리(Configuration Management) 서비스**.
- Chef와 Puppet 같은 오픈소스 자동화 툴을 AWS에서 관리형으로 제공.
- 인프라 서버 설정, 애플리케이션 배포, 패키지 설치, 업데이트, 모니터링 등을 코드로 관리
- 테라폼(=하드웨어 레벨) 과 유사한 IaC 기반 서비스
- 하지만 테라폼은 인프라 리소스 중심이라면 , Ops Work는 **서버 구성 관리** 중심
- 즉 소프트웨어 레벨의 Iac 임. (패키지, 설정 등)

##### OpsWorks 구조
 **Stacks → Layers → Instances → Apps** 구조
1. **Stack (스택)**
    - 하나의 애플리케이션 시스템 전체를 표현.
    - 예: “전자상거래 웹서비스 Stack” (웹, 앱, DB 포함).
2. **Layer (레이어)**
    - 스택 안에서 역할별 그룹.
    - 예: Web Layer (Apache/Nginx), App Layer (애플리케이션 서버), DB Layer (MySQL).
3. **Instance (인스턴스)**
    - 각 레이어에서 실제 실행되는 EC2 인스턴스.
    - 레이어에 속한 인스턴스는 Chef/Puppet 레시피에 따라 자동 설정됨.
4. **App (애플리케이션)**
    - 스택에 배포되는 실제 앱 코드.
    - Git, S3, HTTP 서버 등에서 가져와 배포.

##### OpsWorks 도구
- **OpsWorks Stacks** → Chef Solo 기반, AWS 특화 간단 배포
- **OpsWorks for Chef Automate** → Chef 서버 완전 제공
- **OpsWorks for Puppet Enterprise** → Puppet 서버 완전 제공

---
#### Amazon Cognito
- **사용자 인증(Authentication), 권한 부여(Authorization), 사용자 관리(User Management)를 제공하는 AWS 서비스**
##### 주요 기능
1. **사용자 풀(User Pool)**
    - 자체 회원가입/로그인 시스템을 구축할 수 있는 기능.
    - 이메일, 전화번호, 소셜 로그인(Google, Facebook, Apple 등) 모두 지원.
    - 다중 요소 인증(MFA, Multi-Factor Authentication)과 비밀번호 정책 설정 가능.
2. **자격 증명 풀(Identity Pool)**
    - 인증된 사용자에게 **AWS 리소스 접근 권한**을 부여하는 기능.
    - 예: 로그인한 사용자가 S3 버킷에서 특정 파일을 다운로드하거나, DynamoDB를 읽도록 권한을 제한할 수 있음.
    - IAM(Identity and Access Management)과 연동되어 세밀한 권한 제어 가능.
3. **토큰 기반 인증**
    - OpenID Connect(OIDC), OAuth 2.0, SAML 같은 표준 프로토콜 지원.
    - 로그인 성공 시 JWT(JSON Web Token)를 발급하여 API Gateway, Lambda 등과 안전하게 연동.
4. **확장성 및 보안**
    - 수백만 사용자까지 자동 확장 가능.
    - 데이터는 AWS의 보안 기준에 맞춰 저장.
    - 기업용 서비스에서는 중앙 인증 시스템과 통합(SAML, AD, Okta 등) 가능.

---
#### Amazon Elastic MapReduce (EMR) - 서버리스 아님
- 대규모 데이터 처리와 분석을 위한 클라우드 기반 분산 처리 서비스
- **파치 하둡(Apache Hadoop)**, **아파치 스파크(Apache Spark)**, **아파치 하이브(Apache Hive)** 같은 오픈소스 빅데이터 프레임워크를 AWS에서 손쉽게 사용할 수 있도록 관리형으로 제공
##### 핵심 개념
1. **클러스터(Cluster)**
    - 여러 대의 EC2 인스턴스로 구성된 분산 환경.
    - 마스터 노드, 코어 노드, 태스크 노드로 구분되어 역할을 나눔.
2. **작업(Job / Step)**
    - 데이터를 분석·처리하기 위해 제출하는 실행 단위.
    - Spark SQL, Hive 쿼리, MapReduce 작업 등을 올려 실행할 수 있음.
3. **데이터 저장소 연동**
    - Amazon S3와 긴밀히 통합 → Data Lake 형태로 원천 데이터를 S3에 두고 처리.
    - HDFS(Hadoop Distributed File System) 대신 S3를 주로 사용.

---
#### AWS CloudFormation
- 인프라를 코드로 정의(IaC, Infrastructure as Code)** 하여 자동으로 생성·관리할 수 있게 해주는 서비스
##### 핵심 개념
1. **템플릿(Template)**
    - JSON 또는 YAML 파일.
    - 어떤 AWS 리소스를 만들지(EC2, S3, IAM 등), 속성은 무엇인지 정의.
2. **스택(Stack)**
    - 템플릿을 실제로 배포한 결과.
    - 스택 단위로 배포·수정·삭제 관리
    - 예: `web-app-stack` 이라는 이름의 스택이 VPC, EC2, RDS를 한꺼번에 포함.
3. **변수와 파라미터(Parameter)**
    - 같은 템플릿을 여러 환경(dev, staging, prod)에서 재사용 가능.
    - 예: EC2 인스턴스 타입을 파라미터화해서 환경별로 다르게 배포.
4. **드리프트 감지(Drift Detection)**
    - 코드와 실제 인프라 상태가 달라졌는지 확인.
    - 사람이 콘솔에서 수동으로 바꿨을 때도 감지 가능.
##### 주요 기능
- **자동화**: 인프라 배포를 클릭 몇 번이 아니라 코드 한 번으로 수행.
- **일관성**: 동일한 템플릿으로 여러 리전/계정에 같은 환경 생성.
- **버전 관리**: 템플릿을 Git 등 소스코드처럼 관리 가능.
- **통합성**: AWS 대부분 서비스와 호환, CI/CD 파이프라인에도 쉽게 연결.

테라폼과 기능적은 완전 거의 동일. 테라폼의 상태 파일 + 코드 집합이 AWS CloudFormation의 스택 역할을 하는 것.

---
부록
AWS 리소스 : **클라우드에서 생성·관리·감시·청구되는 개체**로 이해
- 특히 운영 관점에서 모든 리소스 변경은 **제어면(Control Plane) API 호출**로 기록
- **AWS 클라우드트레일(AWS CloudTrail)** 이 이 호출 내역(누가, 언제, 어디서, 무엇을)을 수집하여 S3/CloudWatch Logs로 전달

---

### AWS 모니터링 서비스


#### AWS CloudWatch
- 모든 AWS의 리소스를 모니터링 하기 위한 서비스
- 일종의 **중앙 모니터링 플랫폼**.
- 지표(Metric), 로그(Log), 이벤트(Event)를 수집하고 대시보드로 시각화.
- 알람을 걸어 임계치 초과 시 알림(SNS)이나 자동 조치 수행.
- CloudWatch = **Metrics + Logs + Events + Alarm + Dashboard**
- 주요기능
	1. CloudWatch Metrics : 
		- AWS 서비스 기본 지표 제공 + Custom Metrics로 애플리케이션 데이터도 전송 가능
		- 기본적으로 표준 모니터링 시간 단위는 1분. 1초까지 임의 조정 가능 (특정 서비스 제외)
		```
			- **1초 ~ 1분 단위 데이터**: 15일 보존
			- **5분 단위 집계 데이터**: 63일 (약 2개월) 보존
			- **1시간 단위 집계 데이터**: 455일 (약 15개월) 보존 
		```
	2. CloudWatch Logs :
		- EC2, Lambda, API Gateway, CloudTrail, 애플리케이션 로그 수집 
		- Logs Insights로 SQL 같은 쿼리로 대화형 분석 가능
	3. CloudWatch Events (이제 EventBridge로 확장됨)
		- 리소스 상태 변화 이벤트 감지.
		- 특정 패턴에 맞춰 Lambda 실행, Step Functions 시작 가능.
	4. **CloudWatch Alarms**
		- 특정 지표 조건 만족 시 알람 발생.
		- 예: “EC2 CPU > 80% for 5 minutes” → Slack 알림 또는 Auto Scaling 실행.
			- OK -> 성능 지표가 정의된 기준치 내에 있음
			- Alarm : 성능 지표가 정의된 기준치 밖에 있음
			- INSUFFICIENT_DATA : 알람이 막 시작 됬으나 성능 지표 부족하거나 알람 유지하기에 데이터 부족
	5. **CloudWatch Dashboards**
		- 운영자 맞춤형 모니터링 화면 구성.
		- 여러 서비스 지표를 한눈에 확인.

###### 이 외에도  CloudWatch Contributor Insights, CloudWatch Synthetics, CloudWatch RUM (Real User Monitoring) 등이 있음

###### 단 한줄로 표현하면 CloudWatch는 "지금 리소스 상태가 어떤지"를  파악하는 중앙 집중형 플랫폼
---

#### AWS CloudTrail
- **AWS 계정에서 발생하는 모든 API 호출과 관련 이벤트를 기록·추적하는 서비스**
#####  핵심 개념
- **API 호출 기록 서비스**
    - 누가(사용자·역할), 언제, 어디서(IP/Region), 무엇을(AWS 서비스·리소스), 어떻게(요청 파라미터)를 했는지 기록.
    - 콘솔 클릭, AWS CLI, SDK, 다른 AWS 서비스가 호출한 것도 모두 API 이벤트로 남습니다.
- **이벤트(Event)**
    - CloudTrail이 남기는 로그 단위.
    - 예: `RunInstances`, `CreateBucket`, `DeleteTable`.
- **저장 위치**
    - 기본적으로 **90일 동안 이벤트 히스토리를 콘솔에서 조회**할 수 있음.
    - Trail(추적기)을 설정하면, 로그를 **S3 버킷·CloudWatch Logs·EventBridge**로 전송해 장기 보관·분석 가능.

###### 단 한줄로 표현하면 CloudTrail은 "누가 언제 무슨 요청을 했는지"를 기록

---

