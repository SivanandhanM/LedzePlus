import { useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import { Lock } from 'lucide-react';
import { m } from 'framer-motion';
import { DPDPModuleGrid } from '../../components/DPDPModuleGrid/DPDPModuleGrid';

export default function DPDPCompliance() {
  // Scroll to top on mount
  useEffect(() => {
    const container = document.getElementById('scroll-container');
    container?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ '--color-primary': '217 119 6', '--color-primary-hex': '#D97706' } as React.CSSProperties} className="relative pb-16 overflow-hidden">
      {/* Background Enhancements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <m.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] -left-1/4 w-[800px] h-[800px] bg-amber-200/40 dark:bg-amber-900/10 rounded-full blur-[120px]"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        />
        <m.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute bottom-[5%] right-[-10%] w-[600px] h-[600px] bg-yellow-200/30 dark:bg-yellow-900/10 rounded-full blur-[100px]"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        />
      </div>

      <div className="relative z-10">
        <Hero
          title="DPDP Act Compliance"
          subtitle="Data Privacy & Protection"
          description="LEDZE+ ensures complete compliance with the Digital Personal Data Protection (DPDP) Act 2023 across all enterprise modules. We implement strict data governance, secure personal information, and guarantee privacy by design for employees, customers, and vendors."
          icon={<Lock className="w-10 h-10" />}
        />

        <Section title="Module-wise DPDP Protection Framework">
          <DPDPModuleGrid />
        </Section>
      </div>
    </div>
  );
}
