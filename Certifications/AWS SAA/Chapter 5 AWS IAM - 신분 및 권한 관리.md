### IAM : Identity and Access Management
- **AWS 리소스에 대한 ‘누가(Who)’, ‘무엇을(What)’, ‘어디서(Where)’, ‘어떻게(How)’ 접근할 수 있는지**를 통제하는 서비스

##### 핵심 요약
- **사용자·그룹·역할(Role)** 을 만들어 **신원(Identity)** 을 정의
- **정책(Policy)** 을 통해 권한(Access)을 부여하거나 제한
- **최소 권한 원칙(Least Privilege)** 을 기반으로 설계
- **MFA(다중 인증)**, **액세스 키(Access Key)**, **콘솔 로그인** 등 다양한 인증 수단 제공
- AWS 전역(Global) 서비스 → 모든 리전에 동일하게 적용
- 루트 사용자 사용 최소화, IAM 사용자/역할 중심 운영
- 세분화된 리소스별 접근 제어 가능 (S3 객체 단위, EC2 인스턴스 단위 등)
- 업무 감사, 사용자 로그 분석, 지속적 모니터링, 계정별 활동 리뷰 등 모니터링 가능

---
##### 신분 인증
: 접근하려는 대상이 누구인지 밝히기 위한 체계
- 유저 및 접근 권한 관리 : 클라우드 유저를 생성하고 액세스 키, 패스워드, 멀티 팩터 인증 등 보안 수단 관리. 유저의 접근 허용 관리, 유저가 수행가능한 작업의 세부적인 통제
- 그룹화된 유저 및 접근 권한 관리 : 유저를 그룹 단위로 묶어 동일한 권한 정책을 일괄 적용·관리. 이를 통해 개별 유저 권한 변경 없이 그룹 정책 수정만으로 다수 유저의 권한을 효율적으로 업데이트 가능 

##### 권한 부여 (정책)
- 사용자에게 필요한 권한을 부여하는 체계, 이로써 사용자의 행동을 세부적으로 관리
- `최소한의 권한 부여 및 책임의 분리` 라는 보안 컨셉 구현
- 정책은 Json으로 명시
-  IAM이 접근 승인 여부 결정하는 방식
		기본 상태: Deny
		↓
		정책에서 Allow 발견?
		  ↓ 예 → Deny 정책 확인
		    ↓ Deny 있으면 → 거부
		    ↓ Deny 없으면 → 허용
		  ↓ 아니오 → 거부
즉, 기본적 거부, 명시적 허용/거부 공존 시 거부 적용

---

#### 감사 (Audit)
######  1. 목적
- 최소 권한 원칙(Principle of Least Privilege) 준수 여부 확인
- 불필요한 계정, 오래 사용하지 않은 키/계정 식별
- 잘못된 정책 또는 과도한 `*` 권한 제거
- 규제 준수(Compliance) 및 내부 보안 규정 충족
###### 2. 주요 점검 항목
1. 사용자·그룹·역할 현황
    - 활성 사용자 수, 미사용 사용자 식별
    - 그룹 및 역할이 올바르게 권한 부여되어 있는지 확인
2. 정책 검토
    - `AdministratorAccess`와 같은 광범위 권한의 필요성 검증
    - `"Action": "*", "Resource": "*"` 같은 전면 허용 정책 제거
3. 자격 증명(Access Key·Password) 관리
    - Access Key가 90일 이상 사용되었는지 여부
    - MFA(멀티 팩터 인증) 적용 여부
4. 로그인 및 접근 기록 분석
    - CloudTrail로 비정상 접근 기록 점검
    - 특정 지역·IP에서의 접근 시도 여부
5. 역할(Role) 위임 및 신뢰 정책
    - 외부 계정·서비스에 대한 Role 위임이 필요한지 여부
6. 비활성 리소스 정리
    - 사용되지 않는 IAM 사용자, 그룹, 정책 제거
###### 3. 활용 도구
- **IAM Access Analyzer** → 외부 공유 리소스 및 과도한 권한 식별
- **AWS Trusted Advisor** → MFA 미사용, 루트 계정 로그인 여부 점검
- **AWS Config** → IAM 리소스 변경 이력 추적
- **CloudTrail** → 모든 IAM API 호출 로그 확인
	- 작업을 요청한 유저는 누구인가
	- 작업이 요청된 시간은 언제인가
	- 요청된 작업의 내용은 무엇인가
	- 요청된 작업으로 제공된 리소스는 어떤 것인가
	- 요청이 발송된 장소와 도달한 장소는 어디인가
