// Re-trigger TS Server
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Eye, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ModuleTheme {
  primary: string;    // e.g. '#15803D'
  accent: string;     // e.g. '#34D399'
  lightBg: string;    // e.g. 'bg-green-50/80 dark:bg-green-900/20'
  lightText: string;  // e.g. 'text-green-600 dark:text-green-400'
  subtitleText: string; // e.g. 'text-green-600 dark:text-green-400'
  hoverShadow: string; // e.g. 'hover:shadow-[0_8px_16px_-6px_rgba(21,128,61,0.2)]'
}

// Pre-built themes matching exactly the LandingModuleCard MODULE_CONFIG
export const MODULE_THEMES: Record<string, ModuleTheme> = {
  purchase: {
    primary: '#2563EB', accent: '#60A5FA',
    lightBg: 'bg-blue-50/80 dark:bg-blue-900/20',
    lightText: 'text-blue-600 dark:text-blue-400',
    subtitleText: 'text-blue-600 dark:text-blue-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(37,99,235,0.2)]',
  },
  sales: {
    primary: '#15803D', accent: '#34D399',
    lightBg: 'bg-green-50/80 dark:bg-green-900/20',
    lightText: 'text-green-600 dark:text-green-400',
    subtitleText: 'text-green-600 dark:text-green-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(21,128,61,0.2)]',
  },
  billing: {
    primary: '#7C3AED', accent: '#C4B5FD',
    lightBg: 'bg-violet-50/80 dark:bg-violet-900/20',
    lightText: 'text-violet-600 dark:text-violet-400',
    subtitleText: 'text-violet-600 dark:text-violet-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(124,58,237,0.2)]',
  },
  inventory: {
    primary: '#0F766E', accent: '#2DD4BF',
    lightBg: 'bg-teal-50/80 dark:bg-teal-900/20',
    lightText: 'text-teal-600 dark:text-teal-400',
    subtitleText: 'text-teal-600 dark:text-teal-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(15,118,110,0.2)]',
  },
  accounting: {
    primary: '#D97706', accent: '#FBBF24',
    lightBg: 'bg-amber-50/80 dark:bg-amber-900/20',
    lightText: 'text-amber-600 dark:text-amber-400',
    subtitleText: 'text-amber-600 dark:text-amber-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(217,119,6,0.2)]',
  },
  payroll: {
    primary: '#BE185D', accent: '#F9A8D4',
    lightBg: 'bg-pink-50/80 dark:bg-pink-900/20',
    lightText: 'text-pink-600 dark:text-pink-400',
    subtitleText: 'text-pink-600 dark:text-pink-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(190,24,93,0.2)]',
  },
  banking: {
    primary: '#2563EB', accent: '#93C5FD',
    lightBg: 'bg-blue-50/80 dark:bg-blue-900/20',
    lightText: 'text-blue-600 dark:text-blue-400',
    subtitleText: 'text-blue-600 dark:text-blue-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(37,99,235,0.2)]',
  },
  gate: {
    primary: '#4F46E5', accent: '#A5B4FC',
    lightBg: 'bg-indigo-50/80 dark:bg-indigo-900/20',
    lightText: 'text-indigo-600 dark:text-indigo-400',
    subtitleText: 'text-indigo-600 dark:text-indigo-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(79,70,229,0.2)]',
  },
  gst: {
    primary: '#EA580C', accent: '#FDBA74',
    lightBg: 'bg-orange-50/80 dark:bg-orange-900/20',
    lightText: 'text-orange-600 dark:text-orange-400',
    subtitleText: 'text-orange-600 dark:text-orange-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(234,88,12,0.2)]',
  },
  dpdp: {
    primary: '#0F766E', accent: '#2DD4BF',
    lightBg: 'bg-teal-50/80 dark:bg-teal-900/20',
    lightText: 'text-teal-600 dark:text-teal-400',
    subtitleText: 'text-teal-600 dark:text-teal-400',
    hoverShadow: 'hover:shadow-[0_8px_16px_-6px_rgba(15,118,110,0.2)]',
  },
};

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
  workflowPreview?: ReactNode;
  backTarget?: string;
  backText?: string;
  theme?: ModuleTheme;
}

export default function Hero({ title, subtitle, description, icon, workflowPreview, backTarget = "modules", backText = "Back to Modules", theme = MODULE_THEMES.gate }: HeroProps) {
  const dynamicBackTarget = typeof window !== 'undefined' ? (sessionStorage.getItem('sourceSection') || backTarget) : backTarget;

  return (
    <div className={`relative ${workflowPreview ? 'pt-6 pb-6 min-h-[85vh] flex items-center' : 'pt-16 pb-8'}`}>
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Header Content */}
        <div className={`grid gap-8 items-center ${workflowPreview ? 'grid-cols-1 lg:grid-cols-[45%_55%]' : 'grid-cols-1'}`}>
          <div className="flex flex-col">
            {/* Back Navigation */}
            <Link
              to="/"
              state={{ scrollTo: dynamicBackTarget }}
              className="self-start inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium mb-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow"
            >
              <ArrowLeft className="w-4 h-4" />
              {backText}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-start gap-6">
                {icon && (
                  <div className={`w-16 h-16 rounded-[16px] ${theme.lightBg} ${theme.lightText} flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700/50 shadow-sm mt-1`}>
                    {icon}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {subtitle && (
                      <h2 className={`${theme.subtitleText} font-bold tracking-wider uppercase text-xs`}>
                        {subtitle}
                      </h2>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider border border-slate-200 dark:border-slate-700 shadow-sm">
                      Enterprise Edition
                    </span>
                  </div>
                  <h1 className="ledze-heading text-[32px] md:text-[48px] lg:text-[60px] mb-4 leading-tight">
                    {title}
                  </h1>

                  {description && (
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium pr-4 text-justify">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Information Strip */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div className={`flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 dark:border-slate-700/50 shadow-sm ${theme.hoverShadow} transition-all cursor-default`}>
                  <div className={`w-8 h-8 rounded-full ${theme.lightBg} ${theme.lightText} flex items-center justify-center mb-2 shadow-inner`}>
                    <Network className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">End-to-End Workflow</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Seamless integration across modules.</p>
                </div>

                <div className={`flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 dark:border-slate-700/50 shadow-sm ${theme.hoverShadow} transition-all cursor-default`}>
                  <div className={`w-8 h-8 rounded-full ${theme.lightBg} ${theme.lightText} flex items-center justify-center mb-2 shadow-inner`}>
                    <Eye className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Real-Time Visibility</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Live metrics and process tracking.</p>
                </div>

                <div className={`flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 dark:border-slate-700/50 shadow-sm ${theme.hoverShadow} transition-all cursor-default`}>
                  <div className={`w-8 h-8 rounded-full ${theme.lightBg} ${theme.lightText} flex items-center justify-center mb-2 shadow-inner`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Enterprise Scalable</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Built for high-volume transactions.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {workflowPreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-full flex items-center justify-center lg:justify-end"
            >
              {workflowPreview}
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
