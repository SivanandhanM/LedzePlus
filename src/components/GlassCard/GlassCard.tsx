import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState, memo } from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

const GlassCard = memo(function GlassCard({
  children,
  className,
  delay = 0,
  hoverEffect = true,
}: GlassCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    requestAnimationFrame(() => {
      if (e.currentTarget) {
        e.currentTarget.style.setProperty('--shine-x', `${x}%`);
        e.currentTarget.style.setProperty('--shine-y', `${y}%`);
      }
    });
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverEffect ? { y: -6, scale: 1.015 } : {}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        willChange: 'transform, backdrop-filter, box-shadow',
        contain: 'content',
        transform: 'translateZ(0)',
        boxShadow: hovered
          ? '0 24px 48px rgba(var(--color-primary-hex) / 0.12), 0 8px 16px rgba(0,0,0,0.06)'
          : '0 4px 16px rgba(0,0,0,0.04)',
        borderColor: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
        transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
      }}
      className={cn(
        'glass-panel module-card-tint rounded-2xl p-6 relative overflow-hidden transition-all duration-300',
        className
      )}
    >
      {/* Glass shine sweep */}
      {hoverEffect && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: hovered ? 1 : 0,
            background: 'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.35) 0%, transparent 55%)',
          }}
          aria-hidden
        />
      )}
      {children}
    </m.div>
  );
});

export default GlassCard;
