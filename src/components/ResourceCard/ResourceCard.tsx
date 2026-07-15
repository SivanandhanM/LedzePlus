import type { ReactNode } from 'react';
import { useRef, useState, useCallback, memo, useMemo } from 'react';
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

// ─── Shared Stable Variants (Extracted for Performance) ────────────────────────
const cardVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
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
  hover: { y: -2, transition: { type: 'spring', stiffness: 300, damping: 20 } }
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
interface ResourceCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
  className?: string;
  path?: string;
  badge?: string;
  accentColor?: string;
  gradient?: string;
}

const ResourceCard = memo(function ResourceCard({
  title, description, icon,
  delay = 0, className = '', path, badge = 'RESOURCE',
  // Desaturated default accent (was #0891B2)
  accentColor = '#4ADBD1',
  // Standard enterprise gradient
  gradient = 'linear-gradient(135deg, #092026, #123C42, #185059)'
}: ResourceCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

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
    sessionStorage.setItem('sourceSection', 'resources');

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

  // ── Stable Styles ─────────────────────────────────────────────────────────
  const boxShadow = useMemo(() => hovered 
    ? `0 16px 40px rgba(0,0,0,0.4), 0 0 30px ${hexToRgba(accentColor, 0.2)}`
    : `0 12px 30px rgba(0,0,0,0.25)`, 
    [hovered, accentColor]);

  const cardBorder = hovered 
    ? `1px solid ${hexToRgba(accentColor, 0.3)}` 
    : `1px solid rgba(255,255,255,0.08)`;

  const cardBg = hovered
    ? `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.0)), ${gradient}`
    : `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.0)), ${gradient}`;

  return (
    <m.div
      ref={cardRef}
      onClick={handleClick}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true }}
      variants={cardVariants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col min-h-[220px] h-full w-full contain-layout ${path ? 'cursor-pointer' : ''} ${className}`}
      style={{ willChange: hovered ? 'transform' : 'auto' }}
    >
      {/* ── Animated gradient border ring ── */}
      <AnimatePresence>
        {hovered && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute -inset-[1.5px] rounded-[24px] pointer-events-none z-0"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, transparent 50%, ${accentColor})`,
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
        className="relative z-10 flex flex-col h-full rounded-[24px] overflow-hidden text-left"
        style={{
          background: cardBg,
          backdropFilter: 'blur(16px)',
          boxShadow,
          border: cardBorder,
          transition: 'background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
          contain: 'layout paint style'
        }}
      >
        {/* Decorative Background Waves (Static) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-10" aria-hidden>
          <svg
            className="w-full h-full scale-[1.15]"
            preserveAspectRatio="none"
            viewBox="0 0 800 400"
          >
            <path
              d="M0,200 C200,100 400,300 800,150 L800,400 L0,400 Z"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              opacity="0.3"
              transform="translate(0, 10)"
            />
            <path
              d="M0,250 C250,350 500,150 800,250 L800,400 L0,400 Z"
              fill="none"
              stroke={accentColor}
              strokeWidth="1.5"
              opacity="0.2"
              transform="translate(0, -10)"
            />
            <path
              d="M0,150 C300,50 600,250 800,100 L800,400 L0,400 Z"
              fill="none"
              stroke={accentColor}
              strokeWidth="3"
              opacity="0.1"
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
              background: `radial-gradient(circle at center, ${hexToRgba(accentColor, 0.25)} 0%, transparent 60%)`,
              filter: 'blur(20px)',
              willChange: 'transform',
              transformStyle: 'flat'
            }}
          />
        </div>

        {/* Inner Light Reflection */}
        <div className="absolute inset-0 rounded-[24px] pointer-events-none z-0 border border-white/5 mix-blend-overlay" />

        {/* Click ripples */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px] z-10" aria-hidden>
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
                  background: `radial-gradient(circle, ${hexToRgba(accentColor, 0.25)} 0%, transparent 70%)`,
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
              className="w-12 h-12 rounded-[14px] flex items-center justify-center relative backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: hovered 
                  ? `0 4px 12px ${hexToRgba(accentColor, 0.3)}, inset 0 0 10px rgba(255,255,255,0.15)` 
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
              className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm"
              style={{
                background: hovered ? hexToRgba(accentColor, 0.2) : 'rgba(255,255,255,0.08)',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              {badge}
            </m.div>
          </div>

          <div className="flex flex-col gap-2.5 mt-4">
            <m.h3
              variants={titleVariants}
              className="text-[24px] md:text-[26px] font-bold leading-tight drop-shadow-sm text-white"
            >
              {title}
            </m.h3>

            <m.p
              variants={descVariants}
              className={`text-[15px] md:text-[16px] leading-relaxed font-medium ${path ? 'mb-2' : 'mb-0'}`}
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {description}
            </m.p>

            {/* CTA */}
            {path && (
              <div
                className="flex items-center gap-1.5 text-[15px] font-bold relative w-fit"
                style={{ 
                  color: hovered ? accentColor : 'rgba(255,255,255,0.95)',
                  transition: 'color 0.3s ease'
                }}
              >
                <span className="relative">
                  Explore Resource
                  <m.span
                    variants={ctaUnderlineVariants}
                    className="absolute left-0 -bottom-0.5 h-[1.5px] rounded-full"
                    style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
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

export default ResourceCard;
