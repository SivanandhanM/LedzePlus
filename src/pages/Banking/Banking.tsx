import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import { Building2, CheckCircle2, Star, Landmark, ArrowLeftRight, RefreshCw, BookOpenCheck, Wallet } from 'lucide-react';
import bankingImg from '../../assets/images/banking.jpeg';

const workflowSteps = [
  { title: 'Customer Receipt', description: 'Incoming payment recording' },
  { title: 'Vendor Payment', description: 'Outgoing payment processing' },
  { title: 'Bank Transfer', description: 'Inter-bank or internal transfers' },
  { title: 'Bank Reconciliation', description: 'Matching book balance with bank statements' },
  { title: 'Cash Book', description: 'Daily cash transaction monitoring' }
];

const features = [
  { title: 'Customer Receipts', desc: 'Record and allocate incoming customer payments against specific open invoices, supporting partial payments and advance deposits.', icon: <Wallet /> },
  { title: 'Vendor Payments', desc: 'Process outgoing payments to vendors with full linkage to approved invoices and POs, supporting NEFT, RTGS, cheque, and cash modes.', icon: <Landmark /> },
  { title: 'Bank Transfers', desc: 'Manage inter-bank and inter-branch fund movements with full audit trails and multi-currency support.', icon: <ArrowLeftRight /> },
  { title: 'Bank Reconciliation', desc: 'Automated statement import and matching engine that reconciles book balances with bank statements, flagging unmatched transactions.', icon: <RefreshCw /> },
  { title: 'Cash Book', desc: 'Comprehensive daily cash monitoring covering petty cash, counter receipts, and cash disbursements with approval workflows.', icon: <BookOpenCheck /> }
];

const businessRules = [
  'All vendor payments must be linked to approved invoices.',
  'Bank reconciliation is mandatory at period end.',
  'Post-dated cheques require separate clearance workflows.',
  'Daily cash limits must not be exceeded without override.'
];

const benefits = [
  'Real-time visibility into cash flow and liquidity.',
  'Automated reconciliation saves time and reduces errors.',
  'Strict controls over outgoing payments and cash handling.',
  'Seamless integration with Accounts and Sales/Purchase modules.'
];

export default function Banking() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Banking Management"
          subtitle="Cash & Bank Operations"
          description="Streamlines all cash and bank transactions including receipts, payments, transfers, and automated reconciliations."
          icon={<Building2 className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Transaction Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Workflow Diagram">
        <ImageCard src={bankingImg} alt="Banking Workflow" caption="Banking and Cash Management Workflow" />
      </Section>

      {/* 3. Features */}
      <Section title="Core Features">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <FeatureCard key={idx} title={feat.title} description={feat.desc} icon={feat.icon} delay={idx * 0.1} />
          ))}
        </div>
      </Section>

      {/* 4. Business Rules + Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Business Rules">
          <div className="space-y-4">
            {businessRules.map((rule, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5 border-blue-500/30">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{rule}</span>
              </GlassCard>
            ))}
          </div>
        </Section>

        <Section title="Key Benefits">
          <div className="space-y-4">
            {benefits.map((benefit, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5 border-amber-500/30">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{benefit}</span>
              </GlassCard>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
