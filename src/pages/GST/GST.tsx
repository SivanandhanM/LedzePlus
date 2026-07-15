import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import Table from '../../components/Table/Table';
import GlassCard from '../../components/GlassCard/GlassCard';
import AnimatedWorkflowPreview from '../../components/WorkflowPreview/AnimatedWorkflowPreview';
import ModuleWorkflowSection from '../../components/ModuleWorkflowSection/ModuleWorkflowSection';
import { gstWorkflow, gstWorkflowConfig } from '../../workflows/gstWorkflow';
import { FileText, Truck, ShieldCheck, Calculator, FileSpreadsheet, Receipt, ListChecks } from 'lucide-react';



const cards = [
  { title: 'GSTR-1 & 3B Automation', desc: 'Automatically draft and file outward supplies and monthly summary returns directly to the GSTN portal, eliminating manual data entry.', icon: <FileText /> },
  { title: 'GSTR-2A / 2B Reconciliation', desc: 'Seamlessly auto-draft inward supplies and perform intelligent ITC (Input Tax Credit) matching to ensure maximum tax benefits.', icon: <FileSpreadsheet /> },
  { title: 'E-Invoice Integration', desc: 'Direct API integration with the IRP portal for automated Invoice Reference Number (IRN) and dynamic QR code generation on B2B invoices.', icon: <Receipt /> },
  { title: 'E-Way Bill Generation', desc: 'Generate, extend, and cancel E-Way bills directly from the sales invoice screen, synchronizing transport details with the NIC portal.', icon: <Truck /> },
  { title: 'TDS Computation', desc: 'Automated tracking and computation of Tax Deducted at Source across vendor payments, ensuring absolute compliance with income tax regulations.', icon: <Calculator /> },
  { title: 'Vendor Compliance Check', desc: 'Real-time API calls to verify GSTIN validity and track vendor filing compliance before processing high-value supplier payments.', icon: <ShieldCheck /> }
];

const capabilities = [
  'End-to-End automated GST Return Filing (GSTR-1, 2B, 3B, 9).',
  'Real-time E-Invoice (IRN & QR) and E-Way Bill generation.',
  'Automated Input Tax Credit (ITC) matching and reconciliation.',
  'Intelligent HSN / SAC code validation engine.',
  'Dynamic Tax computation for complex multi-state transactions.',
  'Automated TDS tracking and challan generation.',
  'AI-powered OCR extraction for vendor invoice digitization.',
  'Comprehensive Tax Dashboard for executive compliance tracking.'
];

const integrationsAndBenefits = [
  ['Sales Integration', 'Automated GST calculation on all outward sales invoices.'],
  ['Purchase Integration', 'Instant recording of inward GST and ITC tracking.'],
  ['Accounting Integration', 'Automatic posting of tax liabilities to the General Ledger.'],
  ['100% Compliance', 'Eliminates penalties through strict validation before filing.'],
  ['Reduced Manual Work', 'Direct API integrations eliminate repetitive portal uploads.'],
  ['Maximum ITC Claim', 'Intelligent reconciliation prevents missed Input Tax Credits.'],
  ['Faster Processing', 'One-click E-Invoice and E-Way bill generation speeds up dispatch.']
];

export default function GST() {
  const contentRef = useScrollToContent();

  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="LEDZE+ GST"
          subtitle="Enterprise Tax Compliance"
          description="The GST & Tax Management module acts as the compliance guardian for the enterprise, ensuring every transaction adheres strictly to government regulations. Designed for zero-error tax handling, it seamlessly automates E-Invoice generation, E-Way bill creation, and multi-state tax calculations. By integrating directly with government portals, it delivers immense business value by eliminating manual return filings, ensuring timely ITC claims, and preventing regulatory penalties."
          icon={<FileText className="w-10 h-10" />}
          workflowPreview={<AnimatedWorkflowPreview workflow={gstWorkflow} accentColor="orange" />}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>

      {/* Interactive Workflow Section */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <ModuleWorkflowSection config={gstWorkflowConfig} />
      </div>

      

      {/* 3. Features + Capabilities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
        <div className="xl:col-span-2">
          <Section title="Key Functionalities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card, idx) => (
                <FeatureCard key={idx} title={card.title} description={card.desc} icon={card.icon} delay={idx * 0.1} />
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
