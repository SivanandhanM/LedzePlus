import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import Table from '../../components/Table/Table';
import GlassCard from '../../components/GlassCard/GlassCard';
import { Receipt, LayoutDashboard, Clock, AlertOctagon, BarChart3, ShieldAlert, ListChecks } from 'lucide-react';
import billingImg from '../../assets/images/billing.webp';

const workflowSteps = [
  { title: 'Dispatch Validation', description: 'System verifies dispatch note for billing eligibility.' },
  { title: 'Invoice Generation', description: 'Proforma or Tax Invoice generated automatically.' },
  { title: 'E-Way Bill & E-Invoice', description: 'Government portal integration for tax compliance.' },
  { title: 'Customer Delivery', description: 'Automated email dispatch of invoice to the customer.' },
  { title: 'Receivables Tracking', description: 'System monitors due dates and sends automated reminders.' },
  { title: 'Payment Collection', description: 'Payment recorded, reconciled, and ledger updated.' }
];

const features = [
  { title: 'Automated Invoice Generation', desc: 'Seamlessly convert sales orders or dispatch notes into tax-compliant invoices without manual data entry.', icon: <Receipt /> },
  { title: 'Collections & Receivables', desc: 'Monitor Accounts Receivable in real-time with aging reports and automate the dunning process for overdue payments.', icon: <LayoutDashboard /> },
  { title: 'Credit & Debit Notes', desc: 'Instantly generate and track credit/debit notes for returns, rate differences, or short shipments linked to the original invoice.', icon: <AlertOctagon /> },
  { title: 'Customer Outstanding', desc: 'A unified chronological view of customer financial health, linking all open invoices, received payments, and pending dues.', icon: <Clock /> },
  { title: 'Revenue Analytics', desc: 'Deep dive metrics identifying top revenue-generating customers, regional performance, and product-specific profitability trends.', icon: <BarChart3 /> },
  { title: 'Fraud Detection & Anomalies', desc: 'AI-driven algorithms that continuously scan for abnormal billing activities or duplicate invoice generation.', icon: <ShieldAlert /> }
];

const capabilities = [
  'End-to-End Billing Lifecycle Management',
  'Automated Collections and Dunning Workflows',
  'Dynamic Credit Note and Debit Note Processing',
  'Real-time Customer Outstanding & Aging Analysis',
  'Automated Payment Reminders (Email & SMS)',
  'Multi-currency Invoicing and Exchange Rate Handling',
  'Advanced Revenue Analytics & Profitability Dashboards',
  'Strict Segregation of Duties for Invoice Approvals'
];

const integrationsAndBenefits = [
  ['Sales Integration', 'Directly converts Dispatch Notes into Sales Invoices.'],
  ['Accounting & Finance', 'Automated posting to Accounts Receivable and General Ledger.'],
  ['GST & Tax Integration', 'One-click E-Invoice and E-Way bill generation.'],
  ['Faster Processing', 'Accelerates the cash conversion cycle through automation.'],
  ['Better Compliance', 'Ensures 100% tax and regulatory compliance on all invoices.'],
  ['Complete Traceability', 'Audit-ready financial logs for every billing transaction.'],
  ['Real-time Reporting', 'Instant visibility into cash flow and pending collections.']
];

export default function Billing() {
  const contentRef = useScrollToContent();

  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="LEDZE+ Billing"
          subtitle="Enterprise Invoicing & Receivables"
          description="The Billing Management module is the financial engine that drives the cash conversion cycle. Designed to handle high-volume transactions with absolute precision, this module exists to automate the entire invoicing process, track receivables, and ensure regulatory tax compliance. It delivers immense enterprise value by accelerating cash flows, reducing manual reconciliation errors, and providing executives with real-time revenue analytics and customer outstanding reports."
          icon={<Receipt className="w-10 h-10" />}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>


      {/* 1. Workflow */}
      <Section title="Billing Lifecycle Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Billing Architecture">
        <ImageCard src={billingImg} alt="Billing Workflow Diagram" caption="Comprehensive Billing and Collections Workflow" />
      </Section>

      {/* 3. Features + Capabilities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
        <div className="xl:col-span-2">
          <Section title="Key Functionalities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <FeatureCard 
                  key={idx} 
                  title={feat.title} 
                  description={feat.desc} 
                  icon={feat.icon} 
                  delay={idx * 0.1} 
                />
              ))}
            </div>
          </Section>
        </div>

        <div className="xl:col-span-1">
          <Section title="Core Capabilities">
            <div className="space-y-4">
              {capabilities.map((rule, idx) => (
                <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5 border-blue-500/30">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <ListChecks className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{rule}</span>
                </GlassCard>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <Section title="Module Integrations & Business Benefits">
        <Table headers={['Integration / Benefit', 'Description']} rows={integrationsAndBenefits} />
      </Section>
    </div>
  );
}