---

#### 보안 자격 정보 유형

- 크게 IAM 기준으로는 2개로 나뉨
###### 1. 장기 자격 증명 (Long-term credentials)
- **대상**: 루트 사용자(Root User), IAM 사용자(IAM User)에게 부여
- **형식**: 액세스 키(Access Key ID + Secret Access Key), 비밀번호(Pass‑Word)
- **특징**: 만료되지 않으며, 주기적으로 갱신이나 비활성화 관리 필요 
###### 2. 임시 자격 증명 (Temporary credentials)
- **대상**: IAM 역할(Role), 페더레이션 사용자(Federated principal), IAM Identity Center 등 
- **형식**: Access Key ID + Secret Access Key + Session Token 형태의 임시 자격 증명
- **특징**: 짧은 기간(몇 분~최대 몇 시간) 동안 유효, 사용 후 자동 만료. AWS STS(Security Token Service)를 통해 발급됨

##### 환경 별 요약
| 환경/대상                      | 자격 증명 유형             | 특징                               |
| -------------------------- | -------------------- | -------------------------------- |
| 루트 사용자, IAM 사용자            | 장기 자격 증명 (Long‑term) | Access Key / Password, 만료되지 않음   |
| IAM 역할, 페더레이션 사용자          | 임시 자격 증명 (Temporary) | STS를 통해 세션 토큰 포함, 자동 만료          |
| AWS Management Console 접근용 | IAM 사용자 비밀번호         | 콘솔 로그인 용, MFA 설정 가능              |
| CLI/SDK/API 접근용            | 액세스 키 (Long‑term)    | 프로그램 접근용, 주기적 관리 필요              |
| EC2, Lambda 등 서비스 접근용      | IAM 역할 (Temporary)   | 서비스에 역할 할당되어 자동으로 임시 자격 증명 획득    |
| 외부 IdP (SAML, OIDC 등) 연계 시 | 임시 자격 증명 (Temporary) | 외부 인증 후 STS 역할 전환 기반 임시 자격 증명 발급 |

----

#### 유저
- 실제의 유저를 의미하기도 하고, AWS 서비스에 접근할 수 있는 애플리케이션을 의미
- 즉 유저란 AWAS 생태계에 존재하는 사용자 또는 서비스를 가리키는 유일무이한 개체
- 유저 = 식별자(이름/ARN) + 자격 증명 +  권한   으로 구성됨
- 루트 계정도 일종의 유저지만 IAM 범위 밖 (제약을 받지 않음)

#### 그룹
- 다수의 역할과 권한으로 구성되고 IAM을 이용해 승인
- 그룹에 추가된 유저는 그룹의 저으이된 역할 및 ㅜ건한을 상속
- 그룹의 유저 추가 제외 가능
- 유저가 다수의 그룹에 포함 될 수 있음
- 하지만 그룹끼리는 상속 안됨

#### 롤
- 권한을 영구 혹은 장기적으로 보유하는 사용자와 다름
- **영구 자격 증명 없이**,  **누군가 맡았을 때(Assume)** 사용할 수 있는 **권한 묶음(Policy)**
-  구성 요소
	1. **권한 정책(Permission Policy)**
	    - Role을 맡았을 때 허용되는 작업과 리소스를 정의.
	    - 예: `s3:GetObject`, `ec2:StartInstances` 등.
	2. **신뢰 정책(Trust Policy)**
	    - 누가 이 Role을 맡을 수 있는지를 정의.
	    - 대상: IAM 사용자, AWS 서비스(EC2, Lambda 등), 다른 AWS 계정, 외부 IdP(SAML, OIDC).
- **영구 자격 증명 없음** → Access Key나 비밀번호를 장기 보관하지 않음.
- **임시 보안 자격 증명(STS 발급)**을 통해서만 사용 가능.
- 세션 만료 시간 존재(기본 1시간, 최대 12시간 등 설정 가능).
- 크게 보면 Jwt와 같이 토큰 기반 인증이라 보면됨
- 롤은 거의 어떤 개체든 받을 수 있음

#### IAM 권한의 계층
- AWS 루트 유저 또는 계정 소유자 : 모든 서비스 및 리소스에 대해 무제한 접근 권한 보유 
- AWS IAM 유저 : 제한된 권한 보유, 그룹과 유저 정책에 제한 받음
- 임시 보안 자격 정보 보유자 : 신분 확인 후 접근 제한, 토큰 생성 등에 대한 정책으로 추가 제한

