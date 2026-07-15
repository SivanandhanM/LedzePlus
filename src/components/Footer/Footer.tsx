import { memo } from 'react';
import { m } from 'framer-motion';

const Footer = memo(function Footer() {
  return (
    <m.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 py-10 border-t border-slate-200/60 dark:border-slate-800 text-center"
    >
      {/* Divider glow */}
      <div className="w-24 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        © {new Date().getFullYear()} LEDZE Plus ERP. All rights reserved.
      </p>

      <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
        Powered by{' '}
        <m.a
          href="https://www.navanalatech.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block font-bold text-primary dark:text-skyblue"
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        >
          NAVANALA TECHNOLOGIES PRIVATE LIMITED
          {/* Animated underline */}
          <m.span
            className="absolute left-0 -bottom-0.5 h-[1.5px] bg-primary dark:bg-skyblue rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </m.a>
      </p>

      {/* Subtle badge */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-[11px] font-bold text-primary/70 uppercase tracking-widest"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
        Enterprise ERP Documentation
      </m.div>
    </m.footer>
  );
});

export default Footer;
