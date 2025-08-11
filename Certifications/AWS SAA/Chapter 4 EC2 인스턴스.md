#### EC2 (Elastic Compute Cloud)
- 사용량에 대해서 과금. 높은 확장성

#### EC2의 장점
 - 빠른 제품 출시 : 거의 즉각적/ 신규 서버 획득 및 설치에 시간 소요 없음
 - 확장성 : 스케일 업 & 스케일 다운 자유로움
 - 통제성 : 배포한 서버 언제든지 시작/중지, 해당 서버 루트 사용자로 접근 가능
 - 신뢰성 : SLA 99.95% 수준
 - 보안성 : 대부분 AWS 가 해줌 +  VPC와 같은 네트워크 계층은 직접.
 - 다양한 인스턴스 타입 : 목적에 맞는 인스턴스 종류가 많음 
 - 통합 : 다양한 다른 AWS 서비스와 함께 사용 및 조합
 - 비용 효율성 : 인스턴스 시간/초당 사용 (사용한 만큼 과금)

###### EC2 지원 OS 종류

| Windows | Amazon Linux | Debian | SUSE | CentOS | Red Hat Enterprise Linux | Ubuntu |
|---------|--------------|--------|------|--------|--------------------------|--------|

---
#### EC2 인스턴스 타입

| 타입 패밀리                               | 유니크한 특징                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| **범용 (General Purpose)**             | CPU·메모리 균형이 좋아 다양한 워크로드에 무난하게 적용 가능. 웹 서버, 애플리케이션 서버, 소규모 데이터베이스 등 범용 환경에 적합                 |
| **컴퓨팅 최적화 (Compute Optimized)**      | 높은 vCPU:메모리 비율로 연산 성능 극대화. 게임 서버, 고성능 웹 서버, 배치 처리, 고빈도 거래(HFT) 등에 유리                         |
| **메모리 최적화 (Memory Optimized)**       | 대용량 메모리를 제공하여 인메모리 데이터베이스, 고속 캐싱, 실시간 빅데이터 분석, SAP HANA 같은 엔터프라이즈급 애플리케이션에 적합                |
| **스토리지 최적화 (Storage Optimized)**     | 초고속 NVMe SSD 또는 대용량 HDD 로컬 스토리지를 제공. OLTP·NoSQL DB, 로그 처리, 데이터 웨어하우스, 빅데이터 처리에 유리            |
| **가속화된 컴퓨팅 (Accelerated Computing)** | GPU, FPGA, 전용 칩을 사용해 그래픽 처리, 머신러닝 학습·추론, HPC, 시뮬레이션 등 특수 연산을 가속화                             |
| **HPC 최적화 (HPC Optimized)**          | 고성능 컴퓨팅 전용 설계, 초고속 네트워크(최대 200Gbps)와 저지연 EFA 지원. 과학 계산, 기계학습 훈련, CFD, 유전체 분석 등 대규모 병렬 연산에 최적 |

상세 참고 [[EC2 타입 패밀리별 인스턴스 시리즈]]

---
#### EC2 프로세서
- 과거에는 모두 Intel Xeon 기반이나 비용 최적화 및성능 경쟁을 위해 추가됨

