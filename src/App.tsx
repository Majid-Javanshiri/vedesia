import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  BarChart3, 
  Layers, 
  Rocket, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Activity,
  Info,
  Menu,
  X,
  Plus,
  Search,
  Link2,
  LayoutGrid,
  ExternalLink,
  ChevronDown,
  LayoutDashboard,
  Target,
  Users,
  Compass,
  Zap,
  ShieldCheck,
  Globe,
  Download,
  AlertTriangle,
  Star,
  Infinity as InfinityIcon,
  Calendar,
  FileText,
  Video,
  Hammer,
  GraduationCap,
  Play,
  Brain,
  Pointer,
  TableProperties
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECT_DATA, STRATEGIC_ASSETS, GLOBAL_DEFICIENCIES } from './constants';
import { Phase, TaskItem, Layer, ProjectNature, LifecycleStage, LIFECYCLE_STAGES, StrategicAsset, Deficiency } from './types';
import { ProjectRoadmap } from './components/ProjectRoadmap';
import { MasterProjectTimeline } from './components/MasterProjectTimeline';
import { CustomerJourneyMap } from './components/CustomerJourneyMap';
import { OrganizationBodyMap } from './components/OrganizationBodyMap';
import CeoPresentationFlow from './components/CeoPresentationFlow';
import ExecutiveFinancePanel from './components/ExecutiveFinancePanel';
import ExecutiveProcurementPanel from './components/ExecutiveProcurementPanel';
import { MasterTaskTable } from './components/MasterTaskTable';

