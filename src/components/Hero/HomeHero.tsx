import { motion } from 'framer-motion';

import AnimatedHeadline from './AnimatedHeadline';
import HeroModuleCard from './HeroModuleCard';
import {
  ShoppingCart, TrendingUp, Receipt, Package,
  BookOpen, Users, Building2, ShieldCheck, FileText,
  Layers, Zap,
} from 'lucide-react';

const topModules = [
  { id: 'inventory', title: 'INVENTORY', desc: 'Warehouse & Stock', icon: <Package className="w-6 h-6" />, colorVar: '--color-mod-inventory', path: '/inventory' },
  { id: 'purchase', title: 'PURCHASE', desc: 'Orders & Vendors', icon: <ShoppingCart className="w-6 h-6" />, colorVar: '--color-mod-purchase', path: '/purchase' },
  { id: 'sales', title: 'SALES', desc: 'CRM & Fulfillment', icon: <TrendingUp className="w-6 h-6" />, colorVar: '--color-mod-sales', path: '/sales' },
  { id: 'gst', title: 'GST', desc: 'E-Way Bill & Taxes', icon: <FileText className="w-6 h-6" />, colorVar: '--color-mod-gst', path: '/gst' },
  { id: 'gate', title: 'GATE MGT', desc: 'Security & Passes', icon: <ShieldCheck className="w-6 h-6" />, colorVar: '--color-mod-gate', path: '/gate-management' },
];

const bottomModules = [
  { id: 'accounting', title: 'ACCOUNTING', desc: 'Ledger & Finance', icon: <BookOpen className="w-6 h-6" />, colorVar: '--color-mod-accounting', path: '/accounting' },
  { id: 'banking', title: 'BANKING', desc: 'Cash & Reconcile', icon: <Building2 className="w-6 h-6" />, colorVar: '--color-mod-banking', path: '/banking' },
  { id: 'billing', title: 'BILLING', desc: 'Invoices & Payments', icon: <Receipt className="w-6 h-6" />, colorVar: '--color-mod-billing', path: '/billing' },
  { id: 'payroll', title: 'PAYROLL', desc: 'HRMS & Salary', icon: <Users className="w-6 h-6" />, colorVar: '--color-mod-payroll', path: '/payroll' },
];

export default function Hero() {
  return (
    <div className="relative w-[100vw] left-[calc(-50vw+50%)] flex flex-col items-center overflow-hidden pt-4 pb-6 lg:pt-6">

      {/* Structured Layout Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[1500px] px-8">

        {/* Top Row of Modules */}
        <div className="flex flex-wrap justify-center gap-4 mb-4 lg:mb-6">
          {topModules.map((mod, i) => (
            <HeroModuleCard
              key={mod.id}
              title={mod.title}
              desc={mod.desc}
              icon={mod.icon}
              colorVar={mod.colorVar}
              path={mod.path}
              delay={i * 0.07}
            />
          ))}
        </div>

        {/* Responsive 3-Column Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center w-full gap-6 lg:gap-8 my-4 relative">

          {/* Left Column: About */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-[320px] shrink-0 p-6 rounded-[24px] bg-white/45 dark:bg-slate-900/30 backdrop-blur-xl border border-white/30 dark:border-white/5 shadow-[0_12px_40px_rgba(31,38,135,0.04)] hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                 <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-[18px] font-semibold text-slate-800 dark:text-slate-200">About LEDZE+ ERP</h3>
            </div>
            <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500 to-transparent mb-5" />
            <p className="text-[14px] leading-[1.8] text-slate-500 dark:text-slate-400 mb-0 font-medium">
              A unified enterprise resource planning platform that seamlessly connects procurement, inventory, finance, HR, taxation, banking, and operations through one intelligent ecosystem designed for modern businesses.
            </p>
          </motion.div>

          {/* Center Column: Hero Headline */}
          <div className="order-1 lg:order-2 flex-1 flex justify-center w-full relative min-w-[300px]">

            {/* Left Divider (Desktop Only) */}
            <div
              className="hidden lg:block absolute left-0 top-0 bottom-0 w-px border-l border-dashed border-slate-300 dark:border-slate-700 opacity-60"
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
            />

            <div className="flex w-full">
              <AnimatedHeadline />
            </div>

            {/* Right Divider (Desktop Only) */}
            <div
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-px border-l border-dashed border-slate-300 dark:border-slate-700 opacity-60"
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
            />

          </div>

          {/* Right Column: Why */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-3 lg:order-3 flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-[320px] shrink-0 p-6 rounded-[24px] bg-white/45 dark:bg-slate-900/30 backdrop-blur-xl border border-white/30 dark:border-white/5 shadow-[0_12px_40px_rgba(31,38,135,0.04)] hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                 <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-[18px] font-semibold text-slate-800 dark:text-slate-200">Why LEDZE+ ERP?</h3>
            </div>
            <div className="w-12 h-[2px] bg-gradient-to-r from-purple-500 to-transparent mb-5" />
            <p className="text-[14px] leading-[1.8] text-slate-500 dark:text-slate-400 mb-0 font-medium">
              Built for growing enterprises with intelligent automation, real-time analytics, enterprise-grade security, and scalable architecture that supports every stage of business growth.
            </p>
          </motion.div>

        </div>

        {/* Bottom Row of Modules */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 lg:mt-6">
          {bottomModules.map((mod, i) => (
            <HeroModuleCard
              key={mod.id}
              title={mod.title}
              desc={mod.desc}
              icon={mod.icon}
              colorVar={mod.colorVar}
              path={mod.path}
              delay={i * 0.07}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
