import type { WorkflowData } from './types';

export const purchaseWorkflow: WorkflowData = {
  nodes: [
    { id: 'req', label: 'Requirement', icon: 'AlertCircle', x: 20, y: 28, color: 'text-slate-500', tooltip: { purpose: 'Internal material shortage identified.' } },
    { id: 'pr', label: 'Purchase Requisition', icon: 'FileText', x: 50, y: 28, color: 'text-blue-500', tooltip: { purpose: 'Departmental indent raised and approved.' } },
    { id: 'rfq', label: 'RFQ Generation', icon: 'Mail', x: 80, y: 28, color: 'text-indigo-500', tooltip: { purpose: 'Request for Quotation sent to multiple vendors.' } },
    { id: 'eval', label: 'Vendor Comparison', icon: 'BarChart2', x: 80, y: 50, color: 'text-purple-500', tooltip: { purpose: 'Quotations evaluated and optimal vendor selected.' } },
    { id: 'po', label: 'Purchase Order', icon: 'CheckSquare', x: 50, y: 50, color: 'text-emerald-500', tooltip: { purpose: 'Formal PO issued to the chosen vendor.' } },
    { id: 'grn', label: 'Goods Receipt', icon: 'Package', x: 20, y: 72, color: 'text-orange-500', tooltip: { purpose: 'Materials received, inspected, and GRN created.' } },
    { id: 'inv', label: 'Invoice & Payment', icon: 'CreditCard', x: 50, y: 72, color: 'text-cyan-500', tooltip: { purpose: 'Invoice matched against GRN and payment processed.' } }
  ],
  edges: [
    { id: 'e1', source: 'req', target: 'pr' },
    { id: 'e2', source: 'pr', target: 'rfq' },
    { id: 'e3', source: 'rfq', target: 'eval' },
    { id: 'e4', source: 'eval', target: 'po' },
    { id: 'e5', source: 'po', target: 'grn', path: 'M 50 50 C 20 50, 20 80, 20 80' },
    { id: 'e6', source: 'grn', target: 'inv' }
  ]
};
