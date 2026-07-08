import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const searchLinks = [
  { name: 'Purchase Module', path: '/purchase', category: 'PROCUREMENT' },
  { name: 'Sales Module', path: '/sales', category: 'REVENUE' },
  { name: 'Billing Dashboard', path: '/billing', category: 'INVOICING' },
  { name: 'Inventory & Warehouse', path: '/inventory', category: 'WAREHOUSE' },
  { name: 'Accounting & Ledger', path: '/accounting', category: 'FINANCE' },
  { name: 'Payroll & HR', path: '/payroll', category: 'HR' },
  { name: 'Banking & Cash', path: '/banking', category: 'CASH & BANK' },
  { name: 'Gate Management', path: '/gate-management', category: 'SECURITY' },
  { name: 'GST & Compliance', path: '/gst', category: 'TAX & GST' },
];

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

export default function SpotlightSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
      if (isOpen) {
        if (e.key === 'ArrowDown') setActiveIndex(i => Math.min(i + 1, filteredLinks.length - 1));
        if (e.key === 'ArrowUp') setActiveIndex(i => Math.max(i - 1, 0));
        if (e.key === 'Enter' && filteredLinks[activeIndex]) {
          handleSelect(filteredLinks[activeIndex].path);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
    else setQuery('');
  }, [isOpen]);

  useEffect(() => setActiveIndex(0), [query]);

  const filteredLinks = searchLinks.filter(link =>
    link.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.03, boxShadow: '0 4px 16px rgba(79,70,229,0.12)' }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-slate-500 bg-white/70 dark:bg-slate-800/70 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm"
      >
        <Search className="w-4 h-4 text-slate-400" />
        <span className="text-slate-400">Search docs...</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100]"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.96, y: -16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, y: -16, filter: 'blur(8px)' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[18vh] left-1/2 -translate-x-1/2 w-full max-w-xl z-[101] px-4"
            >
              <div
                className="rounded-2xl overflow-hidden flex flex-col border border-white/60 dark:border-slate-700/60"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {/* Input row */}
                <div className="flex items-center px-5 py-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                  <motion.div
                    animate={{ rotate: isOpen ? [0, -10, 0] : 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <Search className="w-5 h-5 text-primary" />
                  </motion.div>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search modules, features..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-medium"
                  />
                  <motion.button
                    whileHover={{ scale: 1.12, backgroundColor: 'rgba(239,68,68,0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Results list */}
                <div className="max-h-80 overflow-y-auto p-2">
                  {filteredLinks.length > 0 ? (
                    <motion.div
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {filteredLinks.map((link, i) => (
                        <motion.button
                          key={link.path}
                          variants={itemVariants}
                          onClick={() => handleSelect(link.path)}
                          onMouseEnter={() => setActiveIndex(i)}
                          animate={{
                            backgroundColor: activeIndex === i
                              ? 'rgba(79,70,229,0.06)'
                              : 'transparent',
                          }}
                          transition={{ duration: 0.15 }}
                          className="w-full flex items-center justify-between px-4 py-3 text-left rounded-xl group"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className={`font-semibold text-[15px] transition-colors duration-150 ${activeIndex === i ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                              {link.name}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              {link.category}
                            </span>
                          </div>
                          <motion.div
                            animate={{ x: activeIndex === i ? 0 : -6, opacity: activeIndex === i ? 1 : 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            <ArrowRight className="w-4 h-4 text-primary" />
                          </motion.div>
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="text-3xl mb-3">🔍</div>
                      <p className="text-slate-500 font-medium">No results for <span className="text-slate-700 font-bold">"{query}"</span></p>
                      <p className="text-slate-400 text-sm mt-1">Try a different module name</p>
                    </motion.div>
                  )}
                </div>

                {/* Footer hint */}
                <div className="px-5 py-2.5 border-t border-slate-100/80 dark:border-slate-800 flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono border border-slate-200 dark:border-slate-700">↑↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono border border-slate-200 dark:border-slate-700">↵</kbd> open</span>
                  <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono border border-slate-200 dark:border-slate-700">Esc</kbd> close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
