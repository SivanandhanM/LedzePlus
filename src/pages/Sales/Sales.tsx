import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero, { MODULE_THEMES } from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import CoreCapabilityItem from '../../components/CoreCapabilityItem/CoreCapabilityItem';
import Table from '../../components/Table/Table';
import AnimatedWorkflowPreview from '../../components/WorkflowPreview/AnimatedWorkflowPreview';
import ModuleWorkflowSection from '../../components/ModuleWorkflowSection/ModuleWorkflowSection';
import { salesWorkflow, salesWorkflowConfig } from '../../workflows/salesWorkflow';
import { TrendingUp, Truck, FileSpreadsheet, BadgePercent, AlertTriangle, ListChecks, Server, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { title: 'Order-to-Cash Automation', desc: 'Seamlessly convert quotations to sales orders, dispatch notes, and invoices without redundant data entry.', icon: <TrendingUp /> },
  { title: 'Intelligent Credit Control', desc: 'Automatically halt sales order processing if a customer exceeds their pre-approved credit limits or has overdue outstanding.', icon: <AlertTriangle /> },
  { title: 'Dispatch & Delivery Routing', desc: 'Plan dispatch routes, assign vehicles, and generate delivery challans with real-time logistics tracking.', icon: <Truck /> },
  { title: 'Pricing & Scheme Management', desc: 'Configure dynamic promotional schemes, volume-based discounts, and complex pricing matrices automatically.', icon: <BadgePercent /> },
  { title: 'Barcode Verification', desc: 'Ensure 100% dispatch accuracy by validating outgoing shipments against the Sales Order using barcode scanners.', icon: <ListChecks /> },
  { title: 'GST & E-Way Bill Automation', desc: 'Generate fully compliant tax invoices and E-Way bills directly from the sales dispatch module in one click.', icon: <FileSpreadsheet /> },
];

const capabilities = [
  'End-to-End Order-to-Cash Lifecycle Management',
  'Centralized Customer Management & Profiling',
  'Dynamic Credit Control & Outstanding Monitoring',
  'Automated Gate Pass & Vehicle Outward Logging',
  'Advanced Sales Dashboard & Revenue Analytics',
  'Multi-currency and Multi-branch Sales Support',
  'Integrated Barcode & QR Code Scanning',
  'Automated E-Invoice and E-Way Bill Generation',
];

const integrationsAndBenefits = [
  ['Inventory Integration', 'Real-time stock reservation and depletion upon dispatch.'],
  ['Accounting & Finance', 'Automated ledger entries for Accounts Receivable and Revenue.'],
  ['Gate Management', 'Synchronized outbound logistics and vehicle exit approvals.'],
  ['Reduced Manual Work', 'Elimination of redundant data entry from quote to cash.'],
  ['Better Compliance', 'Automated GST, E-Invoice, and E-Way Bill generation ensures strict compliance.'],
  ['Complete Traceability', 'Track the entire sales lifecycle from initial inquiry to final payment receipt.'],
  ['Improved Productivity', 'Accelerated order fulfillment cycles and reduced dispatch errors.'],
];

export default function Sales() {
  const contentRef = useScrollToContent();

  return (
    <div className="relative pb-12 overflow-hidden">

      {/* Enterprise Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[10%] -left-1/4 w-[1000px] h-[1000px] bg-indigo-200/40 dark:bg-indigo-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute top-[40%] -right-1/4 w-[800px] h-[800px] bg-emerald-200/40 dark:bg-emerald-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[30%] left-[5%] text-slate-300 dark:text-slate-800 opacity-20">
          <Database size={120} />
        </motion.div>
        <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }} className="absolute top-[60%] right-[10%] text-slate-300 dark:text-slate-800 opacity-20">
          <Server size={180} />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="py-8">
          <Hero
            title="LEDZE+ Sales"
            subtitle="Enterprise Revenue Operations"
            description="The Sales Management module orchestrates the complete order-to-cash process, transforming customer interactions into streamlined revenue pipelines. Built for enterprise scale, it seamlessly handles inquiries, quotations, complex pricing rules, order fulfillment, and automated invoicing. It provides real-time visibility into sales performance, accelerates payment collections, and enhances customer satisfaction through flawless delivery execution."
            icon={<TrendingUp className="w-10 h-10" />}
            workflowPreview={<AnimatedWorkflowPreview workflow={salesWorkflow} accentColor="emerald" moduleName="SALES" />}
            theme={MODULE_THEMES.sales}
          />
        </div>
        <div ref={contentRef} className="scroll-mt-6" />

        {/* Interactive Workflow Section */}
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
          <ModuleWorkflowSection config={salesWorkflowConfig} />
        </div>

        {/* Features + Capabilities */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <CoreCapabilityItem key={idx} text={rule} delay={idx * 0.1} />
                ))}
              </div>
            </Section>
          </div>
        </div>

        <Section title="Module Integrations & Business Benefits">
          <Table headers={['Integration / Benefit', 'Description']} rows={integrationsAndBenefits} />
        </Section>
      </div>
    </div>
  );
}
