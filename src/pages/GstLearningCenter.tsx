import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gstLearningData } from '../data/gstLearningData';
import type { GstModuleData, GstCategory } from '../data/gstLearningData';
import GstGridCard from '../components/GstLearning/GstGridCard';
import GstModal from '../components/GstLearning/GstModal';
import { BookOpen, FileText, Receipt, Truck, ShieldCheck, Layers, Zap, Building2, Calculator, RefreshCw, Activity, ClipboardCheck, Users, Monitor, Briefcase, Shield, FileSearch } from 'lucide-react';

const GstLearningCenter: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<GstModuleData | null>(null);

  // Group data by category
  const categories: GstCategory[] = [
    'GST Returns',
    'Statements & Reconciliation',
    'GST Digital Services',
    'Compliance & ERP'
  ];

  const groupedData = categories.reduce((acc, category) => {
    acc[category] = gstLearningData.filter(item => item.category === category);
    return acc;
  }, {} as Record<GstCategory, GstModuleData[]>);

  return (
    <div style={{ '--color-primary': '234 88 12', '--color-primary-hex': '#EA580C' } as React.CSSProperties} className="min-h-screen relative font-sans selection:bg-orange-500/30">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16">
        {/* Header Section with Side Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[260px_1fr_260px] xl:grid-cols-[280px_1fr_280px] gap-6 lg:gap-8 xl:gap-12 mb-12 md:mb-16 items-start">
          
          {/* Left Panel: Key GST Topics */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="order-2 lg:order-1 w-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-5 shadow-sm"
          >
            <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4 px-2">Key GST Topics</h3>
            <ul className="space-y-1.5">
              {[
                { label: 'GST Returns', icon: FileText, theme: 'hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400', iconTheme: 'text-blue-500/60 group-hover:text-blue-500' },
                { label: 'E-Invoicing', icon: Receipt, theme: 'hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400', iconTheme: 'text-emerald-500/60 group-hover:text-emerald-500' },
                { label: 'E-Way Bill', icon: Truck, theme: 'hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400', iconTheme: 'text-indigo-500/60 group-hover:text-indigo-500' },
                { label: 'Input Tax Credit', icon: Calculator, theme: 'hover:bg-teal-500/10 group-hover:text-teal-600 dark:group-hover:text-teal-400', iconTheme: 'text-teal-500/60 group-hover:text-teal-500' },
                { label: 'Reconciliation', icon: RefreshCw, theme: 'hover:bg-orange-500/10 group-hover:text-orange-600 dark:group-hover:text-orange-400', iconTheme: 'text-orange-500/60 group-hover:text-orange-500' },
                { label: 'Compliance', icon: ShieldCheck, theme: 'hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400', iconTheme: 'text-amber-500/60 group-hover:text-amber-500' },
                { label: 'GST Health Check', icon: Activity, theme: 'hover:bg-rose-500/10 group-hover:text-rose-600 dark:group-hover:text-rose-400', iconTheme: 'text-rose-500/60 group-hover:text-rose-500' },
                { label: 'Audit Readiness', icon: ClipboardCheck, theme: 'hover:bg-purple-500/10 group-hover:text-purple-600 dark:group-hover:text-purple-400', iconTheme: 'text-purple-500/60 group-hover:text-purple-500' }
              ].map((item, i) => (
                <li key={i}>
                  <div className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-colors cursor-default ${item.theme.split(' ')[0]}`}>
                    <div className={`transition-colors ${item.iconTheme}`}>
                      <item.icon size={16} strokeWidth={2} />
                    </div>
                    <span className={`text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors ${item.theme.split(' ').slice(1).join(' ')}`}>{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Center Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1 md:col-span-2 lg:col-span-1 lg:order-2 text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold text-sm mb-6 border border-orange-500/20">
              <BookOpen size={16} />
              Interactive Learning Experience
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6 leading-tight">
              GST Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">Center</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Click any module below to launch an immersive, animated learning experience exploring workflows, rules, and logic.
            </p>
          </motion.div>

          {/* Right Panel: Who Should Learn? */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="order-3 lg:order-3 w-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-5 shadow-sm"
          >
            <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4 px-2">Who Should Learn?</h3>
            <ul className="space-y-1.5">
              {[
                { label: 'Accountants', icon: Calculator, desc: 'Master return filing', theme: 'hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400', iconTheme: 'text-blue-500/60 group-hover:text-blue-500' },
                { label: 'Finance Teams', icon: Users, desc: 'Optimize ITC claims', theme: 'hover:bg-teal-500/10 group-hover:text-teal-600 dark:group-hover:text-teal-400', iconTheme: 'text-teal-500/60 group-hover:text-teal-500' },
                { label: 'ERP Users', icon: Monitor, desc: 'Understand system workflows', theme: 'hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400', iconTheme: 'text-indigo-500/60 group-hover:text-indigo-500' },
                { label: 'Business Owners', icon: Briefcase, desc: 'Monitor compliance', theme: 'hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400', iconTheme: 'text-emerald-500/60 group-hover:text-emerald-500' },
                { label: 'Compliance Officers', icon: Shield, desc: 'Mitigate tax risks', theme: 'hover:bg-orange-500/10 group-hover:text-orange-600 dark:group-hover:text-orange-400', iconTheme: 'text-orange-500/60 group-hover:text-orange-500' },
                { label: 'Tax Consultants', icon: FileSearch, desc: 'Resolve complex notices', theme: 'hover:bg-purple-500/10 group-hover:text-purple-600 dark:group-hover:text-purple-400', iconTheme: 'text-purple-500/60 group-hover:text-purple-500' }
              ].map((item, i) => (
                <li key={i}>
                  <div className={`group flex items-start gap-3 px-3 py-2 rounded-xl transition-colors cursor-default ${item.theme.split(' ')[0]}`}>
                    <div className={`mt-0.5 transition-colors ${item.iconTheme}`}>
                      <item.icon size={16} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors ${item.theme.split(' ').slice(1).join(' ')}`}>{item.label}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-500">{item.desc}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Why GST Learning Center Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Why Learn GST Through LEDZE+?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              LEDZE+ transforms complex GST regulations into structured, interactive learning experiences designed for finance teams, accountants, ERP users, compliance officers, and business owners. Learn not only what each GST process does, but how it integrates into real-world enterprise workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: 'GST Returns',
                description: 'Explore every major GST return including GSTR-1, GSTR-3B, GSTR-9, GSTR-9C, and more through guided workflows, filing logic, timelines, and business scenarios.',
                icon: FileText,
                gradient: 'bg-gradient-to-br from-blue-50/80 to-white/60 dark:from-blue-900/20 dark:to-zinc-900/40 hover:from-blue-100/80 dark:hover:from-blue-900/30',
                border: 'border-blue-200/50 dark:border-blue-800/50',
                shadow: 'shadow-blue-500/5',
                hoverShadow: 'hover:shadow-blue-500/20',
                iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
              },
              {
                title: 'E-Invoicing',
                description: 'Understand IRN generation, QR code validation, invoice lifecycle, ERP integration, and mandatory compliance requirements.',
                icon: Receipt,
                gradient: 'bg-gradient-to-br from-emerald-50/80 to-white/60 dark:from-emerald-900/20 dark:to-zinc-900/40 hover:from-emerald-100/80 dark:hover:from-emerald-900/30',
                border: 'border-emerald-200/50 dark:border-emerald-800/50',
                shadow: 'shadow-emerald-500/5',
                hoverShadow: 'hover:shadow-emerald-500/20',
                iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
              },
              {
                title: 'E-Way Bill',
                description: 'Learn goods movement workflows, transporter responsibilities, document generation, logistics validation, and compliance checkpoints.',
                icon: Truck,
                gradient: 'bg-gradient-to-br from-indigo-50/80 to-white/60 dark:from-indigo-900/20 dark:to-zinc-900/40 hover:from-indigo-100/80 dark:hover:from-indigo-900/30',
                border: 'border-indigo-200/50 dark:border-indigo-800/50',
                shadow: 'shadow-indigo-500/5',
                hoverShadow: 'hover:shadow-indigo-500/20',
                iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
              },
              {
                title: 'Compliance & Reconciliation',
                description: 'Master GST reconciliation, input tax credit validation, health checks, audit preparation, notices, and compliance monitoring.',
                icon: ShieldCheck,
                gradient: 'bg-gradient-to-br from-orange-50/80 to-white/60 dark:from-orange-900/20 dark:to-zinc-900/40 hover:from-orange-100/80 dark:hover:from-orange-900/30',
                border: 'border-orange-200/50 dark:border-orange-800/50',
                shadow: 'shadow-orange-500/5',
                hoverShadow: 'hover:shadow-orange-500/20',
                iconBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`p-6 rounded-2xl backdrop-blur-md border ${feature.border} ${feature.gradient} ${feature.shadow} ${feature.hoverShadow} transition-all duration-[300ms] group flex flex-col`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 border ${feature.iconBg} group-hover:shadow-lg`}>
                  <feature.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{feature.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Highlight Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-16 p-8 rounded-[28px] bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm border border-zinc-200/40 dark:border-zinc-800/40 shadow-sm">
            {[
              { num: '20+', label: 'Learning Modules', icon: Layers, accent: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { num: 'Interactive', label: 'Workflow Simulations', icon: Zap, accent: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
              { num: 'Real', label: 'ERP Business Scenarios', icon: Building2, accent: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
              { num: 'Compliance-Driven', label: 'Learning Experience', icon: ShieldCheck, accent: 'text-amber-600 dark:text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' }
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-4 group"
              >
                <div className={`p-3 rounded-xl border transition-all duration-300 group-hover:scale-110 ${metric.bg} ${metric.accent}`}>
                  <metric.icon size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{metric.num}</span>
                  <span className={`text-xs font-semibold uppercase tracking-wider transition-colors ${metric.accent}`}>{metric.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories and Grid */}
        <div className="space-y-16">
          {categories.map((category) => {
            const items = groupedData[category];
            if (items.length === 0) return null;

            return (
              <div key={category} className="space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`text-2xl font-bold text-center border-b pb-3
                    ${category === 'GST Returns' ? 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' : ''}
                    ${category === 'Statements & Reconciliation' ? 'text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800' : ''}
                    ${category === 'GST Digital Services' ? 'text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800' : ''}
                    ${category === 'Compliance & ERP' ? 'text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800' : ''}
                  `}
                >
                  {category}
                </motion.h2>
                
                <div className="grid gap-6 justify-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                  {items.map((data) => (
                    <React.Fragment key={data.id}>
                      {selectedModule?.id !== data.id ? (
                        <GstGridCard 
                          data={data} 
                          onClick={() => setSelectedModule(data)} 
                        />
                      ) : (
                        <div className="w-full h-full min-h-[220px]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Full Screen Immersive Modal */}
      <AnimatePresence>
        {selectedModule && (
          <GstModal 
            data={selectedModule} 
            onClose={() => setSelectedModule(null)}
            onNavigate={(id) => {
              const module = gstLearningData.find(m => m.id.toLowerCase() === id.toLowerCase() || m.title.toLowerCase() === id.toLowerCase());
              if (module) setSelectedModule(module);
            }} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default GstLearningCenter;
