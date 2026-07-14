import type { WorkflowData } from './types';
import type { ModuleWorkflowConfig } from './moduleWorkflowTypes';

export const salesWorkflow: WorkflowData = {
  nodes: [
    { id: 'inq', label: 'Inquiry & Quotation', icon: 'MessageSquare', x: 20, y: 20, color: 'text-blue-500', tooltip: { purpose: 'Customer request received and formal quotation sent.' } },
    { id: 'so', label: 'Sales Order', icon: 'FileCheck', x: 50, y: 20, color: 'text-indigo-500', tooltip: { purpose: 'Confirmed order logged with approved pricing and terms.' } },
    { id: 'fulfill', label: 'Order Fulfillment', icon: 'PackageSearch', x: 80, y: 50, color: 'text-purple-500', tooltip: { purpose: 'Inventory reserved and picking lists generated.' } },
    { id: 'dispatch', label: 'Dispatch', icon: 'Truck', x: 50, y: 80, color: 'text-orange-500', tooltip: { purpose: 'Goods shipped out with automated Gate Pass creation.' } },
    { id: 'inv', label: 'Invoicing & GST', icon: 'Receipt', x: 20, y: 80, color: 'text-emerald-500', tooltip: { purpose: 'Tax-compliant invoice and E-Way bill generated.' } },
    { id: 'pay', label: 'Payment Collection', icon: 'Banknote', x: 20, y: 50, color: 'text-cyan-500', tooltip: { purpose: 'Payment recorded and Accounts Receivable updated.' } }
  ],
  edges: [
    { id: 'e1', source: 'inq', target: 'so' },
    { id: 'e2', source: 'so', target: 'fulfill', path: 'M 50 20 C 80 20, 80 50, 80 50' },
    { id: 'e3', source: 'fulfill', target: 'dispatch', path: 'M 80 50 C 80 80, 50 80, 50 80' },
    { id: 'e4', source: 'dispatch', target: 'inv' },
    { id: 'e5', source: 'inv', target: 'pay' }
  ]
};

