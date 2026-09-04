# 📚 ReadPick (도서 추천 및 자동 데이터 구축 서비스)

> **네이버와 알라딘 API를 활용한 실시간 도서 데이터 수집 및 도서 추천 시스템**
> 
> 본 프로젝트에서 **Frontend 개발 및 Node.js 기반 데이터 중계(BFF) 구축**을 담당하였습니다. API 통신 구조화, CORS 이슈 해결, 사용자 경험 최적화 중심으로 리팩토링을 진행하였습니다. 또한 Groq LLM API를 연동하여 AI 도서 추천 챗봇 및 리뷰 요약 기능을 구현하고, Docker 기반 백엔드 배포와 Netlify 정적 호스팅 배포를 통해 외부 API 통합 과 CORS 이슈문제를 해결한 경험이 있습니다. 

---

## 🛠 기술 스택

### **Frontend & BFF (담당 영역)**
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">


* **핵심 기술:** React, TypeScript, Javascript, Node.js (BFF 역할)
* **배포:** Netlify
* **설정 관리:** `.env` 환경 변수를 통한 API URL 동적 관리

 ### **Backend (협업 영역)**
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white"> <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/MyBatis-000000?style=for-the-badge&logo=fluentd&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">

* **핵심 기술:** Spring Boot, JAVA, MyBatis, MySQL, Supabase Storage
* **배포 및 인프라:** Render
* **설정 관리:** Spring Profile 활용 (`dev` - 로컬, `prod` - 배포)

---

## 👨‍💻 주요 구현 기능

**1. AI 기반 기능 도입(Groq LLM)**   
* **AI 도서 추천 챗봇:** Groq LLM API를 연동하여 맞춤형 도서 추천과 사용자 질의응답 챗봇 구축
* **리뷰 요약 기능:** 도서 상세페이지 내 다수의 사용자 리뷰를 AI가 핵심 내용 기반으로 요약하여 사용자 경험 향상
  
**2. Frontend & UX 최적화**
* **웹 성능 최적화:** Lighthouse 지표 측정 기반으로 레이아웃 CLS 개선 및 초기 로딩 속도(FCP/LCP) 최적화
* **사용자 흐름 및 Auth 분기처리:** 로그인 상태에 따른 조건부 렌더링 처리
* **도서 검색 & 리뷰 CRUD:** 실시간 검색 기능 및 리뷰 작성/수정/삭제 기능

**3. 상태 관리 아키텍처**
* **커스텀 훅 패턴 구축:** 데이터 패칭 및 전역 상태 관리 로직을 커스텀 훅으로 분리하여 재사용성 및 유지보수성 향상

---

## 🚀 데이터 파이프라인 (Data Pipeline)

| 단계 | 명칭 | 설명 |
| :-- | :--- | :--- |
| **1** | **Seed Data** | `data.sql`을 통해 서비스 시동을 위한 기본 키워드 주입 |
| **2** | **Primary Search** | 네이버 API를 통해 ISBN 및 도서 기본 정보 수집 |
| **3** | **Data Bridging** | 수집된 데이터를 알라딘 API 상세 요청 파라미터로 전달 |
| **4** | **Enrichment** | 알라딘 API를 통해 정밀 카테고리 및 상세 메타데이터 확보 |
| **5** | **Custom Logic** | 프로젝트 전용 3단계 분류 체계로 재분류 후 DB 통합 저장 |


## 🏗 System Architecture

```text
               [ Frontend ]
             (React / Netlify)
                    │
                    ▼  (프로필 이미지 파일 전송)
               [ Node.js Server ]  (BFF) 
                    │
                    ▼  (이미지 및 데이터 요청)
             [ Spring Boot Backend ] ──── (파일 업로드) ────> [ Supabase Storage ] 
                   │                                                  │
                    └─────────── (DB에 이미지 URL 저장) ──────────────┘
                                      [ MySQL DB ]
```

