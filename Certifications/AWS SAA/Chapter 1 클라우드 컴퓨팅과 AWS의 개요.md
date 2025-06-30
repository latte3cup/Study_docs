
AWS 서비스는 아주 많은 서비스들로 구성
이들 중 항상 사용해야하는 서비스들을  **Foudational Services** 라 부름
- Region, AZ, VPC
- EC2, ELB
- AWS Auto Scaling, 스토리지
- 네트워킹, DB, IAM 등등


## AWS 서비스 특징
- 온디맨드(On Demand)
- 인터넷을 통한 자원 접근
- 사용량별 과금 모델


## AWS 기반 클라우드 컴퓨팅의 이점
- 민첩성 : 하드웨어 확보가 필요 없음
- 용량에 대한 걱정 불식
- 대규모 자본적 비용에서 소규모 유동 비용으로 전환 : 기업 혁신에 이점
- 규모의 경제 달성
- 데이터 센터 구축 비용 절약
- 기술 혁신성의 유지
- 단기간 내 세계화 가능 (다른 리전에 배포 가능)

## 클라우드 컴퓨팅의 3대 모델

	비즈니스 니즈, 통제성, 관리성 수준에 따라 3개중 일부를 택함

- 관리 요소 : 애플리케이션, 런타임, 보안 및 통합 관리, 데이터 베이스
  서버 S/W, 가상화, 서버 H/W, 스토리지, 네트워킹

1. PaaS : 애플리케이션만 사용자가 관리
2. IaaS : 애플리케이션 ~ 데이터 베이스까지 사용자가 관리
3. SaaS : 위의 요소에 사용자가 관리하지 않음.

## 클라우드 컴퓨팅 3대 배포 모델
1. **올 인 클라우드 (퍼블릭 클라우드)**
 : 클라우드 서비스 제공자를 통해 앱을 배포하는 방식
- 클라우드에서 앱 개발 및 제공
-  기존의 앱을 클라우드로 이전
2. **하이브리드 클라우드**
 : 애플리케이션 중 일부는 퍼블릭 클라우드에서, 나머지는 온프레미스에서 제공
	  기존 환경 전부를 클라우드에 이전하기 힘든 경우 적용
3. **온프레미스 및 프라이빗 클라우드**
: 가상화나 자원 관리도구를 이용해 자체 데이터 센터에 애플리케이션을 배포 하는 경우

## AWS 태동과 발전
: 2006년 초기 공식 출법

## AWS 글로벌 인프라
- 리전 - AZ - POP(상호 접속 위치 : Points Of Preference) 등으로 구성
- 리전에 속한 데이터는 고객 동의 없이 리전 외부로 이동 불가능
- AZ 가 없는 지역은 LZ가 따로 운영되며 이는 근처 리전과 초고속으로 연결된 존. (기존 리전 보조)
- POP는 물리적인 인프라 장소로서, 내부에 여러 엣지 서비스 노드들이 있음
- 엣지 로케이션은 POP 안에서 콘텐츠 및 트래픽을 처리하는 엔드포인트 (일반적으로 리전 외부에 존재)
- 실제론 **95% 이상의 트래픽이 상위 5~10% 콘텐츠에서 발생** 하므로 빠른 서비스 접근 가능
- 리전별 엣지 캐시는 이 엣지 로케이션과 리전 사이에 있는 캐시 계층
- 즉 하나의 POP는  엣지 로케이션 + 리전별 엣지 캐시

## AWS의 보안과 준수해야 할 원칙
- AWS는 공유 보안 모델을 채택
- 클라우드 자체 보안은 AWS가, 클라우드 내의 보안은 고객이 책임짐
 - 각종 글로벌 보안 인증을 획득함 (p.45 참고)

