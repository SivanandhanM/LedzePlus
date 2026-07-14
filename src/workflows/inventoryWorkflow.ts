import type { WorkflowData } from './types';
import type { ModuleWorkflowConfig } from './moduleWorkflowTypes';

export const inventoryWorkflow: WorkflowData = {
  nodes: [
    {
      id: 'req',
      label: 'Requirement',
      icon: 'ClipboardList',
      x: 20, y: 28,
      color: 'text-blue-500',
      tooltip: { purpose: 'Initial identification of material shortage or production demand.', outputs: ['Requirement Document'], relatedModules: ['Manufacturing'] }
    },
    {
      id: 'pr',
      label: 'Purchase Requisition',
      icon: 'FileText',
      x: 50, y: 28,
      color: 'text-indigo-500',
      tooltip: { purpose: 'Internal material indent raised by authorized department personnel.', inputs: ['Requirement'], outputs: ['PR Document'], relatedModules: ['Purchase'] }
    },
    {
      id: 'po',
      label: 'Approval & PO',
      icon: 'CheckCircle2',
      x: 80, y: 28,
      color: 'text-purple-500',
      tooltip: { purpose: 'Multi-level approval followed by Purchase Order generation.', inputs: ['Approved PR'], outputs: ['Purchase Order'], relatedModules: ['Purchase'] }
    },
    {
      id: 'delivery',
      label: 'Vendor Delivery',
      icon: 'Truck',
      x: 80, y: 72,
      color: 'text-orange-500',
      tooltip: { purpose: 'Vendor fulfills the order and dispatches the consignment.', inputs: ['Purchase Order'], outputs: ['Delivery Challan'], relatedModules: ['Gate Management'] }
    },
    {
      id: 'grn',
      label: 'Goods Receipt',
      icon: 'PackageCheck',
      x: 50, y: 72,
      color: 'text-emerald-500',
      tooltip: { purpose: 'Items received, quality checked, and Goods Receipt Note (GRN) created.', inputs: ['Delivery Challan'], outputs: ['GRN'], relatedModules: ['Quality Control'] }
    },
    {
      id: 'update',
      label: 'Inventory Update',
      icon: 'Database',
      x: 20, y: 72,
      color: 'text-cyan-500',
      tooltip: { purpose: 'Real-time stock ledger update and valuation adjustment.', inputs: ['GRN'], outputs: ['Updated Stock Ledger'], relatedModules: ['Accounting'] }
    }
  ],
  edges: [
    { id: 'e1', source: 'req', target: 'pr' },
    { id: 'e2', source: 'pr', target: 'po' },
    { id: 'e3', source: 'po', target: 'delivery', path: 'M 80 20 C 95 20, 95 80, 80 80' },
    { id: 'e4', source: 'delivery', target: 'grn' },
    { id: 'e5', source: 'grn', target: 'update' }
  ]
};

