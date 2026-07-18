import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, LayoutGroup } from 'framer-motion';
import type { GstModuleData } from '../../data/gstLearningData';
import WorkflowVisualizer from './WorkflowVisualizer';
import { 
  ChevronLeft, ArrowRight, CheckCircle2, Database,
  AlertTriangle, Lightbulb, ShieldCheck, Activity, Zap, TrendingUp, Briefcase, FileText
} from 'lucide-react';

interface GstModalProps {
  data: GstModuleData;
  onClose: () => void;
  onNavigate?: (id: string) => void;
}

const themeColors: Record<string, string> = {
  blue: 'bg-blue-500 text-blue-50',
  green: 'bg-emerald-500 text-emerald-50',
  orange: 'bg-orange-500 text-orange-50',
  purple: 'bg-purple-500 text-purple-50',
  teal: 'bg-teal-500 text-teal-50',
  indigo: 'bg-indigo-500 text-indigo-50',
  rose: 'bg-rose-500 text-rose-50',
  amber: 'bg-amber-500 text-amber-50',
  sky: 'bg-sky-500 text-sky-50',
  cyan: 'bg-cyan-500 text-cyan-50',
};

const textColors: Record<string, string> = {
  blue: 'text-blue-600 dark:text-blue-400',
  green: 'text-emerald-600 dark:text-emerald-400',
  orange: 'text-orange-600 dark:text-orange-400',
  purple: 'text-purple-600 dark:text-purple-400',
  teal: 'text-teal-600 dark:text-teal-400',
  indigo: 'text-indigo-600 dark:text-indigo-400',
  rose: 'text-rose-600 dark:text-rose-400',
  amber: 'text-amber-600 dark:text-amber-400',
  sky: 'text-sky-600 dark:text-sky-400',
  cyan: 'text-cyan-600 dark:text-cyan-400',
};

const bgColors: Record<string, string> = {
  blue: 'bg-blue-500/10 dark:bg-blue-500/20',
  green: 'bg-emerald-500/10 dark:bg-emerald-500/20',
  orange: 'bg-orange-500/10 dark:bg-orange-500/20',
  purple: 'bg-purple-500/10 dark:bg-purple-500/20',
  teal: 'bg-teal-500/10 dark:bg-teal-500/20',
  indigo: 'bg-indigo-500/10 dark:bg-indigo-500/20',
  rose: 'bg-rose-500/10 dark:bg-rose-500/20',
  amber: 'bg-amber-500/10 dark:bg-amber-500/20',
  sky: 'bg-sky-500/10 dark:bg-sky-500/20',
  cyan: 'bg-cyan-500/10 dark:bg-cyan-500/20',
};

// Map business impact icons to standard icons
const impactIcons = [ShieldCheck, Activity, Zap, TrendingUp, Briefcase];
const impactColors = ['blue', 'green', 'purple', 'orange', 'rose'];

