import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SpotlightSearch from '../SpotlightSearch/SpotlightSearch';
import logoImg from '../../assets/images/logo.webp';
import navanalaLogo from '../../assets/images/logo_nn.webp';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const scrollEl = document.getElementById('scroll-container');
    if (!scrollEl) return;
    const handleScroll = () => setIsScrolled(scrollEl.scrollTop > 10);
    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-panel border-b border-white/20 dark:border-white/10 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* ── Left: Logo ── */}
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setMobileMenuOpen(v => !v)}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-slate-800/50 md:hidden transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Logo + wordmark */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <motion.img
                src={logoImg}
                alt="LEDZE Plus Logo"
                className="w-10 h-10 object-contain rounded-xl"
                whileHover={{ scale: 1.1, rotate: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              />
              <motion.span
                className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300"
                whileHover={{ letterSpacing: '0.02em' }}
                transition={{ duration: 0.25 }}
              >
                LEDZE<span className="text-primary font-black ml-1">+</span>
              </motion.span>
            </Link>
          </div>

          {/* ── Right: Search + Navanala badge ── */}
          <div className="flex items-center gap-4">
            <SpotlightSearch />

            <motion.a
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
            </motion.a>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}