## AWS 주요 제품 및 서비스
#### 컴퓨트
- Amazon Elastic Compute Cloude (EC2)
- Amazon EC2 Auto Scaling
- AWS Lambda
- Amazon EC2 COntainer Service(ECS) : EC2 인스턴스에서 도커 컨테이너 실행
- Amazon Elastic Kubernetes Service(EKS)
- AWS Fargate : 컨테이너를 실행하기 위해 EC2/EKS 에서 사용할 수 있는 서버리스 컴퓨트 엔진
- AWS Elastic Beanstalk : 웹 애플리케이션을 손쉽게 배포·관리할 수 있게 해주는 PaaS
- Amazon Lightsail : 간단히 가상화된 보안서버(VPS)를 사용하고자하는 서비스
- AWS Batch : 배치 컴퓨팅 작업을 효율적으로 처리하기 위한 서비스 
- AWS Outposts : AWS의 물리적 하드웨어를 고객의 온프레미스 데이터센터에 설치하여 클라우드 서비스를 로컬에서 실행하게 해주는 하이브리드 클라우드 솔루션

#### 네트워킹
- Amazon Virtual Private Cloud : AWS 안에서 제공받는 논리적 네트워크 공간. 대부분의 서비스는 VPC 없이 사용 불가
- Amazon Route 53 :  DNS 웹 서비스 제공
- Elastic Load Balancing  (ELB) : EC2 인스턴스의 부하를 로드 밸런싱하는 기능 담당
- AWS Direct Connect : 데이터 센터와 AWS 인프라를 프라이빗/ 전용 보안 네트워크로 연결
- AWS App Mesh : 서비스간 모니터링 디버깅 커뮤니케이션 추적 기능 제공. MSA 컨테이너와 함꼐 사용 가능
- AWS Global Accelerator : 애플리케이션의 고정 엔트리 포인트 (정적 IP 제공)

#### 보안 및 준수규정
- AWS Identity and Access Manager(IAM) : AWS의 사용자 그룹 역할 생성 및 모든 서비스 및 리소스의 접근 권한 관리
- Amazon Inspector : 자동화된 보안 검증 서비스 , 앱 배포시 파악 하여 보여줌
- AWS Certificate Manager : AWS SSL/TLS 인증서 관리
- AWS Directory Service :  마이크로소프는 Active Directory 기반 서비스. 
- AWS Web APplication Firewall (WAF): 웹 애플리케이션 방하벽으로 악성 트래픽 감지
- AWS Sheild : 웹 애플리케이션에 대한 DDoS 를 막기 위한 서비스 (Standard/Advance)
- Amazon GuardDuty : 보안 위협 감지 서비스. AWS 계정 및 워크로드 지속적 모니터링
- Amazon Macie : 데이터 분류, 데이터 평가, 데이터에 대한 접속 등 행동 관리를 통해 S3의 데이터 보호 업무를 도움
- AWS Secret Manager : 애플리케이션, 서비스 , IT 리소스 등을 침해 행위로부터 보호하기 위한 기밀 정보 관리 서비스
-  AWS SSO (Single Sign-On) : Ms Active Directory 접근 정보를 그대로 이용해 AWS 계정 및 비즈니스 애플리케이션에 접속할 수 있게 하는 서비스
- AWS CloudHSM : AWS 에서 기업 전용 하드웨어 보안 모듈 제공
- AWS KMS (Key Management Service) : 암호화 작업에 사용되는 키 생성 및 제어를 위한 관리형 서비스

#### 스토리지와 콘텐츠 딜리버리
- Amazon Simple Shared Storage(s3)
- Amazon S3 Glacier : 저비용 장기 저장 백업 서비스 
- Amazon Elastic Block Store (EBS):  EC2 인스턴스를 위한 블록 스토리지 서비스
- Amazon Elastic File System (EFS) : 클라우드에서 EC2 인스턴스를 활용하기 위한 쉽고 확장성 높은 공유 파일 스토리지 서비스 . 리눅스의 mnt/shared 에 여러 서버 붙는거랑 비슷
- Amazon Storage Gateway : 온프레미스 스토리지와 Aws 스토로지의 통합 게이트웨이 서비스
- Import/Export Options : 물리적 저장 장치를 통해 AWS에 방대한 데이터를 전송하는 방법 제공, 온/오프라인 전송을 모두 포함하는 형태
- Amazon CloudFront : AWS의 글로벌 CDN 배포 서비스 , 웹 호스팅도 가능

