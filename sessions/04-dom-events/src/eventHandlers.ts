import type { Board, TaskPriority } from './models';
import { createTask, addTaskToColumn, removeTaskFromColumn } from './taskManager';
import { isValidTaskTitle } from './validators';
import { renderBoard, showMessage } from './ui';

// State محلی این ماژول
let currentBoard: Board;

/**
 * مقداردهی اولیه همه Event Handler ها
 */
export const initializeEventHandlers = (board: Board): void => {
  currentBoard = board;

  setupAddTaskHandler();
  setupDeleteTaskHandler();

  console.log('✅ Event Handler ها نصب شدند');
};

// ============================================
// ➕ افزودن تسک جدید
// ============================================

const setupAddTaskHandler = (): void => {
  // گرفتن عناصر با Type Assertion
  const addBtn = document.getElementById('addTaskBtn') as HTMLButtonElement | null;
  const titleInput = document.getElementById('taskTitle') as HTMLInputElement | null;
  const prioritySelect = document.getElementById('taskPriority') as HTMLSelectElement | null;

  // بررسی وجود همه عناصر
  if (!addBtn || !titleInput || !prioritySelect) {
    console.error('❌ یکی از عناصر فرم یافت نشد');
    return;
  }

  /**
   * Handler اصلی افزودن تسک
   */
  const handleAddTask = (): void => {
    const title = titleInput.value.trim();
    const priority = prioritySelect.value as TaskPriority;

    // اعتبارسنجی
    if (!isValidTaskTitle(title)) {
      showMessage('❌ عنوان تسک معتبر نیست! (۱ تا ۱۰۰ کاراکتر)', 'error');
      titleInput.focus();
      return;
    }

    // ساخت تسک جدید
    const newTask = createTask(title, priority);

    // اضافه کردن به اولین ستون (TODO)
    const todoColumn = currentBoard.columns[0];
    if (!todoColumn) {
      showMessage('❌ ستون TODO پیدا نشد!', 'error');
      return;
    }

    const updatedColumn = addTaskToColumn(todoColumn, newTask);
    currentBoard.columns[0] = updatedColumn;

    // رندر مجدد
    renderBoard(currentBoard);
    showMessage(`✅ تسک "${title}" اضافه شد`);

    // پاک کردن فرم
    titleInput.value = '';
    titleInput.focus();
  };

  // نصب Event Listener ها
  addBtn.addEventListener('click', handleAddTask);

  // Enter در input هم تسک را اضافه کند
  titleInput.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTask();
    }
  });
};

// ============================================
// 🗑️ حذف تسک با Event Delegation
// ============================================

const setupDeleteTaskHandler = (): void => {
  const boardColumns = document.getElementById('boardColumns');

  if (!boardColumns) {
    console.error('❌ عنصر #boardColumns یافت نشد');
    return;
  }

  // 🎯 Event Delegation — فقط یک listener برای همه تسک‌ها!
  boardColumns.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // آیا روی دکمه حذف کلیک شده؟
    if (!target.classList.contains('delete-btn')) {
      return;
    }

    // گرفتن taskId از data attribute
    const taskId = target.dataset.taskId;
    if (!taskId) {
      console.error('❌ data-task-id پیدا نشد');
      return;
    }

    // تایید از کاربر
    const confirmed = window.confirm('آیا مطمئن هستید که می‌خواهید این تسک را حذف کنید؟');
    if (!confirmed) return;

    // پیدا کردن ستون حاوی تسک و حذف آن
    let taskFound = false;
    for (let i = 0; i < currentBoard.columns.length; i++) {
      const column = currentBoard.columns[i];
      const taskExists = column.tasks.some(t => t.id === taskId);

      if (taskExists) {
        const updatedColumn = removeTaskFromColumn(column, taskId);
        currentBoard.columns[i] = updatedColumn;
        taskFound = true;
        break;
      }
    }

    if (taskFound) {
      renderBoard(currentBoard);
      showMessage('🗑️ تسک حذف شد');
    } else {
      showMessage('❌ تسک پیدا نشد!', 'error');
    }
  });
};

/**
 * گرفتن بورد فعلی (برای استفاده در ماژول‌های دیگر)
 */
export const getBoard = (): Board => currentBoard;

/**
 * به‌روزرسانی بورد (برای همگام‌سازی با Drag & Drop)
 */
export const setBoard = (board: Board): void => {
  currentBoard = board;
};