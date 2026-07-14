import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { WorkflowData, WorkflowNode } from '../../workflows/types';

interface PreviewProps {
  workflow: WorkflowData;
  accentColor?: string;
  moduleName?: string;
}

const renderIcon = (name: string, className?: string) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.Circle;
  return <Icon className={className} />;
};

// Map accent color to gradients for themes
const themeGradients: Record<string, { bg: string, ring: string, glow: string }> = {
  blue: { bg: 'from-blue-600 to-indigo-600', ring: 'ring-blue-500', glow: 'rgba(59,130,246,0.5)' },
  indigo: { bg: 'from-indigo-600 to-violet-600', ring: 'ring-indigo-500', glow: 'rgba(99,102,241,0.5)' },
  emerald: { bg: 'from-emerald-500 to-cyan-500', ring: 'ring-emerald-400', glow: 'rgba(16,185,129,0.5)' },
  orange: { bg: 'from-orange-500 to-amber-500', ring: 'ring-orange-400', glow: 'rgba(249,115,22,0.5)' },
  cyan: { bg: 'from-cyan-500 to-blue-500', ring: 'ring-cyan-400', glow: 'rgba(6,182,212,0.5)' },
  purple: { bg: 'from-purple-600 to-fuchsia-600', ring: 'ring-purple-500', glow: 'rgba(168,85,247,0.5)' },
  rose: { bg: 'from-rose-500 to-pink-500', ring: 'ring-rose-400', glow: 'rgba(244,63,94,0.5)' },
  slate: { bg: 'from-slate-600 to-indigo-600', ring: 'ring-slate-500', glow: 'rgba(100,116,139,0.5)' }
};

// Map node colors to their specific gradients
const nodeGradients: Record<string, string> = {
  'text-slate-500': 'from-slate-500 to-slate-700',
  'text-blue-500': 'from-blue-500 to-indigo-600',
  'text-indigo-500': 'from-indigo-500 to-violet-600',
  'text-purple-500': 'from-purple-500 to-fuchsia-600',
  'text-orange-500': 'from-orange-500 to-red-500',
  'text-emerald-500': 'from-emerald-500 to-teal-600',
  'text-cyan-500': 'from-cyan-500 to-blue-500',
  'text-rose-500': 'from-rose-500 to-pink-600',
};

