import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import { FileText, FileSpreadsheet, Receipt, Truck, Calculator, ScanText, LayoutDashboard, ShieldCheck } from 'lucide-react';
import gstImg from '../../assets/images/gst.jpeg';

const workflowSteps = [
  { title: 'Transaction', description: 'Sales or purchase transaction recorded.' },
  { title: 'Tax Computation', description: 'GST automatically computed on the transaction.' },
  { title: 'E-Invoice / E-Way Bill', description: 'IRN and E-Way bill generated via government portals.' },
  { title: 'ITC Reconciliation', description: 'Input Tax Credit matched with GSTR-2B data.' },
  { title: 'Return Filing', description: 'GSTR-1, 3B, and annual returns filed.' },
  { title: 'Compliance Report', description: 'Audit-ready compliance report generated.' }
];

const cards = [
  { title: 'GSTR-1 Automation', desc: 'Automatically draft and file outward supplies returns directly to the GSTN portal, eliminating manual data entry and minimizing calculation errors.', icon: <FileText /> },
  { title: 'GSTR-2A / 2B Reconciliation', desc: 'Seamlessly auto-draft inward supplies and perform intelligent ITC (Input Tax Credit) matching to ensure maximum tax benefits.', icon: <FileSpreadsheet /> },
  { title: 'GSTR-3B Generation', desc: 'Compute and generate the monthly summary return for tax payments, linking directly with the accounting ledger for accurate liability offsetting.', icon: <Receipt /> },
  { title: 'GSTR-4 for Composition', desc: 'Automated quarterly and annual return generation tailored specifically for businesses registered under the composition scheme.', icon: <FileText /> },
  { title: 'GSTR-9 & 9C Audit', desc: 'Compile comprehensive annual returns and reconciliation statements, preparing the enterprise for statutory financial audits with single-click reports.', icon: <FileSpreadsheet /> },
  { title: 'E-Invoice Integration', desc: 'Direct API integration with the IRP portal for automated Invoice Reference Number (IRN) and dynamic QR code generation on all B2B invoices.', icon: <Receipt /> },
  { title: 'E-Way Bill Generation', desc: 'Generate, extend, and cancel E-Way bills directly from the sales invoice screen, synchronizing transport details instantly with the NIC portal.', icon: <Truck /> },
  { title: 'TDS Computation', desc: 'Automated tracking and computation of Tax Deducted at Source across vendor payments, ensuring absolute compliance with income tax regulations.', icon: <Calculator /> },
  { title: 'AI OCR Extraction', desc: 'Utilize advanced Optical Character Recognition (OCR) to automatically extract data from vendor invoice PDFs and auto-fill purchase entries.', icon: <ScanText /> },
  { title: 'Vendor Compliance Check', desc: 'Real-time API calls to verify GSTIN validity and track vendor filing compliance before processing high-value payments.', icon: <ShieldCheck /> },
  { title: 'Tax Dashboard', desc: 'A unified executive view tracking overall tax liabilities, pending ITC claims, and upcoming statutory filing deadlines across all registered branches.', icon: <LayoutDashboard /> }
];

export default function GST() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="GST & Taxation"
          subtitle="Compliance Module"
          description="End-to-end GST compliance, return filing, and direct integration with government portals for E-Invoicing and E-Way bills."
          icon={<FileText className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="GST Compliance Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Compliance Architecture">
        <ImageCard src={gstImg} alt="GST Workflow Diagram" caption="GST Return Filing and Compliance Architecture" />
      </Section>

      {/* 3. Features */}
      <Section title="Features & Returns">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <FeatureCard key={idx} title={card.title} description={card.desc} icon={card.icon} delay={idx * 0.1} />
          ))}
        </div>
      </Section>
    </div>
  );
}
