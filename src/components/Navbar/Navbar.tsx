import { Moon, Sun, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SpotlightSearch from '../SpotlightSearch/SpotlightSearch';
import logoImg from '../../assets/logo.png';
import navanalaLogo from '../../assets/logo_nn.png';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'glass-panel border-b border-white/20 dark:border-white/10 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-slate-800/50 md:hidden transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <img 
                src={logoImg} 
                alt="LEDZE Plus Logo" 
                className="w-10 h-10 object-contain rounded-xl group-hover:scale-105 transition-transform"
              />
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                LEDZE<span className="text-primary font-black ml-1">+</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <SpotlightSearch />
            
            <a 
              href="https://www.navanalatech.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-10 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center overflow-hidden transition-all shadow-sm border border-slate-200/50 dark:border-slate-700/50 hover:scale-[1.03] hover:shadow-md"
              title="Powered by Navanala Technologies"
            >
              <img src={navanalaLogo} alt="Navanala Logo" className="h-full w-auto object-contain" />
            </a>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}
