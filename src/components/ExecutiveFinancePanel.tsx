import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  TrendingUp, 
  Download, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  FileText, 
  Plus, 
  Activity,
  ArrowUpRight,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExecutiveFinancePanelProps {
  t: (fa: string, en: string) => string;
  lang: 'fa' | 'en';
}

interface ExpenseItem {
  id: string;
  titleFa: string;
  titleEn: string;
  allocated: number; // in EUR
  spent: number; // in EUR
  status: 'completed' | 'ongoing' | 'pending';
  category: string;
}

interface SubProjectFinancials {
  id: string;
  nameFa: string;
  nameEn: string;
  managerFa: string;
  managerEn: string;
  totalBudget: number;
  actualInvoiced: number;
  physicalProgress: number;
  startDate: string;
  endDate: string;
  durationDays: number;
  expenses: ExpenseItem[];
}

export default function ExecutiveFinancePanel({ t, lang }: ExecutiveFinancePanelProps) {
  // Master Project Timeline Stats
  const startYear = 1405;
  const currentHijriDate = "1405/03/11"; // Match current local time coordinate: Today is June 1, 2026 (11 Khordad 1405)
  const totalProjectDays = 404; // Farvardin 8, 1405 to Ordibehesht 15, 1406 (Total span is 404 days)
  const daysSpent = 66; // Farvardin 8, 1405 to Khordad 11, 1405 is exactly 66 days spent (inclusive)
  const daysRemaining = totalProjectDays - daysSpent;
  const projectTimePercent = Math.round((daysSpent / totalProjectDays) * 100);

  // Financial Sub-Project Data
  const [subProjects, setSubProjects] = useState<SubProjectFinancials[]>([
    {
      id: 'milan-sensory',
      nameFa: 'تجهیز محیطی، مبلمان و ملزومات حسی شوروم میلان (فاز ۳)',
      nameEn: 'Milan Showroom Sensory Atmospheric Fit-out',
      managerFa: 'مهندس احمدی (مدیر تجهیز فیزیکی)',
      managerEn: 'A. Ahmadi (Physical Set-up Lead)',
      totalBudget: 320000,
      actualInvoiced: 212500,
      physicalProgress: 80,
      startDate: '1405/02/01',
      endDate: '1405/03/15',
      durationDays: 45,
      expenses: [
        { id: 'exp-1', titleFa: 'سنسورهای نوبتی پخش و هوشمندسازی رایحه برند Vedesia', titleEn: 'Smart Scent Dispersion Sensors & HVAC controllers', allocated: 45000, spent: 45000, status: 'completed', category: 'Sensory' },
        { id: 'exp-2', titleFa: 'تجهیز بردهای تعاملی لمسی چیدمان کوبوگو و نمونه‌های پرسلانی', titleEn: 'Interactive touchable Cobogo display boards & haptic swatches', allocated: 90000, spent: 78000, status: 'ongoing', category: 'Fit-out' },
        { id: 'exp-3', titleFa: 'اکوستیک سازی اتمسفریک، پخش صدهای جنگلی مدیترانه‌ای ره‌پویا', titleEn: 'Integrated spatial acoustics & localized ambient sound systems', allocated: 35000, spent: 35000, status: 'completed', category: 'Acoustics' },
        { id: 'exp-4', titleFa: 'دکوراسیون سفارشی لوکس و کانسپت همراه با عایق‌های محیطی گلس', titleEn: 'Premium designer furniture & isolated protective glass frames', allocated: 65000, spent: 54500, status: 'ongoing', category: 'Interior' },
        { id: 'exp-5', titleFa: 'سیستم پذیرایی VIP، کیترینگ اختصاصی و آمادگی مراسم پیش‌نمایش معماران', titleEn: 'VIP concierge catering reserves & architect launch soft-previews', allocated: 55000, spent: 0, status: 'pending', category: 'Catering' },
        { id: 'exp-6', titleFa: 'اندوخته احتیاطی و واکنش به تاخیر ترخیص‌های دریایی میلانو', titleEn: 'Risk insurance SLA cushion & customs delay recovery budget', allocated: 30000, spent: 0, status: 'pending', category: 'Reserve' }
      ]
    },
    {
      id: 'xr-digital-twin',
      nameFa: 'اکوسیستم دیجیتال لوکس، خروجی‌های سه‌بعدی سنگ‌ها و پورتال اختصاصی معماران (فاز ۲)',
      nameEn: 'Vedesia Luxury Digital Twin Hub & VIP Portal',
      managerFa: 'دکتر ستاری (مدیر زیرساخت دیجیتال)',
      managerEn: 'Dr. Sattari (Digital Infrastructure Dir.)',
      totalBudget: 145000,
      actualInvoiced: 92000,
      physicalProgress: 72,
      startDate: '1405/01/10',
      endDate: '1405/03/10',
      durationDays: 60,
      expenses: [
        { id: 'exp-b1', titleFa: 'فرآیند اسکن تری‌دی با بافت واگرا و باکیفیت سنگ‌های واقعی پرسلانی', titleEn: 'Ultra-resolution 3D texture scanning & diffuse normal maps', allocated: 40000, spent: 38000, status: 'completed', category: 'Scan' },
        { id: 'exp-b2', titleFa: 'توسعه موتور پردازش ابری رول‌آپ برای ارائه رندرهای لحظه‌ای معماران', titleEn: 'Cloud rendering pipeline for instant custom architect configurations', allocated: 50000, spent: 41000, status: 'ongoing', category: 'Software' },
        { id: 'exp-b3', titleFa: 'پیاده‌سازی ماژول توکن امنیتی مشتریان لوکس و اختصاصی در پورتال', titleEn: 'Architect VIP login SSO & high-security design portfolio sharing', allocated: 25000, spent: 13000, status: 'ongoing', category: 'Security' },
        { id: 'exp-b4', titleFa: 'تست‌های استرس، بارگذاری وب‌سایت همزمان با رویداد Fuorisalone', titleEn: 'CDN configuration & load testing for European launch traffic surges', allocated: 30000, spent: 0, status: 'pending', category: 'Infrastructure' }
      ]
    },
    {
      id: 'milan-vip-pr',
      nameFa: 'کمپین دیپلماسی تجاری VIP و ترغیب ۲۰ کارفرمای تراز اول میلان (فاز ۳)',
      nameEn: 'Milan Diplomatic PR & Top 20 Developer Acquisition Campaign',
      managerFa: 'خانم علوی (مدیر روابط عمومی بین‌الملل)',
      managerEn: 'N. Alavi (Global PR Coordinator)',
      totalBudget: 185000,
      actualInvoiced: 120000,
      physicalProgress: 85,
      startDate: '1405/01/15',
      endDate: '1405/03/05',
      durationDays: 50,
      expenses: [
        { id: 'exp-c1', titleFa: 'پکیج‌های نمونه‌ کار فیزیکی هدیه مینیاتوری سفارشی برند به معماران برتر', titleEn: 'Customized luxury miniature sample gift boxes delivered to VIP designers', allocated: 50000, spent: 48000, status: 'completed', category: 'Gifts' },
        { id: 'exp-c2', titleFa: 'قرارداد انتشارات متنی و پوشش اختصاصی مجلات معماری طراز اول ایتالیا', titleEn: 'Direct editorial contracts with leading Milanese architecture reviews', allocated: 65000, spent: 50000, status: 'ongoing', category: 'Publications' },
        { id: 'exp-c3', titleFa: 'لانچ رویداد گالا و ترانسفر لیموزین معماران تا لوکس‌ترین هتل میلان', titleEn: 'Private gala arrangements & luxury concierge travel for UHNWIs', allocated: 50000, spent: 22000, status: 'ongoing', category: 'Events' },
        { id: 'exp-c4', titleFa: 'ردگیری فیدبک‌ها و پایش دوره‌ای صدای مشتریان نهایی در بازار غربی', titleEn: 'Qualitative social listening & focused market feedback analysis', allocated: 20000, spent: 0, status: 'pending', category: 'Analytics' }
      ]
    }
  ]);

  const [selectedSubProjectId, setSelectedSubProjectId] = useState<string>('milan-sensory');
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] ${t('سیستم کنترل بودجه مدیرعامل راه اندازی شد.', 'CEO Financial Control Hub Initialized.')}`,
    `[${new Date().toLocaleTimeString()}] ${t('پایش زنده مغایرت هزینه‌های فاز ۳ میلان متصل گرديد.', 'Live audit for Milan Phase 3 expense discrepancies synced.')}`
  ]);
  const [downloading, setDownloading] = useState(false);

  // Form states for creating a new expense item
  const [newTitleFa, setNewTitleFa] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newAllocated, setNewAllocated] = useState<number | ''>('');
  const [newSpent, setNewSpent] = useState<number | ''>('');
  const [newCategory, setNewCategory] = useState('Fit-out');
  const [newStatus, setNewStatus] = useState<'completed' | 'ongoing' | 'pending'>('ongoing');

  // Form states for editing selected sub-project budget
  const [customTotalBudget, setCustomTotalBudget] = useState<number | ''>('');

  // Editing existing expense
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [editSpentAmount, setEditSpentAmount] = useState<number | ''>('');
  const [editAllocatedAmount, setEditAllocatedAmount] = useState<number | ''>('');

  // Selected sub project object
  const activeSub = subProjects.find(sp => sp.id === selectedSubProjectId) || subProjects[0];

  // Calculations for active sub project
  const remainingBudget = activeSub.totalBudget - activeSub.actualInvoiced;
  const budgetUtilizationPercent = activeSub.totalBudget > 0 ? Math.round((activeSub.actualInvoiced / activeSub.totalBudget) * 100) : 0;

  // Fast-track release simulation
  const handleApprovePendingInvoice = (expenseId: string) => {
    const targetExp = activeSub.expenses.find(e => e.id === expenseId);
    if (!targetExp || targetExp.status === 'completed') return;

    const invoiceValue = targetExp.allocated - targetExp.spent;
    if (invoiceValue <= 0) return;

    // Toast simulation
    const timestamp = new Date().toLocaleTimeString();
    
    // Update State
    const updatedSubProjects = subProjects.map(sp => {
      if (sp.id === activeSub.id) {
        const updatedExpenses = sp.expenses.map(exp => {
          if (exp.id === expenseId) {
            return { ...exp, spent: exp.allocated, status: 'completed' as const };
          }
          return exp;
        });

        const newActualInvoiced = updatedExpenses.reduce((sum, item) => sum + item.spent, 0);
        // Slightly boost physical progress to represent invoice impact
        const newProgress = Math.min(100, sp.physicalProgress + 4);

        return {
          ...sp,
          actualInvoiced: newActualInvoiced,
          physicalProgress: newProgress,
          expenses: updatedExpenses
        };
      }
      return sp;
    });

    setSubProjects(updatedSubProjects);
    setLogs(prev => [
      `[${timestamp}] ⚡ ${t('دستور پرداخت صادر شد:', 'Invoice payment released:')} ${t(targetExp.titleFa, targetExp.titleEn)} (€${invoiceValue.toLocaleString()})`,
      ...prev
    ]);
  };

  // Adjust cost buffer
  const handleAdjustBuffer = (amount: number) => {
    const timestamp = new Date().toLocaleTimeString();
    const updatedSubProjects = subProjects.map(sp => {
      if (sp.id === activeSub.id) {
        const updatedBudget = Math.max(0, sp.totalBudget + amount);
        return {
          ...sp,
          totalBudget: updatedBudget
        };
      }
      return sp;
    });
    setSubProjects(updatedSubProjects);
    setLogs(prev => [
      `[${timestamp}] ⚙ ${t('تعدیل اعتبار:', 'Budget adjustment:')} ${amount > 0 ? '+' : ''}€${amount.toLocaleString()} ${t('بابت مخارج احتیاطی جدید ثبت گردید.', 'allocated to emergency contingency cushion.')}`,
      ...prev
    ]);
  };

  // Update sub-project total budget Cap
  const handleUpdateTotalBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTotalBudget || Number(customTotalBudget) <= 0) return;

    const timestamp = new Date().toLocaleTimeString();
    const updatedSubProjects = subProjects.map(sp => {
      if (sp.id === activeSub.id) {
        return {
          ...sp,
          totalBudget: Number(customTotalBudget)
        };
      }
      return sp;
    });

    setSubProjects(updatedSubProjects);
    setLogs(prev => [
      `[${timestamp}] 💼 ${t('بودجه کل اصلاح شد:', 'Total budget revised:')} €${Number(customTotalBudget).toLocaleString()}`,
      ...prev
    ]);
    setCustomTotalBudget('');
  };

  // Add custom manual expense item
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleFa || !newTitleEn || newAllocated === '') return;

    const timestamp = new Date().toLocaleTimeString();
    const finalSpent = newSpent === '' ? 0 : Number(newSpent);
    const finalAllocated = Number(newAllocated);

    const newItem: ExpenseItem = {
      id: `exp-${Date.now().toString().slice(-4)}`,
      titleFa: newTitleFa,
      titleEn: newTitleEn,
      allocated: finalAllocated,
      spent: finalSpent,
      category: newCategory,
      status: finalSpent >= finalAllocated ? 'completed' as const : finalSpent > 0 ? 'ongoing' as const : 'pending' as const
    };

    const updatedSubProjects = subProjects.map(sp => {
      if (sp.id === activeSub.id) {
        const updatedExpenses = [...sp.expenses, newItem];
        const newActualInvoiced = updatedExpenses.reduce((sum, item) => sum + item.spent, 0);

        return {
          ...sp,
          actualInvoiced: newActualInvoiced,
          expenses: updatedExpenses
        };
      }
      return sp;
    });

    setSubProjects(updatedSubProjects);
    setLogs(prev => [
      `[${timestamp}] ➕ ${t('ردیف هزینه‌ای اضافه شد:', 'New expense logged:')} ${t(newTitleFa, newTitleEn)} (€${finalSpent.toLocaleString()} / €${finalAllocated.toLocaleString()})`,
      ...prev
    ]);

    // Reset inputs
    setNewTitleFa('');
    setNewTitleEn('');
    setNewAllocated('');
    setNewSpent('');
  };

  // Save Inline Edited values for single record
  const handleSaveInlineSpent = (expenseId: string) => {
    if (editingExpenseId !== expenseId) return;
    const finalSpent = editSpentAmount === '' ? 0 : Number(editSpentAmount);
    const finalAllocated = editAllocatedAmount === '' ? 0 : Number(editAllocatedAmount);
    const timestamp = new Date().toLocaleTimeString();

    const updatedSubProjects = subProjects.map(sp => {
      if (sp.id === activeSub.id) {
        const updatedExpenses = sp.expenses.map(exp => {
          if (exp.id === expenseId) {
            const hasChangedStatus = finalSpent >= finalAllocated ? 'completed' as const : finalSpent > 0 ? 'ongoing' as const : 'pending' as const;
            return {
              ...exp,
              allocated: finalAllocated,
              spent: finalSpent,
              status: hasChangedStatus
            };
          }
          return exp;
        });

        const newActualInvoiced = updatedExpenses.reduce((sum, item) => sum + item.spent, 0);

        return {
          ...sp,
          actualInvoiced: newActualInvoiced,
          expenses: updatedExpenses
        };
      }
      return sp;
    });

    setSubProjects(updatedSubProjects);
    setEditingExpenseId(null);
    setLogs(prev => [
      `[${timestamp}] ✏️ ${t('تغییر فاکتور ردیف مالی:', 'Updated inline expense record:')} €${finalSpent.toLocaleString()} spent / €${finalAllocated.toLocaleString()} allocated`,
      ...prev
    ]);
  };

  // Download Report Simulate
  const triggerDownloadReport = () => {
    setDownloading(true);
    const timestamp = new Date().toLocaleTimeString();
    setTimeout(() => {
      setDownloading(false);
      setLogs(prev => [
        `[${timestamp}] 📥 ${t('گزارش رسمی حسابرسی مالی تفصیلی VEDESIA صادر گردید (PDF).', 'Official VEDESIA Financial Audit & Discrepancy report successfully compiled & exported.')}`,
        ...prev
      ]);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="space-y-6"
    >
      {/* 1. MASTER PROJECT TIMELINE HEADER (TIME & PROGRESS EXPLAINER) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 luxury-glass p-6 md:p-8 rounded-[24px] border border-white/5 bg-[#080808]/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="text-gold" size={18} />
                <h4 className="text-sm font-black text-gold uppercase tracking-[0.15em] font-sans">
                  {t('پایش زمانی کلان ابرپژوهه ودسیا', 'Vedesia Master Project Timeline HUD')}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-cream/40 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                {t('تاریخ تراز: ', 'As of: ')} {currentHijriDate}
              </span>
            </div>

            <p className="text-xs text-cream/70 leading-relaxed max-w-2xl font-sans text-justify">
              {t(
                'برنامه زمان‌بندی کل عملیات متصل به Fuorisalone میلان مشتمل بر ۳۰۰ روز است. با تکیه بر پایش مستمر، مدت زمان مصرف شده و باقیمانده به تفکیک فازها نمایش داده می‌شود تا مدیرعامل از همراستایی فیزیکی با ترخیص گمرکات مطمئن گردد.',
                'The overall Vedesia launch sequence leading to Milan Fuorisalone spans 300 days of parallel tracks. Live telemetry compares days elapsed against critical regulatory, production, and shipping milestones to safeguard target delivery windows.'
              )}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {/* Timeline Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold tracking-tight">
                <span className="text-emerald-400 font-sans flex items-center gap-1">
                  <Activity size={10} className="animate-pulse" />
                  {t('آغاز رسمی پروژه امسال: ۸ فروردین ۱۴۰۵', 'Official Launch This Year: Farvardin 8, 1405 (March 28, 2026)')}
                </span>
                <span className="text-gold font-sans font-black">{projectTimePercent}% {t('زمان سپری شده', 'Time Elapsed')}</span>
                <span className="text-cream/50 font-sans">{t('افتتاح رسمی شوروم میلان: ۱۵ اردیبهشت ۱۴۰۶', 'Milan Showroom Grand Opening: Ordibehesht 15, 1406 (May 5, 2027)')}</span>
              </div>
              
              <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${projectTimePercent}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-gold/50 via-gold to-emerald-400"
                />
              </div>
            </div>

            {/* Days Elapsed Cards Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl text-center">
                <span className="text-[9px] font-bold text-cream/30 uppercase tracking-widest block mb-0.5">{t('کل مدت تخمینی', 'TOTAL DURATION')}</span>
                <span className="text-xl font-black font-mono text-cream">{totalProjectDays} {t('روز', 'Days')}</span>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-500/10 p-3 rounded-xl text-center">
                <span className="text-[9px] font-bold text-emerald-400/50 uppercase tracking-widest block mb-0.5">{t('روزهای سپری شده', 'DAYS ELAPSED')}</span>
                <span className="text-xl font-black font-mono text-emerald-400">+{daysSpent} {t('روز', 'Days')}</span>
              </div>
              <div className="bg-gold/5 border border-gold/10 p-3 rounded-xl text-center relative overflow-hidden">
                <span className="text-[9px] font-bold text-gold/50 uppercase tracking-widest block mb-0.5">{t('فرصت باقیمانده', 'DAYS REMAINING')}</span>
                <span className="text-xl font-black font-mono text-gold animate-pulse">{daysRemaining} {t('روز', 'Days')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1.1 AUDIT HEALTH & COMPLIANCE METRICS CARD */}
        <div className="luxury-glass p-6 md:p-8 rounded-[24px] border border-white/5 flex flex-col justify-between relative bg-black/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-cream tracking-wider uppercase">{t('سلامت فرآیند هزینه‌کرد و تطبیق', 'Audit & SLA Compliance')}</h5>
              <p className="text-[9px] text-cream/40 font-mono">SECURE LIVE AUDITING SYSTEM</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] font-sans">
              <span className="text-cream/50">{t('درصد کل انحراف بودجه:', 'Overall Budget Variance:')}</span>
              <span className="text-emerald-400 font-bold font-mono">-1.8% {t('(صرفه‌جویی)', 'Saving')}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-sans">
              <span className="text-cream/50">{t('انطباق کار انجام شده با هزینه:', 'Earned Value / Burn Rate Alignment:')}</span>
              <span className="text-gold font-bold font-mono">1.12 CPI {t('(بسیار مطلوب)', 'Highly Optimal')}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-sans">
              <span className="text-cream/50">{t('سطح ریسک تأمین مالی گمرک:', 'Supply Chain Cash-Flow Risk:')}</span>
              <span className="text-emerald-400 font-bold font-sans">LOW</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <button 
              onClick={triggerDownloadReport}
              disabled={downloading}
              className="w-full py-2 bg-gold text-onyx font-bold text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-white hover:text-onyx transition-all duration-300 active:scale-95 shadow-md shadow-gold/10"
            >
              <Download size={12} className={downloading ? "animate-spin" : ""} />
              {downloading ? t('در حال استخراج اسناد...', 'COMPILED REPORTS...') : t('دریافت گزارش حسابرسی کل', 'Export Master Audit Log')}
            </button>
          </div>
        </div>
      </div>

      {/* 2. SUB-PROJECT BUGET & EXPENSE AUDITING PANEL */}
      <div className="luxury-glass p-6 md:p-8 rounded-[24px] border border-white/5 bg-[#050505]/40 relative">
        {/* Module Header with Project Swapper */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div>
            <h4 className="text-sm font-black text-gold uppercase tracking-[0.2em] font-sans">
              {t('سامانه حسابرسی زیرپروژه‌ها و بودجه فازهای عملیاتی', 'Sub-Project Budget & Actual Cost Audit Board')}
            </h4>
            <p className="text-[10px] text-cream/40 mt-1">
              {t('مدیران عامل و ذینفعان ارشد در جریان جزئیات هزینه‌کرد عینی تکی تایل‌ها و لجستیک قرار می‌گیرند.', 'CEO executive tracking suite to match physical completion progress with real invoices.')}
            </p>
          </div>

          {/* Subproject Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-black/50 p-1 rounded-xl border border-white/5">
            {subProjects.map(sp => (
              <button
                key={sp.id}
                onClick={() => setSelectedSubProjectId(sp.id)}
                className={`px-3 py-1.5 rounded-lg text-[9.5px] font-black transition-all ${
                  selectedSubProjectId === sp.id
                    ? 'bg-gold/15 text-gold border border-gold/30 shadow'
                    : 'text-cream/40 hover:text-cream/70 hover:bg-white/5 border border-transparent'
                }`}
              >
                {t(sp.id === 'milan-sensory' ? 'تجهیز شوروم' : sp.id === 'xr-digital-twin' ? 'پرتال دیجیتال' : 'روابط عمومی', sp.id === 'milan-sensory' ? 'Showroom Fit-out' : sp.id === 'xr-digital-twin' ? 'Digital Portal' : 'PR Campaign')}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Sub-project Financial summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* Main Title Metadata Card */}
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest block">{t('زیر پروژه مورد بررسی/ممیزی', 'AUDITED COMPONENT')}</span>
              <h5 className="text-xs font-black text-cream leading-snug mt-1 font-sans">{t(activeSub.nameFa, activeSub.nameEn)}</h5>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <span className="text-[8px] text-cream/30 uppercase tracking-[0.15em] block">{t('مدیریت اجرایی', 'TASK ASSIGNEE / LEAD')}</span>
              <span className="text-[10px] text-gold font-bold">{t(activeSub.managerFa, activeSub.managerEn)}</span>
            </div>
          </div>

          {/* Progress / Completion matching Burn rate */}
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest">{t('پیشرفت فیزیکی واقعی', 'PHYSICAL COMPLETION')}</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-[8px] font-bold text-emerald-400 rounded-full animate-pulse uppercase">
                {t('فراتر از بازه', 'Ahead of Time')}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono text-emerald-400">{activeSub.physicalProgress}%</span>
              <span className="text-[9px] text-cream/30">{t('انحراف فیزیکی مثبت', '+4% Ahead of plan')}</span>
            </div>
            <div className="mt-4 w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${activeSub.physicalProgress}%` }}
                className="h-full bg-emerald-400 rounded-full"
              />
            </div>
          </div>

          {/* Budget Utilised Meter */}
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest">{t('بودجه کل مصوب', 'APPROVED SUB-BUDGET')}</span>
              <span className="text-[7.5px] text-gold/60 font-mono">EUR €</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black font-mono text-cream">€{activeSub.totalBudget.toLocaleString()}</span>
              <div className="flex items-center justify-between text-[9px] text-cream/40 mt-1">
                <span>{t('هزینه‌کرد واقعی:', 'Actual Invoiced:')}</span>
                <span className="font-mono text-gold font-bold">€{activeSub.actualInvoiced.toLocaleString()} ({budgetUtilizationPercent}%)</span>
              </div>
            </div>
            <div className="mt-4 w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${budgetUtilizationPercent}%` }}
                className="h-full bg-gold rounded-full"
              />
            </div>
          </div>

          {/* Buffer / Unallocated Cushion and quick controller */}
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex flex-col justify-between relative bg-gold/[0.01]">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bold text-cream/30 uppercase tracking-widest">{t('بودجه باقیمانده بدون تخصیص', 'REMAINING COLO-RESERVES')}</span>
              <span className="text-[7.5px] text-emerald-400/80 font-mono">AVAILABLE</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black font-mono text-emerald-400">€{remainingBudget.toLocaleString()}</span>
              <p className="text-[8.5px] text-cream/40 leading-snug mt-1">{t('سپر نوسان ارز و متریال لوکس تایل‌ها', 'Buffer protects against sudden raw material or shipping cost updates.')}</p>
            </div>
            {/* Quick adjust controls for buffering */}
            <div className="mt-3 flex gap-1">
              <button 
                onClick={() => handleAdjustBuffer(10000)}
                className="flex-1 py-1 bg-white/5 hover:bg-gold/15 hover:text-gold text-[7.5px] font-bold uppercase rounded border border-white/10 active:scale-95 transition-all text-cream/70"
              >
                +€10K Buffer
              </button>
              <button 
                onClick={() => handleAdjustBuffer(-10000)}
                className="flex-1 py-1 bg-white/5 hover:bg-rose-500/15 hover:text-rose-400 text-[7.5px] font-bold uppercase rounded border border-white/10 active:scale-95 transition-all text-cream/70"
                disabled={remainingBudget < 10000}
              >
                -€10K Reduce
              </button>
            </div>
          </div>
        </div>

        {/* 🔧 EXECUTIVE CONTROL CONSOLE FOR BUDGET & EXPENSES */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          {/* Form to log new expense */}
          <div className="xl:col-span-2 luxury-glass p-5 rounded-2xl border border-gold/10 bg-[#0c0a05]/20">
            <div className="flex items-center gap-2 mb-3">
              <Plus size={16} className="text-gold" />
              <h5 className="text-[11px] font-black text-gold uppercase tracking-[0.1em] font-sans">
                {t('فرآیند تخصیص بودجه و یا ثبت تراکنش هزینه‌ای جدید', 'Capital Allocation & Cost Logging Control')}
              </h5>
            </div>
            <p className="text-[10px] text-cream/70 mb-4 leading-relaxed font-sans-fa">
              {t(
                'برای ثبت دقیق ردیف هزینه‌ای جدید در زیرپروژه فعلی، اطلاعات بودجه مصوب اولیه و هزینه واقعاً انجام شده را به همراه دسته‌بندی و وضعیت پرداخت وارد نمایید. این کار بلافاصله مقایسه بودجه با هزینه‌کرد واقعی را در نمودارها منعکس می‌سازد.',
                'Specify a new line-item deliverable block. Define the allocated limit & actual spent amount. The system dynamically recalculates sub-project thresholds, cushions, and variance percentages.'
              )}
            </p>

            <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[9px] text-cream/45 font-bold block">{t('عنوان فارسی فرآیند/آیتم', 'Expense Title (Fa)')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('مثال: خرید قطعات نورپردازی تعاملی معلق', 'e.g., Interactive lighting hardware')}
                  value={newTitleFa}
                  onChange={(e) => setNewTitleFa(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/50 font-sans-fa"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-cream/45 font-bold block">{t('عنوان انگلیسی فرآیند/آیتم', 'Expense Title (En)')}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Custom suspension lighting grid"
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-cream placeholder-cream/20 focus:outline-none focus:border-gold/50 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:col-span-2">
                <div className="space-y-1">
                  <label className="text-[9px] text-cream/45 font-bold block">{t('بودجه مصوب اولیه (€)', 'Approved Allocation (€)')}</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g., 25000"
                    value={newAllocated}
                    onChange={(e) => setNewAllocated(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-cream font-mono placeholder-cream/20 focus:outline-none focus:border-gold/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-cream/45 font-bold block">{t('هزینه واقعی انجام شده (€)', 'Actual Spent Cost (€)')}</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g., 21000"
                    value={newSpent}
                    onChange={(e) => setNewSpent(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-cream font-mono placeholder-cream/20 focus:outline-none focus:border-gold/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:col-span-2">
                <div className="space-y-1">
                  <label className="text-[9px] text-cream/45 font-bold block">{t('دسته‌بندی فرآیند', 'Transaction Category')}</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-black/80 border border-white/10 rounded-lg px-3 py-2 text-cream focus:outline-none focus:border-gold/50 font-sans"
                  >
                    <option value="Fit-out">Fit-out (تجهیز)</option>
                    <option value="Sensory">Sensory (حسی محیطی)</option>
                    <option value="Acoustics">Acoustics (صداگذاری)</option>
                    <option value="Interior">Interior (دکوراسیون)</option>
                    <option value="Software">Software (پلتفرم دیجیتال)</option>
                    <option value="Scan">Scan (اسکن تخصصی)</option>
                    <option value="Security">Security (حفاظت و امنیت)</option>
                    <option value="PR">PR / Marketing (ارتباطات)</option>
                    <option value="Logistics">Logistics (ترابری و ترخیص)</option>
                    <option value="Events">Events (رویداد معماری)</option>
                    <option value="Catering">Catering (پذیرایی VIP)</option>
                    <option value="Reserve">Reserve (اندوخته مالی)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-cream/45 font-bold block">{t('وضعیت جریان تسویه', 'Settlement Stream Status')}</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full bg-black/80 border border-white/10 rounded-lg px-3 py-2 text-cream focus:outline-none focus:border-gold/50 font-sans"
                  >
                    <option value="ongoing">{t('جاری / تراکنش باز', 'Ongoing')}</option>
                    <option value="completed">{t('تسویه شده / پرداخت قطعی نهایی', 'Settled (Completed)')}</option>
                    <option value="pending">{t('رزرو معلق در گاوصندوق فاز', 'Pending Reserve')}</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gold hover:bg-white text-onyx font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all duration-300 md:col-span-2 shadow-md shadow-gold/5 cursor-pointer"
                >
                  {t('اضافه کردن آیتم هزینه‌ای جدید به این زیر‌پروژه', 'Append New Expense & Recalculate Discrepancies')}
                </button>
              </div>
            </form>
          </div>

          {/* Update Sub-Project Total Approved Budget Cap Form */}
          <div className="luxury-glass p-5 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-gold" />
                <h5 className="text-[11px] font-black text-gold uppercase tracking-[0.1em] font-sans">
                  {t('اصلاح بودجه کل مصوب این زیرپروژه', 'Sub-Project Budget Modification Form')}
                </h5>
              </div>
              <p className="text-[10px] text-cream/70 mb-4 leading-relaxed font-sans-fa">
                {t(
                  'بودجه مصوب کل زیرپروژه را که توسط هیات مدیره تایید شده است مستقیماً در کادر زیر بازنویسی کنید تا سقف نوسانات گمرکی و ظرفیت مالی باقیمانده بدون تخصیص به صورت خودکار تغییر یابد.',
                  'Alter the overall approved capital block allowed for this specific sub-project track in real-time. Unallocated margin will recalibrate.'
                )}
              </p>

              <form onSubmit={handleUpdateTotalBudget} className="space-y-4 text-xs">
                <div className="space-y-2 font-sans-fa">
                  <label className="text-[9px] text-cream/50 font-bold block">
                    {t('بودجه کل مصوب کنونی زیرپروژه:', 'Current Total Approved Limit:')}{' '}
                    <span className="font-mono text-gold font-bold">€{activeSub.totalBudget.toLocaleString()}</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    placeholder={t('مقدار مصوب جدید به یورو (مثال: ۳۵۰۰۰۰)', 'Approved Cap in EUR (e.g., 350000)')}
                    value={customTotalBudget}
                    onChange={(e) => setCustomTotalBudget(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-cream font-mono placeholder-cream/20 focus:outline-none focus:border-gold/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-white/5 hover:bg-gold hover:text-onyx text-cream font-bold text-[10px] uppercase tracking-widest rounded-lg border border-white/10 transition-all duration-300 shadow cursor-pointer"
                >
                  {t('بروزرسانی بودجه کل مصوب', 'Update Parent Budget Cap')}
                </button>
              </form>

              <div className="mt-5 border-t border-white/5 pt-4">
                <h6 className="text-[9.5px] font-bold text-cream/50 uppercase tracking-wider mb-1 font-sans">
                  {t('💡 راهنمای مدیران (مغایر‌یابی):', '💡 EXECUTIVE TIP FOR AUDITORS')}
                </h6>
                <p className="text-[9px] text-cream/40 leading-relaxed font-sans-fa">
                  {t(
                    'زمانی که هزینه جدیدی ثبت میکنید یا هزینه یک ردیف کار را از طریق جدول ذیل تغییر می‌دهید، «درصد میزان مصرف بودجه» و «بودجه باقیمانده آزاد» در مانیتورینگ بالا به صورت خودکار محاسبه می‌شوند.',
                    'Your input directly shifts absolute spending values. Observe how gauges, variance metrics, and color-coded SLA lights synchronize live.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Line-Item Spreadsheet (The Audit Table) */}
        <div className="mt-8">
          <h5 className="text-[10px] font-black text-gold/70 uppercase tracking-widest mb-4 flex items-center gap-1.5 font-sans">
            <TrendingUp size={11} />
            {t(`ماتریس ریزفاکتورها و جزئیات پرداخت‌های این زیرپروژه (کلیک روی اعداد جهت ویرایش مستقیم)`, `Expense Ledger & Discrepancy Auditing List (Click any amount to edit directly)`)}
          </h5>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/30">
            <table className="w-full text-right ltr:text-left text-xs">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] font-bold text-cream/40 uppercase tracking-wider">
                  <th className="p-3 font-sans pr-5">{t('هدف اصلی تراکنش', 'EXPENSE STATEMENT / TARGET')}</th>
                  <th className="p-3 font-sans text-center">{t('دسته‌بندی', 'CATEGORY')}</th>
                  <th className="p-3 font-sans text-center">{t('کل بودجه مصوب (قابل ویرایش)', 'APPROVED ALLOCATION (EDITABLE)')}</th>
                  <th className="p-3 font-sans text-center">{t('هزینه واقعی سپری شده (قابل ویرایش)', 'ACTUAL SPENT (EDITABLE)')}</th>
                  <th className="p-3 font-sans text-center">{t('وضعیت تسویه', 'SETTLEMENT STATUS')}</th>
                  <th className="p-3 font-sans text-center pl-5">{t('دستور حسابرسی / تایید پرداخت', 'EXECUTIVE AUDIT TRIGGER')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeSub.expenses.map((exp) => {
                  const invoiceValue = exp.allocated - exp.spent;
                  return (
                    <tr key={exp.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-3 pr-5 font-medium max-w-[280px]">
                        <p className="text-cream font-sans-fa leading-relaxed">{t(exp.titleFa, exp.titleEn)}</p>
                        <span className="text-[8.5px] text-cream/30 font-mono block mt-1">{exp.id.toUpperCase()} • {t('تعهد فیزیکی: انجام شده', 'Deliverables: Audited & Confirmed')}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8.5px] font-mono text-cream/60">
                          {exp.category}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono">
                        {editingExpenseId === exp.id ? (
                          <div className="flex items-center gap-1 justify-center">
                            <span className="text-cream/50">€</span>
                            <input
                              type="number"
                              className="w-24 bg-black/80 text-cream font-mono font-bold text-center px-1.5 py-0.5 rounded border border-white/20 text-xs focus:outline-none focus:border-gold"
                              value={editAllocatedAmount}
                              onChange={(e) => setEditAllocatedAmount(e.target.value === '' ? '' : Number(e.target.value))}
                              onBlur={() => handleSaveInlineSpent(exp.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveInlineSpent(exp.id);
                                if (e.key === 'Escape') setEditingExpenseId(null);
                              }}
                              autoFocus
                            />
                          </div>
                        ) : (
                          <span 
                            onClick={() => {
                              setEditingExpenseId(exp.id);
                              setEditSpentAmount(exp.spent);
                              setEditAllocatedAmount(exp.allocated);
                            }}
                            className="cursor-pointer hover:bg-white/5 hover:text-gold px-2 py-1 rounded transition-all font-mono font-bold inline-flex items-center gap-1"
                            title={t('کلیک برای ویرایش مستقیم بودجه اختصاص‌یافته ردیف', 'Click to edit allocated budget inline')}
                          >
                            €{exp.allocated.toLocaleString()}
                            <span className="text-[10px] opacity-20 hover:opacity-100 ml-1">✏️</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center font-mono">
                        {editingExpenseId === exp.id ? (
                          <div className="flex items-center gap-1 justify-center">
                            <span className="text-emerald-400/50">€</span>
                            <input
                              type="number"
                              className="w-24 bg-black/80 text-emerald-400 font-mono font-bold text-center px-1.5 py-0.5 rounded border border-emerald-500/40 text-xs focus:outline-none focus:border-gold"
                              value={editSpentAmount}
                              onChange={(e) => setEditSpentAmount(e.target.value === '' ? '' : Number(e.target.value))}
                              onBlur={() => handleSaveInlineSpent(exp.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveInlineSpent(exp.id);
                                if (e.key === 'Escape') setEditingExpenseId(null);
                              }}
                            />
                          </div>
                        ) : (
                          <span 
                            onClick={() => {
                              setEditingExpenseId(exp.id);
                              setEditSpentAmount(exp.spent);
                              setEditAllocatedAmount(exp.allocated);
                            }}
                            className="cursor-pointer hover:bg-white/5 hover:text-gold px-2 py-1 rounded transition-all font-mono font-bold inline-flex items-center gap-1 text-emerald-400"
                            title={t('کلیک برای ویرایش مستقیم هزینه واقعی ردیف', 'Click to edit spent cost inline')}
                          >
                            €{exp.spent.toLocaleString()}
                            <span className="text-[10px] opacity-20 hover:opacity-100 ml-1">✏️</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {exp.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[8px] font-bold text-emerald-400 uppercase">
                            <CheckCircle2 size={9} />
                            {t('تسویه قطعی', 'settled')}
                          </span>
                        ) : exp.status === 'ongoing' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-[8px] font-bold text-gold uppercase animate-pulse">
                            <Clock size={9} />
                            {t('معلق / جاری', 'pending invoice')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold text-cream/40 uppercase">
                            <Calendar size={9} />
                            {t('رزرو آینده', 'not started')}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center pl-5">
                        {exp.status === 'completed' ? (
                          <span className="text-[9px] text-cream/30 italic font-medium font-sans">
                            {t('مورد تأیید نهایی مدیرعامل', 'Sighted & OK’d by CEO')}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApprovePendingInvoice(exp.id)}
                            className="px-2.5 py-1 bg-gold/10 hover:bg-gold text-gold hover:text-onyx text-[8px] font-bold uppercase rounded border border-gold/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                          >
                            <ArrowUpRight size={10} />
                            {t('آزاد‌سازی تخصیص فاکتور', 'Fast-Track invoice approval')}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Operational War-Room Logs Block */}
        <div className="mt-8 bg-black/60 border border-white/5 p-5 rounded-xl">
          <div className="flex items-center justify-between mb-3 text-[10px] font-bold tracking-widest text-cream/40 uppercase font-mono">
            <span className="flex items-center gap-1.5 text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              {t('لاگ امنیتی حسابرسی خزانه (اتاق جنگ تجاری)', 'AUDIT SECURE REAL-TIME SYSTEM TELEMETRY LOGS')}
            </span>
            <span>{t('سیگنال امن رمزنگاری', 'DIRECT TELEMETRY SYNC • ENCRYPTED')}</span>
          </div>

          <div className="space-y-1.5 max-h-[80px] overflow-y-auto custom-scrollbar font-mono text-[9px] text-cream/60 leading-normal border-t border-white/5 pt-3">
            <AnimatePresence>
              {logs.map((log, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/[0.01] hover:bg-white/[0.02] px-2 py-1 rounded"
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
