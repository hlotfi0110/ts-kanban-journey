import type { Task, Board, TaskStatus, TaskPriority } from './models';

// ============================================
// 🔍 توابع فیلتر و جستجو
// ============================================

export const filterByStatus = (
  tasks: Task[],
  status: TaskStatus
): Task[] => {
  return tasks.filter(task => task.status === status);
};

export const filterByPriority = (
  tasks: Task[],
  priority: TaskPriority
): Task[] => {
  return tasks.filter(task => task.priority === priority);
};

export const filterByAssignee = (
  tasks: Task[],
  assignee: string
): Task[] => {
  return tasks.filter(task => task.assignee === assignee);
};

export const searchByTitle = (
  tasks: Task[],
  searchTerm: string
): Task[] => {
  const term = searchTerm.toLowerCase();
  return tasks.filter(task =>
    task.title.toLowerCase().includes(term)
  );
};

export const getOverdueTasks = (tasks: Task[]): Task[] => {
  const now = Date.now();
  return tasks.filter(task =>
    task.dueDate && task.dueDate < now && task.status !== 'DONE'
  );
};

export const getTodayTasks = (tasks: Task[]): Task[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate < tomorrow;
  });
};

export const getAllTasksFromBoard = (board: Board): Task[] => {
  return board.columns.flatMap(column => column.tasks);
};

export const sortByNewest = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => b.createdAt - a.createdAt);
};

export const sortByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder: Record<TaskPriority, number> = {
    'HIGH': 3,
    'MEDIUM': 2,
    'LOW': 1
  };

  return [...tasks].sort((a, b) =>
    priorityOrder[b.priority] - priorityOrder[a.priority]
  );
};