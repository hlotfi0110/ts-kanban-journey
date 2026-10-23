import type { Board, Column, Task } from './models';
import { getAllTasksFromBoard } from './taskFilters';
import { calculateProgress } from './statistics';

// ============================================
// 🛡️ ابزار امنیتی
// ============================================

/**
 * جلوگیری از حملات XSS با escape کردن کاراکترهای خطرناک
 */
const escapeHTML = (str: string): string => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

// ============================================
// 🎨 توابع رندر
// ============================================

/**
 * رندر یک تسک به صورت HTML
 */
export const renderTask = (task: Task): string => {
  const safeTitle = escapeHTML(task.title);
  const safeDescription = task.description ? escapeHTML(task.description) : '';
  const safeAssignee = task.assignee ? escapeHTML(task.assignee) : '';

  return `
    <div class="task-card" data-task-id="${task.id}" draggable="true">
      <div class="task-title">${safeTitle}</div>
      ${safeDescription ? `<div class="task-desc">${safeDescription}</div>` : ''}
      <div class="task-meta">
        <span class="priority-badge priority-${task.priority.toLowerCase()}">
          ${task.priority}
        </span>
        ${safeAssignee ? `<span class="assignee-tag">👤 ${safeAssignee}</span>` : ''}
      </div>
      <div class="task-actions">
        <button class="delete-btn" data-task-id="${task.id}">🗑️ حذف</button>
      </div>
    </div>
  `;
};

/**
 * رندر یک ستون به صورت HTML
 */
export const renderColumn = (column: Column): string => {
  const tasksHTML = column.tasks.length > 0
    ? column.tasks.map(task => renderTask(task)).join('')
    : '<div class="empty-state">هنوز تسکی اضافه نشده است</div>';

  return `
    <div class="column" data-column-id="${column.id}">
      <div class="column-header">
        <h2 class="column-title">${escapeHTML(column.title)}</h2>
        <span class="task-count">${column.tasks.length}</span>
      </div>
      <div class="tasks-container">
        ${tasksHTML}
      </div>
    </div>
  `;
};

/**
 * رندر کل بورد و به‌روزرسانی آمار
 */
export const renderBoard = (board: Board): void => {
  const columnsContainer = document.getElementById('boardColumns');
  
  // بررسی null — اگر ظرف وجود نداشت، کاری نکن
  if (!columnsContainer) {
    console.error('❌ عنصر #boardColumns در DOM پیدا نشد');
    return;
  }

  // رندر ستون‌ها
  const columnsHTML = board.columns.map(col => renderColumn(col)).join('');
  columnsContainer.innerHTML = columnsHTML;

  // به‌روزرسانی آمار
  updateStats(board);
};

/**
 * به‌روزرسانی آمار در هدر
 */
export const updateStats = (board: Board): void => {
  const allTasks = getAllTasksFromBoard(board);
  const totalTasks = allTasks.length;
  const progress = calculateProgress(board);
  const todoCount = allTasks.filter(t => t.status === 'TODO').length;
  const doneCount = allTasks.filter(t => t.status === 'DONE').length;

  const totalTasksEl = document.getElementById('totalTasks');
  const progressEl = document.getElementById('progress');
  const todoCountEl = document.getElementById('todoCount');
  const doneCountEl = document.getElementById('doneCount');

  // استفاده از Optional Chaining برای امنیت بیشتر
  if (totalTasksEl) {
    totalTasksEl.textContent = totalTasks.toLocaleString('fa-IR');
  }

  if (progressEl) {
    progressEl.textContent = `${progress.toLocaleString('fa-IR')}٪`;
  }

  if (todoCountEl) {
    todoCountEl.textContent = todoCount.toLocaleString('fa-IR');
  }

  if (doneCountEl) {
    doneCountEl.textContent = doneCount.toLocaleString('fa-IR');
  }
};

/**
 * نمایش Toast Notification
 */
export const showMessage = (
  message: string,
  type: 'success' | 'error' | 'warning' = 'success'
): void => {
  // ساخت عنصر پیام
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  // استایل اینلاین (در پروژه واقعی از CSS استفاده کنید)
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 24px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
    color: white;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);
    z-index: 9999;
    font-family: 'Vazirmatn', sans-serif;
    font-weight: 600;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(toast);

  // حذف بعد از ۳ ثانیه
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};