---
#### IAM 활용 법
1. IAM 유저 활용 : 루트 계정 소유자는 IAM 유저를 생성해 어드민을 부여하고 루트는 감춤
2. 강력한 패스워드 정책 수립 : 강력한 비번 조건 정책 수립 후 90일 이후 패스워드 폐기
3. Access Key Last Used 기능을 통해 90일 이상 사용되지 않은 보안 자겨 정보를 찾아 비활성화, Credential Report를 통해 모니터링
4. MFA : 보안 레이어 추가
5. 그룹으로 승인 관리 : 개별 유저마다 권한 할당하는 것이 아닌 그룹으로 관리하여 권한 관리의 복잡성 감소
6. 최소한의 권한 부여  : 필요 시마다 최소한의 권한을 부여 및 승인 -> 권한 남용 방지
7. IAM 롤 활용 : 서로 다른 계정 간, 그룹에게 권한 부여 시 롤 사용하여 임시적인 권한만 유지되도록 함.
8. Ec2 인스턴스를 위한 IAM 롤 활용
9. 보안 강화를 위한 IAM 정책 조건 수립 : 특정 IP 접근 가능하게 한다던지 조건을 주어 해당 조건에 따른 접근 여부 결정
10. AWS CloudTrail 활용 : 로그 파일을 잘 관리하여 감사에 도움

---
#### AWS 보안 규정 프로그램 및 보안 표준
- SOC 1/SSAE 16/ISAE 3402(기존 SAS 70)
- SOC 2 , SOC 3
- FISMA, DIACAP, and FedRAMP
- DOD CSM Levels 1?5
- PCI DSS Level 1
- ISO 9001/ ISO 27001
- ITAR
- FIPS 140-2
- MTCS Level 3

- Criminal Justice Information Services (CJIS)
- Cloud Security Alliance (CSA)
- Family Educatuon Rights and Privacy Act(FERPA)
- Health Insurance Portability and Accountability Act (HIPAA)
- Motion Picture Association of America (MPAA)

---
#### AWS 공유 책임 모델 
![[Pasted image 20250813185712.jpg]]
###### AWS가 책임지는 영역: **Security of the Cloud**
- 하드웨어, 네트워크, 시설, 데이터센터, 리전, 가용 영역(Availability Zones) 등 **클라우드 인프라 전체**의 물리적인 보안.
- 하이퍼바이저, 운영 체제, 스토리지, 데이터베이스, 네트워킹 등 **AWS 서비스의 기반 기술**. -> 특히 PaaS 이상인 경우의 책임
- IaaS인 경우에만 고객책임이 됨
- 백엔드 시스템 관리, 패치, 물리적 보안, 환경 구성을 비롯한 모든 **기초 보안 통제**.  

###### 고객이 책임지는 영역: **Security in the Cloud**
- **사용자 데이터**, **애플리케이션**, **IAM 설정**, **네트워크 구성**, **운영체제 및 보안 패치**, **암호화**, **접근 제어** 등.
- 서비스 종류(IaaS, PaaS, SaaS)에 따라 책임 범위가 달라짐. 예:
    - EC2 사용 시: OS, 애플리케이션, 방화벽(Security Group) 구성까지 고객 책임. (IaaS)
    - S3 사용 시: 데이터 암호화, 접근 제어, ACL 적용 등 고객이 관리. (SaaS)

---
### AWS 보안 제품 및 서비스 (중요도 낮음)
1.  Resource Access Manager
  - AWS 리소스를 다른 AWS 계정이나 조직과 안전하게 공유할 수 있게 해주는 서비스
  - 리소스를 복사·이전 하는 것이 아닌, 하나의 리소스를 여러 계정이 함꼐 사용하도록 접근 권한 부여하는 방식
2. AWS Secret Manager
  - **데이터베이스 비밀번호, API 키, 토큰, 인증서** 와 같은 **민감 정보(Secret)** 를 안전하게 저장·관리하고, **자동으로 갱신·배포**해주는 서비스
  - 실제 동작은 Lambda를 통해 해당 내용 수행
3. Amazon GuardDuty
  - AWS 계정과 워크로드, 데이터를 대상으로 **지속적인 위협 탐지(Threat Detection)** 를 수행하는 **관리형 보안 서비스**
  - **에이전트 설치 불필요** — CloudTrail, VPC Flow Logs, DNS Logs 등 AWS 로그 데이터를 분석.
  - 공격자의 정찰 행위, 인스턴스에 대한 위협, 계정에 대한 위협 감지
