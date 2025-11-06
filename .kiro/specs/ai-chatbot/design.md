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
              ├─ UsageIndicator (남은 횟수 표시)
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
         ┌──────────────────────────────┐
         │  /api/chat                   │
         │  (Next.js API)               │
         └────────┬─────────────────────┘
                  │
                  ├─ 1. 사용자 식별 (IP + User Agent → SHA-256)
                  │
                  ├─ 2. Supabase: 사용량 확인
                  │    └─ 제한 초과 시 → 에러 반환
                  │
                  ├─ 3. systemProfilePrompt.md 로드
                  │
                  ├─ 4. Gemini 2.5 Flash-Lite 호출
                  │    (@ai-sdk/google)
                  │
                  └─ 5. Supabase: 대화 로그 저장
                       ├─ 사용자 메시지 저장
                       └─ AI 응답 저장
```

### 기술 스택

- **프론트엔드**: React 19, Next.js 15, TypeScript
- **UI 라이브러리**: Tailwind CSS v4, Framer Motion
- **AI SDK**: @ai-sdk/react, @ai-sdk/google
- **AI 모델**: Google Gemini 2.5 Flash-Lite
- **상태 관리**: useChat 훅 (내장)
- **데이터베이스**: Supabase (PostgreSQL)
- **인증/식별**: IP + User Agent 해싱 (SHA-256)

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
- 사용량 정보 관리 및 표시
- 메시지 전송 로직 처리
- 빠른 답변 버튼 핸들러 제공

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

### 3. ChatbotMessageList 컴포넌트

**위치**: `src/components/chatbot/ChatbotMessageList.tsx`

**책임**:

- 메시지 목록 렌더링
- 환영 메시지 및 빠른 답변 버튼 표시
- 스크롤 자동 조정
- 로딩 상태 및 에러 메시지 표시
- 제한 도달 메시지 표시

**Props**:

```typescript
interface ChatbotMessageListProps {
  messages: UIMessage[];
  onQuickReply: (reply: string) => void;
  isLoading: boolean;
  isLimitReached: boolean;
  error: Error | undefined;
}
```

**기능**:

- 메시지가 없을 때 환영 메시지와 빠른 답변 버튼 표시
- 메시지 목록을 ChatbotMessage 컴포넌트로 렌더링
- 새 메시지 추가 시 자동 스크롤 (useRef + useEffect)
- 로딩 중일 때 ChatbotLoading 컴포넌트 표시
- 제한 도달 시 안내 메시지 표시
- 에러 발생 시 에러 메시지 표시

**스타일링**:

- 컨테이너: flex-1, overflow-y-auto, p-4, space-y-4
- role="log", aria-live="polite", aria-label="대화 메시지"

### 4. ChatbotMessage 컴포넌트

**위치**: `src/components/chatbot/ChatbotMessage.tsx`

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

### 5. ChatbotInput 컴포넌트

**위치**: `src/components/chatbot/ChatbotInput.tsx`

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

### 6. ChatbotLoading 컴포넌트

**위치**: `src/components/chatbot/ChatbotLoading.tsx`

**책임**:

- AI 응답 생성 중 로딩 애니메이션 표시

**Props**:

```typescript
// Props 없음
```

**스타일링**:

- 애니메이션 효과가 있는 로딩 인디케이터
- AI 메시지와 동일한 스타일 (좌측 정렬)

### 7. UsageIndicator 컴포넌트

**위치**: `src/components/chatbot/UsageIndicator.tsx`

**책임**:

- 남은 질문 횟수 표시
- 제한 도달 시 경고 메시지 표시

**Props**:

```typescript
interface UsageIndicatorProps {
  current: number;
  limit: number;
}
```

**스타일링**:

- 위치: 대화 창 헤더 또는 입력 필드 상단
- 텍스트: "남은 질문: {remaining}/{limit}"
- 색상:
  - 정상 (remaining > 0): text-muted-foreground
  - 경고 (remaining === 0): text-destructive
- 크기: text-sm

### 8. 메시지 텍스트 추출 유틸리티

**위치**: `src/lib/extract-text-from-message.ts`

**책임**:

- UIMessage 객체에서 텍스트 콘텐츠 추출
- 재사용 가능한 공통 유틸리티

```typescript
import { UIMessage } from "ai";

