# PORTFOLIO

총 5페이지로 이루어진 포트폴리오 입니다: HOME,THREEJS,PROJECT,BOOK,CONTACT

## ARCHTECTURE

│ ├─ └─ 📃 📂

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
│ │ ├─📂loading # WAIT
│ │ ├─📂molecules # atoms + 기능/UI 를 조합한 하나의 기능/UI 컴포넌트
│ │ │ ├─📂 FixedButton # Button + UI
│ │ │ │ └─📃index.tsx
│ │ │ ├─📂 Marquee # Text + Animation
│ │ │ │ └─📃index.tsx
│ │ │ ├─📂 Nav # Text + navigation
│ │ │ │ └─📃index.tsx
│ │ │ └─ ...
│ │ ├─📂organism
│ │ │ ├─📂 FixedButton # Button + UI
│ │ │ │ └─📃index.tsx
│ │ │ ├─📂 Marquee # Text + Animation
│ │ │ │ └─📃index.tsx
│ │ │ ├─📂 Nav # Text + navigation
│ │ │ │ └─📃index.tsx
│ │ │ └─ ...
│ │ ├─📂template
│ │ └─📂transition
│ ├─📂contants
│ │ └─ ...
│ ├─📂hooks
│ │ └─ ...
│ ├─📂layout
│ │ ├─📂background
│ │ ├─📂Footer
│ │ └─📂Header
│ ├─📂pages
│ │ └─ ...
│ ├─📂stores
│ │ └─ ...
│ ├─📂styles
│ │ └─ ...
│ ├─📂types
│ │ └─ ...
│ ├─📃App.tsx
│ └─ ...
└─📃README.md

```

```
new_invitation/
├─ README.md
├─ package.json
├─ public/
│ └─ ...
├─ src/
│ ├─ app/
│ │ ├─ api/
│ │ │ └─ ... # route handlers
│ │ ├─ profile/
│ │ │ └─ page.tsx
│ │ ├─ layout.tsx
│ │ └─ ... # other Next.js pages/segments
│ ├─ actions/ # Server Actions ("use server")
│ │ └─ ...
│ ├─ components/
│ │ ├─ atoms/ # 가장 작은 단위의 컴포넌트
│ │ │ ├─ Btn # 버튼 UI
│ │ │ │ └─ index.tsx
│ │ │ ├─ Icon # 아이콘 UI
│ │ │ │ └─ index.tsx
│ │ │ └─ ...
│ │ ├─ molecules/ # 2개 이상의 Atom 으로 구성된 UI 컴포넌트
│ │ │ ├─ btns/
│ │ │ │ ├─ MusicBtn
│ │ │ │ │ └─ index.tsx # 버튼 + Icon + 이벤트 핸들러
│ │ │ │ └─ ...
│ │ │ │
│ │ │ └─ ...
│ │ ├─ organisms/ # 페이지 내 블록 단위 컴포넌트
│ │ │ ├─ panel/
│ │ │ │ ├─ ParentInfoPanel
│ │ │ │ │ ├─ constant.ts # 해당 컴포넌트 전용 상수 모음
│ │ │ │ │ ├─ type.d.ts # 해당 컴포넌트 전용 타입 모음
│ │ │ │ │ ├─ variants.ts # 해당 컴포넌트 전용 motion variants
│ │ │ │ │ └─ index.tsx # Input + Btn 등 블록 단위 컴포넌트
│ │ │ │ └─ ...
│ │ │ │
│ │ │ └─ ...
│ │ └─ layout/ # Header, Footer 등 레이아웃 관련 컴포넌트
│ ├─ hooks/ # React 훅 (클라이언트 전용 로직)
│ ├─ store/ # zustand 등 전역 상태관리
│ ├─ services/ # 외부 API / 비즈니스 로직 (user, invitation 등)
│ ├─ lib/ # jose, cloudinary 설정 등 외부 라이브러리 설정/유틸 모음
│ ├─ utils/ # 유틸 함수, validation 등
│ ├─ types/ # 전역 타입 정의
│ ├─ constants/ # 전역 상수
│ └─ styles/ # 전역 스타일, motion variants (공용)
│
└─ ...

```

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

## Description

2D 디자인을 바탕으로 정적인 느낌을 받지 않도록 하기 위해 다양한 애니메이션들을 넣어서 반응형 포트폴리오로 준비하게 됐습니다.

Marquee : 중점적으로 생각하는 코드 스타일 키워드
Scratch : 하고 싶은 말
Parallax : 개발 일대기

## Image 최적화

Book SLider Section

- BackgroundImg
  - 사이즈: 최대 500kb 이하
  - 확장자: .webp
- Thumnail
  - 사이즈: 최대 110kb 이하
  - 확장자: .webp

Parallax Section

- BackgroundImg
  - 사이즈: 최대 500kb 이하하
