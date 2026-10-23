// 🎯 تعریف متغیرهای پایه بورد مدیریت تسک

const boardName: string = "Trello Clone Pro";
const version: number = 1.0;
let isBoardReady: boolean = false;

// 📋 ستون‌های اولیه بورد کانبان
const defaultColumns: string[] = [
  "📝 برای انجام (Todo)",
  "⚙️ در حال انجام (Doing)",
  "✅ انجام شده (Done)"
];

// 📊 متغیرهای آماری
let totalTasks: number = 0;
let completedTasks: number = 0;
let highPriorityCount: number = 0;

// 🏷️ تگ‌های موجود در سیستم
const availableTags: string[] = [
  "فوری",
  "باگ",
  "ویژگی جدید",
  "بهبود",
  "تست"
];

// 🚀 لاگ اولیه — شروع اپلیکیشن
console.log(`🚀 در حال راه‌اندازی ${boardName} v${version}...`);
console.log("📋 ستون‌های فعال:", defaultColumns);
console.log(`🏷️ ${availableTags.length} تگ در سیستم موجود است`);

// ⏳ شبیه‌سازی لودینگ اولیه
setTimeout(() => {
  isBoardReady = true;
  console.log("✅ بورد آماده استفاده است!");
  console.log(`📊 آمار فعلی: ${totalTasks} تسک، ${completedTasks} تکمیل‌شده`);
}, 2000);