const GstModal: React.FC<GstModalProps> = ({ data, onClose, onNavigate }) => {
  const headerColor = themeColors[data.themeColor] || themeColors['blue'];
  const textColor = textColors[data.themeColor] || textColors['blue'];
  const bgColor = bgColors[data.themeColor] || bgColors['blue'];
  const modalRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Cycle through scenario steps has been removed per request.
  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 lg:p-6 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-xl pointer-events-auto"
      />

      <div style={{ perspective: 1200 }} className="w-full h-full max-w-5xl mx-auto flex items-center justify-center pointer-events-none">
        <LayoutGroup>
          <motion.div
            layoutId={`gst-card-${data.id}`}
            ref={modalRef}
            initial={{ rotateX: 15, y: 50, scale: 0.95, opacity: 0 }}
            animate={{ rotateX: 0, y: 0, scale: 1, opacity: 1 }}
            exit={{ rotateX: -10, scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="w-full h-full max-h-[96vh] bg-zinc-50 dark:bg-zinc-950 rounded-[24px] sm:rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col pointer-events-auto border border-zinc-200/50 dark:border-zinc-800/50 relative"
          >
            {/* Global Enterprise Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Soft Radial Blobs */}
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className={`absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[100px] ${headerColor.split(' ')[0]}`} 
            />
            <motion.div 
              animate={{ rotate: -360, scale: [1, 1.3, 1] }} 
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[100px]" 
            />

            {/* --- 1. HERO HEADER REDESIGN --- */}
            <div className={`shrink-0 px-8 py-10 relative overflow-hidden ${headerColor} isolate`}>
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 opacity-80 bg-gradient-to-br from-black/20 to-transparent" />
              
              {/* Geometric Shapes */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-10 w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-3xl transform rotate-12" 
              />
              <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 right-32 w-32 h-32 bg-white/5 rounded-full backdrop-blur-3xl" 
              />

              {/* Particles */}
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -100], 
                      opacity: [0, 1, 0],
                      x: Math.sin(i) * 20
                    }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    style={{ left: `${10 + Math.random() * 80}%`, top: '90%' }}
                  />
                ))}
              </div>

              {/* Huge Watermark */}
              <div className="absolute -right-10 -top-10 text-[180px] font-black text-white/5 select-none leading-none tracking-tighter">
                {data.id.split('-')[0].toUpperCase()}
              </div>
              
              <div className="flex items-start gap-6 relative z-10">
                <button
                  onClick={onClose}
                  className="shrink-0 mt-1 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xl transition-all hover:scale-110 active:scale-95 border border-white/10 shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div layoutId={`badge-${data.id}`} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-black/30 text-white backdrop-blur-md border border-white/20 shadow-inner">
                      <ShieldCheck size={12} />
                      {data.frequency}
                    </motion.div>
                    <div className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/20">
                      {data.category}
                    </div>
                  </div>
                  <motion.h2 layoutId={`title-${data.id}`} className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white drop-shadow-md mb-3">
                    {data.title}
                  </motion.h2>
                  <motion.p layoutId={`desc-${data.id}`} className="text-sm sm:text-base text-white/90 font-medium max-w-3xl leading-relaxed backdrop-blur-sm">
                    {data.purpose}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Scrollable Flow Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10">
              
              <div className="w-full max-w-5xl mx-auto flex flex-col px-4 sm:px-8 py-8 gap-12">
                
                {/* --- 2. ACTIVE WORKFLOW CARD --- */}
                <div className="w-full relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-xl ${bgColor} ${textColor}`}>
                      <Activity size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Interactive Workflow</h3>
                  </div>
                  <WorkflowVisualizer steps={data.workflow} themeColor={data.themeColor} />
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

                {/* --- 4. ERP DATA FLOW --- */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="w-full relative"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400">
                      <Database size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">ERP Pipeline</h3>
                  </div>
                  
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                    {/* Pipeline Line Background */}
                    <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 hidden md:block" />
                    
                    {data.generatedFrom.map((source, i) => (
                      <React.Fragment key={i}>
                        <motion.div 
                          whileHover={{ y: -5, scale: 1.05 }}
                          className="relative z-10 flex flex-col items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 shadow-lg shadow-zinc-200/50 dark:shadow-black/50 min-w-[120px]"
                        >
                          <div className={`p-3 rounded-full mb-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-500`}>
                            <Briefcase size={20} />
                          </div>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide text-center">
                            {source}
                          </span>
                        </motion.div>

                        {i < data.generatedFrom.length - 1 && (
                          <div className="hidden md:flex relative z-10 w-16 h-8 items-center justify-center">
                            {/* Animated dot on connector */}
                            <motion.div
                              className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                              animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                    
                    <div className="hidden md:flex relative z-10 w-16 h-8 items-center justify-center">
                      <motion.div
                        className={`w-2 h-2 rounded-full ${headerColor.split(' ')[0].replace('bg-', 'bg-')} shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
                        animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`relative z-10 flex flex-col items-center border border-white/20 rounded-2xl p-4 shadow-xl min-w-[120px] ${headerColor}`}
                    >
                      <div className="p-3 rounded-full mb-3 bg-white/20 text-white backdrop-blur-md">
                        <FileText size={20} />
                      </div>
                      <span className="text-xs font-bold text-white uppercase tracking-wide text-center">
                        {data.title}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* --- 6. REAL BUSINESS SCENARIO --- */}
                {data.example && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="w-full relative"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 dark:bg-orange-500/20 dark:text-orange-400">
                        <Lightbulb size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Business Scenario</h3>
                      <div className="ml-2 text-sm font-semibold text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800 px-3 py-1 rounded-full">
                        "{data.example.scenario}"
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {data.example.steps.map((step, i) => {
                        const isActive = true;
                        const isCompleted = false;
                        return (
                          <motion.div
                            key={i}
                            layout
                            className={`
                              relative p-5 rounded-2xl border transition-all duration-500 overflow-hidden
                              bg-white dark:bg-zinc-900 shadow-xl border-${data.themeColor.split('-')[0]}-400 dark:border-${data.themeColor.split('-')[0]}-600 scale-100 z-10 hover:scale-105 hover:-translate-y-1
                            `}
                          >
                            {isActive && (
                              <motion.div layoutId="scenario-highlight" className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-50`} />
                            )}
                            <div className="relative z-10 flex flex-col">
                              <div className="flex items-center justify-between mb-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${isActive ? `${headerColor}` : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500'}`}>
                                  {i + 1}
                                </div>
                                {isCompleted && <CheckCircle2 size={16} className="text-emerald-500" />}
                              </div>
                              <p className={`text-sm font-bold leading-snug ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'}`}>
                                {step}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* --- 5. BUSINESS BENEFITS --- */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="w-full relative"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400">
                      <TrendingUp size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Business Benefits</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {data.businessImpact.map((impact, i) => {
                      const Icon = impactIcons[i % impactIcons.length];
                      const bColorName = impactColors[i % impactColors.length];
                      const bgC = bgColors[bColorName] || 'bg-blue-500/10';
                      const textC = textColors[bColorName] || 'text-blue-500';
                      
                      return (
                        <motion.div 
                          key={i}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm overflow-hidden flex flex-col justify-between min-h-[140px]"
                        >
                          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${bgC.split(' ')[0]} to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                          <div className={`p-3 rounded-xl w-max mb-4 ${bgC} ${textC}`}>
                            <Icon size={20} />
                          </div>
                          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-snug relative z-10">
                            {impact}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* --- 7. IMPORTANT NOTE --- */}
                {(data.importantNote || data.didYouKnow) && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    className="w-full relative bg-gradient-to-r from-amber-500/10 to-red-500/10 dark:from-amber-900/30 dark:to-red-900/30 border-l-4 border-amber-500 rounded-r-2xl p-6 sm:p-8 shadow-lg overflow-hidden flex items-start gap-6"
                  >
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 text-amber-500/10 dark:text-amber-500/5 pointer-events-none">
                      <AlertTriangle size={200} />
                    </div>
                    <div className="p-3 bg-amber-500 rounded-full text-white shadow-lg shrink-0 relative z-10">
                      <AlertTriangle size={24} />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-lg font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">
                        {data.importantNote?.title || '⚠ Important'}
                      </h4>
                      {data.importantNote?.items ? (
                        <ul className="space-y-2">
                          {data.importantNote.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm font-semibold text-amber-900/80 dark:text-amber-200/80">
                              <span className="text-amber-500 mt-1">•</span> {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm font-semibold text-amber-900/80 dark:text-amber-200/80">
                          {data.didYouKnow}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* --- 8. RELATED RETURNS --- */}
                {data.relatedReturns && data.relatedReturns.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="w-full relative mt-4"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        <Briefcase size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Related Modules</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      {data.relatedReturns.map((related, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ y: -3, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onNavigate && onNavigate(related.toLowerCase())}
                          className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                        >
                          <div className={`w-2 h-2 rounded-full ${bgColors[impactColors[i % impactColors.length]].split(' ')[0].replace('/10', '')}`} />
                          <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {related}
                          </span>
                          <ArrowRight size={14} className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.3); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(75, 85, 99, 0.3); }
      `}} />
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default GstModal;
