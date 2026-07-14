import type { WorkflowData } from './types';
import type { ModuleWorkflowConfig } from './moduleWorkflowTypes';

export const billingWorkflow: WorkflowData = {
  nodes: [
    { id: 'dispatch', label: 'Dispatch Validation', icon: 'Truck', x: 20, y: 28, color: 'text-blue-500', tooltip: { purpose: 'System verifies dispatch note for billing eligibility.' } },
    { id: 'invoice', label: 'Invoice Generation', icon: 'FileText', x: 50, y: 28, color: 'text-indigo-500', tooltip: { purpose: 'Proforma or Tax Invoice generated automatically.' } },
    { id: 'eway', label: 'E-Way Bill & E-Invoice', icon: 'Globe', x: 80, y: 28, color: 'text-purple-500', tooltip: { purpose: 'Government portal integration for tax compliance.' } },
    { id: 'delivery', label: 'Customer Delivery', icon: 'Mail', x: 80, y: 72, color: 'text-orange-500', tooltip: { purpose: 'Automated email dispatch of invoice to the customer.' } },
    { id: 'tracking', label: 'Receivables Tracking', icon: 'Calendar', x: 50, y: 72, color: 'text-emerald-500', tooltip: { purpose: 'System monitors due dates and sends automated reminders.' } },
    { id: 'collection', label: 'Payment Collection', icon: 'Banknote', x: 20, y: 72, color: 'text-cyan-500', tooltip: { purpose: 'Payment recorded, reconciled, and ledger updated.' } }
  ],
  edges: [
    { id: 'e1', source: 'dispatch', target: 'invoice' },
    { id: 'e2', source: 'invoice', target: 'eway' },
    { id: 'e3', source: 'eway', target: 'delivery', path: 'M 80 20 C 95 20, 95 80, 80 80' },
    { id: 'e4', source: 'delivery', target: 'tracking' },
    { id: 'e5', source: 'tracking', target: 'collection' }
  ]
};

