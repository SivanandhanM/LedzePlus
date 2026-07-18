import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WorkflowStep } from '../../data/gstLearningData';
import { 
  Target, Cpu, User, FileOutput, 
  ChevronLeft, ChevronRight, Layers, TrendingUp, ClipboardList
} from 'lucide-react';

interface WorkflowVisualizerProps {
  steps: WorkflowStep[];
  themeColor: string;
}

const themeColors: Record<string, string> = {
  blue: 'from-blue-500 to-cyan-400 text-blue-600 border-blue-500 bg-blue-500/10 dark:bg-blue-500/20',
  green: 'from-emerald-500 to-teal-400 text-emerald-600 border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20',
  orange: 'from-orange-500 to-amber-400 text-orange-600 border-orange-500 bg-orange-500/10 dark:bg-orange-500/20',
  purple: 'from-purple-500 to-fuchsia-400 text-purple-600 border-purple-500 bg-purple-500/10 dark:bg-purple-500/20',
  teal: 'from-teal-500 to-emerald-400 text-teal-600 border-teal-500 bg-teal-500/10 dark:bg-teal-500/20',
  indigo: 'from-indigo-500 to-blue-400 text-indigo-600 border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20',
  rose: 'from-rose-500 to-pink-400 text-rose-600 border-rose-500 bg-rose-500/10 dark:bg-rose-500/20',
  amber: 'from-amber-500 to-yellow-400 text-amber-600 border-amber-500 bg-amber-500/10 dark:bg-amber-500/20',
  sky: 'from-sky-500 to-blue-400 text-sky-600 border-sky-500 bg-sky-500/10 dark:bg-sky-500/20',
  cyan: 'from-cyan-500 to-teal-400 text-cyan-600 border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/20',
};

const bgGlow: Record<string, string> = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  teal: 'bg-teal-500',
  indigo: 'bg-indigo-500',
  rose: 'bg-rose-500',
  amber: 'bg-amber-500',
  sky: 'bg-sky-500',
  cyan: 'bg-cyan-500',
};

