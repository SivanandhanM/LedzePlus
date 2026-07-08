import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface TimelineStep {
  title: string;
  description?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.92, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const connectorVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
  },
};

export default function Timeline({ steps }: TimelineProps) {
  return (
    <div className="py-12 overflow-x-auto pb-6">
      <motion.div
        className="flex items-center min-w-max px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <motion.div
              variants={stepVariants}
              whileHover={{ y: -6, scale: 1.04, boxShadow: '0 20px 40px rgba(79,70,229,0.18)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative group w-64 glass-panel bg-white/60 dark:bg-slate-900/60 p-5 rounded-2xl border border-white/80 dark:border-white/10 shadow-lg cursor-pointer will-change-transform"
            >
              {/* Step Number — pulses on enter */}
              <motion.div
                className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-skyblue text-white flex items-center justify-center font-bold text-sm shadow-md"
                animate={{ boxShadow: ['0 0 0px rgba(79,70,229,0)', '0 0 14px rgba(79,70,229,0.55)', '0 0 0px rgba(79,70,229,0)'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
              >
                {index + 1}
              </motion.div>

              {/* Hover accent line */}
              <motion.div
                className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                style={{ background: 'linear-gradient(90deg, #4F46E5, #38BDF8)' }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />

              <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-1 mb-2 group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h4>
              {step.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {step.description}
                </p>
              )}
            </motion.div>

            {index < steps.length - 1 && (
              <motion.div
                variants={connectorVariants}
                style={{ originX: 0 }}
                className="w-16 h-1 mx-2 bg-gradient-to-r from-primary/40 to-skyblue/40 rounded-full flex items-center justify-center relative overflow-visible"
              >
                <motion.div
                  animate={{ x: ['-50%', '50%', '-50%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute"
                >
                  <ChevronRight className="text-primary/60 w-5 h-5" />
                </motion.div>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
