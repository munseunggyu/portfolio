# 디자인 문서

## 개요

AI 챗봇 기능은 포트폴리오 웹사이트 방문자가 개발자 문승규에 대한 정보를 실시간으로 질문하고 답변받을 수 있는 대화형 인터페이스입니다. 이 시스템은 Google Gemini 2.5 Flash-Lite 모델을 활용하여 자연스러운 대화를 제공하며, 채널톡과 유사한 UI/UX 패턴을 따릅니다.

## 아키텍처

### 시스템 구성도

```
┌─────────────────┐
│   사용자 브라우저  │
└────────┬────────┘
         │
         ├─ ChatbotButton (플로팅 버튼)
         │
         └─ ChatbotWindow (대화 창)
              │
              ├─ ChatMessage (메시지 표시)
              │
              └─ ChatInput (입력 필드)
                   │
                   ▼
         ┌──────────────────┐
         │  useChat Hook    │
         │  (@ai-sdk/react) │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │  /api/chat       │
         │  (Next.js API)   │
         └────────┬─────────┘
                  │
                  ├─ systemProfilePrompt.md 로드
                  │
                  └─ Gemini 2.5 Flash-Lite
                       (@ai-sdk/google)
```

### 기술 스택

- **프론트엔드**: React 19, Next.js 15, TypeScript
- **UI 라이브러리**: Tailwind CSS v4, Framer Motion
- **AI SDK**: @ai-sdk/react, @ai-sdk/google
- **AI 모델**: Google Gemini 2.5 Flash-Lite
- **상태 관리**: useChat 훅 (내장)

## 컴포넌트 및 인터페이스

### 1. ChatbotButton 컴포넌트

**위치**: `src/components/chatbot/ChatbotButton.tsx`

**책임**:

- 챗봇 창 열기/닫기 토글
- 플로팅 버튼 UI 렌더링
- 호버 애니메이션 효과

**Props**:

```typescript
interface ChatbotButtonProps {
  // Props 없음 - 내부 상태로 관리
}
```

**상태**:

```typescript
const [isOpen, setIsOpen] = useState(false);
```

**스타일링**:

- 위치: 고정 (fixed), 우측 하단 (bottom-4 right-4)
- 크기: 64x64px 원형
- z-index: 30
- 애니메이션: whileTap={{ scale: 0.9 }}
- 이미지: `/images/chat_ai.webp`

### 2. ChatbotWindow 컴포넌트

**위치**: `src/components/chatbot/ChatbotWindow.tsx`

**책임**:

- 대화 창 레이아웃 관리
- 메시지 목록 렌더링
- 스크롤 자동 조정
- 환영 메시지 및 빠른 답변 버튼 표시

**Props**:

```typescript
interface ChatbotWindowProps {
  // Props 없음 - useChat 훅 사용
}
```

**상태** (useChat 훅에서 제공):

```typescript
const {
  messages, // 메시지 배열
  input, // 입력 필드 값
  handleInputChange, // 입력 변경 핸들러
  handleSubmit, // 전송 핸들러
  isLoading, // 로딩 상태
  error, // 에러 상태
} = useChat({
  api: "/api/chat",
});
```

**레이아웃**:

```
┌─────────────────────────┐
│  헤더 (AI 챗봇)          │ ← 고정 헤더
├─────────────────────────┤
│                         │
│  메시지 영역             │ ← 스크롤 가능
│  - 환영 메시지           │
│  - 빠른 답변 버튼        │
│  - 대화 메시지           │
│                         │
├─────────────────────────┤
│  입력 영역               │ ← 고정 하단
└─────────────────────────┘
```

**스타일링**:

- 위치: 고정 (fixed), 우측 하단 (bottom-20 right-4)
- 크기: 320px × 500px
- 배경: bg-card
- 테두리: rounded-lg, shadow-lg
- 헤더: 포트폴리오 테마 색상 (primary)

**환영 메시지**:

```
안녕하세요! 프론트엔드 개발자 문승규입니다.

저에 대해 궁금한 점이 있으신가요?
이 챗봇을 통해 저에 관한 여러 가지 정보를 알아보실 수 있습니다.

챗봇은 최대 3회까지 질문에 답변드리며, 더 자세한 사항이 궁금하시다면 언제든지 저에게 연락해 주세요.
```

**빠른 답변 버튼**:

