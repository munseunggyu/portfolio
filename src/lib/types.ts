export interface PerformanceImprovement {
  title: string;
  problem: string;
  cause: string;
  solution: string;
  result: string;
}

export interface Task {
  title: string;
  description: string;
  newDevelopments: string[];
  performanceImprovements?: PerformanceImprovement[];
  hasBorder?: boolean;
}

export interface Experience {
  id: string;
  logo: string;
  gradient: string;
  name: string;
  period: string;
  tasks: Task[];
}

export interface Project {
  id: string;
  title: string;
  period: string;
  thumbnail: string;
  description: string;
  details: {
    intro: string[];
    team: string;
    tech: string;
    links: {
      github: string;
      service?: string;
    };
  };
}

// Task 8.1: UsageInfo 타입 정의
export interface UsageInfo {
  current: number; // 현재 사용량
  limit: number; // 최대 제한 (3)
  remaining: number; // 남은 횟수
  resetAt: string; // 다음 리셋 시간 (ISO 8601)
}

// Task 8.2: ChatResponse 타입 정의
export interface ChatResponse {
  message: string;
  usage: UsageInfo;
  error?: string;
}
