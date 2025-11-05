"use client";

import { UIMessage, useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { QUICK_REPLIES, WELCOME_MESSAGE } from "@/lib/constants";

// UIMessage에서 텍스트 추출 헬퍼 함수
function extractTextFromMessage(message: UIMessage): string {
  if (!message.parts) return "";
  const textParts = message.parts.filter((part) => part.type === "text");
  return textParts.map((part) => part.text).join("");
}

export default function ChatbotWindow() {
  const { messages, sendMessage, error, status } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "streaming" || status === "submitted";

  // 자동 스크롤 기능
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // input 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // submit 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");

    await sendMessage({
      role: "user",
      parts: [{ type: "text", text: message }],
    });
  };

  // 빠른 답변 버튼 클릭 핸들러
  const handleQuickReply = async (question: string) => {
    if (isLoading) return;

    await sendMessage({
      role: "user",
      parts: [{ type: "text", text: question }],
    });
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 flex h-[500px] w-[320px] flex-col rounded-lg bg-card shadow-lg">
      {/* 헤더 */}
      <div className="flex items-center justify-between rounded-t-lg bg-primary px-4 py-3">
        <h2 className="text-lg font-semibold text-primary-foreground">AI 챗봇</h2>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4" role="log" aria-live="polite" aria-label="대화 메시지">
        {/* 환영 메시지 (메시지가 없을 때만 표시) */}
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="whitespace-pre-line text-sm text-muted-foreground">{WELCOME_MESSAGE}</div>

            {/* 빠른 답변 버튼 */}
            <div className="flex flex-wrap gap-2">
              {QUICK_REPLIES.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  disabled={isLoading}
                  className="rounded-full bg-primary/10 px-3 py-1.5 text-xs hover:bg-primary/20"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 대화 메시지 목록 */}
        {messages.map((message: UIMessage) => (
          <ChatMessage
            key={message.id}
            role={message.role as "user" | "assistant"}
            content={extractTextFromMessage(message)}
          />
        ))}

        {/* 로딩 표시기 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2">
              <div className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-100">●</span>
                <span className="animate-bounce delay-200">●</span>
              </div>
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.
          </div>
        )}

        {/* 자동 스크롤 타겟 */}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
