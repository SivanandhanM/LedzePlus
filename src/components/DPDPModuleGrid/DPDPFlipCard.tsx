import React, { memo, useRef, useState, useCallback, useId } from 'react';
import { m, useInView } from 'framer-motion';
import {
  CheckCircle, ArrowLeft, Zap, ArrowRightIcon,
  ShieldCheck, Layers, Clock, Key, Eye, BookOpen
} from 'lucide-react';
import type { DPDPModuleData, DPDPTheme } from './types';

// Front of the card
const CardFront = memo(({ data, theme, onFlip, isFlipped }: {
  data: DPDPModuleData; theme: DPDPTheme; onFlip: () => void; isFlipped: boolean;
}) => {
  const statusLabel = { compliant: 'Compliant', partial: 'Partial', review: 'Review' } as const;
  const statusColor = { compliant: '#10B981', partial: '#F59E0B', review: '#EF4444' } as const;

  return (
    <div
      className="absolute inset-0 rounded-[24px] flex flex-col"
      style={{
        background: theme.cardBg,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        // In some browsers, elements with z-index inside a preserve-3d container vanish
        // if they don't have a translateZ. We keep this to force a compositing layer.
        transform: 'translateZ(1px)', 
      }}
    >
      {/* Subtle Radial Gradient behind content */}
      <div 
        className="absolute inset-0 rounded-[24px] pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, rgba(${theme.accentRgb},0.12), transparent 55%)`,
        }}
      />

      {/* 15% Header Tint Strip */}
      <div 
        className="absolute top-0 left-0 right-0 h-[72px] rounded-t-[24px] pointer-events-none"
        style={{ background: theme.accent, opacity: 0.15 }} 
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col h-full pt-6 pb-0">
        
        {/* Header section (Icon + Title + Badges) */}
        <div className="flex items-start justify-between mb-8 px-8">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ 
                background: `rgba(${theme.accentRgb}, 0.16)`, 
                color: theme.accent,
                border: `1px solid rgba(${theme.accentRgb}, 0.22)`,
                boxShadow: `0 10px 24px rgba(${theme.accentRgb}, 0.16)`
              }}
            >
              {theme.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                LEDZE+ Module
              </p>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                {theme.name}
              </h3>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-sm bg-white" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[data.status] }} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                {statusLabel[data.status]}
              </span>
            </div>
            <div className="px-2 py-0.5 rounded-full" style={{ background: `rgba(${theme.accentRgb}, 0.08)` }}>
              <span style={{ color: theme.accent }} className="text-[9px] font-bold uppercase tracking-widest">
                DPDP 2023
              </span>
            </div>
          </div>
        </div>

        <div className="px-8 flex flex-col flex-grow">
          {/* Short desc badge */}
          <div className="mb-4">
            <span 
              className="inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase"
              style={{ background: `rgba(${theme.accentRgb}, 0.08)`, color: theme.accent }}
            >
              {data.shortDesc}
            </span>
          </div>

          {/* Body text */}
          <p className="text-[14px] leading-[1.7] font-medium text-slate-600 mb-8 pr-2">
            {data.description}
          </p>

          {/* Security icon chips (Stronger Tinted Cards) */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {data.securityIcons.map((item, i) => (
              <m.div 
                key={i} 
                className="flex flex-col items-center justify-center gap-2 rounded-xl w-full h-[64px] transition-colors"
                style={{ 
                  background: `rgba(${theme.accentRgb}, 0.10)`, 
                  border: `1px solid rgba(${theme.accentRgb}, 0.18)` 
                }}
                whileHover={{ background: `rgba(${theme.accentRgb}, 0.15)` }}
              >
                <div style={{ color: theme.accent }}>{item.icon}</div>
                <span className="text-[9px] font-bold text-slate-500 text-center uppercase tracking-wider leading-tight">
                  {item.label}
                </span>
              </m.div>
            ))}
          </div>

          {/* Compliance bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Compliance Score</span>
              <span className="text-[13px] font-bold text-slate-900">{data.complianceScore}%</span>
            </div>
            <div className="w-full h-1 bg-[#DCE5F0] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ 
                  width: `${data.complianceScore}%`, 
                  background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentLight})`,
                  boxShadow: `0 0 12px rgba(${theme.accentRgb}, 0.25)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer: Learn More (Status Row) */}
        <div 
          className="flex items-center justify-between mt-auto px-8 h-[60px] shrink-0 rounded-b-[24px]"
          style={{ 
            background: `rgba(${theme.accentRgb}, 0.08)`, 
            borderTop: `1px solid rgba(${theme.accentRgb}, 0.15)` 
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-[12px] font-bold text-slate-700">Protected</span>
          </div>
          
          <m.button
            type="button"
            onClick={onFlip}
            role="button"
            aria-expanded={isFlipped}
            aria-pressed={isFlipped}
            className="group flex items-center gap-2 rounded-xl px-4 py-2 text-[12px] font-bold shadow-sm transition-all outline-none focus-visible:ring-2"
            style={{ 
              background: `rgba(${theme.accentRgb}, 0.12)`, 
              color: theme.accent, 
              border: `1px solid rgba(${theme.accentRgb}, 0.30)` 
            }}
            whileHover={{ background: theme.accent, color: 'white', y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`Learn more about ${theme.name}`}
            tabIndex={isFlipped ? -1 : 0}
          >
            Learn More
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </m.button>
        </div>
      </div>
    </div>
  );
});

// Back of the card
const CardBack = memo(({ data, theme, onFlip, id, isFlipped }: {
  data: DPDPModuleData; theme: DPDPTheme; onFlip: () => void; id: string; isFlipped: boolean;
}) => (
  <div
    id={id}
    role="region"
    aria-label={`${theme.name} details`}
    className="absolute inset-0 rounded-[24px] flex flex-col bg-white overflow-hidden"
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      // Back face is pre-rotated 180deg. We also add translateZ to prevent the WebKit 
      // vanish bug on backface elements.
      transform: 'rotateY(180deg) translateZ(1px)',
    }}
  >
    {/* Left accent bar */}
    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[24px]" style={{ background: theme.accent }} />

    {/* 15% Header Tint Strip */}
    <div 
      className="absolute top-0 left-0 right-0 h-[72px] rounded-t-[24px] pointer-events-none"
      style={{ background: theme.accent, opacity: 0.15 }} 
    />

    {/* Subtle Radial Gradient behind content */}
    <div 
      className="absolute inset-0 rounded-[24px] pointer-events-none"
      style={{
        background: `radial-gradient(circle at top right, rgba(${theme.accentRgb},0.12), transparent 55%)`,
      }}
    />

    {/* ── Scrollable body ── */}
    <div className="relative z-10 flex flex-col h-full pl-8 pr-6 pt-6 pb-0 overflow-hidden">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 shrink-0 h-[36px]">
        <div>
          <h4 className="text-[16px] font-bold text-slate-900 leading-tight mb-1">
            {theme.name} Protection
          </h4>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Owner: {data.owner}
          </p>
        </div>
        <span 
          className="shrink-0 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest"
          style={{ background: `rgba(${theme.accentRgb}, 0.08)`, color: theme.accent }}
        >
          DPDP 2023
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pr-2 pb-2" style={{ scrollbarWidth: 'thin', scrollbarColor: `${theme.accent} transparent` }}>
        
        {/* Description */}
        <p className="text-[14px] leading-[1.7] font-medium text-slate-600 mb-8">
          {data.description}
        </p>

        {/* Key Security Features */}
        <div className="mb-6">
          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            Key Security Features
          </h5>
          <div className="grid grid-cols-2 gap-3">
            {data.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: theme.accent }} />
                <span className="text-[12px] font-semibold text-slate-700">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protection Layers */}
        <div className="mb-8">
          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            Protection Layers
          </h5>
          <div className="flex flex-wrap gap-2">
            {data.protectionLayers.map((layer, i) => (
              <span key={i} 
                className="rounded-md px-2.5 py-1 text-[11px] font-bold"
                style={{ background: `rgba(${theme.accentRgb}, 0.06)`, color: theme.accent, border: `1px solid rgba(${theme.accentRgb}, 0.12)` }}
              >
                {layer}
              </span>
            ))}
          </div>
        </div>

        {/* Metadata rows */}
        <div className="flex flex-col gap-3 mb-8">
          {[
            { Icon: Clock, label: 'Retention', value: data.retentionPolicy },
            { Icon: Key, label: 'Access Model', value: data.accessModel },
            { Icon: Eye, label: 'Audit Trail', value: data.auditTrail },
          ].map(({ Icon, label, value }, i) => (
            <div key={i} 
              className="flex items-start gap-3 rounded-xl p-3"
              style={{ background: `rgba(${theme.accentRgb}, 0.06)`, border: `1px solid rgba(${theme.accentRgb}, 0.12)` }}
            >
              <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: theme.accent }} />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">{label}</span>
                <span className="text-[12px] font-semibold text-slate-700 leading-snug block">{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Implementation note */}
        <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-3 mb-2">
          <div className="flex items-center gap-2 mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Implementation Note</span>
          </div>
          <p className="text-[12px] leading-[1.6] font-medium text-slate-600 m-0">
            {data.implementationNote}
          </p>
        </div>
      </div>

      {/* Footer (Status Row) */}
      <div 
        className="flex items-center justify-between mt-auto h-[60px] shrink-0 -mx-8 px-8"
        style={{ 
          background: `rgba(${theme.accentRgb}, 0.08)`, 
          borderTop: `1px solid rgba(${theme.accentRgb}, 0.15)` 
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <div className="flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1">
            <Zap className="w-3 h-3 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{data.complianceScore}% Score</span>
          </div>
        </div>
        
        <m.button
          type="button"
          role="button"
          onClick={onFlip}
          aria-expanded={isFlipped}
          className="group flex items-center gap-2 rounded-xl text-white px-4 py-2 text-[12px] font-bold shadow-sm outline-none focus-visible:ring-2"
          style={{ background: theme.accent }}
          whileHover={{ filter: 'brightness(1.1)', y: -2 }}
          whileTap={{ scale: 0.97 }}
          aria-label={`Return to ${theme.name} poster`}
          tabIndex={isFlipped ? 0 : -1}
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Flip Back
        </m.button>
      </div>
    </div>
  </div>
));


const CARD_HEIGHT = 600;

export const DPDPFlipCard = memo(({ data, theme, index }: { data: DPDPModuleData; theme: DPDPTheme; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const panelId = useId();

  const handleFlip = useCallback(() => setIsFlipped(p => !p), []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isFlipped) {
      setIsFlipped(false);
    }
  }, [isFlipped]);

  return (
    <m.div
      ref={ref}
      className="relative w-full group"
      style={{ height: CARD_HEIGHT }}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      onKeyDown={handleKeyDown}
      whileHover={{ y: -6 }} 
    >
      {/* Stronger, richer shadow structure that inherits from the accent color */}
      <m.div
        className="absolute inset-0 rounded-[24px] pointer-events-none transition-all duration-300"
        style={{
          zIndex: 0,
          border: `1px solid rgba(${theme.accentRgb}, 0.18)`,
        }}
        animate={{
          boxShadow: isFlipped
            ? '0 16px 40px rgba(15, 23, 42, 0.12), 0 4px 8px rgba(15, 23, 42, 0.08)'
            : '0 14px 35px rgba(15, 23, 42, 0.10), 0 2px 6px rgba(15, 23, 42, 0.06)',
        }}
        whileHover={{
          boxShadow: '0 24px 50px rgba(15, 23, 42, 0.16)',
          borderColor: `rgba(${theme.accentRgb}, 0.35)`
        }}
      />

      <div
        className="absolute inset-0 rounded-[24px]"
        style={{ perspective: '1600px', zIndex: 1 }}
      >
        <div
          role="group"
          aria-label={`${theme.name} DPDP module card`}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            // Pure CSS transition avoids Framer Motion's matrix3d which breaks backface-visibility
            transition: 'transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1)',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <CardFront data={data} theme={theme} onFlip={handleFlip} isFlipped={isFlipped} />
          <CardBack id={panelId} data={data} theme={theme} onFlip={handleFlip} isFlipped={isFlipped} />
        </div>
      </div>
    </m.div>
  );
});

export default DPDPFlipCard;
