import type { ReactNode } from 'react';
import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
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

const MODULE_CONFIG: Record<string, { start: string; mid: string; end: string; accent: string }> = {
  'LEDZE+ Purchase': { start: '#0B1F4D', mid: '#1E3A8A', end: '#2563EB', accent: '#60A5FA' },
  'LEDZE+ Inventory': { start: '#062C30', mid: '#0F766E', end: '#115E59', accent: '#2DD4BF' },
  'LEDZE+ Sales': { start: '#052E16', mid: '#166534', end: '#15803D', accent: '#34D399' },
  'LEDZE+ Accounting': { start: '#4A2200', mid: '#B45309', end: '#D97706', accent: '#FBBF24' },
  'LEDZE+ Billing': { start: '#2E1065', mid: '#6D28D9', end: '#7C3AED', accent: '#C4B5FD' },
  'LEDZE+ Banking': { start: '#0A2145', mid: '#1E40AF', end: '#2563EB', accent: '#93C5FD' },
  'LEDZE+ Payroll': { start: '#500724', mid: '#9D174D', end: '#BE185D', accent: '#F9A8D4' },
  'LEDZE+ GST': { start: '#4A1700', mid: '#C2410C', end: '#EA580C', accent: '#FDBA74' },
  'LEDZE+ Gate Management': { start: '#1E1B4B', mid: '#4338CA', end: '#4F46E5', accent: '#A5B4FC' },
};

const DEFAULT_CONFIG = { start: '#1E1B4B', mid: '#4338CA', end: '#4F46E5', accent: '#A5B4FC' };

// ─── Spring config ────────────────────────────────────────────────────────────
const springCfg = { stiffness: 250, damping: 20, mass: 0.8 };

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

