### 7장 평가

**1. AWS Lambda가 지원하는 언어는 무엇인가? (정답 2개)**

A. Perl  
B. Ruby  
C. Java  
D. Python

---

**2. 10시간 동안의 데이터 처리작업에 적합하지 않은 서비스는 무엇인가?**

A. AWS Batch  
B. EC2  
C. Elastic Beanstalk  
D. Lambda

---

**3. 많은 양의 스트리밍 데이터를 처리할 때 적합한 서비스는 무엇인가?**

A. Kinesis Firehose  
B. Kinesis Data Stream  
C. Kinesis Data Analytics  
D. API Gateway

---

**4. 인프라 관리의 부담 없이 사용자의 API 버전을 효율적으로 관리하기 위한 서비스는 무엇인가?**

A. EC2 서버에 버전 컨트롤 시스템 설치  
B. Elastic Beanstalk 사용  
C. API Gateway 사용  
D. Kinesis Data Firehose 사용

---

**5. 데이터가 유입되는 동안 데이터를 변환하려는 경우 가장 간단한 방법은 무엇인가?**

A. Kinesis Data Analytics 사용  
B. 데이터가 유입되는 동안 EMR 클러스터 가동  
C. 데이터 처리 중인 EC2 서버에 Hadoop 설치  
D. S3에서 데이터 변환

---

**6. 서버리스가 아닌 서비스는 무엇인가?**

A. Redshift  
B. DynamoDB  
C. S3  
D. AWS Lambda

---

**7. 실시간으로 유입되는 데이터를 처리해야 하는 경우 적합한 방법은 무엇인가?**

A. S3에 직접 데이터 로딩  
B. S3 IA 사용  
C. S3 중복 구현 감소 사용  
D. Kinesis Data Streams 사용

---

**8. 막대한 양의 데이터를 유입 즉시 처리해야 하지만 이를 위한 적당한 SLA를 확보하지 못한 경우 사용자가 선택해야 할 서비스는 무엇인가?**

A. Kinesis Data Streams  
B. Kinesis Data Firehose  
C. Kinesis Data Analytics  
D. S3

---

**9. RESTful API를 관리하기 위한 가장 좋은 방법은 무엇인가?**

A. API Gateway  
B. EC2 servers  
C. Lambda  
D. AWS Batch

---

**10. AWS Lambda에서 코드를 실행하는 경우 백엔드에 프로비저닝해야 할 EC2 인스턴스의 크기는 무엇인가?**

A. 1분 이하 코드 실행을 위한 경우 T2 Micro를 사용  
B. 1분에서 12분까지의 코드 실행을 위한 경우 M2를 사용  
C. 3분에서 5분까지의 코드 실행을 위한 경우 M2 large를 사용  
D. 백엔드에 EC2 인스턴스를 프로비저닝할 필요 없음

---

**11. AWS OpsWorks가 지원하는 두 가지 환경 설정 관리 서비스는 무엇인가? (정답 2개)**

A. Chef  
B. Ansible  
C. Puppet  
D. Java

---

**12. 고객이 다양한 제품을 주문할 수 있도록 이커머스 사이트의 주문 관리 서비스를 설계 중이며, 주문과 배송의 처리 과정을 분리하고 아키텍처 또한 서로 연동되지 않도록 하려 한다. 배송 우선 순위에서 표준 배송과 우선 배송을 별도로 구분해 관리하려는 경우 AWS의 어떤 서비스가 도움이 되는가?**

A. AWS CloudWatch  
B. AWS CloudWatch Events  
C. AWS API Gateway  
D. AWS SQS

---

**13. 회사에 20개 이상의 사업 부서가 있고 각 부서별로 AWS 계정을 보유하고 있는 경우 서로 다른 AWS 계정의 요금 정산을 통합 관리하기 위한 서비스는 무엇인가?**

A. AWS Organizations  
B. AWS Trusted Advisor  
C. AWS Cost Advisor  
D. AWS Billing Console

---

**14. EMR 클러스터에서 분석 작업을 실행 중이며, 분석 작업에는 오랜 시간이 소요될 것으로 보인다. 클러스터에 처리 및 분석 능력을 추가하면서 동시에 비용을 효율적으로 관리하고 싶은 경우 가장 좋은 방법은 무엇인가?**

A. 태스크 노드에 온디맨드 EC2 인스턴스 추가  
B. 코어 노드에 온디맨드 EC2 인스턴스 추가  
C. 태스크 노드에 스팟 EC2 인스턴스 추가  
D. 태스크 노드에 예약 EC2 인스턴스 추가

---

**15. AWS 리소스가 정상적으로 작동 중이었는데 갑자기 뭔가가 변경됐다는 사실을 알게 됐다. 클라우드 보안 팀이 어떤 API가 정상적으로 작동 중인 리소스의 상태를 변경했다고 설명했을 때, 누가 무엇을 실행했는지 알 수 있는 방법은 무엇인가?**

A. Lambda 함수를 작성해 누가, 무슨 작업을 했는지 파악 가능  
B. AWS CloudTrail 사용  
C. Amazon CloudWatch Events 사용  
D. AWS Trusted Advisor 사용

---

**16. AWS에서 매우 중요한 애플리케이션을 실행 중이며, 1분 데이터 포인트 단위의 Amazon CloudWatch 성능 지표를 활성화해 둔 상태다. 현 시점에서 확인 가능한 가장 먼 과거의 데이터는 무엇인가?**

A. 1주일  
B. 24시간  
C. 1개월  
D. 15일

---

**17. 현재 US-East 리전에서 모든 AWS 리소스를 실행 중이고, 두 번째 리전은 아직 사용하지 않고 있다. 재난 상황 발생 시에도 서로 다른 리전을 통해 장애에 대응할 수 있도록 기업의 인프라를 코드로서 관리하려 할 때 US-East 리전의 리소스와 동일하게 두 번째 리전에 리소스를 프로비저닝하기 위한 방법은 무엇인가?**

A. Amazon EC2, VPC, RDS  
B. Elastic Beanstalk  
C. OpsWorks  
D. CloudFormation

---

**18. EC2 인스턴스의 서비스 용량 제한을 모니터링하기 위한 서비스는 무엇인가?**

A. EC2 dashboard  
B. AWS Trusted Advisor  
C. AWS CloudWatch  
D. AWS Config

---

**19. 여러분은 개발자로서 애플리케이션을 AWS에 배포하려 하지만 인프라에 대한 기반 지식이 부족하고, AWS에서의 인프라 활용 방법도 미숙한 편이다. 필요에 따라 자동으로 확장되는 인프라 기반의 애플리케이션을 배포하되 인프라 관리 업무는 최소화하려는 경우 선택할 수 있는 서비스는 무엇인가?**

A. AWS Config  
B. AWS Lambda  
C. AWS Elastic Beanstalk  
D. Amazon EC2 서버와 Auto Scaling

---

**20. 과거에는 시큐리티 그룹을 누군가 수동으로 변경해야 했고, 그 시간 동안 사용자는 해당 인스턴스에 접속할 수 없는 다운타임이 존재할 수밖에 없었다. 시스템에서의 변경 사항을 확인 및 추적하기 위한 서비스는 무엇인가?**

A. AWS Config  
B. Amazon CloudWatch  
C. AWS CloudTrail  
D. AWS Trusted Advisor