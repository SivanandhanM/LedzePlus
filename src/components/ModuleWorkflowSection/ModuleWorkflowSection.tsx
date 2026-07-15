import { useState, useEffect, useCallback, useRef } from 'react';
import { m, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { iconMap } from '../../workflows/iconMap';
import type { ModuleWorkflowConfig, ModuleStep, ExtraFeature } from '../../workflows/moduleWorkflowTypes';

/* ─────────────────────────────────────────────────────────────────────────────
   ICON RENDERER
───────────────────────────────────────────────────────────────────────────── */
const renderIcon = (name: string, className?: string) => {
  const Icon = iconMap[name] || iconMap.Circle;
  return <Icon className={className} />;
};

/* ─────────────────────────────────────────────────────────────────────────────
   COLOR MAP
───────────────────────────────────────────────────────────────────────────── */
export const COLOR_MAP: Record<string, {
  bg: string; border: string; text: string; badge: string;
  glow: string; particle: string; gradFrom: string; gradTo: string;
}> = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-400', text: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-500', glow: 'shadow-blue-500/25', particle: '#3b82f6', gradFrom: '#3b82f6', gradTo: '#6366f1' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-400', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-500', glow: 'shadow-emerald-500/25', particle: '#10b981', gradFrom: '#10b981', gradTo: '#06b6d4' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-400', text: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-500', glow: 'shadow-amber-500/25', particle: '#f59e0b', gradFrom: '#f59e0b', gradTo: '#ef4444' },
  cyan: { bg: 'bg-cyan-50 dark:bg-cyan-950/30', border: 'border-cyan-400', text: 'text-cyan-600 dark:text-cyan-400', badge: 'bg-cyan-500', glow: 'shadow-cyan-500/25', particle: '#06b6d4', gradFrom: '#06b6d4', gradTo: '#3b82f6' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-400', text: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-500', glow: 'shadow-purple-500/25', particle: '#a855f7', gradFrom: '#a855f7', gradTo: '#ec4899' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-950/30', border: 'border-rose-400', text: 'text-rose-600 dark:text-rose-400', badge: 'bg-rose-500', glow: 'shadow-rose-500/25', particle: '#f43f5e', gradFrom: '#f43f5e', gradTo: '#fb923c' },
  pink: { bg: 'bg-pink-50 dark:bg-pink-950/30', border: 'border-pink-400', text: 'text-pink-600 dark:text-pink-400', badge: 'bg-pink-500', glow: 'shadow-pink-500/25', particle: '#ec4899', gradFrom: '#ec4899', gradTo: '#a855f7' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-950/30', border: 'border-indigo-400', text: 'text-indigo-600 dark:text-indigo-400', badge: 'bg-indigo-500', glow: 'shadow-indigo-500/25', particle: '#6366f1', gradFrom: '#6366f1', gradTo: '#3b82f6' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-400', text: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-500', glow: 'shadow-orange-500/25', particle: '#f97316', gradFrom: '#f97316', gradTo: '#f59e0b' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-950/30', border: 'border-teal-400', text: 'text-teal-600 dark:text-teal-400', badge: 'bg-teal-500', glow: 'shadow-teal-500/25', particle: '#14b8a6', gradFrom: '#14b8a6', gradTo: '#06b6d4' },
  slate: { bg: 'bg-slate-50 dark:bg-slate-950/30', border: 'border-slate-400', text: 'text-slate-600 dark:text-slate-400', badge: 'bg-slate-500', glow: 'shadow-slate-500/25', particle: '#94a3b8', gradFrom: '#94a3b8', gradTo: '#6366f1' },
};

/* ─────────────────────────────────────────────────────────────────────────────
   STEP CARD
───────────────────────────────────────────────────────────────────────────── */
interface StepCardProps {
  step: ModuleStep;
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onClick: () => void;
}

function StepCard({ step, index, isActive, isDimmed, onClick }: StepCardProps) {
  const c = COLOR_MAP[step.color] || COLOR_MAP.blue;

  return (
    <m.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      animate={{
        opacity: isDimmed ? 0.35 : 1,
        scale: isActive ? 1.06 : 1,
        y: isActive ? -6 : 0,
      }}
      whileHover={!isDimmed ? { scale: 1.04, y: -4 } : {}}
      onClick={onClick}
      className={[
        'relative cursor-pointer rounded-2xl border-t-[3px]',
        c.border, c.bg,
        isActive ? `shadow-2xl ${c.glow}` : 'shadow-md hover:shadow-xl',
        'backdrop-blur-sm p-4 flex flex-col gap-2 transition-shadow duration-300',
        'w-[180px] shrink-0 select-none',
      ].join(' ')}
    >
      {/* Glass inner overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/40 dark:bg-white/5 pointer-events-none" />

      {/* Active pulse ring */}
      {isActive && (
        <m.div
          className={`absolute inset-0 rounded-2xl border-2 ${c.border}`}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Number Badge */}
      <div className={`absolute -top-3 -right-3 w-7 h-7 rounded-full ${c.badge} text-white text-[11px] font-black flex items-center justify-center shadow-lg z-10`}>
        {step.id}
      </div>

      {/* Icon */}
      <m.div
        className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border}/50 flex items-center justify-center shadow-sm relative z-10`}
        animate={isActive ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
        transition={{ duration: 0.4 }}
      >
        {renderIcon(step.icon, `w-5 h-5 ${c.text}`)}
      </m.div>

      {/* Text */}
      <div className="relative z-10">
        <h4 className="text-[12px] font-bold text-slate-800 dark:text-white leading-tight">{step.title}</h4>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5 line-clamp-2">{step.description}</p>
      </div>
    </m.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HORIZONTAL CONNECTOR
───────────────────────────────────────────────────────────────────────────── */
function HConnector({ color }: { color: string }) {
  const c = COLOR_MAP[color] || COLOR_MAP.blue;
  const uid = `hg-mws-${color}-${Math.random().toString(36).slice(2, 6)}`;
  const aid = `arr-mws-${color}-${Math.random().toString(36).slice(2, 6)}`;

  return (
    <div className="flex items-start justify-center w-10 shrink-0">
      <svg width="40" height="80" viewBox="0 0 40 80" className="overflow-visible">
        <defs>
          <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c.gradFrom} />
            <stop offset="100%" stopColor={c.gradTo} />
          </linearGradient>
          <marker id={aid} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={c.gradTo} />
          </marker>
        </defs>
        <path d="M2,40 L38,40" stroke="rgba(148,163,184,0.2)" strokeWidth="2" fill="none" />
        <m.path
          d="M2,40 L36,40"
          stroke={`url(#${uid})`}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          markerEnd={`url(#${aid})`}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        <m.circle
          r={3}
          cy={40}
          fill={c.particle}
          initial={{ cx: 2 }}
          animate={{ cx: [2, 38, 2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          style={{ filter: `drop-shadow(0 0 4px ${c.particle})` }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TURN CONNECTOR (end of a row curves down to start of next)
───────────────────────────────────────────────────────────────────────────── */
function TurnConnector({ color }: { color: string }) {
  const c = COLOR_MAP[color] || COLOR_MAP.blue;
  const gid = `turn-g-mws-${color}`;

  return (
    <div className="flex items-start justify-center shrink-0" style={{ width: 60 }}>
      <svg width="60" height="120" viewBox="0 0 60 120" fill="none" className="overflow-visible">
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.gradFrom} />
            <stop offset="100%" stopColor={c.gradTo} />
          </linearGradient>
        </defs>
        <path d="M0,40 Q30,40 30,80 L30,120" stroke="rgba(148,163,184,0.2)" strokeWidth="2" fill="none" />
        <m.path
          d="M0,40 Q30,40 30,80 L30,120"
          stroke={`url(#${gid})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.3 }}
        />
        <m.circle
          r={3}
          fill={c.particle}
          style={{ filter: `drop-shadow(0 0 5px ${c.particle})` }}
          animate={{ cx: [0, 30, 30], cy: [40, 70, 120] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   VERTICAL CONNECTOR (mobile timeline)
───────────────────────────────────────────────────────────────────────────── */
function VConnector({ color }: { color: string }) {
  const c = COLOR_MAP[color] || COLOR_MAP.blue;

  return (
    <svg width="32" height="40" viewBox="0 0 32 40" className="overflow-visible mx-auto">
      <defs>
        <linearGradient id={`vg-mws-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.gradFrom} />
          <stop offset="100%" stopColor={c.gradTo} />
        </linearGradient>
        <marker id={`va-mws-${color}`} markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
          <path d="M0,0 L6,0 L3,6 Z" fill={c.gradTo} />
        </marker>
      </defs>
      <path d="M16,2 L16,38" stroke="rgba(148,163,184,0.2)" strokeWidth="2" fill="none" />
      <m.path
        d="M16,2 L16,36"
        stroke={`url(#vg-mws-${color})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        markerEnd={`url(#va-mws-${color})`}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
      <m.circle
        r={3}
        cx={16}
        fill={c.particle}
        animate={{ cy: [2, 38, 2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{ filter: `drop-shadow(0 0 4px ${c.particle})` }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DETAIL DRAWER
───────────────────────────────────────────────────────────────────────────── */
interface DrawerProps {
  step: ModuleStep;
  totalSteps: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function DetailDrawer({ step, totalSteps, onClose, onNext, onPrev, isFirst, isLast }: DrawerProps) {
  const c = COLOR_MAP[step.color] || COLOR_MAP.blue;

  return (
    <m.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] w-[400px] max-w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-2xl flex flex-col"
    >
      {/* Progress bar */}
      <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-t-3xl overflow-hidden">
        <m.div
          className={`h-full ${c.badge}`}
          initial={{ width: 0 }}
          animate={{ width: `${(step.id / totalSteps) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Header */}
      <div className={`p-5 border-b border-slate-100 dark:border-slate-800 ${c.bg}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${c.bg} border ${c.border}/50`}>
              {renderIcon(step.icon, `w-5 h-5 ${c.text}`)}
            </div>
            <div>
              <p className={`text-[10px] font-bold tracking-widest uppercase ${c.text}`}>Step {step.id} of {totalSteps}</p>
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{step.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">{step.purpose}</p>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4 flex-1">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Inputs</h5>
            <ul className="space-y-1.5">
              {step.inputs.map((inp, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  {inp}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Outputs</h5>
            <ul className="space-y-1.5">
              {step.outputs.map((out, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${c.text} shrink-0 mt-0.5`} />
                  {out}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h5 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Business Rules</h5>
          <div className={`rounded-xl p-3 ${c.bg} border ${c.border}/30 space-y-2`}>
            {step.rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-2 text-[12px] text-slate-700 dark:text-slate-300">
                <AlertCircle className={`w-3.5 h-3.5 ${c.text} shrink-0 mt-0.5`} />
                {rule}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-[13px] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <button
          onClick={onNext}
          disabled={isLast}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-xl font-bold text-[13px] text-white ${c.badge} shadow-md hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 transition-all`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </m.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EXTRA FEATURE CARD
───────────────────────────────────────────────────────────────────────────── */
function ExtraFeatureCard({ feat, index }: { feat: ExtraFeature; index: number }) {
  const c = COLOR_MAP[feat.color] || COLOR_MAP.blue;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className={`rounded-2xl border ${c.border}/50 ${c.bg} p-4 shadow-md hover:shadow-xl transition-all cursor-default`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg} border ${c.border}/50 mb-3`}>
        {renderIcon(feat.icon, `w-5 h-5 ${c.text}`)}
      </div>
      <h4 className="text-[13px] font-bold text-slate-800 dark:text-white">{feat.title}</h4>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{feat.desc}</p>
    </m.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────────────── */
interface ModuleWorkflowSectionProps {
  config: ModuleWorkflowConfig;
}

export default function ModuleWorkflowSection({ config }: ModuleWorkflowSectionProps) {
  const { steps, extraFeatures, benefits, moduleName: _moduleName, moduleLabel, subtitle, stepCountLabel } = config;

  const [activeStepId, setActiveStepId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const activeStep = steps.find(s => s.id === activeStepId) ?? null;
  const activeIndex = activeStep ? steps.indexOf(activeStep) : -1;

  const handleNext = useCallback(() => {
    if (activeIndex < steps.length - 1) setActiveStepId(steps[activeIndex + 1].id);
  }, [activeIndex, steps]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) setActiveStepId(steps[activeIndex - 1].id);
  }, [activeIndex, steps]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStepId(null);
      if (activeStepId !== null) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeStepId, handleNext, handlePrev]);

  // Row layout: ≤7 steps = single row; >7 steps = two rows
  const splitAt = steps.length > 7 ? Math.ceil(steps.length / 2) : steps.length;
  const row1 = steps.slice(0, splitAt);
  const row2 = steps.slice(splitAt);
  const hasTwoRows = row2.length > 0;

  return (
    <div ref={ref} className="relative w-full" id="business-workflow">

      {/* ── Background blobs ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <m.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        />
        <m.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, delay: 3 }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px]"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        />
      </div>

      {/* ── BANNER ──────────────────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl"
      >
        <div 
          className="p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary-hex) 0%, var(--color-secondary-hex) 55%, var(--color-accent-hex) 100%)',
            border: '1px solid rgba(255,255,255,.15)',
            boxShadow: '0 24px 50px rgba(15,23,42,.18)',
            transition: '--color-primary-hex 500ms ease-in-out, --color-secondary-hex 500ms ease-in-out, --color-accent-hex 500ms ease-in-out'
          } as any}
        >
          {/* Decorative Lighting */}
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at top left, rgba(255,255,255,.14), transparent 45%)' }} />
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at bottom right, rgba(255,255,255,.08), transparent 55%)' }} />
          
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
          />

          {/* Watermark Icons */}
          {(() => {
            const getWatermarkIcons = (label: string) => {
              const l = label.toLowerCase();
              if (l.includes('purchase')) return ['PackageSearch', 'FileText', 'Users'];
              if (l.includes('sales')) return ['Activity', 'UserPlus', 'Truck'];
              if (l.includes('inventory')) return ['Layers', 'ScanBarcode', 'Package'];
              if (l.includes('accounting') || l.includes('billing')) return ['FileCheck', 'Calculator', 'Receipt'];
              if (l.includes('banking')) return ['Landmark', 'Wallet', 'CreditCard'];
              if (l.includes('gst')) return ['FileSignature', 'Shield', 'Receipt'];
              if (l.includes('payroll')) return ['Users', 'Banknote', 'CalendarDays'];
              if (l.includes('gate')) return ['Truck', 'ShieldCheck', 'ScanFace'];
              return ['Layers', 'Activity', 'Shield'];
            };
            
            const icons = getWatermarkIcons(moduleLabel);
            
            return (
              <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-between px-10 opacity-[0.04] text-white">
                {renderIcon(icons[0], "w-40 h-40 -ml-10 -rotate-12")}
                {renderIcon(icons[1], "w-32 h-32 mb-32")}
                {renderIcon(icons[2], "w-48 h-48 -mr-16 rotate-12")}
              </div>
            );
          })()}

          <m.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10"
          >
            <span 
              className="inline-block px-4 py-1.5 rounded-full text-white text-[11px] font-black tracking-widest uppercase mb-5 border border-white/20 shadow-sm"
              style={{ background: 'rgba(255,255,255,.18)' }}
            >
              {moduleLabel}
            </span>
            <h2 
              className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,.18)' }}
            >
              {subtitle}
            </h2>
            <p 
              className="text-base md:text-lg max-w-2xl mx-auto font-medium"
              style={{ color: 'rgba(255,255,255,.85)' }}
            >
              {stepCountLabel} — from initial trigger to final completion.
              Click any step to explore the full business logic.
            </p>
          </m.div>
        </div>
      </m.div>

      {/* ── WORKFLOW CANVAS (Desktop & Tablet) ──────────────────────────── */}
      <div className="hidden sm:block mb-16 overflow-x-auto pb-8 custom-scrollbar">
        <div className={`min-w-max flex flex-col ${hasTwoRows ? 'items-end' : 'items-start'} px-4`}>
          {/* Row 1 */}
          <div className={`flex items-start pt-4 pb-4 px-2 ${hasTwoRows ? 'pr-[68px]' : ''}`}>
          {row1.map((step, i) => (
            <div key={step.id} className="flex items-start">
              <StepCard
                step={step}
                index={i}
                isActive={activeStepId === step.id}
                isDimmed={activeStepId !== null && activeStepId !== step.id}
                onClick={() => setActiveStepId(activeStepId === step.id ? null : step.id)}
              />
              {i < row1.length - 1 && (
                <HConnector color={row1[i + 1].color} />
              )}
            </div>
          ))}
          {/* Turn down to Row 2 if needed */}
          {hasTwoRows && <TurnConnector color={row2[0]?.color || 'blue'} />}
        </div>

          {/* Row 2 (right-to-left, if >7 steps) */}
          {hasTwoRows && (
            <div className="flex items-start flex-row-reverse pt-4 pb-4 px-2">
            {[...row2].reverse().map((step, i, arr) => {
              const origIndex = splitAt + (arr.length - 1 - i);
              const nextStep = i < arr.length - 1 ? arr[i + 1] : null;
              return (
                <div key={step.id} className="flex items-start flex-row-reverse">
                  <StepCard
                    step={step}
                    index={origIndex}
                    isActive={activeStepId === step.id}
                    isDimmed={activeStepId !== null && activeStepId !== step.id}
                    onClick={() => setActiveStepId(activeStepId === step.id ? null : step.id)}
                  />
                  {nextStep && (
                    <HConnector color={step.color} />
                  )}
                </div>
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── WORKFLOW CANVAS (Mobile — Vertical Timeline) ─────────────────── */}
      <div className="sm:hidden flex flex-col items-center mb-16 gap-0">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col items-center w-full max-w-xs">
            <div className="w-full">
              <StepCard
                step={step}
                index={i}
                isActive={activeStepId === step.id}
                isDimmed={activeStepId !== null && activeStepId !== step.id}
                onClick={() => setActiveStepId(activeStepId === step.id ? null : step.id)}
              />
            </div>
            {i < steps.length - 1 && (
              <VConnector color={steps[i + 1].color} />
            )}
          </div>
        ))}
      </div>

      {/* ── ADVANCED FEATURES ────────────────────────────────────────────── */}
      {extraFeatures.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white whitespace-nowrap">Advanced Features</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {extraFeatures.map((feat, i) => (
              <ExtraFeatureCard key={feat.title} feat={feat} index={i} />
            ))}
          </div>
        </m.div>
      )}

      {/* ── BENEFITS STRIP ───────────────────────────────────────────────── */}
      {benefits.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-200/60 dark:border-slate-700/50 shadow-xl p-8 relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.06)_0%,_transparent_70%)]" />
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-6">Key Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => {
              const c = COLOR_MAP[b.color] || COLOR_MAP.blue;
              return (
                <m.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`flex items-center gap-3 p-4 rounded-2xl ${c.bg} border ${c.border}/40 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${c.bg} border ${c.border}/50 shrink-0`}>
                    {renderIcon(b.icon, `w-4 h-4 ${c.text}`)}
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">{b.text}</span>
                </m.div>
              );
            })}
          </div>
        </m.div>
      )}

      {/* ── DETAIL DRAWER ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeStep && (
          <>
            <m.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-50"
              onClick={() => setActiveStepId(null)}
            />
            <DetailDrawer
              key="drawer"
              step={activeStep}
              totalSteps={steps.length}
              onClose={() => setActiveStepId(null)}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={activeIndex === 0}
              isLast={activeIndex === steps.length - 1}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
