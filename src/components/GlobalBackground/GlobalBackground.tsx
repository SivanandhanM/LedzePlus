import { motion } from 'framer-motion';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#FAFAFC] dark:bg-[#09090B]">
      {/* Layer 1: Soft Mesh Gradient */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"
        style={{
          background: `
            radial-gradient(circle at 15% 50%, rgba(224, 231, 255, 0.8), transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(238, 242, 255, 0.8), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(243, 232, 255, 0.8), transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(224, 242, 254, 0.8), transparent 50%),
            radial-gradient(circle at 20% 20%, rgba(250, 232, 255, 0.8), transparent 50%)
          `,
          filter: 'blur(80px)',
        }}
      />
      
      {/* Layer 2: Large blurred radial lights with slow movement */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200 dark:bg-indigo-900/30 blur-[120px]"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-200 dark:bg-cyan-900/20 blur-[150px]"
      />

      {/* Layer 3: Animated Aurora Gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 40, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
        style={{
          background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 55%, transparent 60%)',
          backgroundSize: '300% 300%',
        }}
      />

      {/* Layer 4: Glass noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Layer 7: Animated dotted grids */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Layer 8: Sparse Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/20 dark:bg-indigo-400/20"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 20,
            }}
          />
        ))}
      </div>

      {/* Layer 9: Very soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
