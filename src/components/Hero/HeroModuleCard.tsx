import { m } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { memo } from 'react';

interface HeroModuleCardProps {
  title: string;
  desc: string;
  icon: ReactNode;
  path: string;
  colorVar: string; // e.g. '--color-mod-sales'
  delay: number;
}

// ─── Stable Animation Variants ─────────────────────────────────────────────────
const cardHoverVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -6, 
    boxShadow: '0 16px 30px rgba(0,0,0,0.08), 0 0 30px var(--color-mod)',
    borderColor: 'color-mix(in srgb, var(--color-mod) 30%, transparent)',
    transition: { duration: 0.25, ease: 'easeOut' }
  },
  tap: { scale: 0.98, y: -2, transition: { duration: 0.1 } }
};

const iconHoverVariants: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: { scale: 1.05, rotate: 3, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const titleHoverVariants: Variants = {
  initial: { color: 'currentColor' },
  hover: { color: 'var(--color-mod)', transition: { duration: 0.25 } }
};

const bgHoverVariants: Variants = {
  initial: { opacity: 0 },
  hover: { opacity: 0.1, transition: { duration: 0.25 } }
};

const HeroModuleCard = memo(function HeroModuleCard({ title, desc, icon, colorVar, delay }: HeroModuleCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
      className="relative z-20 contain-layout"
      style={{ '--color-mod': `var(${colorVar})` } as React.CSSProperties}
    >
      <m.button
        onClick={() => {
          const element = document.getElementById('modules');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        variants={cardHoverVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="group relative flex items-center gap-4 w-[220px] h-[90px] text-left p-3 rounded-2xl border border-white/20 dark:border-white/5 shadow-lg overflow-hidden bg-white/30 dark:bg-slate-900/40 backdrop-blur-md"
        style={{ contain: 'layout paint style' }}
      >
        {/* Soft breathing glow behind the card content */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{ background: `radial-gradient(circle at center, var(--color-mod) 0%, transparent 70%)` }}
        />

        {/* Hover Highlight Gradient */}
        <m.div 
          variants={bgHoverVariants}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, var(--color-mod), transparent)` }}
        />

        {/* Inner Border Refinement */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 border border-white/5 mix-blend-overlay" />

        {/* Icon Container */}
        <m.div 
          variants={iconHoverVariants}
          className="relative flex-shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center shadow-sm"
          style={{ 
            background: `linear-gradient(135deg, color-mix(in srgb, var(--color-mod) 80%, white), var(--color-mod))`,
            color: 'white',
            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2)'
          }}
        >
          {icon}
        </m.div>

        {/* Text Content */}
        <div className="relative flex flex-col justify-center min-w-0 z-10">
          <m.h3 
            variants={titleHoverVariants}
            className="font-bold text-[14px] text-slate-800 dark:text-slate-100 truncate"
          >
            {title}
          </m.h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-2">
            {desc}
          </p>
        </div>
      </m.button>
    </m.div>
  );
});

export default HeroModuleCard;
