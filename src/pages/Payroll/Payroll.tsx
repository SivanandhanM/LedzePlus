import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import Table from '../../components/Table/Table';
import GlassCard from '../../components/GlassCard/GlassCard';
import { Users, UserCheck, Clock, CreditCard, FileText, Building2, Briefcase, ListChecks } from 'lucide-react';
import payrollImg from '../../assets/images/Payroll.png';

const workflowSteps = [
  { title: 'Employee Onboarding', description: 'Master data creation and policy assignment.' },
  { title: 'Attendance & Leave', description: 'Monthly attendance processed via biometric sync.' },
  { title: 'Salary Processing', description: 'Gross pay, deductions, and net pay computed.' },
  { title: 'Statutory Deductions', description: 'PF, ESI, and TDS calculations applied.' },
  { title: 'Approval Workflow', description: 'Management review and payroll lock.' },
  { title: 'Disbursement & Payslip', description: 'Bank transfer and automated payslip delivery.' }
];

const features = [
  { title: 'Employee Master Data', desc: 'Centralized employee repository covering demographics, job roles, department hierarchies, and statutory identifiers (PAN, Aadhaar).', icon: <UserCheck /> },
  { title: 'Attendance Tracking', desc: 'Automated daily attendance capture via biometric integration and mobile check-in, complete with supervisor approval workflows.', icon: <Clock /> },
  { title: 'Leave Management', desc: 'Highly configurable leave policies supporting earned, casual, sick, and comp-off leaves with real-time balances and approval routing.', icon: <Briefcase /> },
  { title: 'Automated Salary Engine', desc: 'Compute salaries rapidly with dynamic structures covering basic pay, HRA, variable allowances, and loan recoveries.', icon: <CreditCard /> },
  { title: 'Statutory Compliance', desc: 'Built-in PF, ESI, Professional Tax, and TDS computation ensuring absolute compliance with regional labour and tax regulations.', icon: <Building2 /> },
  { title: 'Payslip Distribution', desc: 'Digitally signed, company-branded payslips delivered automatically to employees via email or employee self-service portal.', icon: <FileText /> }
];

const capabilities = [
  'End-to-End Employee Lifecycle Management.',
  'Automated multi-shift Attendance and Leave reconciliation.',
  'Dynamic Salary Structure definition per grade/role.',
  'Strict Statutory Compliance (PF, ESI, TDS, PT).',
  'One-click direct Bank Transfer file generation.',
  'Comprehensive HR & Payroll Analytics Dashboard.',
  'Self-Service Portal for leave application and tax declaration.',
  'Multi-level secure Approval Workflows for payroll lock.'
];

const integrationsAndBenefits = [
  ['Accounting Integration', 'Automated GL posting of salary expenses and liabilities.'],
  ['Banking Integration', 'Direct API-driven salary disbursements and NEFT file generation.'],
  ['Time & Attendance Devices', 'Real-time sync with biometric and facial recognition hardware.'],
  ['Zero Calculation Errors', 'Eliminates manual spreadsheet errors in complex salary computations.'],
  ['100% Statutory Compliance', 'Avoids penalties by automatically adhering to the latest tax brackets.'],
  ['Massive Time Savings', 'Reduces HR and Finance admin workload by up to 80% every month.'],
  ['Workforce Visibility', 'Provides executives with real-time insights into workforce costs.']
];

export default function Payroll() {
  const contentRef = useScrollToContent();

  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="LEDZE+ Payroll"
          subtitle="Enterprise Human Capital Management"
          description="The Payroll & HRMS module is a comprehensive human capital management engine designed to streamline the entire employee lifecycle. From seamless onboarding and automated biometric attendance to complex salary computations and statutory deductions, this module exists to eliminate manual HR administrative overhead. It delivers significant enterprise value by ensuring 100% compliance with labor laws (PF, ESI, TDS), preventing payroll leakage, and providing executive-level workforce analytics."
          icon={<Users className="w-10 h-10" />}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>


      {/* 1. Workflow */}
      <Section title="Payroll Processing Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Payroll Architecture">
        <ImageCard src={payrollImg} alt="Payroll Workflow" caption="Payroll Management System Architecture" />
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
                <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5 border-teal-500/30">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
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
