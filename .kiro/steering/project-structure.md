---
inclusion: always
---

# 📁 프로젝트 구조

## 개요

이 문서는 단일 페이지(SPA) Next.js 15 포트폴리오 프로젝트의 폴더 구조와 파일 구성 규칙을 정의합니다.
모든 콘텐츠는 하나의 페이지에서 스크롤 기반 섹션으로 구성됩니다.

---

## 루트 디렉토리 구조

```
portfolio/
├── .kiro/                    # Kiro IDE 설정
│   └── steering/            # 개발 가이드라인 문서
├── public/                   # 정적 파일 (이미지, 폰트 등)
├── src/                      # 소스 코드
│   ├── app/                 # Next.js App Router
│   ├── components/          # React 컴포넌트
│   ├── lib/                 # 유틸리티 및 헬퍼
│   └── styles/              # 전역 스타일 (필요시)
├── .gitignore
├── components.json          # shadcn/ui 설정
├── next.config.ts           # Next.js 설정
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs       # PostCSS 설정
├── README.md
├── tailwind.config.ts       # Tailwind CSS 설정
└── tsconfig.json            # TypeScript 설정
```

---


**규칙**:

- 모든 콘텐츠는 `page.tsx` 하나에 섹션으로 구성
- 각 섹션은 별도 컴포넌트로 분리하여 `sections/`에 배치
- 페이지 내 네비게이션은 앵커 링크 또는 스크롤 기반
- API 라우트는 폼 제출 등 필요한 경우만 사용

---

### 📂 src/components/ - React 컴포넌트

```
src/components/
├── ui/                      # shadcn/ui 컴포넌트 (자동 생성, 수정 금지)
│   ├── button.tsx
│   ├── card.tsx
│   ├── tooltip.tsx
│   └── ...
├── layout/                  # 레이아웃 컴포넌트
│   ├── Navigation.tsx      # 네비게이션 바
│   ├── SectionWrapper.tsx  # 섹션 래퍼 (공통 레이아웃)
│   └── index.ts            # 배럴 export
├── sections/                # 페이지 섹션 컴포넌트 (단일 페이지의 각 섹션)
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── ProjectsSection.tsx
│   └── index.ts            # 배럴 export
└── cards/                   # 카드 컴포넌트
    ├── AboutCard.tsx
    ├── SkillCard.tsx
    ├── ExperienceCard.tsx
    ├── ProjectCard.tsx
    └── index.ts            # 배럴 export
```

**규칙**:

- 컴포넌트 파일명은 PascalCase
- 한 파일에 하나의 주요 컴포넌트
- 관련 컴포넌트는 폴더로 그룹화
- `ui/` 폴더는 shadcn CLI로만 관리
- 각 컴포넌트 폴더에는 `index.ts` 배럴 파일로 export 관리

**컴포넌트 분류 기준**:

- `layout/`: 페이지 레이아웃 구성 요소 (네비게이션, 섹션 래퍼)
- `sections/`: 단일 페이지의 각 섹션 컴포넌트 (Hero, About, Skills, Experience, Projects)
- `cards/`: 재사용 가능한 카드 형태 컴포넌트 (About, Skill, Experience, Project 카드)

**섹션 컴포넌트 네이밍**:

- 섹션 컴포넌트는 `[Name]Section.tsx` 형식으로 명명
- 예: `HeroSection.tsx`, `AboutSection.tsx`, `ExperienceSection.tsx`
- 각 섹션은 독립적으로 작동하며 `page.tsx`에서 조합

**배럴 Export 패턴**:

- 각 컴포넌트 폴더에 `index.ts` 파일을 생성하여 export 관리
- import 경로를 단순화하고 일관성 유지
- 예: `import { HeroSection, AboutSection } from "@/components/sections"`

---

### 📂 src/lib/ - 유틸리티 및 헬퍼

```
src/lib/
├── utils.ts                 # 범용 유틸리티 함수 (cn 등)
├── types.ts                 # 공유 TypeScript 타입/인터페이스
├── constants.ts             # 상수 정의 (SKILLS 등)
└── data/                    # 정적 데이터
    ├── projects.ts         # 프로젝트 데이터
    └── experiences.ts      # 경력 데이터
```

**규칙**:

- 유틸리티 함수는 `utils.ts`에 모음
- 공유 타입은 `types.ts`에 정의
- 상수는 `constants.ts`에 UPPER_SNAKE_CASE로 정의
- 정적 데이터는 `data/` 폴더에 분리
- 각 데이터 파일은 해당 도메인의 데이터만 포함

**타입 정의 예시**:

- `Experience`: 경력 정보 (회사, 기간, 업무 내역)
- `Task`: 업무 상세 (제목, 설명, 개발 내용, 성능 개선)
- `Project`: 프로젝트 정보 (제목, 기간, 설명, 기술 스택)
- `PerformanceImprovement`: 성능 개선 상세 정보

---

### 📂 public/ - 정적 파일

```
public/
├── images/                  # 이미지 파일
│   ├── projects/           # 프로젝트 이미지
│   ├── profile.jpg         # 프로필 사진
│   └── logo.svg            # 로고
├── fonts/                   # 커스텀 폰트 (필요시)
└── favicon.ico             # 파비콘
```

**규칙**:

- 최적화된 이미지 사용 (WebP 선호)
- 이미지는 용도별로 폴더 구분
- Next.js `<Image>` 컴포넌트로 참조

---

## 파일 명명 규칙

### 컴포넌트 파일

