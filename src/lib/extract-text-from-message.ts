import { UIMessage } from "ai";

/**
 * 메시지에서 텍스트 추출
 */
export function extractTextFromMessage(msg: UIMessage): string {
  const textParts = msg.parts?.filter((part) => part.type === "text") || [];
  return textParts.map((part) => (part.type === "text" ? part.text : "")).join("");
}
