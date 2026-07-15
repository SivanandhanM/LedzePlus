import type { ReactNode } from 'react';
import { memo } from 'react';
import { m } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionProps {
  title: string;
  subtitle?: string;
  centerHeader?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const Section = memo(function Section({
  title,
  subtitle,
  centerHeader = false,
  children,
  className,
  id,
}: SectionProps) {
  return (
    <m.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('mb-8', className)}
    >
      {/* Section header */}
      {centerHeader ? (
        <m.div variants={titleVariants} className="flex flex-col items-center text-center gap-4 mb-8 md:mb-10">
          <h2 className="ledze-heading text-[30px] md:text-[36px] lg:text-[48px]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[18px] md:text-[20px] font-medium leading-[1.8] text-slate-500 dark:text-slate-400 max-w-[900px]">
              {subtitle}
            </p>
          )}
        </m.div>
      ) : (
        <m.div variants={titleVariants} className="flex items-center gap-4 mb-8">
          <h2 className="ledze-heading text-[30px] md:text-[36px] lg:text-[48px]">
            {title}
          </h2>
          <m.div
            className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 mt-2"
            variants={{
              hidden: { scaleX: 0, originX: 0 },
              visible: { scaleX: 1, originX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
            }}
          />
        </m.div>
      )}

      {/* Children revealed with stagger */}
      <m.div variants={contentVariants}>
        {children}
      </m.div>
    </m.section>
  );
});

export default Section;
