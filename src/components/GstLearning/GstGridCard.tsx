import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { GstModuleData } from '../../data/gstLearningData';

interface GstGridCardProps {
  data: GstModuleData;
  onClick: () => void;
}

const themeColors: Record<string, string> = {
  blue: 'bg-blue-50/90 hover:bg-blue-100/90 dark:bg-blue-500/5 dark:hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15 hover:border-blue-500/30 shadow-blue-500/5 hover:shadow-blue-500/20',
  emerald: 'bg-emerald-50/90 hover:bg-emerald-100/90 dark:bg-emerald-500/5 dark:hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/15 hover:border-emerald-500/30 shadow-emerald-500/5 hover:shadow-emerald-500/20',
  orange: 'bg-orange-50/90 hover:bg-orange-100/90 dark:bg-orange-500/5 dark:hover:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/15 hover:border-orange-500/30 shadow-orange-500/5 hover:shadow-orange-500/20',
  purple: 'bg-purple-50/90 hover:bg-purple-100/90 dark:bg-purple-500/5 dark:hover:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15 hover:border-purple-500/30 shadow-purple-500/5 hover:shadow-purple-500/20',
  teal: 'bg-teal-50/90 hover:bg-teal-100/90 dark:bg-teal-500/5 dark:hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/15 hover:border-teal-500/30 shadow-teal-500/5 hover:shadow-teal-500/20',
  indigo: 'bg-indigo-50/90 hover:bg-indigo-100/90 dark:bg-indigo-500/5 dark:hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/15 hover:border-indigo-500/30 shadow-indigo-500/5 hover:shadow-indigo-500/20',
  rose: 'bg-rose-50/90 hover:bg-rose-100/90 dark:bg-rose-500/5 dark:hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/15 hover:border-rose-500/30 shadow-rose-500/5 hover:shadow-rose-500/20',
  amber: 'bg-amber-50/90 hover:bg-amber-100/90 dark:bg-amber-500/5 dark:hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15 hover:border-amber-500/30 shadow-amber-500/5 hover:shadow-amber-500/20',
  sky: 'bg-sky-50/90 hover:bg-sky-100/90 dark:bg-sky-500/5 dark:hover:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/15 hover:border-sky-500/30 shadow-sky-500/5 hover:shadow-sky-500/20',
  cyan: 'bg-cyan-50/90 hover:bg-cyan-100/90 dark:bg-cyan-500/5 dark:hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/15 hover:border-cyan-500/30 shadow-cyan-500/5 hover:shadow-cyan-500/20',
  pink: 'bg-pink-50/90 hover:bg-pink-100/90 dark:bg-pink-500/5 dark:hover:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/15 hover:border-pink-500/30 shadow-pink-500/5 hover:shadow-pink-500/20',
  yellow: 'bg-yellow-50/90 hover:bg-yellow-100/90 dark:bg-yellow-500/5 dark:hover:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/15 hover:border-yellow-500/30 shadow-yellow-500/5 hover:shadow-yellow-500/20',
  violet: 'bg-violet-50/90 hover:bg-violet-100/90 dark:bg-violet-500/5 dark:hover:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/15 hover:border-violet-500/30 shadow-violet-500/5 hover:shadow-violet-500/20',
  green: 'bg-green-50/90 hover:bg-green-100/90 dark:bg-green-500/5 dark:hover:bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15 hover:border-green-500/30 shadow-green-500/5 hover:shadow-green-500/20',
};

const GstGridCard: React.FC<GstGridCardProps> = ({ data, onClick }) => {
  const themeStyles = themeColors[data.themeColor] || themeColors['blue'];
  
  // Create a local state to handle the immediate "flip" initiation before layout shift
  const [isFlipping, setIsFlipping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    // Check if the element is fully visible in viewport
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // If it's too high or too low, scroll it to the center first
      if (rect.top < 100 || rect.bottom > viewHeight - 100) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Wait for smooth scroll to finish before animating
        setTimeout(() => {
          executeAnimation();
        }, 300);
      } else {
        // Already in view, execute immediately
        executeAnimation();
      }
    } else {
      executeAnimation();
    }
  };

  const executeAnimation = () => {
    setIsFlipping(true);
    // Give it a tiny delay to start the 3D flip before the layout transition takes over
    setTimeout(() => {
      onClick();
      setIsFlipping(false); // Reset state
    }, 150);
  };

  return (
    <div ref={cardRef} style={{ perspective: 1000 }} className="h-full">
      <motion.div
        layoutId={`gst-card-${data.id}`}
        onClick={handleClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ scale: 1.02, y: -5 }}
        animate={isFlipping ? { rotateY: 90, scale: 0.95 } : { rotateY: 0 }}
        transition={{ 
          duration: isFlipping ? 0.15 : 0.4, 
          ease: isFlipping ? "easeIn" : "easeOut",
          layout: { duration: 0.6, type: "spring", bounce: 0.2 }
        }}
        className={`w-full h-full min-h-[200px] p-5 sm:p-6 rounded-[28px] cursor-pointer border shadow-md backdrop-blur-md flex flex-col items-start justify-between relative overflow-hidden group transition-all duration-300 ${themeStyles}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Background ambient glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-current/5 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full">
          <motion.div layoutId={`badge-${data.id}`} className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 opacity-80 inline-block px-2.5 py-1 rounded-full bg-current/10">
            {data.filedBy}
          </motion.div>
          <motion.h3 layoutId={`title-${data.id}`} className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
            {data.title}
          </motion.h3>
          <motion.p layoutId={`desc-${data.id}`} className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-snug">
            {data.purpose}
          </motion.p>
        </div>

        <div className="relative z-10 mt-5 w-full flex items-center justify-between text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
          <span>Click to learn</span>
          <span className="flex items-center">→</span>
        </div>
      </motion.div>
    </div>
  );
};

export default GstGridCard;
