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

## 🧱 آنچه ساخته شد
- فایل `index.html` — ساختار مدرن با RTL، فونت وزیرمتن، آمار زنده
- فایل `style.css` — طراحی Aurora Glassmorphism با darک مود و بافت نویز
- فایل `src/models.ts` — مدل‌های Task، Column، Board
- فایل `src/ui.ts` — توابع رندر (renderTask, renderColumn, renderBoard, updateStats, showMessage)
- فایل `src/eventHandlers.ts` — مدیریت رویدادها (افزودن، حذف با Event Delegation)
- فایل `src/main.ts` — اتصال همه ماژول‌ها و راه‌اندازی اپلیکیشن

## 🚀 اجرا
```bash
npm install
npm run dev
```

## 📸 خروجی
اپلیکیشن Kanban Board با طراحی مدرن و شیشه‌ای (Aurora Glassmorphism) در مرورگر اجرا می‌شود. شامل:
- هدر با آمار زنده (کل تسک‌ها، پیشرفت، در انتظار، تکمیل شده)
- فرم افزودن تسک با اعتبارسنجی
- سه ستون کانبان (برای انجام، در حال انجام، انجام شده)
- حذف تسک با Event Delegation
- دارک مود و تغییر تم
- Toast notifications برای پیام‌ها

## ⬅️ قبلی | ➡️ بعدی
[ JMP to previous session] | [ JMP to next session]