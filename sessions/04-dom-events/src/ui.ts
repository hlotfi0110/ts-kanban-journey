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

  // نقشه trạngتی در فارسی
  const statusLabels: Record<string, string> = {
    TODO: 'در انتظار انجام',
    DOING: 'در حال انجام',
    DONE: 'تکمیل شده',
  };

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
    : '<div class="empty-state">هنوز تسکی تعریف نشده است</div>';

  return `
    <div class="column" data-column-id="${column.id}">
      <div class="column-header">
        <h2 class="column-title">${escapeHTML(column.title)}</h2>
        <span class="task-count">${column.tasks.length} تسک</span>
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
  const doingCount = allTasks.filter(t => t.status === 'DOING').length;
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
 * نمایش Toast Notification — پیام‌های شما را به فارسی نمایش می‌دهد
 */
export const showMessage = (
  message: string,
  type: 'success' | 'error' | 'warning' = 'success'
): void => {
  // ساخت عنصر پیام
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  // استایل اینلاین
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 18px 28px;
    border-radius: 16px;
    color: white;
    font-weight: 700;
    font-size: 0.95rem;
    font-family: 'Vazirmatn', sans-serif;
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: toast-slide-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    direction: rtl;
  `;

  // رنگ بر اساس نوع پیام
  if (type === 'success') {
    toast.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(6, 182, 212, 0.95))';
    toast.style.boxShadow = '0 25px 55px rgba(16, 185, 129, 0.35), 0 0 45px rgba(16, 185, 129, 0.25)';
  } else if (type === 'error') {
    toast.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(236, 72, 153, 0.95))';
    toast.style.boxShadow = '0 25px 55px rgba(239, 68, 68, 0.35), 0 0 45px rgba(239, 68, 68, 0.25)';
  } else {
    toast.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(168, 85, 247, 0.95))';
    toast.style.boxShadow = '0 25px 55px rgba(245, 158, 11, 0.35), 0 0 45px rgba(168, 85, 247, 0.25)';
  }

  document.body.appendChild(toast);

  // حذف خودکار بعد از ۳ ثانیه
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.35s ease-out';
    setTimeout(() => toast.remove(), 350);
  }, 3000);
};