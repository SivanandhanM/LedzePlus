import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import Table from '../../components/Table/Table';
import GlassCard from '../../components/GlassCard/GlassCard';
import { Package, Search, BarChart2, Server, Key, TrendingUp, Target, ShieldCheck } from 'lucide-react';
import inventoryImg from '../../assets/images/inventory.jpeg';

const workflowSteps = [
  { title: 'Purchase Requisition', description: 'Material indent raised by department.' },
  { title: 'RFQ & PO', description: 'Vendor quotation and Purchase Order.' },
  { title: 'Goods Receipt', description: 'Items received and quality checked.' },
  { title: 'Stock Update', description: 'Inventory levels updated in warehouse.' },
  { title: 'Stock Transfer', description: 'Items moved between branches or bins.' },
  { title: 'Dispatch / Issue', description: 'Stock issued for production or sales.' }
];

const functionalities = [
  { title: 'Purchasing Engine', desc: 'End-to-end tracking of the procurement lifecycle, from initial Purchase Requisitions to RFQs, PO generation, and final Goods Receipt Notes (GRN).', icon: <Search /> },
  { title: 'Sales Fulfillment', desc: 'Seamless integration with CRM modules to ensure Quote-to-Order-to-Delivery fulfillment runs smoothly with accurate stock availability checks.', icon: <TrendingUp /> },
  { title: 'Warehouse Operations', desc: 'Granular control over internal logistics including stock transfers between branches, physical inventory adjustments, and scrap or damage handling.', icon: <Server /> },
  { title: 'Unified Master Data', desc: 'Centralized management for Item Masters, Hierarchical Categories, multiple Units of Measure (UOM), and Multi-Warehouse mapping.', icon: <Key /> },
  { title: 'Intelligent Dashboard', desc: 'Real-time operational metrics, low-stock alerts, and predictive health scoring to prevent stockouts and minimize dead inventory.', icon: <BarChart2 /> }
];

const roadmap = [
  ['AI Dashboard', 'Predictive Inventory Health Scores, automated reorder suggestions.'],
  ['Advanced Tracking', 'Barcode scanning, QR codes, RFID tags, Batch & Serial tracking.'],
  ['Multi-level Warehousing', 'Complex hierarchical models supporting Zones, Aisles, Racks, Bins.'],
  ['Smart Sourcing', 'Automated RFQ generation, side-by-side Vendor Comparison.'],
  ['Dynamic Workflows', 'Visual Approval Engine with conditional logic.'],
  ['Deep Analytics', 'Automated ABC (Value), XYZ (Volatility), and FSN classification.'],
  ['Inventory Center', 'Machine Learning forecasting models to optimize purchase quantities.'],
  ['Enterprise Security', 'Complete end-to-end Item Traceability, granular Audit Logs.']
];

export default function Inventory() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Inventory Core Module"
          subtitle="Enterprise Edition"
          description="Empowering Modern Enterprises with Intelligent Warehouse, Procurement, and Sales Analytics."
          icon={<Package className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Inventory Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Core Architecture">
        <ImageCard src={inventoryImg} alt="Inventory Overview Diagram" caption="Inventory Core Architecture" />
      </Section>

      {/* 3. Mission & Objective */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard hoverEffect={false} className="border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-primary" />
            <h4 className="font-bold text-xl text-slate-800 dark:text-white">The Mission</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Build a scalable, manufacturing-focused, enterprise-grade inventory platform that breaks free from legacy constraints.
          </p>
        </GlassCard>
        
        <GlassCard hoverEffect={false} className="border-l-4 border-l-skyblue">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-skyblue" />
            <h4 className="font-bold text-xl text-slate-800 dark:text-white">The Objective</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Establish the Inventory Core as the unshakeable transactional engine that will seamlessly power future ERP modules including Production Planning, Quality Assurance, Financials, CRM, and HRMS.
          </p>
        </GlassCard>
      </div>

      {/* 4. Features */}
      <Section title="Architecture & Functionalities">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {functionalities.map((func, idx) => (
            <FeatureCard key={idx} title={func.title} description={func.desc} icon={func.icon} delay={idx * 0.1} />
          ))}
        </div>
      </Section>

      <Section title="Strategic Rollout">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Phase 1: The Core (Inventory, Purchasing, Sales)', 'Phase 2: Expansion (Manufacturing, Quality)', 'Phase 3: Integration (Finance, HRMS, CRM)', 'Phase 4: Intelligence (AI, Analytics)'].map((phase, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="flex flex-col justify-center items-center text-center p-6">
              <span className="text-3xl font-black text-slate-200 dark:text-slate-800 mb-2">0{idx + 1}</span>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{phase}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Enhancement Roadmap">
        <Table headers={['Future Enhancement', 'Description']} rows={roadmap} />
      </Section>
    </div>
  );
}
