import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Section({ title, children, className, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('mb-16', className)}
    >
      {/* Section header */}
      <motion.div variants={titleVariants} className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        <motion.div
          className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 mt-2"
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            visible: { scaleX: 1, originX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
          }}
        />
      </motion.div>

      {/* Children revealed with stagger */}
      <motion.div variants={contentVariants}>
        {children}
      </motion.div>
    </motion.section>
  );
}
