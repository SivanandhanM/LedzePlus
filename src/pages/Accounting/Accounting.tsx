import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import { BookOpen, FileText, BarChart, DollarSign, Target, AlignLeft, Calendar, ShieldAlert } from 'lucide-react';
import accountingImg from '../../assets/images/accounting.jpeg';

const workflowSteps = [
  { title: 'Journal Entry', description: 'Business Transaction → Journal Entry Creation' },
  { title: 'Approval', description: 'Multi-level approval process' },
  { title: 'Ledger', description: 'Ledger Posting' },
  { title: 'Reports', description: 'Financial Reports Generation' },
  { title: 'Closing', description: 'Period End Closing' }
];

const featureCards = [
  { title: 'Day Book & Journal', desc: 'Displays a chronological ledger of all vouchers and journal entries posted for a selected period, ensuring every transaction is properly documented and traceable.', icon: <Calendar /> },
  { title: 'General Ledger', desc: 'Provides comprehensive account-wise transaction histories, allowing finance teams to drill down into the specifics of debits, credits, and running balances.', icon: <BookOpen /> },
  { title: 'Trial Balance', desc: 'Automatically aggregates debit and credit balances across all active accounts to ensure the fundamental accounting equation remains perfectly balanced.', icon: <AlignLeft /> },
  { title: 'Profit & Loss (P&L)', desc: 'Generates real-time income statements detailing revenues, Cost of Goods Sold (COGS), operating expenses, and net profit margins over specific periods.', icon: <Target /> },
  { title: 'Balance Sheet', desc: 'Presents the exact financial position of the enterprise at any given moment, categorizing assets, liabilities, and shareholder equity with complete accuracy.', icon: <BarChart /> },
  { title: 'Cash Flow Analysis', desc: 'Monitors the liquidity of the business by tracking cash inflows from operations and outflows from investments or financing activities.', icon: <DollarSign /> },
  { title: 'Statutory Reports', desc: 'Produce comprehensive, audit-ready financial reports that comply with local taxation standards, ready for immediate export to regulatory bodies.', icon: <FileText /> }
];

const validations = [
  'Account must be active.',
  'Financial period must be open.',
  'Backdated entries require Level-3 approval.',
  'Debit amount must equal Credit amount.',
  'Posting is not allowed in hard-closed periods.'
];

export default function Accounting() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Accounting Module"
          subtitle="Financial Management"
          description="The central financial management system of the ERP. It records, processes, and reports all financial transactions across all modules."
          icon={<BookOpen className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Period Closing Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Workflow Diagram">
        <ImageCard src={accountingImg} alt="Accounting Workflow" caption="Accounting Process Workflow" />
      </Section>

      {/* 3. Features + Validations */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Section title="Financial Reports & Features">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featureCards.map((feat, idx) => (
                <FeatureCard key={idx} title={feat.title} description={feat.desc} icon={feat.icon} delay={idx * 0.1} />
              ))}
            </div>
          </Section>
        </div>

        <div className="xl:col-span-1">
          <Section title="System Validations">
            <div className="space-y-4">
              {validations.map((rule, idx) => (
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
