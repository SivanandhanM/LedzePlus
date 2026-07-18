import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomeHero from '../../components/Hero/HomeHero';
import Section from '../../components/Section/Section';
import LandingModuleCard from '../../components/LandingModuleCard/LandingModuleCard';
import ResourceCard from '../../components/ResourceCard/ResourceCard';
import {
  ShoppingCart, TrendingUp, Receipt, Package,
  BookOpen, Users, Building2, ShieldCheck, FileText, Lock, Book
} from 'lucide-react';

const modules = [
  { title: 'LEDZE+ Purchase', badge: 'PROCUREMENT', desc: 'Procurement, RFQ, and Vendor workflows.', icon: <ShoppingCart className="w-6 h-6" />, path: '/purchase' },
  { title: 'LEDZE+ Sales', badge: 'REVENUE', desc: 'CRM, Quotations, Orders, and Dispatch.', icon: <TrendingUp className="w-6 h-6" />, path: '/sales' },
  { title: 'LEDZE+ Billing', badge: 'INVOICING', desc: 'Invoicing, Payments, and Customer Timelines.', icon: <Receipt className="w-6 h-6" />, path: '/billing' },
  { title: 'LEDZE+ Inventory', badge: 'WAREHOUSE', desc: 'Warehouse, Logistics, and Master Data.', icon: <Package className="w-6 h-6" />, path: '/inventory' },
  { title: 'LEDZE+ Accounting', badge: 'FINANCE', desc: 'General Ledger, Trial Balance, and P&L.', icon: <BookOpen className="w-6 h-6" />, path: '/accounting' },
  { title: 'LEDZE+ Payroll', badge: 'HR & PAYROLL', desc: 'HRMS, Attendance, Leave, and Salary.', icon: <Users className="w-6 h-6" />, path: '/payroll' },
  { title: 'LEDZE+ Banking', badge: 'CASH & BANK', desc: 'Receipts, Payments, and Bank Reconciliation.', icon: <Building2 className="w-6 h-6" />, path: '/banking' },
  { title: 'LEDZE+ Gate Management', badge: 'SECURITY', desc: 'Security, Passes, and Vehicle Tracking.', icon: <ShieldCheck className="w-6 h-6" />, path: '/gate-management' },
  { title: 'LEDZE+ GST', badge: 'TAX & GST', desc: 'Tax Returns, E-Invoice, and E-Way Bills.', icon: <FileText className="w-6 h-6" />, path: '/gst' },
];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (location.state?.scrollTo) {
      if (location.state.scrollTo === 'top') {
        container?.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    } else {
      container?.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  return (
    <div className="pb-4">
      <HomeHero />

      <Section
        title="Explore Modules"
        subtitle="Explore a comprehensive suite of integrated ERP modules designed to streamline procurement, inventory, sales, finance, payroll, banking, taxation, and security. Manage every core business function through one intelligent enterprise platform that enhances productivity, ensures operational efficiency, and supports scalable business growth."
        centerHeader={true}
        id="modules"
        className="pt-8 pb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, idx) => (
            <LandingModuleCard
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

      <Section
        title="DPDP Act & GST Resource Center"
        subtitle="Everything you need to understand, implement, and comply with the Digital Personal Data Protection (DPDP) Act and Goods & Services Tax (GST)—from legal requirements and compliance checklists to practical implementation guidance."
        centerHeader={true}
        id="resources"
        className="mb-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1240px] mx-auto">
          <ResourceCard
            title="DPDP Act Compliance"
            description="Manage consent, data governance, privacy requests, and Digital Personal Data Protection Act compliance."
            badge="DATA PRIVACY"
            icon={<Lock className="w-6 h-6" />}
            path="/dpdp-compliance"
            accentColor="#4ADBD1"
            delay={0.1}
          />
          <ResourceCard
            title="GST Knowledge Center"
            description="Access GST rules, tax rates, HSN/SAC codes, e-Way Bills, and statutory compliance resources."
            badge="INDIRECT TAX"
            icon={<Book className="w-6 h-6" />}
            path="/gst-learning"
            accentColor="#F5BE83"
            delay={0.2}
          />
        </div>
      </Section>
    </div>
  );
}
