import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Timeline from '../../components/Timeline/Timeline';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import ImageCard from '../../components/ImageCard/ImageCard';
import { Receipt, LayoutDashboard, Clock, AlertOctagon, Tag, BarChart3, ShieldAlert, Bell } from 'lucide-react';
import billingImg from '../../assets/images/billing.jpeg';

const workflowSteps = [
  { title: 'Invoice Creation', description: 'Generate sales invoice from dispatch note.' },
  { title: 'Approval', description: 'Invoice reviewed and approved by finance.' },
  { title: 'Customer Delivery', description: 'Invoice delivered to customer via email/print.' },
  { title: 'Payment Tracking', description: 'Track payment status and due dates.' },
  { title: 'Reconciliation', description: 'Match payment against open invoices.' },
  { title: 'Closure', description: 'Mark invoice as settled and close the entry.' }
];

const features = [
  { title: 'Billing Dashboard', desc: 'Centralized command center offering real-time insights into total sales volume, invoice aging, outstanding payments, and collection efficiencies.', icon: <LayoutDashboard /> },
  { title: 'Customer Timeline', desc: 'A unified chronological view of all customer interactions, linking initial sales orders to dispatches, invoices, credit notes, and final payments.', icon: <Clock /> },
  { title: 'Fraud Detection', desc: 'AI-driven algorithms that continuously scan for abnormal billing activities, duplicate invoice generation, or excessively high discount authorizations.', icon: <AlertOctagon /> },
  { title: 'Discount Intelligence', desc: 'Smart recommendation engine that proposes optimal discounts based on historical customer loyalty, transaction volumes, and ongoing promotional rules.', icon: <Tag /> },
  { title: 'Customer Analytics', desc: 'Deep dive metrics identifying top revenue-generating customers, regional performance, and product-specific profitability trends.', icon: <BarChart3 /> },
  { title: 'Credit Risk Monitoring', desc: 'Proactively monitor customer credit utilization limits and issue early warnings to the sales team before accounts breach their financial thresholds.', icon: <ShieldAlert /> },
  { title: 'Automated Reminders', desc: 'Configure scheduled email and SMS payment reminders sent to clients both proactively before due dates and as escalations for overdue invoices.', icon: <Bell /> }
];

export default function Billing() {
  return (
    <div className="pb-12">
      <div className="py-8">
        <Hero 
          title="Billing Management"
          subtitle="Invoicing & Payments"
          description="Comprehensive billing functionalities including automated invoicing, fraud detection, discount recommendations, and deep customer analytics."
          icon={<Receipt className="w-10 h-10" />}
        />
      </div>

      {/* 1. Workflow */}
      <Section title="Billing Workflow">
        <Timeline steps={workflowSteps} />
      </Section>

      {/* 2. Image */}
      <Section title="Workflow Diagram">
        <ImageCard src={billingImg} alt="Billing Workflow Diagram" caption="Comprehensive Billing Workflow and Analytics" />
      </Section>

      {/* 3. Features */}
      <Section title="Billing Dashboard & Features">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <FeatureCard 
              key={idx} 
              title={feat.title} 
              description={feat.desc} 
              icon={feat.icon} 
              delay={idx * 0.1} 
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
