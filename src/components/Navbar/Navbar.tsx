import { Menu, X, ArrowLeft } from 'lucide-react';
import { useState, useEffect, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import SpotlightSearch from '../SpotlightSearch/SpotlightSearch';
import logoImg from '../../assets/images/logo.webp';
import navanalaLogo from '../../assets/images/logo_nn.webp';

const Navbar = memo(function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const scrollEl = document.getElementById('scroll-container');
    if (!scrollEl) return;
    
    // Throttled scroll listener to prevent main thread blocking
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(scrollEl.scrollTop > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <m.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* ── Left: Logo ── */}
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <m.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setMobileMenuOpen(v => !v)}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-slate-800/50 md:hidden transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <m.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </m.span>
                ) : (
                  <m.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </m.span>
                )}
              </AnimatePresence>
            </m.button>

            {/* Logo + wordmark */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <m.img
                src={logoImg}
                alt="LEDZE Plus Logo"
                className="w-10 h-10 object-contain rounded-xl"
                whileHover={{ scale: 1.1, rotate: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              />
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                LEDZE<span className="text-primary font-black ml-1">+</span>
              </span>
            </Link>

            {location.pathname !== '/' && (
              <m.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-4"
              >
                <Link
                  to="/"
                  state={{ scrollTo: sessionStorage.getItem('sourceSection') || 'modules' }}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-bold bg-white/70 hover:bg-white dark:bg-slate-900/60 dark:hover:bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow text-xs sm:text-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Back to Modules</span>
                </Link>
              </m.div>
            )}
          </div>

          {/* ── Right: Search + Navanala badge ── */}
          <div className="flex items-center gap-4">
            <SpotlightSearch />

            <m.a
              href="https://www.navanalatech.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Powered by Navanala Technologies"
              className="h-14 px-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center overflow-hidden shadow-sm border border-slate-200/50 dark:border-slate-700/50"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(79,70,229,0.18)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <img src={navanalaLogo} alt="Navanala Logo" className="h-[145%] w-auto max-w-none object-contain" />
            </m.a>
          </div>

        </div>
      </div>
    </m.nav>
  );
});

export default Navbar;
