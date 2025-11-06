"use client";

import { UIMessage, useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { UsageIndicator, ChatbotInput, ChatbotMessageList } from ".";

// Task 6.1: 사용량 정보 타입
interface UsageInfo {
  current: number;
  limit: number;
  remaining: number;
}

export default function ChatbotWindow() {
  const { messages, sendMessage, error, status } = useChat();
  const [input, setInput] = useState("");

  // Task 6.1: 사용량 정보 상태
  const [usage, setUsage] = useState<UsageInfo>({
    current: 0,
    limit: 3,
    remaining: 3,
  });
  const [isLimitReached, setIsLimitReached] = useState(false);

  const isLoading = status === "streaming" || status === "submitted";

  // Task 6.3: 대화 창 열릴 때 사용량 확인
  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await fetch("/api/chat/usage");
        if (response.ok) {
          const data = await response.json();
          setUsage(data);
          setIsLimitReached(data.remaining === 0);
        }
      } catch (error) {
        console.error("Failed to fetch usage:", error);
      }
    };

    fetchUsage();
  }, []);

  // input 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // submit 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isLimitReached) return;

    const message = input.trim();
    setInput("");

    try {
      await sendMessage({
        role: "user",
        parts: [{ type: "text", text: message }],
      });

      // Task 6.2: 메시지 전송 후 사용량 업데이트
      setUsage((prev) => ({
        ...prev,
        current: prev.current + 1,
        remaining: prev.remaining - 1,
      }));

      // Task 6.4: 제한 도달 확인
      if (usage.remaining - 1 === 0) {
        setIsLimitReached(true);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // 빠른 답변 버튼 클릭 핸들러
  const handleQuickReply = async (question: string) => {
    if (isLoading || isLimitReached) return;

    try {
      await sendMessage({
        role: "user",
        parts: [{ type: "text", text: question }],
      });

      // Task 6.2: 메시지 전송 후 사용량 업데이트
      setUsage((prev) => ({
        ...prev,
        current: prev.current + 1,
        remaining: prev.remaining - 1,
      }));

      // Task 6.4: 제한 도달 확인
      if (usage.remaining - 1 === 0) {
        setIsLimitReached(true);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-40 flex h-[500px] w-[320px] flex-col rounded-lg bg-card shadow-lg">
      {/* 헤더 */}
      <div className="flex items-center justify-between rounded-t-lg bg-primary px-4 py-3">
        <h2 className="text-lg font-semibold text-primary-foreground">AI 챗봇</h2>
      </div>

      {/* Task 6.2: 사용량 표시 */}
      <UsageIndicator current={usage.current} limit={usage.limit} />

      {/* 메시지 영역 */}
      <ChatbotMessageList
        error={error}
        isLimitReached={isLimitReached}
        isLoading={isLoading}
        onQuickReply={handleQuickReply}
        messages={messages}
      />

      {/* 입력 영역 - Task 6.4: 제한 도달 시 비활성화 */}
      <ChatbotInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading || isLimitReached}
      />
    </div>
  );
}
