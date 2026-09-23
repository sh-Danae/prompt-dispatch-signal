export type TaskPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';

export interface Task {
  id: string;
  goalId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dependsOn: string[]; // IDs de tareas de las que depende
  agentId?: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  prompt: string;
  status: 'PROCESSING' | 'READY' | 'FAILED';
  tasks: string[];
}

export interface ExecutionLog {
  id: string;
  taskId?: string;
  timestamp: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
}
