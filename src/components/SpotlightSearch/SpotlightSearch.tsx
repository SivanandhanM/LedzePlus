import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const searchLinks = [
  { name: 'Purchase Module', path: '/purchase' },
  { name: 'Sales Module', path: '/sales' },
  { name: 'Billing Dashboard', path: '/billing' },
  { name: 'Inventory & Warehouse', path: '/inventory' },
  { name: 'Accounting & Ledger', path: '/accounting' },
  { name: 'Payroll & HR', path: '/payroll' },
  { name: 'Banking & Cash', path: '/banking' },
  { name: 'Gate Management', path: '/gate-management' },
  { name: 'GST & Compliance', path: '/gst' },
];

export default function SpotlightSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredLinks = searchLinks.filter(link => 
    link.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-xl z-[101] px-4"
            >
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search documentation..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none px-4 text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  />
                  <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto p-2">
                  {filteredLinks.length > 0 ? (
                    filteredLinks.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => handleSelect(link.path)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left rounded-xl hover:bg-primary/5 dark:hover:bg-primary/20 group transition-colors"
                      >
                        <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400">
                          {link.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary dark:group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-500">
                      No results found for "{query}"
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
