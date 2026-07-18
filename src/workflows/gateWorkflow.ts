import type { WorkflowData } from './types';
import type { ModuleWorkflowConfig } from './moduleWorkflowTypes';

export const gateWorkflow: WorkflowData = {
  nodes: [
    { id: 'request', label: 'Gate Pass Request', icon: 'FilePlus', x: 20, y: 28, color: 'text-blue-500', tooltip: { purpose: 'Internal user or vendor raises an inward/outward request.' } },
    { id: 'security', label: 'Security Verification', icon: 'ShieldCheck', x: 50, y: 28, color: 'text-indigo-500', tooltip: { purpose: 'Vehicle, driver, and documents verified at the gate.' } },
    { id: 'logging', label: 'Inward / Outward Logging', icon: 'BookOpen', x: 80, y: 28, color: 'text-purple-500', tooltip: { purpose: 'Material entry/exit recorded against authorized pass.' } },
    { id: 'weigh', label: 'Weighbridge Sync', icon: 'Scale', x: 80, y: 72, color: 'text-orange-500', tooltip: { purpose: 'Automated gross/tare weight capture.' } },
    { id: 'dock', label: 'Dock Assignment', icon: 'MapPin', x: 50, y: 72, color: 'text-emerald-500', tooltip: { purpose: 'Vehicle directed to the designated loading/unloading bay.' } },
    { id: 'exit', label: 'Exit Clearance', icon: 'LogOut', x: 20, y: 72, color: 'text-cyan-500', tooltip: { purpose: 'Final security check and gate pass closure.' } }
  ],
  edges: [
    { id: 'e1', source: 'request', target: 'security' },
    { id: 'e2', source: 'security', target: 'logging' },
    { id: 'e3', source: 'logging', target: 'weigh', path: 'M 80 20 C 95 20, 95 80, 80 80' },
    { id: 'e4', source: 'weigh', target: 'dock' },
    { id: 'e5', source: 'dock', target: 'exit' }
  ]
};

