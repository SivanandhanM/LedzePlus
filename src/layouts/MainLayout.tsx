import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import BackToTop from '../components/BackToTop/BackToTop';
import Footer from '../components/Footer/Footer';
import GlobalBackground from '../components/GlobalBackground/GlobalBackground';
import FloatingERPBackground from '../components/FloatingERPBackground/FloatingERPBackground';
import RouteLoader from '../components/RouteLoader/RouteLoader';

function PageReadyNotifier({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onReady(), 100);
    return () => clearTimeout(timer);
  }, [onReady]);
  return null;
}

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    // Removed artificial delay
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
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
  const loadedModules = useRef<Set<string>>(new Set([location.pathname]));

  const handlePageReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (location.key === prevKeyRef.current) return;
    prevKeyRef.current = location.key;
    
    if (!loadedModules.current.has(location.pathname)) {
      setIsLoading(true);
      loadedModules.current.add(location.pathname);
    }
  }, [location.key, location.pathname]);

  return (
    <div className="h-screen flex flex-col relative overflow-hidden text-slate-900 dark:text-slate-100">
      <GlobalBackground />
      <FloatingERPBackground />
      <RouteLoader isLoading={isLoading} />
      <ScrollProgress />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <main id="scroll-container" className="flex-1 overflow-y-auto p-6 relative">
          <div className="max-w-[1600px] w-[95%] mx-auto relative z-10 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.key}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ willChange: 'transform, opacity, filter' }}
              >
                <Suspense fallback={null}>
                  <Outlet />
                  <PageReadyNotifier onReady={handlePageReady} />
                </Suspense>
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
