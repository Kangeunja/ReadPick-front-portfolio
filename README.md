# 📚 ReadPick (도서 추천 및 자동 데이터 구축 서비스)

> **네이버와 알라딘 API를 활용한 실시간 도서 데이터 수집 및 개인화 추천 시스템**
> 본 프로젝트는 로컬 개발부터 Docker 기반 클라우드 배포, 외부 API 통합 및 CORS 이슈 해결까지 전체 사이클을 직접 경험하며 구축했습니다.

## 🛠 기술 스택 및 개발 환경

### **Backend**
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white"> <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white"> <img src="https://img.shields.io/badge/MyBatis-000000?style=for-the-badge&logo=fluentd&logoColor=white">

* **개발 환경:** JDK 17, Maven, Lombok
* **핵심 기술:** Spring Boot, MyBatis, PostgreSQL
* **배포 및 인프라:** Docker, Render
* **설정 관리:** Spring Profile 활용 (`dev` - 로컬, `prod` - 배포)

### **Frontend**
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">

* **개발 환경:** Node.js / npm
* **핵심 기술:** React, Axios (인스턴스 기반 통신 구조화)
* **배포:** Netlify
* **설정 관리:** `.env` 환경 변수를 통한 API URL 동적 관리


## 🚀 데이터 파이프라인 (Data Pipeline)

ReadPick은 정적인 데이터에 의존하지 않고, **자동화된 5단계 파이프라인**을 통해 데이터를 동적으로 구축합니다.

| 단계 | 명칭 | 설명 |
| :-- | :--- | :--- |
| **1** | **Seed Data** | `data.sql`을 통해 서비스 시동을 위한 기본 키워드 주입 |
| **2** | **Primary Search** | 네이버 API를 통해 ISBN 및 도서 기본 정보 수집 |
| **3** | **Data Bridging** | 수집된 데이터를 알라딘 API 상세 요청 파라미터로 전달 |
| **4** | **Enrichment** | 알라딘 API를 통해 정밀 카테고리 및 상세 메타데이터 확보 |
| **5** | **Custom Logic** | 프로젝트 전용 3단계 분류 체계로 재분류 후 DB 통합 저장 |


## 🏗 System Architecture

```text
       [ Frontend ]              [ Backend ]              [ Database ]
      React (Netlify) <------> Spring Boot (Render) <------> PostgreSQL
                                     |
                                     |
                        +------------+------------+
                        |                         |
               [ Naver Search API ]      [ Aladin Open API ]
```

## 🌐 Deployment Architecture

프론트엔드와 백엔드를 완전히 분리하여 실제 서비스 환경과 유사한 인프라를 구축했습니다.

* **Frontend**: `Netlify`를 통한 정적 호스팅 및 환경변수 기반 빌드.
* **Backend**: `Docker` 컨테이너화 및 `Render`를 활용한 클라우드 배포.
* **Database**: `Render Managed PostgreSQL` 연동으로 데이터 영속성 확보.

### **환경 변수 관리 (Environment Variables)**
| 플랫폼 | 관리 변수 | 용도 |
| :--- | :--- | :--- |
| **Netlify** | `REACT_APP_API_URL` | 백엔드 API 서버 주소 연결 |
| **Render** | `DB_URL`, `API_KEY` | DB 접속 정보 및 외부 API 보안 키 관리 |



## 🔍 Troubleshooting (주요 이슈 해결)

### 1 배포 환경 데이터 공백 이슈
* **문제**: 배포 서버 접속 시 도서 리스트 API가 빈 배열(`[]`)만 반환.
* **원인**: 소스코드만 배포되어, 로직의 연료인 **DB 기초 키워드**가 부재함.
* **해결**: SQL 직접 주입을 통해 서비스 가동을 위한 최소 데이터를 확보함.

### 2 CORS 및 세션 인증 문제 (Netlify ↔ Render)
* **문제**: 배포 환경에서 로그인 시 쿠키/세션이 전달되지 않아 인증 유지가 안 되는 현상 발생
* **원인**: 브라우저의 보안 정책으로 인해 서로 다른 도메인 간 인증정보 전송 차단 및 
HTTPS 환경의 SameSite 설정누락
* **해결**: Backend 전역 CORS 설정(allowCredentials, allowedOrigins) 적용 및 
쿠키옵션(SameSite=None, Secure=true) 명시

### 3 외부 API 연동 실패 및 환경별 설정관리
* **문제**: 로컬 개발 환경과 배포 서버의 DB 정보 및 API URL 혼선 발생
* **해결**: Spring Profile(application-dev, application-prod) 분리 운영
Render/Netlify의 Environment Variables 기능을 통해 소스코드 노출 없이 중요한 키값(API Key, JWT Secret) 관리

### 4 데이터 수집 엔진 가동 및 영속성 확보
* **문제**: 설정 완료 후에도 DB가 비어 있음 및 대량 데이터 저장 시 휘발 우려
* **해결**: 전용 API(DBDataInsert)를 설계하여 최초 1회 강제 구동 완료. 또한 ddl-auto: update 설정과 클라우드 Managed DB 활용으로 서버 재시작 후에도 데이터가 유지되도록 영속성 확보.
  
---

## 🔗 Deep Dive
더욱 상세한 개발 과정, 기술적 고찰 및 단계별 해결과정은 아래 노션 링크에서 확인하실 수 있습니다.
[👉 ReadPick 개발 일지 및 트러블슈팅 상세 (Notion)]
