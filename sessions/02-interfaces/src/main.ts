// 📥 وارد کردن مدل‌ها از فایل models.ts
import type { Task, Column, Board, TaskStatus, TaskPriority, BoardStats } from './models';

// ============================================
// 🧪 ساخت داده‌های نمونه برای تست
// ============================================

// 📝 تسک اول - با همه فیلدها
const task1: Task = {
  id: 't-1001',
  createdAt: Date.now(),
  title: 'طراحی رابط کاربری صفحه اصلی',
  description: 'طراحی UI/UX با Figma - نسخه موبایل و دسکتاپ',
  status: 'TODO',
  priority: 'HIGH',
  assignee: 'علی رضایی',
  dueDate: Date.now() + 86400000,  // فردا (۲۴ ساعت × ۶۰ دقیقه × ۶۰ ثانیه × ۱۰۰۰ میلی‌ثانیه)
  tags: ['طراحی', 'UI/UX', 'فوری']
};

// 📝 تسک دوم - بدون فیلدهای اختیاری
const task2: Task = {
  id: 't-1002',
  createdAt: Date.now(),
  title: 'پیاده‌سازی سیستم احراز هویت',
  status: 'DOING',
  priority: 'HIGH'
  // description, assignee, dueDate, tags همه اختیاری‌اند
};

// 📝 تسک سوم - وضعیت DONE
const task3: Task = {
  id: 't-1003',
  createdAt: Date.now() - 86400000,  // دیروز
  title: 'نوشتن تست‌های واحد',
  status: 'DONE',
  priority: 'MEDIUM',
  assignee: 'سارا احمدی'
};

// 📝 تسک چهارم - با اولویت پایین
const task4: Task = {
  id: 't-1004',
  createdAt: Date.now(),
  title: 'مستندسازی API',
  description: 'استفاده از Swagger/OpenAPI',
  status: 'TODO',
  priority: 'LOW',
  tags: ['مستندات']
};

// ============================================
// 📊 ساخت ستون‌های بورد
// ============================================

const todoColumn: Column = {
  id: 'c-1',
  createdAt: Date.now(),
  title: '📝 برای انجام',
  status: 'TODO',
  tasks: [task1, task4],  // ۲ تسک در این ستون
  maxTasks: 10,
  color: '#3b82f6'  // آبی
};

const doingColumn: Column = {
  id: 'c-2',
  createdAt: Date.now(),
  title: '⚙️ در حال انجام',
  status: 'DOING',
  tasks: [task2],  // ۱ تسک
  maxTasks: 5,
  color: '#f59e0b'  // نارنجی
};

const doneColumn: Column = {
  id: 'c-3',
  createdAt: Date.now(),
  title: '✅ انجام شده',
  status: 'DONE',
  tasks: [task3],  // ۱ تسک
  color: '#10b981'  // سبز
  // maxTasks تعریف نشده چون اختیاری است
};

// ============================================
// 🗂️ ساخت بورد کامل
// ============================================

const mainBoard: Board = {
  id: 'b-1',
  createdAt: Date.now(),
  name: 'پروژه توسعه وب‌سایت',
  description: 'بورد مدیریت تسک‌های تیم فرانت‌اند',
  columns: [todoColumn, doingColumn, doneColumn],
  owner: 'حسین لطفی',
  members: ['علی رضایی', 'سارا احمدی', 'رضا محمدی']
};

// ============================================
// 📊 نمایش اطلاعات در کنسول
// ============================================

console.log('🎯 بورد:', mainBoard.name);
console.log('👤 مالک:', mainBoard.owner);
console.log('👥 اعضای تیم:', mainBoard.members?.join('، '));
console.log('📊 تعداد ستون‌ها:', mainBoard.columns.length);
console.log('📝 تسک‌های TODO:', todoColumn.tasks.length);
console.log('⚡ تسک‌های DOING:', doingColumn.tasks.length);
console.log('✅ تسک‌های DONE:', doneColumn.tasks.length);

// ============================================
// 🧪 تست قوانین TypeScript
// ============================================

// ❌ تست readonly (این خط‌ها را uncomment کنید و خطا را ببینید)
// mainBoard.id = 'b-2';          // ❌ Cannot assign to 'id' because it is read-only
// task1.createdAt = 0;           // ❌ Cannot assign to 'createdAt'

