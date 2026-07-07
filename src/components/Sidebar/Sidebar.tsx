import { Link, useLocation } from 'react-router-dom';
import {
  Home, ShoppingCart, TrendingUp, Receipt,
  Package, BookOpen, Users, Building2,
  ShieldCheck, FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const menuItems = [
  { title: 'Home', path: '/', icon: Home },
  { title: 'Purchase', path: '/purchase', icon: ShoppingCart },
  { title: 'Sales', path: '/sales', icon: TrendingUp },
  { title: 'Billing', path: '/billing', icon: Receipt },
  { title: 'Inventory', path: '/inventory', icon: Package },
  { title: 'Accounting', path: '/accounting', icon: BookOpen },
  { title: 'Payroll', path: '/payroll', icon: Users },
  { title: 'Banking', path: '/banking', icon: Building2 },
  { title: 'Gate Management', path: '/gate-management', icon: ShieldCheck },
  { title: 'GST', path: '/gst', icon: FileText },
];

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 glass-panel m-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-lg overflow-hidden sticky top-24 h-[calc(100vh-8rem)]">
      <div className="flex-1 py-6 px-4 overflow-y-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3"
        >
          Modules
        </motion.div>

        <motion.nav
          className="space-y-1.5"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={cn(
                    'relative flex items-center gap-3 px-3 py-2.5 rounded-xl group font-medium select-none',
                    isActive
                      ? 'text-primary dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  {/* Animated active background */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-bg"
                      className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover background for inactive items */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 z-0 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.18 }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-3 w-full">
                    {/* Icon with bounce on active */}
                    <motion.span
                      animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className={cn(
                        'transition-colors duration-200',
                        isActive ? 'text-primary dark:text-skyblue' : 'group-hover:text-primary dark:group-hover:text-skyblue'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.span>

                    <span className="flex-1">{item.title}</span>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
      </div>

      {/* Footer badge */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/50 relative z-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-gradient-to-r from-primary/10 to-skyblue/10 dark:from-primary/20 dark:to-skyblue/20 p-4 rounded-2xl border border-primary/20 cursor-default"
        >
          <p className="text-xs font-bold text-primary dark:text-skyblue mb-1">LEDZE Plus v2.0</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Enterprise Edition</p>
          <motion.div
            className="mt-2 h-1 rounded-full bg-gradient-to-r from-primary to-skyblue"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>
      </div>
    </aside>
  );
}
