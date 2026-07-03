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
  { title: 'Quotation', description: 'Sales offer to customer.' },
  { title: 'Sales Order', description: 'Confirmed order from customer.' },
  { title: 'Dispatch', description: 'Goods shipped to customer.' },
  { title: 'Invoice', description: 'Sales invoice generated.' },
  { title: 'Payment', description: 'Payment received from customer.' }
];

const features = [
  { title: 'Sales Funnel', desc: 'Visualize and track sales pipelines from raw inquiry and qualified lead stages all the way to closed-won deals and revenue generation.', icon: <TrendingUp /> },
  { title: 'Dispatch Management', desc: 'Intelligently plan dispatch routes, assign fleet vehicles, generate delivery challans, and track real-time logistics movements to customers.', icon: <Truck /> },
  { title: 'Quotation Management', desc: 'Create, revise, and track professional multi-currency sales quotations with built-in version control and margin analysis capabilities.', icon: <FileSpreadsheet /> },
  { title: 'Scheme & Discounts', desc: 'Configure dynamic promotional schemes, volume-based discounts, and seasonal offers that automatically apply to eligible sales orders.', icon: <BadgePercent /> },
  { title: 'Credit Blocking', desc: 'Automatically halt sales order processing and dispatch if a customer exceeds their pre-approved credit limits or has overdue invoices.', icon: <AlertTriangle /> }
];

const limits = [
  ['Max Sales Orders/Day', 'Unlimited (Scalable)', 'Capped based on tier'],
  ['Simultaneous Users', '10,000+', 'Often restricted'],
  ['Data Storage Limit', 'Dynamic (Cloud/On-Prem)', 'Fixed Quotas'],
  ['Approval Matrix Levels', 'Up to 15 levels', '3 to 5 levels'],
];

const businessRules = [
  'Dispatch cannot exceed Sales Order quantity.',
  'Sales Invoice must reference a valid Dispatch note.',
  'Credit block override requires Level-3 approval.',
];

export default function Sales() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Sales & CRM Module"
          subtitle="Revenue Operations"
          description="Accelerate revenue with end-to-end sales lifecycle management, intelligent credit blocking, and seamless dispatch logistics."
          icon={<TrendingUp className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Sales Pipeline Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Workflow Diagram">
        <ImageCard src={salesImg} alt="Sales Workflow Diagram" caption="Comprehensive Sales & Fulfillment Workflow" />
      </Section>

      {/* 3. Features + Business Rules */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
        <div className="xl:col-span-2">
          <Section title="Features & Capabilities">
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

      <Section title="System Architecture Comparison">
        <Table headers={['System Limits', 'LEDZE Plus ERP', 'Other ERPs']} rows={limits} />
      </Section>
    </div>
  );
}
