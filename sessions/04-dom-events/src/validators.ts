import type { Task, Board, Column } from './models';

// ============================================
// ✅ توابع اعتبارسنجی (Validators)
// ============================================

export const isValidTaskTitle = (title: string): boolean => {
  const trimmed = title.trim();
  return trimmed.length > 0 && trimmed.length <= 100;
};

export const isValidTask = (task: Task): boolean => {
  if (!isValidTaskTitle(task.title)) return false;
  if (task.description && task.description.length > 500) return false;
  return true;
};

export const canAddTaskToColumn = (column: Column): boolean => {
  if (!column.maxTasks) return true;
  return column.tasks.length < column.maxTasks;
};

export const isDuplicateTaskId = (board: Board, taskId: string): boolean => {
  for (const column of board.columns) {
    if (column.tasks.some(task => task.id === taskId)) {
      return true;
    }
  }
  return false;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  return /^09\d{9}$/.test(phone);
};

export const isValidPrice = (price: number): boolean => {
  return price > 0 && price < 1_000_000_000;
};