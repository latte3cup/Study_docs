

---

# 1) AWS 하드웨어 VPN(AWS Managed Site-to-Site VPN)

**정의**: 퍼블릭 인터넷 위에 **IPsec 터널**을 만들어 **온프레미스 ↔ VPC** 를 안전하게 연결하는 **관리형 VPN**. AWS 쪽 끝단은 **가상 프라이빗 게이트웨이(VPG/VGW)** 또는 **전송 게이트웨이(TGW)**, 기업 쪽은 **커스머 게이트웨이(CGW)** 장비가 맡는다. ([AWS 문서](https://docs.aws.amazon.com/vpn/latest/s2svpn/how_it_works.html?utm_source=chatgpt.com "How AWS Site-to-Site VPN works"))

**구성 요소**:

- AWS 끝단: VGW **또는** TGW.
- 온프레미스 끝단: CGW(기업 라우터/방화벽/가상 어플라이언스). ([AWS 문서](https://docs.aws.amazon.com/vpn/latest/s2svpn/your-cgw.html?utm_source=chatgpt.com "AWS Site-to-Site VPN customer gateway devices"))

**동작**: 기본적으로 **이중 터널(2개)** 을 제공해 고가용성을 확보한다. 라우팅은 **정적(Static)** 또는 **BGP(Border Gateway Protocol)** 를 지원한다. ([AWS 문서](https://docs.aws.amazon.com/vpn/latest/s2svpn/how_it_works.html?utm_source=chatgpt.com "How AWS Site-to-Site VPN works"))

**언제 적합한가**: 빠른 구축, 초기 비용이 낮아야 함, 백업 회선, 지점 연결의 시작점.

**장점**: 빠른 개통, 관리형(HA 내장), BGP로 동적 라우팅 가능. ([AWS 문서](https://docs.aws.amazon.com/vpn/latest/s2svpn/how_it_works.html?utm_source=chatgpt.com "How AWS Site-to-Site VPN works"))  
**단점**: 인터넷 품질에 영향, 대역폭/지연 변동.

**간단 절차**:

1. VPC에 **VGW** 생성·부착 또는 **TGW** 준비.
2. 기업 장비의 **공인 IP**·라우팅 방식을 담은 **CGW 리소스** 등록. ([AWS 문서](https://docs.aws.amazon.com/vpn/latest/s2svpn/SetUpVPNConnections.html?utm_source=chatgpt.com "Get started with AWS Site-to-Site VPN"))
3. **VPN 연결** 생성(목표 게이트웨이: VGW/TGW), 경로·보안 그룹 반영. ([AWS 문서](https://docs.aws.amazon.com/vpn/latest/s2svpn/SetUpVPNConnections.html?utm_source=chatgpt.com "Get started with AWS Site-to-Site VPN"))

**구조**:

```
[On-Prem CGW] ==(IPsec over Internet)== [VGW or TGW] -- [VPC]
```

---

# 2) AWS Direct Connect(DX)

**정의**: 통신사업자의 **전용 회선**으로 **온프레미스 ↔ AWS** 를 직접 연결. 인터넷을 통하지 않아 **안정적 지연/대역폭**을 제공한다. ([AWS 문서](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html?utm_source=chatgpt.com "AWS Direct Connect Locations"))

**핵심 개념(가상 인터페이스, VIF)**:

- **프라이빗 VIF(Private VIF)**: 사설 IP로 **VPC** 에 접속. 단일 VPC 또는 **DX 게이트웨이(DXGW)** 를 통해 다수 VGW/TGW에 도달. ([AWS 문서](https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html?utm_source=chatgpt.com "AWS Direct Connect virtual interfaces and hosted virtual ..."))
- **퍼블릭 VIF(Public VIF)**: **S3 같은 AWS 퍼블릭 서비스** 전체에 공인 IP로 접속. ([AWS 문서](https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html?utm_source=chatgpt.com "AWS Direct Connect virtual interfaces and hosted virtual ..."))
- **트랜짓 VIF(Transit VIF)**: **TGW** 로 연결해 다수 VPC를 중앙에서 수용. ([AWS 문서](https://docs.aws.amazon.com/directconnect/latest/UserGuide/create-vif.html?utm_source=chatgpt.com "AWS Direct Connect virtual interfaces"))
    

**프로토콜·요건**: **802.1Q VLAN 태깅**, **BGP + MD5**, 선택적 **BFD**(쾌속 헬스체크), **점보 MTU** 지원. ([AWS 문서](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html?utm_source=chatgpt.com "AWS Direct Connect Locations"))

**언제 적합한가**: 금융/게임 등 **지연·손실 민감**, **대역폭(1~100Gbps)** 이 필요한 경우.  
**장점**: 안정성·예측 가능한 성능, 대규모 트래픽 비용 최적화. ([AWS 문서](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-aws-transit-gateway.html?utm_source=chatgpt.com "AWS Direct Connect + AWS Transit Gateway"))  
**단점**: 리드타임·비용, 이중화 설계 필요.

**구조**:

```
[On-Prem Router] ==(DX 전용선)== [DX Location] ==(VIF)== [DXGW/TGW/VGW] -- [VPC]
```

---

# 3) VPN CloudHub

**정의**: **여러 지점의 CGW** 들을 **단일 VGW**(또는 TGW) 에 **각각 Site-to-Site VPN** 으로 연결해, **지점↔지점** 트래픽까지 **AWS를 허브로 중계**하는 패턴. VPC 유무와 무관하게 허브-스포크로 운영 가능. ([AWS 문서](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-vpn-cloudhub.html?utm_source=chatgpt.com "AWS VPN CloudHub"))

**포인트**:

- 각 지점은 **자기 CGW ↔ AWS VGW** 로 VPN을 맺고, **BGP** 로 경로 교환.
- AWS가 **허브** 역할을 하며 지점 간 통신을 중계한다. (주 회선/백업 회선 모두 가능) ([AWS 문서](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-vpn-cloudhub.html?utm_source=chatgpt.com "AWS VPN CloudHub"))


**언제 적합한가**: 다수 지점(지사/브랜치)을 빠르게 상호 연결, MPLS 대체·보완.

**구조**:

```
[Branch A CGW] --\
                   \__ (IPsec) __ [VGW] __ (IPsec) __ /-- [Branch B CGW]
[Branch C CGW] --/                                   \-- [Branch D CGW]
```

---

# 4) Software VPN

**정의**: **EC2** 에 **OpenVPN/StrongSwan/WireGuard** 같은 **소프트웨어 VPN 어플라이언스**를 직접 올려 **터널 종단**으로 쓰는 방식. AWS 관리형 하드웨어 VPN이 지원하지 않는 고급 기능/프로토콜을 스스로 구현한다. ([AWS 문서](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/introduction.html?utm_source=chatgpt.com "Introduction - Amazon Virtual Private Cloud Connectivity ..."))

**특징**:

- 유연성 높음(사용자 인증·LDAP, 커스텀 암호군, 정책 라우팅 등).
- 반대로 **운영/패치/HA** 를 전부 **직접 책임**져야 한다.
- 경로는 인터넷(필요 시 가속/멀티AZ 이중화는 아키텍처로 해결).

**언제 적합한가**: 특수 요구(비-IPsec, 사용자 단말 VPN, 커스텀 인증), **P2S(사용자 VPN)** 혹은 라보 환경.

**구조**:

```
[On-Prem (SW/장비)] ==(인터넷/암호화)== [EC2 Software VPN] -- [VPC]
```

---

## 빠른 매핑 요약

|방식|AWS 측 끝단|온프레미스 끝단|주 라우팅|주요 용도|
|---|---|---|---|---|
|하드웨어 VPN|**VGW/TGW**|**CGW**|정적/BGP|빠른 구축, 백업 회선, 지점 연결 ([AWS 문서](https://docs.aws.amazon.com/vpn/latest/s2svpn/how_it_works.html?utm_source=chatgpt.com "How AWS Site-to-Site VPN works"))|
|Direct Connect|**DXGW/TGW/VGW**|전용선 라우터|BGP|안정/저지연, 대역폭·비용 최적화 ([AWS 문서](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html?utm_source=chatgpt.com "AWS Direct Connect Locations"))|
|VPN CloudHub|**VGW**|다수 **CGW**|BGP|지점↔지점 허브-스포크 중계 ([AWS 문서](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-vpn-cloudhub.html?utm_source=chatgpt.com "AWS VPN CloudHub"))|
|Software VPN|**EC2(자체 VPN)**|SW/장비|구현에 따름|커스텀 기능/프로토콜, 소규모·특수 용도 ([AWS 문서](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/introduction.html?utm_source=chatgpt.com "Introduction - Amazon Virtual Private Cloud Connectivity ..."))|

---

## 선택 가이드 한 줄씩

- **지금 바로 안전하게 붙이고 싶다**: 하드웨어 VPN. ([AWS 문서](https://docs.aws.amazon.com/vpn/latest/s2svpn/how_it_works.html?utm_source=chatgpt.com "How AWS Site-to-Site VPN works"))
    
- **지연/대역폭이 최우선**: Direct Connect(+TGW·BFD). ([AWS 문서](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html?utm_source=chatgpt.com "AWS Direct Connect Locations"))
    
- **지점이 많고 중앙에서 라우팅**: VPN CloudHub 또는 TGW+VPN. ([AWS 문서](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-vpn-cloudhub.html?utm_source=chatgpt.com "AWS VPN CloudHub"))
    
- **관리형 VPN이 못하는 걸 해야 한다**: Software VPN. ([AWS 문서](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/introduction.html?utm_source=chatgpt.com "Introduction - Amazon Virtual Private Cloud Connectivity ..."))
    

---

**Q1**

내 지점 수, 트래픽 패턴, 지연 요구를 기준으로 하면 하드웨어 VPN·DX·CloudHub·SW VPN 중 무엇이 최적일까?

**Q2**

Direct Connect를 도입한다면 Private/Public/Transit VIF 중 무엇을 쓰고, BGP 정책은 어떻게 설계해야 할까?

**Q3**

TGW를 허브로 둘 때 온프레미스 다중 경로(ECMP)·이중 터널·라우팅 우선순위 설계를 어떻게 가져갈까?