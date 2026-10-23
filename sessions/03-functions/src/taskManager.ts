import type { Task, Board, Column, TaskStatus, TaskPriority } from './models';

// ============================================
// 🏗️ توابع CRUD (Create, Read, Update, Delete)
// ============================================

/**
 * ساخت یک تسک جدید با ID یکتا
 */
export const createTask = (
  title: string,
  priority: TaskPriority,
  description?: string,
  assignee?: string
): Task => {
  return {
    id: `t-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: Date.now(),
    title,
    description,
    status: 'TODO',
    priority,
    assignee
  };
};

/**
 * اضافه کردن تسک به یک ستون (Pure Function)
 */
export const addTaskToColumn = (
  column: Column,
  task: Task
): Column => {
  if (column.maxTasks && column.tasks.length >= column.maxTasks) {
    console.warn(`⚠️ ستون "${column.title}" پر است!`);
    return column;
  }

  return {
    ...column,
    tasks: [...column.tasks, task]
  };
};

/**
 * حذف تسک از ستون (Pure Function)
 */
export const removeTaskFromColumn = (
  column: Column,
  taskId: string
): Column => {
  return {
    ...column,
    tasks: column.tasks.filter(task => task.id !== taskId)
  };
};

/**
 * به‌روزرسانی وضعیت یک تسک (Pure)
 */
export const updateTaskStatus = (
  task: Task,
  newStatus: TaskStatus
): Task => {
  return {
    ...task,
    status: newStatus
  };
};

/**
 * به‌روزرسانی اولویت تسک (Pure)
 */
export const updateTaskPriority = (
  task: Task,
  newPriority: TaskPriority
): Task => {
  return {
    ...task,
    priority: newPriority
  };
};

/**
 * پیدا کردن تسک در کل بورد
 */
export const findTaskInBoard = (
  board: Board,
  taskId: string
): { task: Task; columnId: string } | null => {
  for (const column of board.columns) {
    const task = column.tasks.find(t => t.id === taskId);
    if (task) {
      return { task, columnId: column.id };
    }
  }
  return null;
};