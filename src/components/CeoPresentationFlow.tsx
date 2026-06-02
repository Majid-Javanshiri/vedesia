import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Users, 
  Sparkles, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  Video,
  FileSpreadsheet,
  ArrowRightLeft,
  BookOpen,
  Settings,
  Share2,
  Megaphone,
  Percent,
  Clock,
  Eye,
  Activity,
  Zap,
  Globe,
  Database,
  Lock,
  Unlock
} from 'lucide-react';

interface CeoPresentationFlowProps {
  t: (fa: string, en: string) => string;
  lang: 'fa' | 'en';
}

export default function CeoPresentationFlow({ t, lang }: CeoPresentationFlowProps) {
  const [activeStep, setActiveStep] = useState<number>(-1); // -1 = idle
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // Custom states for sequential reveal presentations (Managers View)
  const [presentationMode, setPresentationMode] = useState<'stepwise' | 'full'>('stepwise');
  const [revealLimit, setRevealLimit] = useState<number>(0);
  
  // Interactive War Room Panel States
  const [isWarRoomOpen, setIsWarRoomOpen] = useState<boolean>(true); // start open for maximum wow factor!
  const [showroomQuality, setShowroomQuality] = useState<number>(94);
  const [humanRelationsScore, setHumanRelationsScore] = useState<number>(91);
  const [digitalLeadsSpeed, setDigitalLeadsSpeed] = useState<number>(24);
  const [salesTakeoffRate, setSalesTakeoffRate] = useState<number>(81);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  
  // Simulated telemetry log line feeds
  const [warRoomLogs, setWarRoomLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const [selectedElement, setSelectedElement] = useState<{
    phaseId: number;
    layerId?: number;
    titleFa: string;
    titleEn: string;
    descFa: string;
    descEn: string;
  } | null>({
    phaseId: 3,
    layerId: 3,
    titleFa: 'اتاق جنگ همگرایی و کنترل لیدهای دیجیتال فاز ۳',
    titleEn: 'Phase 3 - Layer 3: Strategic War Room & Digital Leads Integration',
    descFa: 'اتاق فرمان مرکزی که در آن سه لایه هم‌راستا به‌طور زنده رصد، مداخله و یکپارچه می‌گردند: ۱. تجربه اتمسفر شوروم و برند، ۲. روابط صمیمی انسانی و توسعه مفاهمه، ۳. هدایت تمام‌عیار لیدهای ورودی از درگاه تبلیغات ۱۰۰٪ دیجیتال (بدون اتلاف بودجه در تبلیغات سنتی غیردیجیتال).',
    descEn: 'The control center for Vedesia performance. Dynamically coordinates showroom sensory scores, VIP private architect outreach (human relations), and real-time digital lead acquisition. In line with strict strategic discipline, Vedesia avoids unmeasurable traditional offline ads, focusing 100% on high-yield digital channels.'
  });

  // Group definitions for Phase 2 co-testing
  const p2Groups = [
    { id: 'agent', fa: 'نماینده', en: 'Dealers/Agents', icon: Users, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { id: 'architect', fa: 'معمار', en: 'Architects', icon: Compass, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
    { id: 'media', fa: 'رسانه', en: 'Media Representatives', icon: Video, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { id: 'project', fa: 'پروژه', en: 'Project Leads', icon: FileSpreadsheet, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
  ];

  // Steps definition for autoplay sequence corresponding to sequential steps top-to-bottom
  const animationSteps = [
    { type: 'p1-l1', id: 1, label: t('فاز ۱ - لایه ۱: اسناد استراتژیک پایه', 'Phase 1 - Layer 1: Strategic Foundations') },
    { type: 'p1-l2', id: 1, label: t('فاز ۱ - لایه ۲: زیرساخت نمایندگان B2B و معماران', 'Phase 1 - Layer 2: B2B Infrastructure') },
    { type: 'p1-milestone', id: 1, label: t('عطف استراتژیک: برگزاری لانچ داخلی تستی فورتکس ویژه پرسنل', 'Strategic Milestone: Vortex Internal Team Technical Launch') },
    { type: 'p1-l3', id: 1, label: t('فاز ۱ - لایه ۳: زیرساخت شوروم و رسانه', 'Phase 1 - Layer 3: Showroom Infrastructure') },
    { type: 'p1-l4', id: 1, label: t('فاز ۱ - لایه ۴: زیرساخت فروش و شتابدهی', 'Phase 1 - Layer 4: Sales Infrastructure') },
    
    { type: 'p2-l1', id: 2, label: t('فاز ۲ - لایه ۱: شبکه نمایندگان و معماران', 'Phase 2 - Layer 1: Agents & Architects Network') },
    { type: 'p2-l2', id: 2, label: t('فاز ۲ - لایه ۲: پیش‌نمایش‌های تخصصی', 'Phase 2 - Layer 2: Specialist Previews') },
    { type: 'p2-l3', id: 2, label: t('فاز ۲ - لایه ۳: ایونت اختصاصی Fuorisalone (هفته طراحی میلان)', 'Phase 2 - Layer 3: Fuorisalone Exclusive Event') },
    { type: 'p2-l4', id: 2, label: t('فاز ۲ - لایه ۴: عملیات لانچ نرم', 'Phase 2 - Layer 4: Soft Launch Operations') },
    
    { type: 'p3-l1', id: 3, label: t('فاز ۳ - لایه ۱: تجربه برند و شوروم مشتری عمومی و سراسری', 'Phase 3 - Layer 1: General Public & Showroom Experience') },
    { type: 'p3-l2', id: 3, label: t('فاز ۳ - لایه ۲: روابط عمومی (PR) و مفاهمه مستمر انسانی', 'Phase 3 - Layer 2: Targeted Human Relations & PR') },
    { type: 'p3-l3', id: 3, label: t('فاز ۳ - لایه ۳: اتاق جنگ لیدهای دیجیتال و همگرایی', 'Phase 3 - Layer 3: Strategic War Room Panel') },
    
    { type: 'p4-l1', id: 4, label: t('فاز ۴ - لایه ۱: شتاب‌دهی فروش و تیک‌آف تجاری هلدینگ', 'Phase 4 - Layer 1: Sales Take-off') },
    { type: 'p4-milestone', id: 4, label: t('نمایشگاه بین‌المللی: زیرپروژه سالن دل موبیله میلان (لانچ جهانی)', 'World Launch: Milan Salone del Mobile Exhibition') },
    { type: 'p4-l2', id: 4, label: t('فاز ۴ - لایه ۲: هوش تجاری و هوشمندسازی همه جانبه با کورتکس', 'Phase 4 - Layer 2: Unified BI & Analytics') },
    { type: 'p4-l3', id: 4, label: t('فاز ۴ - لایه ۳: توسعه مداوم بازار و محصول جدید', 'Phase 4 - Layer 3: Continuous Product Scaling') }
  ];

  // Pools for generating random authentic log feeds in Persian and English based on the three layers
  const faLogPool = [
    "سیستم مانیتورینگ: یک لید فوق‌العاده باارزش از کمپین اینستاگرام آرشیتکت‌های لوکس لواسان تهران دریافت شد.",
    "سنسور رایحه شوروم: خروجی غلظت عطر اختصاصی بر اساس ازدحام و سناریوی حسی روی لایه ۳ تنظیم شد.",
    "روابط عمومی: قرار ملاقات حضوری با شرکت مهندسی ساخت ساز دبی هماهنگ شد.",
    "کمپین هدفمند دیجیتال: نرخ کلیک روی کاتالوگ‌های BIM برای آرشیتکت‌ها از مرز ۴.۸٪ گذشت.",
    "سیستم مفاهمه: بازخورد رضایت نمایندگان شیراز از سیستم زنجیره تأمین ثبت شد (۹۷٪).",
    "اتاق جنگ: جریان هم‌افزایی لیدهای ورودی دیجیتال و ظرفیت رزرو شوروم متعادل شد.",
    "گزارش زنده: ۳ طراح برتر معماری تهران کلاینت بلیت اختصاصی بازدید خصوصی فردا را تایید کردند.",
    "کمپین اینستاگرام: لید جدید سازنده هتل‌های VIP شمال ثبت شد.",
    "مفاهمه انسانی: فرآیند دیپلماسی تجاری برای جذب ۲۰ دیلر لوکس تراز اول کشور آغاز پایش گردید.",
    "لید دیجیتال: ۵ تقاضای مشاوره اختصاصی چیدمان بلوک‌های کوبوگو میلان از وبسایت بومی‌سازی شده کورتکس استخراج شد.",
    "کنترل فضا: نور سرد نمایش پانل‌های کوبوگو بر اساس لوکس نوری گام ۲ اصلاح حسی شد."
  ];

  const enLogPool = [
    "Telemetry System: High-value lead recorded from target Instagram campaign for VIP Architects.",
    "Scent IoT Sensor: Premium ambient scent concentration adjusted dynamically based on footfall.",
    "Human Relations: VIP private meeting confirmed with leading Dubai-based construction group.",
    "Targeted Digital Ads: CTR for BIM architectural catalog downloads reached an outstanding 4.8%.",
    "Feedback Tracker: Agent satisfaction rate from Isfahan distribution team uploaded (97%).",
    "War Room Console: Balanced incoming marketing leads with Milan showroom private booking slots.",
    "Live Update: 3 prominent architectural studio directors confirmed private viewings for tomorrow.",
    "Instagram VIP Ads: Hot lead captured from luxury boutique developer.",
    "Core Synergy: Active digital ad budgets dynamically fine-tuned toward high-intent geography nodes.",
    "Luxury Check: Real-time air quality & thermal acoustics of the VIP launch salon logged inside strict guidelines."
  ];

  // Initialize logs on mount
  useEffect(() => {
    const initLogs = Array.from({ length: 5 }).map((_, i) => {
      return lang === 'fa' 
        ? faLogPool[i % faLogPool.length] 
        : enLogPool[i % enLogPool.length];
    });
    setWarRoomLogs(initLogs);
  }, [lang]);

  // Telemetry log feeds generator when War Room is active
  useEffect(() => {
    if (!isWarRoomOpen) return;
    const interval = setInterval(() => {
      const isEnglish = lang === 'en';
      const randomLog = isEnglish 
        ? enLogPool[Math.floor(Math.random() * enLogPool.length)]
        : faLogPool[Math.floor(Math.random() * faLogPool.length)];
      
      setWarRoomLogs(prev => {
        const next = [...prev, `[${new Date().toLocaleTimeString()}] ${randomLog}`];
        if (next.length > 20) next.shift(); // limit logs
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isWarRoomOpen, lang]);

  // Keep logs scrolled down
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [warRoomLogs]);

  // Content for presentation cards when selected
  const showDetail = (phaseId: number, layerId?: number) => {
    if (phaseId === 1) {
      if (layerId === 1) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۱ - لایه ۱: اسناد استراتژیک پایه',
          titleEn: 'Phase 1 - Layer 1: Strategic Foundations',
          descFa: 'این لایه نقطه صفر و مرجع مکتوب هولدینگ است. شامل تدوین دقیق برندبوک فنی، منشور استراتژیک شرکت، استانداردهای اجرایی ابنیه با الهام از اصول معماری معاصر، و مستندات مفاهمه برای کلیه فرآیندها.',
          descEn: 'The operational reference point of Vedesia. Includes the formal brand book, core technical catalogs, strategic manifesto, architectural compliance guidelines, and system SOPs.'
        });
      } else if (layerId === 2) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۱ - لایه ۲: زیرساخت نمایندگان B2B و معماران',
          titleEn: 'Phase 1 - Layer 2: B2B Infrastructure',
          descFa: 'برای اجرای تست‌های فاز دوم، تمامی زیربناهای مربوطه شامل ساخت فرم‌های ارزیابی فنی تخصصی، آماده‌سازی کاتالوگ‌های ویژه معماران و دیلرها، طراحی فیزیکی جعبه‌آزمون‌های متریال بلوک‌های کوبوگو و پلتفرم دریافت لوکال نظرات تدارک دیده می‌شوند.',
          descEn: 'Developing all necessary tools, B2B surveyor kits, testing logs, and physical test swatch boxes required for isolated and synergistic trials in Phase 2.'
        });
      } else if (layerId === 99) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'عطف استراتژیک: برگزاری لانچ داخلی تستی فورتکس ویژه پرسنل',
          titleEn: 'Strategic Milestone: Vortex Internal Team Technical Launch',
          descFa: 'اجرای سناریوی آزمایشی بر روی سیستم‌ها و فرآیندهای گوناگون توسط کادر داخلی شرکت، شبیه‌سازی ورود مشتری، فعال‌سازی کورتکس و تست سنسورهای تعبیه شده.',
          descEn: 'Dry-run of showroom systems and internal team protocols, validating custom database inputs, sensor triggers, and technical layout maps.'
        });
      } else if (layerId === 3) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۱ - لایه ۳: زیرساخت شوروم و رسانه',
          titleEn: 'Phase 1 - Layer 3: Showroom & Media Foundational Infrastructure',
          descFa: 'طراحی و ساخت سخت‌افزارها، مبلمان حسی فرودگاهی، سیستم‌های نورپردازی کنترل‌شده هوشمند بر بستر آردوینو/رپزبری و ستاپ‌های اختصاصی تصویربرداری تبلیغاتی از پانل‌های کوبوگوی به کار رفته در شوروم.',
          descEn: 'Establishing the critical staging grounds and media sets. Building Arduino-controlled lighting boards, acoustic isolation structures, and bespoke premium hardware backbones.'
        });
      } else if (layerId === 4) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۱ - لایه ۴: زیرساخت فروش و شتابدهی',
          titleEn: 'Phase 1 - Layer 4: Sales Infrastructure',
          descFa: 'پیاده‌سازی پرتال نمایندگان برای سفارش‌گیری خودکار، استقرار پایگاه‌های داده CRM، یکپارچه‌سازی درگاه‌های پرداخت، و فعال‌سازی اولیه سیستم‌های رصد دیجیتال کانال‌های جذب لید.',
          descEn: 'Setting up sales automation portals, compiling corporate CRM schemes, and integrating API hubs to track incoming target lead interactions.'
        });
      }
    } else if (phaseId === 2) {
      if (layerId === 1) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۲ - لایه ۱: شبکه نمایندگان و معماران',
          titleEn: 'Phase 2 - Layer 1: Agents & Architects Network',
          descFa: 'در این گام، تمرکز بر روی شناسایی، آنبوردینگ و توسعه شبکه نمایندگان تجاری و طراحان/معماران کلیدی بین‌المللی است تا سنگ بنای ارتباطات فیزیکی و تجاری به صورت کنترل شده بنیاد گذاشته شود.',
          descEn: 'Focusing on the discovery, onboarding, and development of agents and key architect networks to establish initial controlled relationships.'
        });
      } else if (layerId === 2) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۲ - لایه ۲: پیش‌نمایش‌های تخصصی',
          titleEn: 'Phase 2 - Layer 2: Specialist Previews',
          descFa: 'برگزاری پیش‌نمایش‌های اختصاصی و محدود برای منتقدان، پارتنرهای تجاری درجه یک و طراحان برگزیده به منظور ارزیابی کارایی کانسپت‌ها و بهینه‌سازی نقاط تماس پیش از شروع همایش‌های گسترده.',
          descEn: 'Exclusive small-scale preview events for commercial partners and elite designers to validate operational readiness ahead of massive public launches.'
        });
      } else if (layerId === 3) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۲ - لایه ۳: ایونت اختصاصی Fuorisalone (هفته طراحی میلان)',
          titleEn: 'Phase 2 - Layer 3: Fuorisalone Exclusive Event',
          descFa: 'رویداد ویژه و اثرگذار در بطن هفته طراحی میلان (Fuorisalone) جهت پرده‌برداری رسمی از متریال‌ها، تلفیق هنر و معماری و جلب توجه کامل جامعه خلاق بین‌المللی.',
          descEn: 'Staging high-impact VIP receptions and installation launches during Milan Design Week to build international design community prestige.'
        });
      } else if (layerId === 4) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۲ - لایه ۴: عملیات لانچ نرم',
          titleEn: 'Phase 2 - Layer 4: Soft Launch Operations',
          descFa: 'شروع آزمایشی جریان کاری فروش، زیرساخت انبارداری، فرآیندهای لجستیک و تبادل مالی با اهداف کنترل‌شده تبیین‌شده جهت مانیتورینگ عملکرد پاسخ‌دهی سیستم‌ها.',
          descEn: 'Piloting actual trade-flow fulfillment pipelines, stock verification systems, and financial ledger processes across initial friendly accounts.'
        });
      }
    } else if (phaseId === 3) {
      if (layerId === 1) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۳ - لایه ۱: تجربه برند و شوروم مشتری عمومی و سراسری',
          titleEn: 'Phase 3 - Layer 1: General Public & Showroom Experience',
          descFa: 'افتتاح رسمی و عمومی شوروم پرچم‌دار برند ودزیا برای پذیرش آرشیتکت‌های طراز اول و سازندگان شاخص. خلق کمال سناریوی خرید مانیفست و فیزیکی برند Vedesia و استقبال بی‌بدیل از مشتریان لوکس‌پسند.',
          descEn: 'The flagship showroom opens fully to high-net-worth individuals, elite global buyers, and prime construction executives, introducing them to an unprecedented physical and sensory luxury buyer journey.'
        });
      } else if (layerId === 2) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۳ - لایه ۲: روابط عمومی (PR) و مفاهمه مستمر انسانی',
          titleEn: 'Phase 3 - Layer 2: Targeted Strategic Human Relations & High-Tier PR',
          descFa: 'توسعه ارتباطات عمیق انسانی و نشست‌های دیپلماتیک با معماران طراز اول، دیلرهای کلیدی و رهبران نوآوری به جای تکیه بر ابزارهای سرد تبلیغات سنتی. خلق روابط گرم مفاهمه.',
          descEn: 'Forging genuine human and personal networks with top-tier architects, major developers, and design firms, bypassing impersonal broad ads for relationship-centric brand loyalty.'
        });
      } else if (layerId === 3) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۳ - لایه ۳: اتاق جنگ همگرایی و کنترل لیدهای دیجیتال فاز ۳',
          titleEn: 'Phase 3 - Layer 3: Strategic War Room & Digital Leads Integration',
          descFa: 'اتاق فرمان مرکزی که در آن سه لایه هم‌راستا به‌طور زنده رصد، مداخله و یکپارچه می‌گردند: ۱. تجربه اتمسفر شوروم و برند، ۲. روابط صمیمی انسانی و توسعه مفاهمه، ۳. هدایت تمام‌عیار لیدهای ورودی از درگاه تبلیغات ۱۰۰٪ دیجیتال (بدون اتلاف بودجه در تبلیغات سنتی غیردیجیتال).',
          descEn: 'The control center for Vedesia performance. Dynamically coordinates showroom sensory scores, VIP private architect outreach (human relations), and real-time digital lead acquisition. In line with strict strategic discipline, Vedesia avoids unmeasurable traditional offline ads, focusing 100% on high-yield digital channels.'
        });
      }
    } else if (phaseId === 4) {
      if (layerId === 1) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۴ - لایه ۱: شتاب‌دهی فروش و تیک‌آف تجاری هلدینگ',
          titleEn: 'Phase 4 - Layer 1: Strategic Sales Acceleration',
          descFa: 'سرازیر شدن قراردادهای فروش به لطف سیستم کارای برند شونده. بهینه‌سازی دیسپچ بلوک‌های کوبوگو در انبار بر مبنای سفارشات قطعی، رشد تصاعدی نمایندگی‌ها در شهرستان‌ها و تسریع در گردش جریان نقدینگی کلان.',
          descEn: 'Maximizing the enterprise engine: real transaction volume rises rapidly, driven by automated lead handoffs, highly scalable dealer onboarding toolkits, and dynamic pipeline acceleration strategies.'
        });
      } else if (layerId === 99) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'نمایشگاه بین‌المللی: زیرپروژه سالن دل موبیله میلان (لانچ جهانی)',
          titleEn: 'International Exhibition: Milan Salone del Mobile (Global Launch)',
          descFa: 'حضور به عنوان برند جهانی لوکس Vedesia در نمایشگاه سالن دل‌موبیله میلان. رونمایی رسمی از کلکسیون نوین بلوک‌های کوبوگوی پرسلانی با بدنه صلصال شنی در قطب اول دیزاین جهان و جذب کلیدی‌ترین پروژه‌ها و معماران بین‌المللی.',
          descEn: 'Representing Vedesia on the premier world stage. Showcasing the full luxury range of custom porcelain Cobogo panels directly in Milan, securing direct international architect accounts and high-value project leads.'
        });
      } else if (layerId === 2) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۴ - لایه ۲: هوش تجاری (BI) و هوشمندسازی همه‌جانبه فرآیندها',
          titleEn: 'Phase 4 - Layer 2: Business Intelligence & Data Cortex',
          descFa: 'تحلیل عمیق تلمتری شوروم‌ها مجهز به دوربین ترافیک‌سنج حرارتی، تحلیل سلیقه آرشیتکت‌ها روی مانیتورها، اتصال خودکار اطلاعات دیلرها به سیستم تولید در ایران جهت موازنه اقتصادی کامل عرضه و تقاضا.',
          descEn: 'Connecting physical showroom thermal cameras, product-touch metrics, and dealer portal transactions directly to the production facilities to dynamically adjust manufacturing outputs and margins.'
        });
      } else if (layerId === 3) {
        setSelectedElement({
          phaseId,
          layerId,
          titleFa: 'فاز ۴ - لایه ۳: توسعه مداوم بازار و فرمولاسیون محصولات جدید',
          titleEn: 'Phase 4 - Layer 3: Persistent Product & Market Expansion',
          descFa: 'یادگیری‌های استخراج‌شده بازار تبدیل به نوآوری‌های مکرر بخش تحقیق و توسعه (R&D) می‌شوند: خلق بلوک‌های نوین کوبوگو متناسب با سلیقه روز معماران، افزودن فرمت‌ها و متریال‌های ابداعی و تسخیر بازارهای نوظهور منطقه.',
          descEn: 'Iterative design loops where database intelligence feeds direct back into R&D: engineering next-generation porcelain profiles, releasing custom formats, and entering international territorial frontiers.'
        });
      }
    }
  };

  const isLayerActive = (phaseId: number, layerId: number) => {
    if (activeStep === -1) return false;
    return animationSteps[activeStep].type === `p${phaseId}-l${layerId}`;
  };

  // Presentation Sequential Reveal Boundary Checkers
  const isStepRevealedBoundary = (type: string) => {
    if (presentationMode === 'full') return true;
    const itemIndex = animationSteps.findIndex(s => s.type === type);
    if (itemIndex === -1) return true;
    return itemIndex <= revealLimit;
  };

  const isLayerActiveBoundary = (type: string) => {
    if (activeStep === -1) return false;
    return animationSteps[activeStep].type === type;
  };

  const handleElementRevealAndSelect = (type: string, phaseNo: number, layerNo?: number) => {
    const idx = animationSteps.findIndex(s => s.type === type);
    if (idx !== -1) {
      if (presentationMode === 'stepwise' && idx > revealLimit) {
        setRevealLimit(idx);
      }
      setActiveStep(idx);
    }
    showDetail(phaseNo, layerNo);
  };

  // Autoplay function and reset controls
  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
    if (!isPlaying && activeStep === -1) {
      setActiveStep(0);
      setRevealLimit(0);
      showDetail(1, 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(-1);
    setRevealLimit(0);
    setSelectedElement({
      phaseId: 3,
      layerId: 3,
      titleFa: 'اتاق جنگ همگرایی و کنترل لیدهای دیجیتال فاز ۳',
      titleEn: 'Phase 3 - Layer 3: Strategic War Room & Digital Leads Integration',
      descFa: 'اتاق فرمان مرکزی که در آن سه لایه هم‌راستا به‌طور زنده رصد، مداخله و یکپارچه می‌گردند: ۱. تجربه اتمسفر شوروم و برند، ۲. روابط صمیمی انسانی و توسعه مفاهمه، ۳. هدایت تمام‌عیار لیدهای ورودی از درگاه تبلیغات ۱۰۰٪ دیجیتال (بدون اتلاف بودجه در تبلیغات سنتی غیردیجیتال).',
      descEn: 'The control center for Vedesia performance. Dynamically coordinates showroom sensory scores, VIP private architect outreach (human relations), and real-time digital lead acquisition. In line with strict strategic discipline, Vedesia avoids unmeasurable traditional offline ads, focusing 100% on high-yield digital channels.'
    });
  };

  const isStepActive = (prefix: string, phaseId: number) => {
    if (activeStep === -1) return false;
    const activeType = animationSteps[activeStep].type;
    return activeType.startsWith(prefix) || animationSteps[activeStep].id === phaseId;
  };

  // Autoplay presentation timer loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = prev + 1;
        if (next >= animationSteps.length) {
          setIsPlaying(false);
          return -1;
        }
        const step = animationSteps[next];
        if (presentationMode === 'stepwise' && next > revealLimit) {
          setRevealLimit(next);
        }
        if (step.type.startsWith('p1')) {
          if (step.type === 'p1-milestone') {
            showDetail(1, 99);
          } else {
            showDetail(1, parseInt(step.type.split('-l')[1]));
          }
        } else if (step.type.startsWith('p2')) {
          showDetail(2, parseInt(step.type.split('-l')[1]));
        } else if (step.type.startsWith('p3')) {
          showDetail(3, parseInt(step.type.split('-l')[1]));
        } else if (step.type.startsWith('p4')) {
          if (step.type === 'p4-milestone') {
            showDetail(4, 99);
          } else {
            showDetail(4, parseInt(step.type.split('-l')[1]));
          }
        }
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, presentationMode, revealLimit]);

  const LockedPlaceholder = ({ type, onClick }: { type: string; onClick: () => void }) => {
    return (
      <div 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="flex-1 py-3 px-2 rounded-xl border border-dashed border-white/5 bg-[#141414]/20 hover:bg-[#1c1c1c]/40 hover:border-gold/30 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group select-none min-h-[72px]"
      >
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 text-gold/60 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Lock size={8} className="opacity-60" />
        </div>
        <span className="text-[7px] text-cream/30 font-bold tracking-widest uppercase mt-1">[ {t('در انتظار تشریح سخنران', 'Awaiting Speaker Presentation')} ]</span>
        <span className="text-[6.5px] text-gold/40 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">{t('برای پایش و آشکارسازی کلیک کنید', 'Click to reveal & explain')}</span>
      </div>
    );
  };

  // Automated Optimization Trick
  const triggerOptimization = () => {
    setIsOptimizing(true);
    setWarRoomLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${t('سیستم هوشمند کورتکس فعال شد. بهینه‌سازی هم‌افزایی نیرو محرک...', 'Cortex Optimizer Engaged. Synthesizing synergy forces...')}`]);
    
    setTimeout(() => {
      setShowroomQuality(99);
      setHumanRelationsScore(98);
      setDigitalLeadsSpeed(38);
      setSalesTakeoffRate(97);
      setIsOptimizing(false);
      setWarRoomLogs(prev => [
        ...prev, 
        `[${new Date().toLocaleTimeString()}] ${t('✔ بهینه‌سازی کامل شد! تجربه شوروم: ۹۹٪ | روابط عمومی: ۹۸٪ | لید دیجیتال: ۳۸ لید/روز | پایش فروش: ۹۷٪', '✔ Optimization Complete! Showroom Experience: 99% | Human Relations: 98% | Digital Lead: 38/day | Sales: 97%')}`
      ]);
    }, 1500);
  };

  // Calculate live Synergy Index Formula
  const synergyIndex = Math.round((showroomQuality * 0.25) + (humanRelationsScore * 0.25) + (digitalLeadsSpeed * 0.7) + (salesTakeoffRate * 0.35));

  return (
    <div className="w-full text-cream flex flex-col h-full bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5">
      
      {/* Unified Compact HUD Steering Header Bar */}
      <div className="px-3 py-2 border-b border-white/5 bg-[#111]/90 flex flex-wrap items-center justify-between gap-3 relative z-20 select-none">
        
        {/* HUD Info Left Area */}
        <div className="flex items-center gap-2">
          <div className="text-[9px] font-black uppercase text-gold tracking-wider bg-gold/10 px-2 py-0.5 rounded border border-gold/25 flex items-center gap-1 shrink-0">
            <Sparkles size={10} className="text-gold animate-pulse" />
            <span>{t('اتاق فرمان مدیرعامل', 'PRESENTER STEERING HUD')}</span>
          </div>

          <div className="hidden sm:flex bg-white/5 p-0.5 rounded-full border border-white/10 shrink-0">
            <button
              onClick={() => {
                setPresentationMode('stepwise');
                setRevealLimit(0);
                setActiveStep(0);
                showDetail(1, 1);
              }}
              className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider transition-all ${
                presentationMode === 'stepwise'
                  ? 'bg-gold text-onyx font-bold shadow-sm'
                  : 'text-cream/50 hover:text-cream/80'
              }`}
            >
              {t('گام‌به‌گام', 'Step-by-Step')}
            </button>
            <button
              onClick={() => setPresentationMode('full')}
              className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider transition-all ${
                presentationMode === 'full'
                  ? 'bg-white/10 text-cream'
                  : 'text-cream/50 hover:text-cream/80'
              }`}
            >
              {t('نقشه کامل', 'Full Map')}
            </button>
          </div>

          {activeStep !== -1 && (
            <div className="animate-fade-in flex items-center gap-1 text-[8.5px] font-bold text-gold/80 bg-gold/5 border border-gold/10 px-1.5 py-0.5 rounded max-w-[180px] sm:max-w-[240px]">
              <span className="w-1 h-1 rounded-full bg-gold animate-ping shrink-0" />
              <span className="truncate">{t('فعال:', 'LIVE:')} {animationSteps[activeStep].label}</span>
            </div>
          )}
        </div>

        {/* HUD Controller Navigation Middle Area */}
        {presentationMode === 'stepwise' && (
          <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded px-2 py-0.5">
            <span className="text-[9px] font-mono font-bold text-cream/40">
              {t('گام:', 'Step:')} <strong className="text-gold font-black">{revealLimit + 1}</strong>/{animationSteps.length}
            </span>
            
            <button
              disabled={revealLimit <= 0}
              onClick={() => {
                const prev = Math.max(0, revealLimit - 1);
                setRevealLimit(prev);
                setActiveStep(prev);
                const step = animationSteps[prev];
                if (step.type.startsWith('p1')) {
                  if (step.type === 'p1-milestone') showDetail(1, 99);
                  else showDetail(1, parseInt(step.type.split('-l')[1]));
                } else if (step.type.startsWith('p2')) {
                  showDetail(2, parseInt(step.type.split('-l')[1]));
                } else if (step.type.startsWith('p3')) {
                  showDetail(3, parseInt(step.type.split('-l')[1]));
                } else if (step.type.startsWith('p4')) {
                  showDetail(4, parseInt(step.type.split('-l')[1]));
                }
              }}
              className="px-2 py-0.5 bg-white/5 hover:bg-white/10 disabled:opacity-25 rounded border border-white/15 text-[8px] font-black transition-all"
            >
              ◀
            </button>

            <button
              disabled={revealLimit >= animationSteps.length - 1}
              onClick={() => {
                const next = Math.min(animationSteps.length - 1, revealLimit + 1);
                setRevealLimit(next);
                setActiveStep(next);
                const step = animationSteps[next];
                if (step.type.startsWith('p1')) {
                  if (step.type === 'p1-milestone') showDetail(1, 99);
                  else showDetail(1, parseInt(step.type.split('-l')[1]));
                } else if (step.type.startsWith('p2')) {
                  showDetail(2, parseInt(step.type.split('-l')[1]));
                } else if (step.type.startsWith('p3')) {
                  showDetail(3, parseInt(step.type.split('-l')[1]));
                } else if (step.type.startsWith('p4')) {
                  showDetail(4, parseInt(step.type.split('-l')[1]));
                }
              }}
              className="px-2 py-0.5 bg-gold text-onyx hover:bg-gold/90 disabled:opacity-25 rounded text-[8px] font-black"
            >
              {t('بعدی', 'Next')} ▶
            </button>
          </div>
        )}

        {/* HUD Playing Actions Right Area */}
        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
          <button
            onClick={() => {
              setIsWarRoomOpen(!isWarRoomOpen);
              showDetail(3, 3);
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider transition-all ${
              isWarRoomOpen
                ? 'bg-emerald-500 text-onyx shadow-md'
                : 'bg-white/5 text-emerald-400 border border-emerald-500/20 hover:bg-[#080d09]'
            }`}
          >
            <span className={`inline-flex h-1 w-1 rounded-full ${isWarRoomOpen ? 'bg-black' : 'bg-emerald-400'} animate-ping shrink-0`} />
            <span>{isWarRoomOpen ? t('اسکنر تلمتری', 'HUD Active') : t('اسکن اتاق جنگ', 'Telemetry Scan')}</span>
          </button>

          <button
            onClick={handlePlayPause}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider transition-all ${
              isPlaying
                ? 'bg-amber-500 text-onyx'
                : 'bg-gold text-onyx hover:scale-[1.02]'
            }`}
          >
            {isPlaying ? <Pause size={8} fill="currentColor" /> : <Play size={8} fill="currentColor" />}
            <span>{isPlaying ? t('توقف', 'Pause') : t('خودکار', 'AutoPlay')}</span>
          </button>
          
          <button
            onClick={handleReset}
            className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-cream/40 hover:text-cream/70 border border-white/10 text-[8px] font-black transition-all"
          >
            <RotateCcw size={8} />
          </button>
        </div>

      </div>

      {/* Interactive Core Map Container */}
      <div className="flex-1 p-1.5 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2.5 w-full min-w-[1000px] items-stretch min-h-[460px]">
          
          {/* ================ COLUMN 1: PHASE 1 ================ */}
          <div 
            onClick={() => showDetail(1, 1)}
            className={`flex flex-col rounded-xl border p-2 transition-all duration-300 relative cursor-pointer ${
              isStepActive('p1', 1) 
                ? 'bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                : 'bg-white/[0.01] border-white/5 hover:border-white/10'
            }`}
          >
            {/* Column Indicator */}
            <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-onyx border border-white/10 rounded-full text-[8px] font-black text-indigo-400 uppercase tracking-widest">
              01 / STRATEGIC SETUP
            </div>

            <div className="flex items-center gap-1.5 mb-2.5 mt-1">
              <div className="w-5.5 h-5.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <BookOpen size={11} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase text-cream/90 font-sans tracking-wider">{t('فاز ۱: اسناد و زیرساخت پایه', 'Phase 1: Documents & Base Infrastructure')}</h4>
                <p className="text-[7.5px] text-cream/40 font-bold">{t('تمهید و تنظیم مبانی ناهشیار برند', 'System-wide alignment bases')}</p>
              </div>
            </div>

            {/* Sub Layers - Visual Representation */}
            <div className="flex-1 flex flex-col gap-1.5">
              
              {/* Layer 1 */}
              {isStepRevealedBoundary('p1-l1') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p1-l1', 1, 1); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[46px] ${
                    isLayerActiveBoundary('p1-l1') 
                      ? 'bg-indigo-500/20 border-indigo-400/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(99,102,241,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] text-indigo-400 font-bold font-mono tracking-widest uppercase">Layer 1 - Strategic Foundations</span>
                    {isLayerActiveBoundary('p1-l1') && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                  </div>
                  <span className="text-[9.5px] font-black mt-0.5 leading-snug">{t('اسناد استراتژیک پایه', 'Strategic Foundations')}</span>
                  <div className="mt-1.5 flex items-center justify-between text-[7.5px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-indigo-300">Sched: 1405/01/08 - 1405/03/25</span>
                    <span className="bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded font-sans-fa">۸ فروردین الی ۲۵ خرداد ۱۴۰۵</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p1-l1" onClick={() => handleElementRevealAndSelect('p1-l1', 1, 1)} />
              )}

              {/* Layer 2 */}
              {isStepRevealedBoundary('p1-l2') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p1-l2', 1, 2); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[46px] ${
                    isLayerActiveBoundary('p1-l2') 
                      ? 'bg-indigo-500/20 border-indigo-400/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(99,102,241,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] text-indigo-400 font-bold font-mono tracking-widest uppercase">Layer 2 - B2B Infrastructure</span>
                    {isLayerActiveBoundary('p1-l2') && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                  </div>
                  <span className="text-[9.5px] font-black mt-0.5 leading-snug">{t('زیرساخت نمایندگان B2B و معماران', 'B2B Infrastructure')}</span>
                  <div className="mt-1.5 flex items-center justify-between text-[7.5px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-indigo-300">Sched: 1405/02/01 - 1405/05/15</span>
                    <span className="bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded font-sans-fa">۱ اردیبهشت الی ۱۵ مرداد ۱۴۰۵</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p1-l2" onClick={() => handleElementRevealAndSelect('p1-l2', 1, 2)} />
              )}

              {/* MILESTONE: Vortex Internal Team Tech Launch */}
              {isStepRevealedBoundary('p1-milestone') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p1-milestone', 1, 99); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border-2 border-dashed transition-all duration-300 min-h-[54px] relative ${
                    isLayerActiveBoundary('p1-milestone') 
                      ? 'bg-amber-500/15 border-amber-400 text-white scale-[1.02] shadow-[0_0_12px_rgba(245,158,11,0.2)]' 
                      : 'bg-[#ffb000]/5 border-amber-500/40 hover:bg-amber-500/10 text-cream/80'
                  }`}
                >
                  <div className="absolute top-0.5 left-1 px-1 py-0.2 text-[5.5px] bg-amber-500 text-onyx font-bold rounded uppercase tracking-wide">
                    {t('لانچ داخلی', 'INTERNAL LAUNCH')}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] text-amber-500 font-extrabold font-mono tracking-widest uppercase">INTERNAL RUNWAY</span>
                      {isLayerActiveBoundary('p1-milestone') && <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />}
                    </div>
                    <span className="text-[9.5px] font-black mt-0.5 block text-amber-400 leading-tight">{t('برگزاری لانچ داخلی رسمی ویژه پرسنل', 'Vortex Internal Team Tech Launch')}</span>
                    <div className="mt-1.5 flex items-center justify-between text-[7px] font-semibold text-cream/40 border-t border-dashed border-amber-500/20 pt-1">
                      <span className="font-mono text-amber-400">Launch Date: 1405/07/15</span>
                      <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded font-sans-fa">۱۵ مهر ۱۴۰۵</span>
                    </div>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p1-milestone" onClick={() => handleElementRevealAndSelect('p1-milestone', 1, 99)} />
              )}

              {/* Layer 3 */}
              {isStepRevealedBoundary('p1-l3') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p1-l3', 1, 3); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[46px] ${
                    isLayerActiveBoundary('p1-l3') 
                      ? 'bg-indigo-500/20 border-indigo-400/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(99,102,241,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] text-indigo-400 font-bold font-mono tracking-widest uppercase">Layer 3 - Showroom Infrastructure</span>
                    {isLayerActiveBoundary('p1-l3') && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                  </div>
                  <span className="text-[9.5px] font-black mt-0.5 leading-snug">{t('زیرساخت شوروم و رسانه', 'Showroom & Media Infrastructure')}</span>
                  <div className="mt-1.5 flex items-center justify-between text-[7.5px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-indigo-300">Sched: 1405/03/10 - 1405/08/30</span>
                    <span className="bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded font-sans-fa">۱۰ خرداد تا ۳۰ آبان ۱۴۰۵</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p1-l3" onClick={() => handleElementRevealAndSelect('p1-l3', 1, 3)} />
              )}

              {/* Layer 4 */}
              {isStepRevealedBoundary('p1-l4') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p1-l4', 1, 4); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[46px] ${
                    isLayerActiveBoundary('p1-l4') 
                      ? 'bg-indigo-500/20 border-indigo-400/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(99,102,241,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] text-indigo-400 font-bold font-mono tracking-widest uppercase">Layer 4 - Sales & Acceleration</span>
                    {isLayerActiveBoundary('p1-l4') && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                  </div>
                  <span className="text-[9.5px] font-black mt-0.5 leading-snug">{t('زیرساخت فروش، داده پایه و هوش کورتکس', 'Sales Infrastructure, CRM & Cortex Analytics Base')}</span>
                  <div className="mt-1.5 flex items-center justify-between text-[7.5px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-indigo-300">Sched: 1405/04/01 - 1405/08/30</span>
                    <span className="bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded font-sans-fa">۱ تیر الی ۳۰ آبان ۱۴۰۵</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p1-l4" onClick={() => handleElementRevealAndSelect('p1-l4', 1, 4)} />
              )}
            </div>
          </div>


          {/* ================ COLUMN 2: PHASE 2 (Co-Testing) ================ */}
          <div 
            onClick={() => showDetail(2, 1)}
            className={`flex flex-col rounded-xl border p-2.5 transition-all duration-300 relative cursor-pointer ${
              isStepActive('p2', 2) 
                ? 'bg-gold/5 border-gold shadow-[0_0_15px_rgba(197,160,89,0.1)]' 
                : 'bg-white/[0.01] border-white/5 hover:border-gold/30'
            }`}
          >
            {/* Column Indicator */}
            <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-onyx border border-gold/30 rounded-full text-[8px] font-black text-gold uppercase tracking-widest animate-pulse">
              02 / CO-TESTING MARGINS
            </div>

            <div className="flex items-center gap-1.5 mb-2.5 mt-1">
              <div className="w-5.5 h-5.5 rounded-md bg-gold/15 border border-gold/30 text-gold flex items-center justify-center">
                <Settings size={11} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase text-gold font-sans tracking-wider">{t('فاز ۲: فعال‌سازی کنترل‌شده بازار', 'Phase 2: Controlled Market Activation')}</h4>
                <p className="text-[7.5px] text-cream/40 font-bold">{t('ممیزی فشرده اسکلت فرآیندها', 'Dynamic live ecosystem pre-tests')}</p>
              </div>
            </div>

            {/* Sub Layers - Visual Representation */}
            <div className="flex-1 flex flex-col gap-1.5">
              
              {/* L1 - Isolated Product */}
              {isStepRevealedBoundary('p2-l1') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p2-l1', 2, 1); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[50px] ${
                    isLayerActiveBoundary('p2-l1') 
                      ? 'bg-gold/20 border-gold/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(197,160,89,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[7.5px] text-gold/80 font-bold font-mono tracking-widest uppercase">Layer 1 - Agents & Architects Network</span>
                    {isLayerActiveBoundary('p2-l1') && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
                  </div>
                  <p className="text-[9.5px] font-bold text-cream/90 mb-1 leading-tight">{t('شبکه نمایندگان و معماران', 'Agents & Architects Network')}</p>
                  {/* 4 groups grid */}
                  <div className="grid grid-cols-4 gap-0.5 mb-1.5">
                    {p2Groups.map((g) => (
                      <div key={`l1-${g.id}`} className="flex flex-col items-center justify-center p-0.5 bg-white/[0.04] border border-white/5 rounded">
                        <g.icon size={8} className="text-gold/60" />
                        <span className="text-[6.5px] text-cream/50 mt-0.5 scale-90">{t(g.fa, g.en.split('/')[0].split(' ')[0])}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-gold-300">Sched: 1405/07/01 - 1405/09/01</span>
                    <span className="bg-gold-500/10 text-gold-400 px-1 py-0.2 rounded font-sans-fa">۱ مهر الی ۱ آذر ۱۴۰۵</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p2-l1" onClick={() => handleElementRevealAndSelect('p2-l1', 2, 1)} />
              )}

              {/* L2 - Isolated Showroom */}
              {isStepRevealedBoundary('p2-l2') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p2-l2', 2, 2); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[50px] ${
                    isLayerActiveBoundary('p2-l2') 
                      ? 'bg-gold/20 border-gold/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(197,160,89,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[7.5px] text-gold/80 font-bold font-mono tracking-widest uppercase">Layer 2 - Specialist Previews</span>
                    {isLayerActiveBoundary('p2-l2') && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
                  </div>
                  <p className="text-[9.5px] font-bold text-cream/90 mb-1 leading-tight">{t('پیش‌نمایش‌های تخصصی', 'Specialist Previews')}</p>
                  <div className="grid grid-cols-4 gap-0.5 mb-1.5">
                    {p2Groups.map((g) => (
                      <div key={`l2-${g.id}`} className="flex flex-col items-center justify-center p-0.5 bg-white/[0.04] border border-white/5 rounded">
                        <g.icon size={8} className="text-gold/60" />
                        <span className="text-[6.5px] text-cream/50 mt-0.5 scale-90">{t(g.fa, g.en.split('/')[0].split(' ')[0])}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-gold-300">Sched: 1405/08/01 - 1405/10/01</span>
                    <span className="bg-gold-500/10 text-gold-400 px-1 py-0.2 rounded font-sans-fa">۱ آبان الی ۱ دی ۱۴۰۵</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p2-l2" onClick={() => handleElementRevealAndSelect('p2-l2', 2, 2)} />
              )}

              {/* L3 - Unified Showroom */}
              {isStepRevealedBoundary('p2-l3') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p2-l3', 2, 3); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[50px] ${
                    isLayerActiveBoundary('p2-l3') 
                      ? 'bg-gold/20 border-gold/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(197,160,89,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[7.5px] text-gold/80 font-bold font-mono tracking-widest uppercase">Layer 3 - Fuorisalone Event</span>
                    {isLayerActiveBoundary('p2-l3') && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
                  </div>
                  <p className="text-[9.5px] font-bold text-cream/90 mb-1 leading-tight">{t('ایونت اختصاصی Fuorisalone (هفته طراحی میلان)', 'Fuorisalone Exclusive Event')}</p>
                  <div className="mt-auto flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-gold-300">Sched: 1405/09/01 - 1405/10/30</span>
                    <span className="bg-gold-500/10 text-gold-400 px-1 py-0.2 rounded font-sans-fa">۱ آذر الی ۳۰ دی ۱۴۰۵</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p2-l3" onClick={() => handleElementRevealAndSelect('p2-l3', 2, 3)} />
              )}

              {/* L4 - Calibrated Market Trial */}
              {isStepRevealedBoundary('p2-l4') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p2-l4', 2, 4); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[50px] ${
                    isLayerActiveBoundary('p2-l4') 
                      ? 'bg-gold/20 border-gold/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(197,160,89,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[7.5px] text-gold/80 font-bold font-mono tracking-widest uppercase">Layer 4 - Soft Launch Operations</span>
                    {isLayerActiveBoundary('p2-l4') && <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />}
                  </div>
                  <p className="text-[9.5px] font-bold text-cream/90 mb-0.5 leading-tight">{t('عملیات لانچ نرم', 'Soft Launch Operations')}</p>
                  
                  {/* 4 groups side-by-side representing commercial testing validation */}
                  <div className="grid grid-cols-4 gap-0.5 mt-0.5 mb-1.5 bg-amber-500/5 p-1 rounded border border-amber-500/10 shadow-inner">
                    {p2Groups.map((g) => (
                      <div key={`l4-${g.id}`} className="flex flex-col items-center justify-center p-0.5 bg-white/[0.03] border border-white/10 rounded">
                        <g.icon size={8} className="text-amber-500/75 shrink-0" />
                        <span className="text-[6px] text-cream/60 mt-0.5 scale-90 font-semibold text-center leading-none">{t(g.fa, g.en.split('/')[0].split(' ')[0])}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-gold-300">Sched: 1405/10/01 - 1406/01/25</span>
                    <span className="bg-gold-500/10 text-gold-400 px-1 py-0.2 rounded font-sans-fa">۱ دی ۱۴۰۵ الی ۲۵ فروردین ۱۴۰۶</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p2-l4" onClick={() => handleElementRevealAndSelect('p2-l4', 2, 4)} />
              )}

            </div>
          </div>


          {/* ================ COLUMN 3: PHASE 3 (GLOBAL LAUNCH & WAR ROOM) ================ */}
          <div 
            onClick={() => showDetail(3, 1)}
            className={`flex flex-col rounded-xl border p-2.5 transition-all duration-300 relative cursor-pointer ${
              isStepActive('p3', 3) 
                ? 'bg-emerald-500/5 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                : 'bg-white/[0.01] border-white/5 hover:border-emerald-500/20'
            }`}
          >
            {/* Column Indicator */}
            <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-onyx border border-white/10 rounded-full text-[8px] font-black text-emerald-400 uppercase tracking-widest">
              03 / GLOBAL FIELD LAUNCH
            </div>

            <div className="flex items-center gap-1.5 mb-2.5 mt-1">
              <div className="w-5.5 h-5.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Share2 size={11} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase text-cream/90 font-sans tracking-wider">{t('فاز ۳: لانچ', 'Phase 3: Brand & Showroom Launch')}</h4>
                <p className="text-[7.5px] text-cream/40 font-bold">{t('همگرایی سه‌بعدی و کنترل لیدها', 'Prestige global entry activation')}</p>
              </div>
            </div>

            {/* Sub Layers - Visual Representation */}
            <div className="flex-1 flex flex-col gap-1.5">
              
              {/* L1 - Customer Experience */}
              {isStepRevealedBoundary('p3-l1') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p3-l1', 3, 1); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[64px] ${
                    isLayerActiveBoundary('p3-l1') 
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-[7.5px] text-emerald-400 font-bold tracking-widest uppercase">Layer 1 - Grand Launch Crowd</span>
                      {isLayerActiveBoundary('p3-l1') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    </div>
                    <span className="text-[9.5px] font-black mt-0.5 block leading-tight">{t('تجربه مدرن برند و شوروم مشتری عمومی', 'Elite Public Showroom Experience')}</span>
                    <span className="text-[7px] text-emerald-400/60 uppercase mt-[1px] block font-bold leading-none">{t('ادغام حواس پنج‌گانه، عطر و نماها', 'Acoustics, scents & slates')}</span>
                  </div>

                  {/* VISUAL DIFFERENCE COMPARISON: Active live crowded opening layout */}
                  <div className="mt-1 mb-1.5 p-1 bg-[#040905] border border-emerald-500/20 rounded relative overflow-hidden min-h-[34px] flex items-center justify-between gap-1">
                    {/* Pulsing crowd heat spots layered underneath */}
                    <div className="absolute inset-0 opacity-25 pointer-events-none">
                      <div className="w-1 h-1 rounded-full bg-emerald-400/40 absolute top-0.5 left-2 animate-ping" />
                      <div className="w-1 h-1 rounded-full bg-emerald-500/30 absolute bottom-1 right-10 animate-pulse" />
                    </div>

                    {/* Left portion: 4 target sectors surrounded by active crowd dots */}
                    <div className="relative z-10 flex-1 flex items-center gap-0.5 bg-black/40 p-0.5 rounded border border-emerald-500/10 shadow">
                      {p2Groups.map((g) => (
                        <div key={`p3-${g.id}`} className="flex-1 flex flex-col items-center justify-center bg-white/[0.01] border border-emerald-500/10 rounded py-0.5 min-w-[12px] relative">
                          <div className="relative">
                            <g.icon size={6.5} className="text-emerald-400 shrink-0" />
                            {/* Tiny crowd dots representing people surrounding this group */}
                            <span className="absolute -top-[1.5px] -right-[1.5px] w-[2px] h-[2px] bg-emerald-300 rounded-full animate-pulse" />
                            <span className="absolute -bottom-0.5 -left-1 w-[2px] h-[2px] bg-cream/70 rounded-full" />
                          </div>
                          <span className="text-[4px] text-cream/70 scale-90 leading-none truncate max-w-[15px] mt-[1px]">
                            {t(g.fa, g.en.split('/')[0].split(' ')[0])}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Right portion: High density crowd indicator & stats */}
                    <div className="relative z-10 shrink-0 flex flex-col justify-center items-center px-1 bg-emerald-950/40 border border-emerald-500/20 rounded py-0.5 min-w-[34px] text-center">
                      <div className="flex items-center gap-0.5">
                        <Users size={7.5} className="text-emerald-400 animate-pulse shrink-0" />
                        <span className="text-[6.5px] font-mono font-black text-emerald-400 leading-none">VIPs</span>
                      </div>
                      <span className="text-[8px] font-mono font-bold text-cream leading-none mt-0.5 animate-pulse">+180</span>
                      <span className="text-[4.5px] text-emerald-400/60 uppercase tracking-widest font-sans scale-90 leading-none">{t('ازدحام', 'CROWDED')}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-emerald-300">Milestone Date: 1406/02/15</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-sans-fa">۱۵ اردیبهشت ۱۴۰۶ - افتتاحیه</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p3-l1" onClick={() => handleElementRevealAndSelect('p3-l1', 3, 1)} />
              )}

              {/* L2 - Strategic PR */}
              {isStepRevealedBoundary('p3-l2') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p3-l2', 3, 2); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[64px] ${
                    isLayerActiveBoundary('p3-l2') 
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-white scale-[1.02] shadow' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] text-emerald-400 font-bold font-mono tracking-widest uppercase">Layer 2 - Strategic PR</span>
                    {isLayerActiveBoundary('p3-l2') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  </div>
                  <span className="text-[9.5px] font-black mt-0.5 leading-tight">{t('روابط عمومی (PR) و مفاهمه مستمر انسانی', 'Targeted Human Relations & PR')}</span>
                  <span className="text-[7.5px] text-cream/40 leading-none block truncate mt-0.5 mb-1.5">{t('مدیریت افکار عمومی، رسانه و کانال‌ها', 'Opinion alignment & corporate media loops')}</span>
                  
                  <div className="mt-auto flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-emerald-300">Sched: 1405/11/01 - 1406/03/30</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-sans-fa">۱ بهمن ۱۴۰۵ الی ۳۰ خرداد ۱۴۰۶</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p3-l2" onClick={() => handleElementRevealAndSelect('p3-l2', 3, 2)} />
              )}

              {/* LARGE DETAILED WAR ROOM CARD INSIDE COLUMN 3 (PHASE 3) */}
              {isStepRevealedBoundary('p3-l3') ? (
                isLayerActiveBoundary('p3-l3') ? (
                  <div 
                    onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p3-l3', 3, 3); }}
                    className="rounded-lg border p-1.5 transition-all duration-300 relative cursor-pointer bg-[#040805] border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] text-white scale-[1.01]"
                  >
                    {/* pulsing war-room beacon */}
                    <div className="flex items-center justify-between border-b border-emerald-500/15 pb-1 mb-1">
                      <div className="flex items-center gap-1">
                        <span className="relative flex h-1 w-1 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-infinite"></span>
                          <span className="relative inline-flex rounded-full h-1 w-1 bg-red-500"></span>
                        </span>
                        <span className="text-[7px] text-emerald-400 font-extrabold font-mono tracking-widest uppercase">Layer 3 - COMMAND CENTRE</span>
                      </div>
                      <span className="px-1 py-0.2 bg-emerald-500/10 text-[6px] border border-emerald-500/20 text-emerald-300 font-sans tracking-wide rounded leading-none">
                        {t('اتاق جنگ فعال', 'CONSOLE LIVE')}
                      </span>
                    </div>

                    <h5 className="text-[9px] font-black text-gold tracking-tight leading-none">{t('فرمان پایش ناهشیار برند', 'Cortex Launch Command Grid')}</h5>

                    {/* 4 CONTROLLERS WITH HIGH-INTERACTIVE BUTTON INTERFACES (ONE BELOW ANOTHER) */}
                    <div className="flex flex-col gap-1 mt-1">
                      
                      {/* Item 1: Experience / شوروم */}
                      <div className="flex flex-col gap-0.5 border-b border-white/[0.03] pb-[2px]">
                        <div className="flex items-center justify-between text-[7px] font-bold leading-none">
                          <span className="text-cream/90 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0 animate-pulse" />
                            {t('شوروم', 'Experience')}
                          </span>
                          <span className="font-mono text-indigo-400 text-[7px] font-black">{showroomQuality}%</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex-1 bg-white/5 h-[3px] rounded-full overflow-hidden">
                            <div className="bg-indigo-400 h-full transition-all duration-300" style={{ width: `${showroomQuality}%` }} />
                          </div>
                          {/* Control buttons */}
                          <div className="flex gap-0.5 shrink-0">
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const val = showroomQuality >= 100 ? 70 : Math.min(100, showroomQuality + 5);
                                setShowroomQuality(val);
                                setWarRoomLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${t(`✔ تنظیم: اتمسفر شوروم به ${val}٪ کالیبره شد`, `✔ Tuned: Showroom scent concentration adjusted to ${val}%`)}`]);
                              }}
                              className="px-1 py-0.2 bg-white/5 hover:bg-white/10 hover:text-white text-[5.5px] rounded border border-white/10 text-cream/70 font-mono font-bold uppercase transition-all active:scale-95 leading-none shrink-0"
                            >
                              {t('تنظیم', 'Tune')}
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowroomQuality(100);
                                setWarRoomLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${t('⚡ بوست: فعال‌سازی عطر اختصاصی تند و آکوستیک لوکس (شوروم ۱۰۰٪)', '⚡ Boost: Adaptive signature forest scent and custom acoustics (Showroom 100%)')}`]);
                              }}
                              className="px-1 py-0.2 bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 hover:text-white text-[5.5px] rounded border border-indigo-500/30 font-mono font-bold uppercase transition-all active:scale-95 leading-none shrink-0"
                            >
                              {t('بوست', 'Boost')}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Item 2: PR & Relationships / روابط عمومی */}
                      <div className="flex flex-col gap-0.5 border-b border-white/[0.03] pb-[2px]">
                        <div className="flex items-center justify-between text-[7px] font-bold leading-none">
                          <span className="text-cream/90 flex items-center gap-1 font-sans">
                            <span className="w-1 h-1 rounded-full bg-gold shrink-0 animate-pulse" />
                            {t('روابط عمومی', 'Relations')}
                          </span>
                          <span className="font-mono text-gold text-[7px] font-black">{humanRelationsScore}%</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex-1 bg-white/5 h-[3px] rounded-full overflow-hidden">
                            <div className="bg-gold h-full transition-all duration-300" style={{ width: `${humanRelationsScore}%` }} />
                          </div>
                          {/* Control buttons */}
                          <div className="flex gap-0.5 shrink-0">
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const val = humanRelationsScore >= 100 ? 70 : Math.min(100, humanRelationsScore + 5);
                                setHumanRelationsScore(val);
                                setWarRoomLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${t(`✔ مفاهمه: روابط با آرشیتکت‌ها و دیلرها به ${val}٪ ارتقا یافت`, `✔ Relations: Top architect connection quality raised to ${val}%`)}`]);
                              }}
                              className="px-1 py-0.2 bg-white/5 hover:bg-white/10 hover:text-white text-[5.5px] rounded border border-white/10 text-cream/70 font-mono font-bold uppercase transition-all active:scale-95 leading-none shrink-0"
                            >
                              {t('تنظیم', 'Tune')}
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setHumanRelationsScore(100);
                                setWarRoomLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${t('⚡ پرستیژ: کمپین VIP دیپلماتیک معماران طراز اول مستقر شد (صد درصد)', '⚡ Prestige: Private PR campaign active with 20 leading developers (100%)')}`]);
                              }}
                              className="px-1 py-0.2 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 hover:text-white text-[5.5px] rounded border border-amber-500/30 font-mono font-bold uppercase transition-all active:scale-95 leading-none shrink-0"
                            >
                              {t('بوست', 'Boost')}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Item 3: Digital Leads / لیدها */}
                      <div className="flex flex-col gap-0.5 border-b border-white/[0.03] pb-[2px]">
                        <div className="flex items-center justify-between text-[7px] font-bold leading-none">
                          <span className="text-cream/90 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                            {t('لیدها', 'Leads')}
                          </span>
                          <span className="font-mono text-emerald-400 text-[7px] font-black">{digitalLeadsSpeed} L/D</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex-1 bg-white/5 h-[3px] rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${(digitalLeadsSpeed / 50) * 100}%` }} />
                          </div>
                          {/* Control buttons */}
                          <div className="flex gap-0.5 shrink-0">
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const val = digitalLeadsSpeed >= 50 ? 5 : Math.min(50, digitalLeadsSpeed + 5);
                                setDigitalLeadsSpeed(val);
                                setWarRoomLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${t(`✔ کمپین دیجیتال: نرخ لید‌های روزانه به ${val} افزایش یافت`, `✔ Digital Campaign: Live lead generation speed scaled to ${val}/day`)}`]);
                              }}
                              className="px-1 py-0.2 bg-white/5 hover:bg-white/10 hover:text-white text-[5.5px] rounded border border-white/10 text-cream/70 font-mono font-bold uppercase transition-all active:scale-95 leading-none shrink-0"
                            >
                              {t('تنظیم', 'Tune')}
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDigitalLeadsSpeed(50);
                                setWarRoomLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${t('⚡ شتاب کورتکس: اختصاص ۱۰۰٪ بودجه به درگاه هدفمند اینستاگرام (۵۰ لید/روز)', '⚡ Ad Burst: Concentrating 100% of budget on high-intent target Instagram ads (50 L/D)')}`]);
                              }}
                              className="px-1 py-0.2 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 hover:text-white text-[5.5px] rounded border border-emerald-500/30 font-mono font-bold uppercase transition-all active:scale-95 leading-none shrink-0"
                            >
                              {t('بوست', 'Boost')}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Item 4: Sales Speed / سرعت فروش */}
                      <div className="flex flex-col gap-0.5 pb-[1px]">
                        <div className="flex items-center justify-between text-[7px] font-bold leading-none">
                          <span className="text-cream/90 flex items-center gap-1 font-sans">
                            <span className="w-1 h-1 rounded-full bg-rose-400 shrink-0 animate-pulse" />
                            {t('سرعت فروش', 'Sales Speed')}
                          </span>
                          <span className="font-mono text-rose-400 text-[7px] font-black">{salesTakeoffRate}%</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex-1 bg-white/5 h-[3px] rounded-full overflow-hidden">
                            <div className="bg-rose-400 h-full transition-all duration-300" style={{ width: `${salesTakeoffRate}%` }} />
                          </div>
                          {/* Control buttons */}
                          <div className="flex gap-0.5 shrink-0">
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const val = salesTakeoffRate >= 100 ? 50 : Math.min(100, salesTakeoffRate + 5);
                                setSalesTakeoffRate(val);
                                setWarRoomLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${t(`✔ تراکنش: سرعت کلوز فاکتورهای نمایندگان به ${val}٪ رسید`, `✔ Transaction Speed: Dealer order-to-close pipeline rate is ${val}%`)}`]);
                              }}
                              className="px-1 py-0.2 bg-white/5 hover:bg-white/10 hover:text-white text-[5.5px] rounded border border-white/10 text-cream/70 font-mono font-bold uppercase transition-all active:scale-95 leading-none shrink-0"
                            >
                              {t('تنظیم', 'Tune')}
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSalesTakeoffRate(100);
                                setWarRoomLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${t('⚡ تیک‌آف: سیستم تأیید مالی فرآیند کلوز و ترخیص را خودکار نمود (۱۰۰٪)', '⚡ Takeoff: Fully automated payment matching and near-instant dispatch routing active (100%)')}`]);
                              }}
                              className="px-1 py-0.2 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 hover:text-white text-[5.5px] rounded border border-rose-500/30 font-mono font-bold uppercase transition-all active:scale-95 leading-none shrink-0"
                            >
                              {t('بوست', 'Boost')}
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Live Synergy Meter & Cortex Logs in compact layouts */}
                    <div className="mt-1.5 p-1 bg-black/40 border border-emerald-500/10 rounded flex items-center justify-between gap-1">
                      <div>
                        <span className="text-[6px] text-cream/40 font-mono tracking-wider block">CORTEX SYNERGY</span>
                        <span className="text-[10px] font-mono font-black text-emerald-400 leading-none">{synergyIndex}</span>
                      </div>
                      <div className="text-right">
                        <span className="px-1 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 rounded text-[5.5px] font-mono leading-none inline-block">
                          {synergyIndex > 105 ? t('بحرانی عالی', 'ELITE') : t('کالیبره', 'OK')}
                        </span>
                      </div>
                    </div>

                    {/* Mini scrolling logger feed */}
                    <div className="mt-1 bg-[#050805] border border-emerald-500/15 p-1 rounded text-[5.5px] font-mono leading-none h-[18px] overflow-hidden flex flex-col justify-end">
                      <div className="flex-1 overflow-y-auto space-y-0.5">
                        {warRoomLogs.slice(-1).map((log, idx) => (
                          <div key={idx} className="truncate text-emerald-400/85">
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Smart cortex trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerOptimization();
                      }}
                      disabled={isOptimizing}
                      className="w-full mt-1.5 py-0.5 bg-emerald-500/15 hover:bg-emerald-500/30 disabled:bg-emerald-500/5 hover:border-emerald-500/50 border border-emerald-500/20 text-emerald-400 rounded text-[7.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-0.5 transition-all shadow-[0_0_8px_rgba(16,185,129,0.05)] active:scale-95 text-center"
                    >
                      <Zap size={7} className={isOptimizing ? "animate-spin animate-infinite" : ""} />
                      <span>{isOptimizing ? t('بهینه‌سازی...', 'TUNING...') : t('بهبود کورتکس', 'Run Smart Tuning')}</span>
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p3-l3', 3, 3); }}
                    className="rounded-lg border p-1.5 transition-all duration-300 relative cursor-pointer min-h-[48px] flex flex-col justify-between bg-[#070c08]/85 border-emerald-500/20 hover:border-emerald-500/40 text-cream/90 hover:bg-[#070c08]"
                  >
                    <div className="flex items-center justify-between leading-none">
                      <span className="text-[7px] text-emerald-400 font-extrabold font-mono tracking-widest uppercase">Layer 3 - COMMAND CENTRE</span>
                      <span className="text-[6px] text-emerald-400 font-mono leading-none">SYNERGY: {synergyIndex}</span>
                    </div>
                    <p className="text-[9px] font-black text-gold mt-1 leading-snug">{t('اتاق جنگ همگرایی و کنترل لیدها', 'Strategic War Room Console')}</p>
                    <span className="text-[6.5px] text-emerald-400/50 uppercase tracking-wider block font-bold text-center border border-emerald-500/10 rounded bg-[#030704] py-0.5 mt-1 animate-pulse leading-none">
                      {t('برای مانیتورینگ کورتکس کلیک کنید', 'CLICK TO RUN TELEMETRY')}
                    </span>
                  </div>
                )
              ) : (
                <LockedPlaceholder type="p3-l3" onClick={() => handleElementRevealAndSelect('p3-l3', 3, 3)} />
              )}

            </div>
          </div>


          {/* ================ COLUMN 4: PHASE 4 ================ */}
          <div 
            onClick={() => showDetail(4, 1)}
            className={`flex flex-col rounded-xl border p-2 transition-all duration-300 relative cursor-pointer ${
              isStepActive('p4', 4) 
                ? 'bg-rose-500/5 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.1)]' 
                : 'bg-white/[0.01] border-white/5 hover:border-white/10'
            }`}
          >
            {/* Column Indicator */}
            <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-onyx border border-white/10 rounded-full text-[8px] font-black text-rose-400 uppercase tracking-widest">
              04 / AI & ENTERPRISE SCALE
            </div>

            <div className="flex items-center gap-1.5 mb-2.5 mt-1">
              <div className="w-5.5 h-5.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <TrendingUp size={11} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase text-cream/90 font-sans tracking-wider">{t('فاز ۴: شتاب‌دهی', 'Phase 4: Scaling & Expansion')}</h4>
                <p className="text-[7.5px] text-cream/40 font-bold">{t('همگرایی داده‌ها جهت موازنه کلان مالی', 'Self-optimizing corporate brain')}</p>
              </div>
            </div>

            {/* Sub Layers - Visual Representation */}
            <div className="flex-1 flex flex-col gap-1.5">
              
              {isStepRevealedBoundary('p4-l1') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p4-l1', 4, 1); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[46px] ${
                    isLayerActiveBoundary('p4-l1') 
                      ? 'bg-rose-500/20 border-rose-400/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(244,63,94,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] text-rose-400 font-bold font-mono tracking-widest uppercase">Layer 1 - Commercial Take-off</span>
                    {isLayerActiveBoundary('p4-l1') && <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />}
                  </div>
                  <span className="text-[9.5px] font-black mt-0.5 leading-snug">{t('شتاب‌دهی فروش و تیک‌آف تجاری هلدینگ', 'High-speed sales conversion')}</span>
                  <div className="mt-1.5 flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-rose-300">Sched: 1406/02/15 - 1406/04/15</span>
                    <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.2 rounded font-sans-fa">۱۵ اردیبهشت الی ۱۵ تیر ۱۴۰۶</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p4-l1" onClick={() => handleElementRevealAndSelect('p4-l1', 4, 1)} />
              )}

              {/* MILESTONE: Milan Salone del Mobile Exhibition */}
              {isStepRevealedBoundary('p4-milestone') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p4-milestone', 4, 99); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border-2 border-dashed transition-all duration-300 min-h-[54px] relative ${
                    isLayerActiveBoundary('p4-milestone') 
                      ? 'bg-emerald-500/15 border-emerald-400 text-white scale-[1.02] shadow-[0_0_12px_rgba(16,185,129,0.2)]' 
                      : 'bg-[#10b981]/5 border-emerald-500/40 hover:bg-emerald-500/10 text-cream/80'
                  }`}
                >
                  <div className="absolute top-0.5 left-1 px-1 py-0.2 text-[5.5px] bg-emerald-500 text-onyx font-bold rounded uppercase tracking-wide">
                    {t('لانچ جهانی', 'WORLD LAUNCH')}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] text-emerald-500 font-extrabold font-mono tracking-widest uppercase">MILAN SALONE EXHIBITION</span>
                      {isLayerActiveBoundary('p4-milestone') && <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
                    </div>
                    <span className="text-[9.5px] font-black mt-0.5 block text-emerald-400 leading-tight">{t('زیرپروژه سالن دل موبیله میلان (نمایشگاه)', 'Milan Salone del Mobile Exhibition')}</span>
                    <div className="mt-1.5 flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-dashed border-emerald-500/20 pt-1">
                      <span className="font-mono text-emerald-300">Sched: 1406/01/15 - 1406/01/29</span>
                      <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-sans-fa">۱۵ تا ۲۹ فروردین ۱۴۰۶</span>
                    </div>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p4-milestone" onClick={() => handleElementRevealAndSelect('p4-milestone', 4, 99)} />
              )}

              {isStepRevealedBoundary('p4-l2') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p4-l2', 4, 2); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[46px] ${
                    isLayerActiveBoundary('p4-l2') 
                      ? 'bg-rose-500/20 border-rose-400/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(244,63,94,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] text-rose-400 font-bold font-mono tracking-widest uppercase">Layer 2 - Business Intel</span>
                    {isLayerActiveBoundary('p4-l2') && <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />}
                  </div>
                  <span className="text-[9.5px] font-black mt-0.5 leading-snug">{t('هوش تجاری (BI) و هوشمندسازی همه‌جانبه فرآیندها', 'Ecosystem telemetry, Scent IoT & CRM')}</span>
                  <div className="mt-1.5 flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-rose-300">Sched: 1406/02/01 - 1406/06/30</span>
                    <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.2 rounded font-sans-fa">۱ اردیبهشت الی ۳۰ شهریور ۱۴۰۶</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p4-l2" onClick={() => handleElementRevealAndSelect('p4-l2', 4, 2)} />
              )}

              {isStepRevealedBoundary('p4-l3') ? (
                <div 
                  onClick={(e) => { e.stopPropagation(); handleElementRevealAndSelect('p4-l3', 4, 3); }}
                  className={`flex-1 flex flex-col justify-center p-1.5 rounded-lg border transition-all duration-300 min-h-[46px] ${
                    isLayerActiveBoundary('p4-l3') 
                      ? 'bg-rose-500/20 border-rose-400/50 text-white scale-[1.02] shadow-[0_0_8px_rgba(244,63,94,0.2)]' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-cream/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7.5px] text-rose-400 font-bold font-mono tracking-widest uppercase">Layer 3 - Product Scaling</span>
                    {isLayerActiveBoundary('p4-l3') && <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />}
                  </div>
                  <span className="text-[9.5px] font-black mt-0.5 leading-snug">{t('توسعه مداوم بازار و محصولات جدید', 'Dynamic R&D loops & Global expansion')}</span>
                  <div className="mt-1.5 flex items-center justify-between text-[7px] font-semibold text-cream/45 border-t border-white/5 pt-1">
                    <span className="font-mono text-rose-300">Sched: 1406/02/15 - 1406/08/30</span>
                    <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.2 rounded font-sans-fa">۱۵ اردیبهشت الی ۳۰ آبان ۱۴۰۶</span>
                  </div>
                </div>
              ) : (
                <LockedPlaceholder type="p4-l3" onClick={() => handleElementRevealAndSelect('p4-l3', 4, 3)} />
              )}

            </div>
          </div>

        </div>
      </div>



      {/* Explanatory Context Box */}
      <div className="border-t border-white/5 py-2 px-3 bg-[#070707] shrink-0">
        <div className="min-h-[50px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedElement ? (
              <motion.div
                key={`p${selectedElement.phaseId}-l${selectedElement.layerId || 0}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="w-full flex items-start gap-2 text-right"
              >
                <div className="w-5.5 h-5.5 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Sparkles size={11} />
                </div>
                <div className="space-y-0.5 flex-1 font-sans">
                  <h4 className="text-[10px] font-black text-gold uppercase tracking-wider">
                    {lang === 'fa' ? selectedElement.titleFa : selectedElement.titleEn}
                  </h4>
                  <p className="text-[10.5px] text-cream/70 leading-relaxed max-w-7xl">
                    {lang === 'fa' ? selectedElement.descFa : selectedElement.descEn}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-0.5 text-cream/30"
              >
                <ArrowRightLeft size={11} className="opacity-40 animate-pulse text-gold" />
                <p className="text-[9.5px] font-bold font-serif">
                  {t('برای مشاهده جزئیات عملیاتی و استراتژیک در هر سطح، روی کارت‌ها یا لایه‌های بالا کلیک کنید', 'Click any of the structural layers above to reveal precise operational insights for the CEO')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
