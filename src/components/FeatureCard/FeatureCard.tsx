import type { ReactNode, MouseEvent } from 'react';
import { m } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
  className?: string;
  colorTheme?: string;
}

const themeStyles: Record<string, any> = {
  blue: { bg: 'from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40', border: 'border-blue-400 dark:border-blue-800', shadow: 'hover:shadow-[0_20px_40px_rgba(59,130,246,0.18)]', iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600', iconText: 'text-white', glow: 'rgba(59,130,246,0.15)', blob: 'bg-blue-300 dark:bg-blue-800' },
  indigo: { bg: 'from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/40', border: 'border-indigo-400 dark:border-indigo-800', shadow: 'hover:shadow-[0_20px_40px_rgba(99,102,241,0.18)]', iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600', iconText: 'text-white', glow: 'rgba(99,102,241,0.15)', blob: 'bg-indigo-300 dark:bg-indigo-800' },
  emerald: { bg: 'from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/40', border: 'border-emerald-400 dark:border-emerald-800', shadow: 'hover:shadow-[0_20px_40px_rgba(16,185,129,0.18)]', iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600', iconText: 'text-white', glow: 'rgba(16,185,129,0.15)', blob: 'bg-emerald-300 dark:bg-emerald-800' },
  orange: { bg: 'from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/40', border: 'border-orange-400 dark:border-orange-800', shadow: 'hover:shadow-[0_20px_40px_rgba(249,115,22,0.18)]', iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600', iconText: 'text-white', glow: 'rgba(249,115,22,0.15)', blob: 'bg-orange-300 dark:bg-orange-800' },
  cyan: { bg: 'from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/40', border: 'border-cyan-400 dark:border-cyan-800', shadow: 'hover:shadow-[0_20px_40px_rgba(6,182,212,0.18)]', iconBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600', iconText: 'text-white', glow: 'rgba(6,182,212,0.15)', blob: 'bg-cyan-300 dark:bg-cyan-800' },
  purple: { bg: 'from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40', border: 'border-purple-400 dark:border-purple-800', shadow: 'hover:shadow-[0_20px_40px_rgba(168,85,247,0.18)]', iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600', iconText: 'text-white', glow: 'rgba(168,85,247,0.15)', blob: 'bg-purple-300 dark:bg-purple-800' },
  violet: { bg: 'from-violet-50 to-violet-100 dark:from-violet-950/40 dark:to-violet-900/40', border: 'border-violet-400 dark:border-violet-800', shadow: 'hover:shadow-[0_20px_40px_rgba(139,92,246,0.18)]', iconBg: 'bg-gradient-to-br from-violet-500 to-violet-600', iconText: 'text-white', glow: 'rgba(139,92,246,0.15)', blob: 'bg-violet-300 dark:bg-violet-800' },
  fuchsia: { bg: 'from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-950/40 dark:to-fuchsia-900/40', border: 'border-fuchsia-400 dark:border-fuchsia-800', shadow: 'hover:shadow-[0_20px_40px_rgba(217,70,239,0.18)]', iconBg: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600', iconText: 'text-white', glow: 'rgba(217,70,239,0.15)', blob: 'bg-fuchsia-300 dark:bg-fuchsia-800' },
  pink: { bg: 'from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/40', border: 'border-pink-400 dark:border-pink-800', shadow: 'hover:shadow-[0_20px_40px_rgba(236,72,153,0.18)]', iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600', iconText: 'text-white', glow: 'rgba(236,72,153,0.15)', blob: 'bg-pink-300 dark:bg-pink-800' },
  rose: { bg: 'from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/40', border: 'border-rose-400 dark:border-rose-800', shadow: 'hover:shadow-[0_20px_40px_rgba(244,63,94,0.18)]', iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600', iconText: 'text-white', glow: 'rgba(244,63,94,0.15)', blob: 'bg-rose-300 dark:bg-rose-800' },
  teal: { bg: 'from-teal-50 to-teal-100 dark:from-teal-950/40 dark:to-teal-900/40', border: 'border-teal-400 dark:border-teal-800', shadow: 'hover:shadow-[0_20px_40px_rgba(20,184,166,0.18)]', iconBg: 'bg-gradient-to-br from-teal-500 to-teal-600', iconText: 'text-white', glow: 'rgba(20,184,166,0.15)', blob: 'bg-teal-300 dark:bg-teal-800' },
  sky: { bg: 'from-sky-50 to-sky-100 dark:from-sky-950/40 dark:to-sky-900/40', border: 'border-sky-400 dark:border-sky-800', shadow: 'hover:shadow-[0_20px_40px_rgba(14,165,233,0.18)]', iconBg: 'bg-gradient-to-br from-sky-500 to-sky-600', iconText: 'text-white', glow: 'rgba(14,165,233,0.15)', blob: 'bg-sky-300 dark:bg-sky-800' },
  amber: { bg: 'from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/40', border: 'border-amber-400 dark:border-amber-800', shadow: 'hover:shadow-[0_20px_40px_rgba(245,158,11,0.18)]', iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600', iconText: 'text-white', glow: 'rgba(245,158,11,0.15)', blob: 'bg-amber-300 dark:bg-amber-800' },
};

// Module-specific color patterns
const modulePatterns: Record<string, string[]> = {
  '/sales': ['indigo', 'violet', 'fuchsia', 'purple', 'pink', 'rose'],
  '/purchase': ['blue', 'sky', 'cyan', 'teal', 'emerald', 'indigo'],
  '/inventory': ['emerald', 'teal', 'cyan', 'blue', 'sky', 'emerald'],
  '/accounting': ['orange', 'amber', 'rose', 'pink', 'fuchsia', 'orange'],
  '/banking': ['teal', 'emerald', 'cyan', 'sky', 'blue', 'indigo'],
  '/billing': ['purple', 'fuchsia', 'pink', 'rose', 'violet', 'indigo'],
  '/payroll': ['pink', 'rose', 'fuchsia', 'purple', 'violet', 'indigo'],
  '/gate-management': ['sky', 'blue', 'indigo', 'violet', 'purple', 'cyan'],
  '/gst-learning': ['orange', 'rose', 'pink', 'fuchsia', 'purple', 'amber'],
};

const fallbackPattern = ['blue', 'indigo', 'emerald', 'orange', 'cyan', 'purple'];

export default function FeatureCard({ title, description, icon, delay = 0, className = '' }: FeatureCardProps) {
  const location = useLocation();
  const pattern = modulePatterns[location.pathname] || fallbackPattern;
  
  const inferredIndex = Math.round((delay || 0) * 10);
  const themeName = pattern[inferredIndex % pattern.length];
  const theme = themeStyles[themeName] || themeStyles.blue;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Defer the write to prevent synchronous layout thrashing (Read-Write loop)
    requestAnimationFrame(() => {
      if (e.currentTarget) {
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden backdrop-blur-xl border ${theme.border} rounded-[24px] p-7 transition-all duration-300 cursor-pointer shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:scale-[1.03] ${theme.shadow} ${className}`}
      style={{ contain: 'layout paint style' }}
    >
      {/* Base Pastel Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-100 group-hover:opacity-95 transition-opacity duration-500`} />
      
      {/* Very Light Diagonal Abstract Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 16px)' }}
      />
      
      {/* Blurred Floating Color Blobs */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${theme.blob} opacity-30 dark:opacity-20 blur-3xl group-hover:scale-150 group-hover:opacity-40 transition-all duration-700 ease-in-out`} style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }} />
      <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full ${theme.blob} opacity-20 dark:opacity-10 blur-3xl group-hover:scale-150 group-hover:opacity-30 transition-all duration-700 ease-in-out`} style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }} />

      {/* Light Noise Texture */}
      <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', transform: 'translateZ(0)' }} />

      {/* Mouse Follow Radial Light Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ background: `radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${theme.glow}, transparent 50%)` }}
      />

      {/* Decorative Dots Pattern */}
      <div className="absolute top-5 right-5 grid grid-cols-3 gap-[3px] opacity-[0.15] dark:opacity-[0.25] group-hover:opacity-[0.35] transition-opacity duration-500">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`w-[3px] h-[3px] rounded-full ${theme.blob} mix-blend-multiply dark:mix-blend-screen`} />
        ))}
      </div>

      {/* Top Inner Highlight Overlay */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent opacity-60" />

      {/* Icon Container */}
      <div className="relative mb-6 inline-block z-10">
        <m.div 
          className="absolute inset-0 rounded-2xl bg-current opacity-30 blur-md"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: theme.glow, willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        />
        <div className={`relative w-14 h-14 rounded-[16px] ${theme.iconBg} ${theme.iconText} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 w-7 h-7 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>

      {/* Text Content */}
      <h3 className="relative z-10 text-[20px] font-bold text-slate-900 dark:text-white mb-3 leading-tight transition-colors duration-300 drop-shadow-sm">
        {title}
      </h3>
      
      <p className="relative z-10 text-[14px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium transition-colors duration-300">
        {description}
      </p>
    </m.div>
  );
}