export const gateWorkflowConfig: ModuleWorkflowConfig = {
  moduleName: 'LEDZE+ Gate Management',
  moduleLabel: 'Gate Management Module',
  subtitle: 'Vehicle-to-Exit Security Workflow',
  stepCountLabel: '6 automated steps',
  bannerGradient: 'from-teal-600 via-cyan-600 to-blue-700',
  steps: [
    {
      id: 1, color: 'blue', icon: 'FilePlus',
      title: 'Gate Pass Request',
      description: 'Raise a pre-authorized digital gate pass for inward or outward material movement.',
      purpose: 'Initiate a controlled, system-authorized entry or exit request linked to an approved business transaction before the vehicle arrives.',
      inputs: ['PO Reference (Inward) / Dispatch Note (Outward)', 'Material Description & Quantity', 'Requestor & Vendor Details'],
      outputs: ['Digital Gate Pass with Unique Pass Number', 'QR Code for Gate Scanning', 'Security Team Notification'],
      rules: ['Outward gate pass requires an approved Sales Dispatch Note', 'Inward gate pass requires a valid, open Purchase Order', 'Pass validity window configurable per pass type (1-72 hours)'],
      next: [2],
    },
    {
      id: 2, color: 'teal', icon: 'ShieldCheck',
      title: 'Security Verification',
      description: 'Physical verification of vehicle, driver credentials, and all required documents.',
      purpose: 'Ensure only authorized, pre-approved vehicles and personnel enter or exit the facility premises.',
      inputs: ['Gate Pass Number / QR Scan', 'Driver License & Photo ID', 'Vehicle Registration Certificate (RC)'],
      outputs: ['Security Clearance Confirmation', 'Entry Timestamp & Guard ID Log', 'Photo Capture of Vehicle & Driver'],
      rules: ['Blacklisted vehicles or drivers auto-blocked by the system', 'Document photo capture is mandatory for all visitors and vendors', 'Security override requires Area Manager authorization'],
      next: [3],
    },
    {
      id: 3, color: 'cyan', icon: 'BookOpen',
      title: 'Inward / Outward Logging',
      description: 'Record material movement against the authorized gate pass with QR verification.',
      purpose: 'Create an immutable digital record of every item that enters or exits the facility, linked to its source transaction.',
      inputs: ['Gate Pass Reference', 'Material Challan / Invoice', 'Barcode / QR Scan of Items'],
      outputs: ['Entry / Exit Log with Timestamp', 'Challan Verification Record', 'Discrepancy Alert (if items mismatch)'],
      rules: ['QR code scan mandatory for recurring approved vendors', 'Material description and quantity must match gate pass exactly', 'Any discrepancy auto-creates a hold flag for supervisor resolution'],
      next: [4],
    },
    {
      id: 4, color: 'orange', icon: 'Scale',
      title: 'Weighbridge Sync',
      description: 'Automated gross and tare weight capture via hardware integration.',
      purpose: 'Obtain legally defensible, tamper-proof weight records for all material movements to prevent disputes and material pilferage.',
      inputs: ['Vehicle on Weighbridge', 'Weighbridge Hardware API Signal', 'PO / Dispatch Note Weight Reference'],
      outputs: ['Gross Weight Record', 'Tare Weight Record', 'Net Weight Calculation', 'Digital Weight Certificate'],
      rules: ['Net weight deviation > 1% from challan triggers mandatory verification', 'Weighbridge data is tamper-proof and time-stamped by hardware', 'Second weighing required for all high-value material exits'],
      next: [5],
    },
    {
      id: 5, color: 'emerald', icon: 'MapPin',
      title: 'Dock Assignment',
      description: 'Intelligently direct vehicle to the optimal loading or unloading dock bay.',
      purpose: 'Eliminate dock congestion and minimize vehicle turnaround time through real-time capacity-aware dock allocation.',
      inputs: ['Vehicle Type & Dimensions', 'Material Type & Volume', 'Real-time Dock Availability Dashboard'],
      outputs: ['Dock Allotment Slip / Digital Display', 'Estimated Time for Loading/Unloading', 'Queue Position Notification'],
      rules: ['Heavy vehicles restricted to reinforced docks only', 'Live queue management prevents dock congestion automatically', 'Dock availability synchronized with warehouse management system'],
      next: [6],
    },
    {
      id: 6, color: 'purple', icon: 'LogOut',
      title: 'Exit Clearance',
      description: 'Final security verification, material count reconciliation, and gate pass closure.',
      purpose: 'Complete the facility movement cycle with a verified exit, ensuring no unauthorized material or personnel leaves the premises.',
      inputs: ['Loading / Unloading Completion Confirmation', 'Material Reconciliation Count', 'Security Guard Sign-off'],
      outputs: ['Closed Gate Pass (Tamper-proof)', 'Vehicle Exit Timestamp & Log', 'GRN Trigger (for inward) / Dispatch Confirmation (for outward)'],
      rules: ['Exit permitted only after GRN is created for inward material', 'Vehicle exit weight reconciled against loaded/unloaded weight record', 'Pass closure triggers automatic notification to Sales team'],
      next: [],
    },
  ],
  extraFeatures: [
    { icon: 'Car',          color: 'teal',    title: 'Vehicle Management',    desc: 'Fleet entry/exit tracking with number plate recognition.' },
    { icon: 'UserCheck',    color: 'cyan',    title: 'Visitor Management',    desc: 'Pre-registration, photo capture, and host notifications.' },
    { icon: 'ScanBarcode',  color: 'blue',    title: 'QR-based Entry',        desc: 'Instant gate clearance for pre-approved recurring vendors.' },
    { icon: 'RotateCcw',    color: 'orange',  title: 'Returnable Gate Pass',  desc: 'Full RGP lifecycle tracking with auto-alert on overdue return.' },
    { icon: 'Package',      color: 'emerald', title: 'NRGP (Non-Returnable)', desc: 'Controlled scrap and waste material exit management.' },
    { icon: 'LayoutDashboard', color: 'purple', title: 'Live Dashboard',      desc: 'Real-time view of vehicles and visitors on premises.' },
    { icon: 'Shield',       color: 'rose',    title: 'Multi-Gate Support',    desc: 'Centralized admin for all security gates and checkpoints.' },
    { icon: 'History',      color: 'amber',   title: 'Audit Trail',           desc: 'Immutable movement history for dispute resolution.' },
    { icon: 'Clock',        color: 'indigo',  title: 'Operating Hours',       desc: 'Gate access restricted to defined operational windows.' },
  ],
  benefits: [
    { icon: 'ShieldCheck', color: 'teal',    text: 'No unauthorized material enters or exits premises' },
    { icon: 'Zap',         color: 'cyan',    text: 'Pre-authorized passes accelerate vehicle clearance' },
    { icon: 'Lock',        color: 'blue',    text: 'Tamper-proof audit logs for all facility movements' },
    { icon: 'Eye',         color: 'orange',  text: 'Real-time visibility into dock utilization and queues' },
    { icon: 'Link',        color: 'emerald', text: 'Seamless Purchase & Sales integration' },
    { icon: 'Scale',       color: 'purple',  text: 'Weight discrepancy prevention eliminates pilferage' },
  ],
};
