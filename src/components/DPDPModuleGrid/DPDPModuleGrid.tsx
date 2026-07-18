import { memo } from 'react';
import {
  FileText, BarChart3, Users, Database,
  Key, Eye, Building2, TrendingUp, Package, 
  CreditCard, ShieldCheck, Fingerprint, Activity, PiggyBank, 
  UserCheck, Lock, Shield
} from 'lucide-react';
import type { DPDPModuleData, DPDPTheme } from './types';
import DPDPFlipCard from './DPDPFlipCard';

/* ─── Inline SVG helpers ──────────────────────────────────────────────────── */
function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
function CarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2" />
      <circle cx="7" cy="20" r="2" /><path d="M9 17H15" /><circle cx="17" cy="20" r="2" />
    </svg>
  );
}
function ReceiptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

/* ─── Enterprise Theme registry ────────────────────────────────────────────── */
const MODULE_THEMES: Record<string, DPDPTheme> = {
  inventory: {
    name: 'Inventory', cardBg: 'linear-gradient(135deg,#F3ECFF 0%,#E7D9FF 100%)',
    accent: '#9333EA', accentLight: '#C084FC', accentRgb: '147,51,234',
    icon: <Package className="w-6 h-6" />,
  },
  purchase: {
    name: 'Purchase', cardBg: 'linear-gradient(135deg,#EEF5FF 0%,#DCEBFF 100%)',
    accent: '#2563EB', accentLight: '#60A5FA', accentRgb: '37,99,235',
    icon: <ShoppingCartIcon className="w-6 h-6" />,
  },
  sales: {
    name: 'Sales', cardBg: 'linear-gradient(135deg,#ECFDF5 0%,#D1FAE5 100%)',
    accent: '#16A34A', accentLight: '#4ADE80', accentRgb: '22,163,74',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  billing: {
    name: 'Billing', cardBg: 'linear-gradient(135deg,#F5F3FF 0%,#EDE9FE 100%)',
    accent: '#7C3AED', accentLight: '#A78BFA', accentRgb: '124,58,237',
    icon: <ReceiptIcon className="w-6 h-6" />,
  },
  gst: {
    name: 'GST', cardBg: 'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',
    accent: '#EA580C', accentLight: '#FB923C', accentRgb: '234,88,12',
    icon: <FileText className="w-6 h-6" />,
  },
  gate: {
    name: 'Gate Movement', cardBg: 'linear-gradient(135deg,#EEF2FF 0%,#E0E7FF 100%)',
    accent: '#4F46E5', accentLight: '#818CF8', accentRgb: '79,70,229',
    icon: <CarIcon className="w-6 h-6" />,
  },
  payroll: {
    name: 'Payroll', cardBg: 'linear-gradient(135deg,#FFF1F2 0%,#FFE4E6 100%)',
    accent: '#E11D48', accentLight: '#FB7185', accentRgb: '225,29,72',
    icon: <Users className="w-6 h-6" />,
  },
  accounting: {
    name: 'Accounting', cardBg: 'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',
    accent: '#EA580C', accentLight: '#FB923C', accentRgb: '234,88,12',
    icon: <BarChart3 className="w-6 h-6" />,
  },
  banking: {
    name: 'Banking', cardBg: 'linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)',
    accent: '#1D4ED8', accentLight: '#60A5FA', accentRgb: '29,78,216',
    icon: <Building2 className="w-6 h-6" />,
  },
  compliance: {
    name: 'Compliance', cardBg: 'linear-gradient(135deg,#FFFBEB 0%,#FEF3C7 100%)',
    accent: '#D97706', accentLight: '#FBBF24', accentRgb: '217,119,6',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
};

const DPDP_MODULES: DPDPModuleData[] = [
  {
    moduleKey: 'inventory', shortDesc: 'Supply Chain Privacy',
    description: 'Vendor details, transporter records, warehouse personnel, and stock movement data are protected under DPDP Act 2023 with strict access governance.',
    securityIcons: [
      { icon: <Lock className="w-5 h-5" />, label: 'Encryption' },
      { icon: <Shield className="w-5 h-5" />, label: 'Role Access' },
      { icon: <Database className="w-5 h-5" />, label: 'Storage' },
      { icon: <BarChart3 className="w-5 h-5" />, label: 'Audit Logs' },
    ],
    features: ['Warehouse Access Control', 'Vendor Privacy', 'Goods Traceability', 'Stock Tracking'],
    complianceScore: 97, status: 'compliant', owner: 'Supply Chain Team',
    retentionPolicy: '7 years (statutory)', accessModel: 'Role-based (RBAC)',
    auditTrail: 'Full event logging with tamper-proof records',
    protectionLayers: ['AES-256 at rest', 'TLS 1.3 in transit', 'Row-level security', 'Masked exports'],
    implementationNote: 'Data classification enforced at ingestion layer.',
  },
  {
    moduleKey: 'purchase', shortDesc: 'Procurement Privacy',
    description: 'Vendor PAN, GSTIN, bank accounts, POs, and supplier contacts are fully protected under DPDP Act 2023 with encrypted data pipelines.',
    securityIcons: [
      { icon: <Key className="w-5 h-5" />, label: 'Auth Control' },
      { icon: <Eye className="w-5 h-5" />, label: 'Data Masking' },
      { icon: <FileText className="w-5 h-5" />, label: 'PO Security' },
      { icon: <Shield className="w-5 h-5" />, label: 'Vendor Shield' },
    ],
    features: ['Supplier Data Encryption', 'PO Privacy Controls', 'Vendor Identity Security', 'Contract Protections'],
    complianceScore: 96, status: 'compliant', owner: 'Procurement Team',
    retentionPolicy: '5 years (contractual)', accessModel: 'Department-scoped access',
    auditTrail: 'Immutable purchase event log with user attribution',
    protectionLayers: ['Field-level encryption', 'API tokenization', 'PAN masking', 'Approval workflow'],
    implementationNote: 'Vendor PAN/GSTIN stored encrypted, displayed only to authorized roles.',
  },
  {
    moduleKey: 'sales', shortDesc: 'Customer Data Shield',
    description: 'Customer names, addresses, phone, email, and billing data are protected under DPDP Act 2023 with consent-based data handling.',
    securityIcons: [
      { icon: <UserCheck className="w-5 h-5" />, label: 'Consent Mgmt' },
      { icon: <Lock className="w-5 h-5" />, label: 'Encryption' },
      { icon: <Shield className="w-5 h-5" />, label: 'Access Guard' },
      { icon: <Activity className="w-5 h-5" />, label: 'Audit Trail' },
    ],
    features: ['Customer Consent Management', 'Sales Data Encryption', 'CRM Privacy Controls', 'Contact Anonymization'],
    complianceScore: 98, status: 'compliant', owner: 'Sales Operations',
    retentionPolicy: '3 years post transaction', accessModel: 'Consent-gated access',
    auditTrail: 'Customer data access logged with justification',
    protectionLayers: ['Consent register', 'Data minimization', 'Right to erasure workflow', 'Pseudonymization'],
    implementationNote: 'Customer opt-out triggers anonymization within 24 hours.',
  },
  {
    moduleKey: 'billing', shortDesc: 'Invoice Privacy',
    description: 'Customer invoices, billing addresses, GSTIN, and payment data are protected under DPDP Act 2023 with secure financial data governance.',
    securityIcons: [
      { icon: <CreditCard className="w-5 h-5" />, label: 'Payment Sec' },
      { icon: <FileText className="w-5 h-5" />, label: 'Invoice Privacy' },
      { icon: <Lock className="w-5 h-5" />, label: 'Encryption' },
      { icon: <BarChart3 className="w-5 h-5" />, label: 'Audit Logs' },
    ],
    features: ['Invoice Privacy', 'Payment Information Security', 'Billing Address Protection', 'Customer Data Processing'],
    complianceScore: 99, status: 'compliant', owner: 'Finance Team',
    retentionPolicy: '8 years (GST statutory)', accessModel: 'Finance role restricted',
    auditTrail: 'Every invoice access and modification tracked',
    protectionLayers: ['Invoice encryption', 'Payment tokenization', 'GSTIN masking', 'Signed audit log'],
    implementationNote: 'Billing data accessible only to Finance and authorized Accounts roles.',
  },
  {
    moduleKey: 'gst', shortDesc: 'Tax Data Security',
    description: 'GST returns, GSTIN, PAN, taxpayer details and statutory records are protected under DPDP Act 2023 with rigorous compliance audit trails.',
    securityIcons: [
      { icon: <Shield className="w-5 h-5" />, label: 'Tax Shield' },
      { icon: <FileText className="w-5 h-5" />, label: 'Return Sec' },
      { icon: <Database className="w-5 h-5" />, label: 'Audit Trail' },
      { icon: <Lock className="w-5 h-5" />, label: 'Encryption' },
    ],
    features: ['Taxpayer Data Protection', 'GST Return Security', 'Invoice Compliance', 'Statutory Audit Trail'],
    complianceScore: 100, status: 'compliant', owner: 'Tax & Compliance',
    retentionPolicy: '8 years (CGST Act mandate)', accessModel: 'Tax team exclusive access',
    auditTrail: 'End-to-end GST filing lifecycle tracked',
    protectionLayers: ['GSTIN encryption', 'Return signing', 'Secure GSTN API tunnel', 'Non-repudiation logs'],
    implementationNote: 'Integrated with NIC GSTN sandbox with encrypted credentials vault.',
  },
  {
    moduleKey: 'gate', shortDesc: 'Visitor & Access Privacy',
    description: 'Visitor records, driver info, vehicle numbers, gate entry/exit logs, and identity documents are protected under DPDP Act 2023.',
    securityIcons: [
      { icon: <Fingerprint className="w-5 h-5" />, label: 'ID Verify' },
      { icon: <Eye className="w-5 h-5" />, label: 'Visitor Sec' },
      { icon: <Activity className="w-5 h-5" />, label: 'Access Log' },
      { icon: <Shield className="w-5 h-5" />, label: 'Data Shield' },
    ],
    features: ['Vehicle Identity Verification', 'Visitor Privacy', 'Entry & Exit Logging', 'Driver Identity Protection'],
    complianceScore: 95, status: 'compliant', owner: 'Security Operations',
    retentionPolicy: '90 days (operational necessity)', accessModel: 'Security team only',
    auditTrail: 'Time-stamped gate event log with CCTV reference ID',
    protectionLayers: ['Visitor ID masking', 'Biometric data isolation', 'Auto-deletion at retention', 'Encrypted log store'],
    implementationNote: 'Visitor mobile numbers auto-masked in exports; identity docs not retained beyond visit.',
  },
  {
    moduleKey: 'payroll', shortDesc: 'Employee Data Privacy',
    description: 'Employee salary, PAN, Aadhaar, bank details, attendance, PF, ESI, and tax records are protected under DPDP Act 2023.',
    securityIcons: [
      { icon: <Lock className="w-5 h-5" />, label: 'Encrypt' },
      { icon: <Fingerprint className="w-5 h-5" />, label: 'ID Security' },
      { icon: <Shield className="w-5 h-5" />, label: 'Bank Shield' },
      { icon: <Database className="w-5 h-5" />, label: 'Retention' },
    ],
    features: ['Salary Confidentiality', 'Bank Detail Protection', 'Employee Identity Security', 'Payroll Record Retention'],
    complianceScore: 98, status: 'compliant', owner: 'HR & Payroll Team',
    retentionPolicy: '10 years (EPF Act mandate)', accessModel: 'HR & Manager scoped',
    auditTrail: 'Payslip access, export, and modification fully logged',
    protectionLayers: ['Aadhaar tokenization (UIDAI)', 'PAN encryption', 'Salary field masking', 'Bank account vault'],
    implementationNote: 'Aadhaar never stored raw — tokenized per UIDAI guidelines.',
  },
  {
    moduleKey: 'accounting', shortDesc: 'Financial Data Guard',
    description: 'General ledger, journal entries, financial records, bank details and employee accounting data are protected under DPDP Act 2023.',
    securityIcons: [
      { icon: <Lock className="w-5 h-5" />, label: 'Access Ctrl' },
      { icon: <BarChart3 className="w-5 h-5" />, label: 'Audit Trail' },
      { icon: <Shield className="w-5 h-5" />, label: 'Integrity' },
      { icon: <Database className="w-5 h-5" />, label: 'Retention' },
    ],
    features: ['Financial Access Control', 'Transaction Audit Trail', 'Financial Record Integrity', 'Statutory Record Retention'],
    complianceScore: 97, status: 'compliant', owner: 'Accounts Team',
    retentionPolicy: '8 years (Companies Act)', accessModel: 'Accounts + CFO access',
    auditTrail: 'Immutable double-entry journal with revision history',
    protectionLayers: ['Journal signing', 'Ledger encryption', 'Segregation of duties', 'Reconciliation lock'],
    implementationNote: 'Period-close locks prevent backdated entries; dual approval required.',
  },
  {
    moduleKey: 'banking', shortDesc: 'Transaction Privacy',
    description: 'Bank accounts, IFSC codes, beneficiary details, payment transactions and reconciliation records are protected under DPDP Act 2023.',
    securityIcons: [
      { icon: <PiggyBank className="w-5 h-5" />, label: 'Payment Sec' },
      { icon: <Lock className="w-5 h-5" />, label: 'Account Sec' },
      { icon: <UserCheck className="w-5 h-5" />, label: 'ID Verify' },
      { icon: <Activity className="w-5 h-5" />, label: 'Monitoring' },
    ],
    features: ['Secure Payment Authorization', 'Bank Account Protection', 'Beneficiary Verification', 'Transaction Monitoring'],
    complianceScore: 99, status: 'compliant', owner: 'Banking Operations',
    retentionPolicy: '10 years (RBI mandate)', accessModel: 'Treasury & Finance only',
    auditTrail: 'Every payment request, approval, and settlement logged',
    protectionLayers: ['Account number encryption', 'IFSC masking', 'OTP-based payment auth', 'Anomaly detection'],
    implementationNote: 'Bank credentials stored in HSM-backed vault; never in application database.',
  },
  {
    moduleKey: 'compliance', shortDesc: 'Regulatory Data Shield',
    description: 'Compliance documents, approvals, licenses and regulatory data are protected under DPDP Act 2023 with full lifecycle retention management.',
    securityIcons: [
      { icon: <ShieldCheck className="w-5 h-5" />, label: 'Reg. Comply' },
      { icon: <FileText className="w-5 h-5" />, label: 'Doc Security' },
      { icon: <Lock className="w-5 h-5" />, label: 'Data Guard' },
      { icon: <Database className="w-5 h-5" />, label: 'Retention' },
    ],
    features: ['Regulatory Compliance', 'Document Security', 'Data Protection', 'Retention Management'],
    complianceScore: 100, status: 'compliant', owner: 'Legal & Compliance',
    retentionPolicy: 'Per regulation (up to 30 years)', accessModel: 'Legal + Compliance team',
    auditTrail: 'Document lifecycle tracked from creation to disposal',
    protectionLayers: ['Document signing (DSC)', 'Version locking', 'Legal hold workflow', 'Encrypted document vault'],
    implementationNote: 'Automated retention scheduler with legal hold override capability.',
  },
];


/* ─── Grid export ─────────────────────────────────────────────────────────── */
export const DPDPModuleGrid = memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {DPDP_MODULES.map((module, index) => (
      <DPDPFlipCard 
        key={module.moduleKey} 
        data={module} 
        theme={MODULE_THEMES[module.moduleKey]} 
        index={index} 
      />
    ))}
  </div>
));

export default DPDPModuleGrid;
