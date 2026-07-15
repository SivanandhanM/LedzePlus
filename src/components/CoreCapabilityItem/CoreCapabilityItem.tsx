import { m } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface CoreCapabilityItemProps {
  text: string;
  delay?: number;
}

const themeStyles: Record<string, any> = {
  blue: { bg: 'bg-blue-50/60 dark:bg-blue-900/20 group-hover:bg-blue-100/80 dark:group-hover:bg-blue-900/40', border: 'border-l-4 border-l-blue-500 border-t-white/40 border-r-white/40 border-b-white/40 dark:border-white/5', shadow: 'shadow-[0_4px_12px_-4px_rgba(59,130,246,0.1)] hover:shadow-[0_12px_24px_-8px_rgba(59,130,246,0.3)]', iconBg: 'from-blue-400 to-blue-600', textHover: 'group-hover:text-blue-700 dark:group-hover:text-blue-300', arrowBg: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50', arrowText: 'group-hover:text-blue-600', glow: 'rgba(59,130,246,0.4)' },
  emerald: { bg: 'bg-emerald-50/60 dark:bg-emerald-900/20 group-hover:bg-emerald-100/80 dark:group-hover:bg-emerald-900/40', border: 'border-l-4 border-l-emerald-500 border-t-white/40 border-r-white/40 border-b-white/40 dark:border-white/5', shadow: 'shadow-[0_4px_12px_-4px_rgba(16,185,129,0.1)] hover:shadow-[0_12px_24px_-8px_rgba(16,185,129,0.3)]', iconBg: 'from-emerald-400 to-emerald-600', textHover: 'group-hover:text-emerald-700 dark:group-hover:text-emerald-300', arrowBg: 'group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50', arrowText: 'group-hover:text-emerald-600', glow: 'rgba(16,185,129,0.4)' },
  purple: { bg: 'bg-purple-50/60 dark:bg-purple-900/20 group-hover:bg-purple-100/80 dark:group-hover:bg-purple-900/40', border: 'border-l-4 border-l-purple-500 border-t-white/40 border-r-white/40 border-b-white/40 dark:border-white/5', shadow: 'shadow-[0_4px_12px_-4px_rgba(168,85,247,0.1)] hover:shadow-[0_12px_24px_-8px_rgba(168,85,247,0.3)]', iconBg: 'from-purple-400 to-purple-600', textHover: 'group-hover:text-purple-700 dark:group-hover:text-purple-300', arrowBg: 'group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50', arrowText: 'group-hover:text-purple-600', glow: 'rgba(168,85,247,0.4)' },
  orange: { bg: 'bg-orange-50/60 dark:bg-orange-900/20 group-hover:bg-orange-100/80 dark:group-hover:bg-orange-900/40', border: 'border-l-4 border-l-orange-500 border-t-white/40 border-r-white/40 border-b-white/40 dark:border-white/5', shadow: 'shadow-[0_4px_12px_-4px_rgba(249,115,22,0.1)] hover:shadow-[0_12px_24px_-8px_rgba(249,115,22,0.3)]', iconBg: 'from-orange-400 to-orange-600', textHover: 'group-hover:text-orange-700 dark:group-hover:text-orange-300', arrowBg: 'group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50', arrowText: 'group-hover:text-orange-600', glow: 'rgba(249,115,22,0.4)' },
  pink: { bg: 'bg-pink-50/60 dark:bg-pink-900/20 group-hover:bg-pink-100/80 dark:group-hover:bg-pink-900/40', border: 'border-l-4 border-l-pink-500 border-t-white/40 border-r-white/40 border-b-white/40 dark:border-white/5', shadow: 'shadow-[0_4px_12px_-4px_rgba(236,72,153,0.1)] hover:shadow-[0_12px_24px_-8px_rgba(236,72,153,0.3)]', iconBg: 'from-pink-400 to-pink-600', textHover: 'group-hover:text-pink-700 dark:group-hover:text-pink-300', arrowBg: 'group-hover:bg-pink-100 dark:group-hover:bg-pink-900/50', arrowText: 'group-hover:text-pink-600', glow: 'rgba(236,72,153,0.4)' },
  cyan: { bg: 'bg-cyan-50/60 dark:bg-cyan-900/20 group-hover:bg-cyan-100/80 dark:group-hover:bg-cyan-900/40', border: 'border-l-4 border-l-cyan-500 border-t-white/40 border-r-white/40 border-b-white/40 dark:border-white/5', shadow: 'shadow-[0_4px_12px_-4px_rgba(6,182,212,0.1)] hover:shadow-[0_12px_24px_-8px_rgba(6,182,212,0.3)]', iconBg: 'from-cyan-400 to-cyan-600', textHover: 'group-hover:text-cyan-700 dark:group-hover:text-cyan-300', arrowBg: 'group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50', arrowText: 'group-hover:text-cyan-600', glow: 'rgba(6,182,212,0.4)' },
};

const rainbowPattern = ['blue', 'emerald', 'purple', 'orange', 'pink', 'cyan'];

export default function CoreCapabilityItem({ text, delay = 0 }: CoreCapabilityItemProps) {
  // Infer index from the delay prop
  const inferredIndex = Math.round((delay || 0) * 10);
  const themeName = rainbowPattern[inferredIndex % rainbowPattern.length];
  const theme = themeStyles[themeName];

  return (
    <m.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 6, scale: 1.02 }}
      className={`group relative overflow-hidden backdrop-blur-md rounded-r-[18px] rounded-l-[4px] p-4 flex items-center justify-between cursor-pointer transition-all duration-300 border-y border-r border-solid ${theme.border} ${theme.shadow} ${theme.bg}`}
      style={{ boxShadow: `0 0 20px -5px ${theme.glow} inset, 0 8px 24px -8px ${theme.glow}` }}
    >
      {/* Animated Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

      {/* Left Icon + Text */}
      <div className="flex items-center gap-4 relative z-10 pr-2">
        <div className={`w-8 h-8 shrink-0 rounded-full bg-gradient-to-br ${theme.iconBg} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-400`}>
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <span className={`text-[14px] text-slate-800 dark:text-slate-100 font-semibold leading-relaxed ${theme.textHover} transition-colors duration-300 drop-shadow-sm`}>
          {text}
        </span>
      </div>

      {/* Right Arrow */}
      <div className={`shrink-0 relative z-10 w-8 h-8 rounded-full bg-transparent flex items-center justify-center transition-colors duration-300 ${theme.arrowBg}`}>
        <ChevronRight className={`w-5 h-5 text-slate-400 transition-colors duration-300 transform group-hover:translate-x-1 ${theme.arrowText}`} />
      </div>
    </m.div>
  );
}
