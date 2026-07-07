import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import BackToTop from '../components/BackToTop/BackToTop';
import Footer from '../components/Footer/Footer';
import BackgroundEffects from '../components/BackgroundEffects/BackgroundEffects';
import FloatingERPBackground from '../components/FloatingERPBackground/FloatingERPBackground';
import RouteLoader from '../components/RouteLoader/RouteLoader';

const LOADER_DURATION = 3900; // Total loader lifecycle

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    // Delay page entrance until the loader finishes its cinematic animation
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 3.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MainLayout() {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const prevKeyRef = useRef(location.key);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showLoader = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
      timerRef.current = null;
    }, LOADER_DURATION);
  };

  useEffect(() => {
    showLoader();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.key === prevKeyRef.current) return;
    prevKeyRef.current = location.key;
    showLoader();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-slate-900 dark:text-slate-100">
      <BackgroundEffects />
      <FloatingERPBackground />
      <RouteLoader isLoading={isLoading} />
      <ScrollProgress />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <main id="scroll-container" className="flex-1 overflow-y-auto p-6 relative">
          <div className="max-w-6xl mx-auto relative z-10 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.key}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ willChange: 'transform, opacity, filter' }}
              >
                <Outlet />
                <Footer />
              </motion.div>
            </AnimatePresence>
          </div>
          <BackToTop />
        </main>
      </div>
    </div>
  );
}
