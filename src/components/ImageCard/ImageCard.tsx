import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageCardProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ImageCard({ src, alt, caption }: ImageCardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const openLightbox = () => {
    setIsFullscreen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(z => Math.min(z + 0.5, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(z => Math.max(z - 0.5, 0.5));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      {/* Thumbnail card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative my-10 rounded-[2rem] overflow-hidden glass-panel bg-white/40 dark:bg-slate-900/40 p-2 border border-white/60 dark:border-white/10 shadow-xl shadow-primary/5 cursor-zoom-in"
        onClick={openLightbox}
        whileHover={{ boxShadow: '0 24px 60px rgba(79,70,229,0.14)' }}
      >
        <div className="relative rounded-[1.5rem] overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            src={src}
            alt={alt}
            className="w-full h-auto object-cover max-h-[600px] bg-slate-100 dark:bg-slate-800"
            loading="lazy"
          />
          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="w-14 h-14 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md border border-white/60"
            >
              <Maximize2 className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
        </div>

        {caption && (
          <div className="mt-4 mb-2 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">
            {caption}
          </div>
        )}
      </motion.div>

      {/* Premium Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: 'rgba(2,6,23,0.92)', backdropFilter: 'blur(20px)' }}
            onClick={closeLightbox}
          >
            {/* Controls bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute top-5 right-5 flex items-center gap-2 z-10"
              onClick={e => e.stopPropagation()}
            >
              {/* Zoom controls */}
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-xl px-2 py-1 border border-white/20">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomOut}
                  className="p-2 rounded-lg text-white/80 hover:text-white transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </motion.button>
                <span className="text-white/60 text-xs font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomIn}
                  className="p-2 rounded-lg text-white/80 hover:text-white transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleReset}
                  className="p-2 rounded-lg text-white/80 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(239,68,68,0.25)' }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.88, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-4 md:p-8 max-w-[90vw] max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <motion.img
                drag={zoom > 1}
                dragConstraints={{ left: -400, right: 400, top: -300, bottom: 300 }}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                animate={{ scale: zoom, x: position.x, y: position.y }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                src={src}
                alt={alt}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
              />
            </motion.div>

            {/* Caption */}
            {caption && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/15"
              >
                {caption}
              </motion.div>
            )}

            {/* ESC hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 right-6 text-white/30 text-xs font-mono"
            >
              Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">Esc</kbd> to close
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
