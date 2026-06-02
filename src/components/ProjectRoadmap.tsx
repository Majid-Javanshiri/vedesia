import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Layers, Clock, Star, ArrowRight, Zap, Target, 
  Link2, Rocket, Compass, ChevronDown, ChevronUp, Info, HelpCircle,
  Minimize2, Maximize2, ZoomIn, ZoomOut, Check, Sparkles
} from 'lucide-react';
import { Phase, TaskItem, Layer } from '../types';

interface GanttChartProps {
  phases: Phase[];
  t: (fa: string, en: string) => string;
}

// Helpers for date processing
const jalaliToNumeric = (jDate: string) => {
  const [y, m, d] = jDate.split('/').map(Number);
  // Jalali month lengths: 6 months of 31 days, 5 months of 30 days, 1 month of 29/30
  let days = y * 365 + d;
  for (let i = 1; i < m; i++) {
    if (i <= 6) days += 31;
    else if (i <= 11) days += 30;
    else days += 29;
  }
  // Add leap years roughly for the 1400s
  days += Math.floor(y / 4);
  return days;
};

const numericToJalali = (numeric: number) => {
  let y = Math.floor(numeric / 365.25);
  let remain = numeric - (y * 365 + Math.floor(y / 4));
  
  if (remain <= 0) {
    y--;
    remain = numeric - (y * 365 + Math.floor(y / 4));
  }
  
  let m = 1;
  while (remain > 0) {
    let daysInMonth = 30;
    if (m <= 6) daysInMonth = 31;
    else if (m <= 11) daysInMonth = 30;
    else daysInMonth = 29;
    
    if (remain <= daysInMonth) {
      break;
    }
    remain -= daysInMonth;
    m++;
  }
  let d = Math.max(1, Math.round(remain));
  return `${y}/${m < 10 ? `0${m}` : m}/${d < 10 ? `0${d}` : d}`;
};

