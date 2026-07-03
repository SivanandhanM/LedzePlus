import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  rows: (string | ReactNode)[][];
}

export default function Table({ headers, rows }: TableProps) {
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDesc, setSortDesc] = useState(false);

  // Sort
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
        className="overflow-x-auto rounded-[1.5rem] glass-panel bg-white/60 dark:bg-slate-900/60 shadow-lg border border-white/80 dark:border-white/10"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
              {headers.map((header, i) => (
                <th 
                  key={i} 
                  onClick={() => handleSort(i)}
                  className="py-4 px-6 font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {header}
                    {sortCol === i && (
                      sortDesc ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronUp className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white/40 dark:bg-slate-950/40 relative">
            <AnimatePresence>
              {sortedRows.map((row, rowIndex) => (
                <motion.tr 
                  key={rowIndex} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-slate-100/50 dark:border-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors last:border-0 group"
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
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