const NATURE_CONFIG: Record<ProjectNature, { labelFa: string, labelEn: string, color: string, icon: any }> = {
  ONE_TIME: { labelFa: 'یک‌باره', labelEn: 'One-Time', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Pointer },
  PERIODIC: { labelFa: 'دوره‌ای', labelEn: 'Periodic', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: Calendar },
  CONTINUOUS: { labelFa: 'مستمر', labelEn: 'Continuous', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30', icon: InfinityIcon },
};

const STATUS_CONFIG: Record<string, { labelFa: string, labelEn: string, color: string, icon: any }> = {
  pending: { labelFa: 'باقیمانده', labelEn: 'Pending', color: 'bg-white/10 text-cream/40 border-white/5', icon: Circle },
  'in-progress': { labelFa: 'در جریان', labelEn: 'In Progress', color: 'bg-gold/20 text-gold border-gold/30', icon: Clock },
  done: { labelFa: 'تکمیل شده (منتظر تایید)', labelEn: 'Completed (Awaiting Approval)', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 },
  approved: { labelFa: 'تکمیل شده (منتظر تایید)', labelEn: 'Completed (Awaiting Approval)', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 },
  completed: { labelFa: 'تکمیل شده (منتظر تایید)', labelEn: 'Completed (Awaiting Approval)', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20', icon: CheckCircle2 },
};

const PRIORITY_CONFIG: Record<string, { labelFa: string, labelEn: string, color: string }> = {
  P0: { labelFa: 'بحرانی (P0)', labelEn: 'Critical (P0)', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
  P1: { labelFa: 'مهم (P1)', labelEn: 'High (P1)', color: 'bg-gold/20 text-gold border-gold/30' },
  P2: { labelFa: 'معمولی (P2)', labelEn: 'Normal (P2)', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  P3: { labelFa: 'پایین (P3)', labelEn: 'Low (P3)', color: 'bg-white/10 text-cream/40 border-white/5' },
};

const STAGE_CONFIG: Record<LifecycleStage, { labelFa: string, labelEn: string, color: string, icon: any }> = {
  STRATEGY: { labelFa: 'سند', labelEn: 'Strategy', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: FileText },
  CONTENT: { labelFa: 'محتوا', labelEn: 'Content', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20', icon: Video },
  INFRASTRUCTURE: { labelFa: 'ساخت', labelEn: 'Infrastructure', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: Hammer },
  TRAINING: { labelFa: 'آموزش', labelEn: 'Training', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: GraduationCap },
  EXECUTION: { labelFa: 'اجرا', labelEn: 'Execution', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20', icon: Play },
  INTELLIGENCE: { labelFa: 'هوشمندی', labelEn: 'Intelligence', color: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20', icon: Brain },
};

const getPriorityConfig = (priority?: string) => (priority && PRIORITY_CONFIG[priority]) || PRIORITY_CONFIG.P2;
const getNatureConfig = (nature?: ProjectNature) => (nature && NATURE_CONFIG[nature]) || NATURE_CONFIG.ONE_TIME;
const getStageConfig = (stage?: LifecycleStage) => (stage && STAGE_CONFIG[stage]) || STAGE_CONFIG.STRATEGY;
const getStatusConfig = (status: string) => STATUS_CONFIG[status] || STATUS_CONFIG.pending;

let ALL_TASKS: TaskItem[] = PROJECT_DATA.flatMap(p => p.layers.flatMap(l => l.tasks));

interface DeficiencyReportProps {
  t: (fa: string, en: string) => string;
  isOpen: boolean;
  onClose: () => void;
  activeLayer?: Layer;
  activePhase?: Phase;
  allTasks: TaskItem[];
}

const DeficiencyReport = ({ t, isOpen, onClose, activeLayer, activePhase, allTasks }: DeficiencyReportProps) => {
  const ALL_TASKS = allTasks;
  const { deficiencies, proposals } = useMemo(() => {
    const list: Deficiency[] = [];
    
    // Define a map of global deficiency IDs to their resolving Task IDs from the project tree
    const deficiencyResolvers: Record<string, string> = {
      'def-concierge': 't37',       // Bespoke VIP Concierge Protocol
      'def-digital-twin': 't40',    // Digital Twin / BIM library
      'def-heritage': 't38',        // Heritage Archives & Authenticity Documentation
      'def-digital-showroom': 't232' // MR/XR Holographic & Interactive Showroom
    };

    // Filter and add global deficiencies if they are NOT resolved yet
    GLOBAL_DEFICIENCIES.forEach(def => {
      const resolverTaskId = deficiencyResolvers[def.id];
      if (resolverTaskId) {
        const resolvingTask = ALL_TASKS.find(t => t.id === resolverTaskId);
        // If the resolving task does not exist or is not completed, the deficiency remains active!
        if (!resolvingTask || resolvingTask.status !== 'completed') {
          list.push(def);
        }
      } else {
        let isResolved = false;
        if (def.id === 'def-green-log') {
          const greenTask = ALL_TASKS.find(t => t.id === 't30');
          if (greenTask && greenTask.status === 'completed') {
            isResolved = true;
          }
        } else if (def.id === 'def-crisis-pr') {
          const prTask = ALL_TASKS.find(t => t.id === 't126');
          if (prTask && prTask.status === 'completed') {
            isResolved = true;
          }
        }
        if (!isResolved) {
          list.push(def);
        }
      }
    });

    const proposedTasks: { id: string; assetId: string; stage: LifecycleStage; title: string; titleEn: string }[] = [];
    
    // Check key strategic documents with correct indices
    const positioning = ALL_TASKS.find(t => t.id === 't7');
    if (positioning && positioning.status !== 'completed') {
      list.push({
        id: 'def-pos',
        title: 'سند پوزیشنینگ جهانی',
        titleEn: 'Global Positioning Document',
        severity: 'HIGH',
        reason: 'این سند شالوده پیام‌رسانی برند است و هنوز نهایی نشده است.',
        reasonEn: 'This document is the foundation of brand messaging and is not yet finalized.'
      });
    }

    const journey = ALL_TASKS.find(t => t.id === 't8');
    if (journey && journey.status !== 'completed') {
      list.push({
        id: 'def-journey',
        title: 'نقشه سفر مشتری',
        titleEn: 'Customer Journey Map',
        severity: 'HIGH',
        reason: 'بدون این نقشه، نقاط تماس مشتری در بازارهای جدید به درستی مدیریت نمی‌شوند.',
        reasonEn: 'Without this map, customer touchpoints in new markets are not correctly managed.'
      });
    }

    // Check for "Dark Threads" (Execution without Strategy) and general stage gaps
    STRATEGIC_ASSETS.forEach(asset => {
      const assetTasks = ALL_TASKS.filter(task => task.assetId === asset.id);
      const stages = assetTasks.map(task => task.lifecycleStage);
      
      const missingStages = LIFECYCLE_STAGES.filter(s => !stages.includes(s));

      if (stages.length > 0 && missingStages.length > 0) {
        // Find stage-specific gap reasons and proposals
        missingStages.forEach(s => {
          if (s === 'STRATEGY' && stages.includes('EXECUTION')) {
            list.push({
              id: `def-strat-${asset.id}`,
              title: `خلاء استراتژیک: ${asset.name}`,
              titleEn: `Strategic Gap: ${asset.nameEn}`,
              severity: 'HIGH',
              reason: 'فعالیت‌های اجرایی این بخش بدون سند بالادستی در حال انجام است.',
              reasonEn: 'Execution activities in this area are proceeding without a high-level strategy document.'
            });
            proposedTasks.push({
              id: `prop-strat-${asset.id}`,
              assetId: asset.id,
              stage: 'STRATEGY',
              title: `تدوین سند استراتژی و Playbook عملیاتی ${asset.name}`,
              titleEn: `Developing ${asset.nameEn} Strategy & Operational Playbook`
            });
          }

          if (s === 'TRAINING' && stages.length > 1) {
             proposedTasks.push({
              id: `prop-train-${asset.id}`,
              assetId: asset.id,
              stage: 'TRAINING',
              title: `کارگاه توانمندسازی و انتقال دانش: ${asset.name}`,
              titleEn: `${asset.nameEn} Knowledge Transfer & Enablement Workshop`
            });
          }

          if (s === 'INTELLIGENCE' && stages.includes('EXECUTION')) {
            proposedTasks.push({
              id: `prop-intel-${asset.id}`,
              assetId: asset.id,
              stage: 'INTELLIGENCE',
              title: `طراحی داشبورد هوشمند و پایش اثربخشی: ${asset.name}`,
              titleEn: `Smart Dashboard Design & ROI Monitoring: ${asset.nameEn}`
            });
          }
          
          if (s === 'CONTENT' && stages.includes('INFRASTRUCTURE')) {
            proposedTasks.push({
              id: `prop-content-${asset.id}`,
              assetId: asset.id,
              stage: 'CONTENT',
              title: `تولید پکیج محتوایی و روایت برند برای: ${asset.name}`,
              titleEn: `Content Package & Brand Storytelling for: ${asset.nameEn}`
            });
          }
        });
      }
    });

    // Asset Gaps
    const totalTasks = ALL_TASKS.length;
    const completedTasks = ALL_TASKS.filter(t => t.status === 'completed').length;
    if (completedTasks / totalTasks < 0.2) {
      list.push({
        id: 'def-velocity',
        title: 'سرعت تکمیل پروژه‌ها',
        titleEn: 'Project Completion Velocity',
        severity: 'MEDIUM',
        reason: 'تعداد تسک‌های تایید شده نسبت به حجم کل پروژه پایین است.',
        reasonEn: 'The number of verified tasks relative to the total project volume is low.'
      });
    }

    return { deficiencies: list, proposals: proposedTasks };
  }, [allTasks]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-onyx/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          dir="rtl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-[#0f0f10] w-full max-w-5xl max-h-[90vh] rounded-[40px] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cream tracking-tight italic">
                    {t('مرکز پایش سلامت و پیشنهادات بهینه‌سازی', 'Health Audit & Optimization Proposals')}
                  </h3>
                  <p className="text-[10px] text-cream/30 uppercase tracking-[0.2em] font-black mt-1">
                    {t('تحلیل ریسک‌های بحرانی و نقشه راه اصلاحی', 'Critical Risk Analysis & Mitigation Roadmap')}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white/5 rounded-full text-cream/40 transition-all font-sans"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {/* Strategic Health & Continuity Panel */}
              <div className="mb-10 p-6 sm:p-8 bg-gold/[0.03] rounded-3xl border border-gold/10 backdrop-blur-3xl relative overflow-hidden group text-right">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="text-gold" size={16} />
                        <span className="text-xs font-black uppercase text-gold tracking-widest">{t('شاخص همگرایی و سلامت استراتژیک', 'Strategic Integrity Index')}</span>
                      </div>
                      <h4 className="text-xl font-bold text-cream mb-2 leading-tight">
                        {t('شاخص پیوستگی عملیاتی و پایداری دارایی‌ها', 'Strategic Continuity & Asset Integrity')}
                      </h4>
                      <p className="text-xs text-cream/50 leading-relaxed font-light">
                        {t(
                          'ارزیابی هوشمند حلقه‌های مفقوده در چرخه حیات دارایی‌های برند. هر دارایی (Asset) برای رسیدن به مرحله نهایی سناریوی میدانی، بایستی تمام زنجیره پیشین شامل استراتژی بالادستی را پر کرده باشد.',
                          'Asset-wide systemic audit of the brand lifecycle. Each strategic asset tracks from strategy and validation up to operational execution stages to ensure there are no blindspots.'
                        )}
                      </p>
                    </div>

                    <div className="shrink-0 font-sans">
                      {(() => {
                        const tasksToAnalyze = activeLayer ? activeLayer.tasks : ALL_TASKS;
                        const totalAssets = new Set(tasksToAnalyze.map(t => t.assetId).filter(Boolean)).size || 1;
                        const completeAssets = Array.from(new Set(tasksToAnalyze.map(t => t.assetId).filter(Boolean))).filter(aid => {
                          const assetTasks = tasksToAnalyze.filter(t => t.assetId === aid);
                          const stages = new Set(assetTasks.map(t => t.lifecycleStage));
                          return stages.has('STRATEGY') && stages.has('CONTENT') && (stages.has('EXECUTION') || stages.has('INFRASTRUCTURE'));
                        }).length;
                        const score = Math.round((completeAssets / totalAssets) * 100) || 0;

                        return (
                          <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 flex items-center gap-4">
                            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                               <svg className="w-full h-full -rotate-90">
                                  <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/5" />
                                  <circle 
                                    cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="3" 
                                    strokeDasharray={138.16}
                                    strokeDashoffset={138.16 * (1 - score / 100)}
                                    className="text-gold transition-all duration-1000 ease-out"
                                  />
                               </svg>
                               <span className="absolute text-xs font-mono font-black text-gold">{score}%</span>
                            </div>
                            <div>
                               <p className="text-[8px] font-black uppercase text-cream/30 tracking-widest mb-0.5">{activePhase ? t(activePhase.name, activePhase.nameEn) : t('شاخص سلامت کل', 'Global Score')}</p>
                               <p className="text-sm font-bold text-cream">{t('پیوستگی عملیاتی', 'Operational Integrity')}</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Asset deficiencies sublist inside the modal */}
                  <div className="mt-6 pt-6 border-t border-white/5">
                     <p className="text-[10px] font-black uppercase text-rose-400/80 tracking-widest mb-3 flex items-center gap-1.5 justify-start">
                       <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                       {t('خطاهای زنجیره ارزش (شکاف‌های به ترتیب فاز)', 'Lifecycle Gaps Detected (Strategy-to-Action Checks)')}
                     </p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                       {(() => {
                          const tasksToAnalyze = activeLayer ? activeLayer.tasks : ALL_TASKS;
                          const assetsInLayer = Array.from(new Set(tasksToAnalyze.map(t => t.assetId).filter(Boolean)));
                          const gapsFound: { assetId: string, missing: LifecycleStage[] }[] = [];

                          assetsInLayer.forEach(assetId => {
                            const assetTasks = ALL_TASKS.filter(t => t.assetId === assetId);
                            const currentStages = assetTasks.map(t => t.lifecycleStage || 'STRATEGY');
                            const maxStageIdx = Math.max(...currentStages.map(s => LIFECYCLE_STAGES.indexOf(s)));
                            
                            const missing = LIFECYCLE_STAGES.slice(0, maxStageIdx).filter(s => !currentStages.includes(s));

                            if (missing.length > 0) {
                              gapsFound.push({ assetId: assetId as string, missing });
                            }
                          });

                          if (gapsFound.length === 0) {
                            return (
                              <div className="col-span-full py-4 text-center text-emerald-400 font-bold text-[10px] bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                                {t('✓ تمام دارایی‌ها دارای پیوستگی کامل هستند (هیچ نقصی پیدا نشد)', '✓ Operational pipeline is perfectly unified. All assets maintain seamless sequential continuity.')}
                              </div>
                            );
                          }

                          return gapsFound.map((gap, idx) => (
                            <div key={idx} className="p-3 bg-black/40 rounded-2xl border border-rose-500/10 flex flex-col justify-between">
                               <div className="flex items-center justify-between mb-2">
                                  <span className="text-[9px] font-bold text-cream/70 truncate max-w-[150px]">{gap.assetId.replace('_', ' ')}</span>
                                  <span className="text-[8px] font-mono font-bold text-rose-400/50">#{idx + 1}</span>
                               </div>
                               <div className="flex flex-wrap gap-1">
                                  {gap.missing.map(m => (
                                    <div key={m} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[8px] text-cream/40">
                                       <span className="font-bold">{t(getStageConfig(m).labelFa, getStageConfig(m).labelEn)}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                          ));
                       })()}
                     </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Column 1: Deficiencies */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                    <AlertTriangle className="text-rose-500" size={16} />
                    <h4 className="text-sm font-black uppercase text-rose-500 tracking-widest">{t('نواقص شناسایی شده', 'Identified Deficiencies')}</h4>
                  </div>
                  {deficiencies.length > 0 ? (
                    deficiencies.map((def, idx) => (
                      <motion.div
                        key={def.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`p-6 rounded-3xl border transition-all hover:bg-white/[0.02] ${
                          def.severity === 'HIGH' ? 'bg-rose-500/5 border-rose-500/10' : 'bg-orange-500/5 border-orange-500/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-cream text-lg">
                            {t(def.title, def.titleEn)}
                          </h4>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                            def.severity === 'HIGH' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                          }`}>
                            {t(def.severity === 'HIGH' ? 'بحرانی' : 'متوسط', def.severity)}
                          </span>
                        </div>
                        <p className="text-sm text-cream/50 leading-relaxed italic">
                          {t(def.reason, def.reasonEn)}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="py-10 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-4 font-sans">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="text-lg font-bold text-cream mb-1">{t('وضعیت پروژه سبز است', 'All systems clear')}</h4>
                    </div>
                  )}
                </div>

                {/* Column 2: Proposals */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                    <Plus className="text-gold" size={16} />
                    <h4 className="text-sm font-black uppercase text-gold tracking-widest">{t('زیرپروژه‌های پیشنهادی (اصلاحی)', 'Proposed Mitigation Tasks')}</h4>
                  </div>
                  {proposals.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-[10px] text-cream/30 italic leading-relaxed mb-4">
                        {t('این موارد برای پر کردن شکاف‌های موجود در "نخ تسبیح" استراتژیک پیشنهاد می‌شوند:', 'These tasks are proposed to bridge the gaps in the strategic "Thorough Thread":')}
                      </p>
                      {proposals.map((prop, idx) => (
                        <motion.div
                          key={prop.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-4 rounded-2xl bg-gold/5 border border-gold/10 flex items-start gap-3 group hover:border-gold/30 transition-all text-right"
                        >
                          <div className={`p-2 rounded-lg shrink-0 ${getStageConfig(prop.stage).color}`}>
                            {React.createElement(getStageConfig(prop.stage).icon, { size: 14 })}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-cream group-hover:text-gold transition-colors">{t(prop.title, prop.titleEn)}</h5>
                            <div className="flex items-center gap-2 mt-1.5 font-mono justify-end">
                              <span className="text-[7px] text-gold/40 border border-gold/10 px-1 rounded bg-gold/5 uppercase">{prop.assetId}</span>
                              <span className="text-[7px] text-cream/20 uppercase tracking-widest">{prop.stage}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center opacity-30 italic text-sm">
                      {t('پیشنهاد جدیدی موجود نیست.', 'No new proposals available.')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const GapAnalysis = ({ t, allTasks }: { t: (fa: string, en: string) => string; allTasks: TaskItem[] }) => {
  const ALL_TASKS = allTasks;
  const gaps = useMemo(() => {
    const list: { id: string; type: 'CRITICAL' | 'WARNING'; message: string; messageEn: string; assetId?: string }[] = [];
    
    STRATEGIC_ASSETS.forEach(asset => {
      const assetTasks = ALL_TASKS.filter(task => task.assetId === asset.id);
      const stages = assetTasks.map(task => task.lifecycleStage);
      
      const hasStrategy = stages.includes('STRATEGY');
      const hasInfrastructure = stages.includes('INFRASTRUCTURE');
      const hasExecution = stages.includes('EXECUTION');
      
      if (assetTasks.length > 0) {
         if (!hasStrategy) {
          list.push({
            id: `gap-strat-${asset.id}`,
            type: 'CRITICAL',
            message: `دارایی "${asset.name}" فاقد سند استراتژی است.`,
            messageEn: `Asset "${asset.nameEn}" lacks a Strategy document.`,
            assetId: asset.id
          });
        }
        if (hasExecution && !hasInfrastructure) {
          list.push({
            id: `gap-infra-${asset.id}`,
            type: 'WARNING',
            message: `دارایی "${asset.name}" در حال اجراست اما زیرساخت فنی آن مستند نشده است.`,
            messageEn: `Asset "${asset.nameEn}" is in execution but lacks documented infrastructure.`,
            assetId: asset.id
          });
        }
      }
    });

    // Check for global gaps
    const totalCompleted = ALL_TASKS.filter(t => t.status === 'approved').length;
    if (totalCompleted < 5) {
       list.push({
         id: 'global-trust',
         type: 'WARNING',
         message: 'تعداد اسناد تایید شده برای ایجاد "اعتبار برند" در این مرحله کافی نیست.',
         messageEn: 'Insufficient verified documents to establish "Brand Credibility" at this stage.'
       });
    }

    return list;
  }, [allTasks]);

  if (gaps.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-orange-500" size={24} />
        <h3 className="text-xl font-bold text-cream tracking-tight font-serif italic">{t('تحلیل نواقص و ریسک‌ها', 'Gap & Risk Analysis')}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gaps.map(gap => (
          <div key={gap.id} className={`p-5 rounded-2xl border flex items-start gap-4 transition-all hover:scale-[1.01] ${
            gap.type === 'CRITICAL' ? 'bg-rose-500/5 border-rose-500/20' : 'bg-orange-500/5 border-orange-500/20'
          }`}>
             <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${gap.type === 'CRITICAL' ? 'bg-rose-500 animate-pulse' : 'bg-orange-500'}`} />
             <div className="flex-1">
               <p className="text-sm font-medium text-cream leading-relaxed">{t(gap.message, gap.messageEn)}</p>
               {gap.assetId && (
                 <span className="text-[9px] font-black uppercase text-gold/40 tracking-widest mt-2 block">{gap.assetId}</span>
               )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StrategicOverview = ({ onAssetClick, t, allTasks }: { onAssetClick: (asset: StrategicAsset) => void, t: (fa: string, en: string) => string; allTasks: TaskItem[] }) => {
  const ALL_TASKS = allTasks;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {STRATEGIC_ASSETS.map((asset) => {
        const tasksWithAsset = ALL_TASKS.filter(t => t.assetId === asset.id);
        const taskStages = tasksWithAsset.map(t => t.lifecycleStage);
        
        const hasStrategy = taskStages.includes('STRATEGY');
        const hasInfrastructure = taskStages.includes('INFRASTRUCTURE');
        const hasExecution = taskStages.includes('EXECUTION');
        const hasIntelligence = taskStages.includes('INTELLIGENCE');

        const completedCount = tasksWithAsset.filter(t => t.status === 'approved' || t.status === 'done').length;
        const totalCount = tasksWithAsset.length;
        const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        const isWeak = totalCount > 0 && (!hasStrategy || !hasInfrastructure);

        return (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => onAssetClick(asset)}
            className={`cursor-pointer group relative overflow-hidden rounded-2xl border bg-white/[0.03] p-6 shadow-sm transition-all hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-black/20 ${
              asset.id === 'BRAND_IDENTITY' ? 'border-gold/50 bg-gold/5 shadow-[0_0_30px_rgba(197,160,89,0.1)]' : isWeak ? 'border-orange-500/30' : 'border-white/10'
            }`}
          >
            {asset.id === 'BRAND_IDENTITY' && (
              <div className="absolute top-0 left-0 p-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gold text-onyx rounded-full text-[8px] font-black uppercase tracking-wider shadow-lg shadow-gold/20">
                  <Star size={10} fill="currentColor" />
                  {t('بنیادی', 'Foundational')}
                </div>
              </div>
            )}
            {isWeak && asset.id !== 'BRAND_IDENTITY' && (
              <div className="absolute top-0 right-0 p-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/20 text-rose-400 rounded-full text-[8px] font-black uppercase tracking-wider animate-pulse border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                  <AlertTriangle size={10} />
                  {t('استراتژی ناقص', 'Gapped Strategy')}
                </div>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/5 group-hover:bg-gold/10 transition-colors border border-white/10">
                <Link2 className="text-white/20 group-hover:text-gold" size={20} />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-gold/30 uppercase tracking-widest">{asset.id}</span>
                <h3 className="font-bold text-cream group-hover:text-gold transition-colors">{t(asset.name, asset.nameEn)}</h3>
              </div>
            </div>

            <p className="text-xs text-cream/40 mb-6 line-clamp-2 h-8 leading-relaxed text-right group-hover:text-cream/60 transition-colors">
              {t(asset.description, asset.descriptionEn)}
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-medium text-cream/30 uppercase tracking-tighter">Chain progress</span>
                <span className="text-sm font-bold text-gold">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className={`h-full rounded-full ${isWeak ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-gold shadow-[0_0_8px_rgba(197,160,89,0.5)]'}`}
                />
              </div>

              <div className="flex gap-1.5 justify-end pt-2">
                <div className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 min-w-[32px] ${hasStrategy ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/5 text-white/10'}`} title="سند استراتژی">
                  <FileText size={12} />
                  <span className="text-[6px] font-black uppercase opacity-60">STR</span>
                </div>
                <div className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 min-w-[32px] ${hasInfrastructure ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/5 text-white/10'}`} title="زیرساخت">
                  <Hammer size={12} />
                  <span className="text-[6px] font-black uppercase opacity-60">INF</span>
                </div>
                <div className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 min-w-[32px] ${hasExecution ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/5 text-white/10'}`} title="اجرا">
                  <Play size={12} />
                  <span className="text-[6px] font-black uppercase opacity-60">EXE</span>
                </div>
                <div className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 min-w-[32px] ${hasIntelligence ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/5 text-white/10'}`} title="هوشمندی">
                  <Brain size={12} />
                  <span className="text-[6px] font-black uppercase opacity-60">INT</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const generateSubActivitiesForTask = (parent: TaskItem): TaskItem[] => {
  const baseTitle = parent.title;
  const baseTitleEn = parent.titleEn || parent.title;
  const parentId = parent.id;
  const assignee = parent.assignee || 'Strategic Team';
  const dueDate = parent.dueDate || '1405/03/30';
  const priority = parent.priority || 'P2';

  const stages: { stage: LifecycleStage; suffix: string; faPrefix: string; enPrefix: string }[] = [
    {
      stage: 'STRATEGY',
      suffix: 's1',
      faPrefix: 'تدوین استراتژی، بازنگری مبانی و سند الزامات',
      enPrefix: 'Formulating strategy, baseline reviews & requirements of'
    },
    {
      stage: 'CONTENT',
      suffix: 'c1',
      faPrefix: 'طراحی سناریو، خلق هویت کلامی و بصری و تولید محتوای تفصیلی',
      enPrefix: 'Scenario drafting, copywriting & detailed content creation for'
    },
    {
      stage: 'INFRASTRUCTURE',
      suffix: 'i1',
      faPrefix: 'توسعه پلتفرم‌ها، ابزارهای ساختاریافته و زیرساخت فنی',
      enPrefix: 'Developing platforms, structured toolkits & infrastructure of'
    },
    {
      stage: 'TRAINING',
      suffix: 't1',
      faPrefix: 'برگزاری کارگاه تخصصی، انتقال دانش و هم‌سوسازی ذینفعان جهت',
      enPrefix: 'Masterclass running, knowledge transfer & alignment loops for'
    },
    {
      stage: 'EXECUTION',
      suffix: 'e1',
      faPrefix: 'لانچ عملیاتی، پیاده‌سازی گام‌به‌گام و جریان کاربست',
      enPrefix: 'Operational launch, phased testing & full workflow execution of'
    },
    {
      stage: 'INTELLIGENCE',
      suffix: 'y1',
      faPrefix: 'سنجش شاخص‌ها (KPIs)، نظارت مستمر و بهینه‌سازی مداوم',
      enPrefix: 'Performance tracking (KPIs), feedback iteration & optimization of'
    }
  ];

  return stages.map(item => ({
    id: `${parentId}-${item.suffix}`,
    level: 4,
    title: `${item.faPrefix} «${baseTitle}»`,
    titleEn: `${item.enPrefix} "${baseTitleEn}"`,
    status: 'pending',
    lifecycleStage: item.stage,
    priority: priority,
    assignee: assignee,
    dueDate: dueDate,
    durationDays: 10,
    dependencies: []
  }));
};

const ensureAllTasksHaveSubTasks = (phases: Phase[]): Phase[] => {
  return phases.map(phase => ({
    ...phase,
    layers: phase.layers.map(layer => ({
      ...layer,
      tasks: layer.tasks.map(task => {
        if (!task.tasks || task.tasks.length === 0) {
          return {
            ...task,
            tasks: generateSubActivitiesForTask(task)
          };
        }
        return task;
      })
    }))
  }));
};

export default function App() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const activeStage: LifecycleStage = "STRATEGY";

  const [projectData, setProjectData] = useState<Phase[]>(() => {
    const saved = localStorage.getItem('VEDESIA_PROJECT_DATA');
    let data: Phase[] = PROJECT_DATA;
    if (saved) {
      try {
        data = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved project data', e);
      }
    }
    return ensureAllTasksHaveSubTasks(data);
  });

  const handleUpdateTask = (updatedTask: TaskItem) => {
    setProjectData(prevPhases => {
      const nextPhases = prevPhases.map(phase => ({
        ...phase,
        layers: phase.layers.map(layer => ({
          ...layer,
          tasks: layer.tasks.map(task => {
            if (task.id === updatedTask.id) {
              return { ...task, ...updatedTask };
            }
            if (task.tasks && task.tasks.some(st => st.id === updatedTask.id)) {
              return {
                ...task,
                tasks: task.tasks.map(st => st.id === updatedTask.id ? { ...st, ...updatedTask } : st)
              };
            }
            return task;
          })
        }))
      }));
      localStorage.setItem('VEDESIA_PROJECT_DATA', JSON.stringify(nextPhases));
      return nextPhases;
    });
  };

  useEffect(() => {
    ALL_TASKS = projectData.flatMap(p => p.layers.flatMap(l => l.tasks));
  }, [projectData]);

  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(projectData[0].layers[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isWBSOpen, setIsWBSOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isExecutiveViewOpen, setIsExecutiveViewOpen] = useState(false);
  const [executiveSubView, setExecutiveSubView] = useState<'FLOW' | 'FINANCE' | 'PROCUREMENT' | 'DASHBOARD'>('FLOW');
  const [isDeficiencyReportOpen, setIsDeficiencyReportOpen] = useState(false);
  const [isJourneyMapOpen, setIsJourneyMapOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'PHASES' | 'STRATEGY' | 'BODY_ORGANIZATION' | 'ALL_TASKS_TABLE'>('PHASES');
  const [selectedAsset, setSelectedAsset] = useState<StrategicAsset | null>(null);
  const [taskActiveStage, setTaskActiveStage] = useState<LifecycleStage>('STRATEGY');
  const [stageTabMode, setStageTabMode] = useState<'BY_STAGE' | 'ALL_STAGES'>('BY_STAGE');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const t = (fa: string, en: string) => (lang === 'fa' ? fa : en);
  const dir = lang === 'fa' ? 'rtl' : 'ltr';

  const activePhase = projectData[activePhaseIndex];

  const tasksRef = useRef<HTMLDivElement>(null);

  const handlePhaseChange = (index: number) => {
    setActivePhaseIndex(index);
    setActiveLayerId(projectData[index].layers[0].id);
    
    // Smooth scroll directly to the workbench content so the user is instantly focused on the active phase data
    setTimeout(() => {
      if (tasksRef.current) {
        const headerOffset = 150;
        const elementPosition = tasksRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const activeLayer = useMemo(() => {
    return activePhase.layers.find(l => l.id === activeLayerId) || activePhase.layers[0];
  }, [activePhase, activeLayerId]);

  const handleLayerChange = (id: string) => {
    setActiveLayerId(id);
    setSearchQuery('');
    if (tasksRef.current) {
      const headerOffset = 150;
      const elementPosition = tasksRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const allProjects = useMemo(() => {
    return projectData.flatMap(phase => 
      phase.layers.flatMap(layer => 
        layer.tasks.map(task => ({
          ...task,
          phaseName: phase.name,
          phaseNameEn: phase.nameEn,
          layerName: layer.name,
          layerNameEn: layer.nameEn,
          phaseId: phase.id
        }))
      )
    );
  }, [projectData]);

  const handleExport = () => {
    // Flatten all data for export
    const exportRows = [];
    exportRows.push(['Phase', 'Layer', 'Task ID', 'Title', 'Status']);

    projectData.forEach(phase => {
      phase.layers.forEach(layer => {
        layer.tasks.forEach(task => {
          exportRows.push([
            `"${t(phase.name, phase.nameEn).replace(/"/g, '""')}"`,
            `"${t(layer.name, layer.nameEn).replace(/"/g, '""')}"`,
            `"${task.id}"`,
            `"${t(task.title, task.titleEn || task.title).replace(/"/g, '""')}"`,
            `"${task.status}"`
          ]);
        });
      });
    });

    const csvContent = "\uFEFF" + exportRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `VEDESIA_Strategy_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = useMemo(() => {
    const total = allProjects.length;
    const completed = allProjects.filter(t => t.status === 'completed' || t.status === 'approved').length;
    const inProgress = allProjects.filter(t => t.status === 'in-progress').length;
    
    return {
      percent: Math.round((completed / total) * 100) || 0,
      completed,
      total,
      inProgress
    };
  }, [allProjects]);

  const filteredTasks = useMemo(() => {
    let tasks = activeLayer.tasks;
    if (searchQuery) {
      tasks = tasks.filter(task => 
        t(task.title, task.titleEn || task.title).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return tasks;
  }, [activeLayer, searchQuery, lang]);

  // Luxury Icons for Phases
  const phaseIcons = [<Compass />, <Target />, <Rocket />, <TrendingUp />, <Zap />, <Globe />];

  return (
    <div className="h-screen bg-onyx text-cream/90 font-sans flex overflow-hidden relative" dir={dir}>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[100] bg-onyx flex items-center justify-center overflow-hidden"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-[1px] bg-gold/30 mb-8" />
                <h1 className="text-4xl md:text-6xl font-black tracking-[0.4em] text-gold uppercase mb-4 pl-[0.4em]">
                  VEDESIA
                </h1>
                <div dir="ltr" className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.6em] text-gold/40 uppercase">
                  <span>Strategic</span>
                  <div className="w-1 h-1 rounded-full bg-gold/20" />
                  <span>Roadmap</span>
                </div>
                <div className="w-16 h-[1px] bg-gold/30 mt-8" />
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  dir="ltr"
                  className="mt-12 text-[7px] md:text-[8px] tracking-[0.5em] text-gold/25 uppercase font-medium border-t border-gold/10 pt-4"
                >
                  Marketing Directorate
                </motion.div>
              </motion.div>
              
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] -z-10"
              />
            </div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-[1px] bg-gold/20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 right-0 z-[70] lg:relative lg:flex transition-all duration-500 ease-in-out flex-col bg-onyx border-l border-white/10 h-full max-h-screen
          ${isMobileMenuOpen ? 'translate-x-0 w-80 shadow-[0_0_50px_rgba(0,0,0,0.8)]' : 'translate-x-full lg:translate-x-0'} 
          ${isSidebarOpen ? 'lg:w-80' : 'lg:w-20'}
        `}
      >
        <div className="p-4 md:p-8 flex items-center justify-between border-b border-white/5 shrink-0">
          {(isSidebarOpen || isMobileMenuOpen) && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <h1 className="text-xl md:text-2xl font-bold text-gold tracking-widest uppercase font-serif">VEDESIA</h1>
              <p className="text-[10px] text-gold/50 font-medium tracking-[0.3em] uppercase mt-0.5 md:mt-1">Global Marketing Hub</p>
            </motion.div>
          )}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex p-2 hover:bg-white/5 rounded-full text-gold/70 transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 md:p-3 bg-white/5 rounded-xl border border-white/10 text-gold"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 md:py-8 px-4 space-y-2 md:space-y-6 custom-scrollbar min-h-0">
          <div className="space-y-2">
            <p className="text-[10px] text-gold/40 font-bold uppercase tracking-widest px-4 mb-2">
              {t('نمای کلی', 'Views')}
            </p>
            <button
              onClick={() => setViewMode('PHASES')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all relative group ${
                viewMode === 'PHASES' 
                ? 'bg-white/10 text-gold shadow-lg shadow-black/20' 
                : 'text-cream/40 hover:text-cream/70 hover:bg-white/5'
              }`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                viewMode === 'PHASES' ? 'bg-gold text-onyx' : 'bg-white/5'
              }`}>
                <LayoutGrid size={20} />
              </div>
              {(isSidebarOpen || isMobileMenuOpen) && (
                <div className="flex-1 text-right group-ltr:text-left">
                  <p className="font-bold text-sm tracking-tight font-sans">
                    {t('نقشه راه فازی', 'Phased Roadmap')}
                  </p>
                </div>
              )}
            </button>
            <button
              onClick={() => setViewMode('STRATEGY')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all relative group ${
                viewMode === 'STRATEGY' 
                ? 'bg-white/10 text-gold shadow-lg shadow-black/20' 
                : 'text-cream/40 hover:text-cream/70 hover:bg-white/5'
              }`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                viewMode === 'STRATEGY' ? 'bg-gold text-onyx' : 'bg-white/5'
              }`}>
                <Compass size={20} />
              </div>
              {(isSidebarOpen || isMobileMenuOpen) && (
                <div className="flex-1 text-right group-ltr:text-left">
                  <p className="font-bold text-sm tracking-tight font-sans">
                    {t('رشته‌های استراتژیک', 'Strategic Threads')}
                  </p>
                </div>
              )}
            </button>
            <button
              onClick={() => setViewMode('BODY_ORGANIZATION')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all relative group ${
                viewMode === 'BODY_ORGANIZATION' 
                ? 'bg-white/10 text-gold shadow-lg shadow-black/20' 
                : 'text-cream/40 hover:text-cream/70 hover:bg-white/5'
              }`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                viewMode === 'BODY_ORGANIZATION' ? 'bg-gold text-onyx' : 'bg-white/5'
              }`}>
                <Activity size={20} />
              </div>
              {(isSidebarOpen || isMobileMenuOpen) && (
                <div className="flex-1 text-right group-ltr:text-left">
                  <p className="font-bold text-sm tracking-tight font-sans">
                    {t('سازمان به مثابه بدن', 'Smart Organism Map')}
                  </p>
                </div>
              )}
            </button>
            <button
              onClick={() => setViewMode('ALL_TASKS_TABLE')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all relative group ${
                viewMode === 'ALL_TASKS_TABLE' 
                ? 'bg-white/10 text-gold shadow-lg shadow-black/20' 
                : 'text-cream/40 hover:text-cream/70 hover:bg-white/5'
              }`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                viewMode === 'ALL_TASKS_TABLE' ? 'bg-gold text-onyx' : 'bg-white/5'
              }`}>
                <TableProperties size={20} />
              </div>
              {(isSidebarOpen || isMobileMenuOpen) && (
                <div className="flex-1 text-right group-ltr:text-left">
                  <p className="font-bold text-sm tracking-tight font-sans">
                    {t('میزکار جامع فعالیت‌ها', 'Master Task Workbench')}
                  </p>
                </div>
              )}
            </button>
          </div>

          <div className="h-[1px] bg-white/5 mx-2" />

          <div className="space-y-2">
            <p className="text-[10px] text-gold/40 font-bold uppercase tracking-widest px-4 mb-2">
              {viewMode === 'PHASES' ? t('فازهای اجرایی', 'Execution Phases') : t('انتخاب فاز', 'Select Phase')}
            </p>
            {projectData.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => {
                  handlePhaseChange(index);
                  if (viewMode !== 'PHASES') setViewMode('PHASES');
                  if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all relative group ${
                  activePhaseIndex === index && viewMode === 'PHASES'
                  ? 'bg-white/5 text-gold' 
                  : 'text-cream/40 hover:text-cream/70 hover:bg-white/2'
                }`}
              >
              <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                activePhaseIndex === index ? 'bg-gold text-onyx' : 'bg-white/5 text-cream/30'
              }`}>
                {React.cloneElement(phaseIcons[index] as React.ReactElement, { size: 20 })}
              </div>
              
              {(isSidebarOpen || isMobileMenuOpen) && (
                  <div className="flex-1 overflow-hidden transition-all text-right group-ltr:text-left">
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-50 mb-0.5 font-sans">
                      {t(`Phase 0${index + 1}`, `Phase 0${index + 1}`)}
                    </p>
                    <p className="font-bold text-xs line-clamp-1 tracking-tight font-sans">
                      {t(phase.name.split(':')[1] || phase.name, phase.nameEn.split(':')[1] || phase.nameEn)}
                    </p>
                    <span className="text-[8px] font-medium text-gold/60 block mt-0.5">
                      {phase.layers.flatMap(l => l.tasks).reduce((sum, t) => sum + (t.tasks ? t.tasks.length : 0), 0)} {t('فعالیت', 'Activities')}
                    </span>
                  </div>
              )}

              {activePhaseIndex === index && (isSidebarOpen || isMobileMenuOpen) && (
                <motion.div layoutId="phase-indicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold rounded-r-full" />
              )}
            </button>
          ))}
          </div>
        </nav>

        <div className="p-4 md:p-6 border-t border-white/5 shrink-0 hidden sm:block">
          {(isSidebarOpen || isMobileMenuOpen) && (
            <div className="luxury-glass rounded-2xl p-4 md:p-5 border border-gold/20 relative overflow-hidden">
               <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest mb-3">
                 {t('پیشرفت کلی', 'Overall Progress')}
               </p>
               <div className="flex items-end justify-between mb-2">
                 <span className="text-3xl font-bold text-gold">{stats.percent}%</span>
                 <span className="text-[10px] text-cream/40">{stats.completed} / {stats.total}</span>
               </div>
               <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${stats.percent}%` }}
                   className="h-full gold-gradient shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                 />
               </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#121212] flex flex-col relative">
        {/* Animated Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
        
        <header className="bg-onyx/80 backdrop-blur-xl sticky top-0 z-40 border-b border-white/5 px-4 md:px-10 py-2 md:py-3">
           {/* Phase Jump Toolbar */}
           {viewMode === 'PHASES' && (
             <div className="max-w-7xl mx-auto mb-3 hidden lg:flex items-center gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/5">
                {projectData.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => handlePhaseChange(idx)}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-[9.5px] font-black uppercase tracking-widest transition-all ${
                      activePhaseIndex === idx 
                      ? 'bg-gold text-onyx shadow-xl shadow-gold/10' 
                      : 'text-cream/30 hover:bg-white/5 hover:text-cream/60'
                    }`}
                  >
                    {t(p.name?.split(':')[0] || `Phase ${idx+1}`, p.nameEn?.split(':')[0] || `Phase ${idx+1}`)}
                  </button>
                ))}
             </div>
           )}

           <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 md:gap-6">
              <div className="flex items-center justify-between w-full lg:w-auto">
                <div className="flex-1">
                  <div className="flex items-center gap-2 md:gap-4 mb-1">
                    <div className="flex items-center gap-2 text-[8px] md:text-[9.5px] font-bold text-gold/50 uppercase tracking-[0.2em]">
                      {viewMode === 'PHASES' ? (
                        <>
                          <span className="hidden sm:inline">{t('پروژه مارکتینگ', 'Strategic Marketing')}</span>
                          <ChevronRight size={10} className={`${lang === 'fa' ? 'rotate-180' : ''} hidden sm:inline`} />
                          <span className="text-gold font-bold tracking-[0.1em]">{activePhase.nameEn}</span>
                        </>
                      ) : viewMode === 'STRATEGY' ? (
                        <>
                          <span className="hidden sm:inline">{t('جریان همگرا', 'Convergent Flow')}</span>
                          <ChevronRight size={10} className={`${lang === 'fa' ? 'rotate-180' : ''} hidden sm:inline`} />
                          <span className="text-gold font-bold tracking-[0.1em]">STRATEGY LEVERAGE</span>
                        </>
                      ) : (
                        <>
                          <span className="hidden sm:inline">{t('پیکره زنده هوشمند', 'Anatomical Model')}</span>
                          <ChevronRight size={10} className={`${lang === 'fa' ? 'rotate-180' : ''} hidden sm:inline`} />
                          <span className="text-gold font-bold tracking-[0.1em]">ORGANIZATION BODY</span>
                        </>
                      )}
                    </div>
                    <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
                    <div className="flex items-center gap-2">
                      <div className="italy-accent">
                        <span />
                        <span />
                        <span />
                      </div>
                      <span className="text-[8px] md:text-[9px] font-bold text-cream/40 uppercase tracking-widest font-sans">Milano Heritage</span>
                    </div>
                  </div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-cream tracking-tight font-serif min-h-[28px] flex items-center">
                    {viewMode === 'PHASES' 
                      ? t(activePhase.name, activePhase.nameEn)
                      : viewMode === 'STRATEGY'
                        ? t('نخ تسبیح استراتژیک VEDESIA', 'Strategic Asset Explorer')
                        : t('پیکره هوشمند سازمان (بدن)', 'Smart Organism Map')
                    }
                  </h2>
                </div>
                
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 sm:p-2.5 bg-white/5 rounded-xl border border-white/10 text-gold"
                >
                  <Menu size={20} />
                </button>
              </div>

              <div className="flex flex-col items-stretch lg:items-end gap-2.5 w-full lg:w-auto">
                {/* Upper row: Search, Language, Export */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-start lg:justify-end w-full">
                  {/* Language Toggle */}
                  <div className="flex bg-white/5 p-1 rounded-full border border-white/10 shrink-0">
                    <button 
                      onClick={() => setLang('fa')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'fa' ? 'bg-gold text-onyx shadow-lg shadow-gold/20' : 'text-cream/40 hover:text-cream/70'}`}
                    >
                      FA
                    </button>
                    <button 
                      onClick={() => setLang('en')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-gold text-onyx shadow-lg shadow-gold/20' : 'text-cream/40 hover:text-cream/70'}`}
                    >
                      EN
                    </button>
                  </div>

                  {/* Search bar */}
                  <div className="relative group flex-1 sm:flex-none">
                    <Search size={13} className={`absolute ${lang === 'fa' ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-cream/30 group-focus-within:text-gold transition-colors`} />
                    <input 
                      type="text" 
                      placeholder={t('جستجو در استراتژی...', 'Search strategy...')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`bg-white/5 border border-white/10 rounded-full py-1 ${lang === 'fa' ? 'pr-8.5 pl-3.5' : 'pl-8.5 pr-3.5'} text-[11.5px] text-cream placeholder:text-cream/20 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all w-full sm:w-40 md:w-48`}
                    />
                  </div>

                  {/* Export */}
                  <button 
                    onClick={handleExport}
                    className="flex items-center justify-center gap-1 bg-white/5 border border-white/10 text-cream/50 px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider hover:text-gold hover:border-gold/30 transition-all duration-300"
                  >
                    <Download size={11} />
                    <span>{t('خروجی', 'Export')}</span>
                  </button>
                </div>

                {/* Lower row: Steering Panels & Dashboards */}
                <div className="flex flex-wrap items-center gap-1.5 justify-start lg:justify-end w-full">
                  {/* Smart Journey Map */}
                  <button 
                    onClick={() => setIsJourneyMapOpen(true)}
                    className="flex items-center justify-center gap-1 bg-gold/15 text-gold border border-gold/40 px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider hover:bg-gold hover:text-onyx transition-all duration-300 shadow-md shadow-gold/5 shrink-0"
                  >
                    <Compass size={11} className="animate-pulse" />
                    <span>{t('سفر هوشمند مشتری', 'Smart Journey Map')}</span>
                  </button>

                  {/* Executive View */}
                  <button 
                    onClick={() => setIsExecutiveViewOpen(true)}
                    className="flex items-center justify-center gap-1 gold-gradient text-onyx px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all duration-300 shrink-0"
                  >
                    <TrendingUp size={11} />
                    <span>{t('نمای مدیران', 'Executive View')}</span>
                  </button>

                  {/* Strategic Roadmap */}
                  <button 
                    onClick={() => setIsRoadmapOpen(true)}
                    className="flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-cream/80 border border-white/10 px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider transition-all duration-300 shrink-0"
                  >
                    <Compass size={11} />
                    <span>{t('نقشه راه کلان پروژه', 'Strategic Project Roadmap')}</span>
                  </button>

                  {/* WBS */}
                  <button 
                    onClick={() => setIsWBSOpen(true)}
                    className="flex items-center justify-center gap-1 bg-white/5 border border-gold/30 text-gold px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider hover:bg-gold hover:text-onyx transition-all duration-300 shrink-0"
                  >
                    <BarChart3 size={11} />
                    <span>{t('ساختار', 'WBS')}</span>
                  </button>

                  {/* Gaps List / Deficiency Report */}
                  <button 
                    onClick={() => setIsDeficiencyReportOpen(true)}
                    className="flex items-center justify-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider hover:bg-rose-500/25 transition-all duration-300 shrink-0"
                  >
                    <AlertTriangle size={11} />
                    <span>{t('لیست نواقص', 'Gaps List')}</span>
                  </button>
                </div>
              </div>
           </div>
        </header>

        <div className="flex-1 p-4 md:p-10 pb-20 md:pb-32 max-w-7xl mx-auto w-full">
          {viewMode === 'STRATEGY' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 -mt-2">
              <GapAnalysis t={t} allTasks={allProjects} />
              <StrategicOverview onAssetClick={(asset) => setSelectedAsset(asset)} t={t} allTasks={allProjects} />
            </div>
          ) : viewMode === 'BODY_ORGANIZATION' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 -mt-2">
              <OrganizationBodyMap t={t} lang={lang} allTasks={allProjects} />
            </div>
          ) : viewMode === 'ALL_TASKS_TABLE' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <MasterTaskTable 
                lang={lang} 
                t={t} 
                tasks={allProjects} 
                onUpdateTask={handleUpdateTask}
                onNavigateToTask={(taskId, phaseIdx, layerId) => {
                  setActivePhaseIndex(phaseIdx);
                  setActiveLayerId(layerId);
                  setViewMode('PHASES');
                  setTimeout(() => {
                    setExpandedTaskId(taskId);
                    const el = document.getElementById(taskId);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 300);
                }}
              />
            </div>
          ) : (
            <>
              {/* Quick Stats (Refactored to 5 distinct columns to separate executing and remaining tasks, and clarifying manager review status) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <StatCard 
              label={t("کل زیرپروژه‌ها", "Total Sub-projects")}
              value={allProjects.length} 
              icon={<Layers size={21} className="text-gold" />} 
              sub={t("مجموع کل زیرپروژه‌ها در تمامی فازها", "All sub-projects across project lifecycle")}
              lang={lang}
            />
            <StatCard 
              label={t("کل فعالیت‌های تفصیلی", "Total Activities")}
              value={allProjects.reduce((sum, p) => sum + (p.tasks ? p.tasks.length : 0), 0)} 
              icon={<Activity size={21} className="text-fuchsia-400" />} 
              sub={t("فعالیت‌های مپ شده در چرخه حیات ۶ مرحله‌ای", "All level-4 tasks mapped across 6 stages")}
              lang={lang}
            />
            <StatCard 
              label={t("تکمیل شده (منتظر تایید)", "Completed (Awaiting Sign-off)")}
              value={allProjects.filter(t => t.status === 'completed' || t.status === 'approved').length} 
              icon={<CheckCircle2 size={21} className="text-emerald-500" />} 
              sub={t("آماده برای بررسی و تایید نهایی مدیریت", "Successfully finalized and ready for CEO review")}
              lang={lang}
            />
            <StatCard 
              label={t("زیرپروژه‌های در حال اجرا", "In Progress Sub-projects")}
              value={allProjects.filter(t => t.status === 'in-progress').length} 
              icon={<Play size={18} className="text-amber-500" />} 
              sub={t("موارد فعال در دست توسعه و استقرار زنده", "Active operations currently in run cycle")}
              lang={lang}
            />
            <StatCard 
              label={t("باقی‌مانده / در صف اقدام", "Backlog / Scheduled")}
              value={allProjects.filter(t => t.status !== 'completed' && t.status !== 'approved' && t.status !== 'in-progress').length} 
              icon={<Calendar size={21} className="text-cream/40" />} 
              sub={t("موارد در نوبت شروع فازهای آینده", "Scheduled items for upcoming phases")}
              lang={lang}
            />
          </div>

          {/* Master Project Strategic Timeline & Key Events */}
          <div className="mb-12 animate-in fade-in duration-500 delay-100">
            <MasterProjectTimeline t={t} lang={lang} />
          </div>

          <div className="grid grid-cols-12 gap-6" ref={tasksRef}>

            {/* Visual KPI-Driven Horizontal Layers Selection Hub (Spans full 12 columns, ensuring all 4 layers are visible together without vertical clipping or scroll risk) */}
            <div className="col-span-12 space-y-4 mb-2 animate-in fade-in duration-500">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs md:text-sm font-bold text-gold uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {t('لایه‌های مدیریت استراتژیک فاز فعال', 'Strategic Layers for the Active Phase')}
                </h3>
                <span className="text-[9px] md:text-[10px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-full text-cream/40 font-mono">
                  {activePhase.layers.length} {t('لایه فعال', 'Layers Active')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activePhase.layers.map((layer) => {
                  const layerCompleted = layer.tasks.filter(t => t.status === 'completed' || t.status === 'approved').length;
                  const layerTotal = layer.tasks.length;
                  const layerPercent = Math.round((layerCompleted / layerTotal) * 100) || 0;

                  return (
                    <button
                      key={layer.id}
                      onClick={() => handleLayerChange(layer.id)}
                      className={`w-full p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden text-right group-ltr:text-left ${
                        activeLayerId === layer.id 
                        ? 'border-gold bg-gradient-to-br from-gold/15 to-gold/[0.02] shadow-xl shadow-gold/5' 
                        : 'border-white/5 bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* Decorative Background Mesh for active layer */}
                      {activeLayerId === layer.id && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-gold/[0.05] to-transparent pointer-events-none" />
                      )}

                      <div className="relative z-10 flex flex-col h-full justify-between gap-3 w-full">
                        <div className="flex items-center justify-between gap-2">
                          {/* 1. Layer Identifier Badge */}
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shrink-0 select-none transition-all ${
                            activeLayerId === layer.id 
                              ? 'bg-gold text-onyx shadow-md shadow-gold/10' 
                              : 'bg-white/5 text-cream/40 border border-white/5'
                          }`}>
                            {layer.id.split('-').pop()?.toUpperCase() || 'L1'}
                          </span>

                          {/* Progress Percentage */}
                          <div className="flex items-center gap-1">
                            <span className={`text-xs font-mono font-bold ${activeLayerId === layer.id ? 'text-gold' : 'text-cream/50'}`}>
                              {layerPercent}%
                            </span>
                          </div>
                        </div>
                        
                        {/* 2. Text Details */}
                        <div className="min-w-0">
                          <h4 className={`text-xs md:text-sm font-black transition-colors leading-snug truncate ${
                            activeLayerId === layer.id ? 'text-gold' : 'text-cream/80 group-hover:text-cream'
                          }`}>
                            {t(layer.name, layer.nameEn)}
                          </h4>
                          <div className="flex items-center gap-2 mt-1.5 text-[9px] text-cream/40 font-semibold font-sans">
                            <span>{layer.tasks.length} {t('زیرپروژه', 'Projects')}</span>
                            <span className="text-white/10">•</span>
                            <span className="text-gold/50 font-bold">
                              {layer.tasks.reduce((sum, t) => sum + (t.tasks ? t.tasks.length : 0), 0)} {t('فعالیت', 'Tasks')}
                            </span>
                          </div>
                        </div>

                        {/* Progress slider bar */}
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${layerPercent}%` }}
                            className={`h-full rounded-full ${activeLayerId === layer.id ? 'bg-gold shadow-[0_0_8px_rgba(197,160,89,0.5)]' : 'bg-gold/30'}`}
                          />
                        </div>

                        {/* Active Bottom Bar Indicator */}
                        {activeLayerId === layer.id && (
                          <motion.div 
                            layoutId="layer-active-stripe" 
                            className="absolute bottom-0 right-0 left-0 h-0.5 bg-gold" 
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tasks View - Spans FULL 12 COLUMNS for desktop giving gorgeous space for the task lists andexpanded stage roadmaps! */}
            <div className="col-span-12">
              <div className="luxury-glass rounded-[24px] md:rounded-[32px] border border-white/5 overflow-hidden min-h-[400px] md:min-h-[600px] flex flex-col shadow-2xl shadow-black/40">
                <div className="p-6 md:p-10 border-b border-white/5 flex flex-col gap-8 bg-white/[0.02]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-cream mb-1 md:mb-2">
                        {t(activeLayer.name, activeLayer.nameEn)}
                      </h3>
                      <p className="text-[10px] md:text-xs text-gold/50 font-medium tracking-wide italic">
                        {t(activeLayer.description || '', activeLayer.descriptionEn || 'Detailed list of action items')}
                      </p>
                    </div>
                    <div className="flex sm:flex-row items-center gap-4 sm:gap-6 border-t border-white/5 sm:border-0 pt-4 sm:pt-0">
                      <div className="text-right group-ltr:text-left leading-none">
                        <span className="text-[8px] md:text-[10px] font-bold text-gold uppercase tracking-widest leading-none block mb-1">
                          {t('کل زیرپروژه‌ها', 'Total Sub-projects')}
                        </span>
                        <p className="text-lg md:text-xl font-bold text-cream/40 leading-none">{activeLayer.tasks.length}</p>
                      </div>
                      <div className="text-right group-ltr:text-left leading-none border-r border-white/10 pr-4 sm:pr-6">
                        <span className="text-[8px] md:text-[10px] font-bold text-gold uppercase tracking-widest leading-none block mb-1">
                          {t('فعالیت‌های تفصیلی', 'Detailed Activities')}
                        </span>
                        <p className="text-lg md:text-xl font-bold text-fuchsia-400 group-hover:text-fuchsia-300 leading-none">
                          {activeLayer.tasks.reduce((sum, t) => sum + (t.tasks ? t.tasks.length : 0), 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar">
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {filteredTasks.length > 0 ? (
                        filteredTasks.map((task, idx) => (
                          <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            onClick={() => {
                              if (expandedTaskId === task.id) {
                                setExpandedTaskId(null);
                              } else {
                                setExpandedTaskId(task.id);
                                setTaskActiveStage('STRATEGY');
                              }
                            }}
                            className={`group flex flex-col p-4 md:p-5 rounded-2xl border border-transparent transition-all duration-300 ${task.description || task.assetId ? 'cursor-pointer hover:border-gold/20 hover:bg-white/[0.03]' : ''} ${expandedTaskId === task.id ? 'bg-white/[0.05] border-gold/30' : 'bg-white/[0.01] border-white/5'}`}
                          >
                            <div className="flex items-center gap-5">
                              <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all shrink-0 relative ${
                                getStatusConfig(task.status).color
                              }`}>
                                {React.createElement(getStatusConfig(task.status).icon, { size: 18 })}
                                <div className="absolute -top-3 -right-3 bg-onyx/80 border border-gold/20 px-1.5 py-0.5 rounded text-[8px] font-mono text-gold/60">
                                  {task.id}
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {task.nature && (
                                    <div className={`flex items-center gap-1.5 text-[8px] font-black px-2 py-0.5 rounded border ${getNatureConfig(task.nature).color} opacity-40`}>
                                      {React.createElement(getNatureConfig(task.nature).icon, { size: 10 })}
                                      <span>{t(getNatureConfig(task.nature).labelFa, getNatureConfig(task.nature).labelEn)}</span>
                                    </div>
                                  )}
                                  {task.lifecycleStage && (
                                    <div className={`flex items-center gap-1.5 text-[8px] font-black px-2 py-0.5 rounded border border-gold/20 bg-gold/5 text-gold/60`}>
                                      {React.createElement(getStageConfig(task.lifecycleStage).icon, { size: 10 })}
                                      <span>{t(getStageConfig(task.lifecycleStage).labelFa, getStageConfig(task.lifecycleStage).labelEn)}</span>
                                    </div>
                                  )}
                                  {task.priority && (
                                    <div className={`flex items-center gap-1.5 text-[8px] font-black px-2 py-0.5 rounded border ${getPriorityConfig(task.priority).color}`}>
                                      <Zap size={10} />
                                      <span>{t(getPriorityConfig(task.priority).labelFa, getPriorityConfig(task.priority).labelEn)}</span>
                                    </div>
                                  )}
                                  {task.isMilestone && (
                                    <div className="flex items-center gap-1.5 text-[8px] font-black px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400">
                                      <Target size={10} />
                                      <span>{t('مایلستون', 'Milestone')}</span>
                                    </div>
                                  )}
                                  {task.assignee && (
                                    <div className="flex items-center gap-1.5 text-[8px] font-black px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/40">
                                      <Users size={10} />
                                      <span>{task.assignee}</span>
                                    </div>
                                  )}
                                  {task.dueDate && (
                                    <div className="flex items-center gap-1.5 text-[8px] font-black px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/40">
                                      <Calendar size={10} />
                                      <span>{task.dueDate}</span>
                                    </div>
                                  )}
                                </div>
                                <h5 className="font-medium text-cream/90 text-sm md:text-md group-hover:text-gold transition-colors leading-snug">
                                  {t(task.title, task.titleEn || task.title)}
                                </h5>
                              </div>

                              <div className="flex items-center gap-3">
                                 <span className={`text-[8px] md:text-[9px] font-bold tracking-[0.1em] px-2 md:px-3 py-1 rounded-full uppercase border ${
                                   getStatusConfig(task.status).color
                                 }`}>
                                   {t(getStatusConfig(task.status).labelFa, getStatusConfig(task.status).labelEn)}
                                 </span>
                                 {(task.description || task.assetId) && (
                                   <motion.div
                                     animate={{ rotate: expandedTaskId === task.id ? 180 : 0 }}
                                     className="text-gold/40"
                                   >
                                     <ChevronDown size={14} />
                                   </motion.div>
                                 )}
                              </div>
                            </div>
                            
                            <AnimatePresence>
                              {expandedTaskId === task.id && (task.description || task.descriptionEn || task.assetId) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 md:pr-15 space-y-6">
                                    {/* Task Metadata & Dependencies */}
                                    {(task.dependencies?.length || task.durationDays) && (
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {task.dependencies && task.dependencies.length > 0 && (
                                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <h6 className="text-[10px] font-black text-cream/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                                              <Link2 size={12} className="text-gold" />
                                              {t('وابستگی‌ها (پیش‌نیاز)', 'Dependencies')}
                                            </h6>
                                            <div className="flex flex-wrap gap-2">
                                              {task.dependencies.map(depId => {
                                                const depTask = ALL_TASKS.find(at => at.id === depId);
                                                return (
                                                  <div key={depId} className="px-2 py-1 bg-white/5 rounded-lg border border-white/5 text-[9px] text-cream/60 font-mono flex items-center gap-1.5">
                                                    <span className="text-gold font-bold">{depId}</span>
                                                    {depTask && <span className="opacity-40 truncate max-w-[100px]">{t(depTask.title, depTask.titleEn)}</span>}
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        )}
                                        {task.durationDays && (
                                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <h6 className="text-[10px] font-black text-cream/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                                              <TrendingUp size={12} className="text-gold" />
                                              {t('زمان‌بندی تقویمی', 'Project Scheduling')}
                                            </h6>
                                            <p className="text-xs text-cream/80 font-medium">
                                              {t(`مدت زمان تخمینی: ${task.durationDays} روز کاری`, `Estimated duration: ${task.durationDays} business days`)}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Strategic Thread Visualization */}
                                    {task.assetId && (
                                      <div className="p-6 bg-gold/5 rounded-[32px] border border-gold/10">
                                        <div className="flex items-center justify-between mb-4">
                                          <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                                              <InfinityIcon size={14} className="text-gold" />
                                            </div>
                                            <div>
                                              <h6 className="text-[10px] font-black text-gold uppercase tracking-wider">{t('نخ تسبیح استراتژیک', 'Strategic Thread')}</h6>
                                              <p className="text-[9px] text-cream/40">{t('پیوستگی استراتژیک این دارایی در پورتفولیو', 'Strategic continuity for this asset in portfolio')}</p>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                          {LIFECYCLE_STAGES.map((s) => {
                                            const threadTask = ALL_TASKS.find(at => at.assetId === task.assetId && (at.lifecycleStage || 'STRATEGY') === s);
                                            const isCurrent = task.lifecycleStage === s;
                                            
                                            return (
                                              <div 
                                                key={s} 
                                                className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${
                                                  isCurrent ? 'bg-gold/20 border-gold/40 shadow-[0_4px_20px_rgba(197,160,89,0.1)]' : threadTask ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5 opacity-20'
                                                }`}
                                              >
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${getStageConfig(s).color}`}>
                                                  {React.createElement(getStageConfig(s).icon, { size: 12 })}
                                                </div>
                                                <div className="text-center">
                                                  <span className="text-[8px] font-bold text-cream/70 block leading-tight">{t(getStageConfig(s).labelFa, getStageConfig(s).labelEn)}</span>
                                                  {threadTask && (
                                                    <div className="flex flex-col items-center mt-1">
                                                      <div className="flex items-center justify-center gap-1">
                                                         <div className={`w-1 h-1 rounded-full ${threadTask.status === 'approved' ? 'bg-emerald-500' : threadTask.status === 'done' ? 'bg-sky-500' : threadTask.status === 'in-progress' ? 'bg-gold' : 'bg-white/20'}`} />
                                                         <span className="text-[6px] font-black uppercase text-cream/30">{t(threadTask.status === 'approved' ? 'تایید' : threadTask.status === 'done' ? 'انجام' : 'جریان', threadTask.status === 'approved' ? 'OK' : threadTask.status === 'done' ? 'DONE' : 'RUN')}</span>
                                                      </div>
                                                      <span className="text-[7px] font-mono text-gold/40 border border-gold/10 px-1 rounded mt-0.5 bg-gold/5">{threadTask.id}</span>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>

                                        {/* Continuity Logic Alert */}
                                        {(() => {
                                          const currentIdx = LIFECYCLE_STAGES.indexOf(task.lifecycleStage || 'STRATEGY');
                                          const missingStages = LIFECYCLE_STAGES.slice(0, currentIdx).filter(s => {
                                            return !ALL_TASKS.some(at => at.assetId === task.assetId && at.lifecycleStage === s);
                                          });

                                          if (missingStages.length > 0) {
                                            return (
                                              <div className="mt-4 p-3 bg-rose-500/5 rounded-xl border border-rose-500/20 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                                                  <AlertTriangle size={14} className="text-rose-400" />
                                                </div>
                                                <div>
                                                  <p className="text-[9px] text-rose-400 font-black uppercase tracking-tighter mb-0.5">{t('هشدار گسستگی استراتژیک', 'Strategic Gap Alert')}</p>
                                                  <p className="text-[8px] text-rose-400/60 leading-tight">
                                                    {t('این فعالیت در حال اجراست اما اسناد مراحل قبلی فاقد رکورد هستند:', 'This activity is active but preceding stages lack records:')}
                                                    <span className="font-bold"> {missingStages.map(s => t(getStageConfig(s).labelFa, getStageConfig(s).labelEn)).join(', ')}</span>
                                                  </p>
                                                </div>
                                              </div>
                                            );
                                          }
                                          return null;
                                        })()}
                                      </div>
                                    )}

                                    {/* Local Stage Navigator for Task */}
                                    <div className="p-6 bg-gold/5 rounded-[32px] border border-gold/10 mt-2">
                                       <div className="flex items-center justify-between mb-6">
                                          <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-gold/20 flex items-center justify-center">
                                              <InfinityIcon size={20} className="text-gold" />
                                            </div>
                                            <div>
                                              <h6 className="text-xs font-black text-gold uppercase tracking-widest">{t('چرخه حیات کامل زیرپروژه / فعالیت‌ها', 'Sub-Project Lifecycle & Sub-Activities')}</h6>
                                              <p className="text-[10px] text-cream/40">{t('مشاهده فعالیت‌ها بر اساس مراحل ۶گانه', 'View activities across the 6-stage cycle')}</p>
                                            </div>
                                          </div>
                                       </div>

                                       {stageTabMode === 'BY_STAGE' ? (
                                         <>
                                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                                          {LIFECYCLE_STAGES.map((s) => {
                                             const isActive = taskActiveStage === s;
                                             const subTasksCount = (task.tasks || []).filter(st => st.lifecycleStage === s).length;
                                             
                                             return (
                                               <button 
                                                 key={s} 
                                                 onClick={(e) => {
                                                   e.stopPropagation();
                                                   setTaskActiveStage(s);
                                                 }}
                                                 className={`flex flex-col items-center gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                                                   isActive 
                                                     ? 'bg-gold/20 border-gold/50 shadow-xl shadow-gold/10 scale-105' 
                                                     : 'bg-white/5 border-white/5 hover:bg-white/10'
                                                 }`}
                                               >
                                                 <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                                                   isActive ? 'bg-gold text-onyx' : 'bg-white/10 text-cream/30'
                                                 }`}>
                                                   {React.createElement(getStageConfig(s).icon, { size: 16 })}
                                                 </div>
                                                 <div className="text-center">
                                                   <span className={`text-[9px] font-black uppercase block tracking-tight ${isActive ? 'text-gold' : 'text-cream/50'}`}>
                                                     {t(getStageConfig(s).labelFa, getStageConfig(s).labelEn)}
                                                   </span>
                                                   <span className={`text-[7px] font-mono mt-0.5 block ${isActive ? 'text-gold/60' : 'text-cream/20'}`}>
                                                     {subTasksCount} {t('فعالیت', 'Tasks')}
                                                   </span>
                                                 </div>
                                               </button>
                                             );
                                          })}
                                       </div>

                                       {/* Sub-tasks for selected stage */}
                                       <div className="space-y-3 min-h-[100px] bg-black/20 p-4 rounded-2xl border border-white/5">
                                          {(task.tasks || []).filter(st => st.lifecycleStage === taskActiveStage).length > 0 ? (
                                            (task.tasks || []).filter(st => st.lifecycleStage === taskActiveStage).map((st) => (
                                              <motion.div 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={st.id} 
                                                className="flex items-center gap-4 p-3 bg-white/[0.03] rounded-xl border border-white/5 group/st"
                                              >
                                                 <button 
                                                   onClick={(e) => {
                                                     e.stopPropagation();
                                                     const nextStatus = st.status === 'completed' ? 'pending' : 'completed';
                                                     const updatedTask = {
                                                       ...task,
                                                       tasks: (task.tasks || []).map(x => x.id === st.id ? { ...x, status: nextStatus } : x)
                                                     };
                                                     handleUpdateTask(updatedTask);
                                                   }}
                                                   className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                                     st.status === 'completed' ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/5' : 'border-white/10 text-cream/20 bg-transparent'
                                                   }`}
                                                 >
                                                   {st.status === 'completed' ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                                                 </button>
                                                <p className="text-xs font-medium text-cream/70 group-hover/st:text-cream transition-colors">{t(st.title, st.titleEn || '')}</p>
                                                <div className="mr-auto">
                                                   <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded ${
                                                     st.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-cream/30'
                                                   }`}>
                                                     {t(st.status === 'completed' ? 'انجام شده' : 'در انتظار', st.status === 'completed' ? 'Done' : 'Pending')}
                                                   </span>
                                                </div>
                                              </motion.div>
                                            ))
                                          ) : (
                                            <div className="h-full flex flex-col items-center justify-center py-6 text-center opacity-30">
                                              <p className="text-[10px] font-bold uppercase tracking-widest">{t('بدون ریزفعالیت', 'No Sub-activities')}</p>
                                              <p className="text-[8px] mt-1 italic">{t(`هنوز فعالیتی در مرحله ${t(getStageConfig(taskActiveStage).labelFa, getStageConfig(taskActiveStage).labelEn)} تعریف نشده است.`, `No actions defined for ${getStageConfig(taskActiveStage).labelEn} yet.`)}</p>
                                            </div>
                                          )}
                                       </div>
                                          </>
                                        ) : (
                                          <div className="space-y-4">
                                            {LIFECYCLE_STAGES.map((stage) => {
                                              const stList = (task.tasks || []).filter(st => st.lifecycleStage === stage);
                                              if (stList.length === 0) return null;
                                              return (
                                                <div key={stage} className="space-y-2">
                                                  <div className="flex items-center gap-2 px-1 text-gold/80">
                                                    {React.createElement(getStageConfig(stage).icon, { size: 12 })}
                                                    <span className="text-[10px] font-bold tracking-tight">{t(getStageConfig(stage).labelFa, getStageConfig(stage).labelEn)}</span>
                                                  </div>
                                                  <div className="space-y-2 pb-2">
                                                    {stList.map((st) => (
                                                      <div key={st.id} className="flex items-center gap-4 p-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-xl border border-white/5 transition-all">
                                                        <button 
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            const nextStatus = st.status === 'completed' ? 'pending' : 'completed';
                                                            const updatedTask = {
                                                              ...task,
                                                              tasks: (task.tasks || []).map(x => x.id === st.id ? { ...x, status: nextStatus } : x)
                                                            };
                                                            handleUpdateTask(updatedTask);
                                                          }}
                                                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                                            st.status === 'completed' ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/5' : 'border-white/10 text-cream/20 bg-transparent'
                                                          }`}
                                                        >
                                                          {st.status === 'completed' ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                                                        </button>
                                                        <div className="flex-grow">
                                                          <p className={`text-xs font-semibold ${st.status === 'completed' ? 'text-cream/40 line-through' : 'text-cream/90'}`}>{t(st.title, st.titleEn || '')}</p>
                                                          <div className="flex gap-2 mt-1">
                                                            <span className="font-mono text-[8px] text-fuchsia-400">{st.id}</span>
                                                            {st.assignee && <span className="text-[8px] text-cream/30">{st.assignee}</span>}
                                                            {st.dueDate && <span className="font-mono text-[8px] text-cream/35">{st.dueDate}</span>}
                                                          </div>
                                                        </div>
                                                        <div className="mr-auto ltr:mr-0 ltr:ml-auto">
                                                           <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded ${
                                                             st.status === 'completed' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-cream/40 border border-white/5'
                                                           }`}>
                                                             {t(st.status === 'completed' ? 'انجام شده' : 'در انتظار', st.status === 'completed' ? 'Done' : 'Pending')}
                                                           </span>
                                                        </div>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        )}
                                    </div>

                                    {task.description && (
                                       <div className="text-xs text-cream/50 leading-relaxed font-sans border-t border-white/5 pt-6 pb-2 italic">
                                         {t(task.description || '', task.descriptionEn || '')}
                                       </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="py-24 flex flex-col items-center justify-center text-center animate-in fade-in duration-500"
                        >
                           <div className={`w-20 h-20 rounded-3xl border border-white/5 flex items-center justify-center text-gold/20 mb-6 bg-white/[0.02]`}>
                             {React.createElement(getStageConfig(activeStage).icon, { size: 40 })}
                           </div>
                           <h4 className="text-lg font-bold text-cream/40 mb-2">{t('بدون فعالیت در این مرحله', 'No tasks in this stage')}</h4>
                           <p className="text-xs text-cream/20 italic max-w-xs">{t(`در مرحله ${t(getStageConfig(activeStage).labelFa, getStageConfig(activeStage).labelEn)} هنوز فعالیتی برای این لایه تعریف نشده است.`, `No tasks have been defined for ${getStageConfig(activeStage).labelEn} stage in this layer yet.`)}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                   <button className="w-full py-5 border border-dashed border-gold/20 rounded-2xl flex items-center justify-center gap-3 text-gold/40 font-bold text-xs uppercase tracking-widest hover:border-gold/50 hover:text-gold hover:bg-white/5 transition-all duration-500">
                      <Plus size={16} />
                      <span>{t('افزودن زیرپروژه جدید', 'Add New Sub-project')}</span>
                   </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>

        {/* Asset Detail Modal */}
        <AnimatePresence>
          {selectedAsset && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-onyx/90 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
              dir="rtl"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                className="bg-[#121212] w-full max-w-4xl h-[80vh] rounded-[40px] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
              >
                  <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-onyx">
                        <Link2 size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-cream">
                          {t(selectedAsset.name, selectedAsset.nameEn)}
                        </h3>
                        <p className="text-xs text-gold/50">{selectedAsset.id}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedAsset(null)}
                      className="p-3 hover:bg-white/5 rounded-full text-cream/40 hover:text-gold transition-all"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <p className="text-sm text-cream/60 leading-relaxed mb-8 border-b border-white/5 pb-8">
                      {t(selectedAsset.description, selectedAsset.descriptionEn)}
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gold mb-4">{t('زنجیره فعالیت‌ها', 'Activity Chain')}</h4>
                      {ALL_TASKS.filter(task => task.assetId === selectedAsset.id).map(task => (
                        <div key={task.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                            task.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gold/10 text-gold'
                          }`}>
                            {task.status === 'completed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-cream">{t(task.title, task.titleEn || task.title)}</p>
                            <div className="flex gap-2 mt-1">
                               <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-white/5 text-cream/40 uppercase">
                                 {t(getStageConfig(task.lifecycleStage || 'STRATEGY').labelFa, getStageConfig(task.lifecycleStage || 'STRATEGY').labelEn)}
                               </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WBS Modal */}
        <AnimatePresence>
          {isWBSOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-onyx/90 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
              dir="rtl"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                className="bg-[#121212] w-full max-w-7xl h-full rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
              >
                  <div className="p-10 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between sticky top-0 bg-[#121212] z-10 gap-6">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-gold rounded-xl md:rounded-2xl flex items-center justify-center text-onyx shrink-0">
                        <LayoutDashboard size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-3xl font-bold text-cream">
                          {t('لیست جامع WBS', 'Global WBS Framework')}
                        </h3>
                        <p className="text-[10px] md:text-sm text-gold/50 mt-1 italic">
                          {t('ساختار سلسله‌مراتبی تمام پروژه‌ها و زیرپروژه‌های مارکتینگ VEDESIA', 'Hierarchical structure of all VEDESIA marketing sub-projects')}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsWBSOpen(false)}
                      className="absolute top-6 left-6 md:static w-10 h-10 md:w-14 md:h-14 bg-white/5 text-cream/40 hover:text-gold rounded-full flex items-center justify-center transition-all hover:bg-white/10"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-auto custom-scrollbar p-0">
                    <div className="min-w-[1000px] p-6">
                      <table className="w-full text-right border-separate border-spacing-y-2">
                        <thead className="sticky top-0 bg-[#121212] z-10">
                          <tr className="text-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                            <th className="p-4 md:p-6 text-right">Phase</th>
                            <th className="p-4 md:p-6 text-right">Layer</th>
                            <th className="p-4 md:p-6 text-right">Nature / Stage</th>
                            <th className="p-4 md:p-6 text-right w-1/3">Project / Asset Title</th>
                            <th className="p-4 md:p-6 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="pt-4">
                          {allProjects.map((project, idx) => (
                            <tr key={idx} className="group transition-all duration-300">
                              <td className="p-4 md:p-6 bg-white/[0.02] group-hover:bg-white/[0.05] rounded-r-2xl border-y border-white/5">
                                <span className="text-[8px] md:text-[10px] font-black tracking-widest text-gold bg-gold/10 px-2 md:px-3 py-1 md:py-1 rounded-md">
                                  {project.phaseId.split('-')[1].toUpperCase()}
                                </span>
                              </td>
                              <td className="p-4 md:p-6 bg-white/[0.02] group-hover:bg-white/[0.05] border-y border-white/5">
                                <span className="text-[10px] md:text-xs font-bold text-cream/60">{project.layerName}</span>
                              </td>
                              <td className="p-4 md:p-6 bg-white/[0.02] group-hover:bg-white/[0.05] border-y border-white/5">
                                <div className="flex flex-col gap-1.5">
                                  {project.nature && (
                                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border self-start shadow-sm ${getNatureConfig(project.nature).color}`}>
                                      {t(getNatureConfig(project.nature).labelFa, getNatureConfig(project.nature).labelEn)}
                                    </span>
                                  )}
                                  {project.lifecycleStage && (
                                    <div className="flex items-center gap-1">
                                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border self-start shadow-sm ${getStageConfig(project.lifecycleStage).color}`}>
                                        {t(getStageConfig(project.lifecycleStage).labelFa, getStageConfig(project.lifecycleStage).labelEn)}
                                      </span>
                                      <div className="flex gap-0.5 h-1 w-8">
                                        {LIFECYCLE_STAGES.map((s, i) => {
                                          const stageIndex = LIFECYCLE_STAGES.indexOf(project.lifecycleStage || 'STRATEGY');
                                          return (
                                            <div key={s} className={`flex-1 rounded-full ${i <= stageIndex ? 'bg-gold' : 'bg-white/10'}`} />
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="p-4 md:p-6 bg-white/[0.02] group-hover:bg-white/[0.05] border-y border-white/5">
                                <p className="font-bold text-cream/90 text-[11px] md:text-sm group-hover:text-gold transition-colors">{project.title}</p>
                              </td>
                              <td className="p-4 md:p-6 bg-white/[0.02] group-hover:bg-white/[0.05] rounded-l-2xl border-y border-white/5">
                                <div className="flex items-center justify-center gap-2 md:gap-3">
                                   <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_8px] ${
                                     project.status === 'completed' ? 'bg-emerald-500 shadow-emerald-500/50' : 
                                     project.status === 'in-progress' ? 'bg-gold shadow-gold/50' : 'bg-white/10'
                                   }`} />
                                   <span className="text-[8px] md:text-[10px] font-bold text-cream/30 uppercase tracking-widest">
                                     {project.status === 'completed' ? t('تایید شده', 'Verified') : project.status === 'in-progress' ? t('در حال اجرا', 'Executing') : t('برنامه‌ریزی شده', 'Scheduled')}
                                   </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-10 border-t border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-4 w-full md:w-auto">
                       <span className="text-2xl md:text-3xl font-bold text-gold">{allProjects.length}</span>
                       <p className="text-[10px] md:text-xs font-medium text-cream/30 uppercase tracking-widest">{t('زیرپروژه مپ شده', 'Sub-projects Mapped')}</p>
                     </div>
                     <div className="flex gap-3 md:gap-4 w-full md:w-auto">
                       <button 
                         onClick={handleExport}
                         className="flex-1 md:flex-none bg-white/5 border border-white/10 text-cream/50 px-4 md:px-8 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:text-cream hover:bg-white/10 transition-all"
                       >
                          Export
                       </button>
                       <button className="flex-1 md:flex-none gold-gradient text-onyx px-4 md:px-10 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(197,160,89,0.3)] hover:scale-105 transition-all">
                          Sync Strategy
                       </button>
                     </div>
                  </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Strategic Roadmap Modal */}
        <AnimatePresence>
          {isRoadmapOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-onyx/90 backdrop-blur-xl flex items-center justify-center p-0 md:p-2"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 50 }}
                className="bg-[#0a0a0b] w-full max-w-[99vw] h-full md:h-[98vh] rounded-none md:rounded-[16px] border border-white/10 shadow-[0_0_100px_rgba(197,160,89,0.1)] flex flex-col overflow-hidden relative"
              >
                <div className="absolute top-3 left-3 z-50">
                  <button 
                    onClick={() => setIsRoadmapOpen(false)}
                    className="w-7 h-7 bg-white/5 text-cream/40 hover:text-gold rounded-full flex items-center justify-center transition-all hover:bg-white/10 backdrop-blur-md"
                  >
                    <X size={14} />
                  </button>
                </div>
                
                <ProjectRoadmap phases={projectData} t={t} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Executive Overview Modal */}
        {/* Deficiency Report Modal */}
        <DeficiencyReport 
          t={t} 
          isOpen={isDeficiencyReportOpen} 
          onClose={() => setIsDeficiencyReportOpen(false)} 
          activeLayer={activeLayer}
          activePhase={activePhase}
          allTasks={allProjects}
        />

        <AnimatePresence>
          {isExecutiveViewOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-onyx/98 backdrop-blur-2xl flex items-center justify-center p-2 md:p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="bg-[#0c0c0c] w-full max-w-7xl h-full rounded-2xl border border-gold/20 shadow-[0_0_150px_rgba(197,160,89,0.15)] flex flex-col overflow-hidden relative"
              >
                {/* Abstract Background for Executive View */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/10 rounded-full blur-[180px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[150px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gold/5 rotate-45" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gold/5 -rotate-45" />
                </div>

                <div className={`border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 bg-onyx/40 ${executiveSubView === 'FLOW' ? 'p-2 md:p-3' : 'p-4 md:p-5'}`}>
                  <div className="flex flex-col">
                     <h2 className={`font-black text-gold tracking-tight font-serif italic ${executiveSubView === 'FLOW' ? 'text-sm md:text-base' : 'text-lg md:text-xl'}`}>STRATEGIC MATRIX</h2>
                     <p className={`font-bold tracking-[0.2em] uppercase mt-0.5 ${executiveSubView === 'FLOW' ? 'text-[8px] text-gold/40' : 'text-[10px] text-gold/50'}`}>VEDESIA EXECUTIVE STEERING DASHBOARD</p>
                  </div>
                  
                  {/* Executive Subview Toggle */}
                  <div className="flex bg-white/5 p-0.5 rounded-full border border-white/10 shrink-0 flex-wrap">
                    <button 
                      onClick={() => setExecutiveSubView('FLOW')}
                      className={`px-2.5 md:px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${
                        executiveSubView === 'FLOW'
                        ? 'bg-gold text-onyx shadow-md'
                        : 'text-cream/50 hover:text-cream/80'
                      }`}
                    >
                      {t('نقشه فرآیندهای مدیرعامل', 'CEO Map')}
                    </button>
                    <button 
                      onClick={() => setExecutiveSubView('FINANCE')}
                      className={`px-2.5 md:px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${
                        executiveSubView === 'FINANCE'
                        ? 'bg-gold text-onyx shadow-md'
                        : 'text-cream/50 hover:text-cream/80'
                      }`}
                    >
                      {t('پایش زمان و بودجه', 'Time & Budget')}
                    </button>
                    <button 
                      onClick={() => setExecutiveSubView('PROCUREMENT')}
                      className={`px-2.5 md:px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${
                        executiveSubView === 'PROCUREMENT'
                        ? 'bg-gold text-onyx shadow-md'
                        : 'text-cream/50 hover:text-cream/80'
                      }`}
                    >
                      {t('تأمین و آژانس‌ها', 'Sourcing & Partners')}
                    </button>
                    <button 
                      onClick={() => setExecutiveSubView('DASHBOARD')}
                      className={`px-2.5 md:px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${
                        executiveSubView === 'DASHBOARD'
                        ? 'bg-gold text-onyx shadow-md'
                        : 'text-cream/50 hover:text-cream/80'
                      }`}
                    >
                      {t('داشبورد پیشرفت', 'KPI Board')}
                    </button>
                  </div>

                  <button 
                    onClick={() => setIsExecutiveViewOpen(false)}
                    className="w-10 h-10 bg-white/5 text-gold hover:bg-gold hover:text-onyx rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className={`flex-1 overflow-y-auto custom-scrollbar relative z-10 ${executiveSubView === 'FLOW' ? 'p-1.5 pb-2' : 'p-4 md:p-6 pb-6'}`}>
                  {executiveSubView === 'FLOW' ? (
                    <CeoPresentationFlow t={t} lang={lang} />
                  ) : executiveSubView === 'FINANCE' ? (
                    <ExecutiveFinancePanel t={t} lang={lang} />
                  ) : executiveSubView === 'PROCUREMENT' ? (
                    <ExecutiveProcurementPanel t={t} lang={lang} />
                  ) : (
                    <>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                      {projectData.map((phase, idx) => {
                         const phaseTasks = phase.layers.flatMap(l => l.tasks);
                         const phaseCompleted = phaseTasks.filter(t => t.status === 'completed').length;
                         const phaseTotal = phaseTasks.length;
                         const phasePercent = Math.round((phaseCompleted / phaseTotal) * 100) || 0;

                         return (
                           <motion.div 
                             key={phase.id}
                             initial={{ opacity: 0, y: 30 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: idx * 0.1 }}
                             className="luxury-glass p-8 rounded-[32px] border border-white/5 flex flex-col h-full group hover:border-gold/40 transition-all duration-700"
                           >
                              <div className="flex items-center justify-between mb-8">
                                 <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                                    {React.cloneElement(phaseIcons[idx] as React.ReactElement, { size: 24 })}
                                 </div>
                                 <span className="text-4xl font-black text-gold/20 group-hover:text-gold/40 transition-colors">0{idx + 1}</span>
                              </div>
                              <h3 className="text-xl font-bold text-cream mb-2 font-serif">{t(phase.name, phase.nameEn)}</h3>
                              <p className="text-[10px] text-cream/40 uppercase tracking-widest mb-8 line-clamp-1">{t(phase.layers[0].name, phase.layers[0].nameEn)} ...</p>
                              
                              <div className="mt-auto">
                                <div className="flex items-end justify-between mb-3">
                                   <div className="text-3xl font-black text-gold font-mono">{phasePercent}%</div>
                                   <div className="text-[10px] text-cream/30 font-bold">{phaseCompleted} / {phaseTotal} {t('تکمیل شده (منتظر تایید)', 'Completed (Awaiting Sign-off)')}</div>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                   <motion.div 
                                     initial={{ width: 0 }}
                                     animate={{ width: `${phasePercent}%` }}
                                     transition={{ duration: 2, delay: 0.5 + idx * 0.2 }}
                                     className="h-full bg-gold shadow-[0_0_15px_rgba(197,160,89,0.4)]"
                                   />
                                </div>
                              </div>
                           </motion.div>
                         );
                      })}
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="lg:col-span-2 space-y-8">
                          <div className="luxury-glass p-10 rounded-[32px] border border-white/5">
                             <div className="flex items-center justify-between mb-10">
                                <h4 className="text-xl font-bold text-gold font-serif">{t('تایم‌لاین استراتژیک', 'Strategic Timeline')}</h4>
                                <div className="flex items-center gap-3">
                                   <div className="flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                      <span className="text-[9px] font-bold text-cream/30 uppercase">{t('تکمیل شده (منتظر تایید)', 'Completed (Awaiting Sign-off)')}</span>
                                   </div>
                                   <div className="flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-gold" />
                                      <span className="text-[9px] font-bold text-cream/30 uppercase">{t('در جریان', 'In Progress')}</span>
                                   </div>
                                </div>
                             </div>
                             
                             <div className="space-y-12 relative before:absolute before:right-6 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5 ltr:before:right-auto ltr:before:left-6">
                                {projectData.map((phase, idx) => (
                                  <div key={phase.id} className="relative pr-16 ltr:pr-0 ltr:pl-16">
                                     <div className="absolute top-1 right-3 ltr:right-auto ltr:left-3 w-6 h-6 rounded-full bg-onyx border-2 border-gold flex items-center justify-center z-10">
                                        <div className={`w-2 h-2 rounded-full ${idx === activePhaseIndex ? 'bg-gold animate-pulse' : 'bg-gold/20'}`} />
                                     </div>
                                     <h5 className="text-lg font-bold text-cream/80 mb-2">{t(phase.name, phase.nameEn)}</h5>
                                     <div className="flex flex-wrap gap-2">
                                        {phase.layers.map(l => (
                                          <span key={l.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-cream/40 uppercase tracking-widest">
                                             {t(l.name, l.nameEn)}
                                          </span>
                                        ))}
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>

                          {/* Classification Legend */}
                          <div className="luxury-glass p-10 rounded-[32px] border border-white/5">
                             <h4 className="text-xl font-bold text-gold font-serif mb-8">{t('راهنمای طبقه‌بندی هوشمند', 'Intelligent Classification Legend')}</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                   <p className="text-[10px] font-black text-gold/40 uppercase tracking-[0.2em] mb-4">{t('ماهیت فعالیت (Nature)', 'Activity Nature')}</p>
                                   <div className="space-y-4">
                                      {Object.entries(NATURE_CONFIG).map(([key, config]) => (
                                        <div key={key} className="flex items-center gap-4">
                                           <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${config.color}`}>
                                              {React.createElement(config.icon, { size: 18 })}
                                           </div>
                                           <div>
                                              <p className="text-xs font-bold text-cream">{t(config.labelFa, config.labelEn)}</p>
                                              <p className="text-[9px] text-cream/30 mt-0.5">
                                                {key === 'ONE_TIME' && t('پروژه‌های اجرایی با نقطه شروع و پایان مشخص.', 'Projects with a clear start and end point.')}
                                                {key === 'PERIODIC' && t('فعالیت‌های تکرارپذیر در بازه‌های زمانی مشخص.', 'Tasks that repeat at specific intervals.')}
                                                {key === 'CONTINUOUS' && t('فرآیندهای جاری و همیشگی سیستم مارکتینگ.', 'Ongoing, permanent marketing system processes.')}
                                              </p>
                                           </div>
                                        </div>
                                      ))}
                                   </div>
                                </div>
                                <div>
                                   <p className="text-[10px] font-black text-gold/40 uppercase tracking-[0.2em] mb-4">{t('مراحل چرخه حیات (Lifecycle)', 'Lifecycle Stages')}</p>
                                   <div className="grid grid-cols-2 gap-4">
                                      {Object.entries(STAGE_CONFIG).map(([key, config]) => (
                                        <div key={key} className="flex items-center gap-3">
                                           <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${config.color}`}>
                                              {React.createElement(config.icon, { size: 14 })}
                                           </div>
                                           <span className="text-[10px] font-bold text-cream/70">{t(config.labelFa, config.labelEn)}</span>
                                        </div>
                                      ))}
                                   </div>
                                   
                                   {/* Modern Flowchart */}
                                   <div className="mt-8 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                                      <div className="flex flex-wrap items-center justify-between gap-4">
                                         {LIFECYCLE_STAGES.map((s, i) => (
                                           <React.Fragment key={s}>
                                              <div className="flex flex-col items-center gap-2">
                                                 <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${getStageConfig(s).color}`}>
                                                    {React.createElement(getStageConfig(s).icon, { size: 16 })}
                                                 </div>
                                                 <span className="text-[8px] font-bold text-cream/40">{t(getStageConfig(s).labelFa, getStageConfig(s).labelEn)}</span>
                                              </div>
                                              {i < LIFECYCLE_STAGES.length - 1 && (
                                                <div className="hidden md:block w-4 h-[1px] bg-white/10" />
                                              )}
                                           </React.Fragment>
                                         ))}
                                      </div>
                                      <div className="mt-4 pt-4 border-t border-white/5 text-center">
                                         <p className="text-[9px] text-gold/40 flex items-center justify-center gap-2 italic">
                                            <InfinityIcon size={12} />
                                            {t('نتایج هر چرخه هوشمندی، سند چرخه‌ی بعدی را پی‌ریزی می‌کند', 'Intelligence results feed the next Strategy document')}
                                         </p>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>

                      <div className="space-y-8">
                         <div className="luxury-glass p-8 rounded-[32px] border border-white/5 bg-gold/5 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
                            <h4 className="text-xs font-black text-gold/60 uppercase tracking-[0.2em] mb-4">{t('منطق ساختار WBS', 'Structural Logic (WBS)')}</h4>
                            <p className="text-[11px] text-cream/80 leading-relaxed font-sans mb-4">
                               {t('این مدل بر پایه "مقیاس‌پذیری ماژولار" طراحی شده است تا پایداری برند VEDESIA در بازارهای اروپا و کانادا تضمین شود.', 'This model is built on "Modular Scalability" to ensure VEDESIA brand stability in EU & Canada.')}
                            </p>
                            <div className="flex gap-2">
                               <span className="text-[9px] font-bold px-2 py-1 bg-gold/20 text-gold rounded uppercase">Complexity: High</span>
                               <span className="text-[9px] font-bold px-2 py-1 bg-white/10 text-white/40 rounded uppercase">Precision: 100%</span>
                            </div>
                         </div>

                         <div className="luxury-glass p-10 rounded-[32px] border border-white/5 bg-gold/5">
                            <h4 className="text-xs font-black text-gold/60 uppercase tracking-[0.2em] mb-6">{t('شاخص آمادگی نهایی (EST)', 'Final Readiness Index')}</h4>
                            <div className="text-6xl font-black text-gold mb-4 italic">78%</div>
                            <p className="text-[10px] text-cream/40 leading-relaxed font-sans">
                               {t('محاسبه شده بر اساس تکمیل اسناد استراتژیک، آمادگی زیرساخت‌های دیجیتال و زنجیره تامین پارتنرهای جهانی در فازهای ۱ و ۲.', 'Calculated based on strategy fulfillment and digital infrastructure readiness in Phases 1 & 2.')}
                            </p>
                         </div>
                         
                         <div className="luxury-glass p-10 rounded-[32px] border border-white/5">
                            <h4 className="text-xs font-black text-gold/60 uppercase tracking-[0.2em] mb-6">{t('وضعیت ریسک استراتژیک', 'Strategic Risk Status')}</h4>
                            <div className="flex items-center gap-4 mb-6">
                               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                                  <ShieldCheck size={24} />
                               </div>
                               <div>
                                  <p className="text-xs font-bold text-cream uppercase">{t('وضعیت پایدار', 'Stable Status')}</p>
                                  <p className="text-[10px] text-emerald-500/60 font-medium">Ready for Fuorisalone 2026</p>
                               </div>
                            </div>
                            <div className="space-y-4">
                               <div className="flex gap-4">
                                  <div className="w-1 h-10 bg-gold/20 rounded-full" />
                                  <div>
                                     <p className="text-[11px] font-bold text-cream">Brand Book Synthesis</p>
                                     <p className="text-[9px] text-emerald-400 mt-1 uppercase font-bold tracking-widest">In Progress</p>
                                  </div>
                               </div>
                               <div className="flex gap-4">
                                  <div className="w-1 h-10 bg-gold/20 rounded-full" />
                                  <div>
                                     <p className="text-[11px] font-bold text-cream">Global PR Planning</p>
                                     <p className="text-[9px] text-emerald-400 mt-1 uppercase font-bold tracking-widest">In Progress</p>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   </>
                  )}
                </div>

                <div className="p-8 border-t border-white/5 flex items-center justify-between text-[10px] text-cream/20 font-bold tracking-[0.3em] uppercase relative z-10">
                   <span>VEDESIA GLOBAL STEERING PANEL • 2026</span>
                   <div className="flex gap-8">
                      <span>SECURE LINE</span>
                      <span className="text-gold/40">AUTH: DIRECTOR_LVL_4</span>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          <CustomerJourneyMap 
            isOpen={isJourneyMapOpen} 
            onClose={() => setIsJourneyMapOpen(false)} 
            t={t} 
            lang={lang} 
          />
        </AnimatePresence>

        <footer className="w-full mt-auto shrink-0 border-t border-white/5 bg-onyx/80 backdrop-blur-2xl pt-20 pb-24 px-6 md:px-12 relative overflow-hidden z-10">
          {/* Decorative background for footer */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-48 -mb-48 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
              <div className="md:col-span-2 lg:col-span-2">
                <h3 className="text-2xl font-bold text-gold tracking-[0.3em] uppercase mb-8 font-serif italic">VEDESIA</h3>
                <p className={`text-cream/60 text-sm leading-relaxed max-w-md font-sans text-justify ${lang === 'fa' ? 'ml-auto' : 'mr-auto'}`}>
                  {t(
                    'برند VEDESIA با رویکردی پیشرو در بازتعریف سطوح استراتژیک معماری، پیوندی میان تکنولوژی نماهای مدرن و ظرافت‌های هنری سفارشی برقرار کرده است. ما با تمرکز بر فضاهای فاخر داخلی و خارجی، دیدگاه آوانگارد را با میراث طراحی ایتالیایی ترکیب کرده تا استانداردهایی فراتر از صنعت سرامیک خلق کنیم.',
                    'VEDESIA redefines architectural surfaces, bridging modern facade technology with bespoke artistic elegance. Focused on prestigious interior and exterior spaces, we combine avant-garde vision with Italian design heritage to establish benchmarks beyond the ceramic industry.'
                  )}
                </p>
                <div className={`flex items-center ${lang === 'fa' ? 'justify-end' : 'justify-start'} gap-4 mt-10`}>
                  <div className={`italy-accent scale-150 ${lang === 'fa' ? 'origin-right' : 'origin-left'}`}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="text-[10px] font-bold text-gold/40 uppercase tracking-[0.4em] font-sans">Milano • Toronto • Global</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-8">
                  {t('ساختار استراتژیک', 'Strategic Hierarchy')}
                </h4>
                <ul className="space-y-5">
                  {projectData.slice(0, 4).map((phase, i) => (
                    <li key={phase.id}>
                      <button 
                        onClick={() => handlePhaseChange(i)}
                        className={`text-cream/40 hover:text-gold text-xs transition-colors font-medium w-full ${lang === 'fa' ? 'text-right' : 'text-left'}`}
                      >
                        {t(phase.name.split(':')[1] || phase.name, phase.nameEn.split(':')[1] || phase.nameEn)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-1">
                <h4 className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-8">
                  {t('ارتباطات', 'Communication')}
                </h4>
                <ul className="space-y-5">
                  <li>
                    <a href="mailto:info@vedesia.com" className={`text-cream/40 hover:text-gold text-xs transition-colors flex items-center ${lang === 'fa' ? 'justify-end' : 'justify-start'} gap-3 font-mono`}>
                      <span className={lang === 'fa' ? 'order-1' : 'order-2'}>info@vedesia.com</span>
                      <X size={14} className={`rotate-45 text-gold/50 ${lang === 'fa' ? 'order-2' : 'order-1'}`} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className={`text-cream/40 hover:text-gold text-xs transition-colors flex items-center ${lang === 'fa' ? 'justify-end' : 'justify-start'} gap-3 font-mono`}>
                      <span className={lang === 'fa' ? 'order-1' : 'order-2'}>www.vedesia.com</span>
                      <Globe size={14} className={`text-gold/50 ${lang === 'fa' ? 'order-2' : 'order-1'}`} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-6">
              <p className={`text-[10px] text-cream/20 font-medium tracking-widest uppercase font-sans text-center ${lang === 'fa' ? 'md:text-right order-2 md:order-1' : 'md:text-left order-2 md:order-2'}`}>
                © {new Date().getFullYear()} VEDESIA GLOBAL MARKETING STRATEGY • ALL RIGHTS RESERVED
              </p>
              <div className={`flex items-center gap-6 ${lang === 'fa' ? 'order-1 md:order-2' : 'order-1 md:order-1'}`}>
                 <div className="text-[9px] text-gold/30 font-bold tracking-[0.2em] uppercase">Private & Confidential</div>
                 <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                 <div className="text-[9px] text-gold/30 font-bold tracking-[0.2em] uppercase italic">Revision 2.7.0</div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, sub, lang }: { label: string, value: string | number, icon: React.ReactNode, sub: string, lang: 'fa' | 'en' }) {
  return (
    <div className={`luxury-glass p-6 md:p-8 rounded-[24px] md:rounded-[28px] border border-white/5 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-gold/10 transition-all" />
      <div className={`flex items-center justify-between mb-4 md:mb-6 relative z-10 ${lang === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
          {icon}
        </div>
        <div className={lang === 'fa' ? 'text-right' : 'text-left'}>
           <p className="text-[10px] font-black text-gold/40 uppercase tracking-[0.2em]">{label}</p>
           <h4 className="text-3xl font-bold text-cream mt-1 font-montserrat tracking-tight">{value}</h4>
        </div>
      </div>
      <div className="pt-6 border-t border-white/5 relative z-10">
        <p className="text-[10px] font-bold text-cream/30 flex items-center gap-2 uppercase tracking-widest">
           <Info size={12} className="text-gold/50" />
           {sub}
        </p>
      </div>
    </div>
  );
}