export default function AnimatedWorkflowPreview({ workflow, accentColor = 'blue', moduleName = 'MODULE' }: PreviewProps) {
  const [activeNode, setActiveNode] = useState<WorkflowNode | null>(null);
  const [step, setStep] = useState(0);
  
  const theme = themeGradients[accentColor] || themeGradients.blue;
  const totalSteps = workflow.nodes.length + workflow.edges.length;
  const isComplete = step > totalSteps + 1;

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep <= totalSteps + 2) { // extra steps for completion flash
        setStep(currentStep + 1);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1000); 

    return () => clearInterval(interval);
  }, [workflow, totalSteps]);

  const handleNodeClick = () => {
    const target = document.getElementById('business-workflow');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      target.classList.add('ring-4', 'ring-indigo-500/50', 'ring-offset-8', 'rounded-3xl', 'transition-all', 'duration-500');
      setTimeout(() => target.classList.remove('ring-4', 'ring-indigo-500/50', 'ring-offset-8'), 2000);
    }
  };

  const getEdgePath = (edge: any) => {
    const sourceNode = workflow.nodes.find(n => n.id === edge.source);
    const targetNode = workflow.nodes.find(n => n.id === edge.target);
    if (!sourceNode || !targetNode) return "";
    return edge.path || `M ${sourceNode.x} ${sourceNode.y} C ${sourceNode.x + (targetNode.x-sourceNode.x)/2} ${sourceNode.y}, ${sourceNode.x + (targetNode.x-sourceNode.x)/2} ${targetNode.y}, ${targetNode.x} ${targetNode.y}`;
  };

  const renderEdgePath = (edge: any) => {
    const d = getEdgePath(edge);
    const isVisible = step > workflow.nodes.findIndex(n => n.id === edge.target);
    const isFlash = step === totalSteps + 1;
    
    return (
      <g key={edge.id}>
        {/* Base Track */}
        <path d={d} fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="0.8" strokeLinecap="round" />
        {/* Drawn Path */}
        <motion.path
          d={d} fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: isFlash ? 1 : 0.8, filter: isFlash ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none' } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </g>
    );
  };

  const renderDataParticles = (edge: any) => {
    const d = getEdgePath(edge);
    const isVisible = step > workflow.nodes.findIndex(n => n.id === edge.target) + 1;
    if (!isVisible) return null;

    // Generate 3 particles per edge moving at different offsets
    return [0, 0.33, 0.66].map((offset, i) => (
      <motion.path
        key={`glow-${edge.id}-${i}`}
        d={d} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, pathOffset: offset, opacity: 0 }}
        animate={{ 
          pathLength: [0, 0.1, 0], 
          pathOffset: [offset, offset + 0.9, offset + 1],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: isComplete ? 2 : 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
        style={{ filter: `drop-shadow(0 0 6px ${theme.glow})` }}
      />
    ));
  };

  return (
    <div 
      className="relative w-full aspect-[4/3] max-w-[700px] mx-auto rounded-[28px] overflow-hidden bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] flex items-center justify-center"
      onMouseLeave={() => setActiveNode(null)}
    >
      
      {/* Background Mesh Gradients & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[28px]">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        {/* Ambient Lights */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className={`absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-gradient-to-br ${theme.bg} rounded-full blur-[80px] opacity-30 mix-blend-screen`} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className={`absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-gradient-to-tl ${theme.bg} rounded-full blur-[80px] opacity-20 mix-blend-screen`} />
        
        {/* Floating Background Icons */}
        <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-[20%] left-[80%] text-slate-300 dark:text-slate-700 opacity-20">
          <LucideIcons.Database size={48} />
        </motion.div>
        <motion.div animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-[70%] left-[10%] text-slate-300 dark:text-slate-700 opacity-20">
          <LucideIcons.Server size={64} />
        </motion.div>
      </div>

      {/* Internal Panel Header */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30 pointer-events-none">
        <h3 className="text-[11px] md:text-sm font-black text-slate-700 dark:text-white tracking-widest uppercase mb-1.5 opacity-90 drop-shadow-sm">
          {moduleName} WORKFLOW
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[9px] md:text-[11px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider drop-shadow-sm">Live Process Flow</span>
        </div>
      </div>

      {/* Live Status Badge */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 pointer-events-none">
        <div className="px-3 py-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-sm flex items-center gap-2">
          <LucideIcons.Activity className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-500" />
          <span className="text-[9px] md:text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">System Active</span>
        </div>
      </div>

      {/* Bottom Legend */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 w-max max-w-[90%] pointer-events-none hidden sm:block">
        <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-2.5 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/50 dark:border-slate-700/50 shadow-sm">
          {workflow.nodes.slice(0, 5).map((node) => (
             <div key={node.id} className="flex items-center gap-1.5">
               <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${nodeGradients[node.color || ''] || 'from-slate-400 to-slate-500'}`} />
               <span className="text-[8.5px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider truncate max-w-[80px]">{node.label}</span>
             </div>
          ))}
        </div>
      </div>

      {/* Tooltip Overlay */}
      <AnimatePresence>
        {activeNode && activeNode.tooltip && (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-0 left-0 right-0 z-50 px-5 py-3 bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl border-t border-white/40 dark:border-white/10"
          >
            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm mb-0.5">
              {renderIcon(activeNode.icon, "w-4 h-4")}
              {activeNode.label}
            </h4>
            <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-snug line-clamp-2">
              {activeNode.tooltip.purpose}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-slate-400">
               <span>Estimated Process Time</span>
               <span className="text-emerald-500 flex items-center gap-1"><LucideIcons.Zap className="w-3 h-3" /> {activeNode.tooltip.estimatedTime || 'Real-time'}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full h-full p-8 z-10">
        {/* SVG Canvas for Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" className="text-slate-400 dark:text-slate-500" />
              <stop offset="100%" stopColor="currentColor" className="text-slate-300 dark:text-slate-600" />
            </linearGradient>
          </defs>
          {workflow.edges.map(renderEdgePath)}
          {workflow.edges.map(renderDataParticles)}
        </svg>

        {/* Nodes */}
        {workflow.nodes.map((node, index) => {
          const isVisible = step >= index;
          const isActive = step === index;
          const isHovered = activeNode?.id === node.id;
          const isFlash = step === totalSteps + 1;
          
          // Determine status based on sequence position
          const status = isComplete ? 'completed' : (isActive ? 'running' : (isVisible ? 'completed' : 'pending'));
          const gradientClass = nodeGradients[node.color || ''] || 'from-slate-600 to-slate-800';

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={isVisible ? { 
                opacity: 1, 
                scale: isHovered || isActive || isFlash ? 1.05 : 1, 
                y: isHovered ? -8 : (isComplete && !activeNode ? [0, -4, 0] : 0),
                rotate: isHovered ? 2 : 0,
                filter: isFlash || isActive ? `drop-shadow(0 0 15px ${theme.glow})` : 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
              } : {}}
              transition={{ 
                duration: 0.5,
                y: isComplete && !activeNode && !isHovered ? { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 } : { duration: 0.3 },
                rotate: { duration: 0.3 }
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node)}
              onClick={handleNodeClick}
            >
              <div className="flex flex-col items-center gap-2">
                {/* Status Indicator */}
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 z-30 transition-colors duration-300 ${status === 'completed' ? 'bg-emerald-500' : (status === 'running' ? 'bg-blue-500 animate-pulse' : 'bg-slate-300')}`} />
                
                {/* Ripple Effect for active node */}
                {isActive && (
                  <motion.div 
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl bg-white/20 z-0"
                  />
                )}

                {/* Node Box */}
                <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradientClass} shadow-[0_8px_16px_-6px_rgba(0,0,0,0.3)] border border-white/20 transition-all duration-300 overflow-hidden`}>
                  {/* Inner Glass Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                  {renderIcon(node.icon, "w-6 h-6 text-white drop-shadow-md relative z-10")}
                </div>
                
                {/* Label */}
                <div className={`text-[10px] md:text-[11px] font-bold tracking-wide whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm transition-colors duration-300 ${isHovered ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                  {node.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
