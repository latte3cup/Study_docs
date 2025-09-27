
### AWS Well-Architected Framework
- 시스템 설계 시 선택한 결정(decisions)의 장단점(pros and cons)**을 이해하도록 돕는 **모범 사례(best practices)** 집합이라고 정의
- 즉 이 말 자체는 가이드이며 어떠한 서비스가 아님.

###### 해당 가이드라인 준수 시 이점  (안중요)
	- 신속 개발과 배포        - 정보 기반 의사결정 
	- 최선 AWS 활용 전략      - 위험 감소


---
#### AWS WAF의 6가지 원칙
1. 운영 우수성 원칙 (Operational excellence)
2. 보안 원칙 (Security)
3. 성능 효울성 원칙 (Performance)
4. 신뢰성 원칙 (Reliability)
5. 비용 최적화 원칙 (Cost optimization)
6. 지속 가능성 원칙(!!new)

----
#### 운영 우수성
- 비즈니스를 얼마나 잘 지원하고 있는지를 측정.
- 즉 기업의 비즈니스 목표, 우선 순위, 주요 성과 지표에 대한 이해 필요
- 실천 사항
	1. 운영 업무의 코드화 : 수동 작업 대신 코드화된 프로세스로 운영
	2. 실행 가능한 인사이트를 위한 관찰성 구현 : 정보에 기반한 의사 결정 
	3. 지속가능한 작은 변화 실천 : 실패 시 복구 가능성도 높으며 지속적 시스템 개선
	4. 운영 절차의 지속적 개선 : 운영 절차와 프로세스를 정기적으로 검토하고 보완
	5. 실패를 예측하고 대비 
	6. 모든 운영 이벤트에서 학습 : 실패에서도 학습 및 개선
##### 활동 영역 - 4개
###### 1. 조직 (Organization)
- 조직 우선순위와 비즈니스 목표를 명확히 정의하고 공유해야 해.
- 운영 모델(Operating Model)을 설계하라: 역할, 책임, 권한 배분, 의사 결정 방식 등이 조직 간에 명확해야 해.
- 팀 간 협업, 소통 체계, 에스컬레이션 경로 설계. 
- 조직 문화 조성: 학습, 실험, 피드백 문화 확립 등.
###### 2. 준비 (Prepare)
- **Telemetry 설계**: 워크로드 내부 상태를 알 수 있는 로그, 지표, 이벤트, 분산 추적(trace) 등을 설계해야 해. 
- **변화 흐름 개선(Flow)**: CI/CD 파이프라인 등을 이용해 변경이 서비스에 반영되는 흐름을 최적화. 
- **배포 리스크 완화(Mitigate Deployment Risks)**: 카나리 배포, 롤백 전략, 사전 검증 등을 설계. 
- **운영 준비도 평가(Operational Readiness)**: 런북(runbook), 플레이북(playbook), 팀 숙련도, 온콜 스탠바이 구조 확인.
###### 3. 운영 (Operate)
- **워크로드 상태 이해 (Workload Health)**
    - KPI 지표, 응답 시간, 오류율 등 워크로드 측면 지표 설계 및 모니터링. 
    - 로그 집계, 지표 생성, 이상 감지 등 체계 구축.
- **운영 상태 이해 (Operational Health)**
    - 운영 활동(배포, 인프라 변경 등)의 지표와 로그를 별도로 관찰.
- **이벤트 대응 (Respond to Events)**
    - 알람 시스템, 자동 대응, 수동 절차 병행. 
    - 비상 절차와 롤백 방안 마련.
###### 4. 진화(발전) (Evolve)
- **학습·공유 (Learn, Share, Improve)**
    - 장애/이벤트로부터의 교훈을 문서화하고 조직 내 공유.
    - 개선 드라이버(Driver)를 정하고 우선순위 설정. 
- **지속 개선**
    - 점진적 개선을 위한 시간과 리소스를 확보.
    - 코드·스크립트, 템플릿, 표준을 조직 간 공유해 재사용성 강화.

----
#### 보안성 원칙
- **데이터, 시스템, 자산을 보호하면서 리스크 관리와 비즈니스 가치 제공을 지원하는 것**을 목표
- 즉, 클라우드 환경에서 **식별(Identify) → 보호(Protect) → 탐지(Detect) → 대응(Respond) → 복구(Recover)**라는 사이클을 잘 운영하는 체계를 구축하는 게 핵심
##### 설계 원칙 (Design Principles)
AWS는 보안 Pillar를 위해 다음과 같은 기본 원칙을 제시한다. (docs.aws.amazon.com)
1. **강력한 ID 및 접근 제어(Strong Identity Foundation)**
    - 최소 권한 원칙(Least Privilege) 적용.
    - AWS IAM(Identity and Access Management), MFA(Multi-Factor Authentication), 권한 분리.
