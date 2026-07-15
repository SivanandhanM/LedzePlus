import { memo } from 'react';

const GlobalBackground = memo(function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#FAFAFC] dark:bg-[#09090B] contain-paint">
      {/* Layer 1: Soft Mesh Gradient (Static, No Blur Filter) */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          background: `
            radial-gradient(circle at 15% 50%, rgba(224, 231, 255, 0.8), transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(238, 242, 255, 0.8), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(243, 232, 255, 0.8), transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(224, 242, 254, 0.8), transparent 50%),
            radial-gradient(circle at 20% 20%, rgba(250, 232, 255, 0.8), transparent 50%)
          `
        }}
      />
      
      {/* Layer 2: Large radial lights (Static, No Blur Filter) */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.35]"
        style={{
          background: 'radial-gradient(circle, rgba(199, 210, 254, 0.9) 0%, transparent 70%)'
        }}
      />
      
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.25]"
        style={{
          background: 'radial-gradient(circle, rgba(165, 243, 252, 0.9) 0%, transparent 70%)'
        }}
      />

      {/* Layer 3: Aurora Gradient (Static, No Overlay Blend Mode) */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)',
          backgroundSize: '150% 150%',
          backgroundPosition: '50% 50%'
        }}
      />

      {/* Layer 4: Glass noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Layer 5: Dotted grids */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Layer 6: Static Particles (instead of animating ones to save 60FPS overhead) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-500/20 dark:bg-indigo-400/20"
            style={{
              width: `${(i % 3) * 2 + 3}px`,
              height: `${(i % 3) * 2 + 3}px`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Layer 7: Very soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
});

export default GlobalBackground;
