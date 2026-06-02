import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, ArrowUpDown, Download, 
  ChevronLeft, ChevronRight, Zap, Target, 
  Users, Calendar, Clock, CheckCircle2, Circle, 
  HelpCircle, AlertTriangle, Eye, RefreshCw, X, PlusCircle, Check, TableProperties,
  ChevronDown, ChevronUp, FileText, Video, Hammer, GraduationCap, Play, Brain, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TaskItem, ProjectNature, LifecycleStage, Priority } from '../types';
import { STRATEGIC_ASSETS } from '../constants';

// Helper types for augmented task with phase and layer contextual details
interface ContextualTask extends TaskItem {
  phaseName: string;
  phaseNameEn: string;
  layerName: string;
  layerNameEn: string;
  phaseId: string;
}

interface MasterTaskTableProps {
  lang: 'fa' | 'en';
  t: (fa: string, en: string) => string;
  tasks: ContextualTask[];
  onUpdateTask: (task: ContextualTask) => void;
  onNavigateToTask?: (taskId: string, phaseIndex: number, layerId: string) => void;
}

const PRIORITY_LABELS: Record<Priority, { fa: string; en: string; color: string; badge: string }> = {
  P0: { fa: 'بحرانی (P0)', en: 'Critical (P0)', color: 'text-rose-400', badge: 'bg-rose-500/10 border-rose-500/20 text-rose-400' },
  P1: { fa: 'مهم (P1)', en: 'High (P1)', color: 'text-amber-400', badge: 'bg-gold/10 border-gold/20 text-gold' },
  P2: { fa: 'معمولی (P2)', en: 'Normal (P2)', color: 'text-blue-400', badge: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
  P3: { fa: 'پایین (P3)', en: 'Low (P3)', color: 'text-cream/40', badge: 'bg-white/5 border-white/10 text-cream/40' },
};

const NATURE_LABELS: Record<ProjectNature, { fa: string; en: string; badge: string }> = {
  ONE_TIME: { fa: 'یک‌باره', en: 'One-Time', badge: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
  PERIODIC: { fa: 'دوره‌ای', en: 'Periodic', badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
  CONTINUOUS: { fa: 'مستمر', en: 'Continuous', badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' },
};

const STAGE_LABELS: Record<LifecycleStage, { fa: string; en: string; badge: string }> = {
  STRATEGY: { fa: 'سند', en: 'Strategy', badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
  CONTENT: { fa: 'محتوا', en: 'Content', badge: 'bg-sky-500/10 border-sky-500/20 text-sky-400' },
  INFRASTRUCTURE: { fa: 'ساخت', en: 'Infrastructure', badge: 'bg-orange-500/10 border-orange-500/20 text-orange-400' },
  TRAINING: { fa: 'آموزش', en: 'Training', badge: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
  EXECUTION: { fa: 'اجرا', en: 'Execution', badge: 'bg-rose-500/10 border-rose-500/20 text-rose-400' },
  INTELLIGENCE: { fa: 'هوشمندی', en: 'Intelligence', badge: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400' },
};

const STATUS_LABELS: Record<string, { fa: string; en: string; badge: string; icon: any }> = {
  pending: { fa: 'باقیمانده', en: 'Pending', badge: 'bg-white/5 border-white/5 text-cream/40', icon: Circle },
  'in-progress': { fa: 'در جریان', en: 'In Progress', badge: 'bg-gold/10 border-gold/30 text-gold', icon: Clock },
  done: { fa: 'تکمیل شده (منتظر تایید)', en: 'Completed (Awaiting Sign-off)', badge: 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400', icon: CheckCircle2 },
};

export const MasterTaskTable: React.FC<MasterTaskTableProps> = ({ 
  lang, 
  t, 
  tasks, 
  onUpdateTask,
  onNavigateToTask
}) => {
  // 1. Interactive state managers
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [natureFilter, setNatureFilter] = useState<string>('ALL');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('ALL');
  const [milestoneFilter, setMilestoneFilter] = useState<boolean | 'ALL'>('ALL');
  const [criticalFilter, setCriticalFilter] = useState<boolean>(false); // filters P0

  // Pagination & Sorting managers
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [sortField, setSortField] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Slide-over detail panel
  const [selectedTask, setSelectedTask] = useState<ContextualTask | null>(null);
  const [isEditingInPanel, setIsEditingInPanel] = useState(false);
  const [tempTaskState, setTempTaskState] = useState<ContextualTask | null>(null);

  // Quick Inline Editing
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [quickStatus, setQuickStatus] = useState<string>('');
  const [quickPriority, setQuickPriority] = useState<Priority>('P2');
  const [quickAssignee, setQuickAssignee] = useState<string>('');

  // Master nested expanded rows state
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Track active stage in expanded rows for six-stage cycle
  const [activeStages, setActiveStages] = useState<Record<string, LifecycleStage>>({});
  const getActiveStage = (itemId: string) => activeStages[itemId] || 'STRATEGY';
  const setActiveStage = (itemId: string, stage: LifecycleStage) => {
    setActiveStages(prev => ({ ...prev, [itemId]: stage }));
  };

  // 2. Extracted helper arrays
  const uniqueAssignees = useMemo(() => {
    const list = new Set<string>();
    tasks.forEach(t => t.assignee && list.add(t.assignee));
    return Array.from(list).sort();
  }, [tasks]);

  const uniquePhases = useMemo(() => {
    const map = new Map<string, string>();
    tasks.forEach(t => {
      if (t.phaseId) {
        map.set(t.phaseId, t.phaseName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [tasks]);

  const assetNameMap = useMemo(() => {
    const map = new Map<string, string>();
    STRATEGIC_ASSETS.forEach(a => {
      map.set(a.id, lang === 'fa' ? a.name : a.nameEn);
    });
    return map;
  }, [lang]);

  // Precalculating Downstream dependents map
  const downstreamMap = useMemo(() => {
    const map = new Map<string, string[]>(); // key: prerequisite task ID, value: list of task IDs that depend on it
    tasks.forEach(t => {
      if (t.dependencies && t.dependencies.length > 0) {
        t.dependencies.forEach(depId => {
          const current = map.get(depId) || [];
          if (!current.includes(t.id)) {
            current.push(t.id);
            map.set(depId, current);
          }
        });
      }
    });
    return map;
  }, [tasks]);

  // 3. Filtering the task tree
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(item => 
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q)) ||
        (item.assignee && item.assignee.toLowerCase().includes(q))
      );
    }

    // Phase Filter
    if (phaseFilter !== 'ALL') {
      result = result.filter(item => item.phaseId === phaseFilter);
    }

    // Status Filter
    if (statusFilter !== 'ALL') {
      result = result.filter(item => item.status === statusFilter);
    }

    // Priority Filter
    if (priorityFilter !== 'ALL') {
      result = result.filter(item => item.priority === priorityFilter);
    }

    // Nature Filter
    if (natureFilter !== 'ALL') {
      result = result.filter(item => item.nature === natureFilter);
    }

    // Stage Filter
    if (stageFilter !== 'ALL') {
      result = result.filter(item => item.lifecycleStage === stageFilter);
    }

    // Assignee Filter
    if (assigneeFilter !== 'ALL') {
      result = result.filter(item => item.assignee === assigneeFilter);
    }

    // Milestone Filter
    if (milestoneFilter !== 'ALL') {
      result = result.filter(item => !!item.isMilestone === milestoneFilter);
    }

    // Critical Path (P0) Filter
    if (criticalFilter) {
      result = result.filter(item => item.priority === 'P0');
    }

    return result;
  }, [
    tasks, search, phaseFilter, statusFilter, priorityFilter, 
    natureFilter, stageFilter, assigneeFilter, milestoneFilter, criticalFilter
  ]);

  // 4. Sorting logic
  const sortedTasks = useMemo(() => {
    const sorted = [...filteredTasks];
    sorted.sort((a, b) => {
      let aVal: any = a[sortField as keyof ContextualTask] ?? '';
      let bVal: any = b[sortField as keyof ContextualTask] ?? '';

      // Clean casing for textual IDs and compare numerically if possible
      if (sortField === 'id') {
        const aNum = parseInt(a.id.replace(/\D/g, '')) || 999;
        const bNum = parseInt(b.id.replace(/\D/g, '')) || 999;
        return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
      }

      if (sortField === 'title') {
        aVal = lang === 'fa' ? a.title : (a.titleEn || a.title);
        bVal = lang === 'fa' ? b.title : (b.titleEn || b.title);
      }

      if (sortField === 'durationDays') {
        aVal = a.durationDays ?? 0;
        bVal = b.durationDays ?? 0;
      }

      if (sortField === 'priority') {
        // Priority weight: P0 > P1 > P2 > P3
        const weights = { P0: 4, P1: 3, P2: 2, P3: 1 };
        aVal = weights[a.priority as Priority] || 0;
        bVal = weights[b.priority as Priority] || 0;
      }

      if (sortField === 'dueDate') {
        aVal = a.dueDate || '';
        bVal = b.dueDate || '';
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredTasks, sortField, sortOrder, lang]);

  // 5. Paginated results
  const paginatedTasks = useMemo(() => {
    if (pageSize === -1) return sortedTasks; // Show All
    const startIdx = (currentPage - 1) * pageSize;
    return sortedTasks.slice(startIdx, startIdx + pageSize);
  }, [sortedTasks, currentPage, pageSize]);

  const totalPages = useMemo(() => {
    if (pageSize === -1) return 1;
    return Math.ceil(sortedTasks.length / pageSize) || 1;
  }, [sortedTasks.length, pageSize]);

  // Handle outside dependencies click
  const handleDependencyChipClick = (targetId: string) => {
    // Focus search, or filter on ID directly to inspect
    setSearch(targetId);
    // Find contextual task object if it exists to open
    const target = tasks.find(t => t.id === targetId);
    if (target) {
      setSelectedTask(target);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // 6. Dynamic Stats Calcs
  const stats = useMemo(() => {
    const totalCount = filteredTasks.length;
    const completedCount = filteredTasks.filter(t => t.status === 'completed' || t.status === 'done' || t.status === 'approved').length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const milestoneCount = filteredTasks.filter(t => t.isMilestone).length;
    const criticalCount = filteredTasks.filter(t => t.priority === 'P0').length;
    const totalDuration = filteredTasks.reduce((sum, t) => sum + (t.durationDays || 0), 0);
    const avgDuration = totalCount > 0 ? Math.round(totalDuration / totalCount) : 0;

    return {
      total: totalCount,
      completed: completedCount,
      progress: progressPercent,
      milestones: milestoneCount,
      critical: criticalCount,
      avgDuration
    };
  }, [filteredTasks]);

  // Export Filtered Table to CSV (Tailored beautifully with headers)
  const handleExportCSV = () => {
    const exportRows = [];
    exportRows.push([
      'Task ID', 
      'Phase', 
      'Layer', 
      'Title (Persian)', 
      'Title (English)', 
      'Status', 
      'Priority', 
      'Nature', 
      'Lifecycle Stage', 
      'Duration (Days)', 
      'Assignee', 
      'Due Date', 
      'Is Milestone', 
      'Pre-requisites'
    ]);

    filteredTasks.forEach(task => {
      exportRows.push([
        `"${task.id}"`,
        `"${t(task.phaseName, task.phaseNameEn).replace(/"/g, '""')}"`,
        `"${t(task.layerName, task.layerNameEn).replace(/"/g, '""')}"`,
        `"${task.title.replace(/"/g, '""')}"`,
        `"${(task.titleEn || '').replace(/"/g, '""')}"`,
        `"${task.status}"`,
        `"${task.priority || 'P2'}"`,
        `"${task.nature || ''}"`,
        `"${task.lifecycleStage || ''}"`,
        task.durationDays || 0,
        `"${task.assignee || ''}"`,
        `"${task.dueDate || ''}"`,
        task.isMilestone ? 'TRUE' : 'FALSE',
        `"${(task.dependencies || []).join(', ')}"`
      ]);
    });

    const csvContent = "\uFEFF" + exportRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `VEDESIA_Master_List_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Persisting updates from the slide-over
  const savePanelEdit = () => {
    if (tempTaskState) {
      onUpdateTask(tempTaskState);
      // Synchronize currently displayed tasks
      setSelectedTask(tempTaskState);
      setIsEditingInPanel(false);
    }
  };

  const startQuickInlineEdit = (item: ContextualTask) => {
    setEditingRowId(item.id);
    setQuickStatus(item.status);
    setQuickPriority(item.priority || 'P2');
    setQuickAssignee(item.assignee || '');
  };

  const saveQuickInlineEdit = (item: ContextualTask) => {
    const updated: ContextualTask = {
      ...item,
      status: quickStatus as any,
      priority: quickPriority,
      assignee: quickAssignee
    };
    onUpdateTask(updated);
    setEditingRowId(null);
  };

  return (
    <div className="space-y-6" id="master-table-view">
      {/* 1. Header & Quick description overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gold tracking-tight font-sans">
            {t('کنترل‌پنل جامع و ماتریس یکپارچه فعالیت‌ها', 'Master Project Activities Matrix')}
          </h2>
          <p className="text-xs text-cream/40 mt-1 max-w-3xl">
            {t(
              `امکان رصد، فیلتر ترکیبی، مرتب‌سازی، رهگیری وابستگی‌ها و به روز رسانی آنی کل ${tasks.length} زیرپروژه و ریزفعالیت سازمانی با خروجی اکسل در قالب یک میز کار یکپارچه.`,
              `A dense, high-fidelity workbench to query, multi-filter, track dependencies, live-update and export all ${tasks.length} corporate roadmap items.`
            )}
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 bg-gold/10 hover:bg-gold/25 text-gold border border-gold/25 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all duration-300"
        >
          <Download size={14} />
          <span>{t('خروجی کامل اکسل / CSV', 'Export to Excel / CSV')}</span>
        </button>
      </div>

      {/* 2. Top Metric Cards Panel */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 select-none">
        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between">
          <span className="text-[10px] text-cream/40 uppercase font-black">{t('تعداد کل', 'Filtered Total')}</span>
          <span className="text-2xl font-bold text-cream mt-2">{stats.total}</span>
          <span className="text-[9px] text-cream/30 mt-1">{t('آیتم نمایش داده شده', 'matched items')}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between">
          <span className="text-[10px] text-emerald-400/80 uppercase font-black">{t('برآیند پیشرفت', 'Progress Rate')}</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-emerald-400">{stats.progress}%</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-emerald-500" style={{ width: `${stats.progress}%` }} />
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between">
          <span className="text-[10px] text-rose-400/80 uppercase font-black">{t('بحرانی (P0)', 'Critical Paths P0')}</span>
          <span className="text-2xl font-bold text-rose-400 mt-2">{stats.critical}</span>
          <span className="text-[9px] text-rose-400/45 mt-1">{t('اولویت‌ بالا و زنجیره بحرانی', 'P0 high impact issues')}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between">
          <span className="text-[10px] text-purple-400/80 uppercase font-black">{t('مایلستون‌ها', 'Milestones')}</span>
          <span className="text-2xl font-bold text-purple-400 mt-2">{stats.milestones}</span>
          <span className="text-[9px] text-purple-400/45 mt-1">{t('نقاط عطف طلایی نقشه راه', 'golden progress markers')}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between">
          <span className="text-[10px] text-indigo-400/80 uppercase font-black">{t('میانگین روزها', 'Avg Duration')}</span>
          <span className="text-2xl font-bold text-indigo-400 mt-2">{stats.avgDuration} <span className="text-xs font-medium text-cream/40">{t('روز', 'days')}</span></span>
          <span className="text-[9px] text-indigo-400/40 mt-1">{t('چرخه‌کاری استاندارد تسک‌ها', 'average operational cycle')}</span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex flex-col justify-between">
          <span className="text-[10px] text-gold uppercase font-black">{t('تکمیل شده', 'Completed')}</span>
          <span className="text-2xl font-bold text-gold mt-2">{stats.completed}</span>
          <span className="text-[9px] text-gold/50 mt-1">{t('آماده ارزیابی و استمرار', 'Awaiting final signoff')}</span>
        </div>
      </div>

      {/* 3. Multi-Filter Sidebar-or-Header Toolbox */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Search */}
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder={t('جستجو در عناوینو کد، نام مسئول، پیش‌نیازها و آیدی...', 'Search by title, ID, assignee, description...')}
              className="w-full text-right group-ltr:text-left pr-12 pl-4 py-3 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-gold/50 text-cream text-sm transition-all"
            />
            {search && (
              <button 
                onClick={() => setSearch('')} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Toggle: Milestones */}
            <button
              onClick={() => {
                setMilestoneFilter(prev => prev === true ? 'ALL' : true);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border text-xs font-bold font-sans transition-all duration-200 ${
                milestoneFilter === true 
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-400' 
                  : 'bg-black/20 border-white/5 text-cream/50 hover:border-white/10'
              }`}
            >
              <Target size={13} />
              <span>{t('فقط مایلستون‌ها', 'Only Milestones')}</span>
            </button>

            {/* Quick Toggle: P0 Critical Path */}
            <button
              onClick={() => {
                setCriticalFilter(!criticalFilter);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border text-xs font-bold font-sans transition-all duration-200 ${
                criticalFilter 
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 shadow-md shadow-rose-950/20' 
                  : 'bg-black/20 border-white/5 text-cream/50 hover:border-white/10'
              }`}
            >
              <AlertTriangle size={13} />
              <span>{t('فقط مسیر بحرانی (P0)', 'Only Critical Path (P0)')}</span>
            </button>

            {/* Reset Filter Button */}
            {(search || phaseFilter !== 'ALL' || statusFilter !== 'ALL' || priorityFilter !== 'ALL' || natureFilter !== 'ALL' || stageFilter !== 'ALL' || assigneeFilter !== 'ALL' || milestoneFilter !== 'ALL' || criticalFilter) && (
              <button
                onClick={() => {
                  setSearch('');
                  setPhaseFilter('ALL');
                  setStatusFilter('ALL');
                  setPriorityFilter('ALL');
                  setNatureFilter('ALL');
                  setStageFilter('ALL');
                  setAssigneeFilter('ALL');
                  setMilestoneFilter('ALL');
                  setCriticalFilter(false);
                  setCurrentPage(1);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/15 text-xs font-bold transition-all duration-200"
              >
                <RefreshCw size={12} />
                <span>{t('حذف تمامی فیلترها', 'Reset Filters')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Detailed Dropdowns (Grid layout) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Phase Select */}
          <div className="space-y-1">
            <label className="text-[10px] text-cream/40 px-1 block">{t('فاز اجرا', 'Project Phase')}</label>
            <select
              value={phaseFilter}
              onChange={(e) => { setPhaseFilter(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs font-sans tracking-tight bg-black/40 border border-white/5 text-cream/75 rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40"
            >
              <option value="ALL">{t('تمامی فازها (۱ الی ۴)', 'All Phases')}</option>
              {uniquePhases.map(p => (
                <option key={p.id} value={p.id}>
                  {t(p.name, p.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Select */}
          <div className="space-y-1">
            <label className="text-[10px] text-cream/40 px-1 block">{t('وضعیت اقدام', 'Execution Status')}</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs font-sans tracking-tight bg-black/40 border border-white/5 text-cream/75 rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40"
            >
              <option value="ALL">{t('همه وضعیت‌ها', 'All Statuses')}</option>
              <option value="pending">{t('باقیمانده / اقدام نشده', 'Pending')}</option>
              <option value="in-progress">{t('در جریان اجرا', 'In Progress')}</option>
              <option value="completed">{t('تکمیل شده (منتظر تایید)', 'Completed/Awaiting Signoff')}</option>
            </select>
          </div>

          {/* Priority Select */}
          <div className="space-y-1">
            <label className="text-[10px] text-cream/40 px-1 block">{t('درجه اهمیت / اولویت', 'Priority Rating')}</label>
            <select
              value={priorityFilter}
              onChange={(e) => { setPriorityFilter(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs font-sans tracking-tight bg-black/40 border border-white/5 text-cream/75 rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40"
            >
              <option value="ALL">{t('کلیه اولویت‌ها', 'All Priorities')}</option>
              <option value="P0">{t('بحرانی (P0)', 'Critical (P0)')}</option>
              <option value="P1">{t('مهم (P1)', 'High (P1)')}</option>
              <option value="P2">{t('معمولی (P2)', 'Normal (P2)')}</option>
              <option value="P3">{t('کمکی / کم (P3)', 'Low (P3)')}</option>
            </select>
          </div>

          {/* Nature Select */}
          <div className="space-y-1">
            <label className="text-[10px] text-cream/40 px-1 block">{t('ماهیت ساختار عملیاتی', 'Operational Nature')}</label>
            <select
              value={natureFilter}
              onChange={(e) => { setNatureFilter(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs font-sans tracking-tight bg-black/40 border border-white/5 text-cream/75 rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40"
            >
              <option value="ALL">{t('هر ماهیتی', 'All Natures')}</option>
              <option value="ONE_TIME">{t('پروژه‌های یک‌باره', 'One-Time')}</option>
              <option value="PERIODIC">{t('گردش‌های دوره‌ای', 'Periodic')}</option>
              <option value="CONTINUOUS">{t('سیستم‌های مستمر', 'Continuous')}</option>
            </select>
          </div>

          {/* Stage Selector */}
          <div className="space-y-1">
            <label className="text-[10px] text-cream/40 px-1 block">{t('مرحله چرخه حیات', 'Lifecycle Stage')}</label>
            <select
              value={stageFilter}
              onChange={(e) => { setStageFilter(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs font-sans tracking-tight bg-black/40 border border-white/5 text-cream/75 rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40"
            >
              <option value="ALL">{t('تمامی ۶ مرحله حیات', 'All Stages')}</option>
              <option value="STRATEGY">{t('سند و تعریف استراتژی', 'Strategy')}</option>
              <option value="CONTENT">{t('محتوا و جزئیات طرح', 'Content')}</option>
              <option value="INFRASTRUCTURE">{t('ساخت، پکیج و کالا', 'Infrastructure')}</option>
              <option value="TRAINING">{t('توجیه، آموزش و شبیه‌سازی', 'Training')}</option>
              <option value="EXECUTION">{t('اجرا، لایو و عملیاتی‌سازی', 'Execution')}</option>
              <option value="INTELLIGENCE">{t('هوشمندی، رصد و کالیبراسیون', 'Intelligence')}</option>
            </select>
          </div>

          {/* Assignee Filter */}
          <div className="space-y-1">
            <label className="text-[10px] text-cream/40 px-1 block">{t('مسئول اقدام', 'Assignee / Lead')}</label>
            <select
              value={assigneeFilter}
              onChange={(e) => { setAssigneeFilter(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs font-sans tracking-tight bg-black/40 border border-white/5 text-cream/75 rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40"
            >
              <option value="ALL">{t('کلیه مسئولین', 'All Assignees')}</option>
              {uniqueAssignees.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4. Table view - Desktop Optimized & Mobile List */}
      <div className="bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full table-fixed min-w-[1080px] border-collapse text-right group-ltr:text-left text-sm">
            {/* Table Headers */}
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/5 text-xs text-gold/80 font-bold select-none h-14">
                <th onClick={() => handleSort('id')} className="cursor-pointer hover:text-gold w-[75px] px-4 font-normal font-mono transition-colors">
                  <div className="flex items-center gap-1">
                    <span>{t('شناسه', 'ID')}</span>
                    <ArrowUpDown size={12} className="opacity-40" />
                  </div>
                </th>
                <th onClick={() => handleSort('title')} className="cursor-pointer hover:text-gold w-[250px] px-4 font-normal transition-colors">
                  <div className="flex items-center gap-1">
                    <span>{t('عنوان زیرپروژه / ریزفعالیت', 'Sub-project / Activity Title')}</span>
                    <ArrowUpDown size={12} className="opacity-40" />
                  </div>
                </th>
                <th className="w-[90px] px-4 font-normal">{t('فاز اجرا', 'Phase')}</th>
                <th className="w-[95px] px-4 font-normal">{t('دسته / عضو بدن', 'Layer (Organ)')}</th>
                <th onClick={() => handleSort('priority')} className="cursor-pointer hover:text-gold w-[80px] px-4 font-normal transition-colors">
                  <div className="flex items-center gap-1">
                    <span>{t('اولویت', 'Priority')}</span>
                    <ArrowUpDown size={12} className="opacity-40" />
                  </div>
                </th>
                <th className="w-[95px] px-4 font-normal">{t('مرحله حیات', 'Lifecycle Stage')}</th>
                <th className="w-[95px] px-4 font-normal">{t('مسئول اقدام', 'Assignee')}</th>
                <th onClick={() => handleSort('dueDate')} className="cursor-pointer hover:text-gold w-[80px] px-4 font-normal transition-colors">
                  <div className="flex items-center gap-1">
                    <span>{t('روز سررسید', 'Due Date')}</span>
                    <ArrowUpDown size={12} className="opacity-40" />
                  </div>
                </th>
                <th onClick={() => handleSort('durationDays')} className="cursor-pointer hover:text-gold w-[60px] px-4 font-normal transition-colors">
                  <div className="flex items-center gap-1">
                    <span>{t('مدت (روز)', 'Days')}</span>
                    <ArrowUpDown size={12} className="opacity-40" />
                  </div>
                </th>
                <th className="w-[100px] px-4 font-normal">{t('وضعیت اقدام', 'Status')}</th>
                <th className="w-[60px] px-4 text-center font-normal">{t('کنترل', 'Actions')}</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/[0.03]">
              {paginatedTasks.length > 0 ? (
                paginatedTasks.map((item) => {
                  const isEditingThisRow = editingRowId === item.id;
                  const itemPriority = PRIORITY_LABELS[item.priority as Priority] || PRIORITY_LABELS.P2;
                  const itemStatus = STATUS_LABELS[item.status] || STATUS_LABELS.pending;
                  const itemStage = STAGE_LABELS[item.lifecycleStage as LifecycleStage];

                  // Checking dependencies
                  const preDeps = item.dependencies || [];
                  const postDeps = downstreamMap.get(item.id) || [];

                  return (
                    <React.Fragment key={item.id}>
                    <tr 
                      className={`h-16 group transition-colors duration-200 hover:bg-white/[0.015] ${
                        item.isMilestone ? 'bg-purple-500/[0.015] border-l-2 border-l-purple-500' : ''
                      } ${item.priority === 'P0' ? 'bg-rose-500/[0.01] border-l-2 border-l-rose-500' : ''}`}
                    >
                      {/* ID Field */}
                      <td className="px-4 font-mono text-xs font-bold text-cream/40">
                        <div className="flex items-center gap-1.5">
                          {item.tasks && item.tasks.length > 0 ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRow(item.id);
                              }}
                              className="w-5 h-5 rounded flex items-center justify-center bg-white/5 hover:bg-white/10 text-gold transition-all"
                              title={expandedRows[item.id] ? t('بستن زیرفعالیت‌ها', 'Collapse sub-activities') : t('مشاهده زیرفعالیت‌ها', 'Expand sub-activities')}
                            >
                              <ChevronRight size={12} className={`transform transition-transform ${expandedRows[item.id] ? 'rotate-90' : 'rotate-0'}`} />
                            </button>
                          ) : (
                            <div className="w-5 h-5" />
                          )}
                          <span>{item.id}</span>
                          {item.isMilestone && (
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" title={t('مایلستون', 'Milestone')} />
                          )}
                          {item.priority === 'P0' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" title={t('مسیر بحرانی', 'Critical Path')} />
                          )}
                        </div>
                      </td>

                      {/* Title & context */}
                      <td className="px-4 max-w-[360px] whitespace-normal">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <p 
                              onClick={() => {
                                if (item.tasks && item.tasks.length > 0) {
                                  toggleRow(item.id);
                                }
                              }}
                              className={`font-bold text-cream group-hover:text-gold transition-colors font-sans whitespace-normal break-words leading-relaxed ${
                                item.tasks && item.tasks.length > 0 
                                  ? 'cursor-pointer hover:underline hover:underline-offset-4 decoration-gold/30' 
                                  : ''
                              }`}
                              title={item.title}
                            >
                              {t(item.title, item.titleEn || item.title)}
                            </p>
                            {item.tasks && item.tasks.length > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleRow(item.id);
                                }}
                                className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                                  expandedRows[item.id] 
                                    ? 'bg-gold/20 border-gold/50 text-gold' 
                                    : 'bg-white/5 border-white/10 text-cream/40 hover:text-gold hover:border-gold/30'
                                }`}
                              >
                                {item.tasks.length} {t('فعالیت', 'tasks')}
                              </button>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-1 text-[9px] text-cream/30">
                            {/* Has pre-requisites */}
                            {preDeps.length > 0 && (
                              <span className="flex items-center gap-0.5 text-amber-500/70 bg-amber-500/5 px-1 py-0.1 border border-amber-500/10 rounded">
                                {t(`${preDeps.length} پیش‌نیاز`, `${preDeps.length} Pre-reqs`)}
                              </span>
                            )}
                            {/* Has downstream assets */}
                            {postDeps.length > 0 && (
                              <span className="flex items-center gap-0.5 text-blue-400/70 bg-blue-400/5 px-1 py-0.1 border border-blue-400/10 rounded">
                                {t(`${postDeps.length} پس‌نیاز`, `${postDeps.length} Dependents`)}
                              </span>
                            )}
                            {/* Strategic filament links */}
                            {item.assetId && (
                              <span className="truncate max-w-[120px] text-emerald-400/60 font-mono uppercase">
                                • {assetNameMap.get(item.assetId) || item.assetId}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Phase Name */}
                      <td className="px-4 text-xs font-sans text-cream/60 whitespace-normal">
                        {t(item.phaseName.split(':')[1] || item.phaseName, item.phaseNameEn.split(':')[1] || item.phaseNameEn)}
                      </td>

                      {/* Layer Name */}
                      <td className="px-4 text-xs font-sans text-gold/70 whitespace-normal">
                        {t(item.layerName.split(':')[1] || item.layerName, item.layerNameEn.split(':')[1] || item.layerNameEn)}
                      </td>

                      {/* Priority Field */}
                      <td className="px-4">
                        {isEditingThisRow ? (
                          <select
                            value={quickPriority}
                            onChange={(e) => setQuickPriority(e.target.value as Priority)}
                            className="text-[11px] font-sans bg-black border border-white/20 text-cream rounded px-1.5 py-1 focus:outline-none"
                          >
                            <option value="P0">P0 {t('بحرانی', 'Critical')}</option>
                            <option value="P1">P1 {t('مهم', 'High')}</option>
                            <option value="P2">P2 {t('معمولی', 'Normal')}</option>
                            <option value="P3">P3 {t('پایین', 'Low')}</option>
                          </select>
                        ) : (
                          <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-full ${itemPriority.badge}`}>
                            {t(itemPriority.fa, itemPriority.en)}
                          </span>
                        )}
                      </td>

                      {/* Lifecycle stage */}
                      <td className="px-4">
                        {itemStage ? (
                          <span className={`text-[10px] px-2 py-0.5 border rounded-md ${itemStage.badge}`}>
                            {t(itemStage.fa, itemStage.en)}
                          </span>
                        ) : (
                          <span className="text-cream/20">-</span>
                        )}
                      </td>

                      {/* Assignee Field */}
                      <td className="px-4 text-xs text-cream/70 font-sans whitespace-normal">
                        {isEditingThisRow ? (
                           <input
                             type="text"
                             value={quickAssignee}
                             onChange={(e) => setQuickAssignee(e.target.value)}
                             placeholder={t('نام مسئول...', 'Name...')}
                             className="w-full text-[11px] font-sans bg-black border border-white/20 text-cream rounded px-1.5 py-1 focus:outline-none"
                           />
                        ) : (
                           <div className="flex items-center gap-1">
                             {item.assignee ? (
                               <>
                                 <Users size={11} className="text-cream/30 shrink-0" />
                                 <span className="whitespace-normal break-words">{item.assignee}</span>
                               </>
                             ) : (
                               <span className="text-cream/20 font-light italic">{t('نامشخص', 'Unassigned')}</span>
                             )}
                           </div>
                        )}
                      </td>

                      {/* Due date */}
                      <td className="px-4 text-xs font-mono text-cream/60">
                        {item.dueDate || <span className="text-cream/20">-</span>}
                      </td>

                      {/* Duration */}
                      <td className="px-4 text-xs font-mono text-cream/60">
                        {item.durationDays ? `${item.durationDays} ${t('روز', 'd')}` : <span className="text-cream/20">-</span>}
                      </td>

                      {/* Status Field */}
                      <td className="px-4">
                        {isEditingThisRow ? (
                          <select
                            value={quickStatus}
                            onChange={(e) => setQuickStatus(e.target.value)}
                            className="text-[11px] font-sans bg-black border border-white/20 text-cream rounded px-1.5 py-1 focus:outline-none"
                          >
                            <option value="pending">{t('باقیمانده', 'Pending')}</option>
                            <option value="in-progress">{t('در جریان', 'In Progress')}</option>
                            <option value="completed">{t('تکمیل شده', 'Completed')}</option>
                          </select>
                        ) : (
                          <span className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 border rounded-full ${itemStatus.badge}`}>
                            {React.createElement(itemStatus.icon, { size: 10 })}
                            <span className="font-sans">{t(itemStatus.fa, itemStatus.en)}</span>
                          </span>
                        )}
                      </td>

                      {/* Actions Controls (Row click triggers sliding drawer) */}
                      <td className="px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {isEditingThisRow ? (
                            <>
                              <button 
                                onClick={() => saveQuickInlineEdit(item)}
                                className="p-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                                title={t('ذخیره', 'Save')}
                              >
                                <Check size={14} />
                              </button>
                              <button 
                                onClick={() => setEditingRowId(null)}
                                className="p-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all"
                                title={t('انصراف', 'Cancel')}
                              >
                                <X size={14} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => startQuickInlineEdit(item)}
                                className="p-1 rounded bg-white/5 border border-white/5 text-gold hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
                                title={t('ویرایش سریع', 'Quick Edit')}
                              >
                                <Zap size={13} />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedTask(item); 
                                  setIsEditingInPanel(false);
                                  setTempTaskState({ ...item });
                                }}
                                className="p-1 rounded bg-white/5 border border-white/5 text-cream/70 hover:bg-white/10 hover:text-cream transition-all"
                                title={t('مشاهده جزئیات', 'View Details')}
                              >
                                <Eye size={13} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedRows[item.id] && item.tasks && item.tasks.length > 0 && (() => {
                      const activeStage = getActiveStage(item.id);
                      
                      // Grouping subtasks systematically:
                      const groupedSubTasks: Record<LifecycleStage, TaskItem[]> = {
                        STRATEGY: [],
                        CONTENT: [],
                        INFRASTRUCTURE: [],
                        TRAINING: [],
                        EXECUTION: [],
                        INTELLIGENCE: []
                      };
                      
                      (item.tasks || []).forEach(st => {
                        const stage = st.lifecycleStage as LifecycleStage;
                        if (stage && groupedSubTasks[stage]) {
                          groupedSubTasks[stage].push(st);
                        } else {
                          // Logical fallback parsed from subtask ID string pattern
                          if (st.id.includes('-s')) groupedSubTasks.STRATEGY.push(st);
                          else if (st.id.includes('-c')) groupedSubTasks.CONTENT.push(st);
                          else if (st.id.includes('-i')) groupedSubTasks.INFRASTRUCTURE.push(st);
                          else if (st.id.includes('-t')) groupedSubTasks.TRAINING.push(st);
                          else if (st.id.includes('-e')) groupedSubTasks.EXECUTION.push(st);
                          else if (st.id.includes('-y') || st.id.includes('-g')) groupedSubTasks.INTELLIGENCE.push(st);
                          else groupedSubTasks.STRATEGY.push(st);
                        }
                      });

                      const STAGE_STEPS_CONFIG = [
                        { key: 'STRATEGY' as LifecycleStage, labelFa: 'سند استراتژیک', labelEn: 'Strategy Doc', icon: FileText, color: 'text-emerald-400', barBg: 'bg-emerald-500', glow: 'shadow-emerald-500/20', border: 'border-emerald-500/30' },
                        { key: 'CONTENT' as LifecycleStage, labelFa: 'محتوا و روایت', labelEn: 'Content & Story', icon: Video, color: 'text-sky-400', barBg: 'bg-sky-500', glow: 'shadow-sky-500/20', border: 'border-sky-500/30' },
                        { key: 'INFRASTRUCTURE' as LifecycleStage, labelFa: 'ساخت و تجهیز', labelEn: 'Core Infrastructure', icon: Hammer, color: 'text-orange-400', barBg: 'bg-orange-500', glow: 'shadow-orange-500/20', border: 'border-orange-500/30' },
                        { key: 'TRAINING' as LifecycleStage, labelFa: 'آموزش و انتقال', labelEn: 'Training System', icon: GraduationCap, color: 'text-purple-400', barBg: 'bg-purple-500', glow: 'shadow-purple-500/20', border: 'border-purple-500/30' },
                        { key: 'EXECUTION' as LifecycleStage, labelFa: 'اجرا و توسعه', labelEn: 'Market Launch', icon: Play, color: 'text-rose-400', barBg: 'bg-rose-500', glow: 'shadow-rose-500/20', border: 'border-rose-500/30' },
                        { key: 'INTELLIGENCE' as LifecycleStage, labelFa: 'هوشمندی و مانیتور', labelEn: 'Intelligence Audit', icon: Brain, color: 'text-fuchsia-400', barBg: 'bg-fuchsia-500', glow: 'shadow-fuchsia-500/20', border: 'border-fuchsia-500/30' },
                      ];

                      return (
                        <tr className="bg-black/45 animate-in fade-in duration-300 font-sans">
                          <td colSpan={11} className="p-0 border-l-2 border-l-gold relative">
                            {/* Sticky container that locks onto the visible viewport of table container */}
                            <div className="sticky right-0 left-0 w-full max-w-[calc(100vw-355px)] lg:max-w-[calc(100vw-345px)] xl:max-w-full overflow-hidden p-6 bg-[#09090b]/90">
                              {/* Ambient background glow inside expansion panel */}
                              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
                              
                              <div className="space-y-6 text-right relative z-10 w-full">
                                {/* Header Card inside panel */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-4">
                                  <div className="space-y-1">
                                    <h4 className="text-sm font-black text-gold flex items-center gap-2">
                                      <TableProperties size={15} className="text-gold" />
                                      <span>
                                        {t(
                                          `چرخه حیات شش مرحله‌ای زیرپروژه ${item.id}`, 
                                          `6-Stage Lifecycle Cycle for Sub-Project ${item.id}`
                                        )}
                                      </span>
                                    </h4>
                                    <p className="text-[10px] text-cream/40 font-sans">
                                      {t(
                                        'برای ناوبری در فعالیت‌ها و مشاهده جزئیات فازی بر روی گام‌های نقشه راه کلیک کنید.',
                                        'Click on the roadmap stages to navigate through detailed phased activities.'
                                      )}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl self-start md:self-auto select-none">
                                    <span className="text-[10px] text-cream/60 font-sans">
                                      {t('پیشرفت کلی زیرفعالیت‌ها:', 'Overall sub-activities progress:')}
                                    </span>
                                    <span className="text-xs font-bold text-gold font-mono">
                                      {item.tasks.filter(st => st.status === 'completed' || st.status === 'done' || st.status === 'approved').length} / {item.tasks.length}
                                    </span>
                                    <div className="w-16 bg-white/10 h-1.5 rounded-full overflow-hidden ml-1.5">
                                      <div 
                                        className="bg-gold h-full rounded-full" 
                                        style={{ width: `${Math.round((item.tasks.filter(st => st.status === 'completed' || st.status === 'done' || st.status === 'approved').length / item.tasks.length) * 100)}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>

                              {/* 1. HORIZONTAL FUZZY ROADMAP PIPELINE (TAB STEPS) */}
                              <div className="relative">
                                {/* Connection pipeline wire behind buttons */}
                                <div className="hidden lg:block absolute top-[2.35rem] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-emerald-500/20 via-orange-500/20 via-rose-500/20 to-fuchsia-500/20 z-0" />
                                
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 md:gap-4 relative z-10 select-none">
                                  {STAGE_STEPS_CONFIG.map((step, idx) => {
                                    const stepTasks = groupedSubTasks[step.key] || [];
                                    const totalCount = stepTasks.length;
                                    const doneCount = stepTasks.filter(x => x.status === 'completed' || x.status === 'done' || x.status === 'approved').length;
                                    const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
                                    const isCompleted = totalCount > 0 && doneCount === totalCount;
                                    const isActive = activeStage === step.key;
                                    const StepIcon = step.icon;

                                    return (
                                      <motion.div
                                        key={step.key}
                                        onClick={() => setActiveStage(item.id, step.key)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`p-3 rounded-2xl border transition-all duration-300 text-center cursor-pointer flex flex-col justify-between min-h-[92px] w-full relative overflow-hidden ${
                                          isActive 
                                            ? `bg-[#141417]/90 border-gold/60 shadow-[0_0_15px_rgba(197,160,89,0.25)] ${step.glow}`
                                            : totalCount === 0
                                            ? 'bg-white/[0.005] border-white/5 opacity-50 text-cream/30 hover:opacity-75'
                                            : isCompleted
                                            ? `bg-white/[0.02] ${step.border} border-dashed text-cream hover:bg-white/[0.04]`
                                            : `bg-white/[0.015] border-white/5 text-cream/60 hover:text-cream hover:bg-white/[0.03]`
                                        }`}
                                      >
                                        {/* Step label index marker */}
                                        <div className="absolute top-1.5 left-2 font-mono text-[9px] font-black opacity-30">
                                          {String(idx + 1).padStart(2, '0')}
                                        </div>

                                        <div className="flex flex-col items-center gap-1.5 pt-1.5 pb-2">
                                          <div className={`p-1.5 rounded-lg ${isActive ? step.barBg + '/15' : 'bg-white/5'}`}>
                                            <StepIcon size={16} className={isActive ? step.color : 'text-cream/40'} />
                                          </div>
                                          <div className="space-y-0.5">
                                            <p className="text-[11px] font-black tracking-tight leading-none font-sans">
                                              {lang === 'fa' ? step.labelFa : step.labelEn}
                                            </p>
                                            <p className="text-[8px] opacity-40 uppercase tracking-widest leading-none font-sans scale-90">
                                              {step.key}
                                            </p>
                                          </div>
                                        </div>

                                        {/* Miniature progress status */}
                                        <div className="border-t border-white/5 pt-1.5 flex items-center justify-between text-[8px] font-mono shrink-0">
                                          {totalCount > 0 ? (
                                            <>
                                              <span className={doneCount === totalCount ? 'text-emerald-400 font-bold' : 'text-cream/40'}>
                                                {doneCount}/{totalCount}
                                              </span>
                                              <span className={isActive ? 'text-gold font-bold' : 'text-cream/50'}>
                                                {progressPercent}%
                                              </span>
                                            </>
                                          ) : (
                                            <span className="text-[8px] text-cream/25 w-full text-center">
                                              {t('فاقد فعالیت', 'No actions')}
                                            </span>
                                          )}
                                        </div>

                                        {/* Status glowing bar under horizontal tab */}
                                        {isActive && (
                                          <motion.div 
                                            layoutId={`active-bar-expansion-${item.id}`} 
                                            className={`absolute bottom-0 left-0 right-0 h-[3px] ${step.barBg}`} 
                                          />
                                        )}
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* 2. DIRECT DETAILED ACTIVITIES FEEDBACK FOR THE SELECTED TAB - NO VERTICAL DUPLICATION */}
                              <div className="mt-4 animate-in fade-in duration-300">
                                {(() => {
                                  const currentStepConfig = STAGE_STEPS_CONFIG.find(s => s.key === activeStage) || STAGE_STEPS_CONFIG[0];
                                  const stepTasks = groupedSubTasks[activeStage] || [];
                                  const totalCount = stepTasks.length;
                                  const doneCount = stepTasks.filter(x => x.status === 'completed' || x.status === 'done' || x.status === 'approved').length;
                                  const StepIcon = currentStepConfig.icon;

                                  return (
                                    <div className={`rounded-2xl border ${currentStepConfig.border} bg-white/[0.015] p-5 space-y-4`}>
                                      {/* Selected Stage Banner */}
                                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                        <div className="flex items-center gap-2.5">
                                          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/5 border border-white/5">
                                            <StepIcon size={14} className={currentStepConfig.color} />
                                          </div>
                                          <div>
                                            <h5 className="text-xs font-black text-cream font-sans flex items-center gap-2">
                                              <span>{t('فعالیت‌های گام:', 'Step activities:')}</span>
                                              <span className={currentStepConfig.color}>
                                                {lang === 'fa' ? currentStepConfig.labelFa : currentStepConfig.labelEn}
                                              </span>
                                            </h5>
                                            <p className="text-[8px] text-cream/35 uppercase tracking-wider font-mono">
                                              {activeStage}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="text-[10px] font-mono text-cream/45 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                                          {doneCount} / {totalCount} {t('تکمیل شده', 'Completed')}
                                        </div>
                                      </div>

                                      {/* Sub-Activities Grid */}
                                      {stepTasks.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                          {stepTasks.map((st, sIdx) => (
                                            <div 
                                              key={st.id} 
                                              className="p-4 rounded-xl bg-black/25 border border-white/5 hover:border-gold/30 hover:bg-white/[0.02] transition-all flex flex-col justify-between gap-3 text-right"
                                            >
                                              <div className="space-y-1.5">
                                                <div className="flex items-center justify-between gap-2">
                                                  <div className="flex items-center gap-2">
                                                    <span className="text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center bg-gold/10 text-gold border border-gold/20 font-mono">
                                                      {sIdx + 1}
                                                    </span>
                                                    <span className="text-[8px] font-mono font-bold text-cream/40 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded">
                                                      {st.id}
                                                    </span>
                                                  </div>
                                                  <span className={`text-[8px] font-black px-1.5 py-0.5 border rounded-md font-mono ${
                                                    st.priority === 'P0' 
                                                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                                                      : st.priority === 'P1' 
                                                      ? 'bg-gold/10 border-gold/20 text-gold'
                                                      : 'bg-white/5 border-white/5 text-cream/40'
                                                  }`}>
                                                    {st.priority || 'P2'}
                                                  </span>
                                                </div>
                                                <p className="text-xs font-semibold text-cream leading-relaxed font-sans line-clamp-2" title={t(st.title, st.titleEn || '')}>
                                                  {t(st.title, st.titleEn || '')}
                                                </p>
                                              </div>

                                              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3 select-none">
                                                {/* Interactive selectors */}
                                                <div className="flex items-center gap-1.5">
                                                  <select
                                                    value={st.status}
                                                    onChange={(e) => {
                                                      const nextStatus = e.target.value as any;
                                                      onUpdateTask({
                                                        ...item,
                                                        tasks: (item.tasks || []).map(x => x.id === st.id ? { ...x, status: nextStatus } : x)
                                                      });
                                                    }}
                                                    className="text-[9px] font-sans bg-[#0c0c0e] border border-white/10 text-cream/70 rounded px-1.5 py-0.5 focus:outline-none focus:border-gold/40 cursor-pointer"
                                                  >
                                                    <option value="pending">{t('باقیمانده', 'Pending')}</option>
                                                    <option value="in-progress">{t('در جریان', 'In Progress')}</option>
                                                    <option value="completed">{t('تکمیل شده', 'Completed')}</option>
                                                  </select>

                                                  <select
                                                    value={st.priority || 'P2'}
                                                    onChange={(e) => {
                                                      const nextPriority = e.target.value as Priority;
                                                      onUpdateTask({
                                                        ...item,
                                                        tasks: (item.tasks || []).map(x => x.id === st.id ? { ...x, priority: nextPriority } : x)
                                                      });
                                                    }}
                                                    className="text-[9px] font-sans bg-[#0c0c0e] border border-white/10 text-cream/70 rounded px-1.5 py-0.5 focus:outline-none focus:border-gold/40 cursor-pointer"
                                                  >
                                                    <option value="P0">P0</option>
                                                    <option value="P1">P1</option>
                                                    <option value="P2">P2</option>
                                                    <option value="P3">P3</option>
                                                  </select>
                                                </div>

                                                {/* Assignee & Due Date */}
                                                <div className="flex items-center gap-1.5 text-[9px] text-cream/40 font-sans">
                                                  {st.assignee && (
                                                    <span className="bg-white/5 rounded px-2 py-0.5 border border-white/5 max-w-[90px] truncate" title={st.assignee}>
                                                      {st.assignee}
                                                    </span>
                                                  )}
                                                  {st.dueDate && (
                                                    <span className="font-mono text-[8px] bg-white/5 rounded px-1.5 py-0.5 border border-white/5 text-cream/35">
                                                      {st.dueDate}
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="py-8 text-center text-cream/30 flex flex-col items-center justify-center gap-1.5 border border-dashed border-white/5 rounded-2xl select-none">
                                          <Info size={18} className="opacity-40 text-gold" />
                                          <p className="text-xs font-sans">
                                            {t(
                                              'هیچ فعالیتی در این مرحله برای این زیرپروژه تعریف نشده است.', 
                                              'No activities defined in this stage for this sub-project.'
                                            )}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                    })()}
                  </React.Fragment>
                );
              })
              ) : (
                <tr className="h-32 text-center">
                  <td colSpan={11} className="px-4 py-8 text-cream/30">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <HelpCircle size={28} className="opacity-40" />
                      <p className="font-sans text-sm">{t('هیچ فعالیتی با فیلترهای اعمال شده یافت نشد.', 'No matching activities found for applied filters.')}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-white/[0.02] border-t border-white/5 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-2">
            <span className="text-xs text-cream/40 font-sans">{t('نمایش', 'Show')}</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              className="text-xs bg-black/40 border border-white/5 text-cream/80 py-1.5 px-3 rounded-lg focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={-1}>{t('نمایش همه', 'All')}</option>
            </select>
            <span className="text-xs text-cream/40 font-sans">
              {t(
                `از مجموع ${sortedTasks.length} رکورد فیلتر شده`,
                `out of ${sortedTasks.length} filtered items`
              )}
            </span>
          </div>

          {pageSize !== -1 && totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-2 bg-white/5 border border-white/5 rounded-lg text-cream/50 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                {lang === 'fa' ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </button>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                // simple pagination range helper (centering on currentPage if lots)
                let pageNumber = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNumber = currentPage - 3 + i;
                  if (pageNumber + (5 - i - 1) > totalPages) {
                    pageNumber = totalPages - 4 + i;
                  }
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all duration-200 ${
                      currentPage === pageNumber
                        ? 'bg-gold text-onyx shadow-lg shadow-gold/20'
                        : 'bg-white/5 hover:bg-white/10 text-cream/70'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage + 2 < totalPages && (
                <>
                  <span className="text-cream/30 text-xs px-1">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gold text-onyx'
                        : 'bg-white/5 hover:bg-white/10 text-cream/70'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-2 bg-white/5 border border-white/5 rounded-lg text-cream/50 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                {lang === 'fa' ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 5. SLIDE-OVER DRAWER FOR DETAILED PRE-REQUISITES & CONNECTIONS */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Soft Backing Mask */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedTask(null); setIsEditingInPanel(false); }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Panel Body */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg md:max-w-2xl bg-[#0a0f18] border-l border-white/10 h-full flex flex-col z-10 p-6 md:p-8 text-right group-ltr:text-left overflow-y-auto custom-scrollbar shadow-2xl"
            >
              {/* Top Row with ID & Close */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="bg-gold/10 text-gold border border-gold/30 font-mono text-xs font-bold px-2.5 py-1 rounded-md">
                    {selectedTask.id}
                  </span>
                  {selectedTask.isMilestone && (
                    <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold px-2 py-0.5 rounded">
                      {t('مایلستون طلایی', 'Golden Milestone')}
                    </span>
                  )}
                  {selectedTask.priority === 'P0' && (
                    <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold px-2 py-0.5 rounded">
                      {t('مسیر بحرانی فرابخش', 'Critical Path')}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {onNavigateToTask && selectedTask.phaseId && selectedTask.layerId && (
                    <button
                      onClick={() => {
                        // Resolve Phase Index based on ID
                        const phaseIndex = ['phase-1', 'phase-2', 'phase-3', 'phase-4'].indexOf(selectedTask.phaseId);
                        if (phaseIndex !== -1) {
                          onNavigateToTask(selectedTask.id, phaseIndex, selectedTask.layerId || '');
                          setSelectedTask(null);
                        }
                      }}
                      className="text-xs bg-gold/10 border border-gold/15 hover:bg-gold hover:text-onyx text-gold transition-all rounded-lg px-3 py-1.5 font-sans font-bold"
                    >
                      {t('مشاهده در موقعیت شجره‌نامه (WBS)', 'Reveal in WBS Structure')}
                    </button>
                  )}
                  <button 
                    onClick={() => { setSelectedTask(null); setIsEditingInPanel(false); }} 
                    className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-cream/40 hover:text-cream transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Panel Content Scroll Container */}
              <div className="flex-1 space-y-6">
                {/* 1. Hierarchy Location */}
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between text-xs text-cream/50">
                  <span className="font-sans font-semibold">
                    {t('فاز:', 'Phase:')} <span className="text-cream font-bold">{t(selectedTask.phaseName.split(':')[1] || selectedTask.phaseName, selectedTask.phaseNameEn.split(':')[1] || selectedTask.phaseNameEn)}</span>
                  </span>
                  <span className="opacity-20">|</span>
                  <span className="font-sans font-semibold">
                    {t('زیرگروه:', 'Layer:')} <span className="text-gold font-bold">{t(selectedTask.layerName.split(':')[1] || selectedTask.layerName, selectedTask.layerNameEn.split(':')[1] || selectedTask.layerNameEn)}</span>
                  </span>
                </div>

                {/* 2. Title block */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-cream font-sans">
                    {selectedTask.title}
                  </h3>
                  {selectedTask.titleEn && (
                    <p className="text-xs font-mono text-cream/40 italic">
                      {selectedTask.titleEn}
                    </p>
                  )}
                </div>

                {/* Edit Toggle buttons */}
                <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <span className="text-xs font-semibold text-cream/40">{t('ویرایش اطلاعات فعالیت تفصیلی', 'Modify sub-project parameters')}</span>
                  <button
                    onClick={() => {
                      if (isEditingInPanel) {
                        setIsEditingInPanel(false);
                      } else {
                        setTempTaskState({ ...selectedTask });
                        setIsEditingInPanel(true);
                      }
                    }}
                    className={`text-xs font-bold font-sans px-3.5 py-1.5 rounded-xl border transition-all ${
                      isEditingInPanel 
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                        : 'bg-gold/10 border-gold/30 text-gold hover:bg-gold/25'
                    }`}
                  >
                    {isEditingInPanel ? t('لغو ویرایش', 'Cancel') : t('ویرایش پارامترها', 'Edit Parameters')}
                  </button>
                </div>

                {/* 3. Operational Metadata Parameter Form / Display */}
                {isEditingInPanel && tempTaskState ? (
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-4">
                    <p className="text-xs text-gold/80 font-bold border-b border-white/5 pb-2">{t('فرم ویرایش اطلاعات', 'Edit Form')}</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {/* Status select */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-cream/40">{t('وضعیت اقدام', 'Status')}</label>
                        <select
                          value={tempTaskState.status}
                          onChange={(e) => setTempTaskState({ ...tempTaskState, status: e.target.value as any })}
                          className="w-full text-xs font-sans bg-black/60 border border-white/10 text-cream rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40"
                        >
                          <option value="pending">{t('باقیمانده', 'Pending')}</option>
                          <option value="in-progress">{t('در جریان', 'In Progress')}</option>
                          <option value="completed">{t('تکمیل شده', 'Completed')}</option>
                        </select>
                      </div>

                      {/* Priority select */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-cream/40">{t('اولویت / مسیر بحرانی', 'Priority')}</label>
                        <select
                          value={tempTaskState.priority || 'P2'}
                          onChange={(e) => setTempTaskState({ ...tempTaskState, priority: e.target.value as Priority })}
                          className="w-full text-xs font-sans bg-black/60 border border-white/10 text-cream rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40"
                        >
                          <option value="P0">P0 {t('بحرانی (مسیر بحرانی)', 'Critical Path')}</option>
                          <option value="P1">P1 {t('اولویت بالا / مهم', 'High')}</option>
                          <option value="P2">P2 {t('معمولی / عادی', 'Normal')}</option>
                          <option value="P3">P3 {t('اولویت کم / ثانویه', 'Low')}</option>
                        </select>
                      </div>

                      {/* Assignee */}
                      <div className="space-y-1 col-span-2">
                        <label className="text-[10px] text-cream/40">{t('مسئول اقدام', 'Assignee')}</label>
                        <input
                          type="text"
                          value={tempTaskState.assignee || ''}
                          onChange={(e) => setTempTaskState({ ...tempTaskState, assignee: e.target.value })}
                          className="w-full text-xs font-sans bg-black/60 border border-white/10 text-cream rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40"
                          placeholder={t('مسئول انجام این فعالیت...', 'Operational lead...')}
                        />
                      </div>

                      {/* Due Date */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-cream/40">{t('تاریخ سررسید سررسند', 'Due Date')}</label>
                        <input
                          type="text"
                          value={tempTaskState.dueDate || ''}
                          onChange={(e) => setTempTaskState({ ...tempTaskState, dueDate: e.target.value })}
                          className="w-full text-xs font-mono bg-black/60 border border-white/10 text-cream rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40 text-center"
                          placeholder="1405/06/31"
                        />
                      </div>

                      {/* Duration */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-cream/40">{t('مدت زمان تخمینی (روز)', 'Duration (Days)')}</label>
                        <input
                          type="number"
                          value={tempTaskState.durationDays || ''}
                          onChange={(e) => setTempTaskState({ ...tempTaskState, durationDays: Number(e.target.value) || undefined })}
                          className="w-full text-xs font-mono bg-black/60 border border-white/10 text-cream rounded-xl py-2 px-3 focus:outline-none focus:border-gold/40 text-center"
                          placeholder="e.g. 15"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={savePanelEdit}
                        className="flex items-center gap-1.5 text-xs font-bold font-sans bg-emerald-500 text-black px-4 py-2 rounded-xl hover:bg-emerald-400 transition-all cursor-pointer"
                      >
                        <CheckCircle2 size={13} />
                        <span>{t('ذخیره نهایی تغییرات', 'Save Changes')}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <p className="text-[9px] text-cream/40 uppercase font-black">{t('وضعیت اقدام', 'Status')}</p>
                      <p className="text-xs font-bold font-sans mt-1 text-cream">
                        {t(STATUS_LABELS[selectedTask.status]?.fa || selectedTask.status, STATUS_LABELS[selectedTask.status]?.en || selectedTask.status)}
                      </p>
                    </div>
                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <p className="text-[9px] text-cream/40 uppercase font-black">{t('درجه اهمیت', 'Importance')}</p>
                      <p className="text-xs font-bold font-sans mt-1 text-gold">
                        {t(PRIORITY_LABELS[selectedTask.priority as Priority]?.fa || 'معمولی', PRIORITY_LABELS[selectedTask.priority as Priority]?.en || 'Normal')}
                      </p>
                    </div>
                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <p className="text-[9px] text-cream/40 uppercase font-black">{t('مسئول انجام', 'Assignee')}</p>
                      <p className="text-xs font-semibold font-sans mt-1 text-cream">
                        {selectedTask.assignee || t('تیم‌های چابک شرکت', 'Agile Operations')}
                      </p>
                    </div>
                    <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <p className="text-[9px] text-cream/40 uppercase font-black">{t('مهلت و مدت', 'Timeline')}</p>
                      <p className="text-xs font-mono mt-1 text-cream">
                        {selectedTask.dueDate ? `${selectedTask.dueDate} (${selectedTask.durationDays || 5}d)` : t('در جریان پیوسته', 'Continuous')}
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. Description */}
                {(selectedTask.description || selectedTask.descriptionEn) && (
                  <div className="space-y-2 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
                    <p className="text-[10px] text-gold font-bold uppercase tracking-wider">{t('تشریح ساختار و جزئیات عملیات', 'Strategic Description')}</p>
                    {selectedTask.description && (
                      <p className="text-xs text-cream/80 leading-relaxed font-sans">{selectedTask.description}</p>
                    )}
                    {selectedTask.descriptionEn && (
                      <p className="text-[11px] text-cream/40 leading-relaxed italic font-mono pt-1">{selectedTask.descriptionEn}</p>
                    )}
                  </div>
                )}

                {/* 5. INTERACTIVE RELATIONSHIP CHAIN GRAPH / MAP */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gold border-b border-white/5 pb-2 flex items-center gap-2">
                    <Target size={15} />
                    <span>{t('شبکه پیش‌نیازها و روابط ارگانیک', 'Task Relationship Matrix')}</span>
                  </h4>

                  {/* Pre-requisite tasks list */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-cream/40">{t('فعالیت‌های پیش‌نیاز (باید قبل از این تسک انجام شوند)', 'Pre-requisite Tasks (Must be completed first)')}</p>
                    {selectedTask.dependencies && selectedTask.dependencies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedTask.dependencies.map(depId => {
                          const originalItem = tasks.find(t => t.id === depId);
                          return (
                            <button
                              key={depId}
                              onClick={() => handleDependencyChipClick(depId)}
                              className="group/btn text-right flex flex-col p-2.5 bg-amber-500/5 hover:bg-amber-500/15 border border-amber-500/20 rounded-xl text-xs text-amber-400 font-sans transition-all duration-200 cursor-pointer max-w-xs"
                            >
                              <div className="flex items-center gap-1 font-mono font-bold text-[10px]">
                                <Zap size={10} />
                                <span>{depId}</span>
                              </div>
                              {originalItem && (
                                <span className="text-[9px] leading-tight text-cream/60 truncate group-hover/btn:text-gold block max-w-[200px] mt-1">
                                  {lang === 'fa' ? originalItem.title : (originalItem.titleEn || originalItem.title)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl text-[11px] text-cream/30 italic font-sans">
                        {t('این فعالیت فاقد پیش‌نیاز است و بلافاصله آماده بهره‌برداری است.', 'This action has zero entry blockers and can start immediately.')}
                      </div>
                    )}
                  </div>

                  {/* Downstream dependent tasks list (Computed dynamically) */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] text-cream/40">{t('فعالیت‌های پس‌نیاز (انجام آن‌ها متوقف بر فعال‌سازی این تسک است)', 'Downstream Dependents (These require this task to proceed)')}</p>
                    {downstreamMap.get(selectedTask.id) && (downstreamMap.get(selectedTask.id) || []).length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {(downstreamMap.get(selectedTask.id) || []).map(dependentId => {
                          const originalItem = tasks.find(t => t.id === dependentId);
                          return (
                            <button
                              key={dependentId}
                              onClick={() => handleDependencyChipClick(dependentId)}
                              className="group/btn text-right flex flex-col p-2.5 bg-blue-500/5 hover:bg-blue-500/15 border border-blue-500/20 rounded-xl text-xs text-blue-400 font-sans transition-all duration-200 cursor-pointer max-w-xs"
                            >
                              <div className="flex items-center gap-1 font-mono font-bold text-[10px]">
                                <Clock size={10} />
                                <span>{dependentId}</span>
                              </div>
                              {originalItem && (
                                <span className="text-[9px] leading-tight text-cream/60 truncate group-hover/btn:text-gold block max-w-[200px] mt-1">
                                  {lang === 'fa' ? originalItem.title : (originalItem.titleEn || originalItem.title)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl text-[11px] text-cream/30 italic font-sans">
                        {t('هیچ فعالیت تفصیلی در زنجیره آتی مستقیماً به بستن نهایی این تسک تکیه ندارد.', 'No upstream elements actively depend on this milestone.')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