export default function LandingModuleCard({
  title, description, icon,
  delay = 0, className = '', path, badge = 'MODULE',
}: LandingModuleCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const config = MODULE_CONFIG[title] ?? DEFAULT_CONFIG;

  // Spring-based card transforms
  const rawY  = useSpring(0, springCfg);
  const rawS  = useSpring(1, springCfg);

  const cardY     = useTransform(rawY, (v) => `translateY(${v}px)`);
  const cardScale = useTransform(rawS, (v) => `scale(${v})`);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    rawY.set(-8);
    rawS.set(1.03);
  }, [rawY, rawS]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rawY.set(0);
    rawS.set(1);
    setSpotlight({ x: 50, y: 50 });
  }, [rawY, rawS]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
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

    rawS.set(1.04);
    rawY.set(-14);

    setTimeout(() => {
      rawS.set(1);
      rawY.set(0);
      setRipples([]);
      navigate(path);
    }, 320);
  }, [path, navigate, rawS, rawY]);

  // Handle return highlight animation
  useEffect(() => {
    const lastModule = sessionStorage.getItem('lastModule');
    if (lastModule === path) {
      sessionStorage.removeItem('lastModule');
      
      // Initial scale down
      rawS.set(0.96);
      
      // Trigger artificial hover state for the glow and shadow
      setHovered(true);
      
      // Spring back to normal scale
      setTimeout(() => {
        rawS.set(1.0);
      }, 100);

      // Remove the highlight after 2 seconds
      setTimeout(() => {
        setHovered(false);
      }, 2000);
    }
  }, [path, rawS]);

  // ── Render ────────────────────────────────────────────────────────────────
  const boxShadow = hovered
    ? `0 20px 60px ${hexToRgba(config.end, 0.4)}, 0 0 40px ${hexToRgba(config.accent, 0.25)}`
    : `0 20px 60px ${hexToRgba(config.end, 0.18)}`;

  return (
    <motion.div
      ref={cardRef}
      onClick={handleClick}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ y: cardY, scale: cardScale, willChange: 'transform, opacity' }}
      className={`group relative flex flex-col h-[220px] w-full ${path ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* ── Animated gradient border ring ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -inset-[1.5px] rounded-3xl pointer-events-none z-0"
            style={{
              background: `linear-gradient(135deg, ${config.accent}, transparent 50%, ${config.accent})`,
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s linear infinite',
              filter: 'blur(1px)',
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* ── Card body ── */}
      <motion.div
        className="relative z-10 flex flex-col h-full rounded-3xl overflow-hidden text-left"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.02)), linear-gradient(135deg, ${config.start} 0%, ${config.mid} 55%, ${config.end} 100%)`,
          backdropFilter: 'blur(18px)',
          boxShadow,
          border: hovered
            ? `1px solid rgba(255,255,255,0.25)`
            : `1px solid rgba(255,255,255,0.10)`,
          transition: 'background 0.35s ease, box-shadow 0.45s cubic-bezier(0.22,1,0.36,1), border 0.35s ease',
        }}
      >
        {/* Animated SVG Waves (Decorative Background) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-10" aria-hidden>
          <motion.svg 
            className="w-full h-full scale-[1.15]" 
            preserveAspectRatio="none" 
            viewBox="0 0 800 400"
            animate={hovered ? { scale: 1.25, rotate: 2 } : { scale: 1.15, rotate: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <motion.path
              d="M0,200 C200,100 400,300 800,150 L800,400 L0,400 Z"
              fill="none"
              stroke={config.accent}
              strokeWidth="2"
              initial={{ y: 10, opacity: 0.5 }}
              animate={{ y: [-15, 15, -15], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,250 C250,350 500,150 800,250 L800,400 L0,400 Z"
              fill="none"
              stroke={config.accent}
              strokeWidth="1.5"
              initial={{ y: -10, opacity: 0.5 }}
              animate={{ y: [15, -15, 15], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>

        {/* Ambient Breathing Glow */}
        <div 
          className="absolute -inset-10 pointer-events-none z-0 transition-all duration-700 ease-out"
          style={{
            opacity: hovered ? 0.8 : 0.0,
            transform: hovered ? `translate(${(spotlight.x - 50) * 0.4}px, ${(spotlight.y - 50) * 0.4}px)` : 'translate(0px, 0px)',
          }}
          aria-hidden
        >
          <motion.div
            className="w-full h-full"
            animate={{
              x: [-15, 25, -10, 15, -15],
              y: [-25, 10, -15, 25, -25],
              scale: [1, 1.15, 0.95, 1.05, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `
                radial-gradient(circle at 25% 75%, ${hexToRgba(config.accent, 0.15)} 0%, transparent 50%),
                radial-gradient(circle at 75% 25%, ${hexToRgba(config.accent, 0.15)} 0%, transparent 50%)
              `,
              filter: 'blur(30px)',
            }}
          />
        </div>

        {/* Inner Light Reflection */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none z-0 border border-white/5 mix-blend-overlay" />

        {/* Click ripples */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-10" aria-hidden>
          <AnimatePresence>
            {ripples.map(r => (
              <motion.div
                key={r.id}
                className="absolute rounded-full"
                style={{
                  left: `${r.x}%`,
                  top: `${r.y}%`,
                  translateX: '-50%',
                  translateY: '-50%',
                  background: `radial-gradient(circle, ${hexToRgba(config.accent, 0.3)} 0%, transparent 70%)`,
                }}
                initial={{ width: 0, height: 0, opacity: 0.8 }}
                animate={{ width: 600, height: 600, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Card content */}
        <div className="relative z-20 flex flex-col h-full p-6 text-white">
          
          {/* Top row: icon + badge */}
          <div className="flex justify-between items-start mb-auto">
            {/* Icon */}
            <motion.div
              animate={hovered
                ? { scale: 1.1, rotate: 6, y: -2 }
                : { scale: 1,    rotate: 0, y: 0  }}
              transition={{ ...springCfg, type: 'spring', delay: 0 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: hovered ? `0 0 20px ${hexToRgba(config.accent, 0.4)}, inset 0 0 10px rgba(255,255,255,0.1)` : 'inset 0 0 10px rgba(255,255,255,0.05)',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.8)',
              }}
            >
              {icon}
            </motion.div>

            {/* Badge */}
            <motion.div
              animate={hovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ ...springCfg, type: 'spring', delay: 0.05 }}
              className="px-2.5 py-1 rounded-full text-[12px] font-black tracking-wider uppercase transition-all duration-300 backdrop-blur-md"
              style={{
                background: hovered ? hexToRgba(config.accent, 0.25) : 'rgba(255,255,255,0.1)',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: hovered ? `0 0 16px ${hexToRgba(config.accent, 0.3)}` : 'none',
              }}
            >
              {badge}
            </motion.div>
          </div>

          {/* Bottom text content */}
          <div className="mt-4">
            <motion.h3
              animate={hovered ? { y: -1 } : { y: 0 }}
              transition={{ ...springCfg, type: 'spring', delay: 0.05 }}
              className="text-[28px] font-bold leading-tight mb-1 transition-colors duration-300 truncate drop-shadow-sm"
              style={{ color: '#ffffff' }}
            >
              {title}
            </motion.h3>

            <motion.p
              animate={hovered ? { opacity: 1, y: -2 } : { opacity: 1, y: 0 }}
              transition={{ ...springCfg, type: 'spring', delay: 0.1 }}
              className={`text-[16px] leading-snug truncate font-medium ${path ? 'mb-4' : 'mb-0'}`}
              style={{ color: 'rgba(255,255,255,0.78)' }}
            >
              {description}
            </motion.p>

            {/* CTA */}
            {path && (
              <motion.div
                animate={hovered ? { x: 4 } : { x: 0 }}
                transition={{ ...springCfg, type: 'spring', delay: 0.15 }}
                className="flex items-center gap-1.5 text-[16px] font-bold relative transition-colors duration-300 w-fit"
                style={{ color: hovered ? config.accent : '#ffffff' }}
              >
                <span className="relative">
                  Explore Module
                  <motion.span
                    className="absolute left-0 -bottom-0.5 h-[1.5px] rounded-full"
                    animate={{ width: hovered ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                    style={{ background: config.accent, boxShadow: `0 0 8px ${config.accent}` }}
                  />
                </span>
                <motion.span
                  animate={hovered ? { x: 4 } : { x: 0 }}
                  transition={{ ...springCfg, type: 'spring', delay: 0.18 }}
                >
                  <ArrowRight className="w-[18px] h-[18px]" />
                </motion.span>
              </motion.div>
            )}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
