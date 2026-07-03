import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ title, children, className, id }: SectionProps) {
  return (
    <motion.section 
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-16", className)}
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 mt-2" />
      </div>
      {children}
    </motion.section>
  );
}
