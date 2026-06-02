import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Eye, 
  Brain, 
  Smartphone, 
  Sparkles, 
  Layers, 
  User, 
  Activity, 
  Database, 
  Volume2, 
  Wind, 
  Lightbulb, 
  FileSpreadsheet, 
  Compass as CompassIcon, 
  Play, 
  Pause, 
  Tv, 
  Users, 
  Newspaper, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  RotateCcw,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface CustomerJourneyMapProps {
  isOpen: boolean;
  onClose: () => void;
  t: (fa: string, en: string) => string;
  lang: 'fa' | 'en';
}

type StageId = 'BEFORE' | 'INSIDE' | 'AFTER';
type PersonaId = 'SARAH' | 'ALBERTO' | 'MARCO' | 'ELENA';

interface JourneyStepConfig {
  id: number;
  zone: 'ZONE_A' | 'ZONE_B' | 'ZONE_C';
  titleFa: string;
  titleEn: string;
  // Node coordinates on the physical floor plan blueprint (percentages)
  x: number; 
  y: number;
  icon: React.ReactNode;
}

export function CustomerJourneyMap({ isOpen, onClose, t, lang }: CustomerJourneyMapProps) {
  const [activePersona, setActivePersona] = useState<PersonaId>('SARAH');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // Speed multiplier: 0.5, 1, 2
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const dir = lang === 'fa' ? 'rtl' : 'ltr';

  // 12 sequential interactive stops across 3 zones
  const journeyStops: JourneyStepConfig[] = [
    // ZONE A: PRE-SHOWROOM (Digital Discovery)
    { 
      id: 1, 
      zone: 'ZONE_A', 
      titleFa: 'شکار دیجیتال & کدهای انتساب', 
      titleEn: 'Digital Discovery & Referral Tracking',
      x: 8, 
      y: 15,
      icon: <CompassIcon size={12} />
    },
    { 
      id: 2, 
      zone: 'ZONE_A', 
      titleFa: 'تثبیت پروفایل طلایی در CDP', 
      titleEn: 'Golden CDP Profile Enrichment',
      x: 8, 
      y: 45,
      icon: <Database size={12} />
    },
    { 
      id: 3, 
      zone: 'ZONE_A', 
      titleFa: 'دعوت VIP و فعال‌سازی ولت موبایل', 
      titleEn: 'Mobile Wallet VIP Ticket & RSVP',
      x: 12, 
      y: 75,
      icon: <Smartphone size={12} />
    },
    // ZONE B: INSIDE SENSORY SHOWROOM & MUSEUM
    { 
      id: 4, 
      zone: 'ZONE_B', 
      titleFa: 'پذیرش هوشمند و اسکن گیت RFID', 
      titleEn: 'Smart Reception & RFID Gate Entry',
      x: 23, 
      y: 85,
      icon: <Users size={12} />
    },
    { 
      id: 5, 
      zone: 'ZONE_B', 
      titleFa: 'دیوار لمس کالیته سنگی با تگ NFC', 
      titleEn: 'NFC Swatch Sensory Wall Touch',
      x: 32, 
      y: 20,
      icon: <Layers size={12} />
    },
    { 
      id: 6, 
      zone: 'ZONE_B', 
      titleFa: 'کیوسک جادویی پردازش تعاملی سنگ', 
      titleEn: 'Kiosk Swatch Reception & Push',
      x: 45, 
      y: 25,
      icon: <Tv size={12} />
    },
    { 
      id: 7, 
      zone: 'ZONE_B', 
      titleFa: 'همگام‌سازی عطر شوروم و نور اتومات', 
      titleEn: 'Multi-Sensory Scent & Spotlights Sync',
      x: 58, 
      y: 35,
      icon: <Wind size={12} />
    },
    { 
      id: 8, 
      zone: 'ZONE_B', 
      titleFa: 'شیدینگ و مپینگ فتون با واقعیت ترکیبی', 
      titleEn: 'XR Mixed Reality Sunlight Simulation',
      x: 65, 
      y: 75,
      icon: <Sparkles size={12} />
    },
    { 
      id: 9, 
      zone: 'ZONE_B', 
      titleFa: 'سالن گفتمان VIP و تحلیل کلاینت', 
      titleEn: 'Private VIP Desk & Clienteling',
      x: 75, 
      y: 50,
      icon: <User size={12} />
    },
    // ZONE C: POST-SHOWROOM & ULTIMATE B2B CONTRACT
    { 
      id: 10, 
      zone: 'ZONE_C', 
      titleFa: 'رندر سه‌بعدی و محاسبات ابری آنی', 
      titleEn: 'Instant Cloud Generative Rendering',
      x: 85, 
      y: 15,
      icon: <FileSpreadsheet size={12} />
    },
    { 
      id: 11, 
      zone: 'ZONE_C', 
      titleFa: 'پایش امانت نمونه‌ها و لجستیک فیزیکی', 
      titleEn: 'Smart Physical Sample Courier Log',
      x: 92, 
      y: 45,
      icon: <Activity size={12} />
    },
    { 
      id: 12, 
      zone: 'ZONE_C', 
      titleFa: 'انعقاد نهایی قرارداد و تقسیم پورسانت', 
      titleEn: 'Contract Conversion & Multi-Split Desk',
      x: 92, 
      y: 80,
      icon: <Award size={12} />
    }
  ];

  const personas = {
    SARAH: {
      id: 'SARAH',
      name: t('سارا الکساندر (آرشیتکت ارشد از مونیخ)', 'Sarah Alexander (Principal Architect, Munich)'),
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      tag: t('آرشیتکت‌های گران‌قیمت', 'Architects & Interior Designers'),
      color: 'from-amber-500 to-gold',
      textColor: 'text-gold',
      roleIcon: <CompassIcon size={12} className="text-gold" />,
      narratives: [
        t('در مونیخ، سارا مشغول طراحی یک لابی مجلل است. او در وبسایت ودزیا تصاویری از سرامیک "کبالت گلد" را فید می‌کند و چند فایل BIM (Revit/Rhino) را دانلود می‌نماید.', 'While designing a high-end lobby in Munich, Sarah searches premium catalogs online and downloads architectural BIM (Revit/Rhino) models of "Cobalt Gold" ceramic tiles.'),
        t('مکانیزم اختصاصی ودزیا بدون مزاحمت کوکی‌های کوته‌فکر، توکن انتساب دیجیتال سارا را در CDP ثبت کرده و او را به عنوان سرنخ استراتژیک (A-Class Lead) مشخص می‌کند.', 'VEDESIA\'s modern analytics tokenizes her session inside our independent CDP. Her profile is upgraded to a High-Priority Strategic Architectural Leader.'),
        t('یک کارت بلیت دیجیتالی RSVP دارای بارکد امن چندمنظوره مستقیماً به کیف پول گوشی او (Apple Wallet) پاش می‌شود که حاوی لوکیشن شوروم هفته طراحی میلان است.', 'A beautiful custom RSVP pass drops into her Apple Wallet with integrated Munich-to-Milan notifications and high-security QR check-in codes.'),
        t('با نزدیک شدن به شوروم، گوشی سارا با امواج RFID گیت گالری تعامل می‌کند. تبلت خوش‌آمدگویی میز هماهنگ‌کننده نام مونیخ و کانسپت کبالت را به راهنمایان فروش اطلاع می‌دهد.', 'As she crosses the threshold, the physical RFID scanner triggers a gentle chime. Hostess tablets display her Munich project preferences in real-time, matching her style.'),
        t('سارا در گالری اصلی، کالیته سرامیک‌های طلایی واقعی را لمس می‌کند. هر کالیته سنگی فیزیکی مجهز به میکروچیپ فوق نامحسوس NFC است.', 'Inside the sensory hall, Sarah runs her fingers over physical ceramic slates. Each sample board features a premium embedded NFC tag, ready for digital interactions.'),
        t('او کالیته فیزیکی را روی میز کیوسک تعاملی قرار می‌دهد. سنسور الکترونیکی سنگ را شناسایی کرده و فایل‌های فنی و کاتالوگ بلافاصله روی مانیتور و موبایل سارا لود می‌شوند.', 'She drops the physical slate onto our central interactive kiosk receiver. The embedded chip triggers an instant Web-Push of CAD detail sheets directly to her phone screen.'),
        t('همزمان تم شوروم دگرگون شده: نورهای نقطه‌ای روی سنگ کبالت متمرکز شده، عطر جنگلی چرم فضا را پر کرده و نغمه ژنراتیو مینیاتوریک پخش می‌شود تا او را عمیقاً تحت تاثیر قرار دهد.', 'An automated sensory shift occurs: spotlights dim and refocus solely on the Cobalt slate, the venue scent calibrates to deep wood notes, and ambient strings soothe.'),
        t('راهنمای فروش عینک واقعیت ترکیبی (MR/XR) را به او تعارف می‌کند. او در عینک، پروژکتور فتون و بازتاب شبیه‌سازی‌شده تابش خورشید مونیخ روی سنگ نما را مشاهده می‌کند.', 'She slips on Mixed Reality (MR) lenses. She interacts with digital solar vectors, simulating actual Munich day/night sunlight angles reflecting on the physical tiles.'),
        t('در مبل‌های چرمی VIP، مشاور فنی شرایط تولید و سفارشی‌سازی ابعاد در ایتالیا را با یک قهوه معطر میلانی برای سارا شرح می‌دهد و نیازهای معماری را نهایی می‌کند.', 'At the VIP lounge, hosts serve Italian espresso and present localized B2B project support conditions, mapping customized dimensional tolerances on clienteling tables.'),
        t('ساعتی پس از خروج، کامپیوترهای ابری ودزیا کانسپت پروژه او را با متریال برگزیده رندر کرده و رندرهای باکیفیت 4K را برای سارا ایمیل می‌کنند که او را شگفت‌زده می‌کند.', 'Vedesia\'s cloud rendering matrix processes a gorgeous virtual concept showing her preferred slates mapped inside a modern penthouse, automatically emailing her the output.'),
        t('چند ساعت بعد، آدرس نمونه سنگی که سارا فیزیکی به امانت گرفته ردیابی می‌شود و بیمه نمونه‌های باکیفیت به همراه کاتالوگ تقدیمی روی پرتال او قرار می‌گیرد.', 'An automated logistics track coordinates her physically borrowed stone swatches. She receives a respectful digital certificate confirming sample delivery with warranty links.'),
        t('سارا طرح نهایی لابی خود را با کبالت گلد ودزیا تصویب می‌کند. قرارداد رسمی خرید منعقد شده و پورسانت معرفی طراح به صورت کاملا اتوماتیک تفکیک و واریز می‌گردد.', 'Success! Sarah signs the purchase order for her landmark project. Long-term dealer allocation is locked and her architect design fee share is transparently split and auto-paid.')
      ]
    },
    ALBERTO: {
      id: 'ALBERTO',
      name: t('آلبرتو مورتی (توسعه‌دهنده املاک لوکس در میلان)', 'Alberto Moretti (Luxury Real Estate Developer, Milan)'),
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
      tag: t('سازندگان و انبوه‌سازان تراز اول', 'Developers & Builders Segment'),
      color: 'from-emerald-500 to-teal-400',
      textColor: 'text-emerald-400',
      roleIcon: <Award size={12} className="text-emerald-400" />,
      narratives: [
        t('آلبرتو یک هلدینگ املاک لوکیشن‌های مرغوب ساحلی دارد. یک کارگزار املاک معتبر، او را به وبسایت معرف اختصاصی ودزیا با کدهای اتریبیوشن تجاری ارجاع می‌دهد.', 'Alberto manages luxury waterfront apartment projects. A top-tier broker partner refers him to Vedesia\'s dealer-broker ecosystem using an integrated attribution tracking code.'),
        t('سیستم هوش تجاری با واکشی رتبه‌بندی‌های اعتباری او از پایگاه‌های معتبر، جایگاه آلبرتو را در CDP ودزیا به "خریدار فونداسیون لوکس سهمیه‌ای" منتسب می‌کند.', 'VEDESIA\'s MDM analyzes his ongoing corporate high-rise projects. His lead score immediately escalates, marking him as a highly valuable institutional builder.'),
        t('بلیت VIP با امضای دیجیتال برای او ارسال شده و هماهنگی ترانسفر برای بردن او از دفتر با اتومبیل برقی چرمی و پذیرش لوکس انجام می‌شود.', 'An exclusive digital VIP Pass is issued, combined with premium private transfer services where a luxury electric sedan picks him up from his private suite.'),
        t('معاون ارشد تجاری و راهنمای وی آی پی مستقیماً در درگاه ورودی سالن با ویپینگ تبلت و سناریو پروژه‌های آلبرتو به او دست‌مریزاد می‌گویند.', 'Inside our gallery lobby, the VP of Commercial Relations greets Alberto, bypasses line queues, and initializes a curated walkthrough on custom handheld screens.'),
        t('سپس نمونه‌های بلوک‌های توخالی پرسلانی کوبوگو ویژه‌ی نماهای بیرونی ضد آفتاب را لمس می‌کند که سختی درجه ۹ و متریال بی‌نقص تیتانیوم متبلور را نمایش می‌دهند.', 'He inspects dynamic hollow porcelain Cobogo block structures engineered to resist harsh marine climates, sliding his hand along crystalized titanium-reinforced ceramic surfaces.'),
        t('روی کیوسک مانیتور نما، حجم تخفیف خریدهای ۳۰هزار متری، هزینه‌های بهینه بیمه حمل و گارانتی‌های فرسودگی ۵۰ ساله بررسی می‌شود.', 'An interactive panel displays dynamic large-scale cost models, calculating exact maritime shipping, volume discounts, and 50-year fading warranties.'),
        t('اتاق با عطر تند چرم، موسیقی فخیم برنجی و تم نورپردازی ابهت‌آمیز صنعتی کالیبره می‌شود تا نماد قدرت سنگ‌های مقاوم نما را طنین‌انداز دارد.', 'The sensory room reconfigures dynamically: intense masculine leather fragrances, triumphant orchestral horns, and high-contrast dramatic lights amplify raw stone strength.'),
        t('در عینک‌های هولوگرافی، شبیه‌سازی گرانش سنگین، زلزله ۸ ریشتری و عدم تغییر انعکاس اشعه فرابنفش روی نما در عرض ۳۰ سال را زنده به او نمایش می‌دهند.', 'Mixed Reality goggles simulate seismic forces, structural weight distribution, and 30 years of direct UV radiation on his virtual coastal facade without degradation.'),
        t('در کابین VIP اختصاصی، تیم عالی‌رتبه حقوقی و مالی قرارداد سهمیه تحویل اولویت‌دار و مدل مالی یکپارچه بر اساس پیشرفت پروژه را روی تبلت چیدمان می‌کنند.', 'Commercial negotiators lay out flexible financing models tied to construction phase milestones, guaranteeing priority factory logistics directly to his cranes.'),
        t('سیستم فوتورئال، نمونه رندرهای سه‌بعدی تمام بدنه برج آلبرتو را با بلوک‌های طلایی کوبوگو در چشم‌انداز ساحل تلفیق و به آیپد او شلیک می‌کند.', 'The cloud automatically renders hyper-realistic simulations of his entire high-rise project clad in our selected Cobogo block models, delivering complete media packets.'),
        t('نمونه تایل‌های بزرگ با ماشین حمل ویژه شرکت مستقیماً به دفتر مهندسی سازه او با بارکد پایش زنده ارسال می‌شود تا در کارگاه بررسی شود.', 'Heavy, 1-meter swatches are systematically dispatched via dedicated Vedesia logistics to his structural engineers for physical loading and chemical stress tests.'),
        t('آلبرتو تفاهم‌نامه چند میلیون یورویی خرید انحصاری را با قلم متصل و اثر انگشت امضا مى‌کند. پورسانت معرف آلبرتو در همان لحظه در کیف‌پول توزیع‌کننده می‌نشیند.', 'Victory achieved! Alberto signs a million-euro institutional order. Real-time token splitting auto-routes broker commissions and initiates quarry production.')
      ]
    },
    MARCO: {
      id: 'MARCO',
      name: t('مارکو رُسی (نماینده انحصاری و هاب پخش در زوریخ)', 'Marco Rossi (Exclusive Agent & Distributor, Zurich)'),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      tag: t('نمایندگان و شبکه توزیع بین‌المللی', 'International Agents & Dealers'),
      color: 'from-blue-500 to-indigo-500',
      textColor: 'text-indigo-400',
      roleIcon: <Users size={12} className="text-indigo-400" />,
      narratives: [
        t('مارکو بنکدار سوئیسی است که گالری‌های بزرگ زوریخ را تامین می‌کند. او هشدار عرضه لاین‌های کمیاب ۵۰۰ عددی سالانه را در پورتال توزیع‌کنندگان دریافت می‌کند.', 'From his corporate office in Zurich, Marco receives a high-value push notification on Vedesia\'s Dealer Portal announcing the rare release of a 550-unit ceramic batch.'),
        t('او فوراً یک سهمیه اختصاصی ۳۰۰ واحدی را رزرو دیجیتالی کرده و ثبت پیش‌فاکتور زنجیره تامین را بدون واسطه‌های سنتی صورت می‌دهد.', 'Using our portal, he deposits a guarantee block to lock 300 units of the limited edition batch, immediately mapping real-time supply capacities to Swiss demand.'),
        t('اسکن بلیت ویژه همکاران تجاری (Dealer Pass) همراه با دسترسی‌های چندمنظوره سیستم به کیف پول او فرستاده می‌شود و قرار فیزیکی ثبت می‌شود.', 'A priority B2B Dealer RSVP badge with custom customs clearing metadata syncs to his phone, confirming a physically private batch inspection session.'),
        t('بانگ خوش‌آمدگویی هاب سوئیس در پذیرش شوروم نواخته می‌شود. کل تیم با اطلاعات توزیع تاریخی مارکو آماده نشست گمرکی و حمل بار می‌شوند.', 'Receptions lights pulse in bright alpine-white as he arrives. The system recognizes Switzerland\'s dominant distribution partner, opening a dashboard table on hosts\' tablets.'),
        t('مارکو به انبار متصل شوروم هدایت شده و بچ کدهای تخصیص‌یافته به گالری زوریخ را مستقیما با مفسر نوری اصالت کالا ارزیابی فیزیکی می‌نماید.', 'He is ushered into the physical batch inspection wing. He runs a laser spectrometer over the heavy ceramic slates to verify batch homogeneity and density.'),
        t('روی کیوسک مانیتور ترانزیت، مشخصات گمرکی، کدهای ورود سوئیس، نرخ ارز همگام و زنجیره ارزش مالی به مارکو نشان داده می‌شود.', 'An interactive screen displays Swiss custom clearances, transit tax margins, transport logistics fees, and optimized container volume capacities.'),
        t('محیط شوروم با رایحه گیاهان معطر کوهستان‌های آلپ، نور ملایم روز غربی و صداهای باد ملایم اتمسفر ییلاقی سوئیس را شبیه‌سازی می‌کند.', 'Sensory setups transition to absolute purity: clean alpine conifer scents, high-intensity northern daylight simulations, and natural wind cues guarantee stone colors under Swiss horizons.'),
        t('با عینک واقعیت ترکیبی، نقشه فیزیکی مسیر جاده‌ای ترانزیت تریلی‌های ودزیا از میلان به گالری زوریخ با سیستم رهگیری لحظه‌ای و سنسور سردخانه‌ای برای وی مپ سه‌بعدی می‌شود.', 'Mixed Reality headset renders a holographic overlay of the transit roads, showing custom border customs queues, real-time weather alerts and smart temperature data inside trucks.'),
        t('مارکو در سالن کار مبل‌های سفید با مدیران لجستیک تفاهم‌نامه ترانزیت نهایی، جدول حق انحصاری قلمرو و تخفیف‌های گالری نمایندگی را بررسی می‌کند.', 'High-level negotiations confirm geographical territory protections and customized scale-dependent pricing margins, ensuring premium retail representation in Zurich.'),
        t('پورتال فروشگاهی گالری زوریخ او با سیستم ابری ودزیا سینک می‌شود و بروشورهای چندرسانه‌ای سه‌بعدی سنگ‌ها در وبسایت او بلافاصله لایو می‌گردند.', 'With a single key, full B2B marketing collaterals and high-res concept imagery are deployed to his Swiss retail network servers, syncing inventory levels inside Zurich.'),
        t('نمونه‌های پلمب شده و مهروموم شده لات محصولات همراه با مدارک صادراتی تایید شده برای ارسال به گمرک زوریخ بسته‌بندی دیجیتالی می‌شوند.', 'Fully certified and sealed material batches are prepared by warehouse automated handlers, issuing precise digital blockchain-backed authenticity seals to Zurich.'),
        t('مارکو توافق پخش انحصاری حوزه کشورهای آلپ را به ارزش کماکان بالا مضا می‌کند و سهمیه او در کورتکس مرکزی زنجیره تامین ودزیا تایید قانونی می‌گردد.', 'deal closed! Marco signs a massive exclusive regional distributor contract, guaranteeing luxurious stock flow and direct-to-dealer electronic portal logistics.')
      ]
    },
    ELENA: {
      id: 'ELENA',
      name: t('النا ونس (ویرایشگر ارشد مجله طراحی AD ایتالیا)', 'Elena Vance (Senior Editor, Architectural Digest Italy)'),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      tag: t('رسانه‌ها و منتقدان حوزه دیزاین', 'Design Media, Press & Influencers'),
      color: 'from-pink-500 to-purple-500',
      textColor: 'text-pink-400',
      roleIcon: <Newspaper size={12} className="text-pink-400" />,
      narratives: [
        t('النا سردبیر مجله مشهور AD است. ربات ارسال اخبار مطبوعاتی ویدسیا یک کیت رسانه‌ای دیجیتال با کدهای امن عکاسی سنگ‌ها را به ایمیل او شلیک می‌کند.', 'As a leading design editor, Elena receives an automated, luxurious digital press announcement featuring conceptual sketches and creative design philosophies behind new lines.'),
        t('سیستم روابط‌عمومی ما میزان تعامل والنا با فایل‌های مطبوعاتی شامل بیوگرافی استادان طراح سرامیک در ایتالیا را ردیابی و پروفایل او را ارتقا می‌دهد.', 'Our Media Relations scoring engine tracks her interaction with high-res lifestyle imagery, instantly configuring a private invitation reservation loop.'),
        t('کارت دعوت خبرنگار ممتاز (VVIP Press Pass) دارای دسترسی ویژه زودهنگام به نمایشگاه Fuorisalone با عکاسی آزاد به ولت موبایل او فرستاده می‌شود.', 'An elite VIP Press Pass with early-access credentials, designer interview slots, and private catalog permissions syncs with her Apple Wallet calendar.'),
        t('النا پیش از ساعات شلوغی عمومی با استقبال مدیر کل روابط عمومی برند و سفیران دیزاین در پادری ویژه شوروم گرامی داشته می‌شود.', 'She arrives before the general public layout opens. The PR Director personally greets her, presenting a beautifully bound physical editorial handbook and espresso.'),
        t('او کتابچه مصور فیزیکی را باز می‌کند و با موبایل تگ‌های NFC سنگ‌های کانسپچوال را اسکن کرده تا بیانیه مطبوعاتی و داستان معدن‌یابی واقعی سنگ را کپی کند.', 'She scans physical NFC badges on product labels using her phone, instantly populating her private editorial draft with bilingual transcripts and high-res imagery.'),
        t('هر سنگی که او را به هیجان می‌آورد، لمس مجدد آن روی کیوسک فورا کانسپت دست‌نویس معمار معروف و ویدئوی مصاحبه استدیویی او را روی صفحه مانیتور می‌آورد.', 'Placing raw ceramic samples on the screen triggers a high-definition documentary of the original artist, showcasing behind-the-scenes sketches with gorgeous sound context.'),
        t('تم اتمسفر با عطر شکوفه‌های بهاری لیمو، مفاهمه هنری موسیقی آوانگارد تجربی و تلالو رنگین‌کمانی ملایم نور بر رگه‌های سنگ‌ها دگرگون می‌شود تا فضای الهام ایجاد کند.', 'The Sensory Matrix transitions: gentle white floral jasmine scent, atmospheric avant-garde piano, and specialized high-color-rendering lights capture slate details.'),
        t('با هدست واقعیت مجازی النا فیزیک ذرات آفرینش سنگ در کوره و پروجکشن سه‌بعدی استخراج بلوک‌های سنگی باستانی از صخره‌های تاریخی ایتالیا را مشاهده می‌کند.', 'Through volumetric MR headsets, Elena travels directly to the ancient quarry caves of Carrara, seeing exactly how blocks are harvested and processed sustainably with zero waste.'),
        t('او در سالن دنج با طراح اصلی ویدسیا روی مبل مخملی گفتگو می‌کند. النا ایده مقاله صفحه اول مجله ماه آینده را به طراح پیشنهاد می‌دهد.', 'She sits down in the quiet media salon for an exclusive one-on-one interview with Vedesia’s Chief Designer, crafting a tailored, deeply human narrative brand story.'),
        t('یک کیت رسانه ابری غنی از فایل‌های ویدیویی ۴K عکاسی صنعتی سنگ‌ها، مصاحبه صوتی و کاتالوگ مطبوعاتی روی ایمیل او آپلود می‌شود تا به زوریخ ارسال کند.', 'Our systems automatically push high-res, multi-language interview transcripts, multi-angle editorial layouts and raw studio b-roll links directly to her AD cloud folder.'),
        t('سیستم شنود ویدسیا پیش‌نویس لایک‌ها و توییت‌های هیجان‌انگیز النا را در شبکه‌های اجتماعی مانیتور می‌کند و تاثیر مخاطبان را ارزیابی می‌نماید.', 'The platform\'s PR listening crawler registers her social media teasers and initial AD Italy online previews, calculating organic digital reach indexes automatically.'),
        t('توافق نهایی انتشار مقاله ۸ صفحه‌ای در سرتیتر مجله AD امضا شده و النا به عنوان سفیر افتخاری اصالت برند ویدسیا برای قرارهای آتی برگزیده می‌شود.', 'Success! Elena locks an 8-page feature editorial in Architectural Digest, securing massive brand authority. Her digital contract signature triggers reciprocal promotion steps.')
      ]
    }
  };

  const activePersonaDetail = personas[activePersona];
  const activeStep = journeyStops[activeStepIndex];
  const currentNarrative = activePersonaDetail.narratives[activeStepIndex];

  // Auto progression effect
  useEffect(() => {
    if (isPlaying) {
      const delay = (6000 / playSpeed); // base step duration scaled by speed
      
      autoplayTimer.current = setTimeout(() => {
        setActiveStepIndex((prev) => {
          if (prev >= journeyStops.length - 1) {
            setIsPlaying(false);
            return 0; // wrap to beginning and pause
          }
          return prev + 1;
        });
      }, delay);
    } else {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    }

    return () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    };
  }, [isPlaying, activeStepIndex, playSpeed]);

  // Handle auto-logging emulator
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString();
    let logStr = '';
    const name = activePersona;

    switch(activeStepIndex) {
      case 0:
        logStr = `[Digital Discovery] Lead: ${name} session initialized. BIM file request attributed.`;
        break;
      case 1:
        logStr = `[CDP Matrix] Generating Golden Record for ${name} inside server core. Status class raised to A-Class.`;
        break;
      case 2:
        logStr = `[RSVP Wallet Engine] Apple Wallet digital credential generated. Secured Token verified.`;
        break;
      case 3:
        logStr = `[RFID Smart Entrance] Gate sensor registers VIP. Greeter clienteling app updated for ${name}.`;
        break;
      case 4:
        logStr = `[IoT NFC Swatches] Sample box sensor records manual touch on material series. Saving selection history to client session index.`;
        break;
      case 5:
        logStr = `[Kiosk Interactor] swatches ID verified on table top. Web-Push executed instantly.`;
        break;
      case 6:
        logStr = `[Sensory Controller] Adaptive lighting matching ceramic details initialized. Scent valve active.`;
        break;
      case 7:
        logStr = `[XR Simulation Node] Launching Virtual MR Day/Night sunlight reflection calculations on facade.`;
        break;
      case 8:
        logStr = `[VIP Advisor Desk] Consultation session recorded. Auto-calculating volumetric discount parameters.`;
        break;
      case 9:
        logStr = `[Cloud Renderer Engine] Concept sketch successfully rasterized into 3D concept. Rendering 4K imagery.`;
        break;
      case 10:
        logStr = `[Smart logistics tracking] Physical sample borrowed has barcode ID linked. Courier order created.`;
        break;
      case 11:
        logStr = `[Contract Finalizer Desk] Split payout, margin allocations validated. Contract converted! Flag: SIGNED.`;
        break;
    }

    const compiledLog = `[${timeStr}] ${logStr}`;
    setTerminalLogs((prev) => [compiledLog, ...prev.slice(0, 18)]);
  }, [activeStepIndex, activePersona]);

  // Compute calculated values for the interactive dashboard gauges
  const telemetryMetrics = {
    // Engagement Index heating up from 15% to 99% as customer goes from step 1 to 12
    engagement: Math.min(15 + Math.round((activeStepIndex / 11) * 84), 99),
    // Sensation Level peaking in showroom steps (steps 4 to 8)
    sensation: (activeStepIndex >= 3 && activeStepIndex <= 8) 
      ? 85 + Math.round(Math.sin((activeStepIndex - 3) * (Math.PI / 5)) * 14) // peaks around step 6-7
      : activeStepIndex < 3 
        ? 15 + activeStepIndex * 15
        : 60 - (activeStepIndex - 9) * 10,
    // Trust rating escalating as contract approach
    trust: Math.min(25 + Math.round((activeStepIndex / 11) * 74), 99),
    // signed probability is low until final steps
    signedProbability: activeStepIndex === 11 
      ? 100 
      : activeStepIndex >= 9 
        ? 75 + (activeStepIndex - 9) * 12
        : Math.round((activeStepIndex / 11) * 60)
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    if (activeStepIndex < journeyStops.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setActiveStepIndex(0);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-onyx/98 backdrop-blur-3xl flex items-center justify-center p-2 sm:p-4 md:p-6"
        id="customer-journey-modal"
        dir="rtl"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="bg-[#0b0b0c] w-full max-w-7xl h-[96vh] rounded-[24px] md:rounded-[40px] border border-gold/15 shadow-[0_0_120px_rgba(197,160,89,0.18)] flex flex-col overflow-hidden relative"
        >
          {/* Accent Ambient Lighting */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Core Header with Multi-language details */}
          <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between relative z-10 shrink-0 bg-[#121214]/60 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/25 flex items-center justify-center text-gold shadow-lg shadow-gold/5">
                <CompassIcon className="animate-spin-slow text-gold" size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gold/10 border border-gold/35 text-gold text-[8px] font-black rounded uppercase tracking-widest font-mono">
                    {t('فیلم مستند تعاملی', 'EXECUTIVE INTERACTIVE CINEMA')}
                  </span>
                  <span className="hidden md:inline text-[9px] text-emerald-400 font-mono animate-pulse">● CORTEX SIMULATION READY</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gold tracking-tight font-sans italic mt-0.5">
                  {t('پویانمایی و مستند سفر هوشمند مشتری ودزیا', 'VEDESIA INTU-SENSORY CLIENT MASTERPLAY JOURNEY')}
                </h2>
                <p className="text-[9px] text-cream/40 font-bold uppercase tracking-[0.1em] mt-0.5">
                  {t('پیگیری دیجیتال، اتمسفر مینیاتور حسی، واقعیت مجازی و امضای نهایی پیمان B2B در ۱۲ ایستگاه ملموس', 'Phygital Journey Blueprint: 12 Narrative Stations leading to Signed Contract')}
                </p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/5 hover:bg-gold hover:text-onyx text-gold rounded-full flex items-center justify-center transition-all duration-300 shadow-md border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Autoplay Film Control Bar */}
          <div className="px-4 sm:px-6 py-3 bg-[#151518] border-b border-gold/15 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0 relative z-20">
            {/* Persona Selectors */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-[10px] text-cream/50 font-black uppercase tracking-wider shrink-0">{t('انتخاب شخص سناریو:', 'SELECT TARGET SEGMENT:')}</span>
              <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 gap-1.5 overflow-x-auto w-full md:w-auto">
                {(['SARAH', 'ALBERTO', 'MARCO', 'ELENA'] as PersonaId[]).map((pId) => {
                  const pDetail = personas[pId];
                  const isActive = activePersona === pId;
                  return (
                    <button
                      key={pId}
                      onClick={() => {
                        setActivePersona(pId);
                        setIsPlaying(false);
                      }}
                      className={`px-3 py-2 rounded-xl text-[10px] sm:text-[11px] font-black transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer ${
                        isActive 
                          ? 'bg-gold text-onyx shadow-md' 
                          : 'text-cream/65 hover:text-cream hover:bg-white/5'
                      }`}
                    >
                      <img 
                        src={pDetail.avatar} 
                        alt={pId} 
                        className={`w-7 h-7 rounded-full object-cover border-2 shadow-inner ${isActive ? 'border-onyx' : 'border-gold/30'}`}
                        referrerPolicy="no-referrer"
                      />
                      <span className="flex flex-col text-right">
                        <span className="text-[10px] font-black leading-none mb-0.5">
                          {pId === 'SARAH' ? t('سارا الکساندر', 'Sarah Alexander') : pId === 'ALBERTO' ? t('آلبرتو مورتی', 'Alberto Moretti') : pId === 'MARCO' ? t('مارکو رسی', 'Marco Rossi') : t('النا ونس', 'Elena Vance')}
                        </span>
                        <span className={`text-[7px] leading-none ${isActive ? 'text-onyx/75 font-bold' : 'text-cream/35'}`}>
                          {pId === 'SARAH' ? t('آرشیتکت ارشد', 'Architect') : pId === 'ALBERTO' ? t('انبوه‌ساز املاک', 'Developer') : pId === 'MARCO' ? t('بنکدار و توزیع', 'Distributor') : t('سردبیر AD', 'Editorial AD')}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Media Player Console Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              
              {/* Timeline duration bar */}
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-[8px] text-cream/40 font-mono tracking-widest">{t('روال مستند:', 'DOCUMENTARY TIMELINE:')}</span>
                <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                  <div 
                    className="h-full gold-gradient transition-all duration-300 rounded-full"
                    style={{ width: `${((activeStepIndex + 1) / journeyStops.length) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] font-mono font-black text-gold">{activeStepIndex + 1}/12</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/5 shrink-0">
                <button
                  onClick={handleRestart}
                  title="بازپخش فیلم"
                  className="p-1.5 rounded-md hover:bg-white/5 text-cream/60 hover:text-gold transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
                
                <button
                  onClick={handlePrevStep}
                  disabled={activeStepIndex === 0}
                  className="p-1.5 rounded-md hover:bg-white/5 text-cream/60 hover:text-gold disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={16} />
                </button>

                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-4 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${
                    isPlaying 
                      ? 'bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500 hover:text-white' 
                      : 'bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-onyx'
                  }`}
                >
                  {isPlaying ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" />}
                  <span>{isPlaying ? t('توقف فیلم', 'PAUSE FILM') : t('پخش خودکار فیلم', 'PLAY DOCU-FILM')}</span>
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={activeStepIndex === journeyStops.length - 1}
                  className="p-1.5 rounded-md hover:bg-white/5 text-cream/60 hover:text-gold disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>

              {/* Speed Buttons */}
              <div className="flex bg-black/50 p-1 rounded-lg border border-white/5 shrink-0">
                {([0.5, 1, 2] as number[]).map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setPlaySpeed(sp)}
                    className={`px-1.5 py-1 rounded text-[8px] font-mono font-black ${
                      playSpeed === sp ? 'bg-gold text-onyx' : 'text-cream/40 hover:text-cream'
                    }`}
                  >
                    {sp}x
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Major Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-5 md:p-6 bg-[#070709] relative flex flex-col lg:flex-row gap-5 min-h-0">
            
            {/* LEFT SECTION: THE VISUAL CORRIDOR BLUEPRINT MAP (Height expanded and highly polished) */}
            <div className="flex-1 lg:flex-[1.4] flex flex-col gap-4 min-h-[380px] lg:min-h-0 bg-[#0c0c0e] rounded-3xl border border-white/5 p-4 sm:p-5 relative overflow-hidden shadow-inner order-2 lg:order-1">
              
              {/* Technical Blueprint styling markings */}
              <div className="absolute top-3 right-3 text-[7.5px] font-mono text-gold/25 tracking-widest uppercase pointer-events-none">
                {t('نقشه معماری تالار تجربه هوشمند ودزیا', 'VEDESIA PHY-GITAL EXPERIENCE SHOWROOM BLUEPRINT MAP')}
              </div>
              <div className="absolute bottom-3 left-3 text-[7.5px] font-mono text-cream/10 tracking-widest pointer-events-none">
                SCALE: 1:75 • SENSOR FREQUENCY: 868MHz • ZERO ERP SYNC
              </div>

              {/* Structural Section Headers */}
              <div className="grid grid-cols-3 text-center border-b border-white/10 pb-2 relative z-10 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{t('۱. ورود دیجیتال', '01. Digital Gateway')}</span>
                  <p className="text-[6.5px] text-cream/30">{t('قبل از شوروم • ابر کدهای اتریبیوشن VIP', 'Pre-Showroom Cloud')}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-gold uppercase tracking-widest">{t('۲. شوروم اصلی و موزه حسی میلان', '02. Milan Main Showroom & Integrated Museum')}</span>
                  <p className="text-[6.5px] text-cream/30">{t('شوروم اصلی و موزه واقع در قلب آن • لمس، بویایی و مپینگ', 'Main Showroom & Museum inside it • Tactile, Olfactory & Light Projection')}</p>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{t('۳. غنی‌سازی و انعقاد پیمان', '03. Retentive Lead Closing')}</span>
                  <p className="text-[6.5px] text-cream/30">{t('بعد از شوروم • رندرینگ ابری و تبدیل به قرارداد', 'Closing & Generative Delivery')}</p>
                </div>
              </div>

              {/* THE BLUEPRINT CONTAINER GRID representing coordinate paths */}
              <div className="flex-1 relative border border-white/[0.04] bg-[#09090b]/90 rounded-2xl p-2 md:p-3 overflow-hidden blueprint-grid">
                
                {/* Visual architectural grid backing */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />
                
                {/* Physical Boundary Rectangles of Zones */}
                {/* Zone A: Cloud pre-entry */}
                <div className="absolute inset-y-2 left-2 w-[22%] border border-amber-500/10 bg-amber-500/[0.005] rounded-xl flex items-center justify-center p-3 pointer-events-none">
                  <div className="text-center">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent mx-auto mb-2" />
                    <span className="text-[7px] font-mono text-amber-500/30 uppercase tracking-widest">CLOUD SEGMENT</span>
                  </div>
                </div>

                {/* Zone B: SHOWROOM (MUSEUM) BOX - Beautiful Large custom rectangle */}
                <div className="absolute inset-y-2 left-[25vw] sm:left-[24%] right-[22vw] sm:right-[20%] border-2 border-gold/15 bg-gold/[0.01] rounded-2xl flex flex-col justify-between p-3 pointer-events-none shadow-[2px_2px_40px_rgba(212,175,55,0.02)]">
                  <div className="flex justify-between items-start">
                    <span className="text-[7.5px] font-mono text-gold/45 uppercase tracking-widest">GATE_01A ENTRANCE</span>
                    <span className="text-[7.5px] font-mono text-gold/45 uppercase tracking-widest">DALI LIGHTING GRID</span>
                  </div>
                  <div className="text-center py-8">
                    <span className="text-[9px] font-sans font-black text-gold/30 uppercase tracking-[0.2em]">{t('تالار اصالت و هنر تجربه ودزیا', 'THE VEDESIA EXPERIENCE HALL')}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[7px] font-mono text-gold/30">NFC RECEIPT CODES</span>
                    <span className="text-[7px] font-mono text-gold/30">CONCIERGE DESK</span>
                  </div>
                </div>

                {/* Zone C: CONTRACT CENTER */}
                <div className="absolute inset-y-2 right-2 w-[18%] border border-emerald-500/10 bg-emerald-500/[0.005] rounded-xl flex items-center justify-center p-2 pointer-events-none">
                  <div className="text-center">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent mx-auto mb-2" />
                    <span className="text-[7px] font-mono text-emerald-500/30 uppercase tracking-widest">CLOSING HUBS</span>
                  </div>
                </div>

                {/* SVG connection lines for active step highlights (Drawing path) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" id="path-drawing">
                  {/* Drawing full dashed path */}
                  <path
                    d={(() => {
                      let coords = journeyStops.map(s => `${s.x}%,${s.y}%`).join(' L ');
                      return `M ${coords}`;
                    })()}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.04)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Glowing active path segment */}
                  <path
                    d={(() => {
                      let activeCoords = journeyStops.slice(0, activeStepIndex + 1).map(s => `${s.x}%,${s.y}%`).join(' L ');
                      return `M ${activeCoords}`;
                    })()}
                    fill="none"
                    stroke="url(#activeLineGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />

                  {/* Gradient definition for active line */}
                  <defs>
                    <linearGradient id="activeLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {/* Active radar pulsed circle at current step coordinates */}
                  {journeyStops[activeStepIndex] && (
                    <circle
                      cx={`${journeyStops[activeStepIndex].x}%`}
                      cy={`${journeyStops[activeStepIndex].y}%`}
                      r="16"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="1.5"
                      className="animate-ping origin-center"
                      style={{ transformOrigin: `${journeyStops[activeStepIndex].x}% ${journeyStops[activeStepIndex].y}%` }}
                    />
                  )}
                </svg>

                {/* Visual representations of architectural elements in blueprint */}
                {/* Stone display wall icon */}
                <div className="absolute top-[8%] left-[32%] w-12 h-6 border border-white/10 rounded bg-[#111113] p-1 flex items-center justify-center text-[6px] font-mono text-cream/40 pointer-events-none">
                  SWATCHES
                </div>
                {/* Interactive Kiosk pedestal */}
                <div className="absolute top-[18%] left-[45%] w-8 h-8 rounded-full border border-gold/20 bg-gold/10 flex items-center justify-center text-[6px] font-mono text-gold pointer-events-none">
                  KIOSK
                </div>
                {/* Sensory spotlights block */}
                <div className="absolute top-[38%] left-[56%] w-10 h-7 border border-white/10 rounded flex flex-col items-center justify-center bg-black/50 pointer-events-none text-[5.5px]">
                  <span className="text-gold">SENSORY</span>
                  <span className="text-[4px] text-cream/30">SCENT 4</span>
                </div>
                {/* XR Holo Stage */}
                <div className="absolute bottom-[16%] left-[63%] w-16 h-12 border border-dashed border-gold/30 bg-[#121115] rounded-xl p-1 flex flex-col items-center justify-center pointer-events-none text-[6.5px]">
                  <span className="text-[5.5px] text-gold uppercase tracking-wider font-bold">HOLO XR RIG</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1 animate-pulse" />
                </div>
                {/* VIP Lounge Suite */}
                <div className="absolute bottom-[36%] left-[73%] w-14 h-12 border border-white/10 bg-[#0f0f11] rounded flex flex-col items-center justify-center p-1 pointer-events-none text-[6px] text-cream/40">
                  <div className="w-1.5 h-1.5 bg-indigo-500/20 rounded-full mb-0.5" />
                  BOARD ROOM
                </div>

                {/* STATION NODES (Interactive & Clickable) */}
                {journeyStops.map((stop, index) => {
                  const isActive = activeStepIndex === index;
                  const isPassed = activeStepIndex > index;
                  
                  // Zone based colors
                  let zoneBorderColor = 'border-amber-500/20 text-amber-500 bg-[#0d0a08]/90';
                  if (stop.zone === 'ZONE_B') zoneBorderColor = 'border-gold/20 text-gold bg-[#0e0c08]/90';
                  if (stop.zone === 'ZONE_C') zoneBorderColor = 'border-emerald-500/20 text-emerald-400 bg-[#070b09]/90';

                  if (isActive) {
                    if (stop.zone === 'ZONE_A') zoneBorderColor = 'border-amber-400 bg-amber-500 text-black font-black scale-110 shadow-[0_0_15px_rgba(245,158,11,0.4)]';
                    if (stop.zone === 'ZONE_B') zoneBorderColor = 'border-gold bg-gold text-onyx font-black scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]';
                    if (stop.zone === 'ZONE_C') zoneBorderColor = 'border-emerald-400 bg-emerald-500 text-black font-black scale-110 shadow-[0_0_15px_rgba(16,185,129,0.4)]';
                  } else if (isPassed) {
                    if (stop.zone === 'ZONE_A') zoneBorderColor = 'border-amber-500/50 text-amber-500 bg-[#0f0a05]';
                    if (stop.zone === 'ZONE_B') zoneBorderColor = 'border-gold/50 text-gold bg-[#0e0c05]';
                    if (stop.zone === 'ZONE_C') zoneBorderColor = 'border-emerald-500/50 text-emerald-400 bg-[#050906]';
                  }

                  return (
                    <button
                      key={stop.id}
                      onClick={() => {
                        setActiveStepIndex(index);
                        setIsPlaying(false);
                      }}
                      style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all duration-300 z-20 flex items-center justify-center ${zoneBorderColor}`}
                      title={t(stop.titleFa, stop.titleEn)}
                    >
                      {isActive ? (
                        <span className="text-[10px] sm:text-xs font-mono font-black">{stop.id}</span>
                      ) : isPassed ? (
                        <CheckCircle2 size={12} className="opacity-80" />
                      ) : (
                        stop.icon
                      )}

                      {/* Floating Indicator Label (Show only on Hover or Active) */}
                      <span className={`absolute top-full mt-1.5 whitespace-nowrap text-[6.5px] sm:text-[7px] px-1.5 py-0.5 rounded font-black border transition-all pointer-events-none ${
                        isActive 
                          ? 'opacity-100 scale-100 bg-[#16161a] text-gold border-gold/30 translate-y-0 z-30' 
                          : 'opacity-40 scale-90 translate-y-[-2px] bg-black/60 text-cream/60 border-transparent group-hover:opacity-100'
                      }`}>
                        {stop.id}. {t(stop.titleFa, stop.titleEn).split(' ')[0]}
                      </span>
                    </button>
                  );
                })}

                {/* MOVING AVATAR CHARACTER - Travel along blueprint path */}
                {journeyStops[activeStepIndex] && (
                  <motion.div
                    animate={{ 
                      x: `calc(${journeyStops[activeStepIndex].x}% - 22px)`,
                      y: `calc(${journeyStops[activeStepIndex].y}% - 22px)`
                    }}
                    transition={{ type: "spring", stiffness: 70, damping: 14 }}
                    className="absolute w-11 h-11 rounded-full border-2 border-gold z-30 shadow-[0_0_20px_rgba(212,175,55,0.7)] cursor-pointer"
                    id="film-moving-avatar"
                  >
                    <img 
                      src={activePersonaDetail.avatar} 
                      alt="Active Character traveling" 
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Tiny pulsing gold radar ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-60 pointer-events-none" />
                  </motion.div>
                )}

              </div>
            </div>

            {/* RIGHT SECTION: THE SCENE STORY & EXECUTIVE TELEMETRY BOARD */}
            <div className="w-full lg:w-[400px] flex flex-col gap-4 shrink-0 order-1 lg:order-2">
              
              {/* Active station description */}
              <div className="luxury-glass p-5 rounded-3xl border border-gold/10 bg-[#0f0f12] flex flex-col relative overflow-hidden shrink-0">
                
                {/* Station general header tags */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-[8.5px] text-gold/85 font-mono font-black uppercase tracking-widest leading-none">
                      {activeStep.zone === 'ZONE_A' && t('بخش ۱: قبل از شوروم', '01 / PRE-SHOWROOM')}
                      {activeStep.zone === 'ZONE_B' && t('بخش ۲: درون شوروم اصلی و موزه حسی میلان', '02 / MILAN SHOWROOM & INTEGRATED MUSEUM')}
                      {activeStep.zone === 'ZONE_C' && t('بخش ۳: بعد از شوروم و قرارداد', '03 / POST-SHOWROOM LEAD')}
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-white/5 text-[7px] text-cream/40 font-mono rounded">
                    STATION 0{activeStep.id} OF 12
                  </span>
                </div>

                <h3 className="font-sans font-black text-cream text-[13px] leading-tight flex items-center justify-start gap-1">
                  <span className="text-gold">0{activeStep.id}.</span> 
                  {t(activeStep.titleFa, activeStep.titleEn)}
                </h3>

                {/* Targeted User Persona specific Storyboard rendering */}
                <div className="mt-3.5 bg-black/40 p-4 rounded-2xl border border-white/5 relative">
                  <div className="absolute top-2 left-2 text-[6px] font-mono text-cream/20 uppercase tracking-widest">{t('روایت سینمایی سناریو', 'Narrative Track')}</div>
                  
                  {/* Huge Premium Avatar Profile Card */}
                  <div className="flex items-center gap-4 mb-3 pb-3 border-b border-white/5 mt-1.5">
                    <div className="relative shrink-0">
                      <img 
                        src={activePersonaDetail.avatar} 
                        alt="Narrator avatar" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-gold/40 shadow-lg shadow-gold/5"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-gold text-onyx w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black border border-onyx">
                        {activePersonaDetail.roleIcon}
                      </div>
                    </div>
                    <div className="none flex-grow min-w-0">
                      <div className="text-[8px] uppercase tracking-widest text-gold font-mono font-black mb-0.5">
                        {activePersonaDetail.tag}
                      </div>
                      <h4 className="text-[11.5px] text-cream font-black truncate max-w-full">
                        {activePersonaDetail.name}
                      </h4>
                      <span className="text-[8.5px] text-cream/40 block mt-0.5 font-bold">
                        {t('شخصیت شبیه‌سازی‌شده فعال در این گام', 'ACTIVE SIMULATED ADVANCED PERSONA')}
                      </span>
                    </div>
                  </div>

                  <p className="text-[12px] text-cream/85 leading-relaxed text-justify mt-2 font-sans-fa">
                    {currentNarrative}
                  </p>
                </div>

                {/* Sensory triggers indicators for active step */}
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  <div className="bg-white/[0.015] border border-white/5 p-1.5 rounded-lg text-center">
                    <span className="text-[6.5px] text-cream/30 uppercase block font-mono">{t('رایحه افشانه', 'OLFACTORY VENT')}</span>
                    <span className="text-[8.5px] text-gold font-bold block mt-0.5 whitespace-nowrap truncate">
                      {activeStepIndex === 6 ? t('چوب جنگل و چرم', 'Cedarwood & Leather') : 
                       activeStepIndex === 11 ? t('پچولی ممتاز', 'Patchouli Mist') : t('فاقد تحریک', 'Standby')}
                    </span>
                  </div>
                  <div className="bg-white/[0.015] border border-white/5 p-1.5 rounded-lg text-center">
                    <span className="text-[6.5px] text-cream/30 uppercase block font-mono">{t('پروجکتور نوری', 'SPOTLIGHT DALI')}</span>
                    <span className="text-[8.5px] text-gold font-bold block mt-0.5 whitespace-nowrap truncate">
                      {activeStepIndex >= 3 && activeStepIndex <= 8 ? t('فوکوس گرم %۸۰', 'Warm Focus 80%') : t('نور محیط %۱۰', 'Ambient Light 10%')}
                    </span>
                  </div>
                  <div className="bg-white/[0.015] border border-white/5 p-1.5 rounded-lg text-center">
                    <span className="text-[6.5px] text-cream/30 uppercase block font-mono">{t('رصد کلان CDP', 'CDP LIVE EVENT')}</span>
                    <span className="text-[8.5px] text-emerald-400 font-bold block mt-0.5 whitespace-nowrap truncate">
                      {activeStepIndex === 11 ? t('تراکنش تایید', 'CONVERTED!') : `LOG_STEP_0${activeStep.id}`}
                    </span>
                  </div>
                </div>

              </div>

              {/* INTERACTIVE TELEMETRY DIALS ORMETRICS */}
              <div className="luxury-glass p-4 rounded-3xl border border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
                <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-3">
                  <TrendingUp size={14} className="text-gold" />
                  <span className="text-[8.5px] text-cream/40 font-mono uppercase tracking-widest">{t('داشبورد پایش واکنش‌های تجاری و حسی مشتری', 'CLIENT TELEMETRY DIALS & COMMERCIAL CONVERSION KPI')}</span>
                </div>

                <div className="space-y-2.5">
                  
                  {/* Gauge 1: Engagement Termperature */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-bold">
                      <span className="text-cream/80">{t('۱. حرارت اشتیاق مشتری (Engagement):', '1. Client Engagement Temperature:')}</span>
                      <span className="text-amber-500 font-mono">{telemetryMetrics.engagement}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${telemetryMetrics.engagement}%` }}
                        className="h-full bg-amber-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Gauge 2: Sensory Impact Level */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-bold">
                      <span className="text-cream/80">{t('۲. شدت احساس و واکنش حسی (Sensation Dev):', '2. Sensory Impact Level (DALI Spotlight):')}</span>
                      <span className="text-indigo-400 font-mono">{telemetryMetrics.sensation}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${telemetryMetrics.sensation}%` }}
                        className="h-full bg-indigo-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Gauge 3: B2B Business Trust */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-bold">
                      <span className="text-cream/80">{t('۳. میزان انسجام و اعتماد تجاری معتبر (Trust Index):', '3. Strategic Business Trust Index:')}</span>
                      <span className="text-emerald-400 font-mono">{telemetryMetrics.trust}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${telemetryMetrics.trust}%` }}
                        className="h-full bg-emerald-400 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Gauge 4: Probability of Signing the Contract (REACHING CONTRACT signed!) */}
                  <div className="space-y-1 p-2 bg-emerald-500/[0.02] border border-emerald-500/15 rounded-xl mt-1.5">
                    <div className="flex justify-between text-[9.5px] font-black">
                      <span className="text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                        <ShieldCheck size={11} className="text-emerald-400" />
                        {t('۴. احتمال تبدیل سرنخ به قرارداد نهایی:', '4. Ultimate Conversion / Signing Contract Odds:')}
                      </span>
                      <span className="text-emerald-400 font-mono">{telemetryMetrics.signedProbability}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#111] rounded-full overflow-hidden mt-1.5 border border-emerald-500/10">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${telemetryMetrics.signedProbability}%` }}
                        className={`h-full rounded-full ${telemetryMetrics.signedProbability === 100 ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 animate-pulse' : 'bg-emerald-500'}`}
                      />
                    </div>
                    {telemetryMetrics.signedProbability === 100 && (
                      <span className="text-[7.5px] text-emerald-400/80 font-black tracking-widest font-mono text-center block mt-1 uppercase animate-bounce leading-none">
                        {t('✓ سرنخ با موفقیت به قرارداد رسمی و پرداختی مستقل تبدیل شد', '✓ DEAL SIGNED & TRANSACTION SPLITS SUCCESSFULLY SET')}
                      </span>
                    )}
                  </div>

                </div>

              </div>

              {/* 🔄 CLOSED-LOOP DEPARTMENT SYNC & FEEDBACK ENGINE */}
              <div className="luxury-glass p-4 rounded-3xl border border-gold/10 bg-[#08080a]/80 flex flex-col shrink-0">
                <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-3 justify-between">
                  <div className="flex items-center gap-1.5">
                    <Brain size={14} className="text-gold animate-pulse" />
                    <span className="text-[8.5px] text-gold font-mono uppercase tracking-widest">{t('چرخه تعاملی و همگام‌سازی واحدها', 'Multi-Dept. Live Feedback Loop')}</span>
                  </div>
                  <span className="text-[7px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase tracking-widest">
                    {t('گردش کار هوشمند مرجع', 'INTELLIGENT WORKFLOW')}
                  </span>
                </div>

                <p className="text-[9px] text-cream/50 leading-relaxed mb-3 font-sans-fa">
                  {t(
                    'پایش همزمانِ رفتار مشتری در لایه‌های فیزیکی و دیجیتال (Phygital) و تزریق بلادرنگ بازخوردها جهت تصمیم‌گیری در سه هسته کلان سازمانی:',
                    'Synchronized tracking of phygital client behaviors continuously fuels a live recursive feedback loop across three business pillars:'
                  )}
                </p>

                <div className="space-y-3">
                  {/* Marketing Hub */}
                  <div className="bg-white/[0.015] border border-white/5 p-2 rounded-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-cream font-black flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${activeStepIndex <= 2 ? 'bg-amber-500 animate-ping' : 'bg-emerald-400'}`} />
                        {t('۱. واحد مارکتینگ و محتوای اختصاصی', '1. Marketing & Bespoke Content Engine')}
                      </span>
                      <span className="text-[7.5px] text-gold font-mono font-bold">
                        {activeStepIndex <= 2 ? t('در حال پردازش سرنخ', 'PROSPECT PROCESSING') :
                         activeStepIndex <= 8 ? t('تعدیل اتمسفر حسی', 'SENSORY TRIGGERS LIVE') : t('شلیک کیت اختصاصی', 'BESPOKE CATALOG PUSHED')}
                      </span>
                    </div>
                    <p className="text-[8.5px] text-cream/60 leading-relaxed font-sans-fa">
                      {activeStepIndex <= 2 ? t('ثبت توکن‌های اتریبیوشن و صدور آنی بلیت دیجیتال RSVP با کدهای امنیتی QR به ولت مخاطب.', 'Tokens verified; pushes custom RSVP Wallet VIP Passes with embedded RFID codes to client.') :
                       activeStepIndex <= 8 ? t('تغییر پویای عطر، شدت نورهای فوکوس و پخش مولتی‌مدیا متناسب با زمان توقف و کالیته فیزیکی لمس‌شده.', 'Alters ambient smells, warm spotlights and projection videos dynamically as client moves on map.') :
                       t('رهاسازی کیت جامع رسانه‌ای ۴K و کاتالوگ شخصی‌سازی‌شده مجهز به تصاویر نما، قیمت کالیبره و رندرهای لابی سه‌بعدی.', 'Fires full custom media kit and customized 3D renders matching client swatches directly to email.')}
                    </p>
                  </div>

                  {/* Pricing and Sales Hub */}
                  <div className="bg-white/[0.015] border border-white/5 p-2 rounded-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-cream font-black flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${activeStepIndex >= 3 && activeStepIndex <= 8 ? 'bg-amber-500 animate-ping' : 'bg-emerald-400'}`} />
                        {t('۲. موتور قیمت‌گذاری پویا و تیم فروش', '2. Dynamic Pricing Engine & Sales')}
                      </span>
                      <span className="text-[7.5px] text-gold font-mono font-bold">
                        {activeStepIndex <= 2 ? t('پایش پیش‌فرض سقف', 'QUOTATION STANDBY') :
                         activeStepIndex <= 8 ? t('محاسبه آنی تخفیف', 'LIVE PRICE TIER REFINEMENT') : t('تسهیم خودکار پورسانت', 'B2B CONTRACT SPLITTING')}
                      </span>
                    </div>
                    <p className="text-[8.5px] text-cream/60 leading-relaxed font-sans-fa">
                      {activeStepIndex <= 2 ? t('تشکیل پروفایل طلایی در CDP و ارزیابی لیدهای پربازده جهت تخصیص به مشاور کارکشته.', 'Assembles Gold Profile in CDP to forecast expected B2B capacity limits & assign executive hosts.') :
                       activeStepIndex <= 8 ? t('زمان توقف و لمس کالیته سنگ‌ها در شوروم و موزه، مدل‌های مایلستون و تخفیف حجمی را برای کارشناس فروش فورا آپدیت می‌کند.', 'Physical tactile touch duration recalibrates scale discounts & transport quotes live on sellers tablets.') :
                       t('تسهیم اتوماتیک پورسانت معرفی طراح، تفکیک سهم هاب توزیع و نهایی‌سازی قراردادهای چند میلیون یورویی فاقد اصطکاک.', 'Order confirmation triggers automated smart commission splits, regional dealer share and quarry locks.')}
                    </p>
                  </div>

                  {/* R&D Collaboration Hub */}
                  <div className="bg-white/[0.015] border border-white/5 p-2 rounded-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-cream font-black flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${activeStepIndex >= 6 ? 'bg-amber-500 animate-ping' : 'bg-indigo-400'}`} />
                        {t('۳. واحد فنی تحقیق و توسعه (R&D)', '3. R&D Feedback & Formulation Sync')}
                      </span>
                      <span className="text-[7.5px] text-gold font-mono font-bold">
                        {activeStepIndex <= 5 ? t('پایش سلایق متریال', 'TREND MONITORING') :
                         activeStepIndex <= 8 ? t('واکاوی رفتار فیزیکی', 'TACTILE PREFERENCE INGEST') : t('بهینه‌سازی فرمول آینده', 'FORMULATION OPTIMIZATION')}
                      </span>
                    </div>
                    <p className="text-[8.5px] text-cream/60 leading-relaxed font-sans-fa">
                      {activeStepIndex <= 5 ? t('مطالعه حجم دانلود کدهای BIM و انتخاب‌های دیجیتال برای اولویت‌بخشی به طرح‌های پرطرفدار مونیخ/سوئیس.', 'Aggregates global BIM files downloads to prioritize popular aesthetic veins in Milan & Stuttgart.') :
                       activeStepIndex <= 8 ? t('دریافت سیگنال‌های لمسی نمونه‌ها جهت بهینه‌سازی فرمول تیتانیوم کپسوله و بررسی مقاومت در شبیه‌ساز اقلیم‌های ساحلی.', 'Ingests physical touch logs of raw slates to refine scratch-resistance and crystallizing processes.') :
                       t('دسته‌بندی ویژگی‌های مورد تقاضا (نما/دکوراسیون) و ارسال اطلاعات ترند بازار به خطوط کوره تولید ایتالیا برای ارتقای کیفی لاین جدید.', 'Packages demand profiles on structural facades to feed factory engineers in Italy on zero-waste targets.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* THE REALTIME SCROLLING LOG FROM CORTEX */}
              <div className="luxury-glass p-3 rounded-2xl border border-white/5 bg-[#050506] flex-1 flex flex-col justify-between min-h-[110px] max-h-[140px]">
                <div className="text-gold/60 mb-2 font-mono text-[7.5px] border-b border-white/5 pb-1 flex items-center justify-between">
                  <span>CORTEX DATA EMULATOR LOGS @ SEG_C12_DECK</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-1.5 text-[7px] font-mono leading-relaxed text-emerald-400/70 select-none custom-scrollbar pl-1">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className="truncate">
                      {log}
                    </div>
                  ))}
                  <div className="text-cream/15">[Standby] Listening on RF channel raw feedback loops...</div>
                </div>

                <div className="text-[6.5px] text-cream/25 border-t border-white/5 pt-1.5 mt-2 flex justify-between uppercase">
                  <span>Node identifier: VODZIA_CDP_V2</span>
                  <span>SSL_SECURED</span>
                </div>
              </div>

            </div>

          </div>

          {/* Footer of Modal */}
          <div className="p-4 sm:p-5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[8px] sm:text-[9px] text-cream/30 font-black uppercase tracking-[0.15em] bg-[#09090a] shrink-0">
            <span>{t('منشور تجربه هوشمند مشتری ودزیا • پلتفرم تعاملی هیئت مدیره', 'VEDESIA INTU-SENSORY MASTERPLAY REPORT • MULTI-FACETED DIGITAL HIGH-END MAP')}</span>
            <span className="text-gold/50 font-mono mt-2 md:mt-0">{t('ارائه شده و تایید شده تحت استاندارد صفر-ERP ودزیا', 'PRODUCED UNDER VEDESIA RAW DIGITAL CUSTOMER DISCOVERY STANDARDS')}</span>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
