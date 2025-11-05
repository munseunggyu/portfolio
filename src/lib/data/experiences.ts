import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: "company1",
    logo: "S",
    gradient: "from-blue-500 to-cyan-500",
    name: "(주)소너비스",
    period: "2024.08.25 - 2025.10.20",
    tasks: [
      {
        title: "BATCAMZONE",
        description: '초음파 카메라("배트캠 / BATCAM") 측정 데이터를 중앙에서 관리하고 분석할 수 있게 해주는 서비스',
        newDevelopments: [
          "한국어, 영어, 일본어, 중국어, 터키어 등 5개 언어를 지원하는 다국어 시스템 구축 및 번역 파일 자동 변환 스크립트 개발",
          "구글지도 및 고덕지도(중국 지도) 라이브러리를 통합 지원하도록 공통 함수 구조 설계 및 구현",
          "멤버 초대·권한 관리 기능을 통해 사용자 그룹별 접근 제어 로직 구현",
          "웹 페이지 내 특정 컴포넌트 영역을 PDF 및 DOCX 파일로 변환·다운로드할 수 있는 기능 구현",
        ],
        performanceImprovements: [
          {
            title: "PDF 다운로드 성능 개선",
            problem:
              "기존 평균 10장 정도의 리포트를 PDF 다운로드 하는 기능이 사용자의 요청에 따라 리포트 PDF의 장수가 100~500장 정도 증가",
            cause:
              "기존 jsPDF 라이브러리로 해당 컴포넌트를 이미지화 한 후 PDF페이지를 추가하는 방식에 많은 성능 저하 발생",
            solution:
              "@react-pdf/renderer 라이브러리 도입 @react-pdf/renderer 라이브러리를 사용하여 화면에 그리지않고 pdf를 바로 render하는 방식으로 수정",
            result: "100장 기준 평균 생성 속도 25초 → 12초(52% 단축)",
          },
          {
            title: "Docker 이미지 최적화",
            problem: "Next.js Docker 이미지 빌드 후 AWS ECR 업로드 및 EC2 배포까지 6분 이상 소요",
            cause: "불필요한 모듈 및 파일이 모두 포함되어 이미지 용량 과도 (3.6GB)",
            solution: "Next.js standalone 모드 적용으로 빌드 결과물 최소화",
            result: "이미지 크기 3.6GB → 430MB, 배포 시간 380s → 230s (40% 단축)",
          },
        ],
      },
      {
        title: "FX-Viewer",
        description: "FX 장비의 음향·영상 데이터를 통합 관리하고 이상 징후를 감지하는 실시간 모니터링 뷰어",
        newDevelopments: [
          "클라우드 서비스와 Windows 독립 실행형 앱을 모두 지원하기 위해 Electron 기반 이중 실행 구조를 설계하고, 로컬 Express 서버를 내장한 보안형 시스템 아키텍처 구현",
          "영상 데이터와 빔포밍 음향 데이터를 timestamp 기반으로 동기화하여, Three.js를 활용한 시각화 오버레이 커스텀 비디오 플레이어 구현",
          "사용자 생성·권한 관리 기능을 통해 사용자 그룹별 접근 제어 로직 구현",
        ],
        performanceImprovements: [
          {
            title: "Electron 빌드 환경 설정 개선",
            problem:
              "Electron 빌드 시 네이티브·바이너리 라이브러리가 asar 내부에서 동작하지 않아, 매번 extraResources 또는 asarUnpack 경로를 수동 설정해야 했고, 경로 불일치로 인한 실행 오류 및 유지보수 부담 발생",
            cause:
              "asar 패키징 구조상 바이너리 파일은 압축 내 실행이 불가하며, 각 라이브러리별로 개별 경로를 지정해야 하는 비효율적인 구조",
            solution:
              "NODE_PATH를 설정하여 extraResources, asarUnpack, app.asar 경로를 모두 자동으로 탐색하도록 개선 → 경로 설정 자동화 및 라이브러리 호환성 확보",
            result: "네이티브 모듈 경로 수동 설정 제거, 신규 네이티브 라이브러리 추가 시 환경 설정 시간 단축",
          },
        ],
        hasBorder: true,
      },
    ],
  },
  {
    id: "company2",
    logo: "M",
    gradient: "from-pink-500 to-purple-500",
    name: "(주)모두리치",
    period: "2023.03.02 - 2024.06.28",
    tasks: [
      {
        title: "몬스탁",
        description: "블록체인과 투자정보가 만난 투자정보 공유 서비스(하이브리드 앱)",
        newDevelopments: [
          "하이브리드 앱 환경에서 정기 구독·단건 결제 기능 구현",
          "보상형 광고 기능 도입으로 사용자 참여 및 리워드 시스템 구현",
          "주식이나 코인의 실시간 시세를 이용한 모의투자 게임(데이트레이딩) 기능 개발",
        ],
        performanceImprovements: [
          {
            title: "Vue2 → Vue3 마이그레이션",
            problem:
              "Vue3 마이그레이션 과정에서 기존 커스텀하여 만든 페이지 전환 라이브러리(Vue Page Stack) 호환성 문제 발생 및 stack-key 값이 URL에 노출됨.",
            cause: "Vue2와 Vue3 문법 변경과 watch 로직이 Page Stack에 쌓인 모든 이전 페이지에서 실행되는 구조 문제.",
            solution:
              "Vue3용 Vue Page Stack 커스텀 구현, stack-key를 URL이 아닌 window.history에 저장하고, watch가 deactivate 상태의 컴포넌트에서 실행되지 않도록 수정.",
            result: "Vue3 환경에서 페이지 전환 라이브러리 정상 작동 및 URL 보안성 향상.",
          },
          {
            title: "IndexedDB를 도입하여 불필요한 서버 호출 제거와 메모리 효율 향상",
            problem:
              "매일 한 번만 변경되는 대략 3천개의 주식, 코인 데이터를 매번 웹 페이지 접속 시 호출하여 불필요한 서버 호출",
            cause:
              "현재는 3천개지만 더 많은 데이터가 추가 될 수 있고 자주 변경되지 않는 용량이 큰 데이터이지만 3천개의 데이터를 LocalStorage 에 저장하여 사용하는 것은 성능과 저장 공간 측면에서 부담",
            solution:
              "IndexedDB 도입 \n1. 용량: IndexedDB는 GB 단위의 데이터를 저장할 수 있어, 3천 개 이상의 데이터를 저장하기에 적합 \n2. 퍼포먼스: IndexedDB는 비동기적으로 동작하여 많은 양의 데이터 처리 시 성능 저하 감소 \n3. 데이터 구조: IndexedDB는 객체를 직접 저장하고, Index로 빠르게 검색이 가능해 메모리 효율을 향상",
            result:
              "불필요한 서버 호출 제거(대략 150ms의 서버 호출 시간 절약), 데이터를 Vue state에 저장하여 사용하지 않고 바로 IndexedDB의 Index로 검색하여 메모리 효율 향상",
          },
        ],
      },
    ],
  },
];
