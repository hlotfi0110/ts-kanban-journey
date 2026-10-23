import type { Board, Column, Task } from './models';
import { createTask, addTaskToColumn, findTaskInBoard } from './taskManager';
import { filterByPriority, searchByTitle, getAllTasksFromBoard } from './taskFilters';
import { isValidTask, canAddTaskToColumn } from './validators';
import { calculateProgress, countByPriority, getBoardSummary } from './statistics';

// ============================================
// 🗂️ ساخت بورد نمونه برای تست
// ============================================

const todoColumn: Column = {
  id: 'c-1',
  createdAt: Date.now(),
  title: '📝 برای انجام',
  status: 'TODO',
  tasks: [],
  maxTasks: 10
};

const doingColumn: Column = {
  id: 'c-2',
  createdAt: Date.now(),
  title: '⚙️ در حال انجام',
  status: 'DOING',
  tasks: [],
  maxTasks: 5
};

const doneColumn: Column = {
  id: 'c-3',
  createdAt: Date.now(),
  title: '✅ انجام شده',
  status: 'DONE',
  tasks: []
};

const mainBoard: Board = {
  id: 'b-1',
  createdAt: Date.now(),
  name: 'پروژه توسعه وب',
  columns: [todoColumn, doingColumn, doneColumn],
  owner: 'حسین لطفی'
};

// ============================================
// 🧪 تست توابع
// ============================================

console.log('🧪 شروع تست توابع...\n');

// تست ۱: ساخت تسک جدید
const newTask: Task = createTask(
  'پیاده‌سازی سیستم نوتیفیکیشن',
  'HIGH',
  'استفاده از Web Push API',
  'سارا احمدی'
);
console.log('✅ تسک جدید ساخته شد:', newTask.title);
console.log('   ID:', newTask.id);
console.log('   وضعیت:', newTask.status);

// تست ۲: اعتبارسنجی تسک
console.log('\n🔍 تست اعتبارسنجی:');
console.log('   آیا تسک معتبر است؟', isValidTask(newTask));
console.log('   آیا عنوان خالی معتبر است؟', isValidTask({
  ...newTask,
  title: ''
}));

// تست ۳: اضافه کردن تسک به ستون
console.log('\n➕ اضافه کردن تسک به ستون:');
if (canAddTaskToColumn(todoColumn)) {
  const updatedColumn = addTaskToColumn(todoColumn, newTask);
  console.log('   ✅ تعداد تسک‌های ستون:', updatedColumn.tasks.length);
  mainBoard.columns[0] = updatedColumn;
}

// تست ۴: اضافه کردن چند تسک دیگر
const task2 = createTask('نوشتن تست‌های واحد', 'MEDIUM');
const task3 = createTask('مستندسازی API', 'LOW');
mainBoard.columns[0] = addTaskToColumn(mainBoard.columns[0], task2);
mainBoard.columns[0] = addTaskToColumn(mainBoard.columns[0], task3);

// تست ۵: جستجو
console.log('\n🔎 جستجو در تسک‌ها:');
const allTasks = getAllTasksFromBoard(mainBoard);
const searchResults = searchByTitle(allTasks, 'سیستم');
console.log('   نتایج جستجوی "سیستم":', searchResults.length);
searchResults.forEach(t => console.log('   -', t.title));

// تست ۶: فیلتر اولویت
console.log('\n🔥 فیلتر بر اساس اولویت:');
const highPriorityTasks = filterByPriority(allTasks, 'HIGH');
console.log('   تسک‌های HIGH:', highPriorityTasks.length);

// تست ۷: آمار
console.log('\n📊 آمار بورد:');
const summary = getBoardSummary(mainBoard);
console.log('   کل تسک‌ها:', summary.total);
console.log('   TODO:', summary.todo);
console.log('   DOING:', summary.doing);
console.log('   DONE:', summary.done);
console.log('   درصد پیشرفت:', `${summary.completionRate}%`);

const priorityStats = countByPriority(allTasks);
console.log('   آمار اولویت‌ها:', priorityStats);

// تست ۸: پیدا کردن تسک
console.log('\n🎯 پیدا کردن تسک:');
const found = findTaskInBoard(mainBoard, newTask.id);
if (found) {
  console.log('   ✅ تسک پیدا شد در ستون:', found.columnId);
  console.log('   عنوان:', found.task.title);
} else {
  console.log('   ❌ تسک پیدا نشد');
}