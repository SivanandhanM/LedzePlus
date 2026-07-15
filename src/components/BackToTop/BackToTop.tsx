import { ArrowUp } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence, useSpring } from 'framer-motion';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState(false);

  const springProgress = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      // Due to sub-pixel rendering, scrollTop might not exactly equal scrollHeight.
      // If we are within 2px of the bottom, clamp to 1.
      let progress = 0;
      if (scrollHeight > 0) {
        progress = Math.abs(scrollHeight - scrollTop) <= 2 ? 1 : scrollTop / scrollHeight;
      }
      setScrollProgress(progress);
      springProgress.set(progress);
      setIsVisible(scrollTop > 300);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [springProgress]);

  const scrollToTop = useCallback(() => {
    const container = document.getElementById('scroll-container');
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    container?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const strokeDashoffset = CIRCUMFERENCE * (1 - scrollProgress);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-8 right-8 z-50 focus:outline-none"
          aria-label="Back to top"
        >
          <div className="relative w-14 h-14">
            {/* Ripple */}
            <AnimatePresence>
              {ripple && (
                <m.div
                  className="absolute inset-0 rounded-full bg-primary/30"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>

            {/* SVG Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
              {/* Track */}
              <circle
                cx="24" cy="24" r={RADIUS}
                fill="none"
                stroke="rgba(99,102,241,0.15)"
                strokeWidth="3"
              />
              {/* Progress arc */}
              <m.circle
                cx="24" cy="24" r={RADIUS}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1 1"
                animate={{ strokeDashoffset: 1 - scrollProgress }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center button */}
            <div
              className="absolute inset-[6px] rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: isHovered
                  ? 'linear-gradient(135deg, #4F46E5, #38BDF8)'
                  : 'rgba(255,255,255,0.95)',
                boxShadow: isHovered
                  ? '0 8px 24px rgba(79,70,229,0.4)'
                  : '0 4px 12px rgba(0,0,0,0.12)',
              }}
            >
              <ArrowUp
                className="w-4 h-4 transition-colors duration-300"
                style={{ color: isHovered ? 'white' : '#4F46E5' }}
              />
            </div>
          </div>
        </m.button>
      )}
    </AnimatePresence>
  );
}
