import type { ReactNode } from 'react';
import { useRef, useState, useCallback, useMemo } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Accent color map per module ────────────────────────────────────────────
const ACCENT_MAP: Record<string, {
  color: string; glow: string; border: string;
  iconBg: string; badgeBg: string; badgeText: string; shadow: string;
}> = {
  Purchase:       { color: '#10b981', glow: 'rgba(16,185,129,0.25)',  border: '#10b981', iconBg: 'rgba(16,185,129,0.12)',  badgeBg: 'rgba(16,185,129,0.1)',  badgeText: '#059669', shadow: 'rgba(16,185,129,0.22)'  },
  Sales:          { color: '#f97316', glow: 'rgba(249,115,22,0.25)',   border: '#f97316', iconBg: 'rgba(249,115,22,0.12)',   badgeBg: 'rgba(249,115,22,0.1)',   badgeText: '#ea580c', shadow: 'rgba(249,115,22,0.22)'   },
  Billing:        { color: '#a855f7', glow: 'rgba(168,85,247,0.25)',   border: '#a855f7', iconBg: 'rgba(168,85,247,0.12)',   badgeBg: 'rgba(168,85,247,0.1)',   badgeText: '#9333ea', shadow: 'rgba(168,85,247,0.22)'   },
  Inventory:      { color: '#3b82f6', glow: 'rgba(59,130,246,0.25)',   border: '#3b82f6', iconBg: 'rgba(59,130,246,0.12)',   badgeBg: 'rgba(59,130,246,0.1)',   badgeText: '#2563eb', shadow: 'rgba(59,130,246,0.22)'   },
  Accounting:     { color: '#22c55e', glow: 'rgba(34,197,94,0.25)',    border: '#22c55e', iconBg: 'rgba(34,197,94,0.12)',    badgeBg: 'rgba(34,197,94,0.1)',    badgeText: '#16a34a', shadow: 'rgba(34,197,94,0.22)'    },
  Payroll:        { color: '#14b8a6', glow: 'rgba(20,184,166,0.25)',   border: '#14b8a6', iconBg: 'rgba(20,184,166,0.12)',   badgeBg: 'rgba(20,184,166,0.1)',   badgeText: '#0d9488', shadow: 'rgba(20,184,166,0.22)'   },
  Banking:        { color: '#06b6d4', glow: 'rgba(6,182,212,0.25)',    border: '#06b6d4', iconBg: 'rgba(6,182,212,0.12)',    badgeBg: 'rgba(6,182,212,0.1)',    badgeText: '#0891b2', shadow: 'rgba(6,182,212,0.22)'    },
  'Gate Management': { color: '#f59e0b', glow: 'rgba(245,158,11,0.25)', border: '#f59e0b', iconBg: 'rgba(245,158,11,0.12)', badgeBg: 'rgba(245,158,11,0.1)', badgeText: '#d97706', shadow: 'rgba(245,158,11,0.22)' },
  GST:            { color: '#ef4444', glow: 'rgba(239,68,68,0.25)',    border: '#ef4444', iconBg: 'rgba(239,68,68,0.12)',    badgeBg: 'rgba(239,68,68,0.1)',    badgeText: '#dc2626', shadow: 'rgba(239,68,68,0.22)'    },
};

const DEFAULT_ACCENT = { color: '#6366f1', glow: 'rgba(99,102,241,0.25)', border: '#6366f1', iconBg: 'rgba(99,102,241,0.12)', badgeBg: 'rgba(99,102,241,0.1)', badgeText: '#4f46e5', shadow: 'rgba(99,102,241,0.22)' };

// ─── Floating Particles ──────────────────────────────────────────────────────
interface Particle { id: number; x: number; size: number; duration: number; delay: number; }