#### 데이터베이스
- Amazon Relational Database Service (RDS)
- Amazon DynamoDB : 완전 관리형 NoSQL 서비스
- Amazon Redshift : 완전 관리형 데이터 웨어하우스. 칼럼 포맷
- Amazon ElastiCache: Redis 또는 Memcached 기반의 인메모리 캐시를 완전관리형으로 제공하는 서비스
Redis는 캐시 계층이자 인메모리 DB로도 사용 가능
- Amazon Aurora : 클라우드 최적화형 고성능 관계형 데이터베이스로, MySQL 및 PostgreSQL과 호환
- Amazon Neptune : 연결(관계)에 최적화된 고성능 그래프 데이터베이스 서비스 
- Amazon (Quantum Ledger Database) QLDB :블록체인처럼 작동하는 완전 관리형 원장형(ledger) 데이터베이스, 변조 불가능한 트랜잭션 로그 데이터베이스
※ 렛저 데이터베이스는 모든 변경 이력을 관리하는 데이터베이스
- Amazon DocumentDB :MongoDB를 위한 완전 관리형 서비스
- Amazon Keyspaces : Apache cassandra 호환 DB 서비스

#### 분석 도구
- Amazon Athena : 서버리스 기반 인터랙티브 쿼리 서비스
- Amazon EMR(Elastic MapReduce) : 대규모 데이터 처리용 클러스터 플랫폼으로, Hadoop, Spark, Hive, Presto 같은 빅데이터 오픈소스 프레임워크를 쉽게 실행할 수 있게 해주는 완전관리형 서비스
- Amazon ElasticSearch : 클라우드 내에 ElasticSearch  클러스터를 배포 확장하는 서비스 
- Amazon CloudSearch : 애플리케이션/웹에 적용하는 완전 관리형 검색 서비스
- Aws Data Pipeline : 데이터 처리 및 이동 자동화 서비스(Ec2/emr 기반 워크플로)
- Amazon Kinesis : 스트리밍 데이터를 실시간 수집/분석/처리 위한 서비스
- AWS Glue:  완전 관리형 ETL 서비스 
- Amazon MSK(Managed Streaming for apache Kafka) : 관리형 Apache Kafka 인프라 관리 및 운영 서비스
- AWS Lake Formation : 빠른 시일 안에 안전한 데이터 레이크 구축
--  기존 S3에 다 넣으면 어떻게 보면 데이터 레이크 구성이지만 이거는 보안/카탈로그/권한 관리 도구를 제공함.
- Amazon QuickSight : 완전 관리형 비즈니스 분석 서비스

#### 애플리케이션 서비스
- Amazon API gateway : 백엔드 서비스 구현에 필요한 API 개발/배포/운영의 완전 관리형 서비스로, 람다/EC2 기반 앱/기타 웹의 구현을 도움
- AWS Step Functions : 비주얼 워크플로우를 이용해 분산화된 애플리케이션 및 마이크로서비스의 다양한 컴포넌트를 효율적으로 조절하기 위한  완전 관리형 서비스
- Amazon Simple Workflow Service : 분산 애플리케이션 컴포넌트의 작동 방식을 조절할 수 있는 웹 기반 클라우드 서비스
- Amazon Elastic Transcoder : 저렴하고 쓰기 쉬운 고가용성의 비디오/오디오 변환 기능

#### 개발자 도구
- AWS CodeCommit : 완전고나리형 소스 컨트롤 서비스 - 고확장성 프라이빗 GIT 저장소
- AWS CodePipeline : 완전 관리형 CI/CD 서비스
- AWS CodeBuild : 소스 코드 빌드 및 컴파일, 실행 테스트, 배포 등을 위한 완전 관리형 빌드 서비스
- AWS CodeDeploy : EC2, 온프레미스 환경 등 어떤 형태의 서버 인스턴스에서도 코드 배포를 자동화할 수 있는 완전 관리형 서비스

