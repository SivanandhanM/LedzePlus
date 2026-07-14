import { useEffect } from 'react';
import Hero, { MODULE_THEMES } from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Images
import bankingImg from '../../assets/images/all_cards/banking_a.png';
import billingImg from '../../assets/images/all_cards/billing_a.png';
import complianceImg from '../../assets/images/all_cards/compliance_a.png';
import gateImg from '../../assets/images/all_cards/gate_a.png';
import gstImg from '../../assets/images/all_cards/gst_a.png';
import inventoryImg from '../../assets/images/all_cards/inventory_a.png';
import payrollImg from '../../assets/images/all_cards/payroll_a.png';
import accountingImg from '../../assets/images/all_cards/accounting_a.png';

const dpdpData = [
  {
    module: 'Banking',
    image: bankingImg,
    theme: 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-emerald-500/10',
    description: 'Customer bank accounts, IFSC codes, beneficiary details, payment transactions, and reconciliation records are protected under DPDP Act 2023.',
    features: ['Secure Payment Authorization', 'Bank Account Protection', 'Beneficiary Verification', 'Transaction Monitoring']
  },
  {
    module: 'Billing',
    image: billingImg,
    theme: 'bg-pink-50 text-pink-900 border-pink-200 shadow-pink-500/10',
    description: 'Customer invoices, billing addresses, GSTIN, contact details, and payment information are protected under DPDP Act 2023.',
    features: ['Invoice Privacy', 'Payment Information Security', 'Billing Address Protection', 'Customer Data Processing']
  },
  {
    module: 'Compliance',
    image: complianceImg,
    theme: 'bg-amber-50 text-amber-900 border-amber-200 shadow-amber-500/10',
    description: 'All compliance documents, approvals, licenses, and regulatory data containing personal information are protected under DPDP Act 2023.',
    features: ['Regulatory Compliance', 'Document Security', 'Data Protection', 'Retention Management']
  },
  {
    module: 'Gate Movement',
    image: gateImg,
    theme: 'bg-blue-50 text-blue-900 border-blue-200 shadow-blue-500/10',
    description: 'Visitor records, driver information, vehicle registration numbers, mobile numbers, gate entry/exit logs, and identity documents are protected under DPDP Act 2023.',
    features: ['Vehicle Identity Verification', 'Visitor Privacy', 'Entry & Exit Logging', 'Driver Identity Protection']
  },
  {
    module: 'GST',
    image: gstImg,
    theme: 'bg-teal-50 text-teal-900 border-teal-200 shadow-teal-500/10',
    description: 'GST returns, GSTIN, PAN, taxpayer details, invoices, and statutory tax records are protected under DPDP Act 2023.',
    features: ['Taxpayer Data Protection', 'GST Return Security', 'Invoice Compliance', 'Statutory Audit Trail']
  },
  {
    module: 'Inventory',
    image: inventoryImg,
    theme: 'bg-purple-50 text-purple-900 border-purple-200 shadow-purple-500/10',
    description: 'Vendor information, transporter details, warehouse personnel records, and stock movement data containing personal information are protected under DPDP Act 2023.',
    features: ['Transporter Privacy', 'Stock Movement Tracking', 'Warehouse Access Control', 'Goods Traceability']
  },
  {
    module: 'Payroll',
    image: payrollImg,
    theme: 'bg-orange-50 text-orange-900 border-orange-200 shadow-orange-500/10',
    description: 'Employee salary, PAN, Aadhaar, bank account details, attendance, PF, ESI, and tax information are protected under DPDP Act 2023.',
    features: ['Salary Confidentiality', 'Bank Detail Protection', 'Employee Identity Security', 'Payroll Record Retention']
  },
  {
    module: 'Accounting',
    image: accountingImg,
    theme: 'bg-indigo-50 text-indigo-900 border-indigo-200 shadow-indigo-500/10',
    description: 'General ledger, journal entries, customer/vendor financial records, bank details, and employee-related accounting data are protected under DPDP Act 2023.',
    features: ['Financial Access Control', 'Transaction Audit Trail', 'Financial Record Integrity', 'Statutory Record Retention']
  }
];

export default function DPDPCompliance() {
  // Scroll to top on mount
  useEffect(() => {
    const container = document.getElementById('scroll-container');
    container?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative pb-16 overflow-hidden">
      {/* Background Enhancements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[10%] -left-1/4 w-[800px] h-[800px] bg-teal-200/40 dark:bg-teal-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Hero
          title="DPDP Act Compliance"
          subtitle="Data Privacy & Protection"
          description="LEDZE+ ensures complete compliance with the Digital Personal Data Protection (DPDP) Act 2023 across all enterprise modules. We implement strict data governance, secure personal information, and guarantee privacy by design for employees, customers, and vendors."
          icon={<Lock className="w-10 h-10" />}
          theme={MODULE_THEMES.dpdp}
        />

        <Section title="Module-wise DPDP Protection Framework">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
            {dpdpData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col h-full group"
              >
                {/* Image Card Container */}
                <div className="relative w-full rounded-[28px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] mb-4 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.2)]">
                  <img
                    src={item.image}
                    alt={`${item.module} DPDP Compliance`}
                    className="w-full h-auto object-cover border border-slate-200/50 dark:border-slate-700/50 rounded-[28px]"
                  />
                  {/* Subtle Glass overlay on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 dark:group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Extracted Accessible Content */}
                <div className={`flex-1 p-6 rounded-[24px] border border-white/40 dark:border-slate-700 backdrop-blur-xl ${item.theme} dark:bg-slate-800/80 dark:text-slate-200 dark:shadow-none shadow-lg transition-all duration-300`}>
                  <h3 className="text-lg font-bold mb-3 opacity-90">{item.module} Data Protection</h3>
                  <p className="text-sm leading-relaxed mb-5 opacity-80 font-medium">
                    {item.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-[11px] uppercase tracking-wider font-bold opacity-70 mb-2">Key Security Features</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs font-semibold opacity-90">
                          <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
