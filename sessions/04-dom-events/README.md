# جلسه ۴ — DOM و مدیریت رویدادها

## 🎯 آنچه در این جلسه یاد گرفتیم
- کار با DOM در TypeScript به صورت ایمن
- تایپ‌های DOM (HTMLInputElement, HTMLButtonElement, ...)
- مدیریت `null` (if, throw Error, non-null assertion, optional chaining)
- Type Assertion با `as`
- NodeListOf و HTMLCollectionOf
- تایپ‌های رویدادها (MouseEvent, KeyboardEvent, SubmitEvent)
- Event Delegation برای عناصر داینامیک
- data-* attributes و dataset
- Template Literals برای تولید HTML
- escapeHTML برای جلوگیری از XSS
- DOMContentLoaded برای تایمینگ اجرا
- طراحی مدرن با Aurora Glassmorphism

## 🧱 آنچه ساخته شد
- فایل `index.html` — ساختار مدرن با RTL، فونت وزیرمتن، آمار زنده
- فایل `style.css` — طراحی Aurora Glassmorphism با تم تاریک/روشن و بافت نویز
- فایل `src/models.ts` — مدل‌های Task، Column، Board
- فایل `src/ui.ts` — توابع رندر (renderTask, renderColumn, renderBoard, updateStats, showMessage)
- فایل `src/eventHandlers.ts` — مدیریت رویدادها (افزودن، حذف با Event Delegation)
- فایل `src/main.ts` — اتصال همه ماژول‌ها و راه‌اندازی اپلیکیشن
- فایل `src/taskManager.ts` — توابع CRUD (createTask, addTaskToColumn, removeTaskFromColumn, ...)
- فایل `src/taskFilters.ts` — فیلتر و جستجو (filterByStatus, filterByPriority, ...)
- فایل `src/validators.ts` — اعتبارسنجی (isValidTaskTitle, isValidTask, ...)
- فایل `src/statistics.ts` — آمار (calculateProgress, countByPriority, ...)

## 🚀 اجرا
```bash
npm install
npm run dev
```

## 📸 ویژگی‌های ظاهری
- پس‌زمینه Aurora با orb‌های شناور و افکت شведت
- کارت‌های شیشه‌ای (Glassmorphism) با backdrop-filter
- تم تاریک به‌صورت پیش‌فرض با قابلیت تغییر به روشن
- دکمه‌های نئون با انیمیشن درخشش
- کارت‌های تسک با افکت Hover شیک
- Toast notifications برای پیام‌های موفقیت و خطا
- کاملاً فارسی و راست‌چین (RTL)
- فونت وزیرمتن برای Typography مدرن
- ریسپانسیو با Container Queries

## ⬅️ قبلی | ➡️ بعدی
[ JMP to previous session] | [ JMP to next session]