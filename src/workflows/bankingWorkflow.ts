import type { WorkflowData } from './types';
import type { ModuleWorkflowConfig } from './moduleWorkflowTypes';

export const bankingWorkflow: WorkflowData = {
  nodes: [
    { id: 'entry', label: 'Receipt / Payment Entry', icon: 'CreditCard', x: 20, y: 28, color: 'text-blue-500', tooltip: { purpose: 'Incoming receipt or outgoing vendor payment recorded.' } },
    { id: 'approval', label: 'Multi-level Approval', icon: 'CheckSquare', x: 50, y: 28, color: 'text-indigo-500', tooltip: { purpose: 'Financial approval workflow triggered based on thresholds.' } },
    { id: 'allocation', label: 'Ledger Allocation', icon: 'Database', x: 80, y: 28, color: 'text-purple-500', tooltip: { purpose: 'Transaction mapped to specific invoices or cost centers.' } },
    { id: 'transfer', label: 'Fund Transfer', icon: 'Send', x: 80, y: 72, color: 'text-orange-500', tooltip: { purpose: 'Actual fund transfer executed via bank or cash.' } },
    { id: 'recon', label: 'Bank Reconciliation', icon: 'RefreshCcw', x: 50, y: 72, color: 'text-emerald-500', tooltip: { purpose: 'Automated statement matching and reconciliation.' } },
    { id: 'cashflow', label: 'Cash Flow Update', icon: 'PieChart', x: 20, y: 72, color: 'text-cyan-500', tooltip: { purpose: 'Real-time updating of enterprise liquidity dashboards.' } }
  ],
  edges: [
    { id: 'e1', source: 'entry', target: 'approval' },
    { id: 'e2', source: 'approval', target: 'allocation' },
    { id: 'e3', source: 'allocation', target: 'transfer', path: 'M 80 20 C 95 20, 95 80, 80 80' },
    { id: 'e4', source: 'transfer', target: 'recon' },
    { id: 'e5', source: 'recon', target: 'cashflow' }
  ]
};