2. **엔드투엔드 추적(Traceability)**
    - 시스템 전체를 모니터링하고, 로그와 지표를 통해 실시간으로 보안 이벤트 추적.
    - AWS CloudTrail, CloudWatch Logs, AWS Config.
3. **모든 계층에서 보안(Apply Security at All Layers)**
    - 네트워크, 애플리케이션, OS, 데이터베이스 등 전 계층에서 보안 적용.
    - VPC 보안 그룹, NACL, WAF, Shield, KMS 암호화.
4. **자동화된 보안(Automation)**
    - 보안 태세를 자동 점검하고, 대응을 자동화.
    - 예: IAM 정책 검사 자동화, GuardDuty 경고에 따른 Lambda 자동 대응.
5. **데이터 보호(Protect Data in Transit and At Rest)**
    - 데이터는 저장 시(At Rest), 전송 시(In Transit) 모두 암호화.
    - AWS KMS(Key Management Service), TLS/SSL, S3 암호화.
6. **사람을 보호의 마지막 방어선으로 두지 않는다(Keep People Away from Data)**
    - 직접적인 데이터 접근 대신 자동화·도구화된 인터페이스 사용.
    - 예: S3에 직접 접근하기보다 API/애플리케이션을 통한 접근.
7. **보안 이벤트 대비(Prepare for Security Events)**
    - 사고 대응 계획(IR Plan)을 만들고, 정기적으로 모의훈련(Game Day)을 수행.
    - AWS Security Hub, Incident Response runbook.
##### 주요 영역 (Focus Areas)
1. **ID 및 접근 관리(Identity & Access Management)** (AIM)
    - IAM 사용자 대신 IAM Role, SSO, 최소 권한 설계.
2. **탐지(Detection)**
    - CloudTrail, GuardDuty, Config, CloudWatch를 통한 이상 행위 탐지.
3. **인프라 보호(Infrastructure Protection)**
    - 네트워크 분리(VPC, 서브넷), 보안 그룹, AWS Shield, WAF 적용.
4. **데이터 보호(Data Protection)**
    - 암호화(KMS, S3 Server-Side Encryption), 키 관리, 데이터 백업. 적절한 백업본 생성
5. **사고 대응(Incident Response)** (침해 대응)
    - Runbook 자동화, 보안 이벤트 시뮬레이션, 신속 대응 체계.

---
#### 성능 효율성 원칙
- IT 및 컴퓨팅 자원을 효율적으로 사용해 워크로드 요구 사항을 충족하고, 수요 변화와 기술 발전에 따라 지속적으로 최적화하는 능력
- 즉, **올바른 리소스를 올바른 시점에, 적절한 방식으로 사용하는 것**
##### 설계 원칙 (Design Principles)
1. **민첩성을 확보하라(Implement Performance Efficiency through Agility)**
    - 클라우드에서는 새로운 리소스를 몇 분 만에 배포 가능.
    - 빠른 실험, 다양한 아키텍처 테스트로 최적 성능 구조를 선택할 수 있음.
2. **글로벌 배포(Go Global in Minutes)**
    - 전 세계 리전에 빠르게 인프라를 배포해 지연 시간(latency)을 줄이고, 지역별 사용자 경험 개선.
3. **서버리스 아키텍처 사용(Use Serverless Architectures)**
    - 관리 부담을 줄이고 성능 자동 확장을 제공하는 서비스 활용.
    - 예: AWS Lambda, DynamoDB, S3, API Gateway.
4. **고급 기술 활용(Use Advanced Technologies)**
    - 머신러닝(ML), 캐싱, 데이터베이스 최적화 등 클라우드에서 제공하는 최신 기술을 적극적으로 사용.
5. **지속적 발전(Evolve Over Time)**
    - 기술은 빠르게 발전하므로, 새로운 인스턴스 유형·서비스로 전환하며 효율성을 개선해야 함.
