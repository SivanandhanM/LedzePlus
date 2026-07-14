import { useScrollToContent } from '../../hooks/useScrollToContent';
import Hero, { MODULE_THEMES } from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import Table from '../../components/Table/Table';
import GlassCard from '../../components/GlassCard/GlassCard';
import AnimatedWorkflowPreview from '../../components/WorkflowPreview/AnimatedWorkflowPreview';
import ModuleWorkflowSection from '../../components/ModuleWorkflowSection/ModuleWorkflowSection';
import { gateWorkflow, gateWorkflowConfig } from '../../workflows/gateWorkflow';
import { ShieldCheck, UserCog, Shield, LayoutDashboard, Clock, History, Truck, ListChecks } from 'lucide-react';



const features = [
  { title: 'Vehicle Entry & Exit', desc: 'Securely manage all incoming and outgoing logistics vehicles with automated number plate recognition (ANPR) and driver verification.', icon: <Truck /> },
  { title: 'Visitor Management', desc: 'Digitize front-desk operations with visitor pre-registration, photo capture, and automated host notifications via SMS/Email.', icon: <UserCog /> },
  { title: 'Material Inward & Outward', desc: 'Strictly monitor material movement by linking physical entry/exit to approved Purchase Orders or Sales Dispatch Notes.', icon: <Shield /> },
  { title: 'Security Approval Workflows', desc: 'Implement multi-level security checks for hazardous materials, scrap disposal, and high-value outbound shipments.', icon: <LayoutDashboard /> },
  { title: 'Pending Pass Queue', desc: 'Provide logistics and warehouse teams with a live queue of authorized vehicles waiting at the gate for loading/unloading.', icon: <Clock /> },
  { title: 'Audit Trail & History', desc: 'Maintain an immutable log of all facility movements for security audits, cross-referencing past vendor entries and resolving disputes.', icon: <History /> }
];

const capabilities = [
  'Centralized administration for all security gates and access points.',
  'Real-time synchronization with weighbridge hardware.',
  'Automated Returnable Gate Pass (RGP) tracking and alerts.',
  'Non-Returnable Gate Pass (NRGP) generation for scrap and waste.',
  'Live dashboard displaying all vehicles/visitors currently on-premises.',
  'Dedicated authorization management for internal company fleet (Cars/Buses).',
  'QR-code based rapid entry scanning for recurring vendors.',
  'Strict enforcement of facility operating hours and blackout windows.'
];

const integrationsAndBenefits = [
  ['Sales Integration', 'Outward gate pass requires an approved Sales Dispatch Note.'],
  ['Purchase Integration', 'Inward gate pass linked directly to Purchase Orders/GRN.'],
  ['Inventory Integration', 'Triggers real-time stock deductions upon vehicle exit.'],
  ['Enhanced Security', 'Ensures no unauthorized material enters or leaves the premises.'],
  ['Reduced Wait Times', 'Pre-authorized passes speed up security clearance at the gate.'],
  ['Dispute Resolution', 'Immutable audit logs protect against vendor delivery claims.'],
  ['Operational Visibility', 'Live dashboards prevent dock congestion and optimize logistics.']
];

export default function GateManagement() {
  const contentRef = useScrollToContent();

  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="LEDZE+ Gate Management"
          subtitle="Enterprise Security & Access Control"
          description="The Gate Management module serves as the primary security checkpoint for the enterprise, meticulously tracking every inward and outward movement of materials, vehicles, and personnel. Designed to eliminate manual logbooks, it ensures absolute visibility into premise operations, preventing unauthorized access and material pilferage. By integrating directly with weighbridges and procurement systems, it accelerates vehicle turnaround times while enforcing strict corporate security protocols."
          icon={<ShieldCheck className="w-10 h-10" />}
          workflowPreview={<AnimatedWorkflowPreview workflow={gateWorkflow} accentColor="indigo" />}
          theme={MODULE_THEMES.gate}
        />
      </div>
      <div ref={contentRef} className="scroll-mt-6"></div>

      {/* Interactive Workflow Section */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <ModuleWorkflowSection config={gateWorkflowConfig} />
      </div>

      

      {/* 3. Features + Capabilities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12 mt-8">
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
                <GlassCard key={idx} delay={idx * 0.1} className="flex items-start gap-4 p-5 border-sky-500/30">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
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
