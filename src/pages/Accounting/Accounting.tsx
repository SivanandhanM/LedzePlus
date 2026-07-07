import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import { BookOpen, FileText, BarChart, DollarSign, Target, AlignLeft, Calendar, ShieldAlert } from 'lucide-react';
import accountingImg from '../../assets/images/accounting.jpeg';

const workflowSteps = [
  { title: 'Sub-ledger Posting', description: 'Automated entries from Sales, Purchase, and Payroll modules.' },
  { title: 'Journal Entry', description: 'Manual adjustments and accruals posted to the General Ledger.' },
  { title: 'Trial Balance', description: 'Generation of pre-close Trial Balance to ensure debits equal credits.' },
  { title: 'Reconciliation', description: 'Bank, Inventory, and Inter-company accounts reconciled.' },
  { title: 'Financial Reports', description: 'P&L, Balance Sheet, and Cash Flow statements finalized.' },
  { title: 'Period Closing', description: 'Accounting period hard-closed to prevent further postings.' }
];

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
  'Seamless integration with Inventory (COGS) and HRMS (Payroll processing).',
  'Elimination of manual reconciliation errors through automated ledger matching.',
  'Instant visibility into enterprise financial health for better decision making.',
  'Automated generation of statutory tax reports and GST summaries.'
];

export default function Accounting() {
  const contentRef = useScrollToContent();

  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Accounting & Finance Module"
          subtitle="Enterprise Financial Management"
          description="The Accounting & Finance module is the central nervous system of the ERP, designed to securely record, process, and report all financial transactions across the enterprise. It delivers immense business value by automating ledger entries, enforcing strict period-closing validations, and providing real-time visibility into the company's financial health. Integrated seamlessly with Sales, Purchase, and Payroll, this module ensures absolute compliance, audit readiness, and accurate financial reporting at all times."
          icon={<BookOpen className="w-10 h-10" />}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>


      {/* 1. Workflow */}
      <Section title="Financial Closing Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Accounting Architecture">
        <ImageCard src={accountingImg} alt="Accounting Workflow" caption="Comprehensive Accounting Process Workflow" />
      </Section>

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
