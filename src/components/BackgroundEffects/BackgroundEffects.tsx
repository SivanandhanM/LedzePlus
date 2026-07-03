export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base grey background */}
      <div className="absolute inset-0 bg-slate-200/80 dark:bg-slate-900/90" />

      {/* Subtle noise/glass texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Soft grey blobs for depth */}
      <div className="absolute top-[-5%] left-[-5%] w-[40rem] h-[40rem] bg-slate-300/50 dark:bg-slate-700/30 rounded-full blur-[120px]" />
      <div className="absolute top-[30%] right-[-10%] w-[35rem] h-[35rem] bg-slate-400/30 dark:bg-slate-600/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[30rem] h-[30rem] bg-slate-300/40 dark:bg-slate-700/25 rounded-full blur-[100px]" />

      {/* Very faint blue/purple tint for glassy feel */}
      <div className="absolute top-[10%] left-[40%] w-80 h-80 bg-primary/5 dark:bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] right-[20%] w-64 h-64 bg-skyblue/5 dark:bg-skyblue/5 rounded-full blur-[80px]" />

      {/* Glass sheen at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}
