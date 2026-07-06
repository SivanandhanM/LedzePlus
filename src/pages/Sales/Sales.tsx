import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import Table from '../../components/Table/Table';
import GlassCard from '../../components/GlassCard/GlassCard';
import { TrendingUp, Truck, FileSpreadsheet, BadgePercent, AlertTriangle, ListChecks } from 'lucide-react';
import salesImg from '../../assets/images/sales.jpeg';

const workflowSteps = [
  { title: 'Inquiry & Quotation', description: 'Customer request received and formal quotation sent.' },
  { title: 'Sales Order', description: 'Confirmed order logged with approved pricing and terms.' },
  { title: 'Order Fulfillment', description: 'Inventory reserved and picking lists generated.' },
  { title: 'Dispatch & Gate Pass', description: 'Goods shipped out with automated Gate Pass creation.' },
  { title: 'Invoicing & GST', description: 'Tax-compliant invoice and E-Way bill generated.' },
  { title: 'Payment Collection', description: 'Payment recorded and Accounts Receivable updated.' }
];

const features = [
  { title: 'Order-to-Cash Automation', desc: 'Seamlessly convert quotations to sales orders, dispatch notes, and invoices without redundant data entry.', icon: <TrendingUp /> },
  { title: 'Intelligent Credit Control', desc: 'Automatically halt sales order processing if a customer exceeds their pre-approved credit limits or has overdue outstanding.', icon: <AlertTriangle /> },
  { title: 'Dispatch & Delivery Routing', desc: 'Plan dispatch routes, assign vehicles, and generate delivery challans with real-time logistics tracking.', icon: <Truck /> },
  { title: 'Pricing & Scheme Management', desc: 'Configure dynamic promotional schemes, volume-based discounts, and complex pricing matrices automatically.', icon: <BadgePercent /> },
  { title: 'Barcode Verification', desc: 'Ensure 100% dispatch accuracy by validating outgoing shipments against the Sales Order using barcode scanners.', icon: <ListChecks /> },
  { title: 'GST & E-Way Bill Automation', desc: 'Generate fully compliant tax invoices and E-Way bills directly from the sales dispatch module in one click.', icon: <FileSpreadsheet /> }
];

const capabilities = [
  'End-to-End Order-to-Cash Lifecycle Management',
  'Centralized Customer Management & Profiling',
  'Dynamic Credit Control & Outstanding Monitoring',
  'Automated Gate Pass & Vehicle Outward Logging',
  'Advanced Sales Dashboard & Revenue Analytics',
  'Multi-currency and Multi-branch Sales Support',
  'Integrated Barcode & QR Code Scanning',
  'Automated E-Invoice and E-Way Bill Generation'
];

const integrationsAndBenefits = [
  ['Inventory Integration', 'Real-time stock reservation and depletion upon dispatch.'],
  ['Accounting & Finance', 'Automated ledger entries for Accounts Receivable and Revenue.'],
  ['Gate Management', 'Synchronized outbound logistics and vehicle exit approvals.'],
  ['Reduced Manual Work', 'Elimination of redundant data entry from quote to cash.'],
  ['Better Compliance', 'Automated GST, E-Invoice, and E-Way Bill generation ensures strict compliance.'],
  ['Complete Traceability', 'Track the entire sales lifecycle from initial inquiry to final payment receipt.'],
  ['Improved Productivity', 'Accelerated order fulfillment cycles and reduced dispatch errors.']
];

export default function Sales() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Sales Management Module"
          subtitle="Enterprise Revenue Operations"
          description="The Sales Management module orchestrates the complete Order-to-Cash lifecycle, driving enterprise revenue generation and customer satisfaction. Designed to handle complex pricing matrices and high-volume dispatch logistics, this module exists to streamline order fulfillment while enforcing strict credit controls. It delivers substantial business value by automating tax compliance, ensuring accurate dispatch through barcode verification, and providing executive dashboards for real-time revenue analytics."
          icon={<TrendingUp className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Business Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Sales Architecture">
        <ImageCard src={salesImg} alt="Sales Workflow Diagram" caption="Comprehensive Sales & Fulfillment Workflow" />
      </Section>

      {/* 3. Features + Capabilities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
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
          <Section title="Core Capabilities">
            <div className="space-y-4">
              {capabilities.map((rule, idx) => (
                <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5 border-emerald-500/30">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
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
