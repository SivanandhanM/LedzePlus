import { useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import { Building2 } from 'lucide-react';

export default function Banking() {
  // Scroll to top on mount
  useEffect(() => {
    const container = document.getElementById('scroll-container');
    container?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ '--color-primary': '29 78 216', '--color-primary-hex': '#1D4ED8' } as React.CSSProperties} className="relative pb-16 overflow-hidden">
      <div className="relative z-10">
        <Hero
          title="Banking Module"
          subtitle="Enterprise Banking Operations"
          description="Manage corporate bank accounts, reconcile transactions, and automate payment workflows with secure integration."
          icon={<Building2 className="w-10 h-10" />}
        />
        
        <Section title="Overview" centerHeader>
          <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 dark:text-slate-300 mt-8">
            <p className="text-xl font-medium">Banking module is currently under development.</p>
          </div>
        </Section>
      </div>
    </div>
  );
}
