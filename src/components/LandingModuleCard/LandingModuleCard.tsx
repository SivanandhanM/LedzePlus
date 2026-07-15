import type { ReactNode } from 'react';
import { useRef, useState, useCallback, useEffect, memo, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const hexToRgba = (hex: string, alpha: number) => {
  if (!hex) return `rgba(255,255,255,${alpha})`;
  if (hex.startsWith('rgba')) return hex;
  const r = parseInt(hex.slice(1, 3), 16) || 255;
  const g = parseInt(hex.slice(3, 5), 16) || 255;
  const b = parseInt(hex.slice(5, 7), 16) || 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

// Desaturated by 15-20% for enterprise Fiori/Fabric look
const MODULE_CONFIG: Record<string, { start: string; mid: string; end: string; accent: string }> = {
  'LEDZE+ Purchase': { start: '#12224A', mid: '#294382', end: '#3B71E8', accent: '#7AAEF5' },
  'LEDZE+ Inventory': { start: '#0C2F33', mid: '#1B736B', end: '#1F615C', accent: '#4ADBD1' },
  'LEDZE+ Sales': { start: '#0E301D', mid: '#21633D', end: '#237A44', accent: '#53DCA9' },
  'LEDZE+ Accounting': { start: '#4D2A0E', mid: '#AC5714', end: '#CC7612', accent: '#F6C340' },
  'LEDZE+ Billing': { start: '#331B61', mid: '#6E34CD', end: '#7D47DB', accent: '#CABFF7' },
  'LEDZE+ Banking': { start: '#122545', mid: '#2947A8', end: '#3B71E8', accent: '#A0CBFA' },
  'LEDZE+ Payroll': { start: '#52122B', mid: '#962354', end: '#B32460', accent: '#F5B3DB' },
  'LEDZE+ GST': { start: '#4D1F0E', mid: '#B84516', end: '#DE5D18', accent: '#F5BE83' },
  'LEDZE+ Gate Management': { start: '#24214D', mid: '#483FC2', end: '#564EDB', accent: '#B1BDF5' },
};

const DEFAULT_CONFIG = { start: '#24214D', mid: '#483FC2', end: '#564EDB', accent: '#B1BDF5' };

// ─── Shared Stable Variants (Extracted for Performance) ────────────────────────
const cardVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -6, 
    scale: 1.02, 
    transition: { duration: 0.25, ease: 'easeOut' }
  },
  tap: { scale: 0.98, y: -2, transition: { duration: 0.1 } }
};

