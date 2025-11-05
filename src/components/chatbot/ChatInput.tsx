"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
        disabled={isLoading}
        aria-label="메시지 입력"
        className="flex-1 rounded-lg bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
      />
      <Button
        type="submit"
        size="icon"
        disabled={isLoading || !input.trim()}
        aria-label="메시지 전송"
        className="shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