export const bankingWorkflowConfig: ModuleWorkflowConfig = {
  moduleName: 'LEDZE+ Banking',
  moduleLabel: 'Banking Module',
  subtitle: 'Cash & Treasury Operations Workflow',
  stepCountLabel: '6 automated steps',
  bannerGradient: 'from-blue-600 via-indigo-700 to-slate-800',
  steps: [
    {
      id: 1, color: 'blue', icon: 'CreditCard',
      title: 'Receipt / Payment Entry',
      description: 'Record incoming customer receipt or outgoing vendor payment with mode selection.',
      purpose: 'Capture every financial inflow or outflow with full reference details before initiating the approval and allocation process.',
      inputs: ['Invoice Reference Number', 'Bank / Cash Mode Selection', 'Transaction Amount & Date'],
      outputs: ['Transaction Voucher (Draft)', 'Pending Approval Request Notification'],
      rules: ['Payments > ₹1,00,000 auto-trigger multi-level approval workflow', 'Cash payments to a single party capped at ₹10,000 per transaction', 'Duplicate transaction detection active to prevent double posting'],
      next: [2],
    },
    {
      id: 2, color: 'indigo', icon: 'ShieldCheck',
      title: 'Multi-level Approval',
      description: 'Validate financial transaction through hierarchy-based approval controls.',
      purpose: 'Enforce internal financial controls and prevent unauthorized outgoing payments through a digital approval hierarchy.',
      inputs: ['Transaction Voucher', 'Approval Matrix Configuration', 'Threshold-based Routing Rules'],
      outputs: ['Approved Payment Authorization', 'Digital Signature Audit Trail'],
      rules: ['Finance Head approval mandatory for RTGS/NEFT > ₹5,00,000', 'Escalation auto-triggers after 4 hours of approver inactivity', 'Rejected payments require re-initiation with updated documentation'],
      next: [3],
    },
    {
      id: 3, color: 'purple', icon: 'Database',
      title: 'Ledger Allocation',
      description: 'Map approved transaction to specific invoices, cost centers, or advance buckets.',
      purpose: 'Ensure every rupee collected or paid is accurately linked to the corresponding financial obligation in the ledger.',
      inputs: ['Approved Transaction', 'Open Invoices / Advance Buckets', 'Cost Center Master'],
      outputs: ['Invoice-level Allocation Entry', 'Partial Payment Tracking Update', 'Suspense Account Flag (if unallocated)'],
      rules: ['Payments allocated to oldest invoice first by default (FIFO)', 'Unallocated amounts parked in suspense account pending review', 'Allocation cannot exceed open invoice amount'],
      next: [4],
    },
    {
      id: 4, color: 'orange', icon: 'Send',
      title: 'Fund Transfer',
      description: 'Execute bank transfer instruction or disburse physical cash with full documentation.',
      purpose: 'Physically move funds to the vendor or customer account as per the approved and allocated transaction.',
      inputs: ['Approved Allocation Reference', 'Beneficiary Bank Account & IFSC', 'NEFT / RTGS / Cheque Details'],
      outputs: ['Bank Transfer Instruction File (NEFT/RTGS)', 'Payment Confirmation Reference', 'Cheque Print Instruction (if applicable)'],
      rules: ['NEFT files generated in RBI-prescribed format automatically', 'Cheque printing auto-triggered for Post-Dated Cheque (PDC) entries', 'Fund transfer timestamp recorded for reconciliation purpose'],
      next: [5],
    },
    {
      id: 5, color: 'emerald', icon: 'RefreshCcw',
      title: 'Bank Reconciliation',
      description: 'Automatically match book entries against imported bank statement line items.',
      purpose: 'Identify unmatched entries, timing differences, and errors to ensure the book balance mirrors the bank balance.',
      inputs: ['Bank Statement Import (CSV / OFX / MT940)', 'GL Ledger Entries for the Period'],
      outputs: ['Bank Reconciliation Statement (BRS)', 'Unmatched Entry Exception List', 'Auto-matched Confirmation Log'],
      rules: ['Auto-matching confidence > 90% auto-approves without manual review', 'Unmatched entries flagged for manual resolution within 3 business days', 'BRS auto-generated at end of each business day'],
      next: [6],
    },
    {
      id: 6, color: 'cyan', icon: 'PieChart',
      title: 'Cash Flow Update',
      description: 'Update enterprise liquidity dashboard with real-time inflow and outflow data.',
      purpose: 'Provide the CFO and Treasury team with a live, accurate view of the enterprise cash position and short-term liquidity.',
      inputs: ['All Reconciled Transactions', 'Opening Bank Balances', 'Scheduled Future Payments'],
      outputs: ['Real-time Cash Position Dashboard', '7-Day Cash Flow Forecast', 'Liquidity Alert Notifications'],
      rules: ['Dashboard auto-refreshes every 15 minutes during business hours', 'Liquidity alert triggers if balance falls below pre-set threshold', 'Separate views for entity-level and consolidated cash positions'],
      next: [],
    },
  ],
  extraFeatures: [
    { icon: 'Building2',    color: 'blue',    title: 'Multi-bank Support',   desc: 'Centralized treasury across all company bank accounts.' },
    { icon: 'Clock',        color: 'indigo',  title: 'PDC Management',       desc: 'Full lifecycle of post-dated cheques with auto-alerts.' },
    { icon: 'Wallet',       color: 'purple',  title: 'Petty Cash',           desc: 'Structured petty cash management with approval controls.' },
    { icon: 'FileText',     color: 'orange',  title: 'NEFT / RTGS Files',    desc: 'Auto-generated bank-compliant payment instruction files.' },
    { icon: 'BarChart3',    color: 'emerald', title: 'Cash Flow Forecasting', desc: '7/30-day liquidity projections for treasury planning.' },
    { icon: 'ShieldCheck',  color: 'cyan',    title: 'Fraud Prevention',     desc: 'Multi-level payment approvals prevent unauthorized outflows.' },
    { icon: 'RefreshCcw',   color: 'rose',    title: 'Auto BRS',             desc: 'AI-driven bank statement matching with high accuracy.' },
    { icon: 'ArrowLeftRight', color: 'amber', title: 'Fund Transfers',       desc: 'Complex inter-bank and inter-branch fund movements.' },
    { icon: 'TrendingUp',   color: 'teal',    title: 'Liquidity Analytics',  desc: 'Real-time enterprise-wide cash position monitoring.' },
  ],
  benefits: [
    { icon: 'Eye',         color: 'blue',    text: 'Real-time visibility into enterprise cash flow' },
    { icon: 'ShieldCheck', color: 'indigo',  text: 'Multi-level approvals prevent unauthorized payments' },
    { icon: 'Zap',         color: 'emerald', text: 'Automated bank reconciliation eliminates manual errors' },
    { icon: 'Lock',        color: 'purple',  text: 'Complete audit trail for every payment transaction' },
    { icon: 'BarChart3',   color: 'orange',  text: 'Accurate cash flow forecasting for working capital' },
    { icon: 'Link',        color: 'cyan',    text: 'Seamless Accounting, Sales & Payroll integration' },
  ],
};
