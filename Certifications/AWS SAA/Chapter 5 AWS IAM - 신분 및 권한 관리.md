### IAM : Identity and Access Management
- **AWS 리소스에 대한 ‘누가(Who)’, ‘무엇을(What)’, ‘어디서(Where)’, ‘어떻게(How)’ 접근할 수 있는지**를 통제하는 서비스

##### 핵심 요약
- **사용자·그룹·역할(Role)**을 만들어 **신원(Identity)**을 정의
- **정책(Policy)**을 통해 권한(Access)을 부여하거나 제한
- **최소 권한 원칙(Least Privilege)**을 기반으로 설계
- **MFA(다중 인증)**, **액세스 키(Access Key)**, **콘솔 로그인** 등 다양한 인증 수단 제공
- AWS 전역(Global) 서비스 → 모든 리전에 동일하게 적용
- 루트 사용자 사용 최소화, IAM 사용자/역할 중심 운영
- 세분화된 리소스별 접근 제어 가능 (S3 객체 단위, EC2 인스턴스 단위 등)

---