- 버튼 목록: ["나이", "취미", "사는 곳", "개발을 시작한 이유", "경력", "좋아하는 음식", "MBTI"]
- 레이아웃: 플렉스 래핑 (flex-wrap)
- 스타일: 작은 버튼 (px-3 py-1.5), 둥근 모서리 (rounded-full)
- 색상: bg-primary/10, hover:bg-primary/20

### 3. ChatMessage 컴포넌트

**위치**: `src/components/chatbot/ChatMessage.tsx`

**책임**:

- 개별 메시지 렌더링
- 사용자/AI 메시지 구분 표시
- 메시지 애니메이션

**Props**:

```typescript
interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}
```

**스타일링**:

사용자 메시지:

- 정렬: 우측 (justify-end)
- 배경: bg-primary
- 텍스트: text-primary-foreground
- 최대 너비: max-w-[80%]
- 패딩: px-4 py-2
- 둥근 모서리: rounded-2xl rounded-br-sm

AI 메시지:

- 정렬: 좌측 (justify-start)
- 배경: bg-muted
- 텍스트: text-foreground
- 최대 너비: max-w-[80%]
- 패딩: px-4 py-2
- 둥근 모서리: rounded-2xl rounded-bl-sm

애니메이션:

```typescript
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

### 4. ChatInput 컴포넌트

**위치**: `src/components/chatbot/ChatInput.tsx`

**책임**:

- 텍스트 입력 필드 렌더링
- 전송 버튼 관리
- Enter 키 이벤트 처리

**Props**:

```typescript
interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}
```

**레이아웃**:

```
┌────────────────────────────┬────┐
│  입력 필드                  │ 전송 │
└────────────────────────────┴────┘
```

**스타일링**:

- 컨테이너: flex gap-2, p-4, border-t
- 입력 필드: flex-1, rounded-lg, px-3 py-2, bg-background
- 플레이스홀더: "메시지를 입력하세요..."
- 전송 버튼: 아이콘 버튼 (Send), disabled when isLoading or empty

### 5. API Route

**위치**: `src/app/api/chat/route.ts`

**책임**:

- 클라이언트 요청 수신
- 시스템 프롬프트 및 XML 템플릿 로드 및 캐싱
- 사용자 입력을 XML 템플릿으로 포맷팅
- 시스템 메시지를 메시지 배열에 추가
- Gemini API 호출
- 스트리밍 응답 반환

**구현**:

```typescript
import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";
import { readFile } from "fs/promises";
import { join } from "path";
import type { UIMessage } from "@ai-sdk/react";

// 시스템 프롬프트 및 템플릿 캐싱
let cachedSystemPrompt: string | null = null;
let cachedUserInputTemplate: string | null = null;

async function getSystemPrompt(): Promise<string> {
  if (cachedSystemPrompt) return cachedSystemPrompt;

  const promptPath = join(process.cwd(), "prompts", "systemProfilePrompt.md");
  cachedSystemPrompt = await readFile(promptPath, "utf-8");
  return cachedSystemPrompt;
}

async function getUserInputTemplate(): Promise<string> {
  if (cachedUserInputTemplate) return cachedUserInputTemplate;

  const templatePath = join(process.cwd(), "prompts", "templates", "user-input.xml");
  cachedUserInputTemplate = await readFile(templatePath, "utf-8");
  return cachedUserInputTemplate;
}

/**
 * 사용자 메시지를 XML 템플릿으로 감싸기
 */
function wrapUserMessage(content: string, template: string): string {
  return template.replace("{{WORD}}", content);
}

/**
 * UIMessage에서 텍스트 추출
 */