## 🌐 Deployment Architecture

프론트엔드와 백엔드를 완전히 분리하여 실제 서비스 환경과 유사한 인프라를 구축했습니다.

* **Frontend**: `Netlify`를 통한 정적 호스팅 및 환경변수 기반 빌드
* **Backend**: `Node.js` 중계 서버 (`Docker` 컨테이너화 및 `Render`를 활용한 클라우드 배포)
* **Database**: `MySQL` 연동으로 데이터 영속성 확보

### **Architecture Update (BFF & Supabase)**
* **Node.js 서버 도입:** 프론트엔드와 백엔드 사이에 Node.js 중계 서버를 두어, 데이터 통신 및 가공 로직을 분리하는 데이터 흐름을 구축했습니다.
* **Supabase 스토리지 연동:** 사용자의 프로필 이미지 업로드 및 수정 기능을 구현하기 위해 백엔드단에서 Supabase Storage를 활용하여 마이페이지 내 업로드된 프로필 이미지 URL을 안전하게 관리하도록 구현했습니다. 

### **환경 변수 관리 (Environment Variables)**
| 플랫폼 | 관리 변수 | 용도 |
| :--- | :--- | :--- |
| **Netlify** | `REACT_APP_API_URL` | 백엔드 API 서버 주소 연결 |
| **Render** | `DB_URL`, `TTB_API_KEY`등 | DB 접속 정보 및 외부 API 보안 키 관리 |


## ⚡ 성능 최적화 및 문제 해결 (Troubleshooting)

### 웹 성능 지표(Lighthouse) 개선 및 초기 로딩 속도 최적화 
* **문제**: 초기페이지 진입 시 레이아웃 흔들림(CLS) 및 API 데이터 로딩 지연 발생
* **원인**: 이미지 고정 크기 미지정 및 비효율적인 초기 API 요청으로 FCP/LCP 지표 저하
* **해결**: Suspense태그와 React.lazy기법 적용, Skeleton UI 도입, fetchpriority속성 적용
* **결과**: Lighthouse Performance 점수 상승, CLS 지표 개선 및 FCP/LCP 로딩 시간 단축, 사용자 경험(UX) 증가로 TBT 단축

---

## 🛠️ 배포 및 인프라 이슈 해결 (Deployment & Infra)

### 1. Node.js BFF를 도입한 CORS 및 세션 인증 문제 (Netlify ↔ Render)
* **문제**: 배포 환경에서 로그인 시 인증 유지가 안되는 현상 발생
* **원인**: 브라우저의 보안 정책으로 인해 서로 다른 도메인 간 인증 정보 전송 차단 및 HTTPS 환경의 same-site 설정누락
* **해결**: Backend 전역에 CORS 설정(allowCredentials, allowedOrigins) 적용 및 쿠키옵션(same-site=none, secure=true) 설정
* **결과**: 새로고침이나 재방문시에도 끊김없이 유지하여 보안과 안정성 구축

### 2. 클라우드 배포 환경의 프로필 이미지 휘발 문제
* **문제**: 프로필 이미지 업로드 및 수정 시 파일을 로컬 폴더로 저장할 경우, 배포된 서버 환경에서는 해당 파일의 이미지가 깨지거나 보이지 않는 현상 발생
* **원인**: 로컬 파일 시스템 기반 방식은 확장성이 떨어지고 클라우드 배포 시 데이터가 공유되지 않고 영속성이 보장되지 않음
* **해결**: 파일 업로드 방식을 로컬 경로에서 **Supabase Storage**로 전환하여 이미지 업로드 시 Supabase에 안전하게 저장되도록 구현하고, 데이터베이스에 발급받은 URL을 저장하여 어느 환경에서든 일관되게 이미지를 보여줄 수 있도록 개선
* **결과**: 서버 상태 및 배포 환경에서 영향받지 않는 일관된 이미지 업로드/렌더링 영속성 확보 

---
