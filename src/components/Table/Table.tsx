import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  rows: (string | ReactNode)[][];
}

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Table({ headers, rows }: TableProps) {
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDesc, setSortDesc] = useState(false);

  const sortedRows = [...rows].sort((a, b) => {
    if (sortCol === null) return 0;
    const cellA = a[sortCol];
    const cellB = b[sortCol];
    if (typeof cellA === 'string' && typeof cellB === 'string') {
      return sortDesc ? cellB.localeCompare(cellA) : cellA.localeCompare(cellB);
    }
    return 0;
  });

  const handleSort = (index: number) => {
    if (sortCol === index) {
      setSortDesc(!sortDesc);
    } else {
      setSortCol(index);
      setSortDesc(false);
    }
  };

  return (
    <div className="my-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto rounded-[1.5rem] shadow-lg border border-white/80 dark:border-white/10"
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <table className="w-full text-left border-collapse">
          {/* Sticky glass header */}
          <thead className="sticky top-0 z-10">
            <tr
              className="border-b border-slate-200/60 dark:border-slate-800/60"
              style={{
                background: 'rgba(248,250,252,0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {headers.map((header, i) => (
                <th
                  key={i}
                  onClick={() => handleSort(i)}
                  className="py-4 px-6 font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider cursor-pointer select-none transition-colors duration-200 hover:text-primary"
                >
                  <div className="flex items-center gap-2 group">
                    <span className="group-hover:text-primary transition-colors">{header}</span>
                    <span className="opacity-40 group-hover:opacity-100 transition-opacity">
                      {sortCol === i ? (
                        sortDesc
                          ? <ChevronDown className="w-4 h-4 text-primary" />
                          : <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="relative divide-y divide-slate-100/60 dark:divide-slate-800/50">
            <AnimatePresence>
              {sortedRows.map((row, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  custom={rowIndex}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group relative transition-colors duration-150 hover:bg-primary/[0.04] dark:hover:bg-primary/10 cursor-default"
                >
                  {/* Left accent indicator on hover */}
                  <td className="relative py-4 px-6 text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    <motion.div
                      className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-full bg-primary"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      style={{ originY: 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                    {row[0]}
                  </td>
                  {row.slice(1).map((cell, cellIndex) => (
                    <td
                      key={cellIndex + 1}
                      className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors"
                    >
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
