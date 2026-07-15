// Re-trigger TS Server
import type { ReactNode } from 'react';
import { memo } from 'react';
import { m } from 'framer-motion';
import { CheckCircle2, Eye, Network } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
  workflowPreview?: ReactNode;
  backTarget?: string;
  backText?: string;
}

const Hero = memo(function Hero({ 
  title, 
  subtitle, 
  description, 
  icon, 
  workflowPreview 
}: HeroProps) {

  return (
    <div className={`relative ${workflowPreview ? 'pt-6 pb-6 min-h-[85vh] flex items-center' : 'pt-16 pb-8'}`}>
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Header Content */}
        <div className={`grid gap-8 items-center ${workflowPreview ? 'grid-cols-1 lg:grid-cols-[45%_55%]' : 'grid-cols-1'}`}>
          <div className="flex flex-col">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-start gap-6">
                {icon && (
                  <div className="w-16 h-16 rounded-[16px] bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700/50 shadow-sm mt-1">
                    {icon}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {subtitle && (
                      <h2 className="text-primary font-bold tracking-wider uppercase text-xs">
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
                <div className="flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 dark:border-slate-700/50 shadow-sm hover:shadow-[0_8px_16px_-6px_rgba(var(--color-primary)/0.2)] transition-all cursor-default">
                  <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-2 shadow-inner">
                    <Network className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">End-to-End Workflow</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Seamless integration across modules.</p>
                </div>

                <div className="flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 dark:border-slate-700/50 shadow-sm hover:shadow-[0_8px_16px_-6px_rgba(var(--color-primary)/0.2)] transition-all cursor-default">
                  <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-2 shadow-inner">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Real-Time Visibility</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Live metrics and process tracking.</p>
                </div>

                <div className="flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 dark:border-slate-700/50 shadow-sm hover:shadow-[0_8px_16px_-6px_rgba(var(--color-primary)/0.2)] transition-all cursor-default">
                  <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-2 shadow-inner">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Enterprise Scalable</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Built for high-volume transactions.</p>
                </div>
              </div>
            </m.div>
          </div>

          {workflowPreview && (
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-full flex items-center justify-center lg:justify-end"
            >
              {workflowPreview}
            </m.div>
          )}
        </div>

      </div>
    </div>
  );
});

export default Hero;