function FloatingParticles({ color, isVisible }: { color: string; isVisible: boolean }) {
  const particles: Particle[] = useMemo(() => (
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      size: 2 + Math.random() * 3,
      duration: 1.5 + Math.random() * 1.5,
      delay: Math.random() * 0.6,
    }))
  ), []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]" aria-hidden="true">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 0, x: `${p.x}%` }}
              animate={{ opacity: [0, 0.8, 0], y: -60 }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
              className="absolute bottom-4"
              style={{
                width: p.size, height: p.size,
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 ${p.size * 3}px ${color}`,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Spring config ────────────────────────────────────────────────────────────
const springCfg = { stiffness: 250, damping: 20, mass: 0.8 };

// ─── Props ────────────────────────────────────────────────────────────────────
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
  className?: string;
  path?: string;
  badge?: string;
}

export default function FeatureCard({
  title, description, icon,
  delay = 0, className = '', path, badge = 'MODULE',
}: FeatureCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const accent = ACCENT_MAP[title] ?? DEFAULT_ACCENT;

  // Spring-based card transforms
  const rawY   = useSpring(0,  springCfg);
  const rawS   = useSpring(1,  springCfg);
  const rawGO  = useSpring(0,  springCfg); // glow opacity
  const rawBO  = useSpring(0,  springCfg); // border opacity

  const cardY      = useTransform(rawY,  (v) => `translateY(${v}px)`);
  const cardScale  = useTransform(rawS,  (v) => `scale(${v})`);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    rawY.set(-14);
    rawS.set(1.03);
    rawGO.set(1);
    rawBO.set(1);
  }, [rawY, rawS, rawGO, rawBO]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rawY.set(0);
    rawS.set(1);
    rawGO.set(0);
    rawBO.set(0);
    setSpotlight({ x: 50, y: 50 });
  }, [rawY, rawS, rawGO, rawBO]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    });
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  const boxShadow = hovered
    ? `0 30px 80px ${accent.shadow}, 0 0 40px rgba(59,130,246,0.12), 0 0 100px rgba(14,165,233,0.06)`
    : '0 8px 24px rgba(0,0,0,0.06)';

  return (
    <motion.div
      ref={cardRef}
      onClick={() => path && navigate(path)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ transform: cardY, scale: cardScale, willChange: 'transform, opacity' } as React.CSSProperties}
      className={`group relative flex flex-col h-full ${path ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* ── Animated gradient border ring ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -inset-[1.5px] rounded-[2rem] pointer-events-none z-0"
            style={{
              background: `linear-gradient(135deg, ${accent.color}, #06b6d4, #a855f7, #f97316, ${accent.color})`,
              backgroundSize: '300% 300%',
              animation: 'gradientShift 3s linear infinite',
              filter: 'blur(0.5px)',
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* ── Card body ── */}
      <motion.div
        className="relative z-10 flex flex-col h-full rounded-[2rem] overflow-hidden"
        style={{
          background: hovered
            ? 'rgba(255,255,255,0.97)'
            : 'rgba(255,255,255,1)',
          backdropFilter: hovered ? 'blur(24px) saturate(180%)' : 'none',
          boxShadow,
          border: hovered
            ? `1px solid ${accent.border}30`
            : '1px solid rgba(226,232,240,1)',
          transition: 'background 0.35s ease, box-shadow 0.45s cubic-bezier(0.22,1,0.36,1), border 0.35s ease',
        }}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-0 rounded-[2rem] transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, ${accent.glow} 0%, transparent 60%)`,
          }}
          aria-hidden
        />

        {/* Floating particles */}
        <FloatingParticles color={accent.color} isVisible={hovered} />

        {/* Card content */}
        <div className="relative z-10 flex flex-col h-full p-8">

          {/* Top row: icon + badge */}
          <div className="flex justify-between items-start mb-6">

            {/* Icon */}
            <motion.div
              animate={hovered
                ? { scale: 1.15, rotate: 5, y: -4 }
                : { scale: 1,    rotate: 0, y: 0  }}
              transition={{ ...springCfg, type: 'spring', delay: 0 }}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
              style={{
                background: hovered ? accent.iconBg : 'rgba(248,250,252,1)',
                boxShadow: hovered ? `0 0 20px ${accent.glow}` : 'none',
                color: hovered ? accent.color : '#475569',
              }}
            >
              {icon}
            </motion.div>

            {/* Badge */}
            <motion.div
              animate={hovered ? { scale: 1.08 } : { scale: 1 }}
              transition={{ ...springCfg, type: 'spring', delay: 0.05 }}
              className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase transition-all duration-300"
              style={{
                background: hovered ? accent.badgeBg : 'rgba(255,237,213,1)',
                color:      hovered ? accent.badgeText : '#ea580c',
                boxShadow:  hovered ? `0 0 12px ${accent.glow}` : 'none',
              }}
            >
              {badge}
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            animate={hovered ? { y: -2 } : { y: 0 }}
            transition={{ ...springCfg, type: 'spring', delay: 0.05 }}
            className="text-[1.35rem] font-bold mb-3 transition-colors duration-300"
            style={{ color: hovered ? accent.color : '#0f172a' }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            animate={hovered ? { opacity: 1, y: -3 } : { opacity: 0.75, y: 0 }}
            transition={{ ...springCfg, type: 'spring', delay: 0.1 }}
            className="text-[15px] leading-relaxed font-medium mb-8 flex-1"
            style={{ color: '#475569' }}
          >
            {description}
          </motion.p>

          {/* CTA */}
          <motion.div
            animate={hovered ? { x: 6 } : { x: 0 }}
            transition={{ ...springCfg, type: 'spring', delay: 0.15 }}
            className="flex items-center gap-2 text-[13px] font-bold mt-auto relative"
            style={{ color: hovered ? accent.color : '#6366f1' }}
          >
            <span className="relative">
              {path ? 'Explore Module' : 'Explore Solution'}
              {/* Underline reveal */}
              <motion.span
                className="absolute left-0 -bottom-0.5 h-[1.5px] rounded-full"
                animate={{ width: hovered ? '100%' : '0%' }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                style={{ background: accent.color }}
              />
            </span>
            <motion.span
              animate={hovered ? { x: 6 } : { x: 0 }}
              transition={{ ...springCfg, type: 'spring', delay: 0.18 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.div>

        </div>
      </motion.div>

      {/* Outer radial glow behind card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-[2rem] pointer-events-none -z-10"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, ${accent.glow} 0%, transparent 70%)`,
              filter: 'blur(20px)',
              transform: 'translateY(20px) scaleX(0.9)',
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
