// ============================================
// 📋 فایل models.ts - مدل‌های داده‌ای پروژه
// ============================================

// 🏷️ Literal Types برای وضعیت‌های تسک
export type TaskStatus = 'TODO' | 'DOING' | 'DONE';

// 🏷️ Literal Types برای اولویت‌های تسک
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

// 🏛️ اینترفیس پایه — فیلدهای مشترک همه موجودیت‌ها
export interface BaseEntity {
  readonly id: string;
  readonly createdAt: number;
}

// 📝 مدل تسک (Task) — ارث‌بری از BaseEntity
export interface Task extends BaseEntity {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: number;
  tags?: string[];
}

// 📊 مدل ستون (Column) — ارث‌بری از BaseEntity
export interface Column extends BaseEntity {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  maxTasks?: number;
  color?: string;
}

// 🗂️ مدل کل بورد (Board) — ارث‌بری از BaseEntity
export interface Board extends BaseEntity {
  name: string;
  description?: string;
  columns: Column[];
  owner: string;
  members?: string[];
}