/**
 * 메시지에서 텍스트 추출
 */
export function extractTextFromMessage(msg: UIMessage): string {
  const textParts = msg.parts?.filter((part) => part.type === "text") || [];
  return textParts.map((part) => (part.type === "text" ? part.text : "")).join("");
}
```

**사용 위치**:

- `/api/chat` - 사용자 메시지 추출
- `ChatbotMessageList` - 메시지 렌더링 시 텍스트 추출

### 9. API Route

**위치**: `src/app/api/chat/route.ts`

**책임**:

- 클라이언트 요청 수신
- 사용자 식별 (IP + User Agent → SHA-256 해시)
- Supabase에서 사용량 확인 및 제한 검증
- 시스템 프롬프트 및 XML 템플릿 로드 및 캐싱
- 사용자 입력을 XML 템플릿으로 포맷팅
- 시스템 메시지를 메시지 배열에 추가
- Gemini API 호출
- Supabase에 대화 로그 저장 (사용자 메시지 + AI 응답)
- 스트리밍 응답 반환

**구현 플로우**:

```typescript
import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";
import { readFile } from "fs/promises";
import { join } from "path";
import type { UIMessage } from "@ai-sdk/react";

// Supabase 서버 클라이언트 import
import { supabaseServer } from "@/lib/supabase/server";

// 사용자 핑거프린트 유틸리티 import
import { generateFingerprint, getOrCreateUser } from "@/lib/user-fingerprint";

// 메시지 텍스트 추출 유틸리티 import
import { extractTextFromMessage } from "@/lib/extract-text-from-message";

// 상수
const MESSAGE_LIMIT = 3;
const RESET_HOURS = 24;

// 시스템 프롬프트 및 템플릿 캐싱
let cachedSystemPrompt: string | null = null;
let cachedUserInputTemplate: string | null = null;

/**
 * 사용자 핑거프린트 생성 (IP + User Agent → SHA-256)
 */
function generateFingerprint(req: Request): string {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  return crypto.createHash("sha256").update(`${ip}-${userAgent}`).digest("hex");
}

/**
 * 사용자 조회 또는 생성
 */
async function getOrCreateUser(fingerprint: string) {
  // 기존 사용자 조회
  const { data: existingUser } = await supabaseServer.from("users").select("*").eq("fingerprint", fingerprint).single();

  if (existingUser) {
    // 24시간 경과 시 리셋
    const lastReset = new Date(existingUser.last_reset_at);
    const now = new Date();
    const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

    if (hoursSinceReset >= RESET_HOURS) {
      const { data: resetUser } = await supabaseServer
        .from("users")
        .update({
          message_count: 0,
          last_reset_at: now.toISOString(),
          updated_at: now.toISOString(),
        })
        .eq("id", existingUser.id)
        .select()
        .single();

      return resetUser;
    }

    return existingUser;
  }

  // 새 사용자 생성
  const { data: newUser } = await supabaseServer
    .from("users")
    .insert({
      fingerprint,
      message_count: 0,
    })
    .select()
    .single();

  return newUser;
}

/**
 * 사용량 확인 및 증가
 */