const LIFECYCLE_STAGE_META: Record<string, { fa: string; en: string; text: string; bg: string; border: string }> = {
  STRATEGY: { fa: '۱. استراتژی و اسناد', en: '1. Strategy & Documents', text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/25' },
  CONTENT: { fa: '۲. محتوا و کاتالوگ', en: '2. Content & Creative Assets', text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/25' },
  INFRASTRUCTURE: { fa: '۳. زیرساخت و پلتفرم', en: '3. Digital Infrastructure', text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/25' },
  TRAINING: { fa: '۴. آموزش و ابزارهای فروش', en: '4. Network Training & LMS', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/25' },
  EXECUTION: { fa: '۵. عملیات و کمپین', en: '5. Execution & Campaign Live', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
  INTELLIGENCE: { fa: '۶. هوش تجاری و آمار', en: '6. BI & Feedback Loops', text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/25' }
};

export const ProjectRoadmap: React.FC<GanttChartProps> = ({ phases, t }) => {
  // Expansion state for showing subtasks under each layer
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({});
  // Granular Tasks Sorting and Grouping Mode
  const [granularSortMode, setGranularSortMode] = useState<'chronological' | 'lifecycle' | 'priority'>('lifecycle');
  // Toggle to show/hide SVG dependency connectors
  const [showDependencyLines, setShowDependencyLines] = useState<boolean>(true);
  // Hovered layer track for active highlighting of prerequisites
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);
  // Hovered sub-task track for detailed interaction
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  // Selected sub-project checkpoint tooltip for sticky pinning on click
  const [selectedChkId, setSelectedChkId] = useState<string | null>(null);
  // Coordinates cache of each layer bar in the DOM
  const [coords, setCoords] = useState<Record<string, { xStart: number; y: number; xEnd: number }>>({});
  
  // High-performance zooming parameter (width in percentage, from 100 to 250)
  const [zoomScale, setZoomScale] = useState<number>(100);
  // Complete presentation overlay toggle
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Extract all top-level tasks to map timeline boundaries
  const allTasks = useMemo(() => {
    const tasks: (TaskItem & { phaseName: string; layerName: string; phaseId: string; start: number; end: number })[] = [];
    phases.forEach(p => {
      p.layers.forEach(l => {
        l.tasks.forEach(task => {
          const end = jalaliToNumeric(task.dueDate || '1405/01/01');
          const start = end - (task.durationDays || 0);
          tasks.push({ ...task, phaseName: p.name, layerName: l.name, phaseId: p.id, start, end });
        });
      });
    });
    return tasks;
  }, [phases]);

  // Overall timeline bounding range
  const timeRange = useMemo(() => {
    if (allTasks.length === 0) return { min: jalaliToNumeric('1405/01/01'), max: jalaliToNumeric('1406/12/29'), total: 720 };
    const starts = allTasks.map(t => t.start);
    const ends = allTasks.map(t => t.end);
    // Expand range slightly for UI breathing room
    const minVal = Math.min(...starts, jalaliToNumeric('1405/01/01')) - 10;
    const maxVal = Math.max(...ends, jalaliToNumeric('1406/12/30')) + 10;
    const total = maxVal - minVal || 1;
    return { min: minVal, max: maxVal, total };
  }, [allTasks]);

  const getPositionByNumeric = (numeric: number) => {
    // Calculates percentage from the start (RTL context shifts this gracefully)
    return ((numeric - timeRange.min) / timeRange.total) * 100;
  };

  const getPosition = (date: string) => {
    return getPositionByNumeric(jalaliToNumeric(date));
  };

  const getWidth = (duration: number) => {
    return (duration / timeRange.total) * 100;
  };

  // Group by Phase and Layer to synthesize high-level helicopter representations
  const roadmapData = useMemo(() => {
    return phases.map(p => ({
      id: p.id,
      name: p.name,
      nameEn: p.nameEn,
      layers: p.layers.map(l => {
        const layerTasks = l.tasks.filter(tk => tk.dueDate && tk.durationDays);
        if (layerTasks.length === 0) return null;
        
        const startNumeric = Math.min(...layerTasks.map(tk => jalaliToNumeric(tk.dueDate!) - (tk.durationDays || 0)));
        const endNumeric = Math.max(...layerTasks.map(tk => jalaliToNumeric(tk.dueDate!)));
        
        return {
          id: l.id,
          name: l.name,
          nameEn: l.nameEn,
          start: startNumeric,
          end: endNumeric,
          duration: endNumeric - startNumeric || 1,
          milestones: layerTasks.filter(tk => tk.isMilestone),
          tasks: layerTasks,
          progress: Math.round((layerTasks.filter(t => t.status === 'completed' || t.status === 'approved' || t.status === 'done').length / layerTasks.length) * 100)
        };
      }).filter(Boolean) as any[]
    }));
  }, [phases]);

  // Fast task ID to layer ID lookup table
  const taskToLayerMap = useMemo(() => {
    const map: Record<string, { layerId: string; layerName: string; phaseId: string }> = {};
    phases.forEach(p => {
      p.layers.forEach(l => {
        l.tasks.forEach(task => {
          map[task.id] = { layerId: l.id, layerName: l.name, phaseId: p.id };
          if (task.tasks) {
            task.tasks.forEach(sub => {
              map[sub.id] = { layerId: l.id, layerName: l.name, phaseId: p.id };
            });
          }
        });
      });
    });
    return map;
  }, [phases]);

  // Synthesize layer-level dependencies from task-level dependencies
  const layerDependencies = useMemo(() => {
    const deps: { fromLayerId: string; toLayerId: string; fromTaskId: string; toTaskId: string }[] = [];
    phases.forEach(p => {
      p.layers.forEach(l => {
        l.tasks.forEach(task => {
          if (task.dependencies) {
            task.dependencies.forEach(depId => {
              const target = taskToLayerMap[depId];
              // Link only if dependencies bridge separate logical layers
              if (target && target.layerId !== l.id) {
                deps.push({
                   fromLayerId: target.layerId,
                   toLayerId: l.id,
                   fromTaskId: depId,
                   toTaskId: task.id
                });
              }
            });
          }
        });
      });
    });
    return deps;
  }, [phases, taskToLayerMap]);

  // Update layout coordinates for drawing clean connecting bridges
  const updateCoords = useCallback(() => {
    const rootEl = document.getElementById('gantt-root-container');
    if (!rootEl) return;
    const rootRect = rootEl.getBoundingClientRect();
    
    const newCoords: Record<string, { xStart: number; y: number; xEnd: number }> = {};
    phases.forEach(p => {
      p.layers.forEach(l => {
        const barEl = document.getElementById(`bar-${l.id}`);
        if (barEl) {
          const barRect = barEl.getBoundingClientRect();
          newCoords[l.id] = {
            xStart: barRect.right - rootRect.left,
            xEnd: barRect.left - rootRect.left,
            y: barRect.top - rootRect.top + barRect.height / 2
          };
        }
      });
    });
    setCoords(newCoords);
  }, [phases]);

  // Handle window resizing and layout updates
  useEffect(() => {
    const timer = setTimeout(() => {
      updateCoords();
    }, 400);

    window.addEventListener('resize', updateCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCoords);
    };
  }, [updateCoords]);

  // Trigger coordinate calculations when layers expand or zoom changes
  useEffect(() => {
    const timer = setTimeout(() => {
      updateCoords();
    }, 150);
    return () => clearTimeout(timer);
  }, [expandedLayers, zoomScale, isFullscreen, updateCoords]);

  const toggleLayer = (layerId: string) => {
    setExpandedLayers(prev => ({ ...prev, [layerId]: !prev[layerId] }));
  };

  // Interactive Presentation Presets for the CEO
  const setHelicopterCEOView = () => {
    // Fits everything to screen, collapses details, giving immediate unified portfolio outline
    setZoomScale(100);
    setExpandedLayers({});
  };

  const setOperationalBalancedView = () => {
    // Comfortably expanded, slight horizontal scroll, active items visible
    setZoomScale(135);
    const activeStates: Record<string, boolean> = {};
    // Auto-expand some layers to demonstrate active structures
    phases.forEach((p, idx) => {
      if (idx <= 1) {
        p.layers.forEach(l => {
          activeStates[l.id] = true;
        });
      }
    });
    setExpandedLayers(activeStates);
  };

  const setDetailedAuditView = () => {
    // Extremely wide zoom, everything expanded for micro task tracking
    setZoomScale(200);
    const allOpened: Record<string, boolean> = {};
    phases.forEach(p => {
      p.layers.forEach(l => {
        allOpened[l.id] = true;
      });
    });
    setExpandedLayers(allOpened);
  };

  const toggleAllDetails = () => {
    const hasAnyKeys = Object.keys(expandedLayers).length > 0;
    if (hasAnyKeys) {
      setExpandedLayers({});
    } else {
      const allOpened: Record<string, boolean> = {};
      phases.forEach(p => {
         p.layers.forEach(l => {
            allOpened[l.id] = true;
         });
      });
      setExpandedLayers(allOpened);
    }
  };

  // Handle ESC keyboard trigger to exit fullscreen presentation mode comfortably
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Compute curved Bezier S-bends to draw between dependent Gantt entities
  const computedDependencyLines = useMemo(() => {
    return layerDependencies.map((dep, index) => {
      const startCoord = coords[dep.fromLayerId];
      const endCoord = coords[dep.toLayerId];
      if (!startCoord || !endCoord) return null;

      const isDirectlyInvolved = hoveredLayerId === dep.fromLayerId || hoveredLayerId === dep.toLayerId;
      const isStartHovered = hoveredLayerId === dep.fromLayerId;
      const isEndHovered = hoveredLayerId === dep.toLayerId;

      // Connections span from left (earlier end under RTL) to right (later start)
      const x1 = startCoord.xEnd;
      const y1 = startCoord.y;
      const x2 = endCoord.xStart;
      const y2 = endCoord.y;

      const dx = Math.abs(x2 - x1) || 20;
      const cp1x = x1 - dx * 0.4;
      const cp1y = y1;
      const cp2x = x2 + dx * 0.4;
      const cp2y = y2;

      const path = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;

      return {
        id: `dep-${index}`,
        fromId: dep.fromLayerId,
        toId: dep.toLayerId,
        path,
        isDirectlyInvolved,
        isStartHovered,
        isEndHovered
      };
    }).filter(Boolean) as any[];
  }, [layerDependencies, coords, hoveredLayerId]);

  return (
    <div 
      className={`bg-[#0a0a0b] flex flex-col font-sans overflow-hidden transition-all duration-300 relative ${
        isFullscreen 
          ? 'fixed inset-0 w-screen h-screen z-[9999] p-6 bg-[#080809] border-2 border-gold/30 shadow-[0_0_50px_rgba(212,163,89,0.1)]' 
          : 'w-full h-full'
      }`} 
      dir="rtl"
    >
      {/* Header / Legend */}
      <div className="px-6 py-2.5 border-b border-white/5 flex flex-col xl:flex-row xl:items-center justify-between bg-black/40 backdrop-blur-md gap-3 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-md md:text-lg font-black text-cream flex items-center gap-2 italic tracking-tight">
              <Rocket className="text-gold" size={18} />
              {t('نقشه راه کلان پروژه (نمای گانت)', 'Strategic Project Roadmap (Gantt Overview)')}
            </h2>
            {isFullscreen && (
              <span className="bg-gold/15 border border-gold/40 text-gold text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">
                {t('حالت پرزنت فعال', 'Presentation Mode Active')}
              </span>
            )}
          </div>
          <p className="text-[10px] text-gold/40 mt-1.5 font-black uppercase tracking-[0.3em]">
            {t('توالی زمانی واقعی، مدیریت تداعی‌ها و انسجام متقابل سیستم حضور در بازار اروپا', 'Real Sequencing, Concurrency & Mutual System Cohesion for EU market')}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2.5 text-[11px] text-cream/70">
            <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 py-1 px-2.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-emerald-400 font-medium">{t('تاریخ رسمی شروع کار امسال:', 'Official Start Date:')}</strong>
              <span className="font-sans font-bold">{t('۸ فروردین ۱۴۰۵', 'Farvardin 8, 1405')}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 py-1 px-2.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <strong className="text-gold font-medium">{t('افتتاحیه بزرگ شوروم میلان (VEDESIA House):', 'Milan Showroom Grand Opening:')}</strong>
              <span className="font-sans font-bold">{t('۱۵ اردیبهشت ۱۴۰۶', 'Ordibehesht 15, 1406')}</span>
            </span>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          
          {/* DEPENDENCY LINES TOGGLE */}
          <button
            onClick={() => setShowDependencyLines(!showDependencyLines)}
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-2 transition-all cursor-pointer ${
              showDependencyLines
                ? 'bg-gold/15 border-gold/40 text-gold'
                : 'bg-white/5 border-white/10 text-cream/60 hover:text-cream'
            }`}
          >
            <Link2 size={13} className={showDependencyLines ? 'animate-pulse' : ''} />
            {t(
              showDependencyLines ? 'جلوه وابستگی‌ها (روشن)' : 'جلوه پیش‌نیازها',
              showDependencyLines ? 'Flow Lines (On)' : 'Show Flow Lines'
            )}
          </button>

          {/* DENSITY / LEVEL OF EXPAND TOGGLE */}
          <button
            onClick={toggleAllDetails}
            className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-cream hover:bg-white/10 text-[11px] font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
             <Layers size={13} />
             {Object.keys(expandedLayers).length > 0 ? t('جمع کردن همه بخش‌ها', 'Collapse All') : t('بسط تمام لایه‌ها', 'Expand All')}
          </button>

          {/* PRESENTER FULLSCREEN TOGGLE */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              isFullscreen
                ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                : 'bg-gold hover:bg-gold/95 text-[#0a0a0b] font-extrabold shadow-[0_0_20px_rgba(212,163,89,0.25)] border border-gold/20'
            }`}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {isFullscreen ? t('خروج از ارائه تمام‌صفحه', 'Exit Fullscreen') : t('ارائه تمام‌صفحه (مدیرعامل)', 'Fullscreen Presentation')}
          </button>

        </div>
      </div>

      {/* Presentation Toolbox Tab — SPECIFICALLY TARGETED AT MANAGING SMALL PREVIEWS */}
      <div className="bg-white/[0.03] border-b border-white/5 px-6 py-1.5 flex flex-col md:flex-row items-center justify-between gap-2 shrink-0 relative z-20">
         <div className="flex items-center gap-3">
            <span className="text-[10px] text-cream/40 uppercase font-bold tracking-widest flex items-center gap-1.5">
               <Sparkles size={12} className="text-gold" />
               {t('دستیار حرفه‌ای پرزنت مدیرعامل:', 'Executive View Control:')}
            </span>
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 gap-1">
               <button
                 onClick={setHelicopterCEOView}
                 className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                   zoomScale === 100 && Object.keys(expandedLayers).length === 0
                     ? 'bg-gold text-[#0a0a0b]'
                     : 'text-cream/60 hover:text-cream hover:bg-white/5'
                 }`}
                 title={t('نمایش دقیق و فیت‌شده کل زمان‌بندی دو ساله در یک صفحه بدون نیاز به اسکرول افقی', 'Fits the complete 2-year lifecycle into a single screen outline')}
               >
                  {t('۱. زاویه دید کل‌نگر (مدیریتی)', '1. Helicopter Overview')}
               </button>
               <button
                 onClick={setOperationalBalancedView}
                 className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                   zoomScale === 135
                     ? 'bg-white/10 text-gold border border-white/5'
                     : 'text-cream/60 hover:text-cream hover:bg-white/5'
                 }`}
               >
                  {t('۲. زاویه دید متوازن (فنی)', '2. Balanced View')}
               </button>
               <button
                 onClick={setDetailedAuditView}
                 className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                   zoomScale === 200
                     ? 'bg-white/10 text-gold border border-white/5'
                     : 'text-cream/60 hover:text-cream hover:bg-white/5'
                 }`}
               >
                  {t('۳. زاویه دید ریزبینانه (عملیاتی)', '3. Detailed Deep Dive')}
               </button>
            </div>
         </div>

         {/* SLIDER FOR ACCURATE HORIZONTAL ZOOM ADJUSTMENT */}
         <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
               <button 
                 onClick={() => setZoomScale(Math.max(100, zoomScale - 15))}
                 className="p-1 rounded bg-white/5 hover:bg-white/10 text-cream/70 transition-colors"
                 disabled={zoomScale <= 100}
               >
                 <ZoomOut size={13} />
               </button>
               <input 
                 type="range"
                 min={100}
                 max={250}
                 step={10}
                 value={zoomScale}
                 onChange={(e) => setZoomScale(Number(e.target.value))}
                 className="w-32 accent-gold cursor-pointer"
               />
               <button 
                 onClick={() => setZoomScale(Math.min(250, zoomScale + 15))}
                 className="p-1 rounded bg-white/5 hover:bg-white/10 text-cream/70 transition-colors"
                 disabled={zoomScale >= 250}
               >
                 <ZoomIn size={13} />
               </button>
            </div>
            <span className="text-[11px] font-mono font-bold text-gold/80 bg-gold/10 px-2.5 py-1 rounded border border-gold/20 shrink-0">
               {zoomScale}% {t('بزرگ‌نمایی', 'Scale')}
            </span>
         </div>
      </div>

      {/* Timeline Controls / Column Ruler & Gantt Swimlanes — MERGED INTO ONE COMBINED GRID */}
      {/* Managing unified horizontal zoom and vertical scroll */}
      <div 
        id="gantt-scroll-container" 
        className="flex-1 overflow-auto custom-scrollbar p-2.5 min-h-0" 
        ref={containerRef}
        onClick={() => setSelectedChkId(null)}
      >
        {/* Dynamic Zooming Container - compact & highly visible */}
        <div 
          id="gantt-root-container" 
          className="relative min-h-full transition-all duration-300"
          style={{ width: `${zoomScale}%`, minWidth: '100%', minHeight: '480px' }}
        >
          
          {/* STATIC OVERHEAD RULER - STICKY TOP AND PERFECTLY SYNCED */}
          <div className="sticky top-0 bg-[#0a0a0b]/95 backdrop-blur-md z-40 border-b border-white/5 flex items-stretch h-9 mb-3">
            {/* Frozen Left label column spacer, pinned on horizontal scrolling */}
            <div className="w-64 shrink-0 border-l border-white/5 bg-[#0a0a0b]/95 backdrop-blur-md sticky right-0 z-45 flex items-center pr-6 text-[10px] font-black text-rose-400/80 uppercase tracking-widest font-mono">
               {t('ارکان و لایه‌های نقشه راه', 'PILLARS & ROADMAP LAYERS')}
            </div>

            {/* Time units axis matching the horizontal bounds of the timeline tracks perfectly */}
            <div className="flex-grow relative h-full">
              {[1405, 1406].flatMap(year => (
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                  <div 
                    key={`ruler-${year}-${month}`}
                    className="absolute h-full flex flex-col justify-end pb-1.5"
                    style={{ right: `${getPosition(`${year}/${month < 10 ? `0${month}` : month}/01`)}%` }}
                  >
                    <div className="w-px h-1.5 bg-white/20 mb-1" />
                    <span className="text-[8px] font-black text-white/30 uppercase tracking-tighter whitespace-nowrap -translate-x-1/2">
                      {month === 1 ? `${year} ` : ''} 
                      {t(
                        ['','فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'][month],
                        ['','Far','Ord','Kho','Tir','Mor','Sha','Meh','Aba','Aza','Dey','Bah','Esf'][month]
                      )}
                    </span>
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* Static SVG Overlay inside the coordinates space for persistent cables */}
          {showDependencyLines && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <marker
                  id="gantt-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="currentColor" />
                </marker>
              </defs>
              
              {/* Render background dependency links */}
              {computedDependencyLines.map(line => (
                <path
                  key={line.id}
                  d={line.path}
                  fill="none"
                  stroke={
                    line.isStartHovered
                      ? 'rgba(244, 63, 94, 0.85)' // Outgoing highlight in Red/Rose
                      : line.isEndHovered
                      ? 'rgba(234, 179, 8, 0.85)'  // Incoming highlight in Gold/Amber
                      : 'rgba(255, 255, 255, 0.04)' // Faded default state
                  }
                  strokeWidth={line.isDirectlyInvolved ? 2.5 : 1}
                  markerEnd="url(#gantt-arrow)"
                  strokeDasharray={line.isDirectlyInvolved ? 'none' : '4,4'}
                  className="transition-all duration-300"
                  style={{
                    color: line.isStartHovered
                      ? 'rgba(244, 63, 94, 0.85)'
                      : line.isEndHovered
                      ? 'rgba(234, 179, 8, 0.85)'
                      : 'rgba(255, 255, 255, 0.15)'
                  }}
                />
              ))}
            </svg>
          )}

          {/* BACKGROUND SYSTEM OVERLAYS (Today line + Seasonal Divider Grid Coordinates) */}
          <div className="absolute inset-y-0 right-0 left-0 pointer-events-none flex z-[50]">
            {/* Title margin spacer */}
            <div className="w-64 shrink-0 border-l border-white/5" />
            
            {/* Active tracking panel */}
            <div className="flex-1 relative mx-6 h-full font-serif text-cream">
              {/* Seasonal grid dividing references */}
              {[1405, 1406].flatMap(year => (
                [1, 4, 7, 10].map(month => (
                  <div 
                    key={`vgrid-${year}-${month}`}
                    className="absolute inset-y-0 border-r border-dashed border-white/[0.02]"
                    style={{ right: `${getPosition(`${year}/${month < 10 ? `0${month}` : month}/01`)}%` }}
                  />
                ))
              ))}

              {/* Today Vertical Ribbon Overlay */}
              <div 
                className="absolute top-0 bottom-0 w-px bg-rose-500/80"
                style={{ right: `${getPosition('1405/03/11')}%` }}
              >
                <div className="absolute top-[38px] right-0 translate-x-1/2 bg-rose-600 text-white text-[9px] font-black px-2.5 py-1 rounded shadow-[0_0_20px_rgba(244,63,94,0.55)] border border-rose-400/30 whitespace-nowrap z-50">
                  {t('امروز: ۱۱ خرداد ۱۴۰۵', 'TODAY: June 1, 2026')}
                </div>
                <div className="absolute inset-0 w-6 -translate-x-1/2 bg-rose-500/5 blur-[2px]" />
              </div>
            </div>
          </div>

          <div className="space-y-12 relative z-20">
            {roadmapData.map((phase, pIdx) => {
              const validLayers = phase.layers.filter((l: any) => l && l.start && l.end);
              let phaseStartStr = '';
              let phaseEndStr = '';
              if (validLayers.length > 0) {
                const pStart = Math.min(...validLayers.map((vl: any) => vl.start));
                const pEnd = Math.max(...validLayers.map((vl: any) => vl.end));
                phaseStartStr = numericToJalali(pStart);
                phaseEndStr = numericToJalali(pEnd);
              }

              return (
                <motion.div 
                  key={phase.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: pIdx * 0.05 }}
                  viewport={{ once: true }}
                  className="relative animate-once border-b border-white/[0.02] pb-6 last:border-b-0 last:pb-0"
                >
                  {/* Phase Title Group - Taller, with dynamic date range pill */}
                  <div className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-1.5 mb-8 pr-2 sticky right-0 z-20 bg-[#0a0a0b]/90 backdrop-blur-md py-2 px-3 border border-white/5 rounded-xl w-fit max-w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-gold rounded-full" />
                      <h3 className="text-lg font-black text-cream tracking-tight italic font-sans-fa">{t(phase.name, phase.nameEn)}</h3>
                    </div>
                    {phaseStartStr && (
                      <span className="text-[10px] font-sans font-black text-gold/90 bg-gold/5 border border-gold/25 px-2.5 py-0.5 rounded-full inline-block">
                        {t(`دوره زمانی: ${phaseStartStr} تا ${phaseEndStr}`, `Schedules: ${phaseStartStr} - ${phaseEndStr}`)}
                      </span>
                    )}
                  </div>

                  {/* Layers Box Container */}
                  <div className="space-y-4">
                    {phase.layers?.map((layer: any) => {
                      const isExpanded = !!expandedLayers[layer.id];
                      const isHovered = hoveredLayerId === layer.id;

                      return (
                        <div 
                          key={layer.id} 
                          className={`relative rounded-2xl border transition-all duration-300 ${
                            isHovered 
                              ? 'bg-white/[0.04] border-white/10 shadow-lg scale-[1.002]' 
                              : 'bg-white/[0.015] border-white/5 hover:border-white/10'
                          }`}
                          onMouseEnter={() => {
                            setHoveredLayerId(layer.id);
                            updateCoords(); // Refresh coordinates to bind accurately on mouse move
                          }}
                          onMouseLeave={() => {
                            setHoveredLayerId(null);
                          }}
                        >
                          {/* Interactive TALLER Main Row containing Title Card and Bar */}
                          <div className="flex items-center min-h-[72px]">
                            {/* Layer Title Card - sticky right to remain visible during scrolling */}
                            <div 
                              onClick={() => toggleLayer(layer.id)}
                              className={`w-64 pr-6 pl-4 shrink-0 border-l border-white/5 flex items-center justify-between cursor-pointer py-3 transition-colors select-none sticky right-0 bg-[#0a0a0b]/95 backdrop-blur-md z-30 rounded-r-2xl ${
                                isHovered ? 'text-gold' : 'text-cream/80'
                              }`}
                            >
                              <div className="flex flex-col gap-1.5 w-full pr-1">
                                <h4 className="text-[11px] font-black leading-snug">
                                  {t(layer.name, layer.nameEn)}
                                </h4>
                                <p className="text-[9px] text-cream/40 font-mono font-medium tracking-tight mt-[1px]">
                                  {numericToJalali(layer.start)} {t('تا', 'to')} {numericToJalali(layer.end)}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded font-mono ${
                                    layer.progress >= 70 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                      : layer.progress >= 30 
                                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                      : 'bg-white/5 text-cream/40 border border-white/5'
                                  }`}>
                                    {layer.progress}% {t('پیشرفت', 'Progress')}
                                  </span>
                                </div>
                              </div>
                              <div className="text-white/20 hover:text-gold transition-colors ml-1 shrink-0">
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </div>
                            </div>

                            {/* Timeline Layer Bar Track - High Visibiliy - Heightened */}
                            <div className="flex-grow relative h-12 mx-6">
                              {/* Consolidated Duration Bar representing the parent span - Heightened */}
                              <motion.div
                                id={`bar-${layer.id}`}
                                initial={{ opacity: 0.8 }}
                                animate={{ 
                                  scale: isHovered ? 1.01 : 1,
                                  boxShadow: isHovered ? '0 0 15px rgba(212,163,89,0.15)' : 'none'
                                }}
                                onClick={() => toggleLayer(layer.id)}
                                className={`absolute h-8 top-2 rounded-lg transition-all duration-200 cursor-pointer ${
                                  isHovered 
                                    ? 'bg-gold/10 border-gold/45' 
                                    : 'bg-gold/5 border-gold/20'
                                } border`}
                                style={{ 
                                  right: `${getPositionByNumeric(layer.start)}%`,
                                  width: `${getWidth(layer.duration)}%`
                                }}
                              >
                                 {/* Overflow Clipping Wrapper (Clips progress bar details to parent corner rounding) */}
                                 <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                                   {/* Progress Fill inside Segment */}
                                   <div 
                                     className="absolute inset-y-0 right-0 bg-gold/25 gold-gradient-diagonal animate-pulse" 
                                     style={{ width: `${layer.progress}%` }} 
                                   />
                                   
                                   {/* Sub-project background dividers */}
                                   <div className="absolute inset-0 flex">
                                     {layer.tasks.map((tk: any) => (
                                       <div 
                                         key={`chk-bg-${tk.id}`} 
                                         className="h-full border-l border-white/5 flex-1" 
                                       />
                                     ))}
                                   </div>
                                 </div>

                                 {/* Hover/Click Interactive Nodes Layer (Renders OUTSIDE the clipping container so tooltips display fully) */}
                                 <div className="absolute inset-0 flex z-10">
                                   {layer.tasks.map((tk: any) => {
                                     const isSelected = selectedChkId === tk.id;
                                     return (
                                       <div 
                                         key={`chk-${tk.id}`} 
                                         className="h-full hover:bg-gold/20 flex-1 relative group/chk cursor-pointer transition-colors"
                                         onMouseEnter={() => setHoveredTaskId(tk.id)}
                                         onMouseLeave={() => setHoveredTaskId(null)}
                                         onClick={(e) => {
                                           e.stopPropagation(); // Prevents parent row toggle expand
                                           setSelectedChkId(selectedChkId === tk.id ? null : tk.id);
                                         }}
                                       >
                                         {/* Floating Tooltip displaying project name on hover and click */}
                                         <div 
                                           className={`absolute bottom-11 right-1/2 translate-x-1/2 transition-all duration-200 bg-black/95 text-cream border border-gold/40 text-[9.5px] py-1.5 px-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 pointer-events-none whitespace-nowrap flex flex-col items-center ${
                                             isSelected
                                               ? 'opacity-100 translate-y-0 scale-100'
                                               : 'opacity-0 translate-y-1 scale-95 group-hover/chk:opacity-100 group-hover/chk:translate-y-0 group-hover/chk:scale-100'
                                           }`}
                                         >
                                           <span className="font-extrabold text-gold text-[8.5px] mb-0.5 font-mono">[{tk.id}]</span>
                                           <span className="font-black text-cream/95 text-center leading-snug">{t(tk.title, tk.titleEn)}</span>
                                           <span className="text-[8px] text-cream/45 mt-1 font-mono font-medium">
                                             {tk.dueDate} • {tk.assignee || 'Tech Dept.'} • {tk.priority}
                                           </span>
                                           {isSelected && (
                                             <span className="text-[7.5px] text-gold/60 mt-1 font-sans-fa font-bold uppercase tracking-wider">{t('(در حال نمایش - فرود کلیک مجدد جهت بستن)', '(Pinned - Click to close)')}</span>
                                           )}
                                           <div className="w-1.5 h-1.5 bg-black rotate-45 border-r border-b border-gold/40 absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2" />
                                         </div>
                                       </div>
                                     );
                                   })}
                                 </div>

                                 <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                              </motion.div>

                              {/* Approval Milestones nested on the layer bar track - Larger Dimensions */}
                              {layer.milestones.map((ms: any) => (
                                <div
                                  key={ms.id}
                                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center group/ms z-20"
                                  style={{ right: `${getPosition(ms.dueDate)}%` }}
                                >
                                  <div className="w-3.5 h-3.5 bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.7)] rotate-45 border border-white/25 hover:scale-125 transition-transform cursor-pointer" />
                                  <div className="absolute bottom-6 opacity-0 group-hover/ms:opacity-100 transition-all whitespace-nowrap pointer-events-none z-40">
                                    <div className="bg-rose-600 text-white text-[9px] font-semibold px-2.5 py-1 rounded-full shadow-2xl border border-rose-400/30 flex items-center gap-1.5">
                                      <Target size={11} />
                                      <span>{t(ms.title, ms.titleEn)}</span>
                                      <span className="text-[8px] opacity-75 font-mono">({ms.dueDate})</span>
                                    </div>
                                    <div className="w-1.5 h-1.5 bg-rose-600 rotate-45 mx-auto -mt-1 border-r border-b border-rose-400/30" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Expandable Granular Task-By-Task Gantt Swimlanes */}
                          <AnimatePresence initial={false}>
                          {isExpanded && (() => {
                            const sortedTasks = [...layer.tasks].sort((a: any, b: any) => {
                              if (granularSortMode === 'chronological') {
                                const endA = jalaliToNumeric(a.dueDate || '1405/01/01');
                                const startA = endA - (a.durationDays || 0);
                                const endB = jalaliToNumeric(b.dueDate || '1405/01/01');
                                const startB = endB - (b.durationDays || 0);
                                return startA - startB;
                              } else if (granularSortMode === 'lifecycle') {
                                const stageOrder = ['STRATEGY', 'CONTENT', 'INFRASTRUCTURE', 'TRAINING', 'EXECUTION', 'INTELLIGENCE'];
                                const idxA = stageOrder.indexOf(a.lifecycleStage || 'STRATEGY');
                                const idxB = stageOrder.indexOf(b.lifecycleStage || 'STRATEGY');
                                if (idxA !== idxB) return idxA - idxB;
                                const endA = jalaliToNumeric(a.dueDate || '1405/01/01');
                                const startA = endA - (a.durationDays || 0);
                                const endB = jalaliToNumeric(b.dueDate || '1405/01/01');
                                const startB = endB - (b.durationDays || 0);
                                return startA - startB;
                              } else { // 'priority'
                                const priorityOrder = ['P0', 'P1', 'P2', 'P3'];
                                const prA = priorityOrder.indexOf(a.priority || 'P2');
                                const prB = priorityOrder.indexOf(b.priority || 'P2');
                                if (prA !== prB) return prA - prB;
                                const endA = jalaliToNumeric(a.dueDate || '1405/01/01');
                                const startA = endA - (a.durationDays || 0);
                                const endB = jalaliToNumeric(b.dueDate || '1405/01/01');
                                const startB = endB - (b.durationDays || 0);
                                return startA - startB;
                              }
                            });

                            return (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden border-t border-white/5"
                              >
                                <div className="pr-12 pl-6 py-4 space-y-3 bg-[#0a0a0c]/80 select-none mr-1">
                                  
                                  {/* Strategic Sorting control & Legend Header */}
                                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-xl mb-4 text-right">
                                    {/* Workstream Legend */}
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <span className="text-[8px] text-cream/35 font-extrabold uppercase tracking-wider pl-1">{t('راهنمای زنجیره کار VEDESIA:', 'VEDESIA WORKSTREAM CHAIN:')}</span>
                                      {Object.entries(LIFECYCLE_STAGE_META).map(([key, meta]) => (
                                        <div key={key} className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black border ${meta.bg} ${meta.text} ${meta.border} transition-all`}>
                                          <span className="w-1 h-1 rounded-full bg-current" />
                                          <span>{t(meta.fa, meta.en)}</span>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Sort Controls */}
                                    <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto">
                                      <span className="text-[8.5px] text-gold font-sans-fa font-black">{t('ساختار ترتیب پروژه:', 'Project Sort Sequence:')}</span>
                                      <div className="flex bg-[#111113] border border-white/5 p-0.5 rounded-lg text-[8px]">
                                        {(['chronological', 'lifecycle', 'priority'] as const).map(mode => (
                                          <button
                                            key={mode}
                                            className={`px-2 py-1 rounded-md font-sans-fa font-black transition-all ${
                                              granularSortMode === mode 
                                                ? 'bg-gold/15 text-gold border border-gold/25' 
                                                : 'text-cream/40 hover:text-cream/75'
                                            }`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setGranularSortMode(mode);
                                            }}
                                          >
                                            {mode === 'chronological' && t('زمانی (آبشاری)', 'Waterfall (Date)')}
                                            {mode === 'lifecycle' && t('دسته‌بندی زنجیره کار (پیشنهادی)', 'Process Workflow (CEO)')}
                                            {mode === 'priority' && t('سطح اولویت', 'By Task Priority')}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <span className="text-[9px] text-cream/40 uppercase font-black tracking-wider block mb-1">
                                    {t(`فعالیت‌های خرد لایه (${layer.tasks.length} تسک با چینش برگزیده)`, `Granular Tasks of Layer (${layer.tasks.length} tasks matching current layout)`)}
                                  </span>

                                  {sortedTasks.map((tk: any) => {
                                    const tkEnd = jalaliToNumeric(tk.dueDate || '1405/01/01');
                                    const tkStart = tkEnd - (tk.durationDays || 0);
                                    const tkWidth = getWidth(tk.durationDays || 1);
                                    
                                    const tkProgress = tk.status === 'completed' || tk.status === 'approved' || tk.status === 'done' ? 100 : tk.status === 'in-progress' ? 50 : 0;
                                    const isTaskHovered = hoveredTaskId === tk.id;
                                    const stageInfo = LIFECYCLE_STAGE_META[tk.lifecycleStage || 'STRATEGY'] || LIFECYCLE_STAGE_META.STRATEGY;

                                    return (
                                      <div 
                                        key={tk.id} 
                                        className="flex items-center min-h-[36px] hover:bg-white/[0.02] rounded-lg px-2 transition-all duration-150"
                                        onMouseEnter={() => setHoveredTaskId(tk.id)}
                                        onMouseLeave={() => setHoveredTaskId(null)}
                                      >
                                        {/* Specific task details Column - sticky right with shading background */}
                                        <div className="w-56 pr-2 shrink-0 flex flex-col justify-center sticky right-0 bg-[#0b0b0d] z-30 border-l border-white/5 h-full rounded-r pl-2 py-1">
                                          <div className="text-[10px] font-bold text-cream/90 flex items-center gap-1 leading-tight mb-1">
                                            <span className="text-[8px] text-gold/50 font-mono shrink-0">[{tk.id}]</span>
                                            <span className="truncate max-w-[12rem]" title={t(tk.title, tk.titleEn)}>
                                              {t(tk.title, tk.titleEn)}
                                            </span>
                                          </div>
                                          
                                          {/* Workstream stage badge + priority info */}
                                          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                            <span className={`text-[7.5px] font-black px-1.5 py-0.2 rounded border ${stageInfo.bg} ${stageInfo.text} ${stageInfo.border}`}>
                                              {t(stageInfo.fa.split(' ')[1] || stageInfo.fa, stageInfo.en)}
                                            </span>
                                            <span className="bg-white/5 text-[7px] font-black text-cream/50 px-1 rounded font-mono uppercase">{tk.priority}</span>
                                            <span className="text-[7.5px] text-cream/30 font-mono">{tk.dueDate}</span>
                                          </div>
                                        </div>

                                        {/* Sub-Track Row Area */}
                                        <div className="flex-grow relative h-6 mx-4">
                                          {/* Task Sub-Bar with Stage color accents */}
                                          <div 
                                            className={`absolute h-3.5 top-1 rounded transition-all duration-200 overflow-hidden cursor-pointer border ${
                                              isTaskHovered ? 'border-gold/60 scale-[1.01]' : stageInfo.border
                                            } ${stageInfo.bg}`}
                                            style={{ 
                                              right: `${getPositionByNumeric(tkStart)}%`,
                                              width: `${tkWidth}%`
                                            }}
                                          >
                                            {/* Mini Task Progress Fill color coordinated */}
                                            <div 
                                              className={`absolute inset-y-0 right-0 opacity-45 bg-current ${stageInfo.text}`} 
                                              style={{ width: `${tkProgress}%` }} 
                                            />

                                            {/* Tooltip detail metadata visible inside bar on hover */}
                                            {isTaskHovered && tk.assignee && (
                                              <span className="absolute left-2 top-0 text-[8px] font-mono font-bold text-cream/50">
                                                {tk.assignee}
                                              </span>
                                            )}
                                          </div>

                                          {/* Floating Tooltip displaying project name on hover */}
                                          {isTaskHovered && (
                                            <div 
                                              className="absolute bottom-6 bg-black/95 text-cream border border-gold/30 text-[9.5px] py-1.5 px-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-[60] pointer-events-none whitespace-nowrap flex flex-col items-center animate-in fade-in zoom-in-95 duration-100"
                                              style={{ right: `${getPositionByNumeric(tkStart)}%` }}
                                            >
                                              <div className="flex items-center gap-1.5 mb-0.5">
                                                <span className="font-extrabold text-gold text-[8.5px] font-mono">[{tk.id}]</span>
                                                <span className={`text-[7.5px] font-black px-1.5 rounded border ${stageInfo.bg} ${stageInfo.text} ${stageInfo.border}`}>
                                                  {t(stageInfo.fa, stageInfo.en)}
                                                </span>
                                              </div>
                                              <span className="font-black text-cream/95 leading-snug text-center">{t(tk.title, tk.titleEn)}</span>
                                              <span className="text-[8px] text-cream/45 mt-1 font-mono font-medium">
                                                {tk.dueDate} • {tk.assignee || 'Tech Dept.'} • {tk.priority} • {tk.durationDays} {t('روز', 'days')}
                                              </span>
                                              <div className="w-1.5 h-1.5 bg-black rotate-45 border-r border-b border-gold/30 absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2" />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            );
                          })()}
                          </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )})}
          </div>

        </div>
      </div>

      {/* Summary Stats Footer */}
      <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-around shrink-0 relative z-20">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black text-gold">600+</span>
          <span className="text-[9px] text-cream/40 uppercase font-zinc tracking-widest">{t('روزهای تقویمی فرآیند', 'Calendar Journey Days')}</span>
        </div>
        <div className="w-px h-8 bg-white/5" />
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black text-cream">24</span>
          <span className="text-[9px] text-cream/40 uppercase font-zinc tracking-widest">{t('مایلستون حساس تاییدیه', 'Critical Approval Milestones')}</span>
        </div>
        <div className="w-px h-8 bg-white/5" />
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black text-emerald-400">100%</span>
          <span className="text-[9px] text-cream/40 uppercase font-zinc tracking-widest">{t('پوشش اهداف استراتژیک', 'Strategic Targets Met')}</span>
        </div>
      </div>
    </div>
  );
};
