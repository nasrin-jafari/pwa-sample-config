// 1.
// این خط فقط یک پیام هشدار در کنسول مرورگر نشان می‌دهد (فعلاً غیرفعال است)
// console.warn("sw file is public folder")
// 2.
// let cacheData = "appV1"
// this.addEventListener("install" , event =>{
//     event.waitUntil(
//         caches.open(cacheData).then(cache =>{
//             cache.addAll([
//                 "/static/js/main.chunk.js",  // فایل جاوااسکریپت اصلی برنامه
//                 "/static/js/0.chunk.js",     // فایل‌های جاوااسکریپت chunk شده (مثلاً فایل‌های مربوط به بخش‌های مختلف برنامه)
//                 "/static/js/bundle.js",      // فایل bundle جاوااسکریپت (شامل کل کدهای کامپایل شده)
//                 "/index.html",               // فایل اصلی HTML
//                 "/"
//             ])
//         })
//     )
// })
// this.addEventListener("fetch",event =>{
//     event.respondWith(
//         caches.match(event.request).then(resp => {
//             if(resp) {
//                 return resp
//             }
//         })
//     )
// })
// تعریف یک نام برای کش (این نام می‌تواند نسخه کش باشد، در اینجا "appV1" است)
let cacheData = "appV1"

// این قسمت، یک event listener برای رویداد نصب (install) تعریف می‌کند.
// زمانی که Service Worker نصب می‌شود، این کد اجرا می‌شود.
this.addEventListener("install", event => {
    // 1. event.waitUntil:
    // event.waitUntil() یک متد مخصوص در Service Worker است که
    // در طی رویدادهایی مثل install یا activate استفاده می‌شود. این متد به مرورگر می‌گوید که منتظر بماند تا
    // یک Promise کامل شود و تا زمانی که آن Promise به اتمام نرسیده است، از حالت نصب یا فعال شدن Service Worker جلوگیری می‌کند.

        // به زبان ساده‌تر:

        // وقتی که Service Worker در حال نصب است (در رویداد install)، ما از event.waitUntil() استفاده می‌کنیم
    // تا به مرورگر بگوییم که تا زمانی که عملیات کش کردن فایل‌ها کامل نشده است، نصب Service Worker به پایان نرسد.
    // نکته مهم: اگر Promise رد شود (Rejected شود)، نصب Service Worker شکست می‌خورد و ممکن است دوباره تلاش شود.
    // این متد تضمین می‌کند که تا زمانی که فایل‌های مورد نیاز شما به کش اضافه نشده‌اند، Service Worker نصب نشود.
    event.waitUntil(
        // باز کردن کش با استفاده از نام مشخص شده در cacheData (در اینجا "appV1")
        // یک Promise که باز شدن کش و اضافه کردن فایل‌ها به آن را مدیریت می‌کند
        // 2. caches.open(cacheData).then(cache => {...}):
    // caches.open(cacheData) متدی است که یک کش (cache) با نام مشخص شده (در اینجا appV1) باز می‌کند.
        // کش‌ها جایی هستند که مرورگر فایل‌ها (مثل HTML، CSS، JS و تصاویر)
        // را برای دسترسی سریع‌تر ذخیره می‌کند. اگر کش با این نام وجود نداشته باشد، مرورگر آن را ایجاد می‌کند.
        // این متد از Cache Storage API استفاده می‌کند تا یک کش با نام مشخص (cacheData) باز کند.
        // اگر این کش وجود نداشته باشد، مرورگر آن را ایجاد می‌کند.
        // نتیجه این عملیات یک Promise است که یک شیء cache را برمی‌گرداند (این شیء نماینده کش باز شده است).
    // then(cache => {...}):

    // وقتی کش با موفقیت باز شد، متد then اجرا می‌شود و ما می‌توانیم عملیات‌هایی روی کش انجام دهیم.
    //     در اینجا، متد cache.addAll([...]) استفاده شده است که تمامی فایل‌های لیست شده در آرایه را به کش اضافه می‌کند.
        caches.open(cacheData).then(cache => {
            // این Promise فقط زمانی کامل می‌شود که تمامی فایل‌ها به کش اضافه شده باشند
            // اضافه کردن فایل‌های مورد نظر به کش
            cache.addAll([
                "/static/js/main.chunk.js",  // فایل جاوااسکریپت اصلی برنامه
                "/static/js/0.chunk.js",     // فایل‌های جاوااسکریپت chunk شده (مثلاً فایل‌های مربوط به بخش‌های مختلف برنامه)
                "/static/js/bundle.js",      // فایل bundle جاوااسکریپت (شامل کل کدهای کامپایل شده)
                "/index.html",               // فایل اصلی HTML
                "/"             ,             // صفحه اصلی سایت
                "/Users" ,
                "/Home",
                "About"
            ])
        })
    )
})

// این قسمت، یک event listener برای رویداد fetch تعریف می‌کند.
// هر زمانی که مرورگر بخواهد یک درخواست به سرور ارسال کند (برای دریافت فایل‌ها)، این کد اجرا می‌شود.
this.addEventListener("fetch", event => {
    if(!navigator.onLine){
        // با استفاده از event.respondWith، ما پاسخ درخواست را دستکاری می‌کنیم.
        event.respondWith(
            // بررسی می‌کنیم که آیا درخواست در کش وجود دارد یا نه
            caches.match(event.request).then(resp => {
                // اگر فایل مورد درخواست در کش موجود باشد، آن را از کش برمی‌گردانیم
                if (resp) {
                    return resp; // برگرداندن پاسخ از کش (بدون نیاز به درخواست از سرور)
                }
                let requestUrl  = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
})
