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
  Info,
  Menu,
  X,
  Plus,
  Search,
  ExternalLink,
  ChevronDown,
  LayoutDashboard,
  Target,
  Users,
  Compass,
  Zap,
  ShieldCheck,
  Globe,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECT_DATA } from './constants';
import { Phase, TaskItem, Layer } from './types';

export default function App() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(PROJECT_DATA[0].layers[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isWBSOpen, setIsWBSOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const activePhase = PROJECT_DATA[activePhaseIndex];

  const tasksRef = useRef<HTMLDivElement>(null);

  const handlePhaseChange = (index: number) => {
    setActivePhaseIndex(index);
    setActiveLayerId(PROJECT_DATA[index].layers[0].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    return PROJECT_DATA.flatMap(phase => 
      phase.layers.flatMap(layer => 
        layer.tasks.map(task => ({
          ...task,
          phaseName: phase.name,
          layerName: layer.name,
          phaseId: phase.id
        }))
      )
    );
  }, []);

  const handleExport = () => {
    // Flatten all data for export
    const exportRows = [];
    exportRows.push(['Phase', 'Layer', 'Task ID', 'Title', 'Status']);

    PROJECT_DATA.forEach(phase => {
      phase.layers.forEach(layer => {
        layer.tasks.forEach(task => {
          exportRows.push([
            `"${phase.name.replace(/"/g, '""')}"`,
            `"${layer.name.replace(/"/g, '""')}"`,
            `"${task.id}"`,
            `"${task.title.replace(/"/g, '""')}"`,
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
    const completed = allProjects.filter(t => t.status === 'completed').length;
    const inProgress = allProjects.filter(t => t.status === 'in-progress').length;
    
    return {
      percent: Math.round((completed / total) * 100) || 0,
      completed,
      total,
      inProgress
    };
  }, [allProjects]);

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return activeLayer.tasks;
    return activeLayer.tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeLayer, searchQuery]);

  // Luxury Icons for Phases
  const phaseIcons = [<Compass />, <Target />, <Rocket />, <TrendingUp />, <Zap />, <Globe />];

  return (
    <div className="h-screen bg-onyx text-cream/90 font-sans flex overflow-hidden relative">
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

        <nav className="flex-1 overflow-y-auto py-4 md:py-8 px-4 space-y-2 md:space-y-3 custom-scrollbar min-h-0">
          {PROJECT_DATA.map((phase, index) => (
            <button
              key={phase.id}
              onClick={() => {
                handlePhaseChange(index);
                if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all relative group ${
                activePhaseIndex === index 
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
                  <div className="flex-1 overflow-hidden text-right">
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-50 mb-0.5 font-sans">Phase 0{index + 1}</p>
                    <p className="font-bold text-xs line-clamp-1 tracking-tight font-sans">{phase.name.split(':')[1] || phase.name}</p>
                  </div>
              )}

              {activePhaseIndex === index && (isSidebarOpen || isMobileMenuOpen) && (
                <motion.div layoutId="phase-indicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 md:p-6 border-t border-white/5 shrink-0 hidden sm:block">
          {(isSidebarOpen || isMobileMenuOpen) && (
            <div className="luxury-glass rounded-2xl p-4 md:p-5 border border-gold/20 relative overflow-hidden">
               <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest mb-3">Overall Progress</p>
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
        
        <header className="bg-onyx/80 backdrop-blur-xl sticky top-0 z-40 border-b border-white/5 px-4 md:px-10 py-4 md:py-6">
           <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-8">
              <div className="flex items-center justify-between w-full lg:w-auto">
                <div className="flex-1">
                  <div className="flex items-center gap-2 md:gap-4 mb-2">
                    <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-bold text-gold/50 uppercase tracking-[0.2em]">
                      <span className="hidden sm:inline">پروژه مارکتینگ</span>
                      <ChevronRight size={10} className="rotate-180 hidden sm:inline" />
                      <span className="text-gold font-bold tracking-[0.1em]">{activePhase.nameEn}</span>
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
                  <h2 className="text-xl md:text-3xl font-bold text-cream tracking-tight">
                    {activePhase.name}
                  </h2>
                </div>
                
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 sm:p-3 bg-white/5 rounded-xl border border-white/10 text-gold"
                >
                  <Menu size={22} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative group flex-1 sm:flex-none">
                  <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 group-focus-within:text-gold transition-colors" />
                  <input 
                    type="text" 
                    placeholder="جستجو..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-full py-2 pr-10 pl-4 text-xs md:text-sm text-cream placeholder:text-cream/20 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all w-full sm:w-40 md:w-64"
                  />
                </div>
                <button 
                  onClick={handleExport}
                  className="flex items-center justify-center gap-2 bg-white/5 border border-white/20 text-cream/40 px-4 py-2 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest hover:text-gold hover:border-gold/50 transition-all duration-300"
                >
                  <Download size={14} />
                  <span>Export</span>
                </button>
                <button 
                  onClick={() => setIsWBSOpen(true)}
                  className="flex items-center justify-center gap-2 bg-white/5 border border-gold/30 text-gold px-4 py-2 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-gold hover:text-onyx transition-all duration-300"
                >
                  <BarChart3 size={14} />
                  <span>WBS</span>
                </button>
              </div>
           </div>
        </header>

        <div className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard 
              label="کل اقدامات استراتژیک" 
              value={allProjects.length} 
              icon={<Layers size={20} className="text-gold" />} 
              sub="مجموع کل پروژه‌ها در تمامی فازها"
            />
            <StatCard 
              label="پروژه‌های انجام شده" 
              value={allProjects.filter(t => t.status === 'completed').length} 
              icon={<CheckCircle2 size={20} className="text-emerald-500" />} 
              sub="دارایی‌های نهایی و تایید شده"
            />
            <StatCard 
              label="در حال اجرا / باقی‌مانده" 
              value={allProjects.filter(t => t.status !== 'completed').length} 
              icon={<Clock size={20} className="text-gold/40" />} 
              sub="موارد در صف اقدام"
            />
          </div>

          <div className="grid grid-cols-12 gap-4 lg:gap-10" ref={tasksRef}>
            {/* Layers Selection */}
            <div className="col-span-12 lg:col-span-4">
              <div className="sticky top-28 space-y-4 md:space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xs md:text-sm font-bold text-gold uppercase tracking-[0.2em]">Strategic Layers</h3>
                  <span className="text-[9px] md:text-[10px] text-cream/40">{activePhase.layers.length} Total</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
                  {activePhase.layers.map((layer) => (
                    <button
                      key={layer.id}
                      onClick={() => handleLayerChange(layer.id)}
                      className={`w-full text-right p-4 md:p-6 rounded-2xl border transition-all duration-500 group relative overflow-hidden ${
                        activeLayerId === layer.id 
                        ? 'border-gold/50 bg-white/5 shadow-2xl shadow-gold/10 lg:translate-x-[-10px]' 
                        : 'border-white/5 bg-transparent hover:border-white/20 hover:bg-white/[0.02]'
                      }`}
                    >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                         <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                           activeLayerId === layer.id ? 'bg-gold text-onyx' : 'bg-white/10 text-cream/50'
                         }`}>
                           {layer.id.split('-').pop()?.toUpperCase() || 'L1'}
                         </span>
                         {activeLayerId === layer.id && (
                           <motion.div layoutId="layer-chevron" className="text-gold">
                             <ChevronDown size={18} className="rotate-90" />
                           </motion.div>
                         )}
                      </div>
                        <h4 className={`text-base font-bold mb-2 transition-colors font-sans ${activeLayerId === layer.id ? 'text-cream' : 'text-cream/60'}`}>
                          {layer.name}
                        </h4>
                        <p className="text-[11px] text-cream/30 leading-relaxed line-clamp-2 italic font-sans">
                          {layer.description || 'Access to phase-gate requirements'}
                        </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

            {/* Tasks View */}
            <div className="col-span-12 lg:col-span-8">
              <div className="luxury-glass rounded-[24px] md:rounded-[32px] border border-white/5 overflow-hidden min-h-[400px] md:min-h-[600px] flex flex-col shadow-2xl shadow-black/40">
                <div className="p-6 md:p-10 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.02]">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-cream mb-1 md:mb-2">{activeLayer.name}</h3>
                    <p className="text-[10px] md:text-xs text-gold/50 font-medium tracking-wide italic">{activeLayer.description || 'Detailed list of action items'}</p>
                  </div>
                  <div className="text-right flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 w-full sm:w-auto justify-between border-t border-white/5 sm:border-0 pt-4 sm:pt-0">
                    <span className="text-[8px] md:text-[10px] font-bold text-gold uppercase tracking-widest">Documentation Gate</span>
                    <p className="text-lg md:text-xl font-bold text-cream/40">{activeLayer.tasks.length}</p>
                  </div>
                </div>

                <div className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 gap-2">
                    <AnimatePresence mode="popLayout">
                      {filteredTasks.map((task, idx) => (
                        <motion.div
                          key={task.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.02 }}
                          onClick={() => task.description && setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                          className={`group flex flex-col p-5 rounded-2xl border border-transparent transition-all duration-300 ${task.description ? 'cursor-pointer hover:border-gold/20 hover:bg-white/[0.03]' : ''} ${expandedTaskId === task.id ? 'bg-white/[0.05] border-gold/30' : ''}`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
                              task.status === 'completed' 
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                              : task.status === 'in-progress'
                              ? 'bg-gold/10 text-gold border border-gold/20'
                              : 'bg-white/5 text-white/20 border border-white/5'
                            }`}>
                              {task.status === 'completed' ? <CheckCircle2 size={18} /> : 
                               task.status === 'in-progress' ? <Clock size={18} /> : <Circle size={18} />}
                            </div>
                            
                            <div className="flex-1">
                              <h5 className="font-medium text-cream/90 text-sm md:text-md group-hover:text-gold transition-colors leading-snug">
                                {task.title}
                              </h5>
                            </div>

                            <div className="flex items-center gap-3">
                               <span className={`text-[9px] font-bold tracking-[0.15em] px-3 py-1 rounded-full uppercase ${
                                 task.status === 'completed' 
                                 ? 'bg-emerald-500/20 text-emerald-400' 
                                 : task.status === 'in-progress'
                                 ? 'bg-gold/20 text-gold'
                                 : 'bg-white/10 text-cream/30'
                               }`}>
                                 {task.status === 'completed' ? 'Done' : task.status === 'in-progress' ? 'WIP' : 'To-Do'}
                               </span>
                               {task.description && (
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
                            {expandedTaskId === task.id && task.description && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 pr-15 text-xs text-cream/50 leading-relaxed font-sans border-t border-white/5 mt-4">
                                  {task.description}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {filteredTasks.length === 0 && (
                      <div className="py-24 flex flex-col items-center justify-center text-center">
                         <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gold/20 mb-4">
                           <Search size={32} />
                         </div>
                         <p className="text-lg text-cream/30 italic">No tasks match your selection</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                   <button className="w-full py-5 border border-dashed border-gold/20 rounded-2xl flex items-center justify-center gap-3 text-gold/40 font-bold text-xs uppercase tracking-widest hover:border-gold/50 hover:text-gold hover:bg-white/5 transition-all duration-500">
                      <Plus size={16} />
                      <span>Add Strategic Initiative</span>
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                        <h3 className="text-xl md:text-3xl font-bold text-cream">لیست جامع WBS</h3>
                        <p className="text-[10px] md:text-sm text-gold/50 mt-1 italic">ساختار سلسله‌مراتبی تمام پروژه‌ها و اقدامات مارکتینگ VEDESIA</p>
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
                    <div className="min-w-[800px] p-6">
                      <table className="w-full text-right border-separate border-spacing-y-2">
                        <thead className="sticky top-0 bg-[#121212] z-10">
                          <tr className="text-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                            <th className="p-4 md:p-6 text-right">Phase</th>
                            <th className="p-4 md:p-6 text-right">Strategic Layer</th>
                            <th className="p-4 md:p-6 text-right w-1/2">Project / Asset Title</th>
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
                                <p className="font-bold text-cream/90 text-[11px] md:text-sm group-hover:text-gold transition-colors">{project.title}</p>
                              </td>
                              <td className="p-4 md:p-6 bg-white/[0.02] group-hover:bg-white/[0.05] rounded-l-2xl border-y border-white/5">
                                <div className="flex items-center justify-center gap-2 md:gap-3">
                                   <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_8px] ${
                                     project.status === 'completed' ? 'bg-emerald-500 shadow-emerald-500/50' : 
                                     project.status === 'in-progress' ? 'bg-gold shadow-gold/50' : 'bg-white/10'
                                   }`} />
                                   <span className="text-[8px] md:text-[10px] font-bold text-cream/30 uppercase tracking-widest">
                                     {project.status === 'completed' ? 'Verified' : project.status === 'in-progress' ? 'Executing' : 'Scheduled'}
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
                       <p className="text-[10px] md:text-xs font-medium text-cream/30 uppercase tracking-widest">Strategic Initiatives Mapped</p>
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
        <footer className="w-full mt-auto shrink-0 border-t border-white/5 bg-onyx/80 backdrop-blur-2xl pt-20 pb-24 px-6 md:px-12 relative overflow-hidden z-10">
          {/* Decorative background for footer */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-48 -mb-48 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20 text-right md:text-right">
              <div className="md:col-span-2 lg:col-span-2">
                <h3 className="text-2xl font-bold text-gold tracking-[0.3em] uppercase mb-8 font-serif">VEDESIA</h3>
                <p className="text-cream/60 text-sm leading-relaxed max-w-md font-sans text-justify ml-auto">
                  برند VEDESIA با رویکردی پیشرو در بازتعریف سطوح استراتژیک معماری، پیوندی میان تکنولوژی نماهای مدرن و ظرافت‌های هنری سفارشی برقرار کرده است. ما با تمرکز بر فضاهای فاخر داخلی و خارجی، دیدگاه آوانگارد را با میراث طراحی ایتالیایی ترکیب کرده تا استانداردهایی فراتر از صنعت سرامیک خلق کنیم.
                </p>
                <div className="flex items-center justify-end gap-4 mt-10">
                  <div className="italy-accent scale-150 origin-right">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="text-[10px] font-bold text-gold/40 uppercase tracking-[0.4em] font-sans">Milano • Toronto • Global</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-8">ساختار استراتژیک</h4>
                <ul className="space-y-5">
                  {PROJECT_DATA.slice(0, 4).map((phase, i) => (
                    <li key={phase.id}>
                      <button 
                        onClick={() => handlePhaseChange(i)}
                        className="text-cream/40 hover:text-gold text-xs transition-colors font-medium text-right w-full"
                      >
                        {phase.name.split(':')[1] || phase.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-1">
                <h4 className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-8">ارتباطات</h4>
                <ul className="space-y-5">
                  <li>
                    <a href="mailto:info@vedesia.com" className="text-cream/40 hover:text-gold text-xs transition-colors flex items-center justify-end gap-3 font-mono">
                      <span className="order-1">info@vedesia.com</span>
                      <X size={14} className="rotate-45 text-gold/50 order-2" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-cream/40 hover:text-gold text-xs transition-colors flex items-center justify-end gap-3 font-mono">
                      <span className="order-1">www.vedesia.com</span>
                      <Globe size={14} className="text-gold/50 order-2" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-6">
              <p className="text-[10px] text-cream/20 font-medium tracking-widest uppercase font-sans text-center md:text-right order-2 md:order-1">
                © {new Date().getFullYear()} VEDESIA GLOBAL MARKETING STRATEGY • ALL RIGHTS RESERVED
              </p>
              <div className="flex items-center gap-6 order-1 md:order-2">
                 <div className="text-[9px] text-gold/30 font-bold tracking-[0.2em] uppercase">Private & Confidential</div>
                 <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                 <div className="text-[9px] text-gold/30 font-bold tracking-[0.2em] uppercase italic">Revision 2.6.0</div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, sub }: { label: string, value: string | number, icon: React.ReactNode, sub: string }) {
  return (
    <div className="luxury-glass p-6 md:p-8 rounded-[24px] md:rounded-[28px] border border-white/5 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-gold/10 transition-all" />
      <div className="flex items-center justify-between mb-4 md:mb-6 relative z-10">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
          {icon}
        </div>
        <div className="text-right">
           <p className="text-[10px] font-black text-gold/40 uppercase tracking-[0.2em]">{label}</p>
           <h4 className="text-3xl font-bold text-cream mt-1">{value}</h4>
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
