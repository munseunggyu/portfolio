import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "project1",
    title: "Portfolio",
    period: "2025.11 - 2025.11",
    description: "개인 포트폴리오 웹 사이트입니다.\n저에 대한 추가적인 궁금증을 우측 하단 AI 챗봇에게 물어보세요!",
    thumbnail: "/images/projects/portfolio.png",
    details: {
      intro: [
        "Google Gemini 2.5 Flash-Lite 모델을 활용한 AI 챗봇 기능 구현",
        "@ai-sdk/react의 useChat 훅으로 실시간 스트리밍 응답 처리",
        "Supabase를 활용한 사용자 식별(IP + User Agent 해싱) 및 사용량 제한 관리",
        "Supabase pg_cron을 활용한 일일 사용량 자동 리셋 스케줄러 구현",
        "대화 로그를 Supabase에 저장하여 방문자 질문 패턴 분석 가능",
      ],
      team: "개인 프로젝트",
      tech: "Next.js, TypeScript, Tailwind CSS, Framer Motion, Supabase",
      links: {
        github: "https://github.com/munseunggyu/portfolio",
        service: "https://portfolio.seunggyu.site",
      },
    },
  },
  {
    id: "project2",
    title: "툭스캔",
    period: "2025.03 - 2025.09",
    description: "비대면 PDF 스캔 서비스",
    thumbnail: "/images/projects/tookscan.webp",
    details: {
      intro: [
        "프론트엔드 리더로서 일정 관리 및 작업 분배 총괄",
        "User / Admin 프로젝트를 통합한 monorepo 구조 설계 및 관리",
        "주요 페이지 구조 설계 및 개발 (User: 로그인, 스캔하기, 주문목록 / Admin: 회원 목록, 주문 상세, 쿠폰 목록)",
        "Lighthouse CLI를 활용해 웹사이트 성능, 접근성, SEO 점수를 측정하는 자동화 파이프라인을 GitHub Actions로 구축, PR 생성 시 성능 리포트를 자동 삽입해 코드 리뷰 효율성 향상",
        "환경별 자동 배포 파이프라인 정립 (Dev/Prod) - develop 브랜치 머지 시 Dev 미리보기 배포, GitHub Release 생성 시 Prod 정식 배포가 자동 실행되도록 구성. 릴리스 태그 기반 버전 동기화로 백엔드와 동일 버전으로 릴리스하며, 체인지로그 생성·태깅·알림을 자동화하여 운영 피로도 절감",
        "React Hook Form 기반 폼 상태 관리 최적화 - 기존 useState 기반의 개별 입력 관리 방식을 통합하여 폼 로직 중복을 제거",
      ],
      team: "기획자 2명, 디자이너 2명, 프론트엔드 3명, 백엔드 2명",
      tech: "Next.js, TypeScript, Tailwind CSS, Tanstack-Query, Zustand",
      links: {
        github: "https://github.com/munseunggyu/Took-Scan-Client",
      },
    },
  },
  {
    id: "project3",
    title: "말모말모",
    period: "2024.07 - 2024.08",
    description: "6 Thinking Hats 기법을 기반으로 학습된 AI로 유저의 아이디어를 발전시켜주는 서비스입니다.",
    thumbnail: "/images/projects/malmo.webp",
    details: {
      intro: [
        "PNG 형식의 배경 이미지를 WebP로 변환하여 1,215KiB의 용량을 절감",
        "TTF 폰트를 WOFF2로 변환하여 폰트 용량을 약 50% 절감하고 LCP를 1초 단축",
        "백엔드 개발자와 작업 시간대가 달라 API 작업이 지연될 때를 대비해 MSW 기반 Mock API를 구현하여 이를 통해 테스트 시 별도의 연동 과정 없이 신속하게 작업을 진행할 수 있어 불필요한 시간을 절약",
        "비사이드(포텐데이) x 네이버 클로바 스튜디오에서 10일간 진행된 팀프로젝트 전체 28개의 팀 중 3등, 네이버 클로바에서 뽑은 1등",
      ],
      team: "기획자 1명, 디자이너 1명, FE 1명, BE 1명, AI 1 명",
      tech: "Next.js, TypeScript, Tailwind CSS, Zustand",
      links: {
        github: "https://github.com/munseunggyu/malmo",
        service: "https://malmo.vercel.app",
      },
    },
  },
];
