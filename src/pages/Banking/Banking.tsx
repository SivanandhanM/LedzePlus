import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import AnimatedWorkflowPreview from '../../components/WorkflowPreview/AnimatedWorkflowPreview';
import ModuleWorkflowSection from '../../components/ModuleWorkflowSection/ModuleWorkflowSection';
import { bankingWorkflow, bankingWorkflowConfig } from '../../workflows/bankingWorkflow';
import { Building2, Wallet, Landmark, ArrowLeftRight, RefreshCw, BookOpenCheck, CheckCircle2, Star } from 'lucide-react';



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
          title="LEDZE+ Banking"
          subtitle="Enterprise Cash & Treasury Operations"
          description="The Banking & Cash Management module acts as the financial command center for enterprise liquidity, orchestrating all incoming receipts, outgoing disbursements, and complex multi-bank reconciliations. Designed to eliminate manual banking errors, it ensures absolute transparency across cash flow operations. By automating statement matching and fund transfers, it provides real-time visibility into working capital, empowering CFOs to make data-driven financial decisions."
          icon={<Building2 className="w-10 h-10" />}
          workflowPreview={<AnimatedWorkflowPreview workflow={bankingWorkflow} accentColor="blue" />}
        />
      </div>
        <div ref={contentRef} className="scroll-mt-6"></div>

        {/* Interactive Workflow Section */}
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
          <ModuleWorkflowSection config={bankingWorkflowConfig} />
        </div>

      

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
