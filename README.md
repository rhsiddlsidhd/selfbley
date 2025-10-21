# PORTFOLIO

총 5페이지로 이루어진 About Me 포트폴리오 입니다: HOME,THREEJS,PROJECT,BOOK,CONTACT

## ARCHTECTURE

- React + Typescript 기반의 포트폴리오 웹 사이트
- Atomic Design 패턴을 적용한 컴포넌트 구조

```
SELFBLEY
├─src
│ ├─📂api # api 모음
│ │ └─ ...
│ ├─📂components
│ │ ├─📂atoms # Text, Button, Image UI 가장 작은 단위 컴포넌트
│ │ │ ├─📂Text
│ │ │ │ └─📃index.tsx
│ │ │ └─ ...
│ │ ├─📂molecules # 여러 atoms을 조합한 하나의 기능 또는 UI 블록 컴포넌트
│ │ │ ├─📂 FixedButton # Button + UI
│ │ │ │ └─📃index.tsx
│ │ │ ├─📂 Marquee # Text + Animation
│ │ │ │ └─📃index.tsx
│ │ │ ├─📂 BookCard # Text + navigation
│ │ │ │ └─📃index.**tsx**
│ │ │ └─ ...
│ │ ├─📂organism # 여러 molecules / atoms을 조합해 복합적인 UI 섹션을 구성하는 단위
│ │ │ ├─📂 BookSection
│ │ │ │ ├─📃BookBackground.tsx # BookSection 배경 연출 및 스크롤에 따른 시각 효과 담당
│ │ │ │ ├─📃BookList.tsx # 책 데이터를 기반으로 카드 리스트를 렌더링
│ │ │ │ └─📃index.tsx # 책 섹션 레이아웃 및 스크롤 애니메이션 제어
│ │ │ └─ ...
│ │ ├─📂template # 페이지의 레이아웃 구조
│ │ │ ├─📂container
│ │ │ │ ├─📂SVGContainer
│ │ │ │ │ └─📃index.tsx
│ │ │ │ └─ ...
│ │ │ └─ ...
│ │ └─📂transition
│ │   ├─📂FlipTransition
│ │   │ └─📃index.tsx
│ │   └─ ...
│ ├─📂contants
│ │ └─ ...
│ ├─📂hooks
│ │ └─ ...
│ ├─📂layout
│ │ └─ ...
│ ├─📂pages # 라우트별 페이지 컴포넌트
│ │ └─ ...
│ ├─📂stores # Zustand 전역 상태 관리
│ │ ├─📃useScreenStore.ts # 브라우저 반응형 상태
│ │ └─ ...
│ ├─📂styles
│ │ └─ ...
│ ├─📂types
│ │ └─ ...
│ ├─📃App.tsx # React Route
│ └─ ...
└─📃README.md
```

## 외부 데이터 연동

### 1. My JSON Server (Serverless)

- GitHub의 `db.json` 파일을 REST API로 제공
- 엔드포인트: `/projects`
- 프로젝트 목록 및 상세 정보 제공

### 2. Naver Book API (Proxy)

- **보안**: API 키 등 민감 정보의 클라이언트 노출 방지
- **구현**: GitHub 서버리스 함수를 통한 프록시 요청
- **사용법**: `/api/search?q={keyword}` → Naver Book API 호출 → 결과 반환

## HOMEPAGE

- 개발자 소개 및 개인 정보를 담은 메인 페이지
- 다양한 섹션으로 구성된 자기소개:
  - 개인 프로필 및 기본 정보
  - 취미와 관심사
  - 개발 관련 FAQ
  - 개발 철학과 가치관
  - 보유 기술 스택
  - 읽은 개발 서적 목록
- 섹션별 고유한 애니메이션과 인터랙티브 요소
- 스크롤 기반 패럴랙스 및 다양한 시각 효과

## PROJECT

- 개발 학습 과정에서 진행한 프로젝트를 모아둔 페이지
- `ALL, TEAM, SINGLE` 필터로 프로젝트 유형별 분류 가능
- 각 프로젝트의 Github 및 Tistory 제공
- 각 프로젝트의 상세 정보 제공:
  - 프로젝트 제목 및 개요
  - 프로젝트 썸네일 이미지
  - 실제 배포 사이트 링크
  - 사용된 기술 스택 및 라이브러리
  - 프로젝트 설명 및 주요 기능

## BOOK

- 개발 서적 리뷰 및 학습 **기록** 페이지
- 책 카드 클릭을 통해 접근하는 상세 페이지
- 읽은 책에 대한 개인적인 후기와 핵심 내용 정리
- 개발 지식 습득 과정과 성장 기록 공유

## THREEJS

- THREEJS를 바탕으로 디자인한 PAGE
- 서비스 준비중입니다.

## CONTACT

- 연락처 정보 및 문의 페이지
- Email, Github, Tistory 제공

## Technology

- typescript
- styled-component
- Framer Motion
- React
- Zustand
