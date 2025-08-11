
| 타입 패밀리                               | 인스턴스 시리즈                      | 유니크한 특징                                                                  |
| ------------------------------------ | ----------------------------- | ------------------------------------------------------------------------ |
| **범용 (General Purpose)**             | **T 시리즈 (t4g, t3, t3a)**      | 버스트 성능(CPU Credit) 기반, 유휴 시 크레딧 축적 → 필요 시 순간 성능 향상. 저부하·비연속 워크로드에 비용 효율적 |
| **범용 (General Purpose)**             | **M 시리즈 (m7g, m6i)**          | CPU·메모리 비율 균형, 다목적 범용. 대부분의 애플리케이션에 무난                                   |
| **컴퓨팅 최적화 (Compute Optimized)**      | **C 시리즈 (c7g, c6i)**          | 높은 vCPU:메모리 비율(2GB/vCPU 수준). 게임 서버·고성능 웹 서버·배치 처리에 특화                    |
| **HPC 최적화 (HPC Optimized)**          | **HPC 시리즈 (hpc6a, hpc6id 등)** | HPC 전용 설계, 200Gbps 네트워크, 저지연 EFA 지원, 과학 계산·CFD·기계학습 훈련 최적                |
| **메모리 최적화 (Memory Optimized)**       | **R 시리즈 (r7g, r6i)**          | 대용량 메모리(8GB/vCPU 이상). 인메모리 DB·고속 캐싱·분석 처리에 최적                            |
| **메모리 최적화 (Memory Optimized)**       | **X 시리즈 (x2idn, x2iedn)**     | 초대형 메모리(최대 2TB/인스턴스). SAP HANA 등 대형 인메모리 워크로드 전용                         |
| **메모리 최적화 (Memory Optimized)**       | **u- 시리즈 (u-24tb1.metal)**    | 최대 24TB 메모리, 베어메탈. 초대규모 인메모리 DB 전용                                       |
| **스토리지 최적화 (Storage Optimized)**     | **I 시리즈 (i4i)**               | 초고속 NVMe SSD 로컬 스토리지. OLTP·NoSQL DB·저지연 트랜잭션 처리 최적                       |
| **스토리지 최적화 (Storage Optimized)**     | **D 시리즈 (d3/d3en)**           | 대용량 HDD 로컬 스토리지(수백 TB). 로그·데이터 레이크·대용량 백업 전용                             |
| **스토리지 최적화 (Storage Optimized)**     | **H1**                        | 높은 디스크 처리량(HDD). 빅데이터·분산 파일 시스템(HDFS) 최적화                                |
| **가속화된 컴퓨팅 (Accelerated Computing)** | **P 시리즈 (p4d)**               | NVIDIA A100 GPU 최대 8개. 대규모 머신러닝 학습·HPC에 최적                               |
| **가속화된 컴퓨팅 (Accelerated Computing)** | **G 시리즈 (g5)**                | NVIDIA A10G GPU, 그래픽 렌더링·AI 추론 모두 지원, 가상 워크스테이션 구현 가능                    |
| **가속화된 컴퓨팅 (Accelerated Computing)** | **Inf 시리즈 (inf2)**            | AWS Inferentia2 칩 탑재. 머신러닝 추론 성능 대비 비용 효율 우수                             |
| **가속화된 컴퓨팅 (Accelerated Computing)** | **Trn 시리즈 (trn1)**            | AWS Trainium 칩 탑재. 대규모 딥러닝 학습에 최적, GPU 대비 전력 효율 높음                       |
