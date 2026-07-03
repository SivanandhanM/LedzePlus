import { Link, useLocation } from 'react-router-dom';
import { 
  Home, ShoppingCart, TrendingUp, Receipt, 
  Package, BookOpen, Users, Building2, 
  ShieldCheck, FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const menuItems = [
  { title: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
  { title: 'Purchase', path: '/purchase', icon: <ShoppingCart className="w-5 h-5" /> },
  { title: 'Sales', path: '/sales', icon: <TrendingUp className="w-5 h-5" /> },
  { title: 'Billing', path: '/billing', icon: <Receipt className="w-5 h-5" /> },
  { title: 'Inventory', path: '/inventory', icon: <Package className="w-5 h-5" /> },
  { title: 'Accounting', path: '/accounting', icon: <BookOpen className="w-5 h-5" /> },
  { title: 'Payroll', path: '/payroll', icon: <Users className="w-5 h-5" /> },
  { title: 'Banking', path: '/banking', icon: <Building2 className="w-5 h-5" /> },
  { title: 'Gate Management', path: '/gate-management', icon: <ShieldCheck className="w-5 h-5" /> },
  { title: 'GST', path: '/gst', icon: <FileText className="w-5 h-5" /> },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 glass-panel m-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-lg overflow-hidden sticky top-24 h-[calc(100vh-8rem)]">
      <div className="flex-1 py-6 px-4 overflow-y-auto custom-scrollbar relative z-10">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
          Modules
        </div>
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group font-medium",
                  isActive 
                    ? "text-primary dark:text-white" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <span className={cn(
                    "transition-colors duration-300",
                    isActive ? "text-primary dark:text-skyblue" : "group-hover:text-primary dark:group-hover:text-skyblue"
                  )}>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/50 relative z-10">
        <div className="bg-gradient-to-r from-primary/10 to-skyblue/10 dark:from-primary/20 dark:to-skyblue/20 p-4 rounded-2xl border border-primary/20">
          <p className="text-xs font-bold text-primary dark:text-skyblue mb-1">LEDZE Plus v2.0</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Enterprise Edition</p>
        </div>
      </div>
    </aside>
  );
}
