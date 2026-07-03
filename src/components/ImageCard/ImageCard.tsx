import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

interface ImageCardProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ImageCard({ src, alt, caption }: ImageCardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative my-10 rounded-[2rem] overflow-hidden glass-panel bg-white/40 dark:bg-slate-900/40 p-2 border border-white/60 dark:border-white/10 shadow-xl shadow-primary/5 cursor-zoom-in"
        onClick={() => setIsFullscreen(true)}
      >
        <div className="relative rounded-[1.5rem] overflow-hidden">
          <motion.img 
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            src={src} 
            alt={alt} 
            className="w-full h-auto object-cover max-h-[600px] bg-slate-100 dark:bg-slate-800" 
            loading="lazy" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg backdrop-blur-md">
              <Maximize2 className="w-5 h-5 text-slate-800 dark:text-white" />
            </div>
          </div>
        </div>
        
        {caption && (
          <div className="mt-4 mb-2 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
            {caption}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsFullscreen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
