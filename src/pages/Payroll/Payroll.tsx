import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import Table from '../../components/Table/Table';
import GlassCard from '../../components/GlassCard/GlassCard';
import AnimatedWorkflowPreview from '../../components/WorkflowPreview/AnimatedWorkflowPreview';
import ModuleWorkflowSection from '../../components/ModuleWorkflowSection/ModuleWorkflowSection';
import { payrollWorkflow, payrollWorkflowConfig } from '../../workflows/payrollWorkflow';
import { Users, UserCheck, Clock, Briefcase, CreditCard, Building2, FileText, ListChecks } from 'lucide-react';



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
          description="The HR & Payroll Management module is the comprehensive command center for all workforce operations. Built for enterprise complexity, it handles everything from onboarding and biometric attendance sync to complex salary structures and statutory compliance (PF, ESI, TDS). It delivers immense value by automating time-consuming payroll cycles, ensuring accurate disbursements, and maintaining a secure, centralized repository of all employee records."
          icon={<Users className="w-10 h-10" />}
          workflowPreview={<AnimatedWorkflowPreview workflow={payrollWorkflow} accentColor="rose" />}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>

      {/* Interactive Workflow Section */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <ModuleWorkflowSection config={payrollWorkflowConfig} />
      </div>

      

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