| 프로세서 종류                                         | 공식 문서 기반 설명 및 특징                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Intel Xeon (x86)**                            | EC2 인스턴스 중 일부는 **Intel Xeon Scalable** 프로세서를 사용합니다. 예: `M7i` 시리즈는 4세대 Xeon 프로세서를 사용하며, Intel AMX(행렬 연산 가속), DDR5 메모리 등 최신 기능을 지원합니다. ([AWS 문서](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-optimize-cpu.html?utm_source=chatgpt.com "CPU options for Amazon EC2 instances"))                                                                                                                                                                                                                                           |
| **AMD EPYC (x86)**                              | `M7a`, `M6a` 시리즈 등은 **3세대 AMD EPYC 프로세서**를 사용하며, Intel 대비 최대 50% 향상된 성능과 비용 효율성을 제공합니다. ([Amazon Web Services, Inc.](https://aws.amazon.com/ec2/instance-types/?utm_source=chatgpt.com "Amazon EC2 Instance Types - Compute - AWS"))                                                                                                                                                                                                                                                                                                    |
| **AWS Graviton (Arm 기반)**                       | `M6g`, `C6g`, `R6g`, `M7g`, `C7g`, `R7g` 등은 **AWS Graviton 기반**입니다. Graviton2는 최대 40% 더 나은 가격 대비 성능과 저전력 소비를 강조하며, Graviton3/4는 메모리 및 암호화 성능, 병렬 처리 성능에서 더 큰 향상을 이룹니다. ([AWS 문서](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html?utm_source=chatgpt.com "Amazon EC2 instance types"), [Amazon Web Services, Inc.](https://aws.amazon.com/ec2/graviton/?utm_source=chatgpt.com "AWS Graviton Processor - Amazon EC2"), [위키백과](https://en.wikipedia.org/wiki/AWS_Graviton?utm_source=chatgpt.com "AWS Graviton")) |
| **Trainium / Inferentia / GPU 등 (Accelerated)** | CPU는 아니지만, ML 학습용 `Trn1` 인스턴스는 **AWS Trainium**, inference용 `Inf2`는 **AWS Inferentia2**, 그래픽/병렬 처리는 GPU 기반 인스턴스(`G5g`, `P4d` 등)가 있습니다. ([AWS 문서](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html?utm_source=chatgpt.com "Amazon EC2 instance types"))                                                                                                                                                                                                                                                           |
######  각 프로세서 별 기능
1. Intel Xeon
  - Intel AES‑NI: 암호화 연산을 하드웨어로 가속해 빠르고 안전한 데이터 보호 제공
  - AVX / AVX2 / AVX‑512(Advanced Vector Extensions): 고급 벡터 연산 지원, 이미지·영상·과학 계산 처리에 효과적
  - _Turbo Boost_: 자동 클럭 부스트로 단일 스레드 성능 향상
  - _Intel DL Boost (VNNI)_: 딥러닝 추론 연산 최적화, INT8 기반 추론 가속
2. AMD EPYC
  - _SME (Secure Memory Encryption)_: 메모리 암호화 기능
  - _TSME (Transparent Single-Key Memory Encryption)_: 단일 키 기반 메모리 암호화 지원
  - _AVX (벡터 연산 지원)_: 병렬 계산 강화
  - _SEV-SNP_: 인스턴스 상태 증명 및 메모리 보호 기능 제공
3. AWS Graviton 
  - 자체 설계된 Arm 아키텍처 기반 프로세서로, 비용 대비 성능이 뛰어나고 저전력 설계를 갖춤  
  - _Graviton2, Graviton3 세대는 가격 대비 성능 및 처리 효율 크게 향상_

---
Ec2 네트워크 특징
- **플레이스먼트 그룹(Placement Group)** : AWS EC2에서 **여러 인스턴스를 물리적으로 어떻게 배치할지**를 지정하는 기능 제공, 지원하는 인스턴스인지 확인해야됨

|유형|배치 방식|주요 특징|사용 사례|
|---|---|---|---|
|**Cluster** (클러스터)|동일 AZ 내에서 물리적으로 가까운 서버에 밀집 배치|저지연, 고대역폭|HPC, MPI 통신, 빅데이터 처리|
|**Spread** (분산)|서로 다른 물리 서버·랙에 분산 배치|장애 도메인 분리, 고가용성|중요 서비스 인스턴스(장애 영향 최소화)|
|**Partition** (파티션)|인스턴스를 그룹별(파티션)로 배치하고 파티션 간 하드웨어 공유 없음|대규모 분산 처리, 노드 간 장애 영향 최소화|Hadoop, HDFS, Cassandra 등|
- 크게 정리하면... 
	1. VPC 기반 격리 네트워크 – EC2는 VPC 내에서 동작하며 서브넷·라우팅·게이트웨이로 트래픽을 제어.
	2. ENA/EFA 고성능 어댑터 – ENA로 최대 100Gbps, EFA로 HPC용 저지연 네트워크 지원.
	3. 탄력적 네트워크 구성 – Elastic IP, PrivateLink, VPC Peering, Transit Gateway로 유연한 연결 가능.
	4. IPv6·듀얼스택 지원 – IPv4와 IPv6를 동시에 사용해 NAT 없이 글로벌 통신 가능.
	5. 보안 제어 – 보안 그룹(Stateful)과 NACL(Stateless)로 인스턴스·서브넷 수준 트래픽 관리.
	6. 전송 최적화 – EBS 최적화로 스토리지·네트워크 트래픽 분리, SR-IOV로 가상화 오버헤드 최소화.
	7. 위치 기반 최적화 – 플레이스먼트 그룹·로컬 존으로 지연 시간 최소화와 가용성 조절.

--- 
#### Ec2 스토리지 특징
-  2장을 참고할것. 크게 3개의 종류가 있음
1. **EBS** → 대부분의 EC2에서 기본 사용, 지속성 있음
2. **인스턴스 스토어** → 초고속, 휘발성, 특정 인스턴스만 지원
3. **EFS / FSx**(**File System x**) → 공유 파일 시스템, 다중 인스턴스 접근 가능

---
#### Ec2사용법
1. AMI 선택하거나 커스텀으로 생성후 인스턴스 론칭
2. 네트워크 및 보안환경 설정 (VPC 등)
3. 인스턴스 타입 선택
4. AZ 선택 및 EBS 부착 . 필요에따라 EIP까지
5. 인스턴스 시작

--- 
#### EC2 가격 정책

| 구매 옵션                            | 설명                                | 할인률                                                                                                                                                                    | 주요 특징                                                                                                                                                                                                                        |
| -------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **온디맨드 (On-Demand)**             | 시간 또는 초 단위 사용량 기반 요금, 약정 없음       | 없음                                                                                                                                                                     | 유연성 최고, 단기 워크로드에 적합 ([참고](https://aws.amazon.com/ec2/pricing/?utm_source=chatgpt.com "Amazon EC2 Pricing"))                                                                                                                  |
| **예약 인스턴스 (Reserved Instances)** | 1년 또는 3년 약정 기반 요금                 | 최대 72% ([참고](https://aws.amazon.com/ec2/pricing/reserved-instances/pricing/?utm_source=chatgpt.com "EC2 Reserved Instance Pricing"))                                   | 표준(Standard) / 전환(Convertible) 옵션 제공, 일부는 용량 예약 포함 가능 ([참고](https://aws.amazon.com/compare/the-difference-between-on-demand-instances-and-reserved-instances/?utm_source=chatgpt.com "On-Demand Instances vs Reserved ...")) |
| **Savings Plans** (SP)           | 사용량 기반 약정 시스템 ($/시간), 다양한 리소스에 적용 | 최대 72% (EC2 인스턴스 SP), 최대 66% (Compute SP) ([참고](https://aws.amazon.com/savingsplans/compute-pricing/?utm_source=chatgpt.com "Compute and EC2 Instance Savings Plans")) | Compute SP(가장 유연함), 인스턴스 SP(가장 큰 할인) ([참고](https://aws.amazon.com/savingsplans/compute-pricing/?utm_source=chatgpt.com "Compute and EC2 Instance Savings Plans"))                                                            |
| **스팟 인스턴스 (Spot Instances)**     | AWS 유휴 용량을 경매 방식으로 사용             | 최대 90% ([참고](https://aws.amazon.com/ec2/spot/pricing/?utm_source=chatgpt.com "Amazon EC2 Spot Instances Pricing"))                                                     | 비용 절감 크지만, AWS 인스턴스 회수 가능(2분 알림) ([참고.](https://aws.amazon.com/compare/the-difference-between-on-demand-instances-and-reserved-instances/?utm_source=chatgpt.com "On-Demand Instances vs Reserved ..."))                     |
- 1분까지는 최초 과금 후 다음 초당 과금

##### 인프라 배치 옵션

| 옵션                                   | 핵심 특징                                    | 할인 가능성 | 주요 목적           |
| ------------------------------------ | ---------------------------------------- | ------ | --------------- |
| **용량 예약 (Capacity Reservation)**     | 특정 AZ에 인스턴스 실행 용량 예약                     | 없음     | 장애 대비, 고가용성 보장  |
| **공유 테넌시 (Shared Tenancy)**- default | 물리 서버 공유, 기본 방식                          | 없음     | 비용 효율적, 대부분 서비스 |
| **전용 인스턴스 (Dedicated Instance)**     | 단일 테넌트 물리 서버, 하지만 서버 제어는 AWS가 함          | 낮음     | 규제·보안 요건 충족     |
| **전용 호스트 (Dedicated Host)**          | 물리 서버 전담 배정, BYOL 지원, 서버를 온프레미스처럼 고객이 제어 | 낮음     | 라이선스 최적화, 규제 환경 |
실제 구조 특징 (보기 쉽게) [[EC2 인프라 옵션 참고]]