export const salesWorkflowConfig: ModuleWorkflowConfig = {
  moduleName: 'LEDZE+ Sales',
  moduleLabel: 'Sales Module',
  subtitle: 'Order-to-Cash Automation Workflow',
  stepCountLabel: '6 automated steps',
  bannerGradient: 'from-purple-600 via-indigo-600 to-violet-700',
  steps: [
    {
      id: 1, color: 'blue', icon: 'MessageSquare',
      title: 'Inquiry & Quotation',
      description: 'Capture customer requirement and send a formal, itemized quotation.',
      purpose: 'Convert an inbound customer inquiry into a structured, time-bound sales quotation with pricing and terms.',
      inputs: ['Customer Inquiry Details', 'Price Master & Schemes', 'Customer Credit Limit'],
      outputs: ['Formal Quotation Document', 'Quotation Validity Period', 'Sales Opportunity Record'],
      rules: ['Discount > 10% requires Sales Manager approval', 'Quotation auto-expires after 15 days without action', 'Credit limit check is performed before quotation is released'],
      next: [2],
    },
    {
      id: 2, color: 'indigo', icon: 'FileCheck',
      title: 'Sales Order',
      description: 'Create confirmed sales order upon customer acceptance with stock reservation.',
      purpose: 'Formalize the customer commitment and reserve inventory against the confirmed order.',
      inputs: ['Accepted Quotation / Customer PO', 'Customer Master Details', 'Payment & Delivery Terms'],
      outputs: ['Sales Order Confirmation', 'Stock Reservation', 'Acknowledgement to Customer'],
      rules: ['Credit limit check mandatory before SO creation', 'SO cannot exceed available stock without override', 'Approved pricing scheme auto-applied from customer profile'],
      next: [3],
    },
    {
      id: 3, color: 'purple', icon: 'PackageSearch',
      title: 'Order Fulfillment',
      description: 'Generate pick lists, allocate warehouse bins, and prepare goods for shipment.',
      purpose: 'Translate the sales order into actionable warehouse tasks to ensure accurate and timely picking.',
      inputs: ['Sales Order', 'Warehouse Stock & Bin Locations', 'Picking Template'],
      outputs: ['Pick List', 'Bin Allocation Slip', 'Packing Instructions'],
      rules: ['FIFO picking enforced for perishable items', 'Barcode verification mandatory during picking stage', 'Partially fulfilled orders flagged for customer communication'],
      next: [4],
    },
    {
      id: 4, color: 'orange', icon: 'Truck',
      title: 'Dispatch',
      description: 'Package goods, execute vehicle outward dispatch, and generate gate pass.',
      purpose: 'Physically ship goods out with all compliance documents and logistics coordination.',
      inputs: ['Pick List & Packing Confirmation', 'Vehicle & Driver Details', 'Customer Delivery Address'],
      outputs: ['Dispatch Note', 'Gate Pass (Outward)', 'E-Way Bill (if applicable)', 'Proof of Delivery (POD) Template'],
      rules: ['Gate pass requires approved Dispatch Note', 'E-Way Bill mandatory for consignments > ₹50,000', 'Vehicle exit auto-logged in Gate Management module'],
      next: [5],
    },
    {
      id: 5, color: 'emerald', icon: 'Receipt',
      title: 'Invoicing & GST',
      description: 'Generate GST-compliant tax invoice with E-Invoice IRN and E-Way Bill.',
      purpose: 'Complete the financial leg of the sale by issuing a legally compliant tax invoice and submitting to government portals.',
      inputs: ['Dispatch Note Reference', 'Customer GSTIN', 'HSN / SAC Codes', 'Applicable Tax Rates'],
      outputs: ['GST Tax Invoice', 'E-Invoice IRN & QR Code', 'Updated Accounts Receivable'],
      rules: ['E-Invoice mandatory for B2B taxpayers > ₹5 Cr annual turnover', 'Invoice auto-emailed to customer upon finalization', 'Invoice cannot be raised without approved Dispatch Note'],
      next: [6],
    },
    {
      id: 6, color: 'cyan', icon: 'Banknote',
      title: 'Payment Collection',
      description: 'Record customer payment, allocate against invoices, and update receivables.',
      purpose: 'Close the order-to-cash cycle by capturing payment and reconciling outstanding balances.',
      inputs: ['Customer Payment Confirmation', 'Invoice Reference Numbers', 'Mode of Payment'],
      outputs: ['Payment Receipt', 'Outstanding Ledger Update', 'Cash / Bank Ledger Entry'],
      rules: ['Partial payments allocated to oldest invoice first (FIFO)', 'Overdue alerts triggered automatically after credit period expires', 'TDS amount tracked separately for compliance'],
      next: [],
    },
  ],
  extraFeatures: [
    { icon: 'BarChart3',    color: 'purple',  title: 'Sales Analytics',      desc: 'Real-time revenue dashboards with regional breakdown.' },
    { icon: 'BadgePercent', color: 'indigo',  title: 'Scheme Management',    desc: 'Dynamic volume-based discounts and promotional pricing.' },
    { icon: 'AlertTriangle',color: 'orange',  title: 'Credit Control',       desc: 'Auto-hold orders when credit limit is exceeded.' },
    { icon: 'MapPin',       color: 'emerald', title: 'Delivery Routing',     desc: 'Optimized dispatch routes and vehicle assignment.' },
    { icon: 'ScanBarcode',  color: 'blue',    title: 'Barcode Verification', desc: '100% shipment accuracy via scan-on-dispatch.' },
    { icon: 'Globe',        color: 'cyan',    title: 'E-Way Bill Automation',desc: 'One-click E-Way Bill generation from dispatch screen.' },
    { icon: 'Users',        color: 'rose',    title: 'Customer Management',  desc: 'Centralized CRM with outstanding and credit history.' },
    { icon: 'FileSignature',color: 'amber',   title: 'E-Invoice IRN',        desc: 'Real-time GSTN portal integration for compliance.' },
    { icon: 'BellRing',     color: 'teal',    title: 'Overdue Alerts',       desc: 'Automated dunning for outstanding payment recovery.' },
  ],
  benefits: [
    { icon: 'Zap',         color: 'purple',  text: 'End-to-end Order-to-Cash automation' },
    { icon: 'ShieldCheck', color: 'indigo',  text: 'Automated GST, E-Invoice & E-Way Bill compliance' },
    { icon: 'Eye',         color: 'blue',    text: 'Real-time visibility into sales performance' },
    { icon: 'Clock',       color: 'emerald', text: 'Accelerated order fulfilment and dispatch cycles' },
    { icon: 'Link',        color: 'orange',  text: 'Seamless Inventory, Gate & Accounting integration' },
    { icon: 'BarChart3',   color: 'cyan',    text: 'Data-driven revenue analytics and insights' },
  ],
};
