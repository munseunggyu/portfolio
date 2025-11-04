# 🛠️ 개발 패턴

## 📋 프로젝트 컨텍스트

- 소규모 데스크톱 전용 포트폴리오 프로젝트
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui 컴포넌트
- Framer Motion으로 인터랙티브 애니메이션 구현
- 전역 상태 관리 불필요
- 모바일 지원 불필요
- 테스팅 우선순위 낮음

---

## 🎯 코딩 컨벤션

### 네이밍 규칙

- **컴포넌트**: PascalCase (`UserProfile.tsx`, `ProjectCard.tsx`)
- **파일**: 컴포넌트가 아닌 경우 kebab-case (`utils.ts`, `api-client.ts`)
- **변수/함수**: camelCase (`getUserData`, `isLoading`)
- **상수**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_ITEMS`)
- **타입/인터페이스**: 설명적인 이름의 PascalCase (`UserData`, `ProjectCardProps`)

### 파일 구조

```
src/
├── app/              # Next.js app router 페이지
├── components/
│   ├── ui/          # shadcn 컴포넌트 (자동 생성)
│   └── ...          # 커스텀 컴포넌트
├── lib/             # 유틸리티, 헬퍼, 타입
└── styles/          # 전역 스타일 (필요시)
```

### Import 순서

1. React/Next.js imports
2. 서드파티 라이브러리
3. shadcn/ui 컴포넌트
4. 커스텀 컴포넌트
5. 유틸/헬퍼
6. 타입
7. 스타일

```typescript
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/lib/types";
```

---

## ⚛️ 컴포넌트 패턴

### 함수 컴포넌트만 사용

```typescript
// ✅ 좋은 예
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: "primary" | "secondary"
}

export function CustomButton({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}

// ❌ 피해야 할 예
export const CustomButton = ({ label, onClick }: any) => { ... }
```

### Props 인터페이스

- 항상 컴포넌트 위에 props 인터페이스 정의
- `Props`로 끝나는 설명적인 이름 사용
- 선택적 props는 `?`로 표시
- 구조 분해에서 기본값 제공

### 컴포넌트 구성

```typescript
// 1. Imports
// 2. Types/Interfaces
// 3. Component definition
// 4. Helper functions (컴포넌트에 특화된 작은 함수인 경우)
```

---

## 🎨 스타일링 규칙

### Tailwind CSS 사용법

- Tailwind 유틸리티 클래스를 주요 스타일링 방법으로 사용
- 클래스 순서: Layout → Spacing → Typography → Colors → Effects

```typescript
// ✅ 좋은 순서
<div className="flex items-center gap-4 p-6 text-lg font-bold text-gray-900 hover:bg-gray-100">
```

### shadcn/ui 컴포넌트

- 일반적인 UI 요소(Button, Card, Dialog 등)에는 shadcn 컴포넌트 사용
- 필요시 className prop으로 커스터마이징
- `components/ui/` 파일을 직접 수정하지 말 것 (대신 재생성)

### 커스텀 스타일

- 절대 필요한 경우가 아니면 인라인 스타일 피하기
- 전역 CSS에서 Tailwind의 `@apply`는 최소한으로 사용
- 커스텀 CSS 클래스보다 컴포지션 선호

---

## 🔄 상태 관리

### 로컬 상태만 사용

- 컴포넌트 레벨 상태는 `useState` 사용
- 복잡한 로컬 상태 로직은 `useReducer` 사용
- props를 통해 상태 전달 (소규모 프로젝트에서는 prop drilling 허용)

### 서버 상태

- 가능하면 데이터 페칭에 Next.js Server Components 사용
- 클라이언트 사이드 요청은 Next.js 캐싱과 함께 `fetch` 사용
- React Query나 SWR 불필요

```typescript
// ✅ Server Component (선호)
export default async function ProjectsPage() {
  const projects = await fetch("...").then((r) => r.json());
  return <ProjectList projects={projects} />;
}

// ✅ Client Component (필요시)
("use client");
export function ProjectList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    /* fetch */
  }, []);
}
```

---

## 📘 TypeScript 규칙

### 엄격한 타이핑

- strict 모드 활성화 (이미 설정됨)
- `any` 절대 사용 금지 - 타입이 정말 알 수 없는 경우 `unknown` 사용
- 함수의 명시적 반환 타입 정의
- 간단한 경우 타입 추론 사용

```typescript
// ✅ 좋은 예
function getUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then((r) => r.json());
}

