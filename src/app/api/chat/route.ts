import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { readFile } from "fs/promises";
import { join } from "path";
import { supabaseServer } from "@/lib/supabase/server";
import { generateFingerprint, getOrCreateUser } from "@/lib/user-fingerprint";
import { extractTextFromMessage } from "@/lib/extract-text-from-message";

// 상수
const MESSAGE_LIMIT = 3;

// 시스템 프롬프트 및 템플릿 캐싱
let cachedSystemPrompt: string | null = null;
let cachedUserInputTemplate: string | null = null;

/**
 * 시스템 프롬프트 로드 (캐싱 포함)
 */
async function getSystemPrompt(): Promise<string> {
  if (cachedSystemPrompt) return cachedSystemPrompt;

  const promptPath = join(process.cwd(), "prompts", "systemProfilePrompt.md");
  cachedSystemPrompt = await readFile(promptPath, "utf-8");
  return cachedSystemPrompt;
}

/**
 * 사용자 입력 XML 템플릿 로드 (캐싱 포함)
 */
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
 * Task 3.3: 사용량 확인 및 증가
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
 * Task 3.4: 대화 쌍 저장 (질문 + 응답)
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

/**
 * POST /api/chat
 * 챗봇 메시지 처리 및 스트리밍 응답
 * Task 4: 사용자 식별, 사용량 제한, 로그 저장 통합
 */
export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // Task 4.1: 사용자 식별
    const fingerprint = generateFingerprint(req);
    const user = await getOrCreateUser(fingerprint);

    if (!user) {
      return new Response(JSON.stringify({ error: "사용자 정보를 가져올 수 없습니다." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Task 4.2: 사용량 제한 확인
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
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 시스템 프롬프트 및 템플릿 로드
    const [systemPrompt, userInputTemplate] = await Promise.all([getSystemPrompt(), getUserInputTemplate()]);

    // Task 4.3: 사용자 메시지 추출 (나중에 AI 응답과 함께 저장)
    const lastUserMessage = messages[messages.length - 1];
    const userMessageContent = extractTextFromMessage(lastUserMessage);

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

    // Gemini API 호출 및 스트리밍 응답
    const result = streamText({
      model: google("gemini-2.0-flash-exp"),
      messages: convertToModelMessages(messagesWithSystem),
      onFinish: async ({ text }) => {
        // Task 4.3: 대화 쌍 저장 (질문 + 응답)
        await saveConversation(user.id, userMessageContent, text);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("❌ API Error:", error);

    // Task 4.4: 에러 처리
    if (error instanceof Error) {
      // Supabase 연결 실패 등의 에러 처리
      console.error("Error details:", error.message);
    }

    return new Response(JSON.stringify({ error: "응답을 생성하는 중 오류가 발생했습니다." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
