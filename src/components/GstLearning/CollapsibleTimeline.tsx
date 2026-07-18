import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CalendarDays } from 'lucide-react';
import type { TimelineEvent } from '../../data/gstLearningData';

interface CollapsibleTimelineProps {
  timeline: TimelineEvent[];
  themeColor: string;
}

const themeColors: Record<string, string> = {
  blue: 'bg-blue-500/20 text-blue-400',
  green: 'bg-emerald-500/20 text-emerald-400',
  orange: 'bg-orange-500/20 text-orange-400',
  purple: 'bg-purple-500/20 text-purple-400',
  teal: 'bg-teal-500/20 text-teal-400',
  indigo: 'bg-indigo-500/20 text-indigo-400',
  rose: 'bg-rose-500/20 text-rose-400',
  amber: 'bg-amber-500/20 text-amber-400',
};

const borderColors: Record<string, string> = {
  blue: 'border-blue-500',
  green: 'border-emerald-500',
  orange: 'border-orange-500',
  purple: 'border-purple-500',
  teal: 'border-teal-500',
  indigo: 'border-indigo-500',
  rose: 'border-rose-500',
  amber: 'border-amber-500',
};

const CollapsibleTimeline: React.FC<CollapsibleTimelineProps> = ({ timeline, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorClass = themeColors[themeColor] || themeColors['blue'];
  const borderClass = borderColors[themeColor] || borderColors['blue'];

  return (
    <div className="w-full max-w-2xl mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/20 hover:bg-white/10 transition-colors`}
      >
        <div className="flex items-center gap-3">
          <CalendarDays className="text-zinc-500 dark:text-zinc-400" />
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Filing Timeline</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="text-zinc-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            style={{ willChange: 'height, transform, opacity' }}
          >
            <div className="pt-6 pb-2 px-4 ml-6 border-l-2 border-zinc-200 dark:border-zinc-800 relative space-y-6">
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-6"
                >
                  <span className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 bg-white dark:bg-zinc-900 ${borderClass}`} />
                  <div className="flex flex-col">
                    <span className={`text-xs font-bold uppercase tracking-wider mb-1 px-2 py-1 rounded-md inline-block w-fit ${colorClass}`}>
                      {event.day}
                    </span>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {event.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleTimeline;
