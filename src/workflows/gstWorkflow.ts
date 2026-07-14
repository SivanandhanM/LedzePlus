import type { WorkflowData } from './types';
import type { ModuleWorkflowConfig } from './moduleWorkflowTypes';

export const gstWorkflow: WorkflowData = {
  nodes: [
    { id: 'log', label: 'Transaction Logging', icon: 'Edit', x: 20, y: 28, color: 'text-blue-500', tooltip: { purpose: 'Sales, Purchase, or Journal entry recorded with taxes.' } },
    { id: 'validate', label: 'Tax Validation', icon: 'CheckCircle2', x: 50, y: 28, color: 'text-indigo-500', tooltip: { purpose: 'System auto-computes GST and verifies HSN/SAC codes.' } },
    { id: 'einvoice', label: 'E-Invoice Generation', icon: 'FileText', x: 80, y: 28, color: 'text-purple-500', tooltip: { purpose: 'Real-time API push to IRP for Invoice Reference Number.' } },
    { id: 'eway', label: 'E-Way Bill Creation', icon: 'Truck', x: 80, y: 72, color: 'text-orange-500', tooltip: { purpose: 'Logistics details synced to NIC portal for E-Way bill.' } },
    { id: 'itc', label: 'ITC Reconciliation', icon: 'RefreshCw', x: 50, y: 72, color: 'text-emerald-500', tooltip: { purpose: 'Automated GSTR-2B matching for Input Tax Credit claims.' } },
    { id: 'filing', label: 'Government Filing', icon: 'Landmark', x: 20, y: 72, color: 'text-cyan-500', tooltip: { purpose: 'Direct filing of GSTR-1 and GSTR-3B returns via API.' } }
  ],
  edges: [
    { id: 'e1', source: 'log', target: 'validate' },
    { id: 'e2', source: 'validate', target: 'einvoice' },
    { id: 'e3', source: 'einvoice', target: 'eway', path: 'M 80 20 C 95 20, 95 80, 80 80' },
    { id: 'e4', source: 'eway', target: 'itc' },
    { id: 'e5', source: 'itc', target: 'filing' }
  ]
};

