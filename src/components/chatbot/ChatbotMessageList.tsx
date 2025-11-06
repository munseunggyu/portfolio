"use client";

import { QUICK_REPLIES, WELCOME_MESSAGE } from "@/lib/constants";
import { UIMessage } from "ai";
import { Button } from "../ui/button";
import { ChatbotLoading, ChatbotMessage } from ".";
import { useEffect, useRef } from "react";
import { extractTextFromMessage } from "@/lib/extract-text-from-message";

interface ChatbotMessageListProps {
  messages: UIMessage[];
  onQuickReply: (reply: string) => void;
  isLoading: boolean;
  isLimitReached: boolean;
  error: Error | undefined;
}

export default function ChatbotMessageList({
  messages,
  isLoading,
  onQuickReply,
  isLimitReached,
  error,
}: ChatbotMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤 기능
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
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
                onClick={() => onQuickReply(reply)}
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
        <ChatbotMessage
          key={message.id}
          role={message.role as "user" | "assistant"}
          content={extractTextFromMessage(message)}
        />
      ))}

      {/* 로딩 표시기 */}
      {isLoading && <ChatbotLoading />}

      {/* Task 6.4: 제한 도달 메시지 */}
      {isLimitReached && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          오늘의 질문 횟수를 모두 사용했습니다. 내일 다시 방문해주세요!
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
  );
}
