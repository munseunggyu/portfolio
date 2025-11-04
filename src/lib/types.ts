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