// ❌ تست Literal Types
// task1.status = 'PENDING';      // ❌ Type '"PENDING"' is not assignable to type 'TaskStatus'
// task1.priority = 'URGENT';     // ❌ Type '"URGENT"' is not assignable to type 'TaskPriority'

// ❌ تست فیلد اجباری
// const wrongTask: Task = {
//   id: 't-999',
//   createdAt: Date.now()
//   // ❌ خطا: title, status, priority فراموش شده‌اند!
// };

// ============================================
// 🔧 توابع کمکی برای کار با داده‌ها
// ============================================

/**
 * محاسبه آمار کلی بورد
 * @param board - بورد مورد نظر
 * @returns آمار بورد شامل تعداد تسک‌ها و درصد تکمیل
 */
const calculateBoardStats = (board: Board): BoardStats => {
  let totalTasks = 0;
  let completedTasks = 0;
  let inProgressTasks = 0;
  let todoTasks = 0;

  board.columns.forEach(column => {
    totalTasks += column.tasks.length;

    column.tasks.forEach(task => {
      if (task.status === 'DONE') completedTasks++;
      else if (task.status === 'DOING') inProgressTasks++;
      else if (task.status === 'TODO') todoTasks++;
    });
  });

  const completionRate = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return {
    totalTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    completionRate
  };
};

/**
 * پیدا کردن یک تسک با استفاده از ID
 * @param board - بورد مورد جستجو
 * @param taskId - شناسه تسک
 * @returns تسک پیدا شده یا undefined
 */
const findTaskById = (board: Board, taskId: string): Task | undefined => {
  for (const column of board.columns) {
    const task = column.tasks.find(t => t.id === taskId);
    if (task) return task;
  }
  return undefined;
};

/**
 * فیلتر کردن تسک‌ها بر اساس اولویت
 * @param board - بورد مورد نظر
 * @param priority - اولویت مورد نظر
 * @returns آرایه‌ای از تسک‌های با اولویت مشخص
 */
const filterTasksByPriority = (
  board: Board,
  priority: TaskPriority
): Task[] => {
  const tasks: Task[] = [];

  board.columns.forEach(column => {
    column.tasks.forEach(task => {
      if (task.priority === priority) {
        tasks.push(task);
      }
    });
  });

  return tasks;
};

/**
 * گرفتن تمام تسک‌های منقضی شده (Overdue)
 */
const getOverdueTasks = (board: Board): Task[] => {
  const now = Date.now();
  const overdue: Task[] = [];

  board.columns.forEach(column => {
    column.tasks.forEach(task => {
      if (task.dueDate && task.dueDate < now && task.status !== 'DONE') {
        overdue.push(task);
      }
    });
  });

  return overdue;
};

/**
 * جستجوی تسک بر اساس کلمه در عنوان
 */
const searchTasks = (board: Board, query: string): Task[] => {
  const lowerQuery = query.toLowerCase();
  const results: Task[] = [];

  board.columns.forEach(column => {
    column.tasks.forEach(task => {
      if (task.title.toLowerCase().includes(lowerQuery)) {
        results.push(task);
      }
    });
  });

  return results;
};

// ============================================
// 🧪 تست توابع
// ============================================

console.log('\n--- 🧪 تست توابع ---');

const stats = calculateBoardStats(mainBoard);
console.log('📈 آمار بورد:', stats);
console.log(`🎯 درصد تکمیل: ${stats.completionRate}%`);

const foundTask = findTaskById(mainBoard, 't-1002');
console.log('🔍 تسک پیدا شده:', foundTask?.title ?? 'یافت نشد');

const notFound = findTaskById(mainBoard, 't-9999');
console.log('❌ تسک ناموجود:', notFound ?? 'null');

const highPriorityTasks = filterTasksByPriority(mainBoard, 'HIGH');
console.log('🔥 تسک‌های اولویت بالا:', highPriorityTasks.length);
highPriorityTasks.forEach(t => console.log(`   - ${t.title}`));

const overdueTasks = getOverdueTasks(mainBoard);
console.log('⏰ تسک‌های منقضی:', overdueTasks.length);

const searchResults = searchTasks(mainBoard, 'طراحی');
console.log(`🔎 نتایج جستجوی "طراحی":`, searchResults.length);