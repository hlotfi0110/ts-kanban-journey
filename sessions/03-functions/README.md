# جلسه ۳ — توابع و تایپ‌گذاری پارامترها

## 🎯 آنچه در این جلسه یاد گرفتیم
- تایپ‌گذاری کامل پارامترها و Return Type در توابع
- Arrow Function vs Function Declaration
- پارامترهای اختیاری و مقدار پیش‌فرض
- Rest Parameters
- `void` و `never` برای توابع بدون خروجی
- Type Guards برای شناسایی نوع در زمان اجرا
- Function Type و Higher-Order Functions
- Pure Functions و Immutability

## 🧱 آنچه ساخته شد
- فایل `taskManager.ts` — توابع CRUD (createTask, addTaskToColumn, ...)
- فایل `taskFilters.ts` — فیلتر و جستجو (filterByPriority, searchByTitle, ...)
- فایل `validators.ts` — اعتبارسنجی (isValidTask, isValidEmail, ...)
- فایل `statistics.ts` — آمار و محاسبات (calculateProgress, countByPriority, ...)
- فایل `main.ts` — تست کامل همه توابع

## 🚀 اجرا
```bash
npm install
npm run dev
```

## 📸 خروجی
```
🧪 شروع تست توابع...
✅ تسک جدید ساخته شد: پیاده‌سازی سیستم نوتیفیکیشن
🔍 تست اعتبارسنجی:
   آیا تسک معتبر است؟ true
   آیا عنوان خالی معتبر است؟ false
➕ اضافه کردن تسک به ستون:
   ✅ تعداد تسک‌های ستون: 1
🔎 جستجو در تسک‌ها:
   نتایج جستجوی "سیستم": 1
   - پیاده‌سازی سیستم نوتیفیکیشن
🔥 فیلتر بر اساس اولویت:
   تسک‌های HIGH: 1
📊 آمار بورد:
   کل تسک‌ها: 3
   TODO: 3
   DOING: 0
   DONE: 0
   درصد پیشرفت: 0%
🎯 پیدا کردن تسک:
   ✅ تسک پیدا شد در ستون: c-1
```

## ⬅️ قبلی | ➡️ بعدی
[ JMP to previous session] | [ JMP to next session]