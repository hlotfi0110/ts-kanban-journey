import './style.css';
import type { Board } from './models';
import { renderBoard } from './ui';
import { initializeEventHandlers } from './eventHandlers';

// ============================================
// 🏗️ ساخت بورد اولیه
// ============================================

const initialBoard: Board = {
  id: 'board-1',
  createdAt: Date.now(),
  name: 'پروژه اصلی',
  owner: 'حسین لطفی',
  columns: [
    {
      id: 'col-1',
      createdAt: Date.now(),
      title: '📝 در انتظار انجام',
      status: 'TODO',
      tasks: [],
      maxTasks: 10
    },
    {
      id: 'col-2',
      createdAt: Date.now(),
      title: '⚙️ در حال انجام',
      status: 'DOING',
      tasks: [],
      maxTasks: 5
    },
    {
      id: 'col-3',
      createdAt: Date.now(),
      title: '✅ تکمیل شده',
      status: 'DONE',
      tasks: []
    }
  ]
};

// ============================================
// 🚀 راه‌اندازی اپلیکیشن
// ============================================

const initApp = (): void => {
  console.log('🚀 راه‌اندازی اپلیکیشن بورد کانبان');

  // رندر اولیه بورد
  renderBoard(initialBoard);

  // نصب Event Handler ها
  initializeEventHandlers(initialBoard);

  console.log('✅ اپلیکیشن آماده است!');
  console.log(`📊 تعداد ستون‌ها: ${initialBoard.columns.length}`);
};

// ============================================
// ⏱️ انتظار برای بارگذاری DOM
// ============================================

// بررسی آماده بودن DOM قبل از اجرا
if (document.readyState === 'loading') {
  // هنوز DOM لود نشده — صبر می‌کنیم
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM قبلاً لود شده — بلافاصله اجرا می‌کنیم
  initApp();
}