4. Amazon Inspector
  - AWS 워크로드에 대한 **자동 취약점 관리(Vulnerability Management)** 서비스
  - EC2 인스턴스, 컨테이너 이미지(ECR), Lambda 함수 등을 지속적으로 스캔해 **보안 취약점과 잘못된 설정**을 탐지
  - CVE(Common Vulnerabilities and Exposures) 데이터베이스, AWS 보안 권장 사항 등을 기준으로 평가
5. Amazon Macie
  - AWS 환경의 **민감 데이터(PII, Personal Identifiable Information)**를 자동으로 식별·분류·보호하는 서비스
  - 주로 **Amazon S3** 버킷을 스캔하여, 개인정보·금융정보·민감 문서 등 데이터 노출 위험을 감지합니다.
  - **기계 학습(ML)** 과 **패턴 매칭**을 사용해 자동으로 민감 정보 탐지.
6. AWS Certificate Manager
  - AWS에서 **SSL/TLS 인증서**를 쉽게 발급, 배포, 관리, 갱신할 수 있게 해주는 서비스
  - 웹 사이트나 애플리케이션과 사용자 간 통신을 **HTTPS**로 암호화하여 보안을 강화
  - **AWS 리소스와 자동 연동**이 가능하며, 인증서의 수동 관리 부담을 감소
  - 즉 서버로서의 TLS 인증서를 관리함.
7. AWS Web Application Firewall
  - 웹 애플리케이션을 **SQL 인젝션, 크로스 사이트 스크립팅(XSS)** 등과 같은 애플리케이션 계층(OSI 7계층) 공격으로부터 보호하는 **관리형 방화벽 서비스**
  - 규칙 기반 (IP주소, http 헤더, 쿼리, 바디 등) 필터링 + 트래픽 제어 등
  - 이 또한 네트워크 앞단에서 동작하여 특정 서비스에 붙여서 사용
8. AWS Sheild
  - **DDoS(Distributed Denial of Service) 방어 서비스**입니다.  
  - 네트워크 계층(L3~L4)과 일부 애플리케이션 계층(L7)의 대규모 트래픽 공격을 완화해 서비스 가용성을 보호하는 역할
  - Standard는 무료, Advanced 유로

| 구분    | AWS Shield                         | AWS WAF                               |
| ----- | ---------------------------------- | ------------------------------------- |
| 보호 범위 | 주로 L3~L4 DDoS, 일부 L7 공격            | 주로 L7 웹 공격(OWASP Top 10 등)            |
| 작동 방식 | 네트워크 트래픽 패턴 분석·차단                  | HTTP/HTTPS 요청 내용 분석·필터링               |
| 적용 대상 | CloudFront, Route 53, ALB, NLB, GA | CloudFront, ALB, API Gateway, AppSync |
| 비용    | Standard 무료 / Advanced 유료          | 사용량 기반 유료                             |
| 보안 목적 | 가용성 유지                             | 취약점 악용 차단                             |
9. AWS CloudHSM
  - AWS에서 제공하는 **전용 하드웨어 보안 모듈(Hardware Security Module, HSM)** 서비스
  - 암호 키를 클라우드에서 생성·저장·관리하되, **고객이 직접 키를 완전하게 소유·제어**할 수 있도록 설계
  - **HSM**: 물리적으로 보안이 강화된 하드웨어 장치로, 암호 키 생성·저장·암호화·복호화 연산을 안전하게 수행.
  -  **CloudHSM**: AWS가 HSM 하드웨어를 관리하지만, 키의 생성과 사용 권한은 전적으로 고객이 가짐.
10. AWS KMS (Key Management Service)
  - 관리형 키 관리 서비스
   - 대칭·비대칭 암호 키를 생성·저장·관리하고, AWS 서비스 및 애플리케이션에서 안전하게 사용할 수 있도록 지원

|항목|AWS CloudHSM|AWS KMS|
|---|---|---|
|키 소유권|100% 고객 소유|AWS 관리(고객은 논리적 접근만)|
|보안 인증|FIPS 140-2 Level 3|FIPS 140-2 Level 2|
|사용 편의성|직접 키 관리 필요|자동화·간편|
|통합 범위|표준 암호 API, 맞춤형 암호화 가능|AWS 서비스와 긴밀하게 통합|
|비용|HSM 인스턴스 시간당 요금|API 호출당 요금|
