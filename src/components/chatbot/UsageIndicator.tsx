"use client";

interface UsageIndicatorProps {
  current: number;
  limit: number;
}

/**
 * 남은 질문 횟수를 표시하는 컴포넌트
 * Task 5.1 & 5.2
 */
export default function UsageIndicator({ current, limit }: UsageIndicatorProps) {
  const remaining = limit - current;
  const isWarning = remaining === 0;

  return (
    <div className="px-4 py-2 text-sm border-b">
      <p className={isWarning ? "text-destructive font-medium" : "text-muted-foreground"}>
        남은 질문: {remaining}/{limit}
      </p>
    </div>
  );
}
