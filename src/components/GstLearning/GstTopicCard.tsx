import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GstModuleData } from '../../data/gstLearningData';
import WorkflowVisualizer from './WorkflowVisualizer';
import CollapsibleTimeline from './CollapsibleTimeline';
import { 
  ChevronDown, HelpCircle, Database, 
  Lightbulb, AlertTriangle, PlayCircle, ArrowRight
} from 'lucide-react';

interface GstTopicCardProps {
  data: GstModuleData;
}

const themeColors: Record<string, string> = {
  blue: 'bg-blue-500 text-blue-50 border-blue-400',
  green: 'bg-emerald-500 text-emerald-50 border-emerald-400',
  orange: 'bg-orange-500 text-orange-50 border-orange-400',
  purple: 'bg-purple-500 text-purple-50 border-purple-400',
  teal: 'bg-teal-500 text-teal-50 border-teal-400',
  indigo: 'bg-indigo-500 text-indigo-50 border-indigo-400',
  rose: 'bg-rose-500 text-rose-50 border-rose-400',
  amber: 'bg-amber-500 text-amber-50 border-amber-400',
};

const textColors: Record<string, string> = {
  blue: 'text-blue-500 dark:text-blue-400',
  green: 'text-emerald-500 dark:text-emerald-400',
  orange: 'text-orange-500 dark:text-orange-400',
  purple: 'text-purple-500 dark:text-purple-400',
  teal: 'text-teal-500 dark:text-teal-400',
  indigo: 'text-indigo-500 dark:text-indigo-400',
  rose: 'text-rose-500 dark:text-rose-400',
  amber: 'text-amber-500 dark:text-amber-400',
};

const bgColors: Record<string, string> = {
  blue: 'bg-blue-500/10',
  green: 'bg-emerald-500/10',
  orange: 'bg-orange-500/10',
  purple: 'bg-purple-500/10',
  teal: 'bg-teal-500/10',
  indigo: 'bg-indigo-500/10',
  rose: 'bg-rose-500/10',
  amber: 'bg-amber-500/10',
};

const GstTopicCard: React.FC<GstTopicCardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const headerColor = themeColors[data.themeColor] || themeColors['blue'];
  const textColor = textColors[data.themeColor] || textColors['blue'];
  const bgColor = bgColors[data.themeColor] || bgColors['blue'];

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-5xl mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl bg-white/40 dark:bg-zinc-950/40 backdrop-blur-2xl border border-white/20 dark:border-zinc-800/50"
    >
      {/* Header Section */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-6 sm:p-8 cursor-pointer group ${headerColor}`}
      >
        <div className="flex flex-col items-start text-left">
          <span className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
            {data.filedBy} • {data.frequency}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-2xl opacity-90 leading-relaxed">
            {data.purpose}
          </p>
        </div>
        <motion.div 
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors"
        >
          <ChevronDown size={28} />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Metadata & Details */}
              <div className="lg:col-span-4 space-y-6">
                {/* Generated From */}
                <div className="bg-white/50 dark:bg-zinc-900/50 rounded-2xl p-5 border border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className={textColor} size={20} />
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Generated From</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.generatedFrom.map((mod, i) => (
                      <span key={i} className={`text-xs font-medium px-2.5 py-1.5 rounded-lg ${bgColor} ${textColor}`}>
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Why Panel */}
                <div className="bg-white/50 dark:bg-zinc-900/50 rounded-2xl p-5 border border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle className={textColor} size={20} />
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Why?</h3>
                  </div>
                  <ul className="space-y-3">
                    {data.businessImpact.map((impact, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <CheckCircle className={`shrink-0 mt-0.5 ${textColor}`} size={16} />
                        <span>{impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Did You Know? */}
                <div className="bg-amber-500/10 dark:bg-amber-500/5 rounded-2xl p-5 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-500">
                    <AlertTriangle size={20} />
                    <h3 className="text-lg font-semibold">Did You Know?</h3>
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                    {data.didYouKnow}
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Workflow & Example */}
              <div className="lg:col-span-8 space-y-8 flex flex-col items-center">
                
                {/* Animated Workflow */}
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6 flex items-center justify-center gap-3">
                    <PlayCircle className={textColor} /> Interactive Workflow
                  </h3>
                  <WorkflowVisualizer steps={data.workflow} themeColor={data.themeColor} />
                </div>

                {/* Real Life Example */}
                <div className="w-full bg-white/50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className={textColor} size={24} />
                    <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Real Life Example</h3>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 font-medium mb-4 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
                    {data.example.scenario}
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6">
                    {data.example.steps.map((step, i) => (
                      <React.Fragment key={i}>
                        <div className={`px-4 py-3 rounded-xl text-sm font-medium shadow-sm bg-white dark:bg-zinc-800 border-b-2 border-r-2 ${themeColors[data.themeColor].split(' ')[2]}`}>
                          {step}
                        </div>
                        {i < data.example.steps.length - 1 && (
                          <ArrowRight className="hidden sm:block text-zinc-400" size={20} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Collapsible Timeline */}
                <CollapsibleTimeline timeline={data.timeline} themeColor={data.themeColor} />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// CheckCircle local component override for custom styling in the lists
const CheckCircle = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default GstTopicCard;
