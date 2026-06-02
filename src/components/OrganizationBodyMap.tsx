import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Workflow, 
  Cpu, 
  BarChart3, 
  Eye, 
  Heart, 
  Database, 
  Globe, 
  ShieldCheck, 
  Anchor, 
  HelpCircle,
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight,
  Sparkles,
  DollarSign,
  Scale,
  Users,
  Fingerprint,
  Zap,
  CheckCircle2,
  FileText,
  Clock,
  ExternalLink
} from 'lucide-react';

interface OrganizationBodyMapProps {
  t: (fa: string, en: string) => string;
  lang: 'fa' | 'en';
  allTasks: any[];
}

interface OrganData {
  id: string;
  titleFa: string;
  titleEn: string;
  subFa: string;
  subEn: string;
  tools: string[];
  descFa: string;
  descEn: string;
  insightFa: string;
  insightEn: string;
  gridArea: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  colorClass: {
    bg: string;
    border: string;
    text: string;
    hover: string;
    glow: string;
    fill: string;
  };
  connectedAssetId?: string;
  connectedTasks?: string[];
}

export const OrganizationBodyMap = ({ t, lang, allTasks }: OrganizationBodyMapProps) => {
  const [selectedKey, setSelectedKey] = useState<string>('brain');

  const organs: Record<string, OrganData> = useMemo(() => ({
    brain: {
      id: 'brain',
      titleFa: 'قشر خاکستری — AI Decision Engines',
      titleEn: 'Grey Matter — AI Decision Engines',
      subFa: 'موتورهای تصمیم‌گیری هوشمند کل سازمان VEDESIA',
      subEn: 'Autonomous decision-making kernels across inventory and pricing',
      tools: ['Pricing AI', 'Marketing AI', 'Supply AI', 'Production AI', 'Risk AI', 'Lead Matching'],
      descFa: 'این بخش به مثابه قشر تصمیم‌گیرنده کورتکس مغز عمل می‌کند که در آن مدل‌های هوش مصنوعی مستقلاً پیشنهادهای کالیبره‌شده تالیف، کنترل بهینه کاتالوگ، تخصیص بهینه خط تامین و پیش‌بینی ریسک را به صورت همزمان پردازش و ارائه می‌کنند.',
      descEn: 'Acts as the primary cerebral cortex where localized AI models run independent calculations, validating marketing yield, production output bottlenecks, and real-time risk predictions.',
      insightFa: 'تأکید جدی بر لایه شفافیت تصمیمات (Explainable AI). سیستم باید دلایل محاسباتی خود را به زبان طبیعی برای هیئت مدیره تشریح کند.',
      insightEn: 'Mandatory inclusion of AI Explainability layers. Decisions must generate audit stories to foster C-suite trust rather than a black-box approach.',
      gridArea: 'brain',
      icon: Brain,
      colorClass: {
        bg: 'bg-indigo-950/40',
        border: 'border-indigo-500/30',
        text: 'text-indigo-400',
        hover: 'hover:border-indigo-400/60',
        glow: 'shadow-indigo-500/20',
        fill: '#4f46e5'
      },
      connectedAssetId: 'MARKET_INTELLIGENCE',
      connectedTasks: ['t158', 't159']
    },
    ml: {
      id: 'ml',
      titleFa: 'نیمکره چپ — Machine Learning',
      titleEn: 'Left Hemisphere — Machine Learning',
      subFa: 'یادگیری محاسباتی و داده‌محوری',
      subEn: 'Statistical computational core and MLOps',
      tools: ['Azure ML', 'TensorFlow', 'MLOps', 'Scikit-Learn', 'Feature Store'],
      descFa: 'نیمکره چپ بر منطق، آمار و تجزیه و تحلیل ساختاریافته تمرکز دارد. با هر رفتار معماران، سفارش‌ها، مشخصه‌های SKU و زمان انتظار، الگوریتم‌ها آموزش‌های تکرارشونده دریافت کرده و دقت محاسباتی را به‌روز می‌کنند.',
      descEn: 'Focuses on structured mathematical modeling, quantitative calculations, and asset classification. Iteratively trains and refines predictions based on pattern data.',
      insightFa: 'استقرار خط لوله یکپارچه داده (ETL) از واجبات است؛ داده‌های خام کارخانه‌ها بدون کلاسیفایر قابلیت پردازش ندارند.',
      insightEn: 'Establishing a robust automated MLOps pipeline is vital; raw streaming files require structured schema processing before scoring.',
      gridArea: 'brain_l',
      icon: Cpu,
      colorClass: {
        bg: 'bg-teal-950/40',
        border: 'border-teal-500/30',
        text: 'text-teal-400',
        hover: 'hover:border-teal-400/60',
        glow: 'shadow-teal-500/20',
        fill: '#0d9488'
      },
      connectedAssetId: 'DATA_INFRASTRUCTURE'
    },
    xr: {
      id: 'xr',
      titleFa: 'نیمکره راست — XR/VR/AR/MR',
      titleEn: 'Right Hemisphere — XR/VR/AR/MR',
      subFa: 'تخیل، ادراک بصری و تجسم فضایی لوکس',
      subEn: 'Spatial Computing, Interactive Holographics & XR',
      tools: ['ARKit', 'ARCore', 'Matterport SDK', 'Apple Vision Pro', 'Threekit 3D'],
      descFa: 'بخش خلاقیت و تجسم فضایی سازمان. این سیستم به معماران تراز اول بین‌المللی اجازه می‌دهد تا کالیته‌های سنگی و سرامیک‌های تزئینی را پیش از تولید فیزیکی، در فضاهای شبیه‌سازی شده لوکس به صورت هولوگرافیک تجربه کنند.',
      descEn: 'The aesthetic and structural visual engine. Helps UHNWI designers render and view hollow porcelain Cobogo-like blocks and detailed block structures seamlessly in virtual spaces or showrooms.',
      insightFa: 'استقرار اپلیکیشن‌های پیشرفته بر روی Apple Vision Pro گام بعدی تثبیت پیشتازی لوکس برند VEDESIA خواهد بود.',
      insightEn: 'Spatial Computing with next-gen headwear is the ultimate branding spearhead for elite architecture studio presentations.',
      gridArea: 'brain_r',
      icon: Sparkles,
      colorClass: {
        bg: 'bg-rose-950/40',
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        hover: 'hover:border-rose-400/60',
        glow: 'shadow-rose-500/20',
        fill: '#e11d48'
      },
      connectedAssetId: 'MILAN_SHOWROOM',
      connectedTasks: ['t232', 't111']
    },
    bi: {
      id: 'bi',
      titleFa: 'تالاموس — Business Intelligence (BI)',
      titleEn: 'Thalamus — Business Intelligence (BI)',
      subFa: 'دروازه آگاهی همه‌جانبه تجاری و داشبوردها',
      subEn: 'Consolidated commercial insight gateway & streaming telemetry',
      tools: ['Power BI', 'Tableau Desktop', 'Looker Studio', 'Azure Telemetry'],
      descFa: 'تالاموس شاهراه حسی است که تمام ورودی‌های اطلاعاتی از انبار، شوروم، کارخانه، وب‌سایت و تیم‌های فروش را یکپارچه کرده و نمایی کریستالی از وضعیت سلامت شرکت را در داشبوردهای زنده به مدیر ارشد نشان می‌دهد.',
      descEn: 'The sensory relay station of the business. Aggregates streaming telemetry across the global showroom footprint, CRM, factory OEE metrics, and logistics pipelines.',
      insightFa: 'استفاده از هوش زمان‌واقعی (Real-time Streaming) به وسیله Kafka برای پایش زنده وضعیت کوره‌ها و حرکت کشتی‌ها ضروری است.',
      insightEn: 'Transitioning to live real-time telemetry pipelines guarantees immediate anomaly and opportunity alerts before local shifts compile.',
      gridArea: 'thalamus',
      icon: BarChart3,
      colorClass: {
        bg: 'bg-blue-950/40',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        fill: '#2563eb'
      },
      connectedAssetId: 'MARKET_INTELLIGENCE',
      connectedTasks: ['t158']
    },
    predict: {
      id: 'predict',
      titleFa: 'حس ششم — Predictive Analytics',
      titleEn: 'Sixth Sense — Predictive Analytics',
      subFa: 'پیش‌بینی و آینده‌نگری هوشمند',
      subEn: 'Demand forecasting & anomaly detection models',
      tools: ['Azure ML Forecasting', 'Meta Prophet', 'Anomaly Detection Core'],
      descFa: 'این لایه با تحلیل سری‌های زمانی به ما می‌گوید کدام بافت یا رنگ سرامیک در ۴ ماه آینده پرتقاضاترین خواهد بود، چه معمارانی آماده عقد قرارداد فاز اجرای پروژه هستند و کدام بخش‌های لجستیکی احتمال بروز مشکل دارند.',
      descEn: 'Advanced pattern tracking layer forecasting product demand shifts, identifying high-propensity VIP buyers, and executing predictive machinery maintenance.',
      insightFa: 'این حس در سال اول به دلیل کمبود تراکنش فیزیکی ضعیف است و با انباشت داده در سال دوم به اوج دقت خود می‌رسد.',
      insightEn: 'Inherent cold-start limitations in predictive modeling mean accuracy scales exponentially as verified dataset volumes mount in Year 2.',
      gridArea: 'predictive',
      icon: Activity,
      colorClass: {
        bg: 'bg-violet-950/40',
        border: 'border-violet-500/30',
        text: 'text-violet-400',
        hover: 'hover:border-violet-400/60',
        glow: 'shadow-violet-500/20',
        fill: '#7c3aed'
      },
      connectedAssetId: 'SEO_GROWTH'
    },
    listen_l: {
      id: 'listen_l',
      titleFa: 'گوش چپ — Voice of Customer',
      titleEn: 'Left Ear — Voice of Customer',
      subFa: 'شنود سیستماتیک نیت‌ها و علایق خریداران',
      subEn: 'B2B Client Intent & Feed Listening Engines',
      tools: ['Qualtrics Enterprise', 'Hotjar Heatmaps', 'NPS Automations', 'VIP Survey Core'],
      descFa: 'شنود مستقیم و سیستماتیک ترجیحات معماران لوکس و مالکان خانه‌های رویایی. دلیل سفارشات، نقدهای پنهان و الگوهای جستجوی کاربران مستقیماً به لایه طراحی محصول تزریق می‌شود.',
      descEn: 'Captures direct architect feedback, satisfaction metrics, search behavior, and qualitative review markers globally.',
      insightFa: 'فرآیند شنود باید خودکار باشد و گزارش‌های تجمیعی هفته‌ای در جلسه بازاریابی خوانده شود.',
      insightEn: 'Structuring regular feedback loops drives faster catalog refinements with direct B2B impact.',
      gridArea: 'listen_l',
      icon: HelpCircle,
      colorClass: {
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        hover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        fill: '#059669'
      },
      connectedAssetId: 'CRM_SYSTEM'
    },
    listen_r: {
      id: 'listen_r',
      titleFa: 'گوش راست — Social & Trend Listening',
      titleEn: 'Right Ear — Social & Trend Listening',
      subFa: 'رصد هوشمند بازار جهانی سطوح لوکس',
      subEn: 'Competition benchmark & Global trends monitor',
      tools: ['Brandwatch AI', 'Mention Analytics', 'SEMrush Insight', 'Dezeen Scraper'],
      descFa: 'رصد مداوم اقدامات رقبای ایتالیایی مانند Florim و Marazzi، تغییرات ترندها در نمایشگاه‌های بین‌المللی نظیر Cersaie و بررسی نقاط قوت کمپین‌های برندسازی لوکس در پلتفرم‌های تخصصی.',
      descEn: 'Tracks competitor catalog expansions, key media coverage, design-week mentions, and design forum trends.',
      insightFa: 'تثبیت خودکار واژگان ترجیحی معماران به تولید‌کنندگان محتوای کاتالوگ‌های فنی برند کمک شایانی می‌کند.',
      insightEn: 'Scraping localized architectural terminology optimizes copy engines for regional landing pages.',
      gridArea: 'listen_r',
      icon: Globe,
      colorClass: {
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        hover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        fill: '#059669'
      },
      connectedAssetId: 'PR_SYSTEM'
    },
    eyes: {
      id: 'eyes',
      titleFa: 'چشم‌ها — Computer Vision AI & sensors',
      titleEn: 'Eyes — Computer Vision AI & Sensors',
      subFa: 'پردازش تصویر و حرکت‌سنجی هوشمند',
      subEn: 'Visual intelligence for physical showroom & factory inspect',
      tools: ['Computer Vision AI', 'Showroom Heatmaps', 'Factory QC Vision', 'Spatial Cameras'],
      descFa: 'شامل دوربین‌های فوق هوشمند در شوروم میلان برای تحلیل بدون هویت مسیر مراجعین (کدام کلکسیون جذاب‌ترین چیدمان را داشته است؟) و همچنین سیستم کنترل کیفیت خودکار (QC) تایل‌های سرامیک در کارخانه.',
      descEn: 'Monitors movement paths within showrooms to compute spatial layout performance while automating flawless visual QC inspections on the factory floor.',
      insightFa: 'رعایت تام استانداردهای فدرال حفاظت از داده (GDPR) در میلان از ضرورت‌های اولیه راه‌اندازی سنسورها است.',
      insightEn: 'Enforcing strictly anonymized camera data safeguards compliance with localized privacy (GDPR) mandates.',
      gridArea: 'eyes',
      icon: Eye,
      colorClass: {
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        hover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        fill: '#059669'
      },
      connectedAssetId: 'PRODUCT_STANDARDS',
      connectedTasks: ['t110']
    },
    nose: {
      id: 'nose',
      titleFa: 'بینی — IoT Telemetry & Scent Orchestration',
      titleEn: 'Nose — IoT Telemetry & Scent Orchestration',
      subFa: 'پایش سنسورها و پخش هوشمند رایحه برند',
      subEn: 'Scent triggers & high-accuracy temperature sensors',
      tools: ['Production IoT Sensors', 'Showroom Aroma Control', 'Humidity Monitor', 'Vibration Sensors'],
      descFa: 'این لایه دو وجه دارد: ۱. پایش بلادرنگ دما و فشار کوره‌های پرسلان کارخانه ایران برای تضمین بالاترین کیفیت فیزیکی تایل‌ها. ۲. پخش تطبیقی و هوشمند رایحه‌های جنگلی و مدیترانه‌ای اختصاصی Vedesia در شوروم میلان.',
      descEn: 'A dual-action system: monitors real-time thermodynamic variables in ceramic firing kilns, while managing local custom-scented ambient vaporizers in flagship galleries.',
      insightFa: 'هوشمندسازی رایحه بر اساس تعداد بازدیدکنندگان شلوغی فضا، تجربه حسی بی‌نظیری خلق می‌کند.',
      insightEn: 'Modulating brand scent intensity based on active footfall density elevates emotional premium recall.',
      gridArea: 'nose',
      icon: Activity,
      colorClass: {
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        hover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        fill: '#059669'
      },
      connectedAssetId: 'MILAN_SHOWROOM',
      connectedTasks: ['t231']
    },
    chatbot: {
      id: 'chatbot',
      titleFa: 'دهان و زبان — AI Chatbot & Agent',
      titleEn: 'Mouth & Tongue — AI Chatbot & Agent',
      subFa: 'دستیار شبانه‌روزی تعاملی با معماران',
      subEn: 'Conversational AI & 24/7 client assistant',
      tools: ['Gemini Pro API', 'LangChain Framework', 'Vector Database RAG', 'Multi-Language Support'],
      descFa: 'دهان برند که برای پاسخ به سوالات پیچیده فنی معماران، ارائه گواهینامه‌های کاتالوگ و زمان‌بندی جلسات به ۶ زبان زنده دنیا به صورت ۲۴ ساعته بر روی وب‌سایت فعال است.',
      descEn: 'The core client-facing conversational gateway. Understands complex engineering questions on block ratings, loading metrics, and registers meeting requests instantly.',
      insightFa: 'سیستم لزوماً باید قابلیت ارجاع هوشمند به مدیران فروش فیزیکی (Human Handoff) را داشته باشد.',
      insightEn: 'Failsafe protocols must trigger live agent transfer to CRM managers when conversational intent shifts to pricing requests.',
      gridArea: 'mouth',
      icon: Workflow,
      colorClass: {
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        hover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        fill: '#059669'
      },
      connectedAssetId: 'WEBSITE_SYSTEM',
      connectedTasks: ['t56']
    },
    showroom_face: {
      id: 'showroom_face',
      titleFa: 'چهره — دکوراسیون و شوروم فیزیکی',
      titleEn: 'Face — Flagship Showrooms',
      subFa: 'نماد حضور فیزیکی با چیدمان لوکس',
      subEn: 'Pristine 2000sqm Milan & 1500sqm Toronto flagship layout',
      tools: ['Lighting Orchestror', 'Matterport Virtual View', 'Interactive Demos', 'Spatial Sound'],
      descFa: 'شوروم عظیم میلان (۲,۰۰۰ متر مربع) و تورنتو (۱,۵۰۰ متر مربع) چهره فیزیکی و تجسمی VEDESIA هستند. هر چیدمان، میزانسن نور و موزیک تعاملی این فضاها منعکس‌کننده روح کمال‌گرای برند است.',
      descEn: 'Flagship physical spaces designed to envelop premium clients in real architectural scales, offering custom design consultancy.',
      insightFa: 'هر ۴ ماه گالری موضوعی با کلکسیون‌های جدید هماهنگ بازآرایی شود و به معماران برتر VIP اطلاع داده شود.',
      insightEn: 'Enforce scheduled gallery layout rotations every 4 months to maintain recurring VIP footfall interest.',
      gridArea: 'showroom_face',
      icon: Eye,
      colorClass: {
        bg: 'bg-rose-950/40',
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        hover: 'hover:border-rose-400/60',
        glow: 'shadow-rose-500/20',
        fill: '#e11d48'
      },
      connectedAssetId: 'MILAN_SHOWROOM',
      connectedTasks: ['t108', 't110']
    },
    skin: {
      id: 'skin',
      titleFa: 'پوست — Brand Touchpoints & Portals',
      titleEn: 'Skin — Brand Touchpoints & Portals',
      subFa: 'نقاط تماس دیجیتال و یکپارچگی حسی برند Vedesia',
      subEn: 'Website, iOS app, NFC tags, BIM Portal, Luxury Samples',
      tools: ['vedesia.com Platform', 'iOS/Android Apps', 'NFC Smart Chip Set', 'Architect BIM Portal', 'Email Signature'],
      descFa: 'پوست بیرونی‌ترین بخش ارگانیسم است که وظیفه حفاظت و برقراری ارتباط با جهان خارج را دارد. هر صفحه وب، اپلیکیشن، برچسب‌های NFC روی کالیته‌ها و دفترچه‌های کاتالوگ، نقش یک حسگر حسی هماهنگ را برای کاربر بازی می‌کنند.',
      descEn: 'The enveloping sensor layer. Ensures consistent premium typography, custom color palette grids, and tactile precision across digital, print, and physical samples.',
      insightFa: 'کوچکترین ناهمگونی بصری در پوست برند، ارزش لوکس بودن را در ذهن ناظر مخدوش می‌کند.',
      insightEn: 'Brand credibility hinges on design system cohesion. Any mismatch between sample boxes and websites dilutes luxury brand valuation.',
      gridArea: 'skin',
      icon: Layers,
      colorClass: {
        bg: 'bg-rose-950/40',
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        hover: 'hover:border-rose-400/60',
        glow: 'shadow-rose-500/20',
        fill: '#f43f5e'
      },
      connectedAssetId: 'WEBSITE_SYSTEM',
      connectedTasks: ['t28', 't56']
    },
    dam: {
      id: 'dam',
      titleFa: 'حافظه تصویری — DAM Hub',
      titleEn: 'Visual Memory — DAM Hub',
      subFa: 'ذخیره هوشمند و اختصاصی تصاویر باکیفیت',
      subEn: 'Asset Management for flawless 3D/CGI outputs',
      tools: ['Cloudinary DAM', 'Bynder Enterprise', 'Canto Assets Metadata'],
      descFa: 'ذخیره‌سازی هوشمند و متمرکز کل دارایی‌های دیجیتال بصری شامل رندرهای سه بعدی CGI سنگ مرمر، تصاویر کاتالوگ لوکس و لوپ‌های ویدئویی با رزولوشن فوق‌العاده بالا برای استفاده آنی وب‌سایت و رسانه‌ها.',
      descEn: 'Establishes a centralized digital asset repository containing raw ultra-high-resolution files, verified press packages, and architectural templates.',
      insightFa: 'این هاب باید مستقیماً به PIM متصل باشد تا با ویرایش دارایی کاتالوگ وب‌سایت نیز به‌روز شود.',
      insightEn: 'Directly syncs to PIM so specifying an asset triggers automatic distribution across spatial mapping engines.',
      gridArea: 'memory_dam',
      icon: Database,
      colorClass: {
        bg: 'bg-blue-950/40',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        fill: '#2563eb'
      },
      connectedAssetId: 'CATALOG_SYSTEM',
      connectedTasks: ['t49']
    },
    pim: {
      id: 'pim',
      titleFa: 'حافظه مشخصات فنی — PIM System',
      titleEn: 'Product Spec Memory — PIM System',
      subFa: 'پایگاه مشخصات محصولات و متریال‌ها',
      subEn: 'Single source of truth for architectural parameters',
      tools: ['Akeneo Enterprise', 'Pimcore Integration', 'Inriver Cloud API'],
      descFa: 'حافظه مرکزی برای آرشیو داده‌های تایید شده تمام کلکسیون‌ها: طبقه‌بندی ابعاد بلوک‌های کوبوگو، ضخامت‌ها، میزان جذب آب، مقاومت مکانیکی در برابر فرسایش و استانداردهای پایداری محیط زیستی LEED.',
      descEn: 'The categorical archive maintaining dimensions, water absorption, mechanical thresholds, and chemical ratings for every single catalog block asset.',
      insightFa: 'PIM باید منبع قطعی تمام داده‌ها باشد؛ ورود دستی مشخصات فنی در پنل‌های متفرقه ممنوع است.',
      insightEn: 'Enforces strict single-source schema constraints, eliminating copy discrepancies on web details or dealer spec books.',
      gridArea: 'memory_pim',
      icon: Database,
      colorClass: {
        bg: 'bg-blue-950/40',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        fill: '#2563eb'
      },
      connectedAssetId: 'PRODUCT_STANDARDS'
    },
    crm: {
      id: 'crm',
      titleFa: 'حافظه مشتریان — HubSpot CRM',
      titleEn: 'Client History — HubSpot CRM',
      subFa: 'ثبت تمام مکاتبات و سوابق سازندگان تراز اول',
      subEn: 'Clienteling history, interactions pipeline and dealer tracking',
      tools: ['HubSpot Enterprise CRM', 'Deals Pipeline API', 'Clienteling Mobile App'],
      descFa: 'این هاب اطلاعاتی تاریخچه تک تک تعاملات، دانلودهای نقشه BIM، ملاقات‌ها در شوروم میلان و اولویت‌های متریال معماران مشهور را آرشیو می‌کند تا تجربه کلاینت کلافی شخصی‌سازی‌شده باشد.',
      descEn: 'Stores historic transaction events, private showroom tours, BIM file retrieval timestamps, and custom project specifications in unified VIP cards.',
      insightFa: 'ارائه دسترسی تبلت به آرشیتکت منیجرها به محض ورود بازدیدکننده‌ای که RSVP دارد، سرعت خدمات را بهینه می‌کند.',
      insightEn: 'Equipping showroom concierge managers with direct CRM dashboard tablets ensures impeccable VIP greetings.',
      gridArea: 'memory_crm',
      icon: Database,
      colorClass: {
        bg: 'bg-blue-950/40',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        fill: '#2563eb'
      },
      connectedAssetId: 'CRM_SYSTEM'
    },
    cdp: {
      id: 'cdp',
      titleFa: 'حافظه رفتاری — Customer Data Platform (CDP)',
      titleEn: 'Behavior Memory — Customer Data Platform (CDP)',
      subFa: 'تحلیل آنی رفتار بازدیدکنندگان در بسترهای دیجیتال و فیزیکی',
      subEn: 'Unified behavioral identity mapping across digital & physical touchpoints',
      tools: ['Segment Twilio', 'Lytics ID Matcher', 'Data Pipeline Segment'],
      descFa: 'لینک کردن ایمیل خوانده شده، رفتار وب‌سایت، محصول اسکن شده با تراشه NFC در شوروم و دانلودها در یک گلدن کارت اختصاصی. این داده به ما می‌گوید معمار بر روی چه حوزه‌ای متمرکز است.',
      descEn: 'Consolidates disjointed digital metrics with physical physical showrooms footprints into one single user intent profile.',
      insightFa: 'CDP سوخت اصلی تالیف کمپین‌های خودکار ارسال سمپل و کاتالوگ (Automation) است.',
      insightEn: 'Feeding CRM lead pipelines with dynamic CDP interest categories increases VIP conversion up to 300%.',
      gridArea: 'memory_cdp',
      icon: Database,
      colorClass: {
        bg: 'bg-blue-950/40',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        fill: '#2563eb'
      },
      connectedAssetId: 'CRM_SYSTEM',
      connectedTasks: ['t62']
    },
    mdm: {
      id: 'mdm',
      titleFa: 'مرجع مرشد — Master Data Management (MDM)',
      titleEn: 'Golden Ledger — Master Data Management (MDM)',
      subFa: 'مدیریت و یکپارچه‌سازی فراداده‌های ارزشمند شرکت',
      subEn: 'Consistent enterprise dictionary across international nodes',
      tools: ['Reltio Enterprise', 'Informatica MDM Cloud', 'Semantic Hub Config'],
      descFa: 'این سیستم تطابق کامل دیتا را تضمین می‌کند تا کدهای محصول، مشخصات مشتری و لیست پروژه‌ها در شعب کانادا، ایتالیا و کارخانه ایران مشابه و صددرصد همگام باشد.',
      descEn: 'Guarantees standard metadata parameters, synchronizing SKU codification, agency lists, and multi-currency exchange matrixes between the Canada HQ, Milan showroom, and Iranian mills.',
      insightFa: 'جلوگیری شدید از ثبت چندگانه کدهای تکراری؛ ترمیم کثیفی‌های داده پس از دوره فعال‌سازی گران و خسته‌کننده است.',
      insightEn: 'Enforcing MDM strictness from Day 1 eliminates standard operational data leakage in multi-entity structures.',
      gridArea: 'memory_mdm',
      icon: Database,
      colorClass: {
        bg: 'bg-blue-950/40',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        fill: '#2563eb'
      },
      connectedAssetId: 'DATA_INFRASTRUCTURE'
    },
    km: {
      id: 'km',
      titleFa: 'حافظه بلندمدت — Knowledge Management (KM)',
      titleEn: 'Long-term Memory — Knowledge Management (KM)',
      subFa: 'آرشیو استراتژیک دانش فنی، فرمول‌ها و تجارب سازمانی',
      subEn: 'SOPs, glaze engineering formulas, and executive playbooks',
      tools: ['Atlassian Confluence', 'Notion Teamspace', 'LMS Onboarding Hub'],
      descFa: 'آرشیو مستندات، کتابچه گایدلاین‌های بصری و متنی، فرمولاسیون فیزیکوشیمیایی لعاب‌ها و مستندات نصب خشک سرامیک توسط استادکاران برای رشد مستمر کار تیمی و نمایندگان.',
      descEn: 'Preserves technical installation guidelines, standard operating procedures (SOPs), proprietary chemical glazing formulas, and brand manuals.',
      insightFa: 'دیجیتالی کردن تجارب استادکاران سرامیک پیش از دوران بازنشستگی گامی بزرگ برای پایداری کیفیت Vedesia است.',
      insightEn: 'Digitally mapping aging artisan tile-glaze knowledge protects VEDESIA asset security from chemical composition drift.',
      gridArea: 'memory_km',
      icon: Database,
      colorClass: {
        bg: 'bg-blue-950/40',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        fill: '#2563eb'
      },
      connectedAssetId: 'TRAINING_SYSTEM'
    },
    showroom_mem: {
      id: 'showroom_mem',
      titleFa: 'موزه تاریخی برند — Showroom Heritage',
      titleEn: 'Showroom Heritage & Archive',
      subFa: 'پیشینه تجربی و آرشیو فیزیکی لوکس',
      subEn: 'Physical archive of iconic historical custom editions & prestige rewards',
      tools: ['Archive Cabinets', 'Prestige Awards Show', 'Storytelling Kiosk', 'Milano Historic Dossier'],
      descFa: 'اینجا کاتالوگ فیزیکی سنگ‌ها، جوایز طراحی معتبر برند، کلکسیون‌های دست‌ساز هنری D7 و نسخه‌های بسیار محدود سنگی به عنوان سند هویت اصیل برند آرشیو شده‌اند.',
      descEn: 'Stores historic visual catalogs, design medallions, limited artisanal editions, and select ceramic tile molds to emphasize authenticity.',
      insightFa: 'حفظ و ارائه مستندات فیزیکی به معماران کلاسیک، حس اصالت و قدمت کارهای برند را عمیق‌تر القا می‌کند.',
      insightEn: 'Showcasing old visual swatches validates structural longevity and artistic heritage to boutique architectural consultants.',
      gridArea: 'memory_showroom',
      icon: Anchor,
      colorClass: {
        bg: 'bg-teal-950/40',
        border: 'border-teal-500/30',
        text: 'text-teal-400',
        hover: 'hover:border-teal-400/60',
        glow: 'shadow-teal-500/20',
        fill: '#0f6e56'
      },
      connectedAssetId: 'MILAN_SHOWROOM'
    },
    erp: {
      id: 'erp',
      titleFa: 'ستون فقرات — ERP Core',
      titleEn: 'Spine — ERP Core',
      subFa: 'پشتیبان عملیاتی و کنترل مرکزی منابع کل سازمان',
      subEn: 'Microsoft Dynamics 365, fiscal integrity, production runs',
      tools: ['Microsoft Dynamics 365', 'Corporate Ledger Modules', 'Asset Inventory APIs', 'HR Management Core'],
      descFa: 'ستون فقرات سازمان که تمام موجودیت‌های فرعی را پایداری می‌بخشد. بدون ستون فقرات، مغز (AI) محلی برای مخابره فرمان‌ها به عضلات (کارخانه و ترابری) نخواهد داشت. تمام زنجیره‌ها به این مرکز وصل هستند.',
      descEn: 'The core infrastructure backing operational transactions. Provides the structural backbone linking global dealer accounting, mill output files, and CAD/BIM registry databases.',
      insightFa: 'ضرورت مطلق معماری API-First. یک لایه ارتباطی چابک مانع از فلج شدن ERP در ارتباطات مکرر خواهد بود.',
      insightEn: 'Mandatory focus on open API connectivity interfaces to make sure the ERP system stays modular and scalable.',
      gridArea: 'spine',
      icon: Activity,
      colorClass: {
        bg: 'bg-neutral-900/60',
        border: 'border-neutral-500/30',
        text: 'text-neutral-400',
        hover: 'hover:border-neutral-400/60',
        glow: 'shadow-neutral-500/20',
        fill: '#404040'
      },
      connectedAssetId: 'DATA_INFRASTRUCTURE'
    },
    marketing: {
      id: 'marketing',
      titleFa: 'قلب تپنده — Marketing & PR',
      titleEn: 'The Beating Heart — Marketing & PR',
      subFa: 'جریان خون کمپین‌ها و تولید روابط لوکس تجاری',
      subEn: 'Global campaign management, press communications & luxury positioning',
      tools: ['HubSpot Campaign Hub', 'Brand Book Guidelines', 'PR Agencies Network', 'Creative Assets Pipeline'],
      descFa: 'تزریق‌کننده همیشگی خون، انرژی و لیدهای باکیفیت تجاری به اندام ارگانیسم Vedesia. تبلیغات خلاق، برندسازی دقیق لوکس و ارتباط با جراید و مجلات تخصصی معماری، ضربان قلب هولدینگ هستند.',
      descEn: 'The active pulse generating design demand, catalog downloads, and elite showroom reservations. Maintains high-level global PR coverage with luxury architectural media.',
      insightFa: 'استمرار رمز پیروزی است؛ توقف کمپین‌ها مثل توقف تپش قلب، لیدهای باکیفیت را در نطفه می‌خشکاند.',
      insightEn: 'Consistency is essential in brand recall. Halting branding campaigns instantly starves downstream showroom pipelines.',
      gridArea: 'marketing_l',
      icon: Heart,
      colorClass: {
        bg: 'bg-rose-950/40',
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        hover: 'hover:border-rose-400/60',
        glow: 'shadow-rose-500/20',
        fill: '#e11d48'
      },
      connectedAssetId: 'PR_SYSTEM'
    },
    automation: {
      id: 'automation',
      titleFa: 'سیستم عصبی خودکار — Marketing Automation',
      titleEn: 'Autonomous Nervous System — Marketing Automation',
      subFa: 'واکنش‌های غریزی و هوشمند به لیدها',
      subEn: 'Dynamic drip sequences, automatic architect qualification and scoring',
      tools: ['HubSpot Workflows', 'Client Qualification Automator', 'Dynamic Mail Sequences', 'NFC Trigger Scripts'],
      descFa: 'بخشی که بدون درگیر کردن انرژی هیئت مدیره کار می‌کند. به محض کلیک معمار روی دکمه دانلود مدل سه‌بعدی سنگ مروارید، سناریو فعال شده، کپی فنی به ایمیل ارسال گردیده و سمپل‌بوک چرمی رزرو می‌شود.',
      descEn: 'Operates behind the scenes, triggering automatic email content, scoring architect behavior, and alerting sales reps to ship leather swatch boxes based on high lead tier classifications.',
      insightFa: 'فرکانس ایمیل‌ها باید به شدت معتدل و متین تنظیم شود تا کلاس برند در سطح Ultra-Luxury تخریب نشود.',
      insightEn: 'Calibrate automated dispatch intervals with luxury conservatism to eliminate spam appearance.',
      gridArea: 'marketing_sys',
      icon: Workflow,
      colorClass: {
        bg: 'bg-rose-950/40',
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        hover: 'hover:border-rose-400/60',
        glow: 'shadow-rose-500/20',
        fill: '#991b1b'
      },
      connectedAssetId: 'MARKETING_OPERATIONS',
      connectedTasks: ['t35', 't62']
    },
    api: {
      id: 'api',
      titleFa: 'سیستم عصبی محیطی — API & Middlewares',
      titleEn: 'Central Nervous System — API & Middlewares',
      subFa: 'انتقال سریع سیگنال‌های اطلاعاتی بین ارگان‌ها',
      subEn: 'iPaaS solutions, custom REST webhooks, and secure database pathways',
      tools: ['Make.com Enterprise', 'REST Webhooks Config', 'Azure Service Bus', 'API Gateway Service'],
      descFa: 'شاهراه‌های انتقال سریع سیگنال میان سیستم‌ها. برای مثال، اسکن سنسور RFID یک بلوک کوبوگو در میلان در کمتر از ۵۰۰ میلی‌ثانیه اطلاعات تفصیلی متریال بازتاب‌دهنده را روی تبلت مهندس طراح لود می‌کند.',
      descEn: 'Coordinates quick message delivery across isolated entities. An NFC scan in Milan relays contextual block properties to the CRM client card in real-time.',
      insightFa: 'امنیت و پایداری لایه میانی (iPaaS) باید به طور مستمر در برابر حملات سایبری پایش شود.',
      insightEn: 'Strict downtime checks must protect the integration bus against loss of real-time showroom footprint records.',
      gridArea: 'api_r',
      icon: Zap,
      colorClass: {
        bg: 'bg-neutral-900/40',
        border: 'border-neutral-500/30',
        text: 'text-neutral-400',
        hover: 'hover:border-neutral-400/60',
        glow: 'shadow-neutral-500/20',
        fill: '#525252'
      },
      connectedAssetId: 'DATA_INFRASTRUCTURE'
    },
    factory: {
      id: 'factory',
      titleFa: 'دستگاه گوارش — خطوط کارخانجات',
      titleEn: 'Digestive Engine — Production Lines',
      subFa: 'تبدیل مواد اولیه معدنی خام به بلوک‌های توخالی پرسلانی کوبوگو',
      subEn: 'Clay and quartz processing to high-end Cobogo hollow blocks',
      tools: ['MES Line Schedulers', 'IoT Kiln Thermometers', 'QC Vision Scanners', 'Iran Mill 20,000sqm/day'],
      descFa: 'اینجا همان محلی است که مواد اولیه فیزیکی خام معدنی (خاک رس، کائولن، کوارتز) تحت فشار فوق‌العاده بالا و دمای کوره‌ای ۱۲۵۰ درجه فشرده گردیده و به شاهکارهای مهندسی با مقاومت فیزیکی ابدی تبدیل می‌شوند.',
      descEn: 'The core brick-and-mortar mills in Iran capable of processing bulk minerals into high-end hollow Cobogo-like blocks under high thermodynamic tension.',
      insightFa: 'پیاده‌سازی مکانیزم‌های بازیابی انرژی مانیتور شده باعث کاهش شدید آلایندگی و تطابق با شعار پایداری محیط زیستی می‌شود.',
      insightEn: 'Enforcing recycling loop monitoring on warm air kilns offsets chemical fuel expenditures while meeting European environment ratings.',
      gridArea: 'factory_r',
      icon: Cpu,
      colorClass: {
        bg: 'bg-amber-950/40',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        hover: 'hover:border-amber-400/60',
        glow: 'shadow-amber-500/20',
        fill: '#b45309'
      },
      connectedAssetId: 'PRODUCT_STANDARDS'
    },
    supply: {
      id: 'supply',
      titleFa: 'دستگاه گردش خون — تامین بازرگانی',
      titleEn: 'Circulatory Loop — Supply Chain',
      subFa: 'مدیریت وندورها و تهیه متریال‌های ساخت باکیفیت',
      subEn: 'Raw material procurement, custom quarry vendor registers',
      tools: ['Supplier Portal App', 'Purchase Orders Tracker', 'Freight Broker APIs', 'Supply Pipeline Audits'],
      descFa: 'گردش دائم خون حاوی اکسیژن و مواد مغذی به کل بدن. در اینجا تامین مواد معدنی ممتاز، لعاب‌های تخصصی با بازتاب فوق لاکچری و پالت‌های سنگ طبیعی مرجوعی، بقای عملیاتی تولید را تامین و حفظ می‌کند.',
      descEn: 'Maintains steady supply paths that flow vital resources to the mills. Standardizes vendor listings, shipping lines, and raw quartz import schedules.',
      insightFa: 'ثبت پارتنرهای آلترناتیو برای معادن خاک کائولن از واجبات است تا نوسانات فصلی مانع از چرخه کارخانه نشود.',
      insightEn: 'Enrolling backup quarry operators protects formulation lines against sudden seasonal mineral extraction bans.',
      gridArea: 'supply_l',
      icon: Activity,
      colorClass: {
        bg: 'bg-amber-950/40',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        hover: 'hover:border-amber-400/60',
        glow: 'shadow-amber-500/20',
        fill: '#d97706'
      },
      connectedAssetId: 'GLOBAL_EXPANSION'
    },
    culture: {
      id: 'culture',
      titleFa: 'روح سازمانی — AI Ethics & Security',
      titleEn: 'Brand Culture & Security Core',
      subFa: 'اصول رفتاری، اخلاقیات داده و حریم خصوصی کلاینت‌ها',
      subEn: 'Client privacy charters, legal compliance standards',
      tools: ['GDPR Shield Module', 'Client Privacy Charter', 'B2B Compliance Handbooks', 'Secured IP Vaults'],
      descFa: 'ماورای ساختارهای ماشینی، Vedesia واجد اخلاقیات و استانداردهای حرفه‌ای است. محافظت مطلق از طرح‌های ساختمانی معماران، مبارزه با داده‌ربایی و التزام کتبی به رفتارهای شفاف تجاری، هویت متعالی شرکت است.',
      descEn: 'Instills integrity beyond core automated systems. Safens intellectual property and secures architect floor plans under rigid legal structures.',
      insightFa: 'بیانیه اخلاقی داده‌ای در وب‌سایت، حسن ظن مشتری فوق ثروتمند را دوچندان جلب خواهد کرد.',
      insightEn: 'Featuring strict legal IP storage declarations in VIP brochures drives B2B consultant conversions.',
      gridArea: 'culture_r',
      icon: ShieldCheck,
      colorClass: {
        bg: 'bg-neutral-900/40',
        border: 'border-neutral-500/30',
        text: 'text-neutral-400',
        hover: 'hover:border-neutral-400/60',
        glow: 'shadow-neutral-500/20',
        fill: '#404040'
      },
      connectedAssetId: 'MARKETING_OPERATIONS'
    },
    ops: {
      id: 'ops',
      titleFa: 'مرکز ثقل عملیات — PLM & Task Control',
      titleEn: 'Strategic Core — PLM & Task Control',
      subFa: 'محل پایش و هماهنگی پروژه‌های جاری شرکت',
      subEn: 'Corporate tasks, PLM file libraries, team schedules',
      tools: ['Asana Organization', 'PLM Design Hub', 'MS Teams Corporate', 'LMS Seminars', 'Workday'],
      descFa: 'شکم یا لایه میانی سازمان که کنترل و پیشرفت کار تمام و تسک‌های استراتژیک را مانیتور می‌کند. از توسعه محصول جدید در پورتال فیزیکی تا ارجاع کاتالوگ‌های چاپی، همه پروژه‌ها در یک فضا مدیریت می‌شوند.',
      descEn: 'The central task tracking and execution backbone. Connects team schedules, milestones, and collaborative channels directly.',
      insightFa: 'طراحی یکپارچه پورتال همکاران با ابزارهای وظایف عملیاتی کارایی تیم‌های محلی در میلان و تورنتو را تضمین می‌کند.',
      insightEn: 'Syncing executive milestones with active local teams speeds task resolution loops up to 40%.',
      gridArea: 'ops_hub',
      icon: Layers,
      colorClass: {
        bg: 'bg-neutral-900/40',
        border: 'border-neutral-500/30',
        text: 'text-neutral-400',
        hover: 'hover:border-neutral-400/60',
        glow: 'shadow-neutral-500/20',
        fill: '#171717'
      },
      connectedAssetId: 'MARKETING_OPERATIONS'
    },
    employees: {
      id: 'employees',
      titleFa: 'قوای عضلانی — تیم کارکنان هوشمند',
      titleEn: 'Muscular Resource — Personnel Forces',
      subFa: 'نیروهای متعهد و طراحان هنری شعب بین‌المللی',
      subEn: 'Professional showroom reps, CAD experts and factory foremen',
      tools: ['Workday Personnel', 'LMS Training Seminars', 'CAD Specialist Teams', 'Showroom Agents'],
      descFa: 'عضلات فیزیکی که نقشه‌ها را محقق می‌کنند: مدیران شوروم‌های میلان و تورنتو، آرتیست‌های طراح کاتالوگ در ایران، متخصصان مدل‌های سه بعدی BIM و ناظران کیفیت خط عکاسی و تولید.',
      descEn: 'The real-world human resource driving operations. Specialized design groups, sales professionals, and field installation trainers.',
      insightFa: 'سیستم‌های نوین آموزش دیجیتال (LMS) باید تمام نیروهای تازه استخدام را در میلان زیر دو هفته کاملاً آماده کنند.',
      insightEn: 'Enforcing standardized brand onboarding templates accelerates rep performance.',
      gridArea: 'employees_arms',
      icon: Users,
      colorClass: {
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        hover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        fill: '#0f766e'
      },
      connectedAssetId: 'TRAINING_SYSTEM'
    },
    agents: {
      id: 'agents',
      titleFa: 'سفرا و شرکاء — Agent & supplier Network',
      titleEn: 'Partner Alliances — Agent & Supplier Network',
      subFa: 'شبکه بین‌المللی توزیع‌کنندگان و عاملین فروش',
      subEn: 'Global agency portal, GCC delegates and tile dealers',
      tools: ['Agent Portal Cloud', 'Dealer Reward Trackers', 'Supplier Scorecards', 'Joint Marketing Plans'],
      descFa: 'دست‌های پرتوان هولدینگ در بازارهای هدف. شرکای استراتژیک در کشورهای حوزه خلیج فارس (GCC) و کل اروپا که اطلاعات بازار را بلافاصله اسکن کرده و با وفاداری کامل، فروش Vedesia را تضمین می‌کنند.',
      descEn: 'Extends global reach. Specialized European boutique tile agencies and luxury distributors in high-capital zones (GCC, Canada).',
      insightFa: 'پشتیبانی برخط ۲۴ ساعته از طریق پورتال نمایندگان وفاداری دائمی آنها به محصولات ما را بیمه می‌کند.',
      insightEn: 'Providing transparent lead routing maps via secure portal logins ensures lasting dealer alliance growth.',
      gridArea: 'agents_arms',
      icon: Users,
      colorClass: {
        bg: 'bg-teal-950/40',
        border: 'border-teal-500/30',
        text: 'text-teal-400',
        hover: 'hover:border-teal-400/60',
        glow: 'shadow-teal-500/20',
        fill: '#115e59'
      },
      connectedAssetId: 'SALES_ENABLEMENT'
    },
    finance_ops: {
      id: 'finance_ops',
      titleFa: 'مکانیسم تعادل مالی و حقوقی — Flanks',
      titleEn: 'Balance Flanks — Finance & Legal',
      subFa: 'رعایت همگن مالیات و یکپارچگی قوانین تریپله',
      subEn: 'Tax compliance, legal templates and dynamic contract systems',
      tools: ['Fiscal Integrity Systems', 'Multi-Currency Exchange Matrix', 'Legal Template Databases', 'Auto Tax Comply'],
      descFa: 'پهلوی ارگانیسم که تعادل را برقرار می‌کند. تطبیق کامل با ساختارهای حقوقی و مالیاتی در چند محدوده قضایی بزرگ (کانادا به عنوان دفتر مرکزی، ایتالیا برای هویت برند لوکس و خطوط تولید ایران برای کارخانجات).',
      descEn: 'Instills regulatory safety across multiple jurisdictions: Canada (HQ capital balance), Italy (brand and licensing nodes), and Iran (high-efficiency physical tiles extraction).',
      insightFa: 'قیمت‌گذاری انتقالی (Transfer Pricing) میان شعبه‌ها باید از ابتدایی‌ترین مراحل دقیق تنظیم شود تا بروز ممیزی‌های مالیاتی پرهزینه پیشگیری شود.',
      insightEn: 'Rigidly auditing inter-company transfer pricing values guards systemic equity from regulatory taxation audits.',
      gridArea: 'finance_waist',
      icon: Scale,
      colorClass: {
        bg: 'bg-neutral-900/40',
        border: 'border-neutral-500/30',
        text: 'text-neutral-400',
        hover: 'hover:border-neutral-400/60',
        glow: 'shadow-neutral-500/20',
        fill: '#262626'
      },
      connectedAssetId: 'SALES_ENABLEMENT'
    },
    logistics: {
      id: 'logistics',
      titleFa: 'پای چپ — ترابری و لجستیک صادرات',
      titleEn: 'Left Leg — Transport & Export Logistics',
      subFa: 'حرکت کالا از کارخانه تا انبارها و پروژه‌ها',
      subEn: 'Global 3PL networks, port tracking and heavy hollow Cobogo block freight routing',
      tools: ['3PL Freight APIs', 'DHL Express Air', 'WMS (Warehouse Cloud)', 'Vessel GPS Trackers'],
      descFa: 'پایی که حرکت را معنا می‌کند. هماهنگی بی‌نقص خطوط ریلی، دریایی و ریلی برای انتقال امن سازه‌های بلوک کوبوگو از گمرکات ایران تا بنادر اروپایی و در نهایت تحویل ویژه VIP در شوروم‌ها یا محل پروژه‌ها.',
      descEn: 'Ensures safe transit of delicate hollow Cobogo blocks. Interfaces with vessel transits and manages white-glove transport directly to premium installation coordinates.',
      insightFa: 'تحویل در سطح White-Glove (با بالاترین ملاحظات کیفی) برای سری‌های دست‌ساز D7 الزامی‌ست.',
      insightEn: 'Enforcing custom heavy-duty packaging layouts ensures zero percent hairline block fracturing during shipping.',
      gridArea: 'logg_legs',
      icon: Activity,
      colorClass: {
        bg: 'bg-amber-950/40',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        hover: 'hover:border-amber-400/60',
        glow: 'shadow-amber-500/20',
        fill: '#78350f'
      },
      connectedAssetId: 'GLOBAL_EXPANSION'
    },
    finance: {
      id: 'finance',
      titleFa: 'پای راست — خزانه‌داری ارزی و گردش پول',
      titleEn: 'Right Leg — Multicurrency Treasury',
      subFa: 'ساماندهی تبادلات مالی بین‌المللی برند',
      subEn: 'Multi-currency ledger, international liquidity control',
      tools: ['Exchange Ledger Modules', 'SWIFT Interchanges', 'Hedging Risk Modules', 'Corporate ERP Cashflow'],
      descFa: 'پای دومی که همراه لجستیک گام برمی‌دارد. خزانه‌داری پویا، مدیریت حساب‌های بانکی چندارزی (EUR, USD, CAD, AED) برای دریافت به موقع مبالغ پروژه‌های ساخت فاکتور شده و تامین دارایی کادر اداری.',
      descEn: 'Dynamic cashflow management enabling real-time capital balancing. Facilitates multicurrency transactions across global dealers smoothly.',
      insightFa: 'انقباض حساب‌ها باید به صورت بلادرنگ در داشبورد تالاموس منعکس شود تا تصمیمات تامین نقدینگی سریع اتخاذ گردد.',
      insightEn: 'Integrating real-time multi-currency invoice logs inside the BI tool eliminates financial hedging latency.',
      gridArea: 'fin_legs',
      icon: DollarSign,
      colorClass: {
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        hover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        fill: '#15803d'
      },
      connectedAssetId: 'SALES_ENABLEMENT'
    },
    blockchain: {
      id: 'blockchain',
      titleFa: 'اثر انگشت — Blockchain & DPP',
      titleEn: 'Fingerprint — Blockchain & DPP',
      subFa: 'شناسنامه دیجیتال و اصالت‌سنجی قطعی بلوک‌های کوبوگو',
      subEn: 'Digital Product Passport (DPP), immutable RFID ledger',
      tools: ['Blockchain Ethereum', 'DPP QR Identifiers', 'RFID Custom Molds', 'Smart Contract Certificates'],
      descFa: 'نقش مکرر و اصیل اثرانگشت که غیرقابل جعل است. اتصال تگ‌های رمزنگاری شده و تخصیص پاسپورت فیزیکی دیجیتال محصول (DPP) بر روی زنجیره بلاکچین جهت تایید دقیق منشا، متریال ساخت و اصالت منحصر به فرد آثار.',
      descEn: 'Applies cryptographic digital labels to physical luxury Cobogo blocks. Secures product material reports, geological origin facts, and limited serial sequences in an unalterable database.',
      insightFa: 'اتحادیه اروپا تا سال ۲۰۲۷ پاسپورت دیجیتال مصالح ساختمانی را الزامی خواهد کرد؛ همین امروز پیشتاز این فناوری هستیم.',
      insightEn: 'Aligning with upcoming EU Digital Product Passport mandates creates a massive tech reputation lead today.',
      gridArea: 'fp_logo',
      icon: Fingerprint,
      colorClass: {
        bg: 'bg-indigo-950/40',
        border: 'border-indigo-500/30',
        text: 'text-indigo-400',
        hover: 'hover:border-indigo-400/60',
        glow: 'shadow-indigo-500/20',
        fill: '#1e1b4b'
      },
      connectedAssetId: 'PRODUCT_STANDARDS'
    }
  }), [allTasks]);

  const activeOrgan = organs[selectedKey] || organs.brain;

  // Filter linked tasks if any exist
  const linkedTasksList = useMemo(() => {
    if (!activeOrgan.connectedAssetId) return [];
    return allTasks.filter(t => t.assetId === activeOrgan.connectedAssetId);
  }, [activeOrgan, allTasks]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 items-start">
      {/* 1. Left: Interactive Human Body Map SVG wrapper */}
      <div className="lg:col-span-7 xl:col-span-8 w-full flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden min-h-[700px] relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-[60px] pointer-events-none" />
        
        {/* Title & Instructions */}
        <div className="text-center mb-6 max-w-2xl px-4">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gold mb-1">
            {t('بدن مجازی سازمان VEDESIA', 'VEDESIA SMART ORGANISM')}
          </h3>
          <p className="text-xs text-cream/50 px-4 leading-relaxed max-w-xl mx-auto">
            {t(
              'یکپارچگی و جریان اطلاعات بخش‌های هولدینگ را به مثابه اندام‌های حیاتی بدن انسان مانیتور کنید. برای تحلیل و مشاهده زنجیره‌ها و پلتفرم‌های هر بخش روی آن کلیک کنید.',
              'Click on any physical/digital organ to investigate technical platform systems, active software databases and CEO priority checksheets.'
            )}
          </p>
        </div>

        {/* The SVG Blueprint Container */}
        <div className="w-full max-w-[620px] aspect-[64/98] relative flex items-center justify-center">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 640 980" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] select-none"
          >
            {/* Styles & Gradients */}
            <defs>
              <filter id="neon-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="blueprint-grid" x1="0" y1="0" x2="640" y2="980" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Background delicate Grid lines to evoke Blueprint / Medical Dashboard Theme */}
            <rect width="640" height="980" rx="30" fill="url(#blueprint-grid)" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            
            {/* Technical grid coordinates */}
            <g opacity="0.1" stroke="rgba(197,160,89,0.3)" strokeWidth="0.5">
              <line x1="80" y1="0" x2="80" y2="980" strokeDasharray="5 5" />
              <line x1="160" y1="0" x2="160" y2="980" strokeDasharray="5 5" />
              <line x1="240" y1="0" x2="240" y2="980" strokeDasharray="5 5" />
              <line x1="320" y1="0" x2="320" y2="980" strokeDasharray="5 5" />
              <line x1="400" y1="0" x2="400" y2="980" strokeDasharray="5 5" />
              <line x1="480" y1="0" x2="480" y2="980" strokeDasharray="5 5" />
              <line x1="560" y1="0" x2="560" y2="980" strokeDasharray="5 5" />

              <line x1="0" y1="150" x2="640" y2="150" strokeDasharray="5 5" />
              <line x1="0" y1="300" x2="640" y2="300" strokeDasharray="5 5" />
              <line x1="0" y1="450" x2="640" y2="450" strokeDasharray="5 5" />
              <line x1="0" y1="600" x2="640" y2="600" strokeDasharray="5 5" />
              <line x1="0" y1="750" x2="640" y2="750" strokeDasharray="5 5" />
              <line x1="0" y1="900" x2="640" y2="900" strokeDasharray="5 5" />
            </g>

            {/* Faint Human silhouette overlay to establish connection */}
            <g opacity="0.04" stroke="#FFF" strokeWidth="1.5" fill="none" style={{ pointerEvents: 'none' }}>
              {/* Head */}
              <circle cx="320" cy="110" r="100" />
              {/* Shoulders */}
              <path d="M 120 400 Q 320 300 520 400" />
              {/* Spine */}
              <line x1="320" y1="210" x2="320" y2="750" />
            </g>

            {/* BRAIN HUB SYSTEM */}
            <g 
              className="cursor-pointer group" 
              onClick={() => setSelectedKey('brain')}
            >
              <rect 
                x="170" y="25" width="300" height="52" rx="12" 
                fill={selectedKey === 'brain' ? '#4f46e5' : 'rgba(83, 74, 183, 0.4)'} 
                stroke={selectedKey === 'brain' ? '#818cf8' : '#534ab7'} 
                strokeWidth={selectedKey === 'brain' ? '1.5' : '0.5'}
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[12.5px] uppercase tracking-wider transition-colors fill-white" x="320" y="45" textAnchor="middle">
                {t('قشر خاکستری — AI Decisions', 'AI Decision Engines')}
              </text>
              <text className="font-sans text-[10px] fill-cream/60" x="320" y="62" textAnchor="middle">
                {t('قیمت · مارکتینگ · تامین · ریسک', 'Pricing · Marketing · Supply · Risk')}
              </text>
            </g>

            {/* Left Hemisphere */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('ml')}>
              <rect 
                x="184" y="84" width="124" height="38" rx="8" 
                fill={selectedKey === 'ml' ? '#0d9488' : 'rgba(60, 52, 137, 0.4)'} 
                stroke={selectedKey === 'ml' ? '#2dd4bf' : '#3c3489'} 
                strokeWidth={selectedKey === 'ml' ? '1.5' : '0.5'}
                className="transition-all duration-300"
              />
              <text className="font-sans font-semibold text-[10.5px] fill-white" x="246" y="100" textAnchor="middle">
                {t('نیمکره چپ = ML', 'Left = Machine Learning')}
              </text>
              <text className="font-sans text-[9px] fill-cream/50" x="246" y="113" textAnchor="middle">
                {t('یادگیری ماشین', 'MLOps')}
              </text>
            </g>

            {/* Right Hemisphere */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('xr')}>
              <rect 
                x="332" y="84" width="124" height="38" rx="8" 
                fill={selectedKey === 'xr' ? '#e11d48' : 'rgba(212, 83, 126, 0.4)'} 
                stroke={selectedKey === 'xr' ? '#fb7185' : '#d4537e'} 
                strokeWidth={selectedKey === 'xr' ? '1.5' : '0.5'}
                className="transition-all duration-300"
              />
              <text className="font-sans font-semibold text-[10.5px] fill-white" x="394" y="100" textAnchor="middle">
                {t('نیمکره راست = XR', 'Right = Spatial XR')}
              </text>
              <text className="font-sans text-[9px] fill-cream/50" x="394" y="113" textAnchor="middle">
                {t('AR · VR · Holograms', 'AR · VR · Matterport')}
              </text>
            </g>

            {/* Thalamus (BI Hub) */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('bi')}>
              <rect 
                x="238" y="128" width="164" height="32" rx="6" 
                fill={selectedKey === 'bi' ? '#2563eb' : 'rgba(24, 95, 165, 0.4)'} 
                stroke={selectedKey === 'bi' ? '#60a5fa' : '#185fa5'} 
                strokeWidth={selectedKey === 'bi' ? '1.5' : '0.5'}
                className="transition-all duration-300"
              />
              <text className="font-sans font-semibold text-[11px] fill-white" x="320" y="144" textAnchor="middle">
                {t('تالاموس = داشبورد BI', 'Thalamus = BI Dashboard')}
              </text>
              <text className="font-sans text-[9px] fill-cream/50" x="320" y="154" textAnchor="middle">
                {t('Power BI · آگاهی مالی', 'Power BI · Analytics')}
              </text>
            </g>

            {/* Sense Sixth - Forecasting */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('predict')}>
              <rect 
                x="170" y="166" width="300" height="24" rx="6" 
                fill={selectedKey === 'predict' ? '#7c3aed' : 'rgba(38, 33, 92, 0.4)'} 
                stroke={selectedKey === 'predict' ? '#a78bfa' : '#26215c'} 
                strokeWidth={selectedKey === 'predict' ? '1.5' : '0.5'}
                className="transition-all duration-300"
              />
              <text className="font-sans text-[10.5px] fill-white" x="320" y="181" textAnchor="middle">
                🔮 {t('حس ششم = Predictive Analytics · تقاضای بازار آینده', 'Sixth Sense = Predictive Analytics & Trend Forecast')}
              </text>
            </g>

            {/* Left Ear - Market Listening */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('listen_l')}>
              <rect 
                x="74" y="58" width="108" height="46" rx="8" 
                fill={selectedKey === 'listen_l' ? '#059669' : 'rgba(15, 110, 86, 0.4)'} 
                stroke={selectedKey === 'listen_l' ? '#34d399' : '#0f6e56'} 
                strokeWidth={selectedKey === 'listen_l' ? '1.5' : '0.5'}
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10.5px] fill-white" x="128" y="74" textAnchor="middle">
                {t('گوش چپ 👂', 'Left Ear 👂')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/50" x="128" y="87" textAnchor="middle">
                {t('نیت مشتری', 'Market Listening')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="128" y="98" textAnchor="middle">
                {t('صدا و بازخورد کلاینت', 'Client Feedback')}
              </text>
            </g>

            {/* Right Ear - Competitor Scraper */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('listen_r')}>
              <rect 
                x="458" y="58" width="108" height="46" rx="8" 
                fill={selectedKey === 'listen_r' ? '#059669' : 'rgba(15, 110, 86, 0.4)'} 
                stroke={selectedKey === 'listen_r' ? '#34d399' : '#0f6e56'} 
                strokeWidth={selectedKey === 'listen_r' ? '1.5' : '0.5'}
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10.5px] fill-white" x="512" y="74" textAnchor="middle">
                {t('گوش راست 👂', 'Right Ear 👂')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/50" x="512" y="87" textAnchor="middle">
                {t('تحلیل رقبا', 'Social Listening')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="512" y="98" textAnchor="middle">
                {t('Brand Tracking', 'Trend Monitoring')}
              </text>
            </g>

            {/* Neural paths from ears to brain */}
            <line x1="182" y1="81" x2="190" y2="81" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="450" y1="81" x2="458" y2="81" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* SYSTEM MEMORIES HEADER */}
            <text x="320" y="212" textAnchor="middle" className="font-sans font-bold text-[11px] fill-gold/40 letter-spacing-[0.2em] tracking-widest uppercase">
              ─── {t('حافظه منسجم تریپلی', 'TRIPLE UNIFIED SYSTEM MEMORY')} ───
            </text>

            {/* Memories nodes: DAM, PIM, CRM, CDP, MDM */}
            {/* DAM */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('dam')}>
              <rect 
                x="102" y="222" width="82" height="46" rx="6" 
                fill={selectedKey === 'dam' ? '#2563eb' : 'rgba(24, 95, 165, 0.2)'} 
                stroke={selectedKey === 'dam' ? '#60a5fa' : 'rgba(24, 95, 165, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="143" y="240" textAnchor="middle">DAM</text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="143" y="252" textAnchor="middle">{t('تصویری', 'Visual Assets')}</text>
              <text className="font-sans text-[8px] fill-cream/40" x="143" y="261" textAnchor="middle">Cloudinary</text>
            </g>

            {/* PIM */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('pim')}>
              <rect 
                x="189" y="222" width="82" height="46" rx="6" 
                fill={selectedKey === 'pim' ? '#2563eb' : 'rgba(24, 95, 165, 0.2)'} 
                stroke={selectedKey === 'pim' ? '#60a5fa' : 'rgba(24, 95, 165, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="230" y="240" textAnchor="middle">PIM</text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="230" y="252" textAnchor="middle">{t('مشخصات فنی', 'Product Specs')}</text>
              <text className="font-sans text-[8px] fill-cream/40" x="230" y="261" textAnchor="middle">Akeneo</text>
            </g>

            {/* CRM */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('crm')}>
              <rect 
                x="276" y="222" width="88" height="46" rx="6" 
                fill={selectedKey === 'crm' ? '#2563eb' : 'rgba(24, 95, 165, 0.2)'} 
                stroke={selectedKey === 'crm' ? '#60a5fa' : 'rgba(24, 95, 165, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="320" y="240" textAnchor="middle">CRM</text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="320" y="252" textAnchor="middle">{t('مشتریان لوکس', 'VIP Relations')}</text>
              <text className="font-sans text-[8px] fill-cream/40" x="320" y="261" textAnchor="middle">HubSpot</text>
            </g>

            {/* CDP */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('cdp')}>
              <rect 
                x="369" y="222" width="82" height="46" rx="6" 
                fill={selectedKey === 'cdp' ? '#2563eb' : 'rgba(24, 95, 165, 0.2)'} 
                stroke={selectedKey === 'cdp' ? '#60a5fa' : 'rgba(24, 95, 165, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="410" y="240" textAnchor="middle">CDP</text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="410" y="252" textAnchor="middle">{t('تحلیل رفتار', 'Behavior Match')}</text>
              <text className="font-sans text-[8px] fill-cream/40" x="410" y="261" textAnchor="middle">Segment</text>
            </g>

            {/* MDM */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('mdm')}>
              <rect 
                x="456" y="222" width="82" height="46" rx="6" 
                fill={selectedKey === 'mdm' ? '#2563eb' : 'rgba(24, 95, 165, 0.2)'} 
                stroke={selectedKey === 'mdm' ? '#60a5fa' : 'rgba(24, 95, 165, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="497" y="240" textAnchor="middle">MDM</text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="497" y="252" textAnchor="middle">{t('یکپارچگی مرشد', 'Master Directory')}</text>
              <text className="font-sans text-[8px] fill-cream/40" x="497" y="261" textAnchor="middle">Reltio</text>
            </g>

            {/* Knowledge Base */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('km')}>
              <rect 
                x="102" y="274" width="213" height="28" rx="6" 
                fill={selectedKey === 'km' ? '#2563eb' : 'rgba(24, 95, 165, 0.1)'} 
                stroke={selectedKey === 'km' ? '#60a5fa' : 'rgba(24, 95, 165, 0.3)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans text-[9.5px] fill-white" x="208.5" y="291" textAnchor="middle">
                📕 {t('حافظه فرآیندی = کتابخانه دانش شرکت KM', 'KM = Operational SOP Knowledge Library')}
              </text>
            </g>

            {/* Showroom historical memory */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('showroom_mem')}>
              <rect 
                x="325" y="274" width="213" height="28" rx="6" 
                fill={selectedKey === 'showroom_mem' ? '#0f6e56' : 'rgba(15, 110, 86, 0.1)'} 
                stroke={selectedKey === 'showroom_mem' ? '#34d399' : 'rgba(15, 110, 86, 0.3)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans text-[9.5px] fill-white" x="431.5" y="291" textAnchor="middle">
                🏛️ {t('حافظه مادی = موزه فیزیکی و تاریخی شوروم', 'Historical showroom heritage archives')}
              </text>
            </g>

            {/* SENSES HUB CONNECTORS */}
            <line x1="320" y1="302" x2="320" y2="315" stroke="rgba(197, 160, 89, 0.3)" strokeWidth="1" strokeDasharray="2 2" />

            {/* Senses: Eyes, Nose, Chatbot */}
            {/* Eyes */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('eyes')}>
              <rect 
                x="112" y="316" width="112" height="38" rx="8" 
                fill={selectedKey === 'eyes' ? '#059669' : 'rgba(15, 110, 86, 0.2)'} 
                stroke={selectedKey === 'eyes' ? '#34d399' : 'rgba(15, 110, 86, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="168" y="333" textAnchor="middle">
                👁️‍{t('چشم = هوش تصویری', 'Eye = Vision AI')}
              </text>
              <text className="font-sans text-[8px] fill-cream/50" x="168" y="345" textAnchor="middle">
                {t('دوربین کارخانه / شوروم', 'Cameras & Heatmaps')}
              </text>
            </g>

            {/* Nose */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('nose')}>
              <rect 
                x="264" y="316" width="112" height="38" rx="8" 
                fill={selectedKey === 'nose' ? '#059669' : 'rgba(15, 110, 86, 0.2)'} 
                stroke={selectedKey === 'nose' ? '#34d399' : 'rgba(15, 110, 86, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="320" y="333" textAnchor="middle">
                👃 {t('بینی = تلمتری فیزیکی', 'Nose = IoT Telemetry')}
              </text>
              <text className="font-sans text-[8px] fill-cream/50" x="320" y="345" textAnchor="middle">
                {t('رایحه شوروم / حسگر کوره', 'Scent & Firing Kilns')}
              </text>
            </g>

            {/* Chatbot Mouth */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('chatbot')}>
              <rect 
                x="416" y="316" width="112" height="38" rx="8" 
                fill={selectedKey === 'chatbot' ? '#059669' : 'rgba(15, 110, 86, 0.2)'} 
                stroke={selectedKey === 'chatbot' ? '#34d399' : 'rgba(15, 110, 86, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="472" y="333" textAnchor="middle">
                👄 {t('دهان = کلاینت چت‌بات', 'Mouth = AI Assist')}
              </text>
              <text className="font-sans text-[8px] fill-cream/50" x="472" y="345" textAnchor="middle">
                {t('پشتیبانی فنی شبانه‌روزی', '24/7 Portal Chatbot')}
              </text>
            </g>

            {/* FACE & SKIN (Visual interface) */}
            {/* Face - Showrooms */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('showroom_face')}>
              <rect 
                x="170" y="362" width="300" height="26" rx="6" 
                fill={selectedKey === 'showroom_face' ? '#e11d48' : 'rgba(214, 83, 126, 0.2)'} 
                stroke={selectedKey === 'showroom_face' ? '#fb7185' : 'rgba(214, 83, 126, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="320" y="378" textAnchor="middle">
                🎨 {t('چهره = شوروم لوکس غرق‌کننده (میلان ۲۰۰۰m² · تورنتو)', 'Face = 2000sqm Milan Flagship Experience')}
              </text>
            </g>

            {/* Skin - Touchpoint Portals */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('skin')}>
              <rect 
                x="78" y="394" width="484" height="28" rx="6" 
                fill={selectedKey === 'skin' ? '#f43f5e' : 'rgba(153, 53, 86, 0.2)'} 
                stroke={selectedKey === 'skin' ? '#fb7185' : 'rgba(153, 53, 86, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-semibold text-[9.5px] fill-white" x="320" y="411" textAnchor="middle">
                🛡️ {t('پوسته سازانی = وب‌سایت لوکس · پورتال BIM معماران · تراشه‌های NFC کاتالوگ · پکیج نمونه کاتلوگ عالی', 'Skin = Brand Touchpoints (vedesia.com · Architect BIM Portal · Sample Boxes · NFC Products)')}
              </text>
            </g>

            {/* Spine Connector lines */}
            <line x1="320" y1="422" x2="320" y2="432" stroke="rgba(197, 160, 89, 0.3)" strokeWidth="1" />

            {/* THE Spine - CENTRAL ERP */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('erp')}>
              <rect 
                x="302" y="432" width="36" height="284" rx="10" 
                fill={selectedKey === 'erp' ? '#404040' : 'rgba(68, 68, 65, 0.6)'} 
                stroke={selectedKey === 'erp' ? '#a3a3a3' : 'rgba(68, 68, 65, 0.9)'} 
                className="transition-all duration-300 animate-pulse"
              />
              {/* Vertical letters in Spine for absolute design polish */}
              <text className="font-serif font-black text-[12.5px] fill-white" x="320" y="455" textAnchor="middle">E</text>
              <text className="font-serif font-black text-[12.5px] fill-white" x="320" y="475" textAnchor="middle">R</text>
              <text className="font-serif font-black text-[12.5px] fill-white" x="320" y="495" textAnchor="middle">P</text>
              <text className="font-sans text-[8.5px] fill-cream/50" x="320" y="525" textAnchor="middle">{t('ستون', 'Spine')}</text>
              <text className="font-sans text-[8.5px] fill-cream/50" x="320" y="540" textAnchor="middle">{t('فقرات', 'Core')}</text>
              <text className="font-sans font-bold text-[8.5px] fill-gold/60" x="320" y="590" textAnchor="middle">D365</text>
            </g>

            {/* LEFT TORSO: Heart (Marketing) & Neuro System (Automation) & Circulatory (Supply) */}
            {/* Heart */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('marketing')}>
              <rect 
                x="148" y="436" width="144" height="68" rx="10" 
                fill={selectedKey === 'marketing' ? '#e11d48' : 'rgba(212, 83, 126, 0.2)'} 
                stroke={selectedKey === 'marketing' ? '#fb7185' : 'rgba(212, 83, 126, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="220" y="456" textAnchor="middle">
                ❤️ {t('قلب = مارکتینگ لوکس', 'Heart = Brand Marketing')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="220" y="471" textAnchor="middle">
                {t('روابط عمومی · سردبیری کاتالوگ', 'HubSpot · Global PR')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="220" y="483" textAnchor="middle">
                {t('جلب اعتبار معماران برتر', 'Prestige Brand Building')}
              </text>
            </g>

            {/* Automation */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('automation')}>
              <rect 
                x="148" y="510" width="144" height="40" rx="8" 
                fill={selectedKey === 'automation' ? '#991b1b' : 'rgba(153, 53, 86, 0.15)'} 
                stroke={selectedKey === 'automation' ? '#fb7185' : 'rgba(153, 53, 86, 0.3)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-semibold text-[9.5px] fill-white" x="220" y="526" textAnchor="middle">
                {t('سیستم عصبی خودمختار', 'Autonomous Nervous System')}
              </text>
              <text className="font-sans text-[8px] fill-cream/50" x="220" y="538" textAnchor="middle">
                {t('کمپین اتومات ارسال کاتلوگ', 'Automated Lead Nurturing')}
              </text>
            </g>

            {/* Supply Circulation */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('supply')}>
              <rect 
                x="148" y="556" width="144" height="44" rx="8" 
                fill={selectedKey === 'supply' ? '#d97706' : 'rgba(133, 79, 11, 0.2)'} 
                stroke={selectedKey === 'supply' ? '#fbbf24' : 'rgba(133, 79, 11, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="220" y="574" textAnchor="middle">
                🩸 {t('گردش خون = تامین و تولید', 'Circulation = SCM Sourcing')}
              </text>
              <text className="font-sans text-[8px] fill-cream/50" x="220" y="588" textAnchor="middle">
                {t('پورتال وندورها · فرآیند لجستیک', 'Supplier Portal & Procurement')}
              </text>
            </g>


            {/* RIGHT TORSO: Neural CNS (API Middleware) & Digestion (Factory) & Corporate Ethics (Soul) */}
            {/* API Middleware */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('api')}>
              <rect 
                x="348" y="436" width="144" height="44" rx="8" 
                fill={selectedKey === 'api' ? '#525252' : 'rgba(68, 68, 65, 0.2)'} 
                stroke={selectedKey === 'api' ? '#a3a3a3' : 'rgba(68, 68, 65, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[9.5px] fill-white" x="420" y="454" textAnchor="middle">
                ⚡ {t('عصبی محیطی = هاب API', 'Peripheral Nerves = API iPaaS')}
              </text>
              <text className="font-sans text-[8px] fill-cream/50" x="420" y="468" textAnchor="middle">
                {t('Make.com · گردش بیدرنگ به CRM', 'Real-time integrations & REST')}
              </text>
            </g>

            {/* Factory Digestive */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('factory')}>
              <rect 
                x="348" y="486" width="144" height="60" rx="8" 
                fill={selectedKey === 'factory' ? '#b45309' : 'rgba(133, 79, 11, 0.2)'} 
                stroke={selectedKey === 'factory' ? '#fbbf24' : 'rgba(133, 79, 11, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10.5px] fill-white" x="420" y="504" textAnchor="middle">
                ⚙️ {t('گوارش = کارخانه تولید', 'Stomach = Mill Production')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="420" y="519" textAnchor="middle">
                {t('تولید ۲۰,۰۰۰ متر تایل در روز', 'Output: 20K sqm/Day Cobogo')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="420" y="531" textAnchor="middle">
                {t('مهندسی دمای کوره MES', 'Thermodynamic Firing System')}
              </text>
            </g>

            {/* Corporate Soul */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('culture')}>
              <rect 
                x="348" y="552" width="144" height="48" rx="8" 
                fill={selectedKey === 'culture' ? '#404040' : 'rgba(95, 94, 90, 0.2)'} 
                stroke={selectedKey === 'culture' ? '#a3a3a3' : 'rgba(95, 94, 90, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-semibold text-[9.5px] fill-white" x="420" y="570" textAnchor="middle">
                🛡️ {t('روح برند = اصول رفتاری و حریم خصوصی', 'Soul = Ethics & Client GDPR Shield')}
              </text>
              <text className="font-sans text-[8px] fill-cream/50" x="420" y="584" textAnchor="middle">
                {t('حفاظت از نقشه‌های فکری معماران', 'Anonymized user tracking frameworks')}
              </text>
            </g>


            {/* LOWER OPERATIONAL HUB (Ops controller / core) */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('ops')}>
              <rect 
                x="148" y="608" width="344" height="44" rx="8" 
                fill={selectedKey === 'ops' ? '#171717' : 'rgba(255, 255, 255, 0.03)'} 
                stroke={selectedKey === 'ops' ? '#b8962e' : 'rgba(255, 255, 255, 0.1)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10.5px] fill-white" x="320" y="626" textAnchor="middle">
                💼 {t('مرکز ثقل عملیات = مدیرست کارهای استراتژیک VEDESIA WBS', 'Operations Center = PLM Project control (Asana Suite & LMS)')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/50" x="320" y="640" textAnchor="middle">
                {t('سمنارها · مدیریت کاتالوگ فنی · آموزش نمایندگان', 'Detailed control and synchronizations of strategic tasks')}
              </text>
            </g>


            {/* THE ARMS (Power extensions) */}
            {/* Muscles - Human Personnel */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('employees')}>
              <rect 
                x="36" y="436" width="104" height="130" rx="10" 
                fill={selectedKey === 'employees' ? '#0f766e' : 'rgba(59, 109, 17, 0.2)'} 
                stroke={selectedKey === 'employees' ? '#2dd4bf' : 'rgba(59, 109, 17, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="88" y="456" textAnchor="middle">
                💪 {t('عضلات = پرسنل', 'Muscles = Teams')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="88" y="474" textAnchor="middle">
                {t('مدیران شوروم میلان', 'Milano Sales Reps')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="88" y="489" textAnchor="middle">
                {t('تیم بازاریابی کانادا', 'Canada Directors')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="88" y="504" textAnchor="middle">
                {t('متخصصان رندر BIM', 'BIM Modeling Studio')}
              </text>
              <text className="font-sans text-[8px] fill-cream/45" x="88" y="519" textAnchor="middle">
                {t('طراحان کاتالوگ فنی', 'Graphic & Packaging')}
              </text>
            </g>

            {/* Hands - Partner Network Agents */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('agents')}>
              <rect 
                x="500" y="436" width="104" height="130" rx="10" 
                fill={selectedKey === 'agents' ? '#115e59' : 'rgba(15, 110, 86, 0.2)'} 
                stroke={selectedKey === 'agents' ? '#14b8a6' : 'rgba(15, 110, 86, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="552" y="456" textAnchor="middle">
                🤝 {t('دست‌ها = عاملین', 'Hands = Dealers')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="552" y="474" textAnchor="middle">
                {t('نمایندگان توزیع GCC', 'GCC Distributors')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="552" y="489" textAnchor="middle">
                {t('عاملین گمرکات اروپا', 'European Agencies')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="552" y="504" textAnchor="middle">
                {t('اتصالات وندورها', 'Supplier Networks')}
              </text>
              <text className="font-sans text-[9px] fill-gold" x="552" y="525" textAnchor="middle">
                {t('پورتال شرکاء', 'Agent CRM Portal')}
              </text>
            </g>


            {/* WAIST: MULTI-ENTITY FINANCIAL */}
            <rect x="154" y="660" width="332" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
            <line x1="240" y1="668" x2="240" y2="794" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="400" y1="668" x2="400" y2="794" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

            <g className="cursor-pointer" onClick={() => setSelectedKey('finance_ops')}>
              <rect 
                x="148" y="676" width="344" height="110" rx="10" 
                fill={selectedKey === 'finance_ops' ? '#262626' : 'rgba(255,255,255,0.02)'} 
                stroke={selectedKey === 'finance_ops' ? '#737373' : 'rgba(255, 255, 255, 0.05)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10.5px] fill-white" x="320" y="694" textAnchor="middle">
                ⚖️ {t('پهلوها = موازنه مالی و قانونی هلدینگ چند پاره', 'Flanks = Multi-Entity Corporate Balancer')}
              </text>
              <text className="font-sans text-[9px] fill-gold" x="196" y="718" textAnchor="middle">
                {t('کانادا (دفتر مرکزی)', 'Canada HQ')}
              </text>
              <text className="font-sans text-[9px] fill-gold" x="320" y="718" textAnchor="middle">
                {t('ایتالیا (برند لوکس)', 'Milano Brand Node')}
              </text>
              <text className="font-sans text-[9px] fill-gold" x="444" y="718" textAnchor="middle">
                {t('ایران (کارخانجات)', 'Tehran Factories')}
              </text>
              
              <text className="font-sans text-[8.5px] fill-cream/50" x="320" y="744" textAnchor="middle">
                {t('موازنه نرخ ارز تراکنش‌ها EUR · USD · CAD · AED', 'Unified Multi-Currency Ledger Systems')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/40" x="320" y="760" textAnchor="middle">
                {t('سیستم انطباق مالیاتی فرامرزی و قراردادهای حقوقی وندورلیست‌ها', 'Multi-Jurisdictional Fiscal Compliance & Vendor Contracts')}
              </text>
            </g>


            {/* THE LEGS: Transport Logistics & MultiCurrency Cashflows */}
            {/* Left Leg Logistics */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('logistics')}>
              <rect 
                x="184" y="798" width="124" height="88" rx="10" 
                fill={selectedKey === 'logistics' ? '#78350f' : 'rgba(133, 79, 11, 0.2)'} 
                stroke={selectedKey === 'logistics' ? '#f59e0b' : 'rgba(133, 79, 11, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="246" y="818" textAnchor="middle">
                🦵 {t('پای چپ = ترابری لوکس', 'Left Leg = 3PL Logistics')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="246" y="836" textAnchor="middle">
                {t('اتصالات حمل صادرات', 'Vessel Sea Highways')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="246" y="851" textAnchor="middle">
                {t('WMS رهگیری آنلاین کوبوگو', 'Cobogo Tracking Hub')}
              </text>
              <text className="font-sans text-[7.5px] fill-cream/35" x="246" y="866" textAnchor="middle">
                {t('ایران ← گمرک میلان ← دبی', 'Iran → Milan → Dubai')}
              </text>
            </g>

            {/* Right Leg Finance */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('finance')}>
              <rect 
                x="332" y="798" width="124" height="88" rx="10" 
                fill={selectedKey === 'finance' ? '#15803d' : 'rgba(59, 109, 17, 0.2)'} 
                stroke={selectedKey === 'finance' ? '#4ade80' : 'rgba(59, 109, 17, 0.4)'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-white" x="394" y="818" textAnchor="middle">
                🦵 {t('پای راست = خزانه‌داری ارزی', 'Right Leg = Cashflow')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/60" x="394" y="836" textAnchor="middle">
                {t('دریافت درگاه بانکی ارزها', 'Prestige VIP Invoicing')}
              </text>
              <text className="font-sans text-[8px] fill-cream/40" x="394" y="851" textAnchor="middle">
                {t('انتقال معتبر لیر-دلار-یورو', 'SWIFT Liquidity Control')}
              </text>
              <text className="font-sans text-[7.5px] fill-cream/35" x="394" y="866" textAnchor="middle">
                {t('مدیریت حاکمیت مالی هولدینگ', 'Treasury Risk Hedging')}
              </text>
            </g>


            {/* THE IMMUTABLE FINGERPRINT (Blockchain Authentification) */}
            <g className="cursor-pointer" onClick={() => setSelectedKey('blockchain')}>
              <rect 
                x="250" y="904" width="140" height="42" rx="10" 
                fill={selectedKey === 'blockchain' ? '#1e1b4b' : 'rgba(38, 33, 92, 0.3)'} 
                stroke={selectedKey === 'blockchain' ? '#c5a059' : '#26215c'} 
                className="transition-all duration-300"
              />
              <text className="font-sans font-bold text-[10px] fill-gold" x="320" y="921" textAnchor="middle">
                 🔏 {t('اثر انگشت = Blockchain', 'Fingerprint = Blockchain')}
              </text>
              <text className="font-sans text-[8.5px] fill-cream/70" x="320" y="934" textAnchor="middle">
                {t('پاسپورت کالا (DPP) و تایید اصالت تایل', 'Digital Product Passport (DPP)')}
              </text>
            </g>

            {/* Faint leg connections to fingerprint */}
            <line x1="305" y1="886" x2="305" y2="904" stroke="rgba(197, 160, 89, 0.3)" strokeWidth="0.5" strokeDasharray="2 2" />
            
          </svg>
        </div>
      </div>

      {/* 2. Right: Detailed Info Sidebar, Glassmorphism Cards, Connected Tasks */}
      <div className="lg:col-span-5 xl:col-span-4 w-full flex flex-col gap-6 lg:sticky lg:top-28">
        
        {/* Dynamic Detail Panel Card */}
        <div className={`p-6 sm:p-8 rounded-[32px] border ${activeOrgan.colorClass.border} ${activeOrgan.colorClass.bg} backdrop-blur-2xl relative overflow-hidden shadow-2xl transition-all duration-500`}>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-[40px] pointer-events-none" />
          
          {/* Header row with custom icon */}
          <div className="flex items-start justify-between mb-6">
            <div className={`p-3.5 bg-white/5 rounded-2xl border ${activeOrgan.colorClass.border} shrink-0`}>
              <activeOrgan.icon className={activeOrgan.colorClass.text} size={24} />
            </div>
            <div className={`${lang === 'fa' ? 'text-right' : 'text-left'} flex-1 ${lang === 'fa' ? 'pr-4' : 'pl-4'}`}>
              <span className={`text-[9px] font-black tracking-widest uppercase opacity-40 ${activeOrgan.colorClass.text}`}>
                {activeOrgan.id} System Module
              </span>
              <h3 className="text-xl font-bold text-cream font-sans mt-0.5 leading-tight">
                {lang === 'fa' ? activeOrgan.titleFa : activeOrgan.titleEn}
              </h3>
              <p className="text-xs text-cream/40 mt-1 leading-snug">
                {lang === 'fa' ? activeOrgan.subFa : activeOrgan.subEn}
              </p>
            </div>
          </div>

          {/* Senses / Software Ecosystem list */}
          <div className="mb-6">
            <h4 className="text-[10px] font-black uppercase text-gold/60 tracking-wider mb-2 text-right group-ltr:text-left">
              {t('زنجیره هاب و ابزارهای مرتبط', 'Ecosystem Suite & Software')}
            </h4>
            <div className="flex flex-wrap gap-1.5 justify-start">
              {activeOrgan.tools.map((tool, idx) => (
                <span 
                  key={idx} 
                  className={`text-[10px] py-1 px-3 rounded-xl bg-white/5 border border-white/10 font-medium ${activeOrgan.colorClass.text}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed description */}
          <div className="mb-6 border-t border-white/5 pt-4">
            <p className="text-sm text-cream/70 leading-relaxed text-right group-ltr:text-left font-light">
              {lang === 'fa' ? activeOrgan.descFa : activeOrgan.descEn}
            </p>
          </div>

          {/* CMO Actionable Insights / CMO Audit Audit Check */}
          <div className="p-5 rounded-2xl bg-gold/[0.02] border border-gold/15 mt-4 text-right group-ltr:text-left">
            <div className="flex items-center gap-2 mb-2 justify-start">
              <Sparkles className="text-gold" size={14} />
              <h5 className="text-[10px] font-black uppercase text-gold tracking-widest">
                {t('تکمیل CMO (Chief Marketing Officer Audit)', 'CMO Audit & Strategic Note')}
              </h5>
            </div>
            <p className="text-xs text-cream/75 leading-relaxed italic">
              ✏️ {lang === 'fa' ? activeOrgan.insightFa : activeOrgan.insightEn}
            </p>
          </div>

          {/* Interactive button (as visual asset) */}
          <div className="mt-6">
            <a 
              href="https://ai.studio/build" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 text-xs font-bold text-cream rounded-2xl transition-all"
            >
              <ExternalLink size={14} />
              <span>{t('مشاوره با هوش مصنوعی VEDESIA', 'Query VEDESIA AI Engine')}</span>
            </a>
          </div>

        </div>

        {/* 3. Linkage Details back to the actual WBS / Marketing Board */}
        {activeOrgan.connectedAssetId && (
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px] text-right group-ltr:text-left animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Layers className="text-gold" size={16} />
                <h4 className="text-xs font-black uppercase text-gold tracking-wider">
                  {t('دارایی استراتژیک هم‌بند در نقشه راه فازی', 'CONNECTED PIF TASK STRAND')}
                </h4>
              </div>
              <span className="text-[9px] font-mono text-cream/30 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                {activeOrgan.connectedAssetId}
              </span>
            </div>

            <p className="text-xs text-cream/40 leading-relaxed mb-4">
              {t(
                'بر اساس مدل درختی سازمان، این عضو فیزیکی/دیجیتال با تسک‌های راهبردی زیر در مرکز کنترل پروژه Vedesia گره خورده است:',
                'Based on our organizational architecture model, this system node links with the following active strategic task strands:'
              )}
            </p>

            {/* Render any linked subprojects matching this assetId */}
            {linkedTasksList.length > 0 ? (
              <div className="space-y-3">
                {linkedTasksList.slice(0, 4).map((task) => (
                  <div 
                    key={task.id} 
                    className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 justify-start">
                        <span className="text-[8px] font-mono font-black text-gold border border-gold/20 px-1 py-0.2 rounded">
                          {task.id}
                        </span>
                        <span className={`text-[8px] px-1.5 py-0.2 rounded font-black uppercase ${
                          task.status === 'completed' || task.status === 'approved' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-gold/10 text-gold'
                        }`}>
                          {t(
                            task.status === 'completed' || task.status === 'approved' ? 'تایید شده' : 'در جریان', 
                            task.status === 'completed' || task.status === 'approved' ? 'Verified' : 'Active'
                          )}
                        </span>
                      </div>
                      <h5 className="text-[11px] font-bold text-cream truncate">
                        {lang === 'fa' ? task.title : (task.titleEn || task.title)}
                      </h5>
                    </div>
                    {task.assignee && (
                      <span className="shrink-0 text-[8px] text-cream/40 bg-white/5 py-1 px-1.5 rounded">
                        {task.assignee}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
                <p className="text-[10px] text-cream/30 italic">
                  {t('هیچ کار همبند فعالی پیدا نشد.', 'No connected tasks found.')}
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
