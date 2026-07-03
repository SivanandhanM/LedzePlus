import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import { ShoppingCart, CheckCircle2, Factory, ClipboardCheck, ArrowRightLeft, FileSpreadsheet, Scale, BadgeAlert, Wallet } from 'lucide-react';
import purchaseImg from '../../assets/images/purchase.jpeg';

const workflowSteps = [
  { title: 'Quotation / Indent', description: 'Internal request for materials.' },
  { title: 'RFQ', description: 'Request For Quotation sent to vendors.' },
  { title: 'PO', description: 'Purchase Order created based on quotations.' },
  { title: 'Goods Receipt', description: 'Materials received and logged into inventory.' },
  { title: 'Invoice', description: 'Vendor invoice recorded against receipt.' },
  { title: 'Payment', description: 'Payment processed and matched.' }
];

const features = [
  { title: 'Vendor Portal', desc: 'A dedicated self-service gateway for suppliers to securely submit their quotations, upload e-invoices, and monitor real-time payment statuses without manual intervention.', icon: <Factory /> },
  { title: 'Purchase Requisition', desc: 'Streamline departmental material indents through automated, multi-level approval hierarchies based on budget thresholds and departmental limits.', icon: <ClipboardCheck /> },
  { title: 'Debit Note', desc: 'Instantly generate debit notes linked to the original Purchase Order for short shipments, damaged goods, or rate differences discovered during Goods Receipt.', icon: <ArrowRightLeft /> },
  { title: 'Purchase Order', desc: 'Generate comprehensive Purchase Orders supporting multi-currency transactions, complex tax structures (GST), and multi-warehouse delivery schedules.', icon: <FileSpreadsheet /> },
  { title: 'Vendor Comparison', desc: 'Intelligently analyze side-by-side vendor quotations to evaluate landed costs, delivery timelines, and quality ratings for optimal sourcing decisions.', icon: <Scale /> },
  { title: 'Landed Cost', desc: 'Accurately apportion freight, insurance, customs duty, and other overheads to determine the exact item valuation in inventory.', icon: <Wallet /> },
  { title: 'Payment Follow-up', desc: 'Trigger automated email and SMS reminders for pending vendor payments, ensuring strong supplier relationships and timely fulfillment.', icon: <BadgeAlert /> }
];

const businessRules = [
  'Purchase Order cannot exceed the approved indent quantity.',
  'Goods Receipt Note (GRN) requires a valid Purchase Order.',
  'Vendor invoice total must match the GRN value.',
  'Payments require Level 2 approval if exceeding $10,000.'
];

export default function Purchase() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Purchase Module"
          subtitle="Procurement & Sourcing"
          description="Manage the complete procurement lifecycle from indent creation to final vendor payment with strict business rule enforcement."
          icon={<ShoppingCart className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Procurement Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Workflow Diagram">
        <ImageCard src={purchaseImg} alt="Purchase Workflow Diagram" caption="End-to-End Procurement Workflow" />
      </Section>

      {/* 3. Features + Business Rules */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Section title="Core Features">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <FeatureCard key={idx} title={feat.title} description={feat.desc} icon={feat.icon} delay={idx * 0.1} />
              ))}
            </div>
          </Section>
        </div>

        <div className="xl:col-span-1">
          <Section title="Business Rules">
            <div className="space-y-4">
              {businessRules.map((rule, idx) => (
                <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
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
