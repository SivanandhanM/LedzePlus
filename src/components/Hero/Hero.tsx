import type { ReactNode } from 'react';
import { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logoImg from '../../assets/images/logo.png';

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  icon?: ReactNode;
}

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Spring config for mouse parallax
const parallaxSpring = { stiffness: 80, damping: 20, mass: 0.6 };

export default function Hero({ title, subtitle, description }: HeroProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const heroRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const words = useMemo(() => title.split(' '), [title]);

  // Mouse parallax motion values
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, parallaxSpring);
  const mouseY = useSpring(rawMouseY, parallaxSpring);

  // Layered parallax transforms
  const blobX = useTransform(mouseX, [-1, 1], [-12, 12]);
  const blobY = useTransform(mouseY, [-1, 1], [-10, 10]);
  const logoX = useTransform(mouseX, [-1, 1], [-6, 6]);
  const logoY = useTransform(mouseY, [-1, 1], [-5, 5]);
  const badgeX = useTransform(mouseX, [-1, 1], [-3, 3]);
  const badgeY = useTransform(mouseY, [-1, 1], [-3, 3]);
  const bgLogoX = useTransform(mouseX, [-1, 1], [8, -8]);
  const bgLogoY = useTransform(mouseY, [-1, 1], [6, -6]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawMouseX.set(x);
    rawMouseY.set(y);
  }, [rawMouseX, rawMouseY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawMouseX.set(0);
    rawMouseY.set(0);
  }, [rawMouseX, rawMouseY]);

  const handleBackToModules = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <motion.div
      ref={heroRef}
      className="relative rounded-[2.5rem] mb-12 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.01 : 1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
    >
      {/* ── Animated gradient border ring ── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -inset-[2px] rounded-[2.6rem] pointer-events-none z-0"
            style={{
              background: `linear-gradient(135deg, #6366f1, #06b6d4, #a855f7, #f97316, #6366f1)`,
              backgroundSize: '300% 300%',
              animation: 'gradientShift 3s linear infinite',
              filter: 'blur(1px)',
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* ── Outer radial glow ── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none -z-10"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.2) 0%, transparent 70%)`,
              filter: 'blur(30px)',
              transform: 'translateY(20px) scaleX(0.9)',
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 overflow-hidden rounded-[2.5rem] glass-panel p-10 md:p-16 border"
        animate={{
          background: isHovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
          borderColor: isHovered ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.6)',
          boxShadow: isHovered
            ? '0 30px 80px rgba(99,102,241,0.15), 0 0 40px rgba(59,130,246,0.1)'
            : '0 20px 40px rgba(0,0,0,0.05)',
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-skyblue/10 pointer-events-none" />

        {/* Logo blurred background — parallax layer deepest */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-8 pointer-events-none overflow-hidden"
          style={{ x: bgLogoX, y: bgLogoY }}
        >
          <img
            src={logoImg}
            alt=""
            className="w-72 h-72 object-contain opacity-[0.08] blur-[2px] scale-110"
          />
        </motion.div>

        <div className="relative z-10 max-w-3xl">
          {/* Back to Modules button */}
          {!isHome && (
            <motion.button
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              onClick={handleBackToModules}
              className="group flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-skyblue backdrop-blur-sm"
            >
              <motion.span
                animate={{ x: 0 }}
                whileHover={{ x: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.span>
              Back to Modules
            </motion.button>
          )}

          {/* Logo + badge row — parallax layer 2 */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ x: logoX, y: logoY }}
              className="p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-primary/10 border border-slate-100 dark:border-slate-700"
            >
              <img src={logoImg} alt="LEDZE Plus" className="w-12 h-12 object-contain" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              style={{ x: badgeX, y: badgeY }}
              className="px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-skyblue/20 dark:text-skyblue text-sm font-bold tracking-widest uppercase border border-primary/20"
            >
              {subtitle}
            </motion.div>
          </div>

          {/* ── Word-by-word title reveal ── */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white leading-[1.1] flex flex-wrap gap-x-[0.3em]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 + i * 0.08 }}
                style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Description fades in after title */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.4 + words.length * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Decorative animated blobs — parallax layer 3 */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ x: blobX, y: blobY }}
          className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ x: useTransform(mouseX, [-1, 1], [10, -10]) }}
          className="absolute right-40 -bottom-20 w-48 h-48 bg-purple/20 dark:bg-purple/30 rounded-full blur-[60px] pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}