function extractTextFromMessage(msg: UIMessage): string {
  const textParts = msg.parts?.filter((part) => part.type === "text") || [];
  return textParts.map((part) => (part.type === "text" ? part.text : "")).join("");
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const systemPrompt = await getSystemPrompt();
  const userInputTemplate = await getUserInputTemplate();

  // 사용자 메시지를 XML 템플릿으로 감싸기
  const processedMessages: UIMessage[] = messages.map((msg) => {
    if (msg.role === "user") {
      const textContent = extractTextFromMessage(msg);
      return {
        ...msg,
        parts: [
          {
            type: "text",
            text: wrapUserMessage(textContent, userInputTemplate),
          },
        ],
      };
    }
    return msg;
  });

  // 시스템 메시지 추가
  const messagesWithSystem: UIMessage[] = [
    {
      id: "system",
      role: "system",
      parts: [
        {
          type: "text",
          text: systemPrompt,
        },
      ],
    },
    ...processedMessages,
  ];

  console.log("🚀 Sending to AI model...");

  const result = streamText({
    model: google("gemini-2.0-flash-exp"),
    messages: convertToModelMessages(messagesWithSystem),
  });

  return result.toDataStreamResponse();
}
```

## 데이터 모델

### Message 타입

```typescript
interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date;
}
```

### ChatState 타입

```typescript
interface ChatState {
  messages: Message[];
  input: string;
  isLoading: boolean;
  error: Error | null;
}
```

## 에러 처리

### 클라이언트 에러

1. **네트워크 에러**:
   - 표시: "네트워크 연결을 확인해주세요."
   - 재시도 버튼 제공

2. **API 에러**:
   - 표시: "응답을 생성하는 중 오류가 발생했습니다."
   - 에러 메시지를 콘솔에 로깅

3. **타임아웃**:
   - 30초 후 타임아웃
   - 표시: "응답 시간이 초과되었습니다. 다시 시도해주세요."

### 서버 에러

1. **파일 읽기 실패**:
   - 시스템 프롬프트 로드 실패 시 기본 프롬프트 사용
   - 에러 로깅

2. **Gemini API 에러**:
   - 상태 코드 500 반환
   - 에러 메시지 포함

## 테스팅 전략

### 단위 테스트 (선택적)

- ChatMessage 컴포넌트: role에 따른 스타일 적용 확인
- ChatInput 컴포넌트: Enter 키 이벤트 처리 확인

### 통합 테스트 (선택적)

- useChat 훅과 API 라우트 통합 테스트
- 메시지 전송 및 응답 수신 플로우 테스트

### 수동 테스트 (필수)

1. 챗봇 버튼 클릭 → 창 열림/닫힘 확인
2. 환영 메시지 및 빠른 답변 버튼 표시 확인
3. 빠른 답변 버튼 클릭 → 질문 전송 확인
4. 텍스트 입력 및 전송 → AI 응답 스트리밍 확인
5. 여러 메시지 교환 → 스크롤 동작 확인
6. 창 닫기 → 대화 기록 보존 확인
7. 에러 시나리오 테스트 (네트워크 끊김 등)

## 성능 최적화

### 1. 시스템 프롬프트 캐싱

- 첫 요청 시 파일 읽기
- 메모리에 캐싱하여 후속 요청 최적화
- 서버 재시작 시 캐시 초기화

### 2. 메시지 렌더링 최적화

- React.memo로 ChatMessage 컴포넌트 메모이제이션
- 메시지 목록 가상화 (메시지가 많을 경우)

### 3. 애니메이션 최적화

- transform과 opacity만 사용 (GPU 가속)
- will-change 속성 최소화
- 애니메이션 지속 시간 0.3초 이하

### 4. 스트리밍 최적화

- useChat 훅의 내장 스트리밍 처리 활용
- 토큰 단위 실시간 렌더링

## 접근성

### 키보드 네비게이션

- Tab: 입력 필드 및 버튼 간 이동
- Enter: 메시지 전송
- Escape: 챗봇 창 닫기 (선택적)

### 스크린 리더

- 챗봇 버튼: aria-label="AI 챗봇 열기"
- 메시지 영역: role="log", aria-live="polite"
- 입력 필드: aria-label="메시지 입력"
- 전송 버튼: aria-label="메시지 전송"

### 색상 대비

- WCAG AA 기준 준수
- 포트폴리오 테마의 primary/foreground 색상 활용

## 보안 고려사항

### 1. API 키 보호

- 환경 변수로 Gemini API 키 관리
- .env.local 파일 사용
- 클라이언트에 노출 금지

### 2. 입력 검증

- 메시지 길이 제한 (최대 1000자)
- XSS 방지: React의 기본 이스케이핑 활용

### 3. Rate Limiting (선택적)

- IP 기반 요청 제한
- 사용자당 분당 10회 제한

## 배포 고려사항

### 환경 변수

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### 빌드 최적화

- Next.js 서버 컴포넌트 활용 (API 라우트)
- 클라이언트 컴포넌트 최소화
- 코드 스플리팅 자동 적용

### 모니터링

- API 응답 시간 모니터링
- 에러 발생률 추적
- 사용자 질문 패턴 분석 (선택적)