##### 주요 영역 (Focus Areas)
1. **선택(Selection)**
    - 워크로드에 맞는 최적의 리소스 선택.
    - 컴퓨팅: EC2 vs Lambda vs Fargate
    - 스토리지: EBS, S3, EFS 중 요구사항에 맞는 선택
    - 데이터베이스: RDS, DynamoDB, Aurora
2. **검토(Review)**
    - 새로운 기술이나 서비스가 출시될 때마다 아키텍처를 주기적으로 재검토.    
3. **모니터링(Monitoring)**
    - 지표(KPI)를 설정해 성능과 효율을 지속 추적.
    - Amazon CloudWatch, X-Ray, Trusted Advisor.
4. **거버넌스(Governance)**
	-  아키텍처 선택을 위한 기준을 문서화하고, 자동화된 파이프라인 내에서 표준화.

---
#### 신뢰성 원칙
- 워크로드가 인프라 또는 서비스 장애, 운영 오류, 수요 변화 같은 상황에서도 올바르게 동작하는 능력
- 즉, 서비스가 장애 없이 계속 가치를 제공할 수 있도록 설계·운영하는 체계
- SLA 상의 요구 사항을 준수할 수 있도록 하는것.
##### 설계 원칙 (Design Principles)
1. **장애를 자동으로 복구하도록 설계(Automatically recover from failure)**
    - 시스템이 장애를 탐지하고, 자동으로 치유(Self-healing)하도록 아키텍처 설계.
    - 예: Auto Scaling, Elastic Load Balancing, Multi-AZ 배포.
2. **수요에 맞게 확장(Scale horizontally to increase aggregate workload availability)**
    - 단일 인스턴스 의존 대신, 여러 리소스를 분산 배치하고 확장 가능하게 설계.
    - 예: EC2 Auto Scaling Group, Amazon Aurora Replicas.
3. **용량 추측 대신 자동 관리(Stop guessing capacity)**
    - 리소스를 과다/과소 프로비저닝하지 않고, 자동 확장으로 수요 변화 대응.
    - 예: DynamoDB On-Demand, Lambda 자동 확장.
4. **변화 관리(Change management)**
    - 인프라 변경은 자동화하고, 점진적으로 테스트해서 신뢰성을 유지.
    - 예: IaC(Infrastructure as Code), CI/CD 파이프라인, 카나리 배포.
5. **데이터 복구 설계(Manage change in automation and backup/restore)**
    - 장애 대비를 위해 백업, 스냅샷, 복구 절차를 자동화.
    - 예: AWS Backup, S3 버전 관리, RDS 자동 백업.
##### 주요 영역 (Focus Areas)
1. **기초(Foundations)** --> 신뢰의 토대 구축
    - 계정 구조, 네트워크 토폴로지, 서비스 할당량 관리.
    - IAM 역할 분리, VPC 설계, 서비스 할당량 모니터링.
2. **워크로드 아키텍처(Workload Architecture)**
    - 장애 허용 아키텍처 설계.
    -  (관리형 서비스 사용)
    - 예: 멀티 AZ, 멀티 리전, 로드밸런싱, 메시징 큐(RabbitMQ, SQS).
3. **변화 관리(Change Management)**
    - 배포, 설정 변경, 확장/축소 같은 변화를 자동화 및 안전하게 수행.
    - 카나리 배포, 블루-그린 배포, IaC 활용.
---
#### 비용 최적화 원칙
- **비즈니스 가치를 최대화하면서 불필요한 지출을 줄이는 것**을 목표
- 즉, 단순히 비용을 최소화하는 게 아니라 **“돈을 쓴 만큼 가치를 얻고 있는가”** 를 확인하고, 효율적으로 사용하는 것을 중점에 둔다.
##### 설계 원칙 (Design Principles)
1. **소유권 대신 소비(Adopt a consumption model)**
    - 미리 자원 소유(온프레미스) 대신, 필요한 만큼 사용하고 사용량 기반으로 지불.
    - 예: EC2 On-Demand, Lambda, S3 스토리지.
2. **전체 효율성 측정(Measure overall efficiency)**
    - 비용을 단순 총합이 아니라 비즈니스 가치 대비로 측정.
    - 예: 사용자당 비용, 처리 건수당 비용.
3. **불필요한 자원 중지(Stop spending money on undifferentiated heavy lifting)**
    - 관리형 서비스를 활용해 인프라 관리에 쓰이는 불필요한 비용 절감.
    - 예: RDS(AWS가 백업·패치 관리) → 자체 DB 서버 운영보다 효율적.
