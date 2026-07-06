import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import Table from '../../components/Table/Table';
import GlassCard from '../../components/GlassCard/GlassCard';
import { ShieldCheck, UserCog, Shield, LayoutDashboard, Clock, History, Truck, ListChecks } from 'lucide-react';
import gateImg from '../../assets/images/gate.jpeg';

const workflowSteps = [
  { title: 'Gate Pass Request', description: 'Internal user or vendor raises an inward/outward request.' },
  { title: 'Security Verification', description: 'Vehicle, driver, and documents verified at the gate.' },
  { title: 'Inward / Outward Logging', description: 'Material entry/exit recorded against authorized pass.' },
  { title: 'Weighbridge Sync', description: 'Automated gross/tare weight capture.' },
  { title: 'Dock Assignment', description: 'Vehicle directed to the designated loading/unloading bay.' },
  { title: 'Exit Clearance', description: 'Final security check and gate pass closure.' }
];

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
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Gate Management Module"
          subtitle="Enterprise Security & Access Control"
          description="The Gate Management module is the frontline security engine for the enterprise facility. It rigorously controls and monitors the movement of all materials, vehicles, and visitors entering or exiting the premises. Designed to prevent inventory pilferage and unauthorized access, this module delivers immense business value by integrating seamlessly with Sales and Purchase workflows. It ensures that every logistical movement is backed by valid systemic authorization, providing complete operational transparency and an airtight audit trail."
          icon={<ShieldCheck className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Gate Operations Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Security Architecture">
        <ImageCard src={gateImg} alt="Gate Management Workflow" caption="Inward and Outward Gate Pass Architecture" />
      </Section>

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
