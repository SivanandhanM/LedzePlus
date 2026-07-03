import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export default function GlassCard({ children, className, delay = 0, hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
      className={cn(
        "glass-panel rounded-2xl p-6 transition-all duration-300",
        hoverEffect && "hover:shadow-xl hover:shadow-primary/5 hover:border-white/90 dark:hover:border-white/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
