import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import Table from '../../components/Table/Table';
import GlassCard from '../../components/GlassCard/GlassCard';
import AnimatedWorkflowPreview from '../../components/WorkflowPreview/AnimatedWorkflowPreview';
import ModuleWorkflowSection from '../../components/ModuleWorkflowSection/ModuleWorkflowSection';
import { billingWorkflow, billingWorkflowConfig } from '../../workflows/billingWorkflow';
import { Receipt, Clock, LayoutDashboard, AlertOctagon, BarChart3, ShieldAlert, ListChecks } from 'lucide-react';



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
          description="The Billing & Invoicing module acts as the financial culmination of the sales process, ensuring accurate revenue realization and absolute tax compliance. Built to handle complex enterprise pricing structures, it seamlessly generates proforma and tax invoices while integrating directly with government portals for E-Way Bills and E-Invoices. It significantly reduces Days Sales Outstanding (DSO) by automating payment follow-ups and providing real-time visibility into outstanding receivables."
          icon={<Receipt className="w-10 h-10" />}
          workflowPreview={<AnimatedWorkflowPreview workflow={billingWorkflow} accentColor="blue" />}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>

      {/* Interactive Workflow Section */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <ModuleWorkflowSection config={billingWorkflowConfig} />
      </div>

      

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