async function checkAndIncrementUsage(userId: string): Promise<boolean> {
  const { data: user } = await supabaseServer.from("users").select("message_count").eq("id", userId).single();

  if (!user || user.message_count >= MESSAGE_LIMIT) {
    return false; // 제한 초과
  }

  // 사용량 증가
  await supabaseServer
    .from("users")
    .update({
      message_count: user.message_count + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  return true;
}

/**
 * 대화 쌍 저장 (질문 + 응답)
 */
async function saveConversation(userId: string, userQuestion: string, aiResponse: string) {
  try {
    await supabaseServer.from("chat_logs").insert({
      user_id: userId,
      user_question: userQuestion,
      ai_response: aiResponse,
    });
  } catch (error) {
    console.error("Failed to save conversation:", error);
    // 로그 저장 실패해도 챗봇은 계속 작동
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. 사용자 식별
    const fingerprint = generateFingerprint(req);
    const user = await getOrCreateUser(fingerprint);

    if (!user) {
      return new Response(JSON.stringify({ error: "사용자 정보를 가져올 수 없습니다." }), { status: 500 });
    }

    // 2. 사용량 확인 및 증가
    const canProceed = await checkAndIncrementUsage(user.id);

    if (!canProceed) {
      return new Response(
        JSON.stringify({
          error: "오늘의 질문 횟수를 모두 사용했습니다. 내일 다시 방문해주세요!",
          usage: {
            current: MESSAGE_LIMIT,
            limit: MESSAGE_LIMIT,
            remaining: 0,
          },
        }),
        { status: 429 }
      );
    }

    // 3. 시스템 프롬프트 로드
    const systemPrompt = await getSystemPrompt();
    const userInputTemplate = await getUserInputTemplate();

    // 4. 사용자 메시지 추출 (나중에 AI 응답과 함께 저장)
    const lastUserMessage = messages[messages.length - 1];
    const userMessageContent = extractTextFromMessage(lastUserMessage);

    // 5. 메시지 처리
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

    const messagesWithSystem: UIMessage[] = [
      {
        id: "system",
        role: "system",
        parts: [{ type: "text", text: systemPrompt }],
      },
      ...processedMessages,
    ];

    // 6. Gemini API 호출
    const result = streamText({
      model: google("gemini-2.0-flash-exp"),
      messages: convertToModelMessages(messagesWithSystem),
      onFinish: async ({ text }) => {
        // 7. 대화 쌍 저장 (질문 + 응답)
        await saveConversation(user.id, userMessageContent, text);
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "응답을 생성하는 중 오류가 발생했습니다." }), { status: 500 });
  }
}
```

### 7. Supabase 유틸리티

**클라이언트용**: `src/lib/supabase/client.ts`

**책임**:

- 클라이언트 사이드에서 사용할 Supabase 클라이언트 초기화
- Anon Key 사용

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
```

**서버용**: `src/lib/supabase/server.ts`

**책임**:

- 서버 사이드에서 사용할 Supabase 클라이언트 초기화
- Service Role Key 사용 (모든 권한)

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

### 8. 사용자 핑거프린트 유틸리티

**위치**: `src/lib/user-fingerprint.ts`

**책임**:

- 사용자 핑거프린트 생성 (IP + User Agent → SHA-256)
- 사용자 조회 또는 생성
- 재사용 가능한 공통 로직 제공

```typescript
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * 사용자 핑거프린트 생성 (IP + User Agent → SHA-256)
 */
export function generateFingerprint(req: Request): string {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  return crypto.createHash("sha256").update(`${ip}-${userAgent}`).digest("hex");
}

/**
 * 사용자 조회 또는 생성
 * Supabase cron job이 매일 00:00에 자동으로 리셋하므로 애플리케이션에서는 체크 불필요
 */
export async function getOrCreateUser(fingerprint: string) {
  // 기존 사용자 조회
  const { data: existingUser } = await supabaseServer.from("users").select("*").eq("fingerprint", fingerprint).single();

  if (existingUser) {
    return existingUser;
  }

  // 새 사용자 생성
  const { data: newUser } = await supabaseServer
    .from("users")
    .insert({
      fingerprint,
      message_count: 0,
    })
    .select()
    .single();

  return newUser;
}
```

**사용 위치**:

- `/api/chat` - 챗봇 메시지 처리
- `/api/chat/usage` - 사용량 조회

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

### Supabase 데이터베이스 스키마

#### 1. users 테이블

사용자 식별 및 사용량 추적

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint TEXT UNIQUE NOT NULL,  -- SHA-256 해시 (IP + User Agent)
  message_count INTEGER DEFAULT 0,   -- 현재 사용량
  last_reset_at TIMESTAMPTZ DEFAULT NOW(),  -- 마지막 리셋 시간
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_users_fingerprint ON users(fingerprint);
CREATE INDEX idx_users_last_reset ON users(last_reset_at);
```

#### 2. chat_logs 테이블

대화 쌍 저장 (질문 + 응답)

```sql
CREATE TABLE chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_question TEXT NOT NULL,  -- 사용자 질문
  ai_response TEXT NOT NULL,    -- AI 응답
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_chat_logs_user_id ON chat_logs(user_id);
CREATE INDEX idx_chat_logs_created_at ON chat_logs(created_at);
```

**마이그레이션 파일**: `supabase/migrations/update_chat_logs_to_conversation_pairs.sql`

기존 `role`/`content` 컬럼을 `user_question`/`ai_response`로 변경하는 마이그레이션:

```sql
-- chat_logs 테이블 구조 변경: role/content → user_question/ai_response
-- 실행 전 주의: 기존 데이터가 있다면 백업을 권장합니다

-- 1. 기존 데이터 백업 (선택사항)
CREATE TABLE IF NOT EXISTS chat_logs_backup AS SELECT * FROM chat_logs;

-- 2. 새로운 컬럼 추가
ALTER TABLE chat_logs
ADD COLUMN IF NOT EXISTS user_question TEXT,
ADD COLUMN IF NOT EXISTS ai_response TEXT;

-- 3. 기존 컬럼 삭제 (기존 데이터 확인 후 실행)
ALTER TABLE chat_logs
DROP COLUMN IF EXISTS role,
DROP COLUMN IF EXISTS content;

-- 4. NOT NULL 제약조건 추가
ALTER TABLE chat_logs
ALTER COLUMN user_question SET NOT NULL,
ALTER COLUMN ai_response SET NOT NULL;

-- 5. 컬럼 설명 추가
COMMENT ON COLUMN chat_logs.user_question IS '사용자 질문';
COMMENT ON COLUMN chat_logs.ai_response IS 'AI 응답';
```

### API 응답 타입

#### UsageInfo 타입

```typescript
interface UsageInfo {
  current: number; // 현재 사용량
  limit: number; // 최대 제한 (3)
  remaining: number; // 남은 횟수
  resetAt: string; // 다음 리셋 시간 (ISO 8601)
}
```

#### ChatResponse 타입

```typescript
interface ChatResponse {
  message: string;
  usage: UsageInfo;
  error?: string;
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

4. **사용량 제한 초과 (429)**:
   - 표시: "오늘의 질문 횟수를 모두 사용했습니다. 내일 다시 방문해주세요!"
   - 입력 필드 비활성화
   - 남은 횟수 0으로 표시

### 서버 에러

1. **파일 읽기 실패**:
   - 시스템 프롬프트 로드 실패 시 기본 프롬프트 사용
   - 에러 로깅

2. **Gemini API 에러**:
   - 상태 코드 500 반환
   - 에러 메시지 포함

3. **Supabase 연결 실패**:
   - 사용량 확인 실패 시: 기본값으로 진행 (제한 없음)
   - 로그 저장 실패 시: 에러 로깅만 하고 챗봇은 계속 작동
   - 사용자에게는 에러 표시 안 함

4. **사용자 식별 실패**:
   - IP 또는 User Agent를 가져올 수 없는 경우: "unknown" 사용
   - 에러 로깅

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
8. **사용량 제한 테스트**:
   - 3번 질문 후 제한 확인
   - 남은 횟수 UI 업데이트 확인
   - 제한 도달 시 입력 필드 비활성화 확인
   - 제한 도달 메시지 표시 확인
9. **Supabase 데이터 저장 테스트**:
   - 질문/응답이 chat_logs 테이블에 저장되는지 확인
   - users 테이블에 사용자가 생성되는지 확인
   - message_count가 증가하는지 확인
10. **24시간 리셋 테스트**:
    - last_reset_at을 24시간 이전으로 수동 변경
    - 새 질문 시 message_count가 리셋되는지 확인
11. **시크릿 모드 테스트**:
    - 일반 브라우저에서 3번 질문
    - 시크릿 모드에서 접속 시 동일하게 제한되는지 확인
12. **자동 리셋 스케줄러 테스트**:
    - pg_cron job이 정상 실행되는지 확인
    - 매일 00:00 이후 사용량이 0으로 리셋되는지 확인
    - Supabase 대시보드에서 cron job 로그 확인

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

- 환경 변수로 Gemini API 키 및 Supabase 키 관리
- .env.local 파일 사용
- 클라이언트에 노출 금지
- Service Role Key는 서버 사이드에서만 사용

### 2. 입력 검증

- 메시지 길이 제한 (최대 1000자)
- XSS 방지: React의 기본 이스케이핑 활용
- SQL Injection 방지: Supabase 클라이언트의 파라미터화된 쿼리 사용

### 3. 사용자 식별 보안

- IP + User Agent를 SHA-256으로 해싱하여 저장
- 원본 IP 주소는 저장하지 않음
- 개인정보 보호 준수

### 4. Rate Limiting

- 사용자당 24시간 내 3회 제한
- Supabase에서 사용량 추적
- 제한 초과 시 429 상태 코드 반환

### 5. 데이터베이스 보안

- Row Level Security (RLS) 정책 적용
- Service Role Key는 서버에서만 사용
- Anon Key는 읽기 전용으로 제한

## 배포 고려사항

### 환경 변수

```env
# Gemini API
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Supabase 설정

1. **데이터베이스 마이그레이션**:
   - `users` 테이블 생성
   - `chat_logs` 테이블 생성
   - 인덱스 생성

2. **Row Level Security (RLS) 정책**:

   ```sql
   -- users 테이블: 서버에서만 접근
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;

   -- chat_logs 테이블: 서버에서만 접근
   ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;
   ```

3. **자동 리셋 스케줄러 (pg_cron)**:

   매일 한국시간 00:00에 모든 사용자의 사용량을 0으로 리셋

   ```sql
   -- pg_cron 확장 활성화 (Supabase에서 기본 제공)
   CREATE EXTENSION IF NOT EXISTS pg_cron;

   -- 매일 한국시간 00:00 (UTC 15:00)에 실행되는 cron job 생성
   SELECT cron.schedule(
     'reset-daily-usage',           -- job 이름
     '0 15 * * *',                  -- 매일 UTC 15:00 (KST 00:00)
     $$
     UPDATE users
     SET message_count = 0,
         last_reset_at = NOW(),
         updated_at = NOW()
     WHERE message_count > 0;
     $$
   );
   ```

   **대안: Supabase Edge Function**

   pg_cron이 사용 불가능한 경우, Supabase Edge Function + GitHub Actions 또는 Vercel Cron을 사용:

   ```typescript
   // supabase/functions/reset-usage/index.ts
   import { createClient } from "@supabase/supabase-js";

   Deno.serve(async (req) => {
     const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

     const { data, error } = await supabase
       .from("users")
       .update({
         message_count: 0,
         last_reset_at: new Date().toISOString(),
         updated_at: new Date().toISOString(),
       })
       .gt("message_count", 0);

     if (error) {
       return new Response(JSON.stringify({ error: error.message }), {
         status: 500,
       });
     }

     return new Response(JSON.stringify({ success: true, updated: data }), {
       status: 200,
     });
   });
   ```

   **Vercel Cron 설정** (vercel.json):

   ```json
   {
     "crons": [
       {
         "path": "/api/cron/reset-usage",
         "schedule": "0 15 * * *"
       }
     ]
   }
   ```

4. **API 키 권한**:
   - Anon Key: 읽기 전용 (필요시)
   - Service Role Key: 모든 권한 (서버 전용)

### 빌드 최적화

- Next.js 서버 컴포넌트 활용 (API 라우트)
- 클라이언트 컴포넌트 최소화
- 코드 스플리팅 자동 적용
- Supabase 클라이언트 싱글톤 패턴

### 모니터링

- API 응답 시간 모니터링
- 에러 발생률 추적
- 사용자 질문 패턴 분석 (Supabase 대시보드)
- 일일 사용량 통계
- 사용량 제한 도달 빈도 추적
