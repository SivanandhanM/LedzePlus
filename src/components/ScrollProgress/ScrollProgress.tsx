import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollProgress() {
  const containerRef = useRef<HTMLElement | null>(null);

  // Attach to #scroll-container element
  if (typeof document !== 'undefined' && !containerRef.current) {
    containerRef.current = document.getElementById('scroll-container');
  }

  const { scrollYProgress } = useScroll({
    container: containerRef as React.RefObject<HTMLElement>,
  });

  const dotX = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* Main gradient progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-slate-100/50">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: scrollYProgress,
            background: 'linear-gradient(90deg, #4F46E5 0%, #38BDF8 50%, #A855F7 100%)',
          }}
        />
        {/* Glowing leading-edge pulse dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
          style={{
            left: dotX,
            translateX: '-50%',
            background: '#38BDF8',
            boxShadow: '0 0 10px 3px rgba(56,189,248,0.7)',
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </>
  );
}