export const billingWorkflowConfig: ModuleWorkflowConfig = {
  moduleName: 'LEDZE+ Billing',
  moduleLabel: 'Billing Module',
  subtitle: 'Invoice-to-Collection Automation Workflow',
  stepCountLabel: '6 automated steps',
  bannerGradient: 'from-pink-600 via-purple-600 to-indigo-700',
  steps: [
    {
      id: 1, color: 'blue', icon: 'Truck',
      title: 'Dispatch Validation',
      description: 'System verifies the dispatch note for billing eligibility before invoice creation.',
      purpose: 'Ensure invoicing is triggered only against confirmed, approved outward dispatches to prevent unauthorized billing.',
      inputs: ['Dispatch Note Reference', 'Sales Order / Customer PO', 'Customer Master Details'],
      outputs: ['Billing Eligibility Confirmation', 'Invoice Draft Trigger', 'Customer Credit Check Result'],
      rules: ['Invoice can only be raised against a confirmed, signed dispatch note', 'Partial dispatch auto-generates proportional partial invoice', 'Customer outstanding credit check performed before invoice creation'],
      next: [2],
    },
    {
      id: 2, color: 'pink', icon: 'FileText',
      title: 'Invoice Generation',
      description: 'Auto-generate proforma or final GST-compliant tax invoice from dispatch data.',
      purpose: 'Convert a physical dispatch into a legally valid financial document with all statutory requirements.',
      inputs: ['Validated Dispatch Note', 'Customer GSTIN', 'Price / Tax Configuration', 'Payment Terms'],
      outputs: ['Draft Tax Invoice / Proforma', 'PDF Preview for Review', 'Invoice Serial Number (Sequential)'],
      rules: ['Invoice numbering follows a strict sequential series (non-editable)', 'Proforma invoices cannot be used for accounting or tax purposes', 'Discount and scheme auto-applied from customer-specific configuration'],
      next: [3],
    },
    {
      id: 3, color: 'purple', icon: 'Globe',
      title: 'E-Way Bill & E-Invoice',
      description: 'Submit invoice to government portals for IRN generation and E-Way Bill creation.',
      purpose: 'Achieve full statutory compliance by submitting invoice data to GSTN/IRP and NIC portals in real-time.',
      inputs: ['Finalized Invoice Details', 'Transporter GSTIN & Vehicle Number', 'HSN / SAC Codes'],
      outputs: ['IRN (Invoice Reference Number)', 'Signed E-Invoice with QR Code', 'E-Way Bill Number (EWB)'],
      rules: ['E-Invoice mandatory for eligible B2B taxpayers (> ₹5 Cr turnover)', 'E-Way Bill auto-cancelled if invoice is cancelled within 24 hours', 'QR code printed on all physical invoice copies'],
      next: [4],
    },
    {
      id: 4, color: 'orange', icon: 'Mail',
      title: 'Customer Delivery',
      description: 'Automatically deliver finalized invoice to customer via email and portal.',
      purpose: 'Ensure prompt and documented delivery of the invoice to the customer to initiate the payment timeline.',
      inputs: ['Finalized Invoice with IRN & QR', 'Customer Email & Portal Access', 'Digital Signature Configuration'],
      outputs: ['Email Delivery Acknowledgment', 'Portal Notification', 'Invoice Delivery Timestamp Log'],
      rules: ['Invoice auto-emailed to customer within 5 minutes of finalization', 'PDF attached with digital signature for authenticity', 'Delivery failure triggers alternate communication channel'],
      next: [5],
    },
    {
      id: 5, color: 'emerald', icon: 'CalendarDays',
      title: 'Receivables Tracking',
      description: 'Monitor payment due dates and send automated reminders to customers.',
      purpose: 'Actively manage accounts receivable to minimize Days Sales Outstanding (DSO) and reduce bad debt risk.',
      inputs: ['Invoice Due Date', 'Outstanding Amount', 'Customer Contact Details'],
      outputs: ['Accounts Receivable Aging Report', 'Automated Reminder Email / SMS', 'Escalation Notification to Sales/Management'],
      rules: ['1st reminder auto-sent on due date', '2nd reminder at 7 days overdue', 'Management escalation triggered at 30 days overdue', 'Collection target tracked per salesperson'],
      next: [6],
    },
    {
      id: 6, color: 'cyan', icon: 'Banknote',
      title: 'Payment Collection',
      description: 'Record payment, reconcile with outstanding invoices, and update GL ledger.',
      purpose: 'Close the billing cycle by capturing payment and ensuring the Accounts Receivable ledger reflects the current outstanding balance.',
      inputs: ['Customer Payment Details & Mode', 'Invoice Reference Numbers for Allocation'],
      outputs: ['Payment Receipt Voucher', 'Outstanding Ledger Update', 'Accounting Ledger Entry', 'Collection Confirmation'],
      rules: ['Advance payments auto-applied to oldest open invoice', 'TDS deduction amount tracked separately for Form 26AS', 'Excess collection parked in advance account for future adjustment'],
      next: [],
    },
  ],
  extraFeatures: [
    { icon: 'BarChart3',    color: 'pink',    title: 'Revenue Analytics',    desc: 'Customer-wise and product-wise revenue performance.' },
    { icon: 'AlertOctagon', color: 'purple',  title: 'Credit & Debit Notes', desc: 'Instant C/D notes linked to original invoice.' },
    { icon: 'Clock',        color: 'indigo',  title: 'Outstanding Tracking', desc: 'Unified aging view of all customer receivables.' },
    { icon: 'BellRing',     color: 'orange',  title: 'Dunning Automation',   desc: 'Graduated automated reminders for overdue payments.' },
    { icon: 'Globe',        color: 'emerald', title: 'Multi-currency',       desc: 'Invoicing in foreign currencies with rate management.' },
    { icon: 'ShieldAlert',  color: 'blue',    title: 'Fraud Detection',      desc: 'ML-powered detection of duplicate invoice attempts.' },
    { icon: 'FileSignature',color: 'cyan',    title: 'Digital Signatures',   desc: 'Legally valid signed invoices for all customers.' },
    { icon: 'Layers',       color: 'rose',    title: 'Bulk Invoicing',       desc: 'Generate hundreds of invoices in a single batch run.' },
    { icon: 'Users',        color: 'amber',   title: 'Customer Portal',      desc: 'Self-service portal for invoice download and payment.' },
  ],
  benefits: [
    { icon: 'Zap',         color: 'pink',    text: 'Automated invoice generation from dispatch data' },
    { icon: 'ShieldCheck', color: 'purple',  text: '100% GST, E-Invoice & E-Way Bill compliance' },
    { icon: 'Clock',       color: 'indigo',  text: 'Reduced Days Sales Outstanding through automation' },
    { icon: 'Eye',         color: 'blue',    text: 'Real-time receivables and cash flow visibility' },
    { icon: 'Link',        color: 'emerald', text: 'Seamless Sales, GST & Accounting integration' },
    { icon: 'BarChart3',   color: 'cyan',    text: 'Revenue analytics and profitability dashboards' },
  ],
};
