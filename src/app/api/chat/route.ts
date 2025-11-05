import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { readFile } from "fs/promises";
import { join } from "path";

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
 * 메시지에서 텍스트 추출
 */
function extractTextFromMessage(msg: UIMessage): string {
  const textParts = msg.parts?.filter((part) => part.type === "text") || [];
  return textParts.map((part) => (part.type === "text" ? part.text : "")).join("");
}

/**
 * POST /api/chat
 * 챗봇 메시지 처리 및 스트리밍 응답
 */
export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // 시스템 프롬프트 및 템플릿 로드
    const [systemPrompt, userInputTemplate] = await Promise.all([getSystemPrompt(), getUserInputTemplate()]);

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
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("❌ API Error:", error);
    return new Response(JSON.stringify({ error: "응답을 생성하는 중 오류가 발생했습니다." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
