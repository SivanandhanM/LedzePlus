import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import { 
  ShoppingCart, TrendingUp, Receipt, Package, 
  BookOpen, Users, Building2, ShieldCheck, FileText 
} from 'lucide-react';

const modules = [
  { title: 'Purchase',        badge: 'PROCUREMENT', desc: 'Procurement, RFQ, and Vendor workflows.',          icon: <ShoppingCart className="w-6 h-6" />, path: '/purchase' },
  { title: 'Sales',           badge: 'REVENUE',     desc: 'CRM, Quotations, Orders, and Dispatch.',           icon: <TrendingUp    className="w-6 h-6" />, path: '/sales' },
  { title: 'Billing',         badge: 'INVOICING',   desc: 'Invoicing, Payments, and Customer Timelines.',     icon: <Receipt       className="w-6 h-6" />, path: '/billing' },
  { title: 'Inventory',       badge: 'WAREHOUSE',   desc: 'Warehouse, Logistics, and Master Data.',           icon: <Package       className="w-6 h-6" />, path: '/inventory' },
  { title: 'Accounting',      badge: 'FINANCE',     desc: 'General Ledger, Trial Balance, and P&L.',          icon: <BookOpen      className="w-6 h-6" />, path: '/accounting' },
  { title: 'Payroll',         badge: 'HR & PAYROLL',desc: 'HRMS, Attendance, Leave, and Salary.',             icon: <Users         className="w-6 h-6" />, path: '/payroll' },
  { title: 'Banking',         badge: 'CASH & BANK', desc: 'Receipts, Payments, and Bank Reconciliation.',    icon: <Building2     className="w-6 h-6" />, path: '/banking' },
  { title: 'Gate Management', badge: 'SECURITY',    desc: 'Security, Passes, and Vehicle Tracking.',          icon: <ShieldCheck   className="w-6 h-6" />, path: '/gate-management' },
  { title: 'GST',             badge: 'TAX & GST',   desc: 'Tax Returns, E-Invoice, and E-Way Bills.',         icon: <FileText      className="w-6 h-6" />, path: '/gst' },
];

export default function Home() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Welcome to LEDZE Plus ERP"
          subtitle="Enterprise Edition"
          description="A comprehensive suite of business management applications. Navigate through the modules below to explore the functional specifications and workflows."
          icon={<Package className="w-10 h-10" />}
        />
      </div>

      <Section title="Explore Modules" id="modules">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((mod, idx) => (
            <FeatureCard 
              key={idx} 
              title={mod.title} 
              description={mod.desc} 
              icon={mod.icon} 
              delay={idx * 0.08}
              path={mod.path}
              badge={mod.badge}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