export const inventoryWorkflowConfig: ModuleWorkflowConfig = {
  moduleName: 'LEDZE+ Inventory',
  moduleLabel: 'Inventory Module',
  subtitle: 'End-to-End Stock Management Workflow',
  stepCountLabel: '6 automated steps',
  bannerGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
  steps: [
    {
      id: 1, color: 'blue', icon: 'ClipboardList',
      title: 'Requirement',
      description: 'Identify material shortage or production demand and initiate the replenishment cycle.',
      purpose: 'Trigger the procurement cycle by formally recognizing a material gap against production plans or minimum stock levels.',
      inputs: ['Production Plan / BOM', 'Current Stock Report', 'Reorder Level Configuration'],
      outputs: ['Material Requirement Document', 'Reorder Trigger Notification'],
      rules: ['System auto-checks current stock before raising requirement', 'Minimum lead time calculated automatically based on vendor history'],
      next: [2],
    },
    {
      id: 2, color: 'indigo', icon: 'FileText',
      title: 'Purchase Requisition',
      description: 'Formalize internal material indent for procurement with budget validation.',
      purpose: 'Convert a raw requirement into a structured, trackable indent document approved by authorized personnel.',
      inputs: ['Requirement Document', 'Budget Allocation', 'Item Master Details'],
      outputs: ['Approved Purchase Requisition (PR)', 'Budget Reservation Confirmation'],
      rules: ['Requires Department Head approval for values > ₹25,000', 'Auto-flagged if reorder level was not triggered', 'Budget check is mandatory before PR creation'],
      next: [3],
    },
    {
      id: 3, color: 'purple', icon: 'CheckCircle2',
      title: 'Approval & PO',
      description: 'Multi-level approval workflow followed by formal Purchase Order generation.',
      purpose: 'Create a legally binding procurement contract with the selected vendor after hierarchical authorization.',
      inputs: ['Approved PR', 'Vendor Master & Rate Contracts', 'Finance Authorization'],
      outputs: ['Authorized Purchase Order', 'Vendor Portal Notification'],
      rules: ['Finance approval mandatory for PO > ₹1,00,000', 'PO auto-sent to vendor portal upon digital signing', 'PO cannot be amended post vendor acknowledgement'],
      next: [4],
    },
    {
      id: 4, color: 'orange', icon: 'Truck',
      title: 'Vendor Delivery',
      description: 'Vendor fulfills order and dispatches consignment; gate entry auto-linked to PO.',
      purpose: 'Track vendor fulfillment against committed delivery schedules and initiate the goods receipt process.',
      inputs: ['Purchase Order Reference', 'Vendor Delivery Schedule', 'Transporter Details'],
      outputs: ['Delivery Challan', 'Gate Pass Request', 'Delivery Alert Notification'],
      rules: ['Delivery date alert triggers 3 days before due date', 'Gate entry linked to PO automatically via QR scan', 'Partial delivery must match minimum acceptable quantity'],
      next: [5],
    },
    {
      id: 5, color: 'emerald', icon: 'PackageCheck',
      title: 'Goods Receipt',
      description: 'Receive, inspect, and formally acknowledge goods; GRN created after quality check.',
      purpose: 'Formally accept delivery and record receipt of goods with quantity and quality validation.',
      inputs: ['Delivery Challan', 'PO Reference', 'Physical Goods for Inspection'],
      outputs: ['Goods Receipt Note (GRN)', 'Quality Check Flag', 'Variance Report (if any)'],
      rules: ['Quantity variance > 2% requires manager approval', 'QC inspection mandatory for all items > ₹10,000', 'Rejected items trigger Return-to-Vendor process automatically'],
      next: [6],
    },
    {
      id: 6, color: 'cyan', icon: 'Database',
      title: 'Inventory Update',
      description: 'Real-time stock ledger update, valuation adjustment, and batch tagging.',
      purpose: 'Reflect accurate stock levels across warehouses and enable immediate consumption planning.',
      inputs: ['QC-Approved GRN', 'Batch / Lot Details', 'Warehouse Bin Location'],
      outputs: ['Stock Ledger Entry', 'Valuation Update (FIFO/FEFO)', 'Batch/Expiry Tag', 'Accounting Journal Trigger'],
      rules: ['FIFO / FEFO valuation method applied automatically', 'Expiry alerts configured for perishable items', 'Accounting module auto-posts inventory value change'],
      next: [],
    },
  ],
  extraFeatures: [
    { icon: 'ScanBarcode',    color: 'blue',    title: 'Barcode & QR',         desc: 'Scan-based material movement with 100% accuracy.' },
    { icon: 'RotateCcw',      color: 'emerald', title: 'Cycle Count Mgmt',      desc: 'Rolling stocktake without halting warehouse operations.' },
    { icon: 'ArrowLeftRight', color: 'indigo',  title: 'Inter-location Transfer', desc: 'Real-time stock transfer between warehouses or bins.' },
    { icon: 'Scale',          color: 'amber',   title: 'FIFO / FEFO Valuation', desc: 'Auto-applied valuation methods per item category.' },
    { icon: 'BellRing',       color: 'orange',  title: 'Expiry Alerts',         desc: 'Auto-notifications before perishable items expire.' },
    { icon: 'TrendingDown',   color: 'rose',    title: 'Slow-Moving Reports',   desc: 'Identify dead stock and optimize holding costs.' },
    { icon: 'RefreshCw',      color: 'cyan',    title: 'Reorder Automation',    desc: 'Auto-PR generation when stock hits reorder level.' },
    { icon: 'Layers',         color: 'purple',  title: 'Batch & Serial Track',  desc: 'Full traceability of high-value and perishable items.' },
    { icon: 'Clipboard',      color: 'teal',    title: 'Physical Stocktaking',  desc: 'Guided physical verification with variance capture.' },
  ],
  benefits: [
    { icon: 'Zap',          color: 'emerald', text: 'End-to-end procure-to-stock automation' },
    { icon: 'Eye',          color: 'blue',    text: 'Real-time stock accuracy across all warehouses' },
    { icon: 'GitBranch',    color: 'purple',  text: 'Complete batch, serial, and expiry traceability' },
    { icon: 'BellRing',     color: 'orange',  text: 'Automated low-stock and expiry alert system' },
    { icon: 'ShieldCheck',  color: 'cyan',    text: 'Elimination of manual stocktaking errors' },
    { icon: 'Link',         color: 'indigo',  text: 'Seamless Purchase, Sales & Accounting integration' },
  ],
};
