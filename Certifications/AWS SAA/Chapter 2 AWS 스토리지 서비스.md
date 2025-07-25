### 스토리지 서비스의 3 유형
- 객체 스토리지 : 데이터+메타데이터+ 고유 ID를 구성으로 갖는 객체의 저장소
--> 빈번 수정/삭제에 불리. 실시간 업데이트 데이터에 부적합.
- 블록 스토리지: 데이터를 같은 크기의 블록으로 나누어 저장하고 각 블록의 고유 주소를 부여해 직접 접근하는 스토리지. EC2에서 자주 사용 (스냅샷) + EBS
- 파일 스토리지 : 우리가 흔히 아는, 파일 단위로 데이터를 저장하고 경로 기반 접근.


### S3 (Simple Stroage Service)
- 객체 스토리지
-  2006년 소개. 99.99999999999 (9가 11개) 수준의 내구성 및 고신뢰성
- 네임스페이스로 버켓 단위로 관리.
##### - 장점
- 간편성 : 진관적인 웹기반 콘솔 + 모바일 앱도 제공, 리눅스 스타일의 AWS CLI도 제공
- 확장성 : 거의 무제한 확장성 , (데이터 레이크)
- 신뢰성 : 99.99999999999 의 신로성으로 두개 시설의 문제가 생겨도 보존 (3개에 분할 저장)
- 보안성 : 암호화 기능 제공, 자동 암호화,  IAM에 따른 접근 권한 관리
- 고성능 : 네트워크 효율을 위한 멀티파트 업로드 기능 제공
- 가용성 : 99.99퍼센트의 요청 응답 성공. --> 일 : 8.6s / 주 : 1m 0.5s / 월 : 4m 23/ 연 : 52m 35
- 저비용 : 비용대비 높은 효율성. 사용량에 대해서만 지불 
- 관리 용이성 : 자동 스토리지 최적화, 보안 관리의 효율성 증대
- 연꼐성 : 다른 서드 파티 도구와 쉽게 연계

##### - 실무 활용법
- 데이터 백업 : 신뢰성이 높으므로 백업에 좋고, 버전별 관리 기능을 제공.
- 테이프 저장 장치 대체 
- **정적 웹사이트 호스팅** : 요청 처리 확장으로 쉽게 접속 가능
- 애플리케이션 호스팅 : 백엔드 없는 앱을 쉽게 배포
- 재난 복구 : 크로스 리전 복구 전략(미리 다른 리전 백업-복제도 쉬움)으로 쉽게 복구 및 사용
- 콘텐츠 배포 : 미디어 파일 등도 쉽게 접근 가능 및 소프트웨어 다운로드 창구로도 가능. Cloudfront로 직접 배포도 간으
- 데이터 레이크 :  어떠한 종류든 막대한 데이터를 저장 가능 및 다른 분석도구와 연계 가능
- 프라이빗 저장소 

##### - S3 기본 개념
-  URL
	 `http://버킷명.s3.리전.amazonaws.com/객체키`
- 버킷의 목적
	1.  S3 네임스페이스 최상위 레벨
	2. 비용 부담하는 계정의 표시
	3. 액세스 컨트롤에서 역할 수행
	4. 사용량 보고서 누적 유닛 표시
-  특징
	 기본적으로 다른 리전 반출 불가
	 객체마다 유일한 ID 할당
	 S3의 기본 인터페이스는 REST API , https 모드에서 **SOAP API** 지원
- S3 REST API 와 대응되는  HTTP 명령
	 GET -> Read/ POST ->Create / PUT-> Create / Delete -> delete
	 같은 객체 키에 PUT/POST 하면 덮어짐 , 즉 create

##### - 데이터 일관성 모델
- S3는 OS 기반 파일 시스템이 아닌 웹 기반의 데이터 저장소 
- 객체 작성 시 AZ 내 로드밸런서와 연결 -> 웹서버 API 연결 ->  인덱싱 및 스토리지에 중복 저장
- 기록 후 판독 일관성 및 종국적 일관성 모델을 제공
- 모든 AZ에 변경 사항이 적용 될떄까지 그 전의 형태로 제공. 3 AZ에 반영디 되야 다 제공
- 객체 잠금을 지원하지 않으므로 최종 PUT 된 데이터가 남음

##### - 성능 고려
- 초당 100회 이상의 PUT/LIST/DELETE 혹은 300회 이상의 GET 하는 경우 작업의 워크로드 분산  고려해야함
- 버킷은 자동으로 파티셔닝 해주며, 버킷 이름은 글로벌에서 유니크함.
- 객체 키는 버킷 내에서 유일 해야하며, 최대 1024 바이트 용량의 UTF-8 로 저장 (즉 이름이 1024바이트를 넘을 수 없음)
- 객체 키 경로 접두사에 따라 **트리 구조의 파티셔닝**을 진행.
-- 과거에는 경로 마다 접두어의 맨 앞 글자로 파티셔닝 트리를 형성했다고 한다.
-->  하지만 2018년 이후로 자동 샤딩 등에 의해 , 키 이름 문자열 역순 배열 혹은 Hex Hash 프리픽스 추가(무작위로 하여 잘 분산되게끔) 는 비권장 된다.

##### - 암호화
- 크게 2가지 - 전송 중 데이터 암호화, **저장된 데이터 암호화**
- 전송 중 데이터 암호화는 AWS의 특별한 기술이 아닌 TLS 및 https를 통한 종단간 암호화를 의미한다.
- 저장 시 암호화 - 즉 클라이언트 측 암호화 , 서버 측 암호화로 나뉨
1. 클라 측 암호화는 전송 전 본인이 암호화하는 방식. 