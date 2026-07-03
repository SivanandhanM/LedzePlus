import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import { Users, UserCheck, Clock, CreditCard, FileText, Building2, Briefcase, Star } from 'lucide-react';
import payrollImg from '../../assets/images/Payroll.png';

const workflowSteps = [
  { title: 'Employee', description: 'Employee Master and Onboarding' },
  { title: 'Attendance', description: 'Daily attendance tracking and timesheets' },
  { title: 'Leave', description: 'Leave management and approvals' },
  { title: 'Payroll', description: 'Salary processing and deductions' },
  { title: 'Approval', description: 'Payroll approval by management' },
  { title: 'Bank Transfer', description: 'Direct bank transfer processing' },
  { title: 'Payslip', description: 'Payslip generation and distribution' },
  { title: 'Reports', description: 'Statutory and MIS reports' }
];

const features = [
  { title: 'Employee Master', desc: 'Centralized employee records covering personal details, job roles, department hierarchy, bank accounts, and statutory identifiers like PAN and Aadhaar.', icon: <UserCheck /> },
  { title: 'Attendance Tracking', desc: 'Automated daily attendance capture via biometric integration, mobile check-in, and manual overrides with supervisor approval workflows.', icon: <Clock /> },
  { title: 'Payroll Processing', desc: 'Fully automated salary computation covering basic pay, HRA, allowances, PF, ESI, professional tax, and TDS deductions with compliance built-in.', icon: <CreditCard /> },
  { title: 'Payslip Generation', desc: 'Digitally signed, branded payslips delivered automatically to employees via email with a complete breakdown of earnings and deductions.', icon: <FileText /> },
  { title: 'Leave Management', desc: 'Configurable leave policies supporting earned, casual, sick, and comp-off leaves with real-time balances and automated approval routing.', icon: <Briefcase /> },
  { title: 'Statutory Compliance', desc: 'Built-in PF, ESI, PT, and TDS computation ensuring the organization remains 100% compliant with Indian labour laws and tax regulations.', icon: <Building2 /> }
];

const benefits = [
  'Eliminates manual salary calculation errors.',
  'Ensures 100% statutory compliance automatically.',
  'Reduces HR admin time by up to 80%.',
  'Provides real-time visibility into workforce costs.'
];

export default function Payroll() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Payroll Management"
          subtitle="Human Resources & Payroll"
          description="Comprehensive employee management from onboarding and attendance to salary processing and statutory compliance."
          icon={<Users className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Payroll Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="System Architecture">
        <ImageCard src={payrollImg} alt="Payroll Workflow" caption="Payroll Management System Architecture" />
      </Section>

      {/* 3. Features + Benefits */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Section title="Core Features">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <FeatureCard key={idx} title={feat.title} description={feat.desc} icon={feat.icon} delay={idx * 0.1} />
              ))}
            </div>
          </Section>
        </div>

        <div className="xl:col-span-1">
          <Section title="Key Benefits">
            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5 border-teal-500/30">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{benefit}</span>
                </GlassCard>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
