import type { WorkflowData } from './types';
import type { ModuleWorkflowConfig } from './moduleWorkflowTypes';

export const accountingWorkflow: WorkflowData = {
  nodes: [
    { id: 'subledger', label: 'Sub-ledger Posting', icon: 'Database', x: 20, y: 28, color: 'text-slate-500', tooltip: { purpose: 'Automated entries from Sales, Purchase, and Payroll modules.' } },
    { id: 'journal', label: 'Journal Entry', icon: 'Edit3', x: 50, y: 28, color: 'text-blue-500', tooltip: { purpose: 'Manual adjustments and accruals posted to the General Ledger.' } },
    { id: 'tb', label: 'Trial Balance', icon: 'Scale', x: 80, y: 28, color: 'text-indigo-500', tooltip: { purpose: 'Generation of pre-close Trial Balance to ensure debits equal credits.' } },
    { id: 'recon', label: 'Reconciliation', icon: 'CheckSquare', x: 80, y: 72, color: 'text-emerald-500', tooltip: { purpose: 'Bank, Inventory, and Inter-company accounts reconciled.' } },
    { id: 'reports', label: 'Financial Reports', icon: 'PieChart', x: 50, y: 72, color: 'text-purple-500', tooltip: { purpose: 'P&L, Balance Sheet, and Cash Flow statements finalized.' } },
    { id: 'close', label: 'Period Closing', icon: 'Lock', x: 20, y: 72, color: 'text-rose-500', tooltip: { purpose: 'Accounting period hard-closed to prevent further postings.' } }
  ],
  edges: [
    { id: 'e1', source: 'subledger', target: 'journal' },
    { id: 'e2', source: 'journal', target: 'tb' },
    { id: 'e3', source: 'tb', target: 'recon', path: 'M 80 20 C 95 20, 95 80, 80 80' },
    { id: 'e4', source: 'recon', target: 'reports' },
    { id: 'e5', source: 'reports', target: 'close' }
  ]
};