// ❌ 피해야 할 예
function getUser(id: any): any {
  return fetch(`/api/users/${id}`).then((r) => r.json());
}
```

### 타입 정의

- 해당 파일에서만 사용되는 타입은 같은 파일에 유지
- 공유 타입은 `lib/types.ts`에 생성
- 객체 형태는 `interface`, 유니온/인터섹션은 `type` 사용

---

## ⚡ 성능 가이드라인

### 이미지 최적화

- 항상 Next.js `<Image>` 컴포넌트 사용
- width와 height 지정
- 적절한 포맷 사용 (WebP 선호)

### 코드 스플리팅

- 무거운 컴포넌트는 동적 import 사용

```typescript
const HeavyChart = dynamic(() => import("@/components/heavy-chart"), {
  loading: () => <p>Loading...</p>,
});
```

### 메모이제이션

- 비용이 큰 계산에는 `useMemo` 사용
- 자식 컴포넌트에 전달되는 함수는 `useCallback` 사용
- 과도한 최적화 금지 - 먼저 측정할 것

---

## 🚨 에러 처리

### 클라이언트 사이드 에러

```typescript
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error("Failed to fetch data:", error);
  // 사용자 친화적인 에러 메시지 표시
  setError("데이터를 불러올 수 없습니다. 다시 시도해주세요.");
}
```

### Error Boundaries

- 라우트 레벨 에러 처리는 Next.js error.tsx 사용
- 재시도 옵션이 있는 폴백 UI 제공

---

## 📦 의존성

### 새 의존성 추가

- 추가 전 번들 크기 영향 확인
- 가벼운 대안 선호
- 설치는 `pnpm add` 사용

### Biome 린팅/포매팅

- 커밋 전 `pnpm lint` 실행
- 포매팅 자동 수정은 `pnpm format` 실행
- Biome의 권장사항 따르기

### TypeScript 검증

- `pnpm tsc --noEmit` 또는 `pnpm build` 같은 TypeScript 검증 명령어는 실행하지 않음
- getDiagnostics 도구로 타입 에러 확인으로 충분함
- 빌드 검증은 사용자가 필요시 직접 실행

---

## 🎯 데스크톱 전용 고려사항

### 뷰포트 가정

- 최소 1024px 너비로 디자인
- 모바일 브레이크포인트 불필요
- 적절한 곳에 고정 레이아웃 사용
- hover 상태 사용 가능

### 인터랙션

- 마우스 hover 효과 활용
- 유용한 곳에 키보드 단축키 사용
- 터치 제스처 지원 불필요

---

## 🎬 Framer Motion 애니메이션

### 기본 사용법

- 인터랙티브한 UI를 위해 framer-motion 적극 활용
- `motion` 컴포넌트로 HTML 요소를 래핑하여 애니메이션 적용
- 클라이언트 컴포넌트에서만 사용 (`"use client"` 필수)

```typescript
"use client";
import { motion } from "framer-motion";

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg"
    >
      콘텐츠
    </motion.div>
  );
}
```

### 애니메이션 패턴

**페이드 인 (Fade In)**

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
```

**슬라이드 업 (Slide Up)**

```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

**호버 효과 (Hover Effects)**

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
```

**스태거 애니메이션 (Stagger Animation)**

```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((item) => (
    <motion.li key={item.id} variants={item}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>;
```

### 스크롤 애니메이션

```typescript
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollAnimation() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return <motion.div style={{ opacity }}>스크롤에 반응하는 콘텐츠</motion.div>;
}
```

### 레이아웃 애니메이션

```typescript
<motion.div layout className="card">
  {/* 레이아웃 변경 시 자동으로 애니메이션 */}
</motion.div>
```

### 성능 최적화

- `transform`과 `opacity` 속성 우선 사용 (GPU 가속)
- `width`, `height` 같은 레이아웃 속성 애니메이션은 피하기
- 복잡한 애니메이션은 `will-change` CSS 속성 고려
- 불필요한 리렌더링 방지를 위해 variants 패턴 사용

```typescript
// ✅ 좋은 예 (transform 사용)
<motion.div animate={{ x: 100, scale: 1.2 }} />

// ❌ 피해야 할 예 (레이아웃 속성)
<motion.div animate={{ width: 200, height: 300 }} />
```

### 재사용 가능한 애니메이션 variants

- 공통 애니메이션은 `lib/animations.ts`에 정의

```typescript
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// 컴포넌트에서 사용
import { fadeInUp } from "@/lib/animations";

<motion.div {...fadeInUp}>콘텐츠</motion.div>;
```

### 주의사항

- 과도한 애니메이션은 피하기 - 사용자 경험을 방해하지 않도록
- 애니메이션 지속 시간은 0.3~0.6초가 적당
- 접근성 고려: `prefers-reduced-motion` 미디어 쿼리 지원

```typescript
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
/>;
```

---

## ✨ 모범 사례

1. **단순하게 유지**: 소규모 프로젝트에 과도한 엔지니어링 피하기
2. **일관성**: 코드베이스 전체에서 이 패턴들을 따르기
3. **가독성**: 사람을 위한 코드 작성 우선
4. **주석**: 로직이 명확하지 않을 때만 작성
5. **DRY 원칙**: 재사용 가능한 로직 추출, 하지만 과도한 추상화는 금지
6. **Git 커밋**: 명확한 메시지와 함께 작고 집중된 커밋
