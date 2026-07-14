import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface HeroModuleCardProps {
  title: string;
  desc: string;
  icon: ReactNode;
  path: string;
  colorVar: string; // e.g. '--color-mod-sales'
  delay: number;
}

export default function HeroModuleCard({ title, desc, icon, colorVar, delay }: HeroModuleCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
      className="relative z-20"
      style={{ '--color-mod': `var(${colorVar})` } as React.CSSProperties}
    >
      <motion.button
        onClick={() => {
          const element = document.getElementById('modules');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        // Idle floating animation
        animate={{ y: [-5, 5, -5] }}
        transition={{
          duration: 4 + (delay * 1.2),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0
        }}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 40px var(--color-mod)',
          borderColor: 'color-mix(in srgb, var(--color-mod) 50%, transparent)'
        }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 w-[220px] h-[90px] text-left p-3 rounded-2xl glass-premium border border-white/40 dark:border-white/10 shadow-xl overflow-hidden transition-all duration-300 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md"
      >
        {/* Soft breathing glow behind the card content */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, var(--color-mod) 0%, transparent 70%)` }}
        />

        {/* Hover Highlight Gradient */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(135deg, var(--color-mod), transparent)` }}
        />

        {/* Icon Container */}
        <div 
          className="relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-110"
          style={{ 
            background: `linear-gradient(135deg, var(--color-mod), color-mix(in srgb, var(--color-mod) 70%, black))`,
            color: 'white'
          }}
        >
          {icon}
        </div>

        {/* Text Content */}
        <div className="relative flex flex-col justify-center min-w-0">
          <h3 className="font-bold text-[14px] text-slate-800 dark:text-slate-100 truncate group-hover:text-[var(--color-mod)] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-2">
            {desc}
          </p>
        </div>
      </motion.button>
    </motion.div>
  );
}
