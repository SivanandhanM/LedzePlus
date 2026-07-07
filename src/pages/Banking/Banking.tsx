import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import { Building2, CheckCircle2, Star, Landmark, ArrowLeftRight, RefreshCw, BookOpenCheck, Wallet } from 'lucide-react';
import bankingImg from '../../assets/images/banking.jpeg';

const workflowSteps = [
  { title: 'Receipt / Payment Entry', description: 'Incoming receipt or outgoing vendor payment recorded.' },
  { title: 'Multi-level Approval', description: 'Financial approval workflow triggered based on thresholds.' },
  { title: 'Ledger Allocation', description: 'Transaction mapped to specific invoices or cost centers.' },
  { title: 'Fund Transfer', description: 'Actual fund transfer executed via bank or cash.' },
  { title: 'Bank Reconciliation', description: 'Automated statement matching and reconciliation.' },
  { title: 'Cash Flow Update', description: 'Real-time updating of enterprise liquidity dashboards.' }
];

const features = [
  { title: 'Customer Receipts', desc: 'Securely record and allocate incoming payments against specific open invoices, supporting partial payments, advance deposits, and bulk allocations.', icon: <Wallet /> },
  { title: 'Vendor Payments', desc: 'Process outgoing payments to vendors with full linkage to approved invoices, supporting NEFT, RTGS, cheque, and multi-currency modes.', icon: <Landmark /> },
  { title: 'Fund Transfers', desc: 'Manage complex inter-bank and inter-branch fund movements with full audit trails, strict approval limits, and multi-bank support.', icon: <ArrowLeftRight /> },
  { title: 'Bank Reconciliation', desc: 'Automated statement import and matching engine that intelligently reconciles book balances with bank statements, highlighting discrepancies.', icon: <RefreshCw /> },
  { title: 'Cash Management', desc: 'Comprehensive daily cash monitoring covering petty cash, counter receipts, and strict cash disbursements with integrated approval workflows.', icon: <BookOpenCheck /> }
];

const capabilitiesAndIntegrations = [
  'Centralized Multi-bank Support & Treasury Management.',
  'Automated BRS (Bank Reconciliation Statement) Matching Engine.',
  'Strict controls over outgoing payments and cash handling limits.',
  'Advanced Post-Dated Cheque (PDC) lifecycle management.',
  'Integration with Accounting for instant GL ledger posting.',
  'Integration with Sales & Billing for invoice payment allocation.',
  'Integration with Purchase for vendor payment settlements.',
  'Integration with Payroll for direct salary bank transfers.'
];

const benefits = [
  'Real-time visibility into enterprise cash flow and overall liquidity.',
  'Accelerated financial closing with automated bank reconciliation.',
  'Prevention of financial fraud through multi-level payment approvals.',
  'Elimination of manual entry via direct statement imports.',
  'Complete traceability of every single receipt and payment.',
  'Better working capital management and accurate cash flow forecasting.'
];

export default function Banking() {
  const contentRef = useScrollToContent();

  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Banking Management Module"
          subtitle="Enterprise Cash & Treasury Operations"
          description="The Banking Management module is the central hub for enterprise liquidity, orchestrating all cash, bank, and treasury operations. Designed to provide real-time visibility into fund flows, this module exists to automate complex receipts, outgoing payments, and multi-currency bank reconciliations. It delivers immense business value by enforcing strict financial controls, mitigating fraud risks, and ensuring that working capital metrics are consistently accurate and audit-ready."
          icon={<Building2 className="w-10 h-10" />}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>


      {/* 1. Workflow */}
      <Section title="Treasury Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Banking Architecture">
        <ImageCard src={bankingImg} alt="Banking Workflow" caption="Comprehensive Banking and Treasury Workflow" />
      </Section>

      {/* 3. Features */}
      <Section title="Key Functionalities">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <FeatureCard key={idx} title={feat.title} description={feat.desc} icon={feat.icon} delay={idx * 0.1} />
          ))}
        </div>
      </Section>

      {/* 4. Capabilities & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Section title="Core Capabilities & Integrations">
          <div className="space-y-4">
            {capabilitiesAndIntegrations.map((rule, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5 border-blue-500/30">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{rule}</span>
              </GlassCard>
            ))}
          </div>
        </Section>

        <Section title="Business Benefits">
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