4. **지출 분석 및 배분(Analyze and attribute expenditure)**
    - 팀, 프로젝트, 제품별 비용을 태깅(tagging)해 투명하게 관리.
    - 예: AWS Cost Explorer, AWS Budgets.
5. **지속적 최적화(Continually optimize)**
    - 기술 발전, 가격 변화에 맞춰 최신 옵션으로 전환.
    - 예: 최신 인스턴스 유형(Graviton), Savings Plans, Spot Instances 활용.
##### 주요 영역 (Focus Areas)
1. **거버넌스(Cost-effective Governance)**
    - 태그 정책, 비용 모니터링, 예산 설정, 팀 단위 비용 배분.
2. **소유권 모델(Consumption Model)**
    - 필요할 때 필요한 만큼만 사용하는 구조.
    - Auto Scaling, On-Demand 리소스, Lambda 같은 이벤트 기반 서비스.
3. **적합한 자원 선택(Appropriate Resource Selection)**
    - 워크로드 특성에 맞는 인스턴스, 스토리지, 데이터베이스 선택.
    - 예: S3 Glacier(아카이브), DynamoDB On-Demand vs Provisioned.
4. **관리 부담 줄이기(Managed Services to Reduce TCO)**
    - 서버, 패치, 운영 자동화가 내장된 AWS 관리형 서비스 활용.
5. **지속적 개선(Continual Cost Optimization)**
    - 비용 리포트 주기적 리뷰, Reserved Instance → Savings Plans로 전환, Spot Instances 확대.

---
#### 지속 가능성 원칙  (기업 운영에 우선도가 낮은거 같음)
- 클라우드 워크로드가 환경에 미치는 영향을 최소화하고, 장기적으로 탄소 발자국을 줄이는 설계 원칙
- 즉, 단순히 성능과 비용만 보는 게 아니라 **에너지 효율성, 자원 활용 최적화, 환경적 책임**까지 고려하는 게 핵심

##### 설계 원칙 (Design Principles)
1. **지역 선택(Region Selection)**
    - 재생 에너지를 적극 활용하는 리전을 선택.
    - 예: 탄소 배출량이 낮은 리전 우선 사용.
2. **사용량 측정(Measure and Improve)**
    - 워크로드가 소비하는 리소스를 지속적으로 측정하고 개선.
    - CloudWatch, AWS Cost and Usage Report 등을 활용해 탄소 영향 추적.
3. **데이터 최소화(Reduce Data Movement and Storage)**
    - 불필요한 데이터 저장과 전송을 줄여 에너지 소비 최소화.
    - 예: S3 Intelligent-Tiering, 압축, 캐싱.
4. **효율적인 하드웨어 사용(Optimize for Hardware Efficiency)**
    - 최신, 고효율 하드웨어와 인스턴스를 활용.
    - 예: AWS Graviton 프로세서 기반 인스턴스.
5. **수요 기반 사용(Adapt to Demand)**
    - Auto Scaling, Serverless를 활용해 필요한 순간에만 자원 사용.
    - 예: Lambda, DynamoDB On-Demand.
6. **공유 인프라 활용(Shared Services)**
    - 관리형 서비스 사용으로 개별 서버 대비 에너지 절약.
    - 예: RDS, ECS, EKS, S3.
##### 주요 영역 (Focus Areas)
1. **사용 패턴 최적화**
    - 리소스 낭비 방지 (예: 미사용 인스턴스 자동 종료, 예약 시간 관리).
2. **소프트웨어 최적화**
    - 코드 효율성 개선 → CPU/GPU 사용량 절감.
    - 이벤트 기반/비동기 처리 활용.
3. **하드웨어 및 인프라 최적화**
    - 최신 인스턴스, Graviton 칩 활용.
    - 멀티테넌시(다중 사용자 공유 인프라) 적극 활용.
4. **데이터 관리**
    - 불필요한 데이터 정리(데이터 라이프사이클 정책).
    - 데이터 압축·캐싱·에지 처리.
5. **운영 문화**
    - 팀 차원에서 **“탄소 의식(Carbon Awareness)”** 문화를 확립.
    - 지속 가능성 지표를 KPI로 관리.

---

#### 클라우드 베스트 패릭티스
1. 실패를 대비한 설계
2. 모든 레이어에 대한 보안성 구현
3. 다중 스토리지 옵션 사용
4. 탄력성 구현
5. 병렬처리 기법 활용
6. 느슨하게 연결된 아키텍처