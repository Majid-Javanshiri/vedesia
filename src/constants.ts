import { Phase } from './types';

export const PROJECT_DATA: Phase[] = [
  {
    id: 'phase-1',
    name: 'فاز ۱: اسناد و زیرساخت',
    nameEn: 'Phase 1: Documents & Infrastructure',
    description: 'ایجاد شالوده استراتژیک، فنی و هویتی برند VEDESIA برای کل پروژه مارکتینگ جهانی.',
    layers: [
      {
        id: 'p1-l1',
        name: 'اسناد پایه',
        description: 'تحلیل‌های ریشه‌ای، پوزیشنینگ و استقرار تیم اصلی.',
        tasks: [
          { 
            id: 't1', 
            level: 1, 
            title: 'تحلیل استراتژیک کلان و بینش‌های بازار جهانی (SWOT, PESTEL, Porter & Global Market Insights)', 
            status: 'completed',
            description: 'تحلیل جامع محیطی شامل بررسی عوامل سیاسی، اقتصادی، اجتماعی، تکنولوژیکی، زیست‌محیطی و قانونی بازار هدف به همراه تحلیل قوت‌ها، ضعف‌ها، فرصت‌ها و تهدیدهای برند در مقیاس جهانی.'
          },
          { 
            id: 't2', 
            level: 1, 
            title: 'تحقیقات بازار جهانی، شناسایی فرصت‌ها و استخراج اینسایت‌ها', 
            status: 'in-progress',
            description: 'مطالعه عمیق بازارهای جغرافیایی اروپا و کانادا، شناسایی نیازهای برآورده نشده مشتریان لوکس و تحلیل رفتار خرید در صنعت سطوح ساختمانی.'
          },
          { id: 't3', level: 1, title: 'تحلیل رقبا (Benchmark) در بازارهای هدف', status: 'pending', description: 'شناسایی و تحلیل عمیق رقبای کلیدی در بازارهای هدف (مانند برندهای پیشرو ایتالیایی و اسپانیایی) با تمرکز بر استراتژی قیمت‌گذاری، نوآوری‌های محصول و مدل‌های توزیع.' },
          { id: 't4', level: 1, title: 'تحلیل روندهای بازار (Trends & Insights)', status: 'pending', description: 'بررسی روندهای مدرن معماری، انتخاب رنگ‌های سال، متریال‌های نوظهور و ترجیحات مخاطبان لوکس در صنعت سرامیک برای همسویی با تقاضای آتی.' },
          { id: 't5', level: 1, title: 'جذب و استخدام تیم مارکتینگ جهانی', status: 'pending', description: 'تشکیل هسته مرکزی مارکتینگ شامل متخصصین برندینگ، ارتباطات دیجیتال و مدیران منطقه ای با تجربه در بازارهای بین المللی.' },
          { id: 't6', level: 1, title: 'سند استراتژی بازاریابی جهانی (Global Marketing Strategy)', status: 'pending', description: 'تدوین نقشه راه عملیاتی برای ورود به بازارهای جهانی، تعیین اهداف کوتاه‌مدت و بلندمدت و تخصیص بهینه بودجه در کانال‌های مختلف.' },
          { id: 't7', level: 1, title: 'سند پوزیشنینگ برند (Brand Positioning Framework)', status: 'pending' },
          { id: 't8', level: 1, title: 'سند نقشه سفر مشتری (End-to-End Customer Journey Mapping)', status: 'pending' },
          { id: 't9', level: 1, title: 'ماتریس پیام‌رسانی محصول (Product Messaging Matrix)', status: 'pending' },
          { id: 't10', level: 1, title: 'پیام کلیدی برند (Core Message)', status: 'pending' },
          { id: 't11', level: 1, title: 'Brand Book جامع (Visual & Verbal Identity)', status: 'pending' },
          { id: 't12', level: 1, title: 'دستورالعمل‌های بصری (Visual Guidelines)', status: 'pending' },
          { id: 't13', level: 1, title: 'لحن صدا (Tone of Voice)', status: 'pending' },
          { id: 't14', level: 1, title: 'دستورالعمل‌های رفتاری برند (Brand Behavior Guidelines)', status: 'pending' },
          { id: 't15', level: 1, title: 'سند سیستم CRM (قواعد، فرآیندها، سطوح دسترسی)', status: 'pending' },
          { id: 't16', level: 1, title: 'گواهینامه‌های VEDESIA (ISO, CE, Export Certs)', status: 'pending' },
          { id: 't17', level: 1, title: 'استانداردها — محصول، نصب، بسته‌بندی EU', status: 'pending' },
          { id: 't18', level: 1, title: 'استراتژی پروژه‌های بین‌المللی و ورود به Vendor Listهای صادراتی', status: 'pending' },
          { id: 't19', level: 1, title: 'اتحاد استراتژیک برند (Strategic Brand Alliance)', status: 'pending' },
          { id: 't20', level: 1, title: 'دستورالعمل‌های مرحله‌به‌مرحله فرآیندهای مارکتینگ SOP', status: 'pending' }
        ]
      },
      {
        id: 'p1-l2',
        name: 'زیرساخت فاز ۲',
        description: 'تکمیل ابزارهای فیزیکی، پلتفرم‌های دیجیتال، کاتالوگ‌ها و آمادگی عملیاتی.',
        tasks: [
          { id: 't21', level: 2, title: 'سند استراتژی بازاریابی (Marketing Strategy)', status: 'pending' },
          { id: 't22', level: 2, title: 'سند EPD (Environmental Product Declaration)', status: 'pending' },
          { id: 't23', level: 2, title: 'هندبوک فنی جامع سطوح، لعاب و پوشش (Glaze & Coating Specs)', status: 'pending' },
          { id: 't24', level: 2, title: 'اطلس ابعاد، فرمت‌ها و استانداردهای کالیبراسیون (Formats & Sizes)', status: 'pending' },
          { id: 't25', level: 2, title: 'استاندارد فنی بافت، بدنه و تکنولوژی قالب‌های اختصاصی', status: 'pending' },
          { id: 't26', level: 2, title: 'دستورالعمل جامع نصب فنی محصولات (نصب خشک/چسبی/EU)', status: 'pending' },
          { id: 't27', level: 2, title: 'دستورالعمل UX/UI (Digital Experience Design Guide)', status: 'pending' },
          { id: 't28', level: 2, title: 'سند راهنمای طراحی وب‌سایت (Web Design Guidelines)', status: 'pending' },
          { id: 't29', level: 2, title: 'دستورالعمل طراحی کاتالوگ‌های فنی و مستندات مهندسی', status: 'pending' },
          { id: 't30', level: 2, title: 'دستورالعمل بسته‌بندی صادراتی و لجستیک مارکتینگ (Packaging Guidelines)', status: 'pending' },
          { id: 't31', level: 2, title: 'سند ساختار نمایشگاهی (Exhibition Design Guide)', status: 'pending' },
          { id: 't32', level: 2, title: 'دستورالعمل طراحی نمونه‌ها و سمپل‌های فنی (Technical Samples)', status: 'pending' },
          { id: 't33', level: 2, title: 'هویت بصری منطقه‌ای (Regional Brand Adaptation)', status: 'pending' },
          { id: 't34', level: 2, title: 'طراحی Sales Kit (ابزارهای فیزیکی و دیجیتال تیم فروش)', status: 'pending' },
          { id: 't35', level: 2, title: 'سند فرآیندهای مدیریت لید (Lead Management Process)', status: 'pending' },
          { id: 't36', level: 2, title: 'سند همکاری و مدیریت پارتنرها (Partner Playbook)', status: 'pending' },
          { id: 't37', level: 2, title: 'پروتکل Concierge — خدمات ویژه VIP برای معماران تراز اول', status: 'pending' },
          { id: 't38', level: 2, title: 'اسکلت‌بندی — Heritage — مستندسازی فرآیند ساخت', status: 'pending' },
          { id: 't39', level: 2, title: 'پروژه عظیم مدل‌سازی 3D/CGI (جایگزین عکاسی برای کاتالوگ‌ها)', status: 'pending' },
          { id: 't40', level: 2, title: 'توسعه کتابخانه دیجیتال BIM & CAD برای معماران', status: 'pending' },
          { id: 't41', level: 2, title: 'لیست قیمت دیجیتال (۳ سطح: نمایندگی/پروژه/نهائی)', status: 'pending' },
          { id: 't42', level: 2, title: 'طراحی و تولید کیت‌های نمایندگی غیرانحصاری', status: 'pending' },
          { id: 't43', level: 2, title: 'طراحی و تولید کیت‌های نمایندگی خاص VEDESIA (تطابق با استاندارد)', status: 'pending' },
          { id: 't44', level: 2, title: 'سمپل‌بوک‌های فنی و کیت نمونه معماران (Architect Kits)', status: 'pending' },
          { id: 't45', level: 2, title: 'سامانه Smart Handling (ارسال هوشمند سمپل و کاتالوگ)', status: 'pending' },
          { id: 't46', level: 2, title: 'تولید کالیته‌های فیزیکی رنگ و بافت (Fan Deck/Swatch)', status: 'pending' },
          { id: 't47', level: 2, title: 'سامانه آموزش و تایید صلاحیت آنلاین نمایندگان (LMS)', status: 'pending' },
          { id: 't48', level: 2, title: 'طراحی ست اداری و ملزومات برندینگ داخلی', status: 'pending' },
          { id: 't49', level: 2, title: 'سیستم PIM/DAM (مدیریت متمرکز اطلاعات محصول و دارایی دیجیتال)', status: 'pending' },
          { id: 't50', level: 2, title: 'استقرار و پیکربندی سیستم CRM جهانی', status: 'pending' },
          { id: 't51', level: 2, title: 'انتخاب آژانس‌های تخصصی وب‌سایت', status: 'pending' },
          { id: 't52', level: 2, title: 'انتخاب آژانس تخصصی کاتالوگ', status: 'pending' },
          { id: 't53', level: 2, title: 'انتخاب آژانس تخصصی CGI', status: 'pending' },
          { id: 't54', level: 2, title: 'طراحی جریان‌های اتوماسیون مارکتینگ (Klaviyo)', status: 'pending' },
          { id: 't55', level: 2, title: 'ایمیل مارکتینگ — Klaviyo Setup', status: 'pending' },
          { id: 't56', level: 2, title: 'توسعه وب‌سایت vedesia.com (Digital Core)', status: 'pending' },
          { id: 't57', level: 2, title: 'محاسبه‌گر فنی آنلاین (Technical Calculator)', status: 'pending' },
          { id: 't58', level: 2, title: 'توسعه پیکربندی سه‌بعدی محصولات (3D Configurator Development)', status: 'pending' },
          { id: 't59', level: 2, title: 'زیرساخت فنی و محتوایی سئو (SEO Technical & Content Foundation)', status: 'pending' },
          { id: 't60', level: 2, title: 'بهینه‌سازی برای جستجوی هوش مصنوعی (AI Search Optimization - AEO/GEO)', status: 'pending' },
          { id: 't61', level: 2, title: 'تنظیمات پیشرفته GA4 و مدل‌سازی نسبت‌دهی (GA4 Advanced Setup & Attribution)', status: 'pending' },
          { id: 't62', level: 2, title: 'پورتال تعاملی معماران و مشتریان B2B', status: 'pending' },
          { id: 't63', level: 2, title: 'برنامه‌ریزی کمپین‌های دیجیتال مارکتینگ (Paid Media)', status: 'pending' },
          { id: 't64', level: 2, title: 'تولید ۱۰ مقاله تخصصی و White Papers فنی', status: 'pending' },
          { id: 't65', level: 2, title: 'خبرنامه تخصصی جامعه معماران جهانی', status: 'pending' },
          { id: 't66', level: 2, title: 'وبینارهای تخصصی معماران تراز اول', status: 'pending' },
          { id: 't67', level: 2, title: 'برنامه سفیران برند (Ambassador Program — با حضور ۱۰ معمار برتر)', status: 'pending' },
          { id: 't68', level: 2, title: 'تدوین نظام مدیریت عملیاتی و نمایشگاهی شوروم میلان', status: 'pending' },
          { id: 't69', level: 2, title: 'برنامه‌ریزی لجستیک مستقیم اروپا (Direct Logistics)', status: 'pending' },
          { id: 't70', level: 2, title: 'تجربه واقعیت مجازی و افزوده شوروم (Showroom AR/VR Experience)', status: 'pending' },
          { id: 't71', level: 2, title: 'شبکه‌های اجتماعی — مدیریت مداوم استراتژیک', status: 'pending' },
          { id: 't72', level: 2, title: 'قراردادها — تدوین Templateهای حقوقی کمپین', status: 'pending' },
          { id: 't73', level: 2, title: 'سیاست‌های تجاری (Return, Warranty, Privacy)', status: 'pending' },
          { id: 't74', level: 2, title: 'ترجمه تخصصی ایتالیایی تمام متون مارکتینگ', status: 'pending' },
          { id: 't75', level: 2, title: 'بسته‌بندی محصولات VEDESIA (۱۶ فاز کامل)', status: 'pending' },
          { id: 't76', level: 2, title: 'تولید Display Panelهای محصولات (۳۰ عدد)', status: 'pending' },
          { id: 't77', level: 2, title: 'توسعه واتس‌اپ بیزنس API جهانی', status: 'pending' },
          { id: 't78', level: 2, title: 'جعبه نمونه‌های لوکس تجربی ویژه (VIP Experience Sample Box)', status: 'pending' },
          { id: 't79', level: 2, title: 'تولید فیلم ۳ دقیقه‌ای داستان برند (Brand Story Video)', status: 'pending' },
          { id: 't80', level: 2, title: 'استاندارد سیستم‌های نورپردازی و AV شوروم میلان', status: 'pending' },
          { id: 't81', level: 2, title: 'کاتالوگ اصلی و داستان برند (Brand Profile & Story)', status: 'pending' },
          { id: 't82', level: 2, title: 'هندبوک جامع سطوح، لعاب و تکنولوژی‌ها (Technical Handbook)', status: 'pending' },
          { id: 't83', level: 2, title: 'کاتالوگ جامع کلکسیون‌ها و دسته‌بندی محصولات', status: 'pending' },
          { id: 't84', level: 2, title: 'کاتالوگ سبک‌محور و الهام‌بخش (Moodboard Catalog)', status: 'pending' },
          { id: 't85', level: 2, title: 'دفترچه جامع مشخصات فنی و مهندسی پروژه', status: 'pending' },
          { id: 't86', level: 2, title: 'عکاسی محصولات — پروژه ۵۰۰+ شات خروجی نهایی', status: 'pending' },
          { id: 't87', level: 2, title: 'پست‌پروداکشن و اصلاح رنگ کاتالوگ‌های فیزیکی', status: 'pending' },
          { id: 't88', level: 2, title: 'کاتالوگ Final با عکس‌های واقعی محصولات VEDESIA', status: 'pending' },
          { id: 't89', level: 2, title: 'چاپ کاتالوگ‌های سری اول (۵۵۰۰ نسخه لوکس)', status: 'pending' },
          { id: 't90', level: 2, title: 'برنامه آموزش و تایید صلاحیت نصاب‌های حرفه‌ای VEDESIA', status: 'pending' },
          { id: 't91', level: 2, title: 'لانچ داخلی برند — پایان رسمی زیرساخت‌های فاز ۱', status: 'pending' }
        ]
      },
      {
        id: 'p1-l3',
        name: 'زیرساخت فاز ۳',
        description: 'آماده‌سازی میلان برای رونمایی رسمی و کمپین‌های محیطی.',
        tasks: [
          { id: 't92', level: 3, title: 'سند استراتژی ارتباطات و روابط عمومی (PR Strategy)', status: 'pending' },
          { id: 't93', level: 3, title: 'استراتژی هوش مصنوعی در مارکتینگ (AI Powered)', status: 'pending' },
          { id: 't94', level: 3, title: 'نقشه راه جامع مارکتینگ بلندمدت', status: 'pending' },
          { id: 't95', level: 3, title: 'نقشه راه توسعه برند جهانی VEDESIA', status: 'pending' },
          { id: 't96', level: 3, title: 'برنامه‌ریزی کمپین‌های سالانه (Global Calendar)', status: 'pending' },
          { id: 't97', level: 3, title: 'سند اجرای کمپین‌های چندکاناله (Omni-channel)', status: 'pending' },
          { id: 't98', level: 3, title: 'سند پلتفرم‌های اتوماسیون (Automation Stack)', status: 'pending' },
          { id: 't99', level: 3, title: 'سند پیاده‌سازی پورتال‌ها و ابزارهای دیجیتال اختصاصی', status: 'pending' },
          { id: 't100', level: 3, title: 'استراتژی تولید محتوای ۳۶۰ درجه (Content Ecosystem)', status: 'pending' },
          { id: 't101', level: 3, title: 'راهنمای عمومی و ارتباطات رسانه‌ای (PR Playbook)', status: 'pending' },
          { id: 't102', level: 3, title: 'سند برنامه‌ریزی ایونت‌ها و رویدادهای فیزیکی', status: 'pending' },
          { id: 't103', level: 3, title: 'سند اجرای نمایشگاه‌های بین‌المللی لوکس', status: 'pending' },
          { id: 't104', level: 3, title: 'برنامه‌ریزی کمپین‌های دیجیتال مارکتینگ جهانی VEDESIA', status: 'pending' },
          { id: 't105', level: 3, title: 'تجربه حسی شوروم — استراتژی بو و موسیقی اختصاصی', status: 'pending' },
          { id: 't106', level: 3, title: 'زیرساخت روابط عمومی و رسانه‌ای بین‌المللی (Global PR Infrastructure)', status: 'pending' },
          { id: 't107', level: 3, title: 'آماده‌سازی محتوا پیش از لانچ رسمی میلان', status: 'pending' },
          { id: 't108', level: 3, title: 'پروژه ساخت و دکوراسیون فیزیکی شوروم میلان', status: 'pending' },
          { id: 't109', level: 3, title: 'Milan Showroom Museum — طراحی موزه داخلی', status: 'pending' },
          { id: 't110', level: 3, title: 'تجهیز سیستم‌های نورپردازی و AV هوشمند شوروم', status: 'pending' },
          { id: 't111', level: 3, title: 'نصب و راه‌اندازی کیوسک‌های دیجیتال لمسی لوکس', status: 'pending' },
          { id: 't112', level: 3, title: 'سامانه رزرواسیون آنلاین بازدید شوروم (Booking System)', status: 'pending' },
          { id: 't113', level: 3, title: 'کمپین بنرهای محیطی میلان و تبلیغات OOH گسترده', status: 'pending' },
          { id: 't114', level: 3, title: 'تولید ویدئوهای تخصصی محصول برای شوروم (۱۰ عدد)', status: 'pending' },
          { id: 't115', level: 3, title: 'تولید Reels اینستاگرام (سری اول ۲۰ عدد لوکس)', status: 'pending' },
          { id: 't116', level: 3, title: 'تدوین Sales Playbook اختصاصی نمایندگان جهانی', status: 'pending' },
          { id: 't117', level: 3, title: 'دستورالعمل عکاسی و فیلمبرداری برند (Guidelines)', status: 'pending' },
          { id: 't118', level: 3, title: 'طراحی تجربه کاربری فیزیکی شوروم (Showroom Experience)', status: 'pending' },
          { id: 't119', level: 3, title: 'انتخاب آژانس تولید محتوا و فیلمبرداری تبلیغاتی اروپا', status: 'pending' },
          { id: 't120', level: 3, title: 'آماده‌سازی دعوتنامه‌های VIP فیزیکی و دیجیتال (۵۰۰ نفر)', status: 'pending' },
          { id: 't121', level: 3, title: 'انتخاب آژانس روابط عمومی مستقر در ایتالیا', status: 'pending' },
          { id: 't122', level: 3, title: 'استخدام و Onboarding تیم اجرایی شوروم میلان', status: 'pending' }
        ]
      },
      {
        id: 'p1-l4',
        name: 'زیرساخت فاز ۴',
        description: 'هوش تجاری، استراتژی قیمت‌گذاری و توانمندسازی تیم فروش.',
        tasks: [
          { id: 't123', level: 4, title: 'سند استراتژی قیمت‌گذاری جهانی (Global Pricing)', status: 'pending' },
          { id: 't124', level: 4, title: 'استراتژی جایگاه‌سازی قیمتی در بازارهای هدف جهانی (اروپا، خاورمیانه و ...)', status: 'pending' },
          { id: 't125', level: 4, title: 'سند ابزارهای تحلیلی و داشبوردهای مارکتینگ (BI)', status: 'pending' },
          { id: 't126', level: 4, title: 'راهنمای مدیریت بحران برند (Crisis Manual)', status: 'pending' },
          { id: 't127', level: 4, title: 'سند مدیریت اعتبار و شهرت برند (Reputation)', status: 'pending' },
          { id: 't128', level: 4, title: 'سند تولید محتوا و بازاریابی مجله‌ای (Editorial)', status: 'pending' },
          { id: 't129', level: 4, title: 'سند تقویم محتوایی جهانی بلندمدت', status: 'pending' },
          { id: 't130', level: 4, title: 'سند مدیریت وظایف و فرآیندهای تیم مارکتینگ VEDESIA', status: 'pending' },
          { id: 't131', level: 4, title: 'نقشه راه توسعه محصول و نوآوری (Innovation)', status: 'pending' },
          { id: 't132', level: 4, title: 'سند گارانتی، نگهداری و خدمات پس از فروش (Care)', status: 'pending' },
          { id: 't133', level: 4, title: 'پروتکل نظارت بر پروژه‌های اجرایی جهانی VEDESIA', status: 'pending' },
          { id: 't134', level: 4, title: 'سند سطوح دسترسی و فرآیندهای مالی داخلی تیم', status: 'pending' },
          { id: 't135', level: 4, title: 'سند آموزش تیم فروش و توانمندسازی (Sales Enablement)', status: 'pending' },
          { id: 't136', level: 4, title: 'راهنمای جامع عملیاتی تیم — Marketing Playbook', status: 'pending' },
          { id: 't137', level: 4, title: 'اپلیکیشن ابزار تبلت برای فروش داخل شوروم (Clienteling)', status: 'pending' },
          { id: 't138', level: 4, title: 'اتصال سیستم‌های فروش به هسته مرکزی (ERP Integration)', status: 'pending' },
          { id: 't139', level: 4, title: 'توسعه داشبوردهای هوش تجاری (BI Dashboard)', status: 'pending' },
          { id: 't140', level: 4, title: 'طراحی برنامه رشد B2B و پارتنرهای استراتژیک', status: 'pending' },
          { id: 't141', level: 4, title: 'پلتفرم آنلاین خدمات پس از فروش (Global Support)', status: 'pending' },
          { id: 't142', level: 4, title: 'فرآیند وفادارسازی مشتریان (Customer Success)', status: 'pending' },
          { id: 't143', level: 4, title: 'پلتفرم مارکتینگ مبتنی بر هوش مصنوعی (AI Driven)', status: 'pending' },
          { id: 't144', level: 4, title: 'چت‌بات هوش مصنوعی پاسخگویی ۲۴ ساعته (AI Chat)', status: 'pending' },
          { id: 't145', level: 4, title: 'سیستم مدیریت دانش سازمانی VEDESIA (KM System)', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    name: 'فاز ۲: فعال‌سازی',
    nameEn: 'Phase 2: Market Activation',
    description: 'فعال‌سازی محدود و هدفمند کانال‌های اصلی با رویکرد پایلوت و تست فرآیندها.',
    layers: [
      {
        id: 'p2-l1',
        name: 'شبکه نمایندگان و معماران',
        description: 'تمرکز بر آنبوردینگ شبکه فروش و معماران کلیدی برای ایجاد زیرساخت انسانی VEDESIA.',
        tasks: [
          { id: 't147', level: 1, title: 'جمع‌آوری، پالایش و آنبوردینگ دیتابیس جامع هدف (نمایندگان، معماران و رسانه‌ها)', status: 'pending', description: 'ایجاد یک پایگاه داده غنی و طبقه‌بندی شده از پارتنرهای بالقوه، اینفلوئنسرهای معماری و رسانه‌های تخصصی برای آغاز کمپین‌های هدفمند.' },
          { id: 't148', level: 1, title: 'مراسم توجیه راهبردی نمایندگان منتخب (بازارهای هدف بین‌المللی)', status: 'pending', description: 'برگزاری ورکشاپ‌ها و جلسات توجیهی آنلاین و حضوری برای هم‌راستا کردن نمایندگان با ارزش‌های برند VEDESIA و استانداردهای فروش لوکس.' },
          { id: 't149', level: 1, title: 'برگزاری ارتباط با رسانه‌های بین‌المللی و منطقه‌ای', status: 'pending' },
          { id: 't150', level: 1, title: 'توزیع نسخه‌های چاپی کاتالوگ و Sales Kit نهایی به نمایندگان فعال‌شده', status: 'pending' },
          { id: 't151', level: 1, title: 'امضای قراردادهای همکاری استراتژیک با پارتنرهای جهانی', status: 'pending' },
          { id: 't152', level: 1, title: 'تعریف و اجرای پروژه‌های پایلوت (MVP) با معماران کلیدی و نمایندگان', status: 'pending' },
          { id: 't153', level: 1, title: 'ارسال VIP Sample Box برای معماران تراز اول در بازارهای هدف جهانی', status: 'pending' },
          { id: 't154', level: 1, title: 'میزبانی Factory Tours و بازدیدهای استراتژیک برای نمایندگان VIP و معماران', status: 'pending' }
        ]
      },
      {
        id: 'p2-l2',
        name: 'پیش‌نمایش‌های تخصصی',
        description: 'رویدادهای محدود برای منتقدان و شرکای تجاری تراز اول جهت تست نهایی کانسپت‌ها.',
        tasks: [
          { id: 't155', level: 2, title: 'پیش‌نمایش اختصاصی برای پارتنرهای تجاری جهانی', status: 'pending' },
          { id: 't156', level: 2, title: 'پیش‌نمایش معماران تراز اول (Architect Preview)', status: 'pending' },
          { id: 't157', level: 2, title: 'نشست خصوصی با اهالی رسانه و منتقدان لوکس', status: 'pending' },
          { id: 't158', level: 2, title: 'نمایش خصوصی برای پروژه‌های بزرگ جهانی (Global Key Projects)', status: 'pending' },
          { id: 't159', level: 2, title: 'جمع‌آوری و تحلیل بازخوردهای اولیه (Feedback Loop)', status: 'pending' }
        ]
      },
      {
        id: 'p2-l3',
        name: 'فیوریسالونه میلان',
        description: 'حضور استراتژیک در بزرگترین رویداد طراحی جهان برای تثبیت قدرت برند VEDESIA.',
        tasks: [
          { id: 't160', level: 3, title: 'ایونت اختصاصی Fuorisalone در هفته طراحی میلان', status: 'pending', description: 'طراحی و اجرای یک تجربه هنری-معماری منحصر به فرد در قلب منطقه طراحی میلان، همزمان با Fuorisalone برای نمایش قدرت خلاقانه برند.' },
          { id: 't160-a', level: 3, title: 'آماده‌سازی لوکیشن Fuorisalone و هماهنگی با تقویم رسمی رویدادهای هفته طراحی میلان', status: 'pending', description: 'انتخاب موقعیت استراتژیک، طراحی چیدمان هنری (Installation) و ثبت رویداد در تقویم‌های رسمی برای جذب مخاطبین تخصصی جهانی.' },
          { id: 't161', level: 3, title: 'رونمایی هنری از کانسپت‌ها و متریال‌های نوین VEDESIA', status: 'pending' },
          { id: 't162', level: 3, title: 'تعامل مستقیم با طراحان بین‌المللی با نفوذ در میلان', status: 'pending' },
          { id: 't163', level: 3, title: 'مستندسازی ویدئویی و تولید محتوا از رویداد Fuorisalone', status: 'pending' }
        ]
      },
      {
        id: 'p2-l4',
        name: 'عملیات لانچ نرم',
        description: 'تست عملیاتی تمام فرآیندهای فروش و لجستیک در مقیاس واقعی پیش از لانچ سراسری.',
        tasks: [
          { id: 't164', level: 4, title: 'تست عملیاتی فرآیند فروش و زنجیره تامین پارتنرهای جهانی', status: 'pending' },
          { id: 't165', level: 4, title: 'اجرای کمپین‌های دیجیتال مارکتینگ هدفمند VEDESIA', status: 'pending' },
          { id: 't166', level: 4, title: 'رونمایی آزمایشی و سافت‌لانچ (Soft Opening) شوروم میلان جهت تست نهایی کانسپت', status: 'pending' },
          { id: 't166-a', level: 4, title: 'ارزیابی نهایی آمادگی تیم فروش و پشتیبانی جهت عملیات سراسری', status: 'pending' },
          { id: 't166-b', level: 4, title: 'اصلاح نهایی مستندات و SOPها بر اساس فیدبک‌های مرحله پایلوت', status: 'pending' },
          { id: 't167', level: 4, title: 'تست فنی و عملیاتی وب‌سایت در مقیاس پایلوت بین‌المللی', status: 'pending' },
          { id: 't168', level: 4, title: 'ارسال دعوتنامه‌های نهائی VIP (RSVP System Setup)', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    name: 'فاز ۳: لانچ',
    nameEn: 'Phase 3: Brand & Showroom Launch',
    description: 'فعال‌سازی رسمی و سراسری برند VEDESIA با تمام قوا در بازارهای بین‌المللی.',
    layers: [
      {
        id: 'p3-l1',
        name: 'افتتاحیه و کمپین ۳۶۰',
        description: 'اجرای رویداد مرکزی در میلان همزمان با لانچ سراسری محصولات در بازارهای هدف.',
        tasks: [
          { id: 't169', level: 1, title: 'اجرای کمپین تبلیغاتی PR در سطح گسترده بین‌المللی (Global PR Campaign)', status: 'pending', description: 'انتشار اخبار لانچ در نشریات برتر دیزاین (مانند AD و Dezeen) و خبرگزاری‌های بیزنس برای ایجاد اعتبار جهانی پیش از افتتاحیه.' },
          { id: 't170', level: 1, title: 'مراسم باشکوه Grand Opening شوروم میلان (VEDESIA House)', status: 'pending', description: 'میزبانی یک رویداد منحصر به فرد با حضور چهره‌های شاخص معماری، پارتنرهای استراتژیک و رسانه‌های بین‌المللی در قلب میلان.' },
          { id: 't170-a', level: 1, title: 'استخراج اینسایت‌های اجرایی و رفتاری از افتتاحیه میلان جهت بهینه‌سازی فوری لانچ تورنتو (Milan-to-Toronto Knowledge Transfer)', status: 'pending' },
          { id: 't170-b', level: 1, title: 'عکاسی Grand Opening — مستندسازی کامل تصویری و ویدئویی', status: 'pending' },
          { id: 't171', level: 1, title: 'اجرای کمپین‌های تبلیظاتی ۳۶۰ درجه جهانی (Omni-channel)', status: 'pending' },
          { id: 't172', level: 1, title: 'بازگشایی رسمی شوروم‌های شبکه جهانی (میلان و تورنتو)', status: 'pending' },
          { id: 't173', level: 1, title: 'برگزاری رویدادهای محلی Launch در تمام کشورهای هدف', status: 'pending' },
          { id: 't174', level: 1, title: 'برگزاری کنفرانس‌های مطبوعاتی برای محصولات نوین VEDESIA', status: 'pending' },
          { id: 't175', level: 1, title: 'لانچ رسمی محصولات و کلکسیون‌های جدید VEDESIA', status: 'pending' },
          { id: 't176', level: 1, title: 'فعال‌سازی پلتفرم‌های تخصصی و باندهای رسانه‌ای معماری و طراحی', status: 'pending' }
        ]
      },
      {
        id: 'p3-l2',
        name: 'روابط عمومی و رسانه',
        description: 'مدیریت وجهه برند در رسانه‌های تراز اول طراحی و بیزنس جهانی.',
        tasks: [
          { id: 't177', level: 2, title: 'برگزاری ایونت‌های بزرگ Press Release بین‌المللی ×۳ (قبل·حین·بعد)', status: 'pending' },
          { id: 't178', level: 2, title: 'مصاحبه‌های رسانه‌ای استراتژیک تیم مدیریت VEDESIA', status: 'pending' },
          { id: 't179', level: 2, title: 'توزیع کیت رسانه‌ای (Press Kit) جامع جهانی', status: 'pending' },
          { id: 't180', level: 2, title: 'تحلیل پوشش رسانه‌ای و گزارش‌های PR (Monitoring)', status: 'pending' }
        ]
      },
      {
        id: 'p3-l3',
        name: 'پلتفرم‌های دیجیتال و آنلاین',
        description: 'بهره‌برداری کامل از زیرساخت‌های آنلاین برای جذب مخاطب انبوه.',
        tasks: [
          { id: 't181', level: 3, title: 'اجرای کمپین تیزر (Teaser) جهانی در تمام پلتفرم‌ها', status: 'pending' },
          { id: 't182', level: 3, title: 'کمپین رونمایی رسمی (Full Launch Campaign)', status: 'pending' },
          { id: 't183', level: 3, title: 'فعال‌سازی گسترده اینفلوئنسرهای تخصصی معماری و دیزاین', status: 'pending' },
          { id: 't184', level: 3, title: 'سند لانچ محصولات و کلکسیون‌های جدید در بازارهای دیجیتال', status: 'pending' },
          { id: 't185', level: 3, title: 'اتاق فرمان لانچ (Launch War Room) و پروتکل مدیریت بحران روز افتتاحیه', status: 'pending' },
          { id: 't185-a', level: 3, title: 'مرکز مانیتورینگ لحظه‌ای PR، لید و فروش (Real-time Launch Monitoring Center)', status: 'pending' },
          { id: 't186', level: 3, title: 'لانچ وب‌سایت اصلی و پورتال‌های تعاملی جدید (Global Digital Launch)', status: 'pending' },
          { id: 't187', level: 3, title: 'ارسال خبرنامه‌های لانچ برای دیتابیس ۵۰,۰۰۰ نفری معماران', status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    name: 'فاز ۴: شتاب‌دهی',
    nameEn: 'Phase 4: Scaling & Expansion',
    description: 'تحلیل داده‌های واقعی، پیاده‌سازی هوش تجاری و گسترش نهایی شبکه توزیع جهانی.',
    layers: [
      {
        id: 'p4-l1',
        name: 'شتاب‌دهی و وفادارسازی',
        description: 'بهینه‌سازی نرخ تبدیل و تبدیل خریداران اولیه به سفیران برند VEDESIA.',
        tasks: [
          { id: 't188', level: 1, title: 'تحلیل نرخ تبدیل (CRO) و بهینه‌سازی مسیرهای فروش', status: 'pending', description: 'بازنگری در قیف فروش بر اساس داده‌های واقعی لانچ و حذف موانع تجربه‌ی مشتری در فرآیند استعلام و سفارش در مقیاس جهانی.' },
          { id: 't189', level: 1, title: 'توسعه شبکه‌های توزیع و وفادارسازی پارتنرهای استراتژیک', status: 'pending', description: 'ارتقای سطح همکاری با نمایندگان برتر و معرفی برنامه‌های تشویقی رشد برای تضمین پایداری حضور VEDESIA در بازارهای جدید.' },
          { id: 't190', level: 1, title: 'طراحی و پیاده‌سازی باشگاه مشتریان لوکس (Loyalty Program)', status: 'pending' },
          { id: 't191', level: 1, title: 'بهبود مستمر تجربه مشتری (CX) بر اساس داده‌های BI', status: 'pending' },
          { id: 't192', level: 1, title: 'اجرای برنامه‌های مشوق فروش برای پارتنرهای برتر جهانی', status: 'pending' },
          { id: 't193', level: 1, title: 'تحلیل فصلی رفتار مشتریان و پروژه‌های شاخص VEDESIA', status: 'pending' },
          { id: 't194', level: 1, title: 'کمپین فروش ۳۶۰ درجه (High Season Campaigns)', status: 'pending' },
          { id: 't195', level: 1, title: 'پیگیری هوشمند لیدهای Grand Opening و تبدیل به فروش', status: 'pending' },
          { id: 't196', level: 1, title: 'ثبت اولین سفارشات حجیم در بازارهای نفوذ یافته اروپا', status: 'pending' },
          { id: 't197', level: 1, title: 'تقویم محتوایی پس از لانچ (Post-Launch Continuity)', status: 'pending' },
          { id: 't198', level: 1, title: 'نشست‌های صمیمانه با معماران شاخص (Architect Breakfast Series)', status: 'pending' }
        ]
      },
      {
        id: 'p4-l2',
        name: 'هوش تجاری و داده‌محوری',
        description: 'استخراج دانش از داده‌های بازار برای اتخاذ تصمیمات استراتژیک داده‌محور.',
        tasks: [
          { id: 't199', level: 2, title: 'استقرار نهایی Data Warehouse و تحلیل متمرکز فرآیندها', status: 'pending' },
          { id: 't200', level: 2, title: 'پیاده‌سازی مدل‌های RFM Segmentation و پیش‌بینی ریزش مشتری', status: 'pending' },
          { id: 't201', level: 2, title: 'توسعه مدل‌های Revenue Forecast بر پایه یادگیری ماشین', status: 'pending' },
          { id: 't202', level: 2, title: 'Competitive Monitoring Cell — پایش مداوم رقبا، قیمت و کمپین‌ها', status: 'pending' },
          { id: 't203', level: 2, title: 'توسعه سیستم مدیریت محتوای AI-Driven (خودکارسازی)', status: 'pending' },
          { id: 't204', level: 2, title: 'ارائه گزارش جامع سوددهی عملیات مارکتینگ دوره‌ای', status: 'pending' }
        ]
      },
      {
        id: 'p4-l3',
        name: 'توسعه و پایداری بازار',
        description: 'گسترش جغرافیایی و ورود به حوزه‌های نوین صنعت ساختمان و دکوراسیون.',
        tasks: [
          { id: 't206', level: 3, title: 'طراحی مشارکت در نمایشگاه Cersaie بولونیا ایتالیا', status: 'pending' },
          { id: 't207', level: 3, title: 'طراحی مشارکت در نمایشگاه Idéobain پاریس فرانسه', status: 'pending' },
          { id: 't208', level: 3, title: 'باشگاه مشتریان لوکس جهانی VEDESIA (Scale Up)', status: 'pending' },
          { id: 't209', level: 3, title: 'راه‌اندازی Pop-up Stores در لندن و دبی (توسعه بازار)', status: 'pending' },
          { id: 't210', level: 3, title: 'ورود به Vendor Listهای صادراتی و پروژه‌های بین‌المللی', status: 'pending' },
          { id: 't211', level: 3, title: 'افتتاح شوروم دوم اروپا و برنامه توسعه پس از موفقیت میلان', status: 'pending' },
          { id: 't212', level: 3, title: 'ارائه آموزش به مشتریان نهایی (انتخاب، نصب و نگهداری تخصصی)', status: 'pending' },
          { id: 't213', level: 3, title: 'نقشه راه توسعه محصولات پایدار و سبز VEDESIA (Sustainability)', status: 'pending' },
          { id: 't214', level: 3, title: 'سند لانچ شوروم‌های جدید در بازارهای ثانویه جهانی', status: 'pending' },
          { id: 't215', level: 3, title: 'گزارش نهایی بازگشت سرمایه مارکتینگ فاز اول رشد VEDESIA', status: 'pending' }
        ]
      }
    ]
  }
];
