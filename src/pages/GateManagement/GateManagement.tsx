import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import GlassCard from '../../components/GlassCard/GlassCard';
import { ShieldCheck, UserCog, Shield, LayoutDashboard, Clock, History, Truck, Car, Info } from 'lucide-react';
import gateImg from '../../assets/images/gate.jpeg';

const workflowSteps = [
  { title: 'Gate Pass Request', description: 'Vendor or internal user raises a gate pass request.' },
  { title: 'Authorization', description: 'Purchase/Sales team approves the gate pass.' },
  { title: 'Entry Logging', description: 'Security records vehicle and material entry.' },
  { title: 'Loading/Unloading', description: 'Material is loaded or unloaded at the dock.' },
  { title: 'Verification', description: 'Quantity and quality check against the pass.' },
  { title: 'Exit Clearance', description: 'Security confirms exit and closes the gate pass.' }
];

const features = [
  { title: 'Admin Controls', desc: 'Centralized administration dashboard for configuring stringent gate policies, defining operational hours, and managing security personnel access rights.', icon: <UserCog /> },
  { title: 'Security Interface', desc: 'An intuitive, fast-response interface designed specifically for security guards to rapidly log inward and outward movement without bottlenecks.', icon: <Shield /> },
  { title: 'Live Dashboard', desc: 'Real-time overview displaying all vehicles, vendors, and visitors currently on premises, complete with entry timestamps and authorized durations.', icon: <LayoutDashboard /> },
  { title: 'Pending Pass Queue', desc: 'A live queue of generated passes waiting for material loading or unloading, ensuring the logistics team is always prepared for incoming freight.', icon: <Clock /> },
  { title: 'History & Audit Logs', desc: 'Complete historical logs of all gate activities for security audits, cross-referencing past vendor entries and resolving dispute claims.', icon: <History /> },
  { title: 'Vehicle Tracking', desc: 'Live monitoring of transport vehicles within the facility, ensuring they reach the correct docking stations and do not overstay their permitted times.', icon: <Truck /> },
  { title: 'Fleet Management', desc: 'Dedicated tracking and authorization management for internal company fleet movement, linking driver IDs to specific corporate vehicles.', icon: <Car /> }
];

export default function GateManagement() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Gate Management"
          subtitle="Security & Access"
          description="Controls and monitors the movement of materials, vehicles, and visitors in and out of the facility."
          icon={<ShieldCheck className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Gate Operations Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Workflow Diagram">
        <ImageCard src={gateImg} alt="Gate Management Workflow" caption="Inward and Outward Gate Pass Workflow" />
      </Section>

      {/* Overview info */}
      <GlassCard hoverEffect={false} className="mb-10 flex items-start gap-4 p-6 border-skyblue/30">
        <div className="mt-1 w-8 h-8 rounded-full bg-skyblue/20 text-skyblue flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg font-medium">
          The Gate Management module is deeply integrated with Sales and Purchase. It ensures that no material leaves or enters the premises without valid authorization, linking gate passes directly to Delivery Challans and Goods Receipts.
        </p>
      </GlassCard>

      {/* 3. Features */}
      <Section title="Features & Capabilities">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <FeatureCard key={idx} title={feat.title} description={feat.desc} icon={feat.icon} delay={idx * 0.1} />
          ))}
        </div>
      </Section>
    </div>
  );
}
