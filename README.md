# 📚 ReadPick (도서 추천 및 자동 데이터 구축 서비스)

> **네이버와 알라딘 API를 활용한 실시간 도서 데이터 수집 및 개인화 추천 시스템**
> 본 프로젝트는 로컬 개발부터 Docker 기반 클라우드 배포, 외부 API 통합 및 CORS 이슈 해결까지 전체 사이클을 직접 경험하며 구축했습니다.

---

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

---

## 🚀 데이터 파이프라인 (Data Pipeline)

ReadPick은 정적인 데이터에 의존하지 않고, **자동화된 5단계 파이프라인**을 통해 데이터를 동적으로 구축합니다.

| 단계 | 명칭 | 설명 |
| :-- | :--- | :--- |
| **1** | **Seed Data** | `data.sql`을 통해 서비스 시동을 위한 기본 키워드 주입 |
| **2** | **Primary Search** | 네이버 API를 통해 ISBN 및 도서 기본 정보 수집 |
| **3** | **Data Bridging** | 수집된 데이터를 알라딘 API 상세 요청 파라미터로 전달 |
| **4** | **Enrichment** | 알라딘 API를 통해 정밀 카테고리 및 상세 메타데이터 확보 |
| **5** | **Custom Logic** | 프로젝트 전용 3단계 분류 체계로 재분류 후 DB 통합 저장 |



---

## 🏗 System Architecture

```text
 [Client: React] <---> [Spring Boot Server (Render)] <---> [PostgreSQL]
                                |
                    +-----------+-----------+
                    |                       |
            [Naver Search API]      [Aladin Open API]



