import type { ReactNode } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logoImg from '../../assets/logo.png';

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  icon?: ReactNode;
}

export default function Hero({ title, subtitle, description }: HeroProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const [isHovered, setIsHovered] = useState(false);

  const handleBackToModules = () => {
    navigate('/');
    // After navigating, scroll to the modules section
    setTimeout(() => {
      document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <motion.div 
      className="relative rounded-[2.5rem] mb-12 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      
      {/* Logo blurred background */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-8 pointer-events-none overflow-hidden">
        <img 
          src={logoImg} 
          alt="" 
          className="w-72 h-72 object-contain opacity-[0.08] blur-[2px] scale-110"
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl"
      >
        {/* Back to Modules button – shown on all module pages */}
        {!isHome && (
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
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

        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-primary/10 border border-slate-100 dark:border-slate-700"
          >
            <img src={logoImg} alt="LEDZE Plus" className="w-12 h-12 object-contain" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-skyblue/20 dark:text-skyblue text-sm font-bold tracking-widest uppercase border border-primary/20"
          >
            {subtitle}
          </motion.div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white leading-[1.1]">
          {title}
        </h1>
        
        {description && (
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {description}
          </p>
        )}
      </motion.div>
      
      {/* Decorative Blobs */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full blur-[80px] pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 30, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-40 -bottom-20 w-48 h-48 bg-purple/20 dark:bg-purple/30 rounded-full blur-[60px] pointer-events-none" 
      />
      </motion.div>
    </motion.div>
  );
}
