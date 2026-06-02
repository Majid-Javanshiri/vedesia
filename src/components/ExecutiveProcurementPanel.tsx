import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Truck, 
  Activity, 
  Workflow, 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowUpRight, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  X,
  Plus, 
  Package,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Brain,
  TrendingUp,
  AlertTriangle,
  Award,
  DollarSign,
  FileText,
  Bookmark,
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExecutiveProcurementPanelProps {
  t: (fa: string, en: string) => string;
  lang: 'fa' | 'en';
}

// Enriched Sourcing Contract / Agency Item representation
interface ProcurementItem {
  id: string;
  titleFa: string;
  titleEn: string;
  subProjectFa: string;
  subProjectEn: string;
  type: 'GOODS' | 'SERVICE';
  model: 'OUTSOURCED' | 'INSOURCED';
  partnerAgencyFa: string;
  partnerAgencyEn: string;
  estimatedCost: number; // in EUR
  status: 'NEGOTIATION' | 'CONTRACTED' | 'DELIVERED' | 'ASSIGNED';
  keyDeliverablesFa: string[];
  keyDeliverablesEn: string[];
  contactPerson: string;
  slaQualityScore: number; // 0 to 100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  roiJustificationFa: string;
  roiJustificationEn: string;
}

export default function ExecutiveProcurementPanel({ t, lang }: ExecutiveProcurementPanelProps) {
  // Rich, realistic, highly specialized dataset detailing critical outsourcing lanes requested by CEO
  const [items, setItems] = useState<ProcurementItem[]>([
    {
      id: 'proc-web',
      titleFa: 'توسعه موتور سه‌بعدی تعاملی WebGL و پرتال دوقلوی دیجیتال معماران لوکس (وبسایت)',
      titleEn: 'Interactive 3D WebGL Configurator Engine & VIP Architects digital platform (Website)',
      subProjectFa: 'بستر دیجیتال و پرتال وبسایت',
      subProjectEn: 'Digital Platform & Web Presence',
      type: 'SERVICE',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'آژانس خلاق دیجیتال نیکولا (میلان/سوئیس)',
      partnerAgencyEn: 'Nicola Creative Studio & WebGL SpA (Milan/Zurich)',
      estimatedCost: 65000,
      status: 'CONTRACTED',
      keyDeliverablesFa: [
        'طراحی لودر بومی بلوک‌های کوبوگو سه‌بعدی با تغییر جنس بافت زنده مپ‌های PBR',
        'پیاده‌سازی پنل کاربری اختصاصی معماران با خروجی کدهای شاپ‌دراوینگ',
        'ماژول شبیه‌ساز بارگذاری وزن سازه‌ای بلوک‌ها بر روی دیوارهای بتنی'
      ],
      keyDeliverablesEn: [
        'Native WebGL 3D dynamic Cobogo block loader with live haptic/PBR normal-map modifiers',
        'Bespoke luxury gateway portal for global interior designers to download BIM',
        'Structural weight loading simulation tool for architectural shear walls'
      ],
      contactPerson: 'Nicola Rossini',
      slaQualityScore: 96,
      riskLevel: 'MEDIUM',
      roiJustificationFa: 'کاهش ۲ ماهه فرآیند عرضه محصول و تضمین بالاترین استاندارد رندرینگ تعاملی سه‌بعدی در مقایسه با تیم‌های داخلی.',
      roiJustificationEn: 'Saves 2 months of standard in-house coding while delivering bespoke Swiss 3D fidelity standards.'
    },
    {
      id: 'proc-catalog',
      titleFa: 'برندینگ، سناریونویسی و طراحی گرافیک کاتالوگ بین‌المللی نفیس Vedesia (Vol. I & II)',
      titleEn: 'Branding Direction, copywriting & layout curation of elite global Vedesia Catalogs',
      subProjectFa: 'طراحی کتابچه‌ها و کاتالوگ جامع',
      subProjectEn: 'Bespoke Catalogs & Portfolios',
      type: 'SERVICE',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'آژانس برندینگ بین‌المللی آوانگارد (لندن/میلان)',
      partnerAgencyEn: 'Avantgarde Luxury Branding Directory SpA (London/Milan)',
      estimatedCost: 48000,
      status: 'CONTRACTED',
      keyDeliverablesFa: [
        'تدوین روایت کلامی و برند استوری اختصاصی کاترین براون برای بازار لوکس اروپا',
        'عکاسی ماکرو صنعتی از بازتاب‌های لعابی و بافت سنگ‌ها در آتلیه فلورانس',
        'آماده‌سازی خروجی‌های تفکیک رنگ لوکس متناسب با متدهای چاپ متالیک و نقره‌کوب'
      ],
      keyDeliverablesEn: [
        'Complete brand identity copywriting & prose style guidelines for European elite tiers',
        'Macro industrial photography sessions capturing tile metallic glaze reflections',
        'RGB-to-CMYK ultra-gamut profiles certified for metallic ink print runs'
      ],
      contactPerson: 'David Sterling',
      slaQualityScore: 94,
      riskLevel: 'LOW',
      roiJustificationFa: 'بهره‌برداری از تجربه آژانس طراح کاتالوگ‌های ۵ برند مطرح سرامیک ایتالیا برای ایجاد پرستیژ همتراز بازار میلان.',
      roiJustificationEn: 'Leverages high-end team responsible for top-tier Italian layouts to validate product pedigree.'
    },
    {
      id: 'proc-samples',
      titleFa: 'ساخت جعبه‌های نمونه نفیس دست‌ساز چرمی/فلزی کالیته‌ها و بلوک مینیاتوری سفارشی کوبوگو',
      titleEn: 'Handcrafted luxury leather/metal haptic sample boxes & miniature Cobogo block swatches',
      subProjectFa: 'بسته‌های هدیه و سمپل باکس‌ها',
      subProjectEn: 'VIP Swatch & Haptic Boxes',
      type: 'GOODS',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'کارگاه لوکس صنایع دستی چرم آلبرتینی (فلورانس)',
      partnerAgencyEn: 'Albertini Leather Crafts SpA & Metalwork (Florence)',
      estimatedCost: 52000,
      status: 'CONTRACTED',
      keyDeliverablesFa: [
        'تولید ۲۰۰ جعبه چرم دست‌ساز توسکانی با لولاها و بست‌های برنزی مینیاتوری',
        'برش لیزری کوبوگوهای مینیاتوری پرسلانی با ضخامت نازک ۶ میلی‌متر جهت کالیته‌ها',
        'پلاک‌های برنجی آب‌کاری شده با آب طلا حکاکی شده با بارکد CDP مشتریان VIP'
      ],
      keyDeliverablesEn: [
        '200 bespoke Tuscany-tanned leather suitcases with gold-brushed bronze buckles',
        'Ultra-precise laser edging of 6mm micro ceramic tile samples matching real stones',
        'Engraved gilded brass nameplates programmed with individual RSVP customer tracking codes'
      ],
      contactPerson: 'Gianluca Albertini',
      slaQualityScore: 98,
      riskLevel: 'HIGH',
      roiJustificationFa: 'تظمین سطح بی‌بدیل متریال لوکس توسکانی که با خطوط برش کارخانه‌های صنعتی غیرقابل دسترس است.',
      roiJustificationEn: 'Uncompromising handwork that defines first impressions; impossible through automated mass factory output.'
    },
    {
      id: 'proc-pr',
      titleFa: 'روابط عمومی دیپلماتیک، کمپین رسانه‌ای اروپا و هماهنگی با ۲۰ دیلر کلیدی میلان (PR)',
      titleEn: 'Bilateral global PR, press relations & high-tier developer match-making (Milan)',
      subProjectFa: 'کمپین PR و روابط عمومی فرامرزی',
      subProjectEn: 'PR & Global Media Campaign',
      type: 'SERVICE',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'آژانس خلاق روابط عمومی گالو (میلان)',
      partnerAgencyEn: 'Gallo Public Relations Agency (Milan)',
      estimatedCost: 70000,
      status: 'NEGOTIATION',
      keyDeliverablesFa: [
        'پوشش تحلیلی در مجلات برتر معماری (Casabella, AD, Domus, Detail)',
        'سازماندهی رویداد پیش‌نمایش خصوصی VIP با دعوت از معماران Fuorisalone',
        'برگزاری جلسات مستقیم یک‌به‌یک (B2B) با سازندگان تراز اول ساختمان‌های میلان و مونیخ'
      ],
      keyDeliverablesEn: [
        'Bespoke features in dominant architectural reviews (Casabella, AD, Domus)',
        'Coordination of private exclusive press preview in Milan city center',
        'Direct roundtable introductions with 20 master luxury developers across Europe'
      ],
      contactPerson: 'Gianni Gallo',
      slaQualityScore: 92,
      riskLevel: 'MEDIUM',
      roiJustificationFa: 'دسترسی انحصاری به فهرست طلایی معماران اتحادیه اروپا که توسط کمپین‌های غریبه بی‌حاصل است.',
      roiJustificationEn: 'Direct diplomatic gateway key to elite Italian architect networks that takes decades to establish.'
    },
    {
      id: 'proc-print',
      titleFa: 'چاپ نفیس سنگین بروشورها، کارت‌های نبرد رقبا و اوراق هویت اداری با فویل نانو متالیک',
      titleEn: 'Heavy thermal embossed corporate print, competitor battlecards & tactile stationery',
      subProjectFa: 'امور چاپ نفیس غرفه و برند',
      subProjectEn: 'Premium Printing & Stationery',
      type: 'GOODS',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'چاپخانه لوکس سلطنتی امبرتو (رم/فلورانس)',
      partnerAgencyEn: 'Umberto Royal Lithographers & Fine Print SpA (Rome)',
      estimatedCost: 35000,
      status: 'CONTRACTED',
      keyDeliverablesFa: [
        'چاپ ۷۰۰ نسخه مونوگراف جلد سخت با روکش الیاف طبیعی و بافت لمس ارگانیک',
        'چاپ کارت‌های نبرد فنی مقاومت لعاب با فویل متالیک ضد خش ویژه مذاکره‌کنندگان',
        'ساخت پاکت‌های پستی مجهز به قفل‌های مومی و روبان‌های ابریشمی با آرم Vedesia'
      ],
      keyDeliverablesEn: [
        '700 hardcover monograph editions wrapped in natural sensory linen fabric',
        'Tactile UV scratch-resistant technical comparison battlecards for sales reps',
        'Luxurious presentation envelopes featuring wax seals and branded silk ribbons'
      ],
      contactPerson: 'Umberto Rossi',
      slaQualityScore: 95,
      riskLevel: 'LOW',
      roiJustificationFa: 'سرعت ذوب حرارتی و ثبات رنگ بر روی کاغذهای کتان ایتالیایی فاقد تکنولوژی در چاپخانه‌های محلی.',
      roiJustificationEn: 'Specialized thermal hot-stamping and chemical ink binding that prevents fading under strong showroom lights.'
    },
    {
      id: 'proc-scent',
      titleFa: 'فرمولاسیون هوای حسی، راه‌اندازی رایحه امضا و مینی سنسورهای تزریق گاز معطر',
      titleEn: 'Olfactory formulation, trademark signature brand scent & sensory aerosol dispensers',
      subProjectFa: 'بخش تجربه حسی',
      subProjectEn: 'Atmospheric Sensory Setup',
      type: 'GOODS',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'مؤسسه برندینگ بویایی اولفاتیس (پاریس)',
      partnerAgencyEn: 'Olfactis Sensory Lab & HVAC SpA (Paris)',
      estimatedCost: 38000,
      status: 'DELIVERED',
      keyDeliverablesFa: [
        'طراحی عطر امضای مدیترانه‌ای خزه بلوط و تراورتن باران‌خورده',
        'سخت‌افزارهای یکپارچه‌شونده با تهویه مطبوع شوروم میلان مجهز به رسیور اینترنت اشیاء',
        'مخزن کپسول‌های روغن خالص برای ۳۰۰ ساعت کارکرد مداوم در همایش'
      ],
      keyDeliverablesEn: [
        'Signature scent formulation combining Mediterranean oak moss and wet slate notes',
        'IoT HVAC-connected micro-injectors that auto-modulate concentrations',
        'Ultra-purified oil reservoirs supporting 300 hours of continuous active showcase'
      ],
      contactPerson: 'Sophie Laurent',
      slaQualityScore: 97,
      riskLevel: 'LOW',
      roiJustificationFa: 'رایحه اختصاصی به فضا هویت داده و ماندگاری ذهنی برند را بین بازدیدکنندگان تا ۸۰٪ بالا می‌برد.',
      roiJustificationEn: 'Creates immense atmospheric retention; proven to increase sales dwell-time on physical showrooms.'
    },
    {
      id: 'proc-cargo',
      titleFa: 'حمل گمرکی سریع مانیتورینگ شده و لجستیک نمونه‌های بلوک توخالی پرسلانی کوبوگو به شوروم میلان',
      titleEn: 'Priority air-freight, customs handling & climate transit for trial hollow Cobogo porcelain blocks',
      subProjectFa: 'لجستیک و گمرکات میلان',
      subProjectEn: 'Customs Logistics & Sourcing',
      type: 'GOODS',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'شرکت لجستیک بین‌الملل سریع گون (شعبه میلان)',
      partnerAgencyEn: 'Gooneh Global Express Logistics SpA (Milan)',
      estimatedCost: 45000,
      status: 'CONTRACTED',
      keyDeliverablesFa: [
        'حمل عمودی حفاظت‌شده ضد ارتعاش در صندوق‌های خلاء کربنی',
        'ترخیص بارهای سنگین پرسلانی تحت کدهای اولویت گمرکی بندر جنوا و مینی فرودگاه‌ها',
        'سنسورهای ردیابی موقعیت مکانی لحظه‌ای همراه با مانیتور ژیروسکوپ دما و ضربه'
      ],
      keyDeliverablesEn: [
        'Vertical shock-absorbing vacuum carbon containers built for heavy Cobogo blocks',
        'Fast-track customs clearance priority handling through Genoa harbor and Malpensa',
        'Live IoT tracking tags registering real-time impact forces, humidity and GPS coordinates'
      ],
      contactPerson: 'Mona Kazemi',
      slaQualityScore: 91,
      riskLevel: 'HIGH',
      roiJustificationFa: 'جلوگیری از ریسک شدید شکستگی کالیته‌ها و تضمین رد شدن بارهای حساس کارخانه در بازه زمانی تست فووریزانویه.',
      roiJustificationEn: 'Critical insurance against structural fractures; handles local regulatory and EU clearing steps seamlessly.'
    },
    {
      id: 'proc-scan',
      titleFa: 'اسکن لیزری ۱۶K با رزولوشن میکرومتری الگوهای سنگی و استخراج مپ‌های PBR صنعتی',
      titleEn: '16K Micro-metric optical Cobogo block laser scanning & PBR digital material mapping',
      subProjectFa: 'دوقلوی دیجیتال ودسیا (فاز ۲)',
      subProjectEn: 'Vedesia Project Digital Twin (Phase 2)',
      type: 'SERVICE',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'استودیو تصویربرداری صنعتی دیجیتال ویژن (تهران/میلان)',
      partnerAgencyEn: 'Digital Vision Industrial Scan Lab (Milan)',
      estimatedCost: 32000,
      status: 'DELIVERED',
      keyDeliverablesFa: [
        'اسکن‌های میکرومتری غلظت سنگ‌ها با سنسورهای عمق فرابنفش',
        'استخراج مپ‌های نرمال، ناهمواری، متالیک و انسداد محیطی سه‌بعدی برای آنریل انجین',
        'تثبیت شاخص انکسار نوری دقیق سنگ‌ها برای سیستم‌های شبیه‌ساز مهندسی'
      ],
      keyDeliverablesEn: [
        'Micro-metric depth scanning utilizing ultraviolet active phase arrays',
        'Normal-map, metallic, specular, roughness and AO assets optimized for Unreal Engine 5',
        'Optical refraction index validation certificates for physical calculations'
      ],
      contactPerson: 'Hamid Sadeghi',
      slaQualityScore: 93,
      riskLevel: 'LOW',
      roiJustificationFa: 'هوش شبیه‌سازی مواد فیزیکی به نرم‌افزار معماران جلوه واقعی می‌دهد؛ امری که با رندرهای آرتیستیک غیرممکن است.',
      roiJustificationEn: 'Replaces generic texture painting with authentic raw stone geological material physics.'
    },
    {
      id: 'proc-sound',
      titleFa: 'مهندسی آکوستیک اتمسفر، موسیقی متن حسی اختصاصی و دیفیوزرهای جاذب نویز محیط',
      titleEn: 'Acoustic background architecture, bespoke sensory showroom score & resonance dampers',
      subProjectFa: 'بخش تجربه حسی',
      subProjectEn: 'Atmospheric Sensory Setup',
      type: 'SERVICE',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'آژانس مهندسی صوتی حسی آمبینت لند (پاریس)',
      partnerAgencyEn: 'Ambient Waves Sound & Acoustic Design SpA (Paris)',
      estimatedCost: 25000,
      status: 'NEGOTIATION',
      keyDeliverablesFa: [
        'تنظیم فرکانس صوت‌های عمیق ۴۳۲ هرتز هماهنگ با نبض آرامش بازدیدکننده',
        'پنل‌های صوتی دیواری تزیینی جاذب ناهنجاری صوتی پوشیده شده با بتن الیافی',
        'موسیقی استریو چندکاناله تپش‌های کوارتز برای اتاق لمس بلوک‌های سه بعدی کوبوگو'
      ],
      keyDeliverablesEn: [
        '432Hz spatial grounding background frequencies aligned with slow breathing patterns',
        'Acoustically micro-perforated decorative wall backdrops absorbing echo reflections',
        'Multi-channel fluid soundscapes syncing with touch activation sensors in active rooms'
      ],
      contactPerson: 'Jean-Luc Ponty',
      slaQualityScore: 90,
      riskLevel: 'LOW',
      roiJustificationFa: 'کنترل آلودگی صوتی شبستان‌های مجاور و عمیق کردن تمرکز خریداران در هنگام بستن پروژه‌ها.',
      roiJustificationEn: 'Mitigates outer fairground noises; increases customer deep concentration during VIP closings.'
    },
    {
      id: 'proc-interactive',
      titleFa: 'طراحی غرفه دیجیتال تعاملی واقعیت افزوده برای اپل ویژن پرو (VR/AR Showroom)',
      titleEn: 'Metaverse immersive architect showroom & Apple Vision Pro spatial sandboxing app',
      subProjectFa: 'دوقلوی دیجیتال ودسیا (فاز ۲)',
      subProjectEn: 'Vedesia Project Digital Twin (Phase 2)',
      type: 'SERVICE',
      model: 'INSOURCED',
      partnerAgencyFa: 'ستاد داخلی توسعه هوشمند هلدینگ (سولوشن‌های نرم‌افزاری)',
      partnerAgencyEn: 'In-house IT Engineering & Design Solutions Team',
      estimatedCost: 58000,
      status: 'ASSIGNED',
      keyDeliverablesFa: [
        'توسعه پکیج سه‌بعدی محیط مجازی فضایی با قابلیت ایمپورت فایل‌های اتوکد طراح',
        'کنترلرهای پاسخ پویا حرکات دست برای جابجایی کدهای نوری تایل‌ها',
        'گواهینامه رندرینگ بلادرنگ ۶۰ فریم بر ثانیه بدون تاخیر حرکتی عینک'
      ],
      keyDeliverablesEn: [
        'Spatial computing layout file for visionOS enabling spatial multi-user architect sessions',
        'Intuitive hand gesture handlers allowing drag-and-drop of virtual claddings',
        'Zero-latency 60fps local rendering pipelines tested on M3 Vision hardware'
      ],
      contactPerson: 'دکتر ستاری',
      slaQualityScore: 89,
      riskLevel: 'MEDIUM',
      roiJustificationFa: 'تمرکز بر تکنولوژی آینده هولوگرافیک جهت متمایز کردن پرزنتیشن B2B مقابل رقبای سنتی ایتالیایی.',
      roiJustificationEn: 'Establishes a tech-forward posture for Vedesia B2B meetings, making them unforgettable.'
    },
    {
      id: 'proc-infra-crm',
      titleFa: 'زیرساخت ابری مدیریت ارتباط با مشتریان و هویت مشتریان فوق سفارشی جهت رویداد (CRM / CDP)',
      titleEn: 'Enterprise Cloud-Native CRM & Customer Data Platform (CDP) for Luxury Architect Leads',
      subProjectFa: 'زیرساخت‌های دیجیتال سیستم‌ها',
      subProjectEn: 'Corporate Business Systems',
      type: 'SERVICE',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'سامانه‌های ابری پارس‌آرا و ابر سوئیس',
      partnerAgencyEn: 'ParsAra Cloud Systems & SwissCloud AG (Geneva)',
      estimatedCost: 45000,
      status: 'CONTRACTED',
      keyDeliverablesFa: [
        'یکپارچه‌سازی پایگاه داده معماران اروپا و سناریوی امتیازدهی تعاملی',
        'اتصال با کارت‌های هپتیک فیزیکی مجهز به تگ RFID جهت توزیع خودکار BIM مپ‌ها',
        'داشبورد مانیتورینگ بلادرنگ علاقه مخاطبان به کارهای کوبوگو ویژه در طول نمایشگاه'
      ],
      keyDeliverablesEn: [
        'Secure VIP Architect directory CRM integration with automated lead grading engines',
        'RFID custom bracelet/card integration triggering direct cloud BIM & high-res CAD updates',
        'CDP segmentation dashboard tracing architect interest profiles and physical visits'
      ],
      contactPerson: 'Marc-Aurèle Dubois',
      slaQualityScore: 97,
      riskLevel: 'LOW',
      roiJustificationFa: 'رصد هوشمند لیدهای فوق ثروتمند و توزیع بدون کاغذ دارایی‌های گله‌مایه با پیگیری مستقیم CRM.',
      roiJustificationEn: 'Guarantees perfect tracing of high-worth architect interactions, yielding a projected 30% rise in contract signs.'
    },
    {
      id: 'proc-infra-pim',
      titleFa: 'سیستم یکپارچه مدیریت اطلاعات محصول و داده‌های مرجع بلوک‌های کوبوگو ودسیا (PIM / MDM)',
      titleEn: 'Global Product Information Management (PIM) & Master Data Management (MDM) Engine',
      subProjectFa: 'زیرساخت‌های دیجیتال سیستم‌ها',
      subProjectEn: 'Corporate Business Systems',
      type: 'SERVICE',
      model: 'INSOURCED',
      partnerAgencyFa: 'ستاد داخلی توسعه هوشمند هلدینگ',
      partnerAgencyEn: 'In-house IT Engineering & Data Integrity Team',
      estimatedCost: 38000,
      status: 'ASSIGNED',
      keyDeliverablesFa: [
        'پیاده‌سازی هرم یکتای شناسه کالا و استانداردهای اطلاعات فیزیکی متریال',
        'سیستم هماهنگ‌سازی ترجمه چندزبانه (فارسی، انگلیسی، ایتالیایی) ویژگی‌های فنی تایل‌ها',
        'اتصال خودکار به درگاه دوقلوی دیجیتال WebGL غرفه و خطوط تولید فیزیکی'
      ],
      keyDeliverablesEn: [
        'Master catalog taxonomy setup with complete physical, dimensional, and glazed metadata layers',
        'Automatic 3-lingual translation sync (English, Persian, Italian) for physical stone stats',
        'Web API broker pushing absolute stone specifications directly to WebGL client rendering'
      ],
      contactPerson: 'مهندس حسینی (پیمان‌کار داده)',
      slaQualityScore: 94,
      riskLevel: 'LOW',
      roiJustificationFa: 'جلوگیری از ناسازگاری تعاریف متریال سرامیکی مابین کلوپ طراحان لندن، کارخانه و وبسایت.',
      roiJustificationEn: 'Cures catalog discrepancies across regional sites, pricing structures and active BIM exporters.'
    },
    {
      id: 'proc-infra-dam',
      titleFa: 'سیستم ذخیره‌سازی ابری و توزیع پیشرفته دارایی‌های دیجیتال رزولوشن بالا (DAM)',
      titleEn: 'Secure Cloud Digital Asset Management (DAM) system for 16K Multi-channel textures',
      subProjectFa: 'زیرساخت‌های دیجیتال سیستم‌ها',
      subProjectEn: 'Corporate Business Systems',
      type: 'SERVICE',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'شرکت فناوری ابری پارتنوپ (میلان)',
      partnerAgencyEn: 'Partenope Cloud Technologies SpA (Milan)',
      estimatedCost: 29000,
      status: 'CONTRACTED',
      keyDeliverablesFa: [
        'میزبانی ابری ایمن الگوهای ۱۶K اسکن شده سنگ‌های تراورتن، مرمریت و اونیکس',
        'سیستم رمزگذاری توکن‌های یکبارمصرف دسترسی معتمد جهت توزیع فایل‌های سنگین BIM',
        'همگام‌سازی توزیع فایل‌ها (CDN جادویی) برای دفاتر لندن، میلان و توکیو برای رندرهای همزمان'
      ],
      keyDeliverablesEn: [
        'Secure multi-region cloud hosting for massive 16,000-pixel normal and texture layers',
        'Tokenized micro-expires securing heavy-duty download links of VIP designer CAD models',
        'Ultra-fast global edge CDN routing optimized for rapid design team and architect retrieval'
      ],
      contactPerson: 'Elena Moretti',
      slaQualityScore: 98,
      riskLevel: 'LOW',
      roiJustificationFa: 'محافظت از فایل‌های رندر گران‌بهای ودسیا قبل از انتشار تجاری و جلوگیری از لیسانس‌های جعلی.',
      roiJustificationEn: 'Safeguards copyrighted structural stone models while elevating file delivery speeds globally.'
    },
    {
      id: 'proc-infra-iot',
      titleFa: 'آرایه دوربین‌های هوشمند تحت شبکه، دوربین‌های امنیتی و مانیتورینگ تراکم جمعیت اینترنت اشیاء (IoT Camera)',
      titleEn: 'Smart IoT Intelligent Video Analytics, High-Definition Booth Security & Heatmapping Cameras',
      subProjectFa: 'سیستم‌های نظارتی و اینترنت اشیاء',
      subProjectEn: 'Monitoring Systems & IoT',
      type: 'GOODS',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'گروه سیستم‌های هوشمند داهوا شعبه اروپا',
      partnerAgencyEn: 'Dahua Intelligent Systems SpA & IoT Sourcing (Italy)',
      estimatedCost: 18000,
      status: 'DELIVERED',
      keyDeliverablesFa: [
        'نصب ۶ وب‌کم مینیاتوری پرتابل متصل به ابر با کیفیت ضبط 4K',
        'تحلیل تراکم مخاطبان جلوی پانل چیدمان بلوک‌های کوبوگو و گزارش بیومتریک زمان ماندگاری',
        'سیستم امنیتی حفاظت فیزیکی شبانه غرفه و قالب‌های گران‌قیمت کالیته توسکانی'
      ],
      keyDeliverablesEn: [
        '6 discrete, high-aesthetic 4K network cameras syncing to cloud stream consoles',
        'Real-time automated crowd density & physical Cobogo block structure heatmapping analytics reports',
        'Live nightguard notifications detecting unauthorized movement around precious stone swatches'
      ],
      contactPerson: 'Dr. Luca Rossi',
      slaQualityScore: 95,
      riskLevel: 'MEDIUM',
      roiJustificationFa: 'گزارش داده‌های ارزشمند از محبوب‌ترین طرح‌های ترجیحی معماران در طول نمایشگاه جهت تنظیم کالیبر کارخانه.',
      roiJustificationEn: 'Calculates active viewer interest for each stone surface, giving feedback data directly to production teams.'
    },
    {
      id: 'proc-catering',
      titleFa: 'پذیرایی لوکس، تشریفات دیپلماتیک و کترینگ درجه یک با باریستاهای سوئیسی و زعفران اصیل ایرانی',
      titleEn: 'Diplomatic VIP Saffron & Espresso Catering Service & Hospitality Concierge',
      subProjectFa: 'تشریفات و پذیرایی لوکس',
      subProjectEn: 'VIP Saffron & Elite Catering',
      type: 'GOODS',
      model: 'OUTSOURCED',
      partnerAgencyFa: 'کترینگ بین‌المللی کوا (میلان)',
      partnerAgencyEn: 'Cova Luxury Sourcing & High-Tier Catering SpA (Milan)',
      estimatedCost: 42000,
      status: 'CONTRACTED',
      keyDeliverablesFa: [
        'سرویس روزانه چای نفیس زعفرانی در فنجان‌های لبه طلایی دست‌ساز همراه با خاویار خزر',
        'تامین باریستای ایتالیایی حرفه‌ای جهت تهیه قهوه اسپرسو ویژه بازدیدکنندگان VIP',
        'خدمه چندزبانه حرفه‌ای آموزش‌دیده جهت ارتباط با خریداران تراز اول اروپایی'
      ],
      keyDeliverablesEn: [
        'Daily servicing of ultra-premium Persian saffron infusions coupled with luxury Caviar tasting',
        'Top-tier Milanese baristas handling limited-edition single-origin coffee grinds in gold cutlery',
        'Bespoke luxury hospitality hosts trained in diplomatic-tier B2B sales etiquette and language'
      ],
      contactPerson: 'Chef Giovanni Cova',
      slaQualityScore: 99,
      riskLevel: 'LOW',
      roiJustificationFa: 'تأثیر روان‌شناختی پذیرایی نفیس در بالا بردن زمان گفت‌وگوهای سنگین تجاری و امضای تفاهم‌نامه‌ها.',
      roiJustificationEn: 'Ensures maximum client dwell time on the lounge, directly impacting deep contract sign-ups.'
    }
  ]);

  // Form registration state for the CEO to Add New Outsourcing Agencies
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form Fields
  const [formId, setFormId] = useState('proc-new');
  const [formTitleFa, setFormTitleFa] = useState('');
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formSubFa, setFormSubFa] = useState('');
  const [formSubEn, setFormSubEn] = useState('');
  const [formType, setFormType] = useState<'GOODS' | 'SERVICE'>('SERVICE');
  const [formModel, setFormModel] = useState<'OUTSOURCED' | 'INSOURCED'>('OUTSOURCED');
  const [formAgencyFa, setFormAgencyFa] = useState('');
  const [formAgencyEn, setFormAgencyEn] = useState('');
  const [formCost, setFormCost] = useState<number>(30000);
  const [formStatus, setFormStatus] = useState<'NEGOTIATION' | 'CONTRACTED' | 'DELIVERED' | 'ASSIGNED'>('NEGOTIATION');
  const [formContact, setFormContact] = useState('');
  const [formDeliverableFa, setFormDeliverableFa] = useState('');
  const [formDeliverableEn, setFormDeliverableEn] = useState('');
  const [formRoiFa, setFormRoiFa] = useState('');
  const [formRoiEn, setFormRoiEn] = useState('');
  const [formRisk, setFormRisk] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');

  // Interactive filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | 'GOODS' | 'SERVICE'>('ALL');
  const [selectedModel, setSelectedModel] = useState<'ALL' | 'OUTSOURCED' | 'INSOURCED'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Currently inspected item
  const [selectedItem, setSelectedItem] = useState<ProcurementItem | null>(null);
  
  // Custom interactive strategic state: Current Audit category
  const [strategicReviewCategory, setStrategicReviewCategory] = useState<'ALL' | 'WEB' | 'CATALOG' | 'SAMPLES' | 'PR' | 'PRINT' | 'INFRA' | 'CATERING'>('ALL');

  // Compute live statistics based on state
  const stats = useMemo(() => {
    const totalOutsourcedVal = items.filter(i => i.model === 'OUTSOURCED').length;
    const totalInsourcedVal = items.filter(i => i.model === 'INSOURCED').length;
    
    const totalOutsourcedCost = items.filter(i => i.model === 'OUTSOURCED').reduce((sum, item) => sum + item.estimatedCost, 0);
    const totalInsourcedCost = items.filter(i => i.model === 'INSOURCED').reduce((sum, item) => sum + item.estimatedCost, 0);

    const activeAgencies = Array.from(new Set(items.map(i => i.partnerAgencyFa))).length;
    
    // Average Quality SLA Score
    const weightedSlaSum = items.reduce((sum, item) => sum + (item.slaQualityScore || 90), 0);
    const avgSla = items.length > 0 ? Math.round(weightedSlaSum / items.length) : 95;

    return {
      outsourcedCount: totalOutsourcedVal,
      insourcedCount: totalInsourcedVal,
      outsourcedCost: totalOutsourcedCost,
      insourcedCost: totalInsourcedCost,
      totalCost: totalOutsourcedCost + totalInsourcedCost,
      agenciesCount: activeAgencies,
      averageSla: avgSla
    };
  }, [items]);

  // Handle addition of a new agency contract
  const handleSubmitNewAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitleFa || !formTitleEn || !formAgencyFa || !formAgencyEn) {
      triggerNotification(
        t('خطا: لطفاً تمام فیلدهای ستاره‌دار را تکمیل بفرمایید.', 'Error: Please fill in all required fields.'),
        true
      );
      return;
    }

    const uniqueId = `proc-${Math.round(Math.random() * 1000)}`;
    const newRecord: ProcurementItem = {
      id: uniqueId,
      titleFa: formTitleFa,
      titleEn: formTitleEn,
      subProjectFa: formSubFa || t('توسعه و برون‌سپاری فرعی', 'General Sub-Project'),
      subProjectEn: formSubEn || 'General Sourcing Operations',
      type: formType,
      model: formModel,
      partnerAgencyFa: formAgencyFa,
      partnerAgencyEn: formAgencyEn,
      estimatedCost: Number(formCost) || 25000,
      status: formStatus,
      keyDeliverablesFa: formDeliverableFa ? formDeliverableFa.split('&n').map(d => d.trim()) : [t('انجام خدمات عمومی ذیل مفاد قرارداد', 'General Contractual Clause Compliance')],
      keyDeliverablesEn: formDeliverableEn ? formDeliverableEn.split('&n').map(d => d.trim()) : ['Fulfill general terms & delivery guidelines'],
      contactPerson: formContact || 'Strategic Admin Lead',
      slaQualityScore: 95,
      riskLevel: formRisk,
      roiJustificationFa: formRoiFa || t('تضمین استاندارد لوکس برند در فاز بهره‌برداری.', 'Secures flagship quality tiers and scales operations under time bounds.'),
      roiJustificationEn: formRoiEn || 'Validates premium standard levels and ensures robust execution windows.'
    };

    setItems([newRecord, ...items]);
    setShowAddForm(false);
    triggerNotification(
      t(`قرارداد آژانس ${formAgencyFa} با شناسه ${uniqueId} با موفقیت ثبت علمی گردید.`, `Agency Contract ${formAgencyEn} successfully logged as ${uniqueId}.`)
    );

    // Reset Form fields
    setFormTitleFa('');
    setFormTitleEn('');
    setFormSubFa('');
    setFormSubEn('');
    setFormAgencyFa('');
    setFormAgencyEn('');
    setFormCost(30000);
    setFormContact('');
    setFormDeliverableFa('');
    setFormDeliverableEn('');
    setFormRoiFa('');
    setFormRoiEn('');
  };

  const triggerNotification = (msg: string, isError = false) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Filter dataset dynamically
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = 
        item.titleFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.partnerAgencyFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.partnerAgencyEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'ALL' || item.type === selectedType;
      const matchesModel = selectedModel === 'ALL' || item.model === selectedModel;
      const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

      // Group context mapping for the Strategic Deep Review Filter
      let matchesStrategicReviewCategory = true;
      if (strategicReviewCategory === 'WEB') {
        matchesStrategicReviewCategory = item.id === 'proc-web' || item.subProjectFa.includes('وبسایت');
      } else if (strategicReviewCategory === 'CATALOG') {
        matchesStrategicReviewCategory = item.id === 'proc-catalog' || item.subProjectFa.includes('کاتالوگ');
      } else if (strategicReviewCategory === 'SAMPLES') {
        matchesStrategicReviewCategory = item.id === 'proc-samples' || item.subProjectFa.includes('نمونه');
      } else if (strategicReviewCategory === 'PR') {
        matchesStrategicReviewCategory = item.id === 'proc-pr' || item.subProjectFa.includes('روابط عمومی') || item.subProjectFa.includes('PR');
      } else if (strategicReviewCategory === 'PRINT') {
        matchesStrategicReviewCategory = item.id === 'proc-print' || item.subProjectFa.includes('چاپ');
      } else if (strategicReviewCategory === 'INFRA') {
        matchesStrategicReviewCategory = item.id.includes('infra') || item.subProjectFa.includes('زیرساخت') || item.subProjectFa.includes('سیستم') || item.subProjectFa.includes('دوربین');
      } else if (strategicReviewCategory === 'CATERING') {
        matchesStrategicReviewCategory = item.id.includes('catering') || item.subProjectFa.includes('پذیرایی') || item.subProjectFa.includes('تشریفات') || item.subProjectFa.includes('غذا');
      }

      return matchesSearch && matchesType && matchesModel && matchesStatus && matchesStrategicReviewCategory;
    });
  }, [items, searchTerm, selectedType, selectedModel, selectedStatus, strategicReviewCategory]);

  // Adjust contract budget value directly from Deep Review panel
  const handleUpdateBudget = (id: string, newBudget: number) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return { ...item, estimatedCost: newBudget };
      }
      return item;
    });
    setItems(updated);
    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, estimatedCost: newBudget });
    }
    triggerNotification(
      t(`بودجه قرارداد ${id} به €${newBudget.toLocaleString()} تعدیل گردید.`, `Approved budget for contract ${id} updated to €${newBudget.toLocaleString()}.`)
    );
  };

  // Adjust SLA rating directly
  const handleUpdateSlaScore = (id: string, score: number) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return { ...item, slaQualityScore: score };
      }
      return item;
    });
    setItems(updated);
    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, slaQualityScore: score });
    }
  };

  // Switch between external outsourcing and in-house execution
  const handleToggleModel = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = items.map(item => {
      if (item.id === id) {
        const nextModel = item.model === 'OUTSOURCED' ? 'INSOURCED' : 'OUTSOURCED';
        
        let partnerFa = '';
        let partnerEn = '';
        let statusValue: typeof item.status = 'ASSIGNED';

        if (nextModel === 'INSOURCED') {
          partnerFa = 'ستاد داخلی توسعه دیجیتال و مهندسی هلدینگ پارس';
          partnerEn = 'In-house IT and Technical Directorate (Internal Squad)';
          statusValue = 'ASSIGNED';
        } else {
          // Fallback to original or default agency
          if (item.id === 'proc-web') {
            partnerFa = 'آژانس خلاق دیجیتال نیکولا (میلان/سوئیس)';
            partnerEn = 'Nicola Creative Studio & WebGL SpA (Milan/Zurich)';
          } else if (item.id === 'proc-catalog') {
            partnerFa = 'آژانس برندینگ بین‌المللی آوانگارد (لندن/میلان)';
            partnerEn = 'Avantgarde Luxury Branding Directory SpA (London/Milan)';
          } else if (item.id === 'proc-samples') {
            partnerFa = 'کارگاه لوکس صنایع دستی چرم آلبرتینی (فلورانس)';
            partnerEn = 'Albertini Leather Crafts SpA & Metalwork (Florence)';
          } else {
            partnerFa = 'آژانس همکار تخصصی اروپایی (پیمانکار بیرونی)';
            partnerEn = 'Sourced European Luxury Specialist Agency';
          }
          statusValue = 'CONTRACTED';
        }

        return {
          ...item,
          model: nextModel,
          partnerAgencyFa: partnerFa,
          partnerAgencyEn: partnerEn,
          status: statusValue
        };
      }
      return item;
    });
    setItems(updated);
    triggerNotification(
      t('مدل عملیاتی این ردیف پیمانکار با موفقیت تغییر موضع داد.', 'Operational execution model successfully toggled.')
    );
  };

  const activeAuditCategoryDetail = useMemo(() => {
    const matched = items.find(i => {
      if (strategicReviewCategory === 'WEB') return i.id === 'proc-web';
      if (strategicReviewCategory === 'CATALOG') return i.id === 'proc-catalog';
      if (strategicReviewCategory === 'SAMPLES') return i.id === 'proc-samples';
      if (strategicReviewCategory === 'PR') return i.id === 'proc-pr';
      if (strategicReviewCategory === 'PRINT') return i.id === 'proc-print';
      if (strategicReviewCategory === 'INFRA') return i.id === 'proc-infra-crm';
      if (strategicReviewCategory === 'CATERING') return i.id === 'proc-catering';
      return false;
    });
    return matched || null;
  }, [items, strategicReviewCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="space-y-6"
    >
      {/* Dynamic Pop-up Notification HUD */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-full bg-onyx/95 backdrop-blur-xl border border-gold/40 p-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
              <Check size={16} />
            </div>
            <p className="text-[11px] text-cream leading-relaxed font-sans-fa">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP METRIC STRATEGIC DECISIONS MATRIX OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Cost Asset */}
        <div className="luxury-glass p-5 rounded-[20px] border border-white/5 bg-[#080808]/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 text-cream/40 text-[9px] font-mono tracking-widest uppercase">
            <Package size={11} className="text-gold" />
            <span>{t('برآورد کل بودجه تأمین', 'TOTAL ESTIMATED SOURCING')}</span>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-black font-mono text-gold">€{stats.totalCost.toLocaleString()}</span>
            <p className="text-[10px] text-cream/50 mt-1">{t('کالاها و خدمات تأیید شده', 'Total approved procurement budget')}</p>
          </div>
        </div>

        {/* Outsourcing Counter */}
        <div className="luxury-glass p-5 rounded-[20px] border border-white/5 bg-onyx/[0.2] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 text-cream/40 text-[9px] font-mono tracking-widest uppercase">
            <Workflow size={11} className="text-emerald-400" />
            <span>{t('اقلام برون‌سپاری (آژانس‌ها)', 'OUTSOURCED LINES')}</span>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-black font-mono text-emerald-400">{stats.outsourcedCount} {t('آیتم', 'Items')}</span>
            <div className="flex justify-between items-center text-[10px] text-cream/50 mt-1">
              <span>{t('حجم ارزی برون‌سپاری:', 'Total value:')}</span>
              <span className="font-mono text-emerald-400/90 font-bold">€{stats.outsourcedCost.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Insourcing Counter */}
        <div className="luxury-glass p-5 rounded-[20px] border border-white/5 bg-[#0c1410]/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 text-cream/40 text-[9px] font-mono tracking-widest uppercase">
            <Users size={11} className="text-indigo-400" />
            <span>{t('سهم درون‌سپاری (ظرفیت داخلی)', 'IN-HOUSE ALLOCATION')}</span>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-black font-mono text-indigo-400">{stats.insourcedCount} {t('آیتم', 'Items')}</span>
            <div className="flex justify-between items-center text-[10px] text-cream/50 mt-1">
              <span>{t('هزینه تخصیص داخلی:', 'Internal cost equivalents:')}</span>
              <span className="font-mono text-indigo-400/90 font-bold">€{stats.insourcedCost.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* SLA Compliance Rate rating */}
        <div className="luxury-glass p-5 rounded-[20px] border border-white/5 bg-[#080808]/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 text-cream/40 text-[9px] font-mono tracking-widest uppercase">
            <Award size={11} className="text-gold" />
            <span>{t('شاخص میانگین کیفیت آژانس‌ها', 'PARTNER SLA COMPLIANCE')}</span>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-black font-mono text-gold">{stats.averageSla}%</span>
            <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t('سطح استاندارد پذیرفتنی لوکس', 'Premium quality tier certified')}
            </p>
          </div>
        </div>

      </div>

      {/* 2. STRATEGIC EXPLANATORY HEADER FOR THE CEO */}
      <div className="luxury-glass p-6 rounded-[22px] border border-white/5 bg-black/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0 mt-0.5 animate-pulse">
              <Brain size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black text-gold uppercase tracking-[0.1em] font-sans">
                {t('سامانه رصد کالاها، خدمات و مدیریت آژانس‌ها و شرکا', 'Bilateral Sourcing & Agency Command Dashboard')}
              </h4>
              <p className="text-[11.5px] text-cream/70 leading-relaxed text-justify font-sans-fa">
                {t(
                  'مدیرعامل ارشد از این بخش به ردیابی عمیق تامین محصولات فیجیتال (Phygital) و کنترل آژانس‌های برون‌سپاری خدمات لوکس در حوزه‌های حساس وب‌سایت WebGL، کاتالوگ مونوگراف، روابط عمومی با لیدهای میلان، هدیه نمونه‌ها و چاپ سنگین دسترسی دارد. ساختارهای موازی می‌توانند در لحظه برای تغییر موازنه مالی میان درون‌سپاری سازمانی و برون‌سپاری بین‌المللی تحلیل و ویرایش شوند.',
                  'Enables high-fidelity tracking of phygital assets and deep-tier external agency procurement. Real-time metrics reflect contractual adjustments on 3D WebGL Web development, Monograph layout catalogs, Luxury PR campaigns, leather sample swatches and physical shipping logistics.'
                )}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-gradient-to-r from-gold/80 to-gold text-onyx font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-gold/10 hover:shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0 self-end md:self-auto font-sans"
          >
            {showAddForm ? <X size={14} /> : <Plus size={14} />}
            {showAddForm ? t('بستن فرم ثبت', 'Close Registration') : t('ثبت آژانس/قرارداد جدید', 'Log New Agency Contract')}
          </button>
        </div>
      </div>

      {/* 3. DYNAMIC FORM TO LOG NEW OUTSOURCING CONTRACT */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmitNewAgency} className="luxury-glass p-6 rounded-2xl border border-white/10 bg-[#09090c] space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Bookmark size={14} className="text-gold" />
                <span className="text-xs font-black uppercase tracking-widest text-gold">{t('ثبت رسمی هویت پیمانکار و قرارداد برون‌سپاری جدید', 'OFFICIAL VENDOR REGISTRATION & OUTSOURCING RECORD')}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Title FA */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('عنوان قرارداد (فارسی) *', 'Contract Title (Persian) *')}</label>
                  <input 
                    type="text" 
                    placeholder="مثال: چاپ کاتالوگ عریض نقره‌کوب حسی"
                    value={formTitleFa}
                    onChange={(e) => setFormTitleFa(e.target.value)}
                    className="w-full bg-black/45 border border-white/5 focus:border-gold/35 rounded-lg p-2 text-cream outline-none font-sans-fa"
                  />
                </div>

                {/* Title EN */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('عنوان قرارداد (انگلیسی) *', 'Contract Title (English) *')}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Premium Silkbound Monograph Printing"
                    value={formTitleEn}
                    onChange={(e) => setFormTitleEn(e.target.value)}
                    className="w-full bg-black/45 border border-white/5 focus:border-gold/35 rounded-lg p-2 text-cream outline-none font-sans"
                  />
                </div>

                {/* Subproject Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('زیرپروژه متصل (وبسایت/چاپ/کاتالوگ) *', 'Scope Cluster Type *')}</label>
                  <select 
                    value={formSubFa}
                    onChange={(e) => {
                      setFormSubFa(e.target.value);
                      if (e.target.value.includes('وبسایت')) setFormSubEn('Website Portal & WebGL Development');
                      else if (e.target.value.includes('کاتالوگ')) setFormSubEn('Sourcing Bespoke Catalogs');
                      else if (e.target.value.includes('نمونه')) setFormSubEn('Physical Haptic Swatch Boxes');
                      else if (e.target.value.includes('روابط')) setFormSubEn('Global Luxury PR and Media Placement');
                      else if (e.target.value.includes('چاپ')) setFormSubEn('Premium Brand Graphics Printing');
                      else setFormSubEn('Auxiliary Specialist Sourcing');
                    }}
                    className="w-full bg-black/45 border border-white/5 focus:border-gold/35 rounded-lg p-2 text-cream outline-none font-sans"
                  >
                    <option value="">{t('-- انتخاب دسته‌بندی موضوعی --', '-- Select Scope Pillar --')}</option>
                    <option value="وبسایت و پرتال دیجیتال">{t('توسعه وبسایت و موتورهای سه‌بعدی دیجیتال', 'Website & 3D Interactive portals')}</option>
                    <option value="طراحی کتابچه‌ها و کاتالوگ جامع">{t('آماده‌سازی سناریو و کاتالوگ نفیس بین‌المللی', 'Executive Monograph Layout & Catalogs')}</option>
                    <option value="بسته‌های هدیه و سمپل باکس‌ها">{t('تامین نمونه‌های لوکس و جعبه کالیته‌ها', 'Samples Design & Handmade cases')}</option>
                    <option value="کمپین PR و روابط عمومی فرامرزی">{t('روابط عمومی، رسانه لوکس و هماهنگی دیلرها', 'International PR Diplomacy & Events')}</option>
                    <option value="امور چاپ نفیس غرفه و برند">{t('چاپ با فویل متالیک، بروشورها و لوازم غرفه', 'Premium Printing, Stationary & Combat cards')}</option>
                    <option value="توسعه و برون‌سپاری فرعی">{t('سایر زیرعملیات‌های کالا و خدمات فنی غرفه', 'Other Specialized Services / Freight')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                {/* Agency FA */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('نام آژانس پیمانکار (فارسی) *', 'Vendor Agency Title (Fa) *')}</label>
                  <input 
                    type="text" 
                    placeholder="مثال: استودیو نشر سلطنتی رم"
                    value={formAgencyFa}
                    onChange={(e) => setFormAgencyFa(e.target.value)}
                    className="w-full bg-black/45 border border-white/5 focus:border-gold/35 rounded-lg p-2 text-cream outline-none font-sans-fa"
                  />
                </div>

                {/* Agency EN */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('نام آژانس پیمانکار (انگلیسی) *', 'Vendor Agency Title (En) *')}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Roma Royal Press Atelier"
                    value={formAgencyEn}
                    onChange={(e) => setFormAgencyEn(e.target.value)}
                    className="w-full bg-black/45 border border-white/5 focus:border-gold/35 rounded-lg p-2 text-cream outline-none font-sans"
                  />
                </div>

                {/* Budget Cost */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('برآورد ارزش مالی قرارداد (€) *', 'Contract Value Budget (€) *')}</label>
                  <input 
                    type="number" 
                    value={formCost}
                    onChange={(e) => setFormCost(Number(e.target.value))}
                    className="w-full bg-black/45 border border-white/5 focus:border-gold/35 rounded-lg p-2 text-cream outline-none font-mono"
                  />
                </div>

                {/* Contact Person */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('نماینده رابط یا مسئول فیدبک', 'Designated Rep Contact')}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Marcello Rossi"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    className="w-full bg-black/45 border border-white/5 focus:border-gold/35 rounded-lg p-2 text-cream outline-none font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Deliverables FA */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('تعهدات و دستاوردهای کلیدی (جدا شده با &n)', 'Key SLA Deliverables (separate lines with &n)')}</label>
                  <textarea 
                    rows={2}
                    placeholder="مثال: طراحی جلد گلاسه کتان &n چاپ با ورق نقره متالیک ضد آب"
                    value={formDeliverableFa}
                    onChange={(e) => setFormDeliverableFa(e.target.value)}
                    className="w-full bg-black/45 border border-white/5 focus:border-gold/35 rounded-lg p-2 text-cream outline-none font-sans-fa"
                  />
                </div>

                {/* Deliverables EN */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('دستاوردهای کلیدی انگلیسی (جدا شده با &n)', 'Key SLA Deliverables English (separate metrics with &n)')}</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Hardcover linen binding &n Gold hot-stamped thermal signatures"
                    value={formDeliverableEn}
                    onChange={(e) => setFormDeliverableEn(e.target.value)}
                    className="w-full bg-black/45 border border-white/5 focus:border-gold/35 rounded-lg p-2 text-cream outline-none font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Status Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('وضعیت اجرایی فرآیند', 'Supply Sourcing Status')}</label>
                  <div className="flex gap-2">
                    {(['NEGOTIATION', 'CONTRACTED', 'DELIVERED'] as const).map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setFormStatus(st)}
                        className={`flex-1 p-2 rounded-lg border font-bold transition-all ${
                          formStatus === st
                            ? 'bg-gold/15 border-gold text-gold'
                            : 'bg-black/45 border-white/5 text-cream/50 hover:text-cream'
                        }`}
                      >
                        {st === 'NEGOTIATION' ? t('مذاکره/بافرز', 'Negotiation') : st === 'CONTRACTED' ? t('قرارداد قطعی', 'Contracted') : t('تحویل نهایی', 'Delivered')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sourcing Model */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('مدل تخصیص نیرو', 'Sourcing Blueprint')}</label>
                  <div className="flex gap-2">
                    {(['OUTSOURCED', 'INSOURCED'] as const).map(md => (
                      <button
                        key={md}
                        type="button"
                        onClick={() => setFormModel(md)}
                        className={`flex-1 p-2 rounded-lg border font-bold transition-all ${
                          formModel === md
                            ? 'bg-gold/15 border-gold text-gold'
                            : 'bg-black/45 border-white/5 text-cream/50 hover:text-cream'
                        }`}
                      >
                        {md === 'OUTSOURCED' ? t('برون‌سپاری آژانسی', 'Outsourced') : t('درون‌سپاری داخلی', 'In-house')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Risk Level selection */}
                <div className="space-y-1">
                  <label className="text-[10px] text-cream/50 font-bold block">{t('سطح ریسک لجستیکی/تعهدی', 'Logistical / Contractual Risk Level')}</label>
                  <div className="flex gap-2">
                    {(['LOW', 'MEDIUM', 'HIGH'] as const).map(rk => (
                      <button
                        key={rk}
                        type="button"
                        onClick={() => setFormRisk(rk)}
                        className={`flex-1 p-2 rounded-lg border font-bold transition-all ${
                          formRisk === rk
                            ? rk === 'HIGH' ? 'bg-rose-500/15 border-rose-500 text-rose-400' : rk === 'MEDIUM' ? 'bg-amber-500/15 border-amber-500 text-amber-400' : 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                            : 'bg-black/45 border-white/5 text-cream/50 hover:text-cream'
                        }`}
                      >
                        {rk === 'LOW' ? t('کم', 'Low') : rk === 'MEDIUM' ? t('متوسط', 'Medium') : t('بالا/حساس', 'High')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-white/5 text-cream/50 hover:bg-white/5 rounded-lg font-bold"
                >
                  {t('انصراف', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-gold/90 to-gold text-onyx font-sans rounded-lg font-black shadow-lg shadow-gold/15 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  {t('ثبت رسمی قرارداد و کالیبره بودجه', 'Register & Adjust Budgets Live')}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. INTERACTIVE AUDIT EXPLORATION CONSOLE (بررسی عمیق استراتژیک آژانس‌ها) */}
      <div className="luxury-glass p-5 rounded-3xl border border-gold/10 bg-[#07070a]/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/5 pb-4 mb-4 gap-4">
          <div>
            <span className="text-[8px] font-mono font-black text-gold uppercase tracking-[0.2em] block mb-1">
              {t('سامانه مانیتورینگ هزینه‌ها و تطبیق استراتژیک (بررسی عمیق)', 'EXECUTIVE STRATEGIC DEEP REVIEW MATRIX')}
            </span>
            <h3 className="text-sm font-black text-cream flex items-center gap-1.5 font-sans-fa">
              <Brain size={14} className="text-gold animate-pulse" />
              {t('تحلیل عمیق برون‌سپاری‌ها: عارضه، توجیه مالی و کنترل ریسک آژانس‌ها', 'Sourcing Justification, SLA Validation & Logistical Risk Tiers')}
            </h3>
          </div>

          {/* Quick Pillar switcher */}
          <div className="flex flex-wrap bg-black/60 p-1 rounded-xl border border-white/5 text-[9px] font-bold gap-1">
            <button
              onClick={() => setStrategicReviewCategory('ALL')}
              className={`px-2.5 py-1 rounded transition-all ${strategicReviewCategory === 'ALL' ? 'bg-gold text-onyx font-bold' : 'text-cream/50 hover:text-cream'}`}
            >
              {t('همه دسته‌ها', 'All Domains')}
            </button>
            <button
              onClick={() => setStrategicReviewCategory('WEB')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${strategicReviewCategory === 'WEB' ? 'bg-gold text-onyx font-bold' : 'text-cream/50 hover:text-cream'}`}
            >
              <Workflow size={9} />
              {t('۱. وب‌سایت WebGL', '1. WebGL Website')}
            </button>
            <button
              onClick={() => setStrategicReviewCategory('CATALOG')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${strategicReviewCategory === 'CATALOG' ? 'bg-gold text-onyx font-bold' : 'text-cream/50 hover:text-cream'}`}
            >
              <FileText size={9} />
              {t('۲. کاتالوگ مونوگراف', '2. Bespoke Catalog Portfolio')}
            </button>
            <button
              onClick={() => setStrategicReviewCategory('SAMPLES')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${strategicReviewCategory === 'SAMPLES' ? 'bg-gold text-onyx font-bold' : 'text-cream/50 hover:text-cream'}`}
            >
              <Package size={9} />
              {t('۳. نمونه‌های سنگ چرمی', '3. Haptic Sample Boxes')}
            </button>
            <button
              onClick={() => setStrategicReviewCategory('PR')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${strategicReviewCategory === 'PR' ? 'bg-gold text-onyx font-bold' : 'text-cream/50 hover:text-cream'}`}
            >
              <Users size={9} />
              {t('۴. روابط عمومی میلان', '4. Gallo PR Agency')}
            </button>
            <button
              onClick={() => setStrategicReviewCategory('PRINT')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${strategicReviewCategory === 'PRINT' ? 'bg-gold text-onyx font-bold' : 'text-cream/50 hover:text-cream'}`}
            >
              <Sliders size={9} />
              {t('۵. چاپ نفیس غرفه', '5. Heavy Lithography')}
            </button>
            <button
              onClick={() => setStrategicReviewCategory('INFRA')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${strategicReviewCategory === 'INFRA' ? 'bg-gold text-onyx font-bold' : 'text-cream/50 hover:text-cream'}`}
            >
              <Workflow size={9} />
              {t('۶. زیرساخت دیجیتال', '6. Digital Infra')}
            </button>
            <button
              onClick={() => setStrategicReviewCategory('CATERING')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${strategicReviewCategory === 'CATERING' ? 'bg-gold text-onyx font-bold' : 'text-cream/50 hover:text-cream'}`}
            >
              <Sparkles size={9} />
              {t('۷. پذیرایی VIP', '7. VIP Hospitality')}
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Panel reflecting active category */}
        {strategicReviewCategory === 'ALL' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: 'WEB', label: 'طراحی وب‌سایت سه‌بعدی و معماری ابری (وبسایت)', value: 'Nicola Studio', cost: 65000, risk: 'MEDIUM', text: 'کدهای سفارشی رندرینگ لایو بلوک‌های کوبوگو و مپ‌های هوشمند.' },
              { key: 'CATALOG', label: 'کاتالوگ و کتاب مونوگراف جلدسخت برند (کاتالوگ)', value: 'Avantgarde Agency', cost: 48000, risk: 'LOW', text: 'عکس‌های میکروسکپی بلورهای لعاب در لندن.' },
              { key: 'SAMPLES', label: 'جعبه‌های چرمی نفیس فلورانس و کالیته فیزیکی (نمونه‌ها)', value: 'Albertini SpA', cost: 52000, risk: 'HIGH', text: 'سختی حمل نمونه‌های نازک سنگ ۶ میلی‌متری مینیاتوری.' },
              { key: 'PR', label: 'اتصال دیپلماتیک با ۲۰ گالری و معمار میلان (روابط عمومی)', value: 'Gallo PR', cost: 70000, risk: 'MEDIUM', text: 'مصاحبه‌ها در مجله Casabella و تور با اتوبوس خصوصی.' },
              { key: 'PRINT', label: 'چاپ فویل متالیک غلیظ و ست اوراق (چاپ نفیس)', value: 'Umberto Royal Litho', cost: 35000, risk: 'LOW', text: 'قفل مومی ضد آب و مهر طلاکوب نانو پلیمر.' },
              { key: 'INFRA', label: 'زیرساخت ابری لوکس (CRM, CDP, PIM, MDM, DAM, IoT)', value: 'SwissCloud & Dahua', cost: 130000, risk: 'LOW', text: 'اطلاعات یکپارچه محصول، مانیتورینگ هوشمند، نقشه حرارتی دوربین‌های غرفه و CRM مشتریان.' },
              { key: 'CATERING', label: 'پذیرایی تشریفاتی و کلاینت کترینگ لوکس (پذیرایی VIP)', value: 'Cova Catering Milan', cost: 42000, risk: 'LOW', text: 'سرویس زعفران اصل، قزل‌آلا و باریستاهای مجرب در میلان.' }
            ].map(pillar => (
              <div 
                key={pillar.key}
                onClick={() => setStrategicReviewCategory(pillar.key as any)}
                className="bg-white/[0.015] border border-white/5 hover:border-gold/20 p-4 rounded-2xl transition-all duration-300 cursor-pointer group hover:bg-black/30"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-cream group-hover:text-gold transition-all block max-w-[200px] font-sans-fa">{t(pillar.label, pillar.label)}</span>
                  <span className={`text-[7px] font-bold font-mono px-1.5 py-0.5 rounded ${
                    pillar.risk === 'HIGH' ? 'bg-rose-500/10 text-rose-400' : pillar.risk === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {t(pillar.risk, pillar.risk)} Risk
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-cream/45 border-b border-white/5 pb-2 mb-2 font-mono">
                  <span>{t('آژانس متعهد:', 'Agency:')} <strong className="text-cream text-[9.5px] font-sans-fa font-medium">{pillar.value}</strong></span>
                  <span className="text-gold font-black">€{pillar.cost.toLocaleString()}</span>
                </div>
                <p className="text-[8.5px] text-cream/60 leading-relaxed font-sans-fa">{t(pillar.text, pillar.text)}</p>
                <div className="mt-3 flex justify-end">
                  <span className="text-[8px] text-gold font-mono flex items-center gap-1 group-hover:translate-x-1 duration-200 uppercase">
                    {t('ورود به بررسی عمیق', 'Open Deep Review')} <ChevronRight size={10} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/[0.015] border border-white/5 p-4 md:p-6 rounded-2xl space-y-6">
            {activeAuditCategoryDetail ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Visual Risk Indicator gauge */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-black/55 p-4 rounded-xl border border-white/5">
                    <span className="text-[8px] text-cream/45 uppercase tracking-widest block font-mono mb-1">{t('ارزیابی سلامت و ریسک پیمانکار', 'Contract Compliance Health Meter')}</span>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        activeAuditCategoryDetail.riskLevel === 'HIGH' ? 'bg-rose-500 animate-pulse' : activeAuditCategoryDetail.riskLevel === 'MEDIUM' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-400'
                      }`} />
                      <span className="text-xs font-black text-cream">{t('ریسک لجستیکی: ', 'Logistical Risk: ')} {t(activeAuditCategoryDetail.riskLevel, activeAuditCategoryDetail.riskLevel)}</span>
                    </div>

                    {/* Progress score bar */}
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-3">
                      <div 
                        className={`h-full rounded-full ${
                          activeAuditCategoryDetail.riskLevel === 'HIGH' ? 'bg-rose-500' : activeAuditCategoryDetail.riskLevel === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-400'
                        }`}
                        style={{ width: activeAuditCategoryDetail.riskLevel === 'HIGH' ? '85%' : activeAuditCategoryDetail.riskLevel === 'MEDIUM' ? '50%' : '20%' }}
                      />
                    </div>
                    
                    <p className="text-[8.5px] text-cream/50 leading-relaxed font-sans-fa">
                      {activeAuditCategoryDetail.riskLevel === 'HIGH' ? (
                        t('هشدار ریسک بالا: وابستگی شدید به زنجیره تامین یا ظرفیت محدود نیروی کار کارگاه‌ها وجود دارد. پایش مستمر توصیه می‌شود.', 'High warning limit: Extreme reliance on specialized artisans or raw sea customs clears; backup contractors suggested.')
                      ) : activeAuditCategoryDetail.riskLevel === 'MEDIUM' ? (
                        t('ریسک متوسط: فرآیندهای همگام‌سازی وب‌سایت و باگ‌های کلاینت‌های اندروید/آیفون نیازمند بازنگری منظم هستند.', 'Medium risk constraints: Live code deployment requires strict daily pipeline integration testing.')
                      ) : (
                        t('وضعیت ریسک مطلوب: شریک تجاری معتبر با رزومه همکاری طولانی سازمانی در سطح فدراسیون‌های بزرگ است.', 'Desirable risk rate: Excellent commercial reputation under ISO regulations; guarantees stable release.')
                      )}
                    </p>
                  </div>

                  {/* Sourcing Cost/Benefit simulation slider */}
                  <div className="bg-black/55 p-4 rounded-xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] text-cream/45 uppercase tracking-widest block font-mono">{t('بهای بازرگانی قرارداد', 'AGREED INVOICE CEILING')}</span>
                      <span className="font-mono text-[10px] text-gold font-bold">€{activeAuditCategoryDetail.estimatedCost.toLocaleString()}</span>
                    </div>
                    
                    {/* Budget slider tuner */}
                    <input 
                      type="range" 
                      min={10000} 
                      max={150000} 
                      step={5000}
                      value={activeAuditCategoryDetail.estimatedCost} 
                      onChange={(e) => handleUpdateBudget(activeAuditCategoryDetail.id, Number(e.target.value))}
                      className="w-full accent-gold h-1 bg-white/10 rounded-lg appearance-none outline-none cursor-pointer"
                    />
                    
                    <div className="flex justify-between text-[7.5px] text-cream/40 font-mono">
                      <span>€10,000</span>
                      <span>{t('تغییر بازه بودجه قرارداد', 'Adjust approved values live')}</span>
                      <span>€150,000</span>
                    </div>

                    <div className="bg-gold/5 p-2 rounded border border-gold/15 text-[8.5px] text-cream/80 leading-relaxed font-sans-fa">
                      <TrendingUp size={10} className="inline mr-1 text-gold mb-0.5" />
                      <strong>{t('توجیه بازگشت سرمایه (ROI): ', 'ROI Justification: ')}</strong>
                      {t(activeAuditCategoryDetail.roiJustificationFa, activeAuditCategoryDetail.roiJustificationEn)}
                    </div>
                  </div>
                </div>

                {/* Audit and details summary text columns */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[7.5px] font-mono text-emerald-400 font-black tracking-widest block mb-0.5 uppercase">
                        {activeAuditCategoryDetail.id}
                      </span>
                      <h4 className="text-[12.5px] font-black text-cream font-sans-fa leading-normal">
                        {t(activeAuditCategoryDetail.titleFa, activeAuditCategoryDetail.titleEn)}
                      </h4>
                      <p className="text-[9.5px] text-cream/45 font-sans mt-0.5">
                        {t('آژانس متعهد معتبر: ', 'Licensed Agency: ')} <strong className="text-gold font-bold">{t(activeAuditCategoryDetail.partnerAgencyFa, activeAuditCategoryDetail.partnerAgencyEn)}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => setStrategicReviewCategory('ALL')}
                      className="text-[9px] text-cream/50 hover:text-cream flex items-center gap-1 border border-white/5 px-2 py-1 rounded bg-black/40 font-sans cursor-pointer"
                    >
                      <RefreshCw size={10} /> {t('بازگشت به لایه کلان', 'Back to Overview')}
                    </button>
                  </div>

                  {/* Audit Interactive Actions Flow */}
                  <div className="space-y-3.5">
                    <span className="text-[8.5px] text-gold uppercase font-mono tracking-widest block">{t('اقدامات نظارتی مستقیم مدیرعامل', 'DIRECT EXECUTIVE CONTROL ACTS')}</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => triggerNotification(t(`درخواست رسمی بازرسی مجدد بندهای تضمین کیفیت (SLA) به آژانس ${activeAuditCategoryDetail.partnerAgencyFa} ارسال گردید.`, `Official SLA Quality Reinforcement check sheet dispatched to ${activeAuditCategoryDetail.partnerAgencyEn}`))}
                        className="p-2.5 bg-white/[0.02] hover:bg-gold/15 border border-white/5 hover:border-gold/30 rounded-xl text-right text-cream hover:text-gold transition-all cursor-pointer font-sans"
                      >
                        <span className="text-[9px] font-black block">{t('درخواست ممیزی کیفیت (ISO)', 'Audit Quality Checklist')}</span>
                        <span className="text-[7.5px] text-cream/35 block mt-0.5 font-sans-fa">{t('تجسس مجدد بندها ارزیابی نفوذ', 'Re-evaluate delivery standards')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateSlaScore(activeAuditCategoryDetail.id, 99);
                          triggerNotification(t(`امتیاز SLA آژانس ${activeAuditCategoryDetail.partnerAgencyFa} به ۹۹٪ ارتقا یافت و مهر تأیید صادر شد.`, `Agencys Quality Performance certified at 99%.`));
                        }}
                        className="p-2.5 bg-emerald-500/[0.02] hover:bg-emerald-500/10 border border-emerald-500/10 hover:border-emerald-500/30 rounded-xl text-right text-cream hover:text-emerald-400 transition-all cursor-pointer font-sans"
                      >
                        <span className="text-[9px] font-black block">{t('تأییدیه نهایی بندهای SLA', 'Certify Partner Standards')}</span>
                        <span className="text-[7.5px] text-cream/35 block mt-0.5 font-sans-fa">{t('صدور نشان برنز تضمین کالا', 'Issue certified VIP trust pass')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleToggleModel(activeAuditCategoryDetail.id, e)}
                        className="p-2.5 bg-indigo-500/[0.02] hover:bg-indigo-500/10 border border-indigo-500/10 hover:border-indigo-500/30 rounded-xl text-right text-cream hover:text-indigo-400 transition-all cursor-pointer font-sans"
                      >
                        <span className="text-[9px] font-black block">
                          {activeAuditCategoryDetail.model === 'OUTSOURCED' ? t('درون‌سپاری فرآیند وب و چاپ', 'Insource Sourcing Path') : t('برون‌سپاری مجدد آژانسی', 'Outsource Sourcing Path')}
                        </span>
                        <span className="text-[7.5px] text-cream/35 block mt-0.5 font-sans-fa">{t('انتقال سریع مالکیت به ظرفیت داخل', 'Shift legal ownership limits')}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl space-y-3">
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{t('قراردادنامه و توافقات تفصیلی SLA', 'Active SLA Commitments & Fine Print')}</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px]">
                      {(lang === 'fa' ? activeAuditCategoryDetail.keyDeliverablesFa : activeAuditCategoryDetail.keyDeliverablesEn).map((clause, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2 text-cream/75 font-sans-fa leading-normal">
                          <CheckCircle2 size={11} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{clause}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <p className="text-center text-cream/40 text-xs font-sans py-6">{t('داده معتبری برای نمایش بررسی عمیق تفصیلی یافت نشد.', 'No details available for selected sector.')}</p>
            )}
          </div>
        )}

      </div>

      {/* 5. SEARCH AND FILTERS FOR MAIN TABLE */}
      <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col md:flex-row flex-wrap items-center justify-between gap-3 gap-y-3 relative">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder={t('جستجو در کالاها، آژانس‌ها و تعهدات...', 'Search products, agencies...')} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/5 hover:border-white/10 focus:border-gold/30 rounded-xl px-10 py-2 text-xs text-cream focus:outline-none transition-all placeholder:text-cream/30 font-sans"
          />
          <Search size={14} className="absolute left-3.5 top-3 text-cream/30" />
        </div>

        {/* Category: Goods vs Service */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          
          <div className="flex bg-black/50 p-1 rounded-xl border border-white/5 text-[10px]">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                selectedType === 'ALL' ? 'bg-gold/15 text-gold border border-gold/10' : 'text-cream/40 hover:text-cream/70'
              }`}
            >
              {t('همه دسته‌ها', 'All Categories')}
            </button>
            <button
              onClick={() => setSelectedType('GOODS')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                selectedType === 'GOODS' ? 'bg-gold/15 text-gold border border-gold/10' : 'text-cream/40 hover:text-cream/70'
              }`}
            >
              <Package size={11} />
              {t('کالا و متریال', 'Goods / Materials')}
            </button>
            <button
              onClick={() => setSelectedType('SERVICE')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                selectedType === 'SERVICE' ? 'bg-gold/15 text-gold border border-gold/10' : 'text-cream/40 hover:text-cream/70'
              }`}
            >
              <Briefcase size={11} />
              {t('خدمات و آژانس', 'Services / Press')}
            </button>
          </div>

          {/* Model Filter: Outsourced vs Insourced */}
          <div className="flex bg-black/50 p-1 rounded-xl border border-white/5 text-[10px]">
            <button
              onClick={() => setSelectedModel('ALL')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                selectedModel === 'ALL' ? 'bg-gold/15 text-gold' : 'text-cream/40 hover:text-cream/70'
              }`}
            >
              {t('همه حالت‌ها', 'All Models')}
            </button>
            <button
              onClick={() => setSelectedModel('OUTSOURCED')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                selectedModel === 'OUTSOURCED' ? 'bg-gold/15 text-gold' : 'text-cream/40 hover:text-cream/70'
              }`}
            >
              {t('برون‌سپاری', 'Outsourced')}
            </button>
            <button
              onClick={() => setSelectedModel('INSOURCED')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                selectedModel === 'INSOURCED' ? 'bg-gold/15 text-gold' : 'text-cream/40 hover:text-cream/70'
              }`}
            >
              {t('درون‌سپاری', 'Insourced')}
            </button>
          </div>

        </div>

      </div>

      {/* 5. PROCUREMENT MAIN HIGHLIGHT BOARD TABLE */}
      <div className="luxury-glass rounded-[24px] border border-white/5 bg-[#050505]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right ltr:text-left text-xs">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] font-bold text-cream/40 uppercase tracking-wider">
                <th className="p-4 pr-6 font-sans text-right">{t('سفارش / خدمت مورد نیاز آژانس', 'OUTSOURCING SUBPROJECT LINE')}</th>
                <th className="p-4 font-sans text-center">{t('دسته ساختاری', 'BUDGET GROUP')}</th>
                <th className="p-4 font-sans text-center">{t('مدل عملیاتی', 'EXECUTION MODEL')}</th>
                <th className="p-4 font-sans text-center">{t('آژانس متعهد / پیمانکار', 'PARTNER ENTITY')}</th>
                <th className="p-4 font-sans text-center">{t('هزینه برآورد (€)', 'CAPEX / APPROVED (€)')}</th>
                <th className="p-4 font-sans text-center">{t('کیفیت تعهدی SLA', 'CONTRACT SLA')}</th>
                <th className="p-4 font-sans text-center">{t('وضعیت تأمین', 'SUPPLY STATUS')}</th>
                <th className="p-4 pl-6 font-sans text-center">{t('عملیات استراتژی', 'STRATEGY SHIFT')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <tr 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-white/[0.01] transition-colors cursor-pointer group"
                  >
                    
                    {/* Title + Description */}
                    <td className="p-4 pr-6 max-w-[280px]">
                      <div className="font-bold text-cream group-hover:text-gold transition-colors font-sans-fa text-[11px] leading-relaxed">
                        {t(item.titleFa, item.titleEn)}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-right">
                        <span className="text-[8.5px] text-cream/40 bg-white/5 px-1.5 py-0.2 rounded border border-white/5 uppercase font-mono">
                          {item.id}
                        </span>
                        <span className="text-[9px] text-cream/40 truncate max-w-[180px] font-sans">
                          {t('زیرپروژه: ', 'Context: ')} {t(item.subProjectFa, item.subProjectEn)}
                        </span>
                      </div>
                    </td>

                    {/* Group Icon (Goods vs Service) */}
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/45 border border-white/5 text-[9px] text-cream/70 font-sans">
                        {item.type === 'GOODS' ? (
                          <>
                            <Package size={11} className="text-gold" />
                            <span>{t('کالای فیزیکی', 'Physical Goods')}</span>
                          </>
                        ) : (
                          <>
                            <Briefcase size={11} className="text-emerald-400" />
                            <span>{t('خدمات تخصصی', 'Specialized Service')}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Operational model */}
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider ${
                        item.model === 'OUTSOURCED' 
                          ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400' 
                          : 'bg-indigo-500/10 border border-indigo-500/25 text-indigo-400'
                      }`}>
                        {item.model === 'OUTSOURCED' ? t('برون‌سپاری آژانس', 'OUTSOURCED') : t('درون‌سپاری', 'INSOURCED')}
                      </span>
                    </td>

                    {/* Partner Agency name */}
                    <td className="p-4 text-center font-medium max-w-[180px]">
                      <p className="text-cream text-[10.5px] font-sans-fa truncate">{t(item.partnerAgencyFa, item.partnerAgencyEn)}</p>
                      <span className="text-[8px] text-cream/30 font-mono block mt-0.5 uppercase tracking-wide">
                        {t('رابط: ', 'Rep: ')}{item.contactPerson}
                      </span>
                    </td>

                    {/* Cost in Euros */}
                    <td className="p-4 text-center font-mono font-black text-rose-300 text-[11px]">
                      €{item.estimatedCost.toLocaleString()}
                    </td>

                    {/* SLA Progress health score */}
                    <td className="p-4 text-center-center">
                      <div className="flex flex-col items-center justify-center font-mono">
                        <span className="text-[10px] text-cream font-bold">{item.slaQualityScore}%</span>
                        <div className="w-12 bg-white/5 h-1 rounded-full overflow-hidden mt-1">
                          <div className="bg-gold h-full rounded-full" style={{ width: `${item.slaQualityScore}%` }} />
                        </div>
                      </div>
                    </td>

                    {/* Sourcing State status */}
                    <td className="p-4 text-center">
                      {item.status === 'DELIVERED' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[8.5px] font-bold text-emerald-400 uppercase">
                          <CheckCircle2 size={10} />
                          {t('تأمین و تحویل شده', 'delivered')}
                        </span>
                      ) : item.status === 'CONTRACTED' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-[8.5px] font-bold text-indigo-300 uppercase">
                          <ShieldCheck size={10} />
                          {t('پیمان قطعی آژانس', 'contracted')}
                        </span>
                      ) : item.status === 'NEGOTIATION' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold/10 border border-gold/30 text-[8.5px] font-bold text-gold uppercase animate-pulse">
                          <Activity size={10} />
                          {t('مذاکره/تدوین RFP', 'RFP in negotiation')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8.5px] font-bold text-cream/50 uppercase">
                          <Users size={10} />
                          {t('ارجاع به تیم داخلی', 'assigned in-house')}
                        </span>
                      )}
                    </td>

                    {/* Switch Toggle Button */}
                    <td className="p-4 text-center pl-6">
                      <button
                        type="button"
                        onClick={(e) => handleToggleModel(item.id, e)}
                        className="py-1 px-2 bg-white/5 hover:bg-gold/15 border border-white/10 hover:border-gold/30 text-[8.5px] font-bold text-cream/70 hover:text-gold uppercase rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-1 mx-auto"
                        title={t('تغییر مدل استراتژیک برون/درون‌سپاری', 'Toggle outplaced vs in-house')}
                      >
                        {item.model === 'OUTSOURCED' ? (
                          <>
                            <ToggleLeft size={13} className="text-emerald-400" />
                            <span>{t('داخلی‌سازی', 'Insource')}</span>
                          </>
                        ) : (
                          <>
                            <ToggleRight size={13} className="text-indigo-400" />
                            <span>{t('برون‌سپاری', 'Outsource')}</span>
                          </>
                        )}
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-cream/30">
                    <HelpCircle className="mx-auto text-gold mb-2" size={24} />
                    {t('هیچ کالایی با فیلترهای بالا یافت نشد.', 'No matching goods or agency records found.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. SELECTION DETAIL MODAL FOR THE CEO */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#090909] border border-white/10 rounded-[28px] max-w-2xl w-full overflow-hidden shadow-2xl relative block text-right"
            >
              {/* Modal Glow top */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
              
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-gold/15 border border-gold/30 text-gold font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                    {selectedItem.id}
                  </span>
                  <span className="text-xs text-cream/40 font-mono">
                    {selectedItem.type === 'GOODS' ? t('حسابرسی کالا', 'PHYSICAL GOOD') : t('حسابرسی خدمات آژانس', 'CONTRACT SERVICES')}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 flex items-center justify-center text-cream/70 hover:text-white transition-all duration-200"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-6">
                
                <div>
                  <h3 className="text-sm md:text-base font-black text-cream leading-relaxed font-sans-fa">
                    {t(selectedItem.titleFa, selectedItem.titleEn)}
                  </h3>
                  <p className="text-[11px] text-cream/40 mt-1 font-sans">
                    {t('زیر مجموعه عملیاتی: ', 'Component context: ')} {t(selectedItem.subProjectFa, selectedItem.subProjectEn)}
                  </p>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  <div>
                    <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest block">{t('حالت فعلی تأمین', 'EXECUTION DESIGN')}</span>
                    <span className="text-[11px] text-gold font-bold font-sans mt-0.5 block">
                     {selectedItem.model === 'OUTSOURCED' ? t('برون‌سپاری آژانسی', 'Outsourced Contracts') : t('درون‌سپاری نیروها', 'In-house Execution')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest block">{t('ارزش تقریبی اختصاص یافته', 'APPROVED VALUE')}</span>
                    <span className="text-[11px] text-emerald-400 font-black font-mono mt-0.5 block">€{selectedItem.estimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest block">{t('مسئول فیدبک', 'PRIMARY REGULATION')}</span>
                    <span className="text-[11px] text-cream mt-0.5 block font-sans-fa">{selectedItem.contactPerson}</span>
                  </div>
                </div>

                {/* KPI/SLA specifications */}
                <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest block">{t('کیفیت تعهدات SLA', 'SLA QUALITY RATING')}</span>
                    <span className="text-xs font-black font-mono text-gold block mt-1">{selectedItem.slaQualityScore}%</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest block">{t('سطح ریسک فرآیند', 'SOURCING RISK LEVEL')}</span>
                    <span className={`text-[10px] font-bold block mt-1 ${selectedItem.riskLevel === 'HIGH' ? 'text-rose-400' : selectedItem.riskLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>{selectedItem.riskLevel}</span>
                  </div>
                </div>

                {/* Sub-deliverables and verification requirements */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black text-gold uppercase tracking-wider block">
                    {t('تعهدات و لیست اقلام تفصیلی خدمات/کالا', 'Detailed Deliverable Requirements & SLA Items')}
                  </h5>
                  <div className="space-y-1.5 pl-4 flex flex-col font-sans">
                    {(lang === 'fa' ? selectedItem.keyDeliverablesFa : selectedItem.keyDeliverablesEn).map((del, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-cream/70 font-sans-fa leading-normal justify-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vendor information */}
                <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="text-right">
                    <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest block">{t('آژانس یا واحد سازمانی متعهد', 'DESIGNATED AGENCY')}</span>
                    <span className="text-xs font-bold text-cream mt-1 block font-sans-fa">{t(selectedItem.partnerAgencyFa, selectedItem.partnerAgencyEn)}</span>
                  </div>
                  
                  {selectedItem.model === 'OUTSOURCED' && (
                    <button
                      onClick={() => {
                        const evt = { stopPropagation: () => {} } as any;
                        handleToggleModel(selectedItem.id, evt);
                      }}
                      className="py-1 px-2.5 bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 text-[9px] font-bold text-indigo-300 rounded transition-all cursor-pointer font-sans"
                    >
                      {t('ارجاع به ظرفیت داخلی', 'Shift to In-house Squad')}
                    </button>
                  )}
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex justify-end gap-2 text-[10px]">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 hover:bg-white/5 text-cream/50 hover:text-cream rounded-lg transition-all font-sans"
                >
                  {t('بستن', 'Close Details')}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
