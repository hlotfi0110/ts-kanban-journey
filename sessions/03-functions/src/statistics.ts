import type { Board, Task, TaskPriority } from './models';
import { getAllTasksFromBoard } from './taskFilters';

// ============================================
// 📊 توابع آماری و گزارش‌گیری
// ============================================

export const calculateProgress = (board: Board): number => {
  const allTasks = getAllTasksFromBoard(board);
  if (allTasks.length === 0) return 0;

  const doneTasks = allTasks.filter(task => task.status === 'DONE').length;
  return Math.round((doneTasks / allTasks.length) * 100);
};

export const countByPriority = (
  tasks: Task[]
): Record<TaskPriority, number> => {
  return {
    LOW: tasks.filter(t => t.priority === 'LOW').length,
    MEDIUM: tasks.filter(t => t.priority === 'MEDIUM').length,
    HIGH: tasks.filter(t => t.priority === 'HIGH').length
  };
};

export const getAverageCompletionTime = (tasks: Task[]): number => {
  const completedTasks = tasks.filter(task => task.status === 'DONE');
  if (completedTasks.length === 0) return 0;

  const totalTime = completedTasks.reduce((sum, task) => {
    return sum + (Date.now() - task.createdAt);
  }, 0);

  return Math.round(totalTime / completedTasks.length / (1000 * 60 * 60));
};

export const getUnassignedTasks = (board: Board): Task[] => {
  return getAllTasksFromBoard(board).filter(task => !task.assignee);
};

export const getBoardSummary = (board: Board): {
  total: number;
  todo: number;
  doing: number;
  done: number;
  overdue: number;
  completionRate: number;
} => {
  const tasks = getAllTasksFromBoard(board);
  const now = Date.now();

  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    doing: tasks.filter(t => t.status === 'DOING').length,
    done: tasks.filter(t => t.status === 'DONE').length,
    overdue: tasks.filter(t => t.dueDate && t.dueDate < now && t.status !== 'DONE').length,
    completionRate: calculateProgress(board)
  };
};