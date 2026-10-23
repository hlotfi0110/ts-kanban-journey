# جلسه ۲ — قراردادهای داده‌ای (Interfaces & Type Aliases)

## 🎯 آنچه در این جلسه یاد گرفتیم
- Interface و Type Alias برای تعریف ساختاری آبجکت‌ها
- Literal Types برای محدود کردن مقادیر
- فیلدهای اختیاری (?) و `readonly` برای قفل کردن داده‌ها
- ارث‌بری با `extends` (اصل DRY)
- Union Types و Intersection Types

## 🧱 آنچه ساخته شد
- فایل `models.ts` با مدل‌های Task، Column و Board
- داده‌های تستی (Mock Data) برای بورد کانبان
- توابع کمکی: calculateBoardStats, findTaskById, filterTasksByPriority و...

## 🚀 اجرا
```bash
npm install
npm run dev
```

## 📸 خروجی
```
🎯 بورد: پروژه توسعه وب‌سایت
👤 مالک: حسین لطفی
👥 اعضای تیم: علی رضایی، سارا احمدی، رضا محمدی
📊 تعداد ستون‌ها: 3
📝 تسک‌های TODO: 2
⚡ تسک‌های DOING: 1
✅ تسک‌های DONE: 1

--- 🧪 تست توابع ---
📈 آمار بورد: { totalTasks: 4, completedTasks: 1, ... }
🎯 درصد تکمیل: 25%
🔍 تسک پیدا شده: پیاده‌سازی سیستم احراز هویت
...
```

## ⬅️ قبلی | ➡️ بعدی
[ JMP to previous session] | [ JMP to next session]