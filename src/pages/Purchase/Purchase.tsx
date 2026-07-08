import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import { ShoppingCart, CheckCircle2, Factory, ClipboardCheck, ArrowRightLeft, FileSpreadsheet, Scale, BadgeAlert, Wallet } from 'lucide-react';
import purchaseImg from '../../assets/images/purchase.webp';

const workflowSteps = [
  { title: 'Requirement', description: 'Internal material shortage identified.' },
  { title: 'Purchase Requisition', description: 'Departmental indent raised and approved.' },
  { title: 'RFQ Generation', description: 'Request for Quotation sent to multiple vendors.' },
  { title: 'Vendor Comparison', description: 'Quotations evaluated and optimal vendor selected.' },
  { title: 'Purchase Order', description: 'Formal PO issued to the chosen vendor.' },
  { title: 'Goods Receipt', description: 'Materials received, inspected, and GRN created.' },
  { title: 'Invoice & Payment', description: 'Invoice matched against GRN and payment processed.' }
];

const features = [
  { title: 'Procurement Lifecycle Management', desc: 'End-to-end orchestration of the purchasing process, transforming internal requirements into fulfilled orders with complete traceability.', icon: <ClipboardCheck /> },
  { title: 'Vendor Management Portal', desc: 'A dedicated self-service gateway for suppliers to securely submit quotations, acknowledge orders, and monitor payment statuses.', icon: <Factory /> },
  { title: 'Automated RFQ & Vendor Comparison', desc: 'Intelligently analyze side-by-side vendor quotations to evaluate landed costs, delivery timelines, and quality ratings.', icon: <Scale /> },
  { title: 'Multi-level Purchase Approvals', desc: 'Enforce strict financial controls with dynamic, hierarchy-based approval workflows tied to budget limits and department thresholds.', icon: <FileSpreadsheet /> },
  { title: 'Purchase Returns & Debit Notes', desc: 'Instantly generate debit notes linked to the original Purchase Order for short shipments, damaged goods, or rate differences.', icon: <ArrowRightLeft /> },
  { title: 'Spend Analytics & Landed Cost', desc: 'Accurately apportion freight, insurance, and taxes to determine exact valuation, while dashboard analytics provide insights into spending patterns.', icon: <Wallet /> },
  { title: 'Integration & Compliance', desc: 'Seamlessly interacts with Inventory for stock updates, Accounting for ledger entries, and ensures full GST/Tax compliance on all transactions.', icon: <BadgeAlert /> }
];

const capabilitiesAndBenefits = [
  'Centralized Vendor Master and automated rating system.',
  'Comprehensive RFQ management and automated quote parsing.',
  'Multi-currency and multi-warehouse Purchase Order support.',
  'Strict 3-way matching (PO, GRN, Invoice) to prevent overbilling.',
  'Real-time spend analytics and departmental budget tracking.',
  'Seamless integration with Inventory, Accounting, and GST modules.',
  'Reduced manual data entry and accelerated procurement cycles.',
  'Complete audit trail for all procurement activities and approvals.'
];

export default function Purchase() {
  const contentRef = useScrollToContent();

  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="LEDZE+ Purchase"
          subtitle="Enterprise Procurement & Sourcing"
          description="The Purchase Management module streamlines the entire procure-to-pay lifecycle, ensuring organizations acquire goods and services efficiently and cost-effectively. Designed to enforce strict financial controls and business rules, this module exists to optimize vendor relationships, prevent unauthorized spending, and automate routine purchasing tasks. It delivers immense enterprise value by providing real-time spend analytics, ensuring compliance through multi-level approvals, and integrating seamlessly with inventory and financial accounting systems."
          icon={<ShoppingCart className="w-10 h-10" />}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>


      {/* 1. Workflow */}
      <Section title="Business Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Procurement Architecture">
        <ImageCard src={purchaseImg} alt="Purchase Workflow Diagram" caption="End-to-End Procurement Workflow" />
      </Section>

      {/* 3. Features + Business Rules */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Section title="Key Functionalities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <FeatureCard key={idx} title={feat.title} description={feat.desc} icon={feat.icon} delay={idx * 0.1} />
              ))}
            </div>
          </Section>
        </div>

        <div className="xl:col-span-1">
          <Section title="Core Capabilities & Benefits">
            <div className="space-y-4">
              {capabilitiesAndBenefits.map((rule, idx) => (
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