#### 관리 도구
- AWS CloudFormation : 사전 정의된 템플릿과 리소스 스택을 이용해 리소스를 자동으로 프로비저닝할 수 있는 서비스
- AWS Service Catalog : 내부에서 승인된 AWS 리소스 템플릿을 카탈로그처럼 제공하고 관리할 수 있는 서비스
- Amazon OpsWorks : 애플리케이션 설정, 배포, 구성 관리를 자동화하는 서비스  
	특히 **Chef** 또는 **Puppet** 같은 구성 관리 도구를 기반으로, 서버를 코드로 관리하는 구성 관리(Configuration Management) 초점
	: 클라우드 리소스를 만든 이후에 **운영 단계에서의 자동화와 관리에 초점**
- AWS CloudWatch : AWS 리소스와 애플리케이션의 모니터링 서비스로 각종 성능 지표와 로그 데이터를 수집 및 분석하고, 경고 메시지 설정.
- AWS Config : 보안 관리 및 거버넌스를 위해 AWS 리소스 인벤토리, 환경 설정 히스토리, 환경 설정 변경 알림등을 설정할 수 있는 완전 관리형 서비스
 - AWS CloudTrail : 계정 내 API 호출 내역과 사용자 액티비티 기록 서비스로 S3를 통해 로그 파일 제공

#### 메시징
- Amazon Simple Notification Service (SNS): **풀매니지드 메시징 서비스**로, 다양한 시스템 간의 알림 전송 서비스 (Publisher - Subsciber 기반)
- Amazon Simple Email Service : **이메일(Email)** 발송 서비스
- Amazon Simple Queue Service :  처리되길 기다리는 메시지 저장 큐 관리 서비스

### 마이그레이션
- AWS Application Discovery Service : 온프레미스 데이터 센터에서 실행되는 애플리케이션을 자동으로 파악하고 관련 디펜던시 요소와 성능 프로필을 맵핑하기 위한 서비스
- AWS Database Migration Servce : 온프레미스 DB를 AWS로 이전하기 위한 서비스
- AWS SNowball : 물리적 데이터 전송
- AWS Server Migration Service : 대규모 서버 마이그레이션을 위한 업무 조정, 자동화, 스케줄 설정 등의 업무 지원. 

#### 인공지능
- Amazon Lex : 음성 및 텍스트 기반 대화영 챗봇을 구현하기 위한 완전 관리형 서비스
- Amazon Polly : 텍스트를 음성으로 변환하는 완전 관리형 서비스
- Amazon Rekognition : 완전 관리형 딥러닝 기반 이미지 및 영상 인식 서비스
- Amazon SageMaker : 완전 관리형 머신러닝 서비스

#### 사물 인터넷
- AWS IoT Platform : 디바이스와 클라우드 애플리케이션의 효율적인 연결을 지원하는 완전관리형 클라우드 플랫폼
- AWS Greengrass : 로컬 디바이스(엣지 디바이스)에서 클라우드 없이도 AWS 기능을 실행할 수 있게 해주는 서비스
- AWS IoT Button : AWS IoT Button은 물리적으로 누를 수 있는 Wi-Fi 기반의 간단한 IoT 장치로,  버튼 클릭 동작을 AWS 클라우드 서비스에 직접 연결할 수 있는 장비

#### 모바일 서비스
- Amazon Cognito : 모바일 및 웹 앱에 대한 회원가입 및 로그인 기능 제공 + SAML 인증 + 소셜 인증
- AWS Mobile Hub : 모바일 애플리케이션 생성/ 테스트 / 배포 /사용량 모니터링 등, **모바일 앱을 빠르게 개발하고 배포할 수 있도록 AWS 리소스를 자동 구성해주는 통합 서비스**
- Amazon Mobile Analystics : 모바일 앱 사용량과 매출액을 측정하기 위한 웹 서비스