const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({ steps, themeColor }) => {
  const themeClass = themeColors[themeColor] || themeColors['blue'];
  const glowColor = bgGlow[themeColor] || bgGlow['blue'];

  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Responsive Gap
  const [gap, setGap] = useState(340);
  useEffect(() => {
    const handleResize = () => {
      setGap(window.innerWidth < 640 ? 280 : 340);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const handlePrev = useCallback(() => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeStepData = steps[activeStep];

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* ── CAROUSEL CONTROLS & PROGRESS ── */}
      <div className="w-full max-w-5xl flex items-center justify-between px-4 mb-8">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Step {activeStep + 1} of {steps.length}
          </span>
          <div className="w-48 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${glowColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrev}
            disabled={activeStep === 0}
            className={`p-2 rounded-full border transition-all ${activeStep === 0 ? 'border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            className={`p-2 rounded-full border transition-all ${activeStep === steps.length - 1 ? 'border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ── INTERACTIVE STORY CAROUSEL ── */}
      <div className="relative w-full h-[250px] flex items-center justify-center overflow-hidden">

        {steps.map((step, index) => {
          const Icon = step.icon;
          const distance = index - activeStep;
          const isActive = distance === 0;
          
          // Story Carousel Animations
          const x = distance * gap;
          const scale = isActive ? 1.0 : index < activeStep ? 0.92 : 0.88;
          const opacity = isActive ? 1 : 0.65;
          const blur = isActive ? 0 : 3;
          const y = isActive ? 0 : 12;
          const zIndex = 40 - Math.abs(distance);

          // Status Badge Color Map
          const statusColors: Record<string, string> = {
            'Manual': 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
            'Auto Generated': 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
            'Validation Required': 'bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
            'System Process': 'bg-blue-100/50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50',
          };
          const badgeClass = statusColors[step.statusType || 'Manual'];

          return (
            <div 
              key={step.id}
              className="absolute"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex }}
            >
              <motion.div
                initial={false}
                onClick={() => setActiveStep(index)}
                animate={{ x, scale, opacity, y, filter: `blur(${blur}px)` }}
                transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
                className={`flex items-center ${isActive ? 'cursor-default' : 'cursor-pointer hover:brightness-105'}`}
                style={{ transformOrigin: 'center center' }}
              >
              {/* Connector to next card (Attached to this card, pointing right) */}
              {index < steps.length - 1 && (
                <div className="absolute left-[100%] top-1/2 -translate-y-1/2 w-[60px] sm:w-[80px] flex items-center justify-center -z-10">
                  <div className={`relative w-full h-[2px] ${isActive ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-zinc-200/50 dark:bg-zinc-800/50'} overflow-hidden rounded-full`}>
                    {isActive && (
                      <motion.div 
                        className={`absolute top-0 left-0 bottom-0 w-[30%] bg-gradient-to-r from-transparent via-${themeColor}-400 to-transparent`}
                        animate={{ x: ['-100%', '300%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* The Card */}
              <div 
                className={`
                  w-[260px] sm:w-[280px] h-[160px] rounded-[24px] p-5 relative overflow-hidden
                  bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl
                  border transition-all duration-300
                  flex flex-col items-start text-left
                  ${isActive 
                    ? `shadow-2xl shadow-${themeColor}-500/15 border-${themeColor}-500/30 ring-1 ring-${themeColor}-500/20` 
                    : 'shadow-md border-zinc-200/50 dark:border-zinc-800/50'
                  }
                `}
              >
                {/* Active Glows */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
                    <div className={`absolute -inset-10 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${themeClass.split(' ')[0]} via-transparent to-transparent pointer-events-none blur-xl`} />
                  </>
                )}

                {/* Header (Badge + Status) */}
                <div className="w-full flex items-center justify-between mb-4 relative z-10">
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full shadow-sm border ${isActive ? `bg-gradient-to-br ${themeClass.split(' ')[0]} ${themeClass.split(' ')[1]} border-white/30 dark:border-white/10 text-white` : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500'}`}>
                     <span className="text-[12px] font-black">{index + 1}</span>
                  </div>
                  
                  {step.statusType && (
                    <div className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeClass}`}>
                      {step.statusType}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 w-full flex items-start gap-3">
                  <div className={`shrink-0 p-2 rounded-xl transition-all ${isActive ? `bg-gradient-to-br ${themeClass.split(' ')[0]} ${themeClass.split(' ')[1]} text-white shadow-md` : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
                    <Icon size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className={`text-sm font-bold leading-tight mb-1 transition-colors ${isActive ? `text-zinc-900 dark:text-zinc-100` : 'text-zinc-600 dark:text-zinc-400'}`}>
                      {step.title}
                    </h4>
                    <p className={`text-[11px] font-medium leading-snug line-clamp-2 transition-colors ${isActive ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-600'}`}>
                       {step.explanation || step.purpose || "Process workflow step."}
                    </p>
                  </div>
                </div>
                
                {/* Bottom Accent Strip */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5">
                    <div className={`w-full h-full ${glowColor}`} />
                  </div>
                )}
              </div>
            </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── ACTIVE STEP DETAILS PANEL ── */}
      <div className="w-full max-w-5xl mx-auto -mt-4 px-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-[24px] border border-zinc-200/50 dark:border-zinc-800/50 p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${themeClass.split(' ')[0]} ${themeClass.split(' ')[1]} text-white`}>
                <activeStepData.icon size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                  {activeStepData.title}
                </h3>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Step {activeStep + 1} Detailed Breakdown
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              
              {/* Core Actions */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 mb-1">
                  <Target size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Purpose</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  {activeStepData.purpose || activeStepData.explanation || 'Primary objective of this workflow step.'}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 mb-1">
                  <Cpu size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">System Action</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  {activeStepData.systemAction || 'System processes records and updates database.'}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1">
                  <User size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">User Action</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  {activeStepData.userAction || 'Review data and confirm step completion.'}
                </p>
              </div>

              {/* Extended Details */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 mb-1">
                  <FileOutput size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Expected Output</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  {activeStepData.output || 'Validated transaction batch ready for next stage.'}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 mb-1">
                  <Layers size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">ERP Module</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  LEDZE+ GST Compliance & Reconciliation
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 mb-1">
                  <TrendingUp size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Business Impact</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  Ensures strict regulatory compliance and tax accuracy.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-500 mb-1">
                  <ClipboardList size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Notes</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium line-clamp-2">
                  {activeStepData.explanation || 'No additional notes provided for this step.'}
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default WorkflowVisualizer;