export const gstWorkflowConfig: ModuleWorkflowConfig = {
  moduleName: 'LEDZE+ GST',
  moduleLabel: 'GST & Tax Module',
  subtitle: 'End-to-End Tax Compliance Workflow',
  stepCountLabel: '6 automated steps',
  bannerGradient: 'from-amber-500 via-orange-600 to-red-600',
  steps: [
    {
      id: 1, color: 'amber', icon: 'Edit3',
      title: 'Transaction Logging',
      description: 'Record sales, purchase, or journal entries with complete GST component details.',
      purpose: 'Capture every financial transaction with full tax data to form the foundational dataset for all GST compliance activities.',
      inputs: ['Invoice / Bill Details', 'Party GSTIN', 'HSN / SAC Codes', 'Place of Supply'],
      outputs: ['Transaction Record with Auto-computed Tax Amounts', 'SGST / CGST / IGST Split', 'ITC Eligibility Flag'],
      rules: ['HSN code validation mandatory for all line items', 'Inter-state vs Intra-state tax split auto-determined by Place of Supply', 'RCM (Reverse Charge) transactions flagged automatically'],
      next: [2],
    },
    {
      id: 2, color: 'orange', icon: 'CheckCircle2',
      title: 'Tax Validation',
      description: 'System auto-computes GST and verifies GSTIN validity and HSN compliance.',
      purpose: 'Prevent incorrect tax postings and filing errors by validating all tax-related data against GSTN records in real-time.',
      inputs: ['Transaction Data', 'Tax Rate Master (HSN-wise)', 'GSTN Portal API Connection'],
      outputs: ['Validated Tax Computation', 'GSTIN Validity Confirmation', 'Blocked ITC Notification (if any)'],
      rules: ['GSTIN validity verified via GSTN API on every transaction', 'ITC blocked automatically if vendor\'s GSTR-1 is not filed', 'System alerts for HSN code mismatches against tax rate configuration'],
      next: [3],
    },
    {
      id: 3, color: 'blue', icon: 'FileText',
      title: 'E-Invoice Generation',
      description: 'Real-time API push to IRP portal for Invoice Reference Number (IRN) generation.',
      purpose: 'Achieve statutory compliance by submitting invoice data to the GSTN Invoice Registration Portal and obtaining a unique IRN.',
      inputs: ['Invoice JSON Payload (Schema-compliant)', 'IRP API Credentials', 'Digital Signature Certificate (DSC)'],
      outputs: ['IRN (Invoice Reference Number)', 'Signed Invoice with QR Code', 'IRP Acknowledgment Number & Timestamp'],
      rules: ['E-Invoice mandatory for B2B taxpayers with annual turnover > ₹5 Cr', 'Cancellation of IRN only allowed within 24 hours of generation', 'QR code must be printed on all physical invoice copies'],
      next: [4],
    },
    {
      id: 4, color: 'purple', icon: 'Truck',
      title: 'E-Way Bill Creation',
      description: 'Generate logistics compliance document for goods movement via NIC portal API.',
      purpose: 'Ensure legal goods movement by generating the mandatory E-Way Bill document before dispatch of consignments.',
      inputs: ['Invoice Details', 'Transporter GSTIN', 'Vehicle Number', 'Consignment Distance'],
      outputs: ['E-Way Bill Number (EWB)', 'EWB QR Code', 'Validity Period Calculation'],
      rules: ['E-Way Bill mandatory for all consignment values > ₹50,000', 'Validity calculated at 100 km per day for motorized vehicles', 'Extension of expired EWB allowed only for in-transit emergencies'],
      next: [5],
    },
    {
      id: 5, color: 'emerald', icon: 'RefreshCw',
      title: 'ITC Reconciliation',
      description: 'Match auto-fetched GSTR-2B with purchase register to maximize ITC claims.',
      purpose: 'Prevent ITC reversal and maximise legitimate Input Tax Credit claims by reconciling supplier-reported invoices with purchase records.',
      inputs: ['GSTR-2B Auto-fetched Data', 'Purchase Ledger / Register', 'ITC Availed Ledger'],
      outputs: ['Reconciliation Report (Matched / Unmatched)', 'Eligible ITC Amount', 'Vendor Discrepancy Follow-up List'],
      rules: ['ITC claimed only for invoices matched in GSTR-2B', 'Unmatched invoices flagged for vendor rectification within 2 months', 'Provisional ITC limited to 5% of GSTR-2B eligible credit'],
      next: [6],
    },
    {
      id: 6, color: 'cyan', icon: 'Landmark',
      title: 'Government Filing',
      description: 'Direct API-based filing of GSTR-1 and GSTR-3B returns to the GSTN portal.',
      purpose: 'Complete the compliance cycle by electronically submitting reconciled returns to the government and settling net tax liability.',
      inputs: ['Reconciled Outward Supply Data (GSTR-1)', 'Net Tax Liability (GSTR-3B)', 'Cash / ITC Ledger Balances'],
      outputs: ['GSTR Filing Acknowledgment Number', 'Filed Return PDF', 'Tax Payment Challan (if cash payment required)'],
      rules: ['GSTR-1 due by 11th of following month', 'GSTR-3B due by 20th of following month', 'System auto-calculates late filing interest and penalty'],
      next: [],
    },
  ],
  extraFeatures: [
    { icon: 'FileSpreadsheet', color: 'amber',   title: 'GSTR-9 Annual Return', desc: 'Automated year-end annual return preparation.' },
    { icon: 'Calculator',      color: 'orange',  title: 'TDS Computation',      desc: 'Section-wise TDS and Form 26Q challan generation.' },
    { icon: 'ShieldCheck',     color: 'blue',    title: 'Vendor Compliance',    desc: 'GSTIN validity and filing status verification.' },
    { icon: 'ScanLine',        color: 'purple',  title: 'OCR Invoice Scan',     desc: 'AI-powered vendor invoice digitization and data extraction.' },
    { icon: 'BarChart3',       color: 'emerald', title: 'GST Dashboard',        desc: 'Executive view of ITC, liability, and filing status.' },
    { icon: 'AlertTriangle',   color: 'rose',    title: 'Compliance Alerts',    desc: 'Pre-due-date reminders for all GST return deadlines.' },
    { icon: 'Globe',           color: 'cyan',    title: 'Multi-GSTIN Support',  desc: 'Single platform for multiple GST registrations.' },
    { icon: 'RefreshCw',       color: 'indigo',  title: 'GSTR-2A Matching',     desc: 'Auto-reconciliation of auto-populated purchase data.' },
    { icon: 'Receipt',         color: 'teal',    title: 'HSN Master',           desc: 'Centralized HSN/SAC code repository with tax rate mapping.' },
  ],
  benefits: [
    { icon: 'Zap',         color: 'amber',   text: 'Fully automated GST return preparation and filing' },
    { icon: 'ShieldCheck', color: 'orange',  text: 'Real-time GSTIN validation prevents compliance errors' },
    { icon: 'BarChart3',   color: 'blue',    text: 'Maximum ITC recovery through intelligent reconciliation' },
    { icon: 'Eye',         color: 'purple',  text: 'Complete tax liability visibility through one dashboard' },
    { icon: 'Globe',       color: 'emerald', text: 'Direct GSTN portal integration eliminates manual uploads' },
    { icon: 'BellRing',    color: 'cyan',    text: 'Automated deadline alerts prevent late filing penalties' },
  ],
};
