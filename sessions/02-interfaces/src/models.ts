// ============================================
// 📋 فایل models.ts - قلب داده‌ای پروژه
// ============================================

// 🏷️ ۱. Literal Types برای وضعیت‌های تسک
export type TaskStatus = 'TODO' | 'DOING' | 'DONE';

// 🏷️ ۲. Literal Types برای اولویت‌های تسک
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

// 🏛️ ۳. اینترفیس پایه — فیلدهای مشترک همه موجودیت‌ها
export interface BaseEntity {
  readonly id: string;           // 🔒 شناسه یکتا
  readonly createdAt: number;    // 🔒 زمان ایجاد
}

// 📝 ۴. مدل تسک (Task) — ارث‌بری از BaseEntity
export interface Task extends BaseEntity {
  title: string;                 // اجباری - عنوان تسک
  description?: string;          // اختیاری - توضیحات
  status: TaskStatus;            // از نوع Literal
  priority: TaskPriority;        // از نوع Literal
  assignee?: string;             // اختیاری - مسئول انجام
  dueDate?: number;              // اختیاری - مهلت انجام (timestamp)
  tags?: string[];               // اختیاری - تگ‌ها
}

// 📊 ۵. مدل ستون (Column) — ارث‌بری از BaseEntity
export interface Column extends BaseEntity {
  title: string;                 // عنوان ستون (مثل "برای انجام")
  status: TaskStatus;            // وضعیت پیش‌فرض تسک‌های این ستون
  tasks: Task[];                 // آرایه‌ای از تسک‌ها
  maxTasks?: number;             // اختیاری - حداکثر تعداد تسک
  color?: string;                // اختیاری - رنگ نمایشی
}

// 🗂️ ۶. مدل کل بورد (Board) — ارث‌بری از BaseEntity
export interface Board extends BaseEntity {
  name: string;                  // نام بورد
  description?: string;          // اختیاری - توضیحات بورد
  columns: Column[];             // آرایه‌ای از ستون‌ها
  owner: string;                 // مالک بورد
  members?: string[];            // اختیاری - اعضای تیم
}

// 📈 ۷. تایپ برای آمار بورد (از Type Alias استفاده می‌کنیم چون آبجکت ساده است)
export type BoardStats = {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  completionRate: number;        // درصد تکمیل (۰ تا ۱۰۰)
};

// 🔍 ۸. تایپ برای نتیجه جستجو
export type SearchResult = {
  found: boolean;
  task?: Task;                   // اختیاری - اگر پیدا شد
  columnId?: string;             // اختیاری - ستون مربوطه
};