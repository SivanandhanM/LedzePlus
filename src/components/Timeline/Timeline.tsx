import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface TimelineStep {
  title: string;
  description?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
  return (
    <div className="py-12 overflow-x-auto custom-scrollbar pb-6">
      <div className="flex items-center min-w-max px-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group w-64 glass-panel bg-white/60 dark:bg-slate-900/60 p-5 rounded-2xl border border-white/80 dark:border-white/10 shadow-lg hover:shadow-primary/10 transition-all cursor-pointer"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-skyblue text-white flex items-center justify-center font-bold text-sm shadow-md">
                {index + 1}
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mt-1 mb-2 group-hover:text-primary transition-colors">
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
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                className="w-16 h-1 mx-2 bg-gradient-to-r from-primary/30 to-skyblue/30 rounded-full flex items-center justify-center relative overflow-visible"
              >
                <ChevronRight className="absolute text-primary/50 w-5 h-5" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