const iconVariants: Variants = {
  initial: { scale: 1, rotate: 0, y: 0 },
  hover: { scale: 1.05, rotate: 4, y: -2, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const badgeVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const titleVariants: Variants = {
  initial: { y: 0 },
  hover: { y: -1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const descVariants: Variants = {
  initial: { y: 0, opacity: 0.9 },
  hover: { y: -2, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const ctaArrowVariants: Variants = {
  initial: { x: 0 },
  hover: { x: 6, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

const ctaUnderlineVariants: Variants = {
  initial: { width: '0%' },
  hover: { width: '100%', transition: { duration: 0.25, ease: 'easeOut' } }
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface LandingModuleCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
  className?: string;
  path?: string;
  badge?: string;
}

const LandingModuleCard = memo(function LandingModuleCard({
  title, description, icon,
  delay = 0, className = '', path, badge = 'MODULE',
}: LandingModuleCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const config = useMemo(() => MODULE_CONFIG[title] ?? DEFAULT_CONFIG, [title]);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    requestAnimationFrame(() => {
      if (e.currentTarget) {
        e.currentTarget.style.setProperty('--spotlight-x', `${x}`);
        e.currentTarget.style.setProperty('--spotlight-y', `${y}`);
      }
    });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!path) return;
    sessionStorage.setItem('lastModule', path);
    sessionStorage.setItem('sourceSection', 'modules');

    const rect = cardRef.current?.getBoundingClientRect();
    const x = rect ? ((e.clientX - rect.left) / rect.width) * 100 : 50;
    const y = rect ? ((e.clientY - rect.top) / rect.height) * 100 : 50;

    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);

    setTimeout(() => {
      setRipples([]);
      navigate(path);
    }, 320);
  }, [path, navigate]);

  // Handle return highlight animation
  const [isReturning, setIsReturning] = useState(false);
  useEffect(() => {
    const lastModule = sessionStorage.getItem('lastModule');
    if (lastModule === path) {
      sessionStorage.removeItem('lastModule');
      setIsReturning(true);
      setTimeout(() => setIsReturning(false), 2000);
    }
  }, [path]);

  // ── Stable Styles ─────────────────────────────────────────────────────────
  const boxShadow = useMemo(() => hovered || isReturning
    ? `0 16px 40px ${hexToRgba(config.end, 0.3)}, 0 0 30px ${hexToRgba(config.accent, 0.2)}`
    : `0 12px 30px ${hexToRgba(config.end, 0.15)}`, 
    [hovered, isReturning, config]);

  const cardBorder = hovered || isReturning 
    ? `1px solid rgba(255,255,255,0.2)` 
    : `1px solid rgba(255,255,255,0.08)`;

  const cardBg = `linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.01)), linear-gradient(135deg, ${config.start} 0%, ${config.mid} 55%, ${config.end} 100%)`;

  return (
    <m.div
      ref={cardRef}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col h-[230px] min-h-[230px] w-full contain-layout ${path ? 'cursor-pointer' : ''} ${className}`}
      style={{ willChange: hovered ? 'transform' : 'auto' }}
    >
      {/* ── Animated gradient border ring ── */}
      <AnimatePresence>
        {(hovered || isReturning) && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute -inset-[1.5px] rounded-3xl pointer-events-none z-0"
            style={{
              background: `linear-gradient(135deg, ${config.accent}, transparent 50%, ${config.accent})`,
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s linear infinite',
              filter: 'blur(1px)',
              opacity: 0.8
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* ── Card body ── */}
      <div
        className="relative z-10 flex flex-col h-full rounded-3xl overflow-hidden text-left"
        style={{
          background: cardBg,
          backdropFilter: 'blur(16px)',
          boxShadow,
          border: cardBorder,
          transition: 'background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
          contain: 'layout paint style',
          willChange: hovered ? 'transform' : 'auto'
        }}
      >
        {/* Decorative Background Waves (Static) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-5" aria-hidden>
          <svg 
            className="w-full h-full scale-[1.15]" 
            preserveAspectRatio="none" 
            viewBox="0 0 800 400"
          >
            <path
              d="M0,200 C200,100 400,300 800,150 L800,400 L0,400 Z"
              fill="none"
              stroke={config.accent}
              strokeWidth="1.5"
              opacity="0.3"
              transform="translate(0, 10)"
            />
            <path
              d="M0,250 C250,350 500,150 800,250 L800,400 L0,400 Z"
              fill="none"
              stroke={config.accent}
              strokeWidth="1"
              opacity="0.2"
              transform="translate(0, -10)"
            />
          </svg>
        </div>

        {/* Ambient Hover Glow */}
        <div 
          className="absolute -inset-10 pointer-events-none z-0 transition-opacity duration-500 ease-out"
          style={{ opacity: hovered ? 0.6 : 0.0 }}
          aria-hidden
        >
          <div
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: hovered ? 'translate(calc((var(--spotlight-x, 50) - 50) * 0.3px), calc((var(--spotlight-y, 50) - 50) * 0.3px))' : 'translate(0px, 0px)',
              background: `radial-gradient(circle at center, ${hexToRgba(config.accent, 0.25)} 0%, transparent 60%)`,
              filter: 'blur(20px)',
              willChange: 'transform',
              transformStyle: 'flat'
            }}
          />
        </div>

        {/* Inner Light Reflection */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none z-0 border border-white/5 mix-blend-overlay" />

        {/* Click ripples */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-10" aria-hidden>
          <AnimatePresence>
            {ripples.map(r => (
              <m.div
                key={r.id}
                className="absolute rounded-full"
                style={{
                  left: `${r.x}%`,
                  top: `${r.y}%`,
                  translateX: '-50%',
                  translateY: '-50%',
                  background: `radial-gradient(circle, ${hexToRgba(config.accent, 0.25)} 0%, transparent 70%)`,
                }}
                initial={{ width: 0, height: 0, opacity: 0.8 }}
                animate={{ width: 500, height: 500, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Card content */}
        <div className="relative z-20 flex flex-col justify-between h-full p-6 text-white">
          
          {/* Top row: icon + badge */}
          <div className="flex justify-between items-start">
            {/* Icon */}
            <m.div
              variants={iconVariants}
              className="w-10 h-10 rounded-[10px] flex items-center justify-center relative backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: hovered 
                  ? `0 4px 12px ${hexToRgba(config.accent, 0.3)}, inset 0 0 10px rgba(255,255,255,0.15)` 
                  : 'inset 0 0 8px rgba(255,255,255,0.05)',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.9)',
                transition: 'box-shadow 0.3s ease, color 0.3s ease',
              }}
            >
              {icon}
            </m.div>

            {/* Badge */}
            <m.div
              variants={badgeVariants}
              className="px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm"
              style={{
                background: hovered ? hexToRgba(config.accent, 0.2) : 'rgba(255,255,255,0.08)',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              {badge}
            </m.div>
          </div>

          {/* Bottom text content */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <m.h3
                variants={titleVariants}
                className="text-[18px] font-bold leading-tight truncate drop-shadow-sm text-white"
              >
                {title}
              </m.h3>

              <m.p
                variants={descVariants}
                className="text-[14px] leading-relaxed line-clamp-2 font-medium"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                {description}
              </m.p>
            </div>

            {/* CTA */}
            {path && (
              <div
                className="flex items-center gap-1.5 text-[14px] font-bold relative w-fit mt-1"
                style={{ 
                  color: hovered ? config.accent : 'rgba(255,255,255,0.95)',
                  transition: 'color 0.3s ease'
                }}
              >
                <span className="relative">
                  Explore Module
                  <m.span
                    variants={ctaUnderlineVariants}
                    className="absolute left-0 -bottom-0.5 h-[1.5px] rounded-full"
                    style={{ background: config.accent, boxShadow: `0 0 8px ${config.accent}` }}
                  />
                </span>
                <m.span variants={ctaArrowVariants}>
                  <ArrowRight className="w-[16px] h-[16px]" />
                </m.span>
              </div>
            )}
          </div>

        </div>
      </div>
    </m.div>
  );
});

export default LandingModuleCard;