- **React 컴포넌트**: `PascalCase.tsx` (예: `ProjectCard.tsx`, `Hero.tsx`)
- **페이지 컴포넌트**: `page.tsx` (Next.js App Router 규칙)
- **레이아웃**: `layout.tsx` (Next.js App Router 규칙)

### 유틸리티 파일

- **유틸리티/헬퍼**: `kebab-case.ts` (예: `utils.ts`, `api-client.ts`)
- **타입 정의**: `types.ts` 또는 `[feature].types.ts`
- **상수**: `constants.ts` 또는 `[feature].constants.ts`

---

## 코드 구성 원칙

### 1. 단순성 우선

- 소규모 프로젝트이므로 과도한 추상화 피하기
- 필요할 때만 폴더 구조 확장
- 파일이 5개 미만이면 폴더로 분리하지 않음

### 2. 관심사 분리

- UI 컴포넌트와 비즈니스 로직 분리
- 데이터와 프레젠테이션 분리
- 재사용 가능한 코드는 `lib/`에 배치

### 3. 일관성 유지

- 같은 종류의 파일은 같은 위치에 배치
- 명명 규칙 일관되게 적용
- 폴더 구조는 프로젝트 전체에서 동일한 패턴 유지

### 4. 확장 가능성

- 새로운 기능 추가 시 기존 구조 따르기
- 비슷한 컴포넌트는 같은 폴더에 그룹화
- 필요시 하위 폴더 생성 가능

---

## 단일 페이지 구조 예시

### page.tsx 구성

```typescript
// src/app/page.tsx
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
} from "@/components/sections";
import Navigation from "@/components/layout/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
      </main>
    </>
  );
}
```

### 새 섹션 추가 예시

새로운 "연락처(Contact)" 섹션을 추가하는 경우:

```
src/
├── app/
│   └── page.tsx                  # ContactSection import 추가
├── components/
│   ├── sections/
│   │   ├── ContactSection.tsx   # 새 섹션 컴포넌트
│   │   └── index.ts             # export 추가
│   └── cards/
│       ├── ContactCard.tsx      # 연락처 카드 컴포넌트 (필요시)
│       └── index.ts             # export 추가 (필요시)
└── lib/
    ├── constants.ts              # 연락처 정보 상수 추가
    └── types.ts                  # Contact 타입 추가 (필요시)
```

**추가 단계**:

1. 섹션 컴포넌트 생성: `src/components/sections/ContactSection.tsx`
2. 필요시 카드 컴포넌트 생성: `src/components/cards/ContactCard.tsx`
3. 타입 정의: `src/lib/types.ts`에 필요한 인터페이스 추가
4. 데이터/상수: `src/lib/constants.ts` 또는 `src/lib/data/` 에 추가
5. Export 업데이트: `src/components/sections/index.ts`에 export 추가
6. 페이지 통합: `src/app/page.tsx`에 섹션 추가

---

## 주의사항

### ❌ 피해야 할 패턴

- `src/utils/helpers/common/index.ts` 같은 과도한 중첩
- 파일 하나만 있는 폴더 생성
- 컴포넌트와 관련 없는 파일을 `components/`에 배치
- `ui/` 폴더 내 파일 직접 수정
- 배럴 export 없이 개별 파일 직접 import

### ✅ 권장 패턴

- 평평한(flat) 구조 유지
- 명확한 파일명 사용
- 관련 파일끼리 가까이 배치
- 재사용 가능한 코드는 `lib/`에 중앙화
- 배럴 export(`index.ts`)를 통한 일관된 import 경로
- 섹션별 데이터는 `lib/data/`에 분리
- 공통 타입은 `lib/types.ts`에 중앙 관리

---

## 단일 페이지 특화 고려사항

### 네비게이션

- 헤더의 네비게이션 링크는 앵커 링크 사용 (`#about`, `#projects` 등)
- 스무스 스크롤 구현 (CSS `scroll-behavior: smooth` 또는 Framer Motion)
- 현재 섹션 하이라이트 기능 (Intersection Observer 활용)

### 섹션 ID

- 각 섹션 컴포넌트는 고유한 `id` 속성 필요
- 예: `<section id="about">`, `<section id="projects">`
- ID는 kebab-case 사용

### 성능 최적화

- 각 섹션은 독립적으로 lazy load 가능
- 초기 뷰포트 외 섹션은 지연 로딩 고려
- 이미지는 Next.js Image 컴포넌트로 최적화

### 스크롤 애니메이션

- Framer Motion의 `useScroll`, `useInView` 훅 활용
- 섹션 진입 시 애니메이션 트리거
- 과도한 애니메이션은 피하고 성능 우선

---

## 현재 구현된 섹션

1. **HeroSection**: 메인 히어로 섹션
2. **AboutSection**: 소개 섹션 (AboutCard 사용)
3. **SkillsSection**: 기술 스택 섹션 (SkillCard 사용, SKILLS 상수 활용)
4. **ExperienceSection**: 경력 섹션 (ExperienceCard 사용, experiences 데이터 활용)
5. **ProjectsSection**: 프로젝트 섹션 (ProjectCard 사용, projects 데이터 활용)

## 참고사항

- 이 구조는 단일 페이지 포트폴리오에 최적화되어 있음
- 추가 페이지가 필요한 경우 구조 재검토 필요
- Next.js 15 App Router 규칙을 최우선으로 따름
- 모든 콘텐츠는 스크롤 기반으로 접근 가능해야 함
- 배럴 export 패턴을 통해 import 경로 일관성 유지
- 각 섹션은 독립적으로 작동하며 SectionWrapper로 공통 레이아웃 적용
