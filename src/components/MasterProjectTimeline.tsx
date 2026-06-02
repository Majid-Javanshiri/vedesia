import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Star, MapPin, Flag, Compass, Award, 
  Sparkles, CheckCircle, Clock, Zap, Target, ArrowLeft, ArrowRight
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  dateFa: string;
  dateEn: string;
  titleFa: string;
  titleEn: string;
  phaseId: string;
  phaseFa: string;
  phaseEn: string;
  descFa: string;
  descEn: string;
  type: 'milestone' | 'launch' | 'event' | 'phase_start';
  status: 'completed' | 'current' | 'upcoming';
  icon: any;
}

interface MasterProjectTimelineProps {
  t: (fa: string, en: string) => string;
  lang: string;
}

export const MasterProjectTimeline: React.FC<MasterProjectTimelineProps> = ({ t, lang }) => {
  // Define key events of the VEDESIA master journey
  const events: TimelineEvent[] = [
    {
      id: 'e1',
      dateFa: '۱۴۰۵/۰۱/۰۸',
      dateEn: '2026/03/28',
      titleFa: 'آغاز رسمی: تدوین اسناد استراتژیک پایه',
      titleEn: 'Official Kickoff & Strategic Foundations',
      phaseId: 'p1',
      phaseFa: 'فاز ۱: اسناد و زیرساخت پایه',
      phaseEn: 'Phase 1: Foundations & Core Infrastructure',
      descFa: 'آغاز فرآیند تدوین کتابچه ناهشیار برند، طراحی متدولوژی و تدوین سند استراتژی مادر برند VEDESIA.',
      descEn: 'Commencement of Core Brand Book development, methodology definition, and parent strategy consolidation.',
      type: 'phase_start',
      status: 'completed',
      icon: PlayIcon
    },
    {
      id: 'e2',
      dateFa: '۱۴۰۵/۰۲/۰۱',
      dateEn: '2026/04/20',
      titleFa: 'آغاز توسعه زیرساخت B2B معماران',
      titleEn: 'B2B & Architect Platform Development',
      phaseId: 'p1',
      phaseFa: 'فاز ۱: اسناد و زیرساخت پایه',
      phaseEn: 'Phase 1: Foundations & Core Infrastructure',
      descFa: 'توسعه پلتفرم اختصاصی نمایندگان B2B و شروع ساخت جعبه‌های گران‌قیمت سمپلینگ معماران.',
      descEn: 'Establishing portal features for B2B representatives and beginning physical Architect sampling kits assembly.',
      type: 'event',
      status: 'completed',
      icon: Zap
    },
    {
      id: 'today-marker',
      dateFa: '۱۴۰۵/۰۳/۱۱',
      dateEn: '2026/06/01',
      titleFa: 'نقطه زمانی کنونی (امروز)',
      titleEn: 'Current Boundary (Today Line)',
      phaseId: 'p1',
      phaseFa: 'فاز ۱: اسناد و زیرساخت پایه',
      phaseEn: 'Phase 1: Foundations & Core Infrastructure',
      descFa: 'تکمیل زیرساخت اسناد پایه استراتژیک و شروع عملیات پیاده‌سازی زیرساخت‌های فروش و شتاب‌دهی فیزیکی.',
      descEn: 'Finalization of core strategic documents and launch of physical execution layers for sales enablement.',
      type: 'milestone',
      status: 'current',
      icon: Clock
    },
    {
      id: 'e3',
      dateFa: '۱۴۰۵/۰۵/۱۵',
      dateEn: '2026/08/06',
      titleFa: 'استقرار زیرساخت‌های فروش و شتاب‌دهی',
      titleEn: 'Sales Enablement & Acceleration Engine',
      phaseId: 'p1',
      phaseFa: 'فاز ۱: اسناد و زیرساخت پایه',
      phaseEn: 'Phase 1: Foundations & Core Infrastructure',
      descFa: 'نهایی‌سازی قراردادهای آژانس‌های مارکتینگ بین‌المللی و یکپارچه‌سازی ابزار تفصیلی CRM.',
      descEn: 'Finalization of international marketing agency mandates and robust CRM system configuration.',
      type: 'event',
      status: 'upcoming',
      icon: Target
    },
    {
      id: 'e4',
      dateFa: '۱۴۰۵/۰۹/۰۱',
      dateEn: '2026/11/22',
      titleFa: 'پیش‌نمایش‌های تخصصی نمایندگان',
      titleEn: 'Specialist Previews Launch',
      phaseId: 'p2',
      phaseFa: 'فاز ۲: فعال‌سازی کنترل شده',
      phaseEn: 'Phase 2: Controlled Activation',
      descFa: 'نمایش خصوصی متریال‌های برند برای شبکه نمایندگان ارشد و معماران گزینش شده اروپا.',
      descEn: 'Private viewing sessions for top-tier agents and select European architecture practices.',
      type: 'event',
      status: 'upcoming',
      icon: Award
    },
    {
      id: 'e5',
      dateFa: '۱۴۰۵/۱۰/۱۵',
      dateEn: '2027/01/05',
      titleFa: 'رویداد لوکس فوئوریسالونه میلان',
      titleEn: 'Fuorisalone Milan Exclusive Event',
      phaseId: 'p2',
      phaseFa: 'فاز ۲: فعال‌سازی کنترل شده',
      phaseEn: 'Phase 2: Controlled Activation',
      descFa: 'برگزاری رونمایی کانسپت فیزیکی همزمان با هفته طراحی میلان برای رهبران صنعت مبلمان لوکس دنیا.',
      descEn: 'Exclusive physical concept showcase alignment with Milan Design Week for luxury interior leaders.',
      type: 'event',
      status: 'upcoming',
      icon: Star
    },
    {
      id: 'e6',
      dateFa: '۱۴۰۵/۱۱/۰۱',
      dateEn: '2027/01/20',
      titleFa: 'عملیات لانچ نرم (Soft Launch)',
      titleEn: 'Soft Launch Operations',
      phaseId: 'p2',
      phaseFa: 'فاز ۲: فعال‌سازی کنترل شده',
      phaseEn: 'Phase 2: Controlled Activation',
      descFa: 'انجام اولین تراکنش‌های آزمایشی فیزیکی و کالیبراسیون کامل لجستیک تامین متریال ایتالیا به شهرهای مرجع.',
      descEn: 'Execution of first trial physical contracts and calibration of supply logistics from Italy.',
      type: 'launch',
      status: 'upcoming',
      icon: Compass
    },
    {
      id: 'e7',
      dateFa: '۱۴۰۶/۰۲/۱۵',
      dateEn: '2027/05/05',
      titleFa: 'افتتاحیه بزرگ شوروم مرکزی میلان',
      titleEn: 'Milan Flagship Showroom Grand Opening',
      phaseId: 'p3',
      phaseFa: 'فاز ۳: لانچ سراسری و بازرگانی',
      phaseEn: 'Phase 3: Grand Commercial Launch',
      descFa: 'افتتاح رسمی عمارت فیزیکی VEDESIA مجلل در قلب میلان (VEDESIA House) به همراه اجرای کمپین ۳۶۰ درجه رسانه‌ای.',
      descEn: 'Official opening of the premier VEDESIA flagship mansion in Milan accompanied by a high-impact 360 Campaign.',
      type: 'launch',
      status: 'upcoming',
      icon: Flag
    },
    {
      id: 'e8',
      dateFa: '۱۴۰۶/۰۷/۰۱',
      dateEn: '2027/09/23',
      titleFa: 'یکپارچه‌سازی پلتفرم شتاب‌دهی فروش فاز ۴',
      titleEn: 'Phase 4 Scaling & Loyalty Engines',
      phaseId: 'p4',
      phaseFa: 'فاز ۴: شتاب‌دهی و توسعه پایدار',
      phaseEn: 'Phase 4: Acceleration & Scaling',
      descFa: 'فعالسازی موتورهای وفادارسازی مدرن، لندینگ‌های دیجیتال تعاملی سئو محور و تحلیل هوش تجاری پیشرفته.',
      descEn: 'Full deployment of luxury client loyalty programs, advanced BI pipeline analytics, and worldwide scaling campaign.',
      type: 'milestone',
      status: 'upcoming',
      icon: Sparkles
    }
  ];

  const [activeEventIndex, setActiveEventIndex] = useState<number>(2); // Starts focused on Today (index 2)
  const currentEvent = events[activeEventIndex];

  // Map Phase Info
  const phaseMeta: Record<string, { color: string; bg: string; border: string }> = {
    p1: { color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    p2: { color: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/30' },
    p3: { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    p4: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
  };

  const currentMeta = phaseMeta[currentEvent.phaseId] || { color: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/20' };

  return (
    <div className={`p-5 rounded-2xl bg-[#0d0d0f]/90 border border-white/5 relative overflow-hidden flex flex-col gap-5`}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />
      
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gold/10 border border-gold/20 rounded-xl">
            <Compass className="text-gold" size={18} />
          </div>
          <div>
            <h4 className="text-sm font-black text-cream flex items-center gap-2">
              {t('نمای تعاملی خط زمانی و دستاوردهای کلیدی پروژه', 'Interactive Master Timeline & Key Project Milestones')}
            </h4>
            <p className="text-[9.5px] text-cream/40 uppercase tracking-widest font-mono mt-0.5">
              {t('پایش توالی فازهای ۴ گانه، لانچ‌ها و مایلستون‌های طلایی VEDESIA در اروپا', 'Tracking 4 project phases, premium openings, and Milestones for VEDESIA Europe')}
            </p>
          </div>
        </div>

        {/* Current Date Badge */}
        <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl">
          <Clock size={12} className="text-rose-400 animate-pulse" />
          <span className="text-[10px] font-black text-rose-400 font-sans-fa">
            {t('امروز: ۱۱ خرداد ۱۴۰۵', 'Today: June 1, 2026')}
          </span>
        </div>
      </div>

      {/* Main Track View */}
      <div className="relative pt-6 pb-2 px-1 border-b border-white/5">
        
        {/* Continuous horizontal line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/5 -translate-y-1/2 rounded" />
        
        {/* Animated Progress Accent Line from start up to Today */}
        <div 
          className="absolute top-1/2 h-0.5 bg-gradient-to-l from-gold to-[#f43f5e] -translate-y-1/2 rounded transition-all duration-500"
          style={{ 
            left: lang === 'fa' ? `${100 - (activeEventIndex / (events.length - 1)) * 100}%` : '1rem',
            right: lang === 'fa' ? '1rem' : `${100 - (activeEventIndex / (events.length - 1)) * 100}%`
          }}
        />

        {/* Milestones Nodes Slider Grid */}
        <div className="relative flex justify-between items-center w-full z-10 px-4">
          {events.map((ev, idx) => {
            const isSelected = activeEventIndex === idx;
            const isPastOrToday = idx <= 2; // e1, e2, and today-marker are completed/current
            const EventIcon = ev.icon;

            return (
              <div 
                key={ev.id} 
                className="flex flex-col items-center cursor-pointer group relative"
                onClick={() => setActiveEventIndex(idx)}
              >
                {/* Milestone Node bubble */}
                <motion.div 
                  animate={{ 
                    scale: isSelected ? 1.25 : 1,
                    borderColor: isSelected 
                      ? 'rgba(212, 163, 89, 1)' 
                      : isPastOrToday 
                        ? 'rgba(212, 163, 89, 0.4)' 
                        : 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: isSelected 
                      ? '#161619' 
                      : isPastOrToday 
                        ? 'rgba(212, 163, 89, 0.1)' 
                        : 'rgba(255, 255, 255, 0.02)'
                  }}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all shadow-lg ${
                    isSelected 
                      ? 'shadow-gold/20' 
                      : 'hover:border-gold/50 hover:bg-white/5'
                  }`}
                >
                  <EventIcon 
                    size={14} 
                    className={
                      isSelected 
                        ? 'text-gold' 
                        : isPastOrToday 
                          ? 'text-gold/70' 
                          : 'text-cream/30'
                    } 
                  />
                </motion.div>

                {/* Floating Date above and text below */}
                <div className="absolute top-[-26px] whitespace-nowrap bg-black/40 border border-white/5 px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold text-cream/50">
                  {lang === 'fa' ? ev.dateFa : ev.dateEn}
                </div>

                <div className="absolute top-[44px] text-center w-28 flex flex-col items-center">
                  <span className={`text-[9px] font-black leading-tight tracking-tight break-words px-1 max-w-[100px] transition-colors ${
                    isSelected ? 'text-gold font-extrabold' : 'text-cream/50 group-hover:text-cream/80'
                  }`}>
                    {t(ev.titleFa.split(':')[0], ev.titleEn.split('&')[0])}
                  </span>
                  
                  {ev.id === 'today-marker' && (
                    <span className="mt-1 bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[7px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter shrink-0 animate-pulse">
                      {t('امروز', 'Today')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spotlight Event Detail Panel - Click interaction response */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentEvent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4`}
          >
            {/* Event Summary Left */}
            <div className="flex-grow space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[8.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${currentEvent.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : currentEvent.status === 'current' ? 'bg-rose-500/10 text-rose-400' : 'bg-gold/5 text-gold'}`}>
                  {currentEvent.status === 'completed' ? t('انجام شده', 'Completed') : currentEvent.status === 'current' ? t('نقطه امروزی', 'Present Boundary') : t('برنامه‌ریزی شده', 'In Roadmap Queue')}
                </span>
                
                <span className={`text-[8.5px] font-sans font-black px-2 py-0.5 rounded ${currentMeta.bg} ${currentMeta.color} border ${currentMeta.border}`}>
                  {t(currentEvent.phaseFa, currentEvent.phaseEn)}
                </span>

                <span className="text-[10px] font-mono font-bold text-cream/45 border-l border-white/10 pl-2">
                  {t(currentEvent.dateFa, currentEvent.dateEn)}
                </span>
              </div>

              <h4 className="text-base font-black text-cream tracking-tight italic">
                {t(currentEvent.titleFa, currentEvent.titleEn)}
              </h4>

              <p className="text-xs text-cream/70 leading-relaxed font-sans-fa font-light">
                {t(currentEvent.descFa, currentEvent.descEn)}
              </p>
            </div>

            {/* Strategic Value Card Right */}
            <div className={`md:w-64 p-3.5 rounded-xl border ${currentMeta.border} ${currentMeta.bg} flex flex-col justify-between self-stretch shrink-0`}>
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[8px] font-black uppercase tracking-wider font-mono ${currentMeta.color}`}>
                  {t('ضریب اولویت', 'PRIME SIGNIFICANCE')}
                </span>
                <Target size={14} className={currentMeta.color} />
              </div>
              
              <p className="text-[10.5px] font-black text-cream/90 leading-snug">
                {currentEvent.type === 'launch'
                  ? t('نقطه کلیدی تجاری‌سازی و افتتاح ویترین لوکس برند در بازار بین‌المللی.', 'Strategic breakthrough event for flagship brand visibility and client onboarding.')
                  : currentEvent.type === 'phase_start'
                  ? t('فونداسیون ساختاری سیستم ناهشیار برند و تایید کلیه استانداردهای اصلی پروژه.', 'The ultimate setup for VEDESIA smart organism base architecture & brand foundations.')
                  : t('برنامه عملیاتی لازم جهت هماهنگی لایه‌های میانی پروژه در بخش لجستیک و مارکتینگ.', 'Necessary operational task coordinating marketing engines & partner agency integrations.')
                }
              </p>

              <div className="flex items-center gap-1.5 mt-3 border-t border-white/5 pt-2">
                {currentEvent.status === 'completed' ? (
                  <>
                    <CheckCircle size={10} className="text-emerald-400" />
                    <span className="text-[8.5px] font-bold text-emerald-400 font-sans-fa">{t('مورد تایید و استقرار کامل', 'Approved & Fully Implemented')}</span>
                  </>
                ) : currentEvent.status === 'current' ? (
                  <>
                    <Clock size={10} className="text-rose-400 animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-[8.5px] font-bold text-rose-400 font-sans-fa">{t('تسک های لایه در مرز نهایی خرداد', 'Current June checkpoint border')}</span>
                  </>
                ) : (
                  <>
                    <Clock size={10} className="text-cream/30" />
                    <span className="text-[8.5px] font-medium text-cream/45 font-sans-fa">{t('در انتظار بازرگانی و جریان تسک‌ها', 'Pending schedule kickoff execution')}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Help helper miniature icons to prevent importing missing files
const PlayIcon = (props: any) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    {...props}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);