export const accountingWorkflowConfig: ModuleWorkflowConfig = {
  moduleName: 'LEDZE+ Accounting',
  moduleLabel: 'Accounting Module',
  subtitle: 'Financial Close & Reporting Workflow',
  stepCountLabel: '6 automated steps',
  bannerGradient: 'from-orange-500 via-amber-600 to-yellow-600',
  steps: [
    {
      id: 1, color: 'amber', icon: 'Database',
      title: 'Sub-ledger Posting',
      description: 'Automated journal entries generated from Sales, Purchase, and Payroll sub-modules.',
      purpose: 'Ensure every operational transaction from across the ERP is automatically reflected in the General Ledger without manual data entry.',
      inputs: ['Sales Invoices & Receipts', 'Purchase Bills & Payments', 'Payroll Disbursement Registers'],
      outputs: ['Auto-generated Journal Vouchers', 'Sub-ledger Entries', 'Cost Center Allocations'],
      rules: ['All sub-module transactions auto-post without manual intervention', 'Voucher series cannot be duplicated across periods', 'Cost center allocation mandatory for expenses > ₹10,000'],
      next: [2],
    },
    {
      id: 2, color: 'orange', icon: 'Edit3',
      title: 'Journal Entry',
      description: 'Manual adjustments, accruals, provisions, and reclassifications posted to GL.',
      purpose: 'Allow authorized finance personnel to record non-automated transactions and period-end adjustments accurately.',
      inputs: ['Adjustment Request with Supporting Documents', 'Accrual Schedules', 'Provision Calculations'],
      outputs: ['Manual Journal Entry', 'Period Accrual / Provision', 'Narration-linked Audit Record'],
      rules: ['Manual entries > ₹50,000 require Finance Manager approval', 'Backdated entries restricted by period lock enforcement', 'All manual entries must carry supporting document attachment'],
      next: [3],
    },
    {
      id: 3, color: 'blue', icon: 'Scale',
      title: 'Trial Balance',
      description: 'Generate pre-close Trial Balance verifying that total debits equal total credits.',
      purpose: 'Validate the mathematical accuracy of all accounting entries before initiating reconciliation and financial statement preparation.',
      inputs: ['All Posted Journal Entries for the Period'],
      outputs: ['Trial Balance Report', 'Debit-Credit Discrepancy Alert', 'Account-wise Ledger Summary'],
      rules: ['System auto-alerts Finance Team if TB does not tally to zero', 'Pre-close TB generated automatically 3 days before period end', 'Preliminary and final TB versions maintained separately'],
      next: [4],
    },
    {
      id: 4, color: 'emerald', icon: 'CheckSquare',
      title: 'Reconciliation',
      description: 'Match book balances with bank statements, inventory ledger, and inter-company accounts.',
      purpose: 'Identify and resolve discrepancies between internal records and external documents to ensure balance sheet integrity.',
      inputs: ['Bank Statement Import (CSV/OFX)', 'Inventory Valuation Report', 'Inter-company Account Balances'],
      outputs: ['Bank Reconciliation Statement (BRS)', 'Inventory Ledger Match Report', 'Variance List for Resolution'],
      rules: ['Outstanding entries > 30 days auto-escalated to Finance Head', 'Bank statement import triggers auto-matching engine', 'All reconciling items require sign-off before period close'],
      next: [5],
    },
    {
      id: 5, color: 'purple', icon: 'PieChart',
      title: 'Financial Reports',
      description: 'Generate final P&L, Balance Sheet, and Cash Flow statements for management.',
      purpose: 'Produce auditor-ready, compliant financial statements that accurately represent the enterprise financial position.',
      inputs: ['Reconciled Trial Balance', 'Period-end Accruals & Provisions', 'Comparative Period Data'],
      outputs: ['Profit & Loss Statement', 'Balance Sheet', 'Cash Flow Statement', 'Notes to Accounts'],
      rules: ['Reports auto-distributed to Board on 5th of each month', 'Comparative period analysis included by default', 'GAAP / Ind-AS compliant presentation enforced by system'],
      next: [6],
    },
    {
      id: 6, color: 'rose', icon: 'Lock',
      title: 'Period Closing',
      description: 'Hard-close the accounting period to prevent any backdated postings.',
      purpose: 'Finalize and protect the period\'s financial data by locking all posting activity after management and auditor sign-off.',
      inputs: ['Approved Financial Reports', 'Auditor Sign-off Confirmation', 'CFO Authorization'],
      outputs: ['Closed Period Flag', 'Opening Balance for Next Period', 'Year-end Carry-forward Entries'],
      rules: ['Period close requires CFO digital signature', 'No entries permitted in closed periods under any circumstance', 'Closing triggers automatic opening balance creation for next period'],
      next: [],
    },
  ],
  extraFeatures: [
    { icon: 'BookOpen',     color: 'amber',   title: 'General Ledger',       desc: 'Account-wise transaction history with drill-down.' },
    { icon: 'CalendarDays', color: 'orange',  title: 'Day Book',             desc: 'Chronological voucher log for complete audit trail.' },
    { icon: 'BarChart2',    color: 'blue',    title: 'MIS Reports',          desc: 'Custom management reports by cost center or entity.' },
    { icon: 'DollarSign',   color: 'emerald', title: 'Multi-currency',       desc: 'Forex revaluation and multi-entity consolidation.' },
    { icon: 'FileText',     color: 'purple',  title: 'Statutory Reports',    desc: 'Auto-generated GST summaries and tax schedules.' },
    { icon: 'ShieldCheck',  color: 'rose',    title: 'Audit Trail',          desc: 'Immutable log of all postings and modifications.' },
    { icon: 'Layers',       color: 'cyan',    title: 'Cost Center Tracking', desc: 'Department-wise expense allocation and analysis.' },
    { icon: 'TrendingUp',   color: 'indigo',  title: 'Budget vs Actuals',    desc: 'Variance analysis against approved annual budget.' },
    { icon: 'RefreshCw',    color: 'teal',    title: 'Auto Recon',           desc: 'AI-driven bank statement matching with 95%+ accuracy.' },
  ],
  benefits: [
    { icon: 'Zap',         color: 'amber',   text: 'Fully automated sub-module ledger postings' },
    { icon: 'ShieldCheck', color: 'orange',  text: 'Strict period locking prevents data manipulation' },
    { icon: 'Eye',         color: 'blue',    text: 'Real-time financial health visibility for CFOs' },
    { icon: 'CheckCircle2',color: 'emerald', text: 'Audit-ready immutable trail for all transactions' },
    { icon: 'Globe',       color: 'purple',  text: 'Multi-currency and multi-entity consolidation' },
    { icon: 'BarChart3',   color: 'rose',    text: 'Instant P&L, Balance Sheet & Cash Flow generation' },
  ],
};
