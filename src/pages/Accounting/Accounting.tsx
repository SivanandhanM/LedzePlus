import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import AnimatedWorkflowPreview from '../../components/WorkflowPreview/AnimatedWorkflowPreview';
import ModuleWorkflowSection from '../../components/ModuleWorkflowSection/ModuleWorkflowSection';
import { accountingWorkflow, accountingWorkflowConfig } from '../../workflows/accountingWorkflow';
import { BookOpen, FileText, BarChart, DollarSign, Target, AlignLeft, Calendar, ShieldAlert } from 'lucide-react';



const featureCards = [
  { title: 'Day Book & Journal', desc: 'Displays a chronological ledger of all vouchers and manual journal entries, ensuring every financial transaction is documented, traceable, and audit-ready.', icon: <Calendar /> },
  { title: 'General Ledger', desc: 'Provides comprehensive account-wise transaction histories, allowing finance teams to drill down into the specifics of debits, credits, and running balances.', icon: <BookOpen /> },
  { title: 'Trial Balance', desc: 'Automatically aggregates debit and credit balances across all active accounts to ensure the fundamental accounting equation remains perfectly balanced at all times.', icon: <AlignLeft /> },
  { title: 'Profit & Loss (P&L)', desc: 'Generates real-time income statements detailing revenues, Cost of Goods Sold (COGS), operating expenses, and net profit margins across departments.', icon: <Target /> },
  { title: 'Balance Sheet', desc: 'Presents the exact financial position of the enterprise at any given moment, categorizing assets, liabilities, and shareholder equity with complete accuracy.', icon: <BarChart /> },
  { title: 'Cash Flow Analysis', desc: 'Monitors the liquidity of the business by tracking cash inflows from operations and outflows from investments or financing activities.', icon: <DollarSign /> },
  { title: 'Audit Trail & Approvals', desc: 'Maintains an immutable ledger of all financial postings and modifications, enforcing strict multi-level approvals for high-value journal entries.', icon: <FileText /> }
];

const capabilitiesAndBenefits = [
  'Real-time automated postings from all operational ERP sub-modules.',
  'Multi-currency and multi-company financial consolidation capabilities.',
  'Strict period closing rules preventing backdated entry manipulations.',
  'Comprehensive audit trail ensuring compliance with global accounting standards.',
  'Seamless integration with HRMS (Payroll processing).',
  'Elimination of manual reconciliation errors through automated ledger matching.',
  'Instant visibility into enterprise financial health for better decision making.',
  'Automated generation of statutory tax reports and GST summaries.'
];

export default function Accounting() {
  const contentRef = useScrollToContent();

  return (
    <div style={{ '--color-primary': '234 88 12', '--color-primary-hex': '#EA580C' } as React.CSSProperties} className="pb-12">
      <div className="py-8">
        <Hero 
          title="LEDZE+ Accounting"
          subtitle="Enterprise Financial Management"
          description="The Accounting Management module is the financial nucleus of the ERP, delivering real-time insights, rigid compliance, and seamless multi-module ledger integration. Designed to meet global enterprise standards, it automates journaling, enforces strict period closures, and provides an immaculate audit trail. It transforms raw transactional data into strategic financial intelligence, ensuring absolute precision in trial balances, P&L, and balance sheets."
          icon={<BookOpen className="w-10 h-10" />}
          workflowPreview={<AnimatedWorkflowPreview workflow={accountingWorkflow} accentColor="orange" />}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>

      {/* Interactive Workflow Section */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <ModuleWorkflowSection config={accountingWorkflowConfig} />
      </div>

      

      {/* 3. Features + Capabilities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Section title="Key Functionalities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featureCards.map((feat, idx) => (
                <FeatureCard key={idx} title={feat.title} description={feat.desc} icon={feat.icon} delay={idx * 0.1} />
              ))}
            </div>
          </Section>
        </div>

        <div className="xl:col-span-1">
          <Section title="Core Capabilities & Benefits">
            <div className="space-y-4">
              {capabilitiesAndBenefits.map((rule, idx) => (
                <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5 border-purple-500/30">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{rule}</span>
                </GlassCard>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
