import { m } from 'framer-motion';

export default function AnimatedHeadline() {
  const headingLines = ["Run it all", "right here."];

  return (
    <div className="flex flex-col items-center justify-center text-center z-10 w-full max-w-[640px] mx-auto px-4 lg:px-8">
      <m.h1
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="ledze-heading text-[42px] md:text-[56px] lg:text-[72px] mb-6"
      >
        {headingLines[0]}
        <br />
        {headingLines[1]}
      </m.h1>

      <m.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-[18px] md:text-[20px] font-medium text-slate-600 dark:text-slate-300 mb-0"
      >
        One intelligent platform. Infinite possibilities.
      </m.p>
    </div>
  );
}
