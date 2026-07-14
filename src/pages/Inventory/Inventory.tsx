import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero, { MODULE_THEMES } from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import AnimatedWorkflowPreview from '../../components/WorkflowPreview/AnimatedWorkflowPreview';
import ModuleWorkflowSection from '../../components/ModuleWorkflowSection/ModuleWorkflowSection';
import { inventoryWorkflow, inventoryWorkflowConfig } from '../../workflows/inventoryWorkflow';
import { Package, Search, BarChart2, Server, Key, TrendingUp, Target, ShieldCheck } from 'lucide-react';

const functionalities = [
  { title: 'Item Master Management', desc: 'Centralized repository for all inventory items with comprehensive attributes, hierarchical categorization, multiple Units of Measure (UOM), and variant management.', icon: <Search /> },
  { title: 'Multi-Warehouse Control', desc: 'Granular tracking across multiple physical branches, zones, aisles, and bins, ensuring complete visibility of stock distribution.', icon: <Server /> },
  { title: 'Stock Movement & Transfers', desc: 'Seamless orchestration of internal stock transfers, material issues for production, and inter-branch transit tracking.', icon: <TrendingUp /> },
  { title: 'Batch & Serial Tracking', desc: 'End-to-end traceability of perishable or high-value items using automated batch numbers, expiry dates, and unique serial identification.', icon: <Key /> },
  { title: 'Inventory Analytics & Alerts', desc: 'Real-time dashboards providing operational metrics, automated low-stock alerts, and predictive health scoring to prevent stockouts.', icon: <BarChart2 /> },
];

const integrations = [
  ['Sales Management', 'Real-time stock availability checks during order creation.'],
  ['Purchase Management', 'Automated purchase triggers based on reorder levels.'],
  ['Accounting & Finance', 'Immediate ledger updates for inventory valuation and cost of goods sold (COGS).'],
  ['Manufacturing', 'Raw material issuance and finished goods receipt automation.'],
];

const coreCapabilitiesI = [
  'Item & Variant Management',
  'Multi-location & Warehouse Control',
  'Batch, Serial, and Expiry Tracking',
  'Automated Reorder Level Management',
  'Physical Stock Adjustments & Reconciliation',
];

const coreCapabilitiesII = [
  'Multi-level Approval Workflows',
  'Advanced Inventory Valuation (FIFO, Moving Average)',
  'Real-time Dashboard Analytics',
  'Comprehensive Audit Trail',
  'Barcode & QR Code Integration',
];

export default function Inventory() {
  const contentRef = useScrollToContent();

  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero
          title="LEDZE+ Inventory"
          subtitle="Enterprise Edition"
          description="The Inventory Management module is the transactional backbone of supply chain operations, providing real-time visibility into stock levels, movements, and valuations. Designed for enterprise scalability, this module exists to optimize inventory holding costs, prevent stockouts, and ensure seamless material availability. It delivers immense business value by driving accuracy in stock valuation, minimizing dead stock, and empowering organizations with complete traceability and control."
          icon={<Package className="w-10 h-10" />}
          workflowPreview={<AnimatedWorkflowPreview workflow={inventoryWorkflow} accentColor="emerald" moduleName="INVENTORY" />}
          theme={MODULE_THEMES.inventory}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6" />

      {/* Interactive Workflow Section */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <ModuleWorkflowSection config={inventoryWorkflowConfig} />
      </div>

      {/* Core Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard hoverEffect={false} className="border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-500" />
            <h4 className="font-bold text-xl text-slate-800 dark:text-white">Core Capabilities I</h4>
          </div>
          <ul className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium list-disc list-inside space-y-1">
            {coreCapabilitiesI.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </GlassCard>

        <GlassCard hoverEffect={false} className="border-l-4 border-l-cyan-500">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-cyan-500" />
            <h4 className="font-bold text-xl text-slate-800 dark:text-white">Core Capabilities II</h4>
          </div>
          <ul className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium list-disc list-inside space-y-1">
            {coreCapabilitiesII.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </GlassCard>
      </div>

      {/* Key Functionalities */}
      <Section title="Key Functionalities">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {functionalities.map((func, idx) => (
            <FeatureCard key={idx} title={func.title} description={func.desc} icon={func.icon} delay={idx * 0.1} />
          ))}
        </div>
      </Section>

      {/* Module Integrations */}
      <Section title="Module Integrations">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((integration, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="flex flex-col justify-center items-center text-center p-6">
              <span className="text-3xl font-black text-slate-200 dark:text-slate-800 mb-2">0{idx + 1}</span>
              <h5 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{integration[0]}</h5>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{integration[1]}</p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
