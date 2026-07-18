import { 
  FileText, Calculator, UploadCloud, CheckCircle, Search, FileJson, 
  Send, AlertCircle, RefreshCw, BarChart, Zap, SearchCode, Settings,
  AlertTriangle, Receipt, Truck, Clock
} from 'lucide-react';

export interface WorkflowStep {
  id: number;
  title: string;
  explanation: string;
  icon: any; 
  purpose?: string;
  systemAction?: string;
  userAction?: string;
  output?: string;
  statusType?: 'Manual' | 'Auto Generated' | 'Validation Required' | 'System Process';
}

export interface TimelineEvent {
  day: string;
  title: string;
}

export type GstCategory = 'GST Returns' | 'Statements & Reconciliation' | 'GST Digital Services' | 'Compliance & ERP';

export interface GstModuleData {
  id: string;
  title: string;
  category: GstCategory;
  themeColor: string;
  purpose: string;
  filedBy: string;
  frequency: string;
  generatedFrom: string[];
  workflow: WorkflowStep[];
  businessImpact: string[];
  timeline: TimelineEvent[];
  didYouKnow: string;
  importantNote?: {
    title: string;
    items: string[];
  };
  relatedReturns?: string[];
  example: {
    scenario: string;
    steps: string[];
  };
}

export const gstLearningData: GstModuleData[] = [
  {
    id: 'gstr-1',
    title: 'GSTR-1',
    category: 'GST Returns',
    themeColor: 'blue',
    purpose: 'Report details of all sales transactions, including taxable sales, exports, credit notes, debit notes, and other outward supplies.',
    filedBy: 'Registered Taxpayers',
    frequency: 'Monthly / Quarterly',
    generatedFrom: ['Sales', 'Customers', 'Invoices', 'Tax Engine', 'GST Module'],
    workflow: [
      { id: 1, title: 'Sales Invoice Created', explanation: 'ERP generates invoice automatically.', icon: Receipt, purpose: 'Creates the core sales record upon customer purchase.', systemAction: 'ERP posts revenue and creates accounts receivable.', userAction: 'Approve or generate the final sales invoice.', output: 'Taxable Sales Invoice', statusType: 'Manual' },
      { id: 2, title: 'GST Calculated', explanation: 'Tax automatically calculated by the engine.', icon: Calculator, purpose: 'Applies accurate GST rates based on HSN/SAC.', systemAction: 'Tax Engine computes CGST, SGST, or IGST.', userAction: 'None (Fully Automated)', output: 'Tax Line Items', statusType: 'Auto Generated' },
      { id: 3, title: 'Invoice Appears in GSTR-1', explanation: 'Transactions populate the GSTR-1 dashboard.', icon: BarChart, purpose: 'Groups transactions into correct GSTR-1 tables (B2B, B2C).', systemAction: 'Populates the GST Module staging tables.', userAction: 'Review transaction summaries.', output: 'GSTR-1 Draft', statusType: 'Validation Required' },
      { id: 4, title: 'Generate JSON', explanation: 'Creates GST Portal compatible file.', icon: FileJson, purpose: 'Packages the validated data for the Government portal.', systemAction: 'Formats data strictly into GSTN JSON schema.', userAction: 'Click "Generate Return".', output: 'GSTR-1 JSON File', statusType: 'System Process' },
      { id: 5, title: 'Upload to Portal', explanation: 'Submitted using API or Portal.', icon: UploadCloud, purpose: 'Pushes the return data to the GST Network.', systemAction: 'Transmits JSON via secure API.', userAction: 'Authenticate with OTP/DSC.', output: 'Portal Draft', statusType: 'Validation Required' },
      { id: 6, title: 'Filed Successfully', explanation: 'Return is filed and ARN is generated.', icon: CheckCircle, purpose: 'Finalizes the return and locks the data.', systemAction: 'Records the ARN (Application Reference Number).', userAction: 'File with EVC/DSC.', output: 'GSTR-1 ARN', statusType: 'Manual' }
    ],
    businessImpact: [
      'Enables buyer Input Tax Credit (ITC)',
      'Shares invoice details with buyers',
      'Reduces compliance risk',
      'Auto-populates GSTR-2A/2B for customers'
    ],
    timeline: [
      { day: 'Day 1-30', title: 'Invoices Created' },
      { day: 'Day 5 (Next Month)', title: 'Review & Validate' },
      { day: 'Day 10', title: 'Generate JSON' },
      { day: 'Day 11', title: 'Upload & File' }
    ],
    didYouKnow: 'If GSTR-1 is not filed, your customers cannot claim their Input Tax Credit (ITC).',
    importantNote: {
      title: '⚠ Important',
      items: [
        'If GSTR-1 is ignored, buyers cannot claim ITC.',
        'Late fees of ₹50/day (₹20 for NIL) apply.',
        'E-Way bill generation may be blocked.',
        'Department scrutiny increases.'
      ]
    },
    relatedReturns: ['GSTR-3B', 'GSTR-2A', 'GSTR-9'],
    example: {
      scenario: 'ABC Pvt Ltd sells goods worth ₹50,000.',
      steps: [
        'Invoice generated.',
        'GST calculated.',
        'Invoice automatically appears in GSTR-1.',
        'Customer later sees it inside GSTR-2A.'
      ]
    }
  },
  {
    id: 'gstr-3a',
    title: 'GSTR-3A',
    category: 'GST Returns',
    themeColor: 'rose',
    purpose: 'An auto-generated notice issued by the GST Department to taxpayers who do not file their GST returns on time.',
    filedBy: 'Auto-generated Notice',
    frequency: 'As needed',
    generatedFrom: ['GST Portal', 'Compliance Module'],
    workflow: [
      { id: 1, title: 'Return Deadline Missed', explanation: 'Taxpayer fails to file GSTR-1/3B.', icon: Clock, purpose: 'System detects a missed statutory deadline.', systemAction: 'Flags the taxpayer as non-compliant.', userAction: 'None (Deadline missed).', output: 'Non-Compliance Flag', statusType: 'System Process' },
      { id: 2, title: 'Notice Generated', explanation: 'GSTR-3A notice sent by GST Dept.', icon: AlertTriangle, purpose: 'Officially notifies the taxpayer of default.', systemAction: 'GSTN generates Form GSTR-3A.', userAction: 'None.', output: 'GSTR-3A Notice', statusType: 'Auto Generated' },
      { id: 3, title: 'Dashboard Alert', explanation: 'ERP flags the notice internally.', icon: AlertCircle, purpose: 'Alerts the internal finance team of the notice.', systemAction: 'ERP syncs with GSTN and displays a high-priority alert.', userAction: 'Acknowledge the notice.', output: 'Internal Alert', statusType: 'Validation Required' },
      { id: 4, title: 'File Pending Return', explanation: 'User files the missing return.', icon: Send, purpose: 'Rectifies the default by filing the return.', systemAction: 'Calculates late fees and interest automatically.', userAction: 'File the pending return and pay liabilities.', output: 'Filed Return & Payment', statusType: 'Manual' },
      { id: 5, title: 'Notice Closed', explanation: 'System updates status to closed.', icon: CheckCircle, purpose: 'Resolves the notice proceedings.', systemAction: 'Portal drops the assessment proceedings automatically.', userAction: 'Verify closure status.', output: 'Notice Closure Status', statusType: 'Auto Generated' }
    ],
    businessImpact: [
      'Reminds taxpayers of compliance failures',
      'Tracks department notices automatically',
      'Prevents severe legal penalties',
      'Minimizes accumulated late fees'
    ],
    timeline: [
      { day: 'Deadline', title: 'Return Not Filed' },
      { day: 'Deadline + 5', title: 'Notice Issued' },
      { day: 'Day 15', title: 'Last Date to Reply' },
      { day: 'Post 15', title: 'Penalty / Assessment' }
    ],
    didYouKnow: 'If you do not reply to a GSTR-3A notice within 15 days, the tax officer can assess your tax liability unilaterally based on available information.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'If GSTR-3A is ignored, late fees continue accumulating.',
        'GST registration may become risky.',
        'Compliance score decreases.',
        'Department scrutiny increases.'
      ]
    },
    relatedReturns: ['GSTR-3B', 'GSTR-1'],
    example: {
      scenario: 'A business forgot to file GSTR-3B for March.',
      steps: [
        'Deadline passes.',
        'GSTR-3A notice received from portal.',
        'ERP alerts the compliance team.',
        'Return is filed with late fees to close notice.'
      ]
    }
  },
  {
    id: 'gstr-3b',
    title: 'GSTR-3B',
    category: 'GST Returns',
    themeColor: 'emerald',
    purpose: 'A monthly GST summary return containing the summary of sales, purchases, GST liability, Input Tax Credit (ITC), and tax payable.',
    filedBy: 'Registered Taxpayers',
    frequency: 'Monthly',
    generatedFrom: ['Sales Invoice', 'Purchase Invoice', 'Debit/Credit Notes', 'Accounting Entries'],
    workflow: [
      { id: 1, title: 'Load GST Data', explanation: 'Fetch GST transaction data from modules.', icon: RefreshCw, purpose: 'Aggregates all monthly GST transactions.', systemAction: 'Pulls data from AP, AR, and GL modules.', userAction: 'Trigger data load.', output: 'Raw GST Data', statusType: 'System Process' },
      { id: 2, title: 'Verify Summary', explanation: 'Display GST summary tables (Sales, ITC).', icon: Search, purpose: 'Ensures data accuracy before liability calculation.', systemAction: 'Generates summary view of outward/inward supplies.', userAction: 'Reconcile summary with accounting books.', output: 'Verified Summary', statusType: 'Validation Required' },
      { id: 3, title: 'Tax Payment', explanation: 'Calculate and display GST payable amount.', icon: Calculator, purpose: 'Determines the net cash liability.', systemAction: 'Offsets total tax liability against available ITC.', userAction: 'Generate challan and make payment.', output: 'Challan / Payment Receipt', statusType: 'Manual' },
      { id: 4, title: 'Preview Return', explanation: 'Review complete GSTR-3B before filing.', icon: FileText, purpose: 'Final check of the return format.', systemAction: 'Generates a PDF/Draft view identical to the portal.', userAction: 'Approve the draft return.', output: 'Approved Draft', statusType: 'Validation Required' },
      { id: 5, title: 'File Return', explanation: 'Submit through GST Portal (EVC/DSC).', icon: Send, purpose: 'Legally files the monthly return.', systemAction: 'Transmits JSON via API and records ARN.', userAction: 'Authenticate via OTP or DSC.', output: 'GSTR-3B ARN', statusType: 'Manual' }
    ],
    businessImpact: [
      'Finalizes monthly tax liability',
      'Offsets liability with eligible ITC',
      'Maintains clean accounting ledgers',
      'Prevents late fees and interest'
    ],
    timeline: [
      { day: 'Day 12', title: 'Review Sales/Purchases' },
      { day: 'Day 14', title: 'Compute GST Data' },
      { day: 'Day 18', title: 'Make Tax Payment' },
      { day: 'Day 20', title: 'File GSTR-3B' }
    ],
    didYouKnow: 'You cannot revise GSTR-3B once filed. Any mistakes must be adjusted in the next month\'s return.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'GSTR-3B cannot be revised once filed.',
        'Interest at 18% p.a. applies on delayed tax payment.',
        'Filing GSTR-1 is mandatory before GSTR-3B.'
      ]
    },
    relatedReturns: ['GSTR-1', 'GSTR-2B', 'GSTR-9'],
    example: {
      scenario: 'XYZ Corp has ₹1,00,000 tax liability and ₹60,000 in ITC.',
      steps: [
        'Data loaded from ERP.',
        'ITC offsets ₹60,000.',
        '₹40,000 net payable calculated.',
        'Payment made and return filed.'
      ]
    }
  },
  {
    id: 'gstr-4',
    title: 'GSTR-4',
    category: 'GST Returns',
    themeColor: 'sky',
    purpose: 'An annual GST return filed by taxpayers registered under the Composition Scheme, summarizing purchases, outward supplies, and tax paid.',
    filedBy: 'Composition Taxpayers',
    frequency: 'Annually',
    generatedFrom: ['Sales', 'Purchases', 'Tax Payments'],
    workflow: [
      { id: 1, title: 'Select Financial Year', explanation: 'Choose the period for filing.', icon: Search, purpose: 'Defines the scope of the annual return.', systemAction: 'Filters all records for the selected FY.', userAction: 'Select the FY from the dropdown.', output: 'FY Data Scope', statusType: 'Manual' },
      { id: 2, title: 'Load Summary', explanation: 'System aggregates annual turnover.', icon: BarChart, purpose: 'Calculates total turnover and purchases.', systemAction: 'Sums up all quarterly CMP-08 filings and invoices.', userAction: 'Review the aggregated totals.', output: 'Turnover Summary', statusType: 'System Process' },
      { id: 3, title: 'Review Details', explanation: 'Check inward/outward supplies.', icon: FileText, purpose: 'Ensures inward supplies from registered/unregistered persons are accurate.', systemAction: 'Displays detailed tables for review.', userAction: 'Verify inward supplies against books.', output: 'Verified Tables', statusType: 'Validation Required' },
      { id: 4, title: 'Tax Payment', explanation: 'Deposit composition tax liability.', icon: Calculator, purpose: 'Calculates the flat-rate tax on turnover.', systemAction: 'Computes tax (e.g., 1%) minus taxes already paid.', userAction: 'Pay any remaining balance.', output: 'Tax Challan', statusType: 'Manual' },
      { id: 5, title: 'File Return', explanation: 'Submit GSTR-4 to the portal.', icon: CheckCircle, purpose: 'Completes annual compliance for composition dealers.', systemAction: 'Files return and generates ARN.', userAction: 'Authenticate and file.', output: 'GSTR-4 ARN', statusType: 'Manual' }
    ],
    businessImpact: [
      'Ensures compliance for small businesses',
      'Calculates flat-rate tax liability',
      'Avoids regular monthly GSTR-1/3B filing overhead',
      'Consolidates annual transaction data'
    ],
    timeline: [
      { day: 'April-March', title: 'Track Turnover' },
      { day: 'April 15', title: 'Review Annual Data' },
      { day: 'April 25', title: 'Make Tax Payment' },
      { day: 'April 30', title: 'File GSTR-4' }
    ],
    didYouKnow: 'Composition taxpayers cannot claim Input Tax Credit (ITC) and cannot issue tax invoices to pass on GST to buyers.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'Composition dealers cannot claim any ITC.',
        'You cannot collect tax from customers.',
        'Late fee applies for delayed filing.'
      ]
    },
    relatedReturns: ['GST Health Check'],
    example: {
      scenario: 'A small bakery with ₹40L turnover files GSTR-4.',
      steps: [
        'Year ends.',
        'ERP summarizes ₹40L total sales.',
        '1% tax rate calculated (₹40,000).',
        'Tax paid and GSTR-4 filed.'
      ]
    }
  },
  {
    id: 'gstr-9',
    title: 'GSTR-9',
    category: 'GST Returns',
    themeColor: 'purple',
    purpose: 'An Annual GST Return summarizing all transactions (sales, purchases, tax paid, ITC, and adjustments) for the entire financial year.',
    filedBy: 'Regular Taxpayers',
    frequency: 'Annually',
    generatedFrom: ['GSTR-1', 'GSTR-3B', 'ITC Ledger'],
    workflow: [
      { id: 1, title: 'Consolidate Returns', explanation: 'Merge all monthly GSTR-1 & 3B data.', icon: FileJson, purpose: 'Creates a single unified view of the entire financial year.', systemAction: 'Aggregates 12 months of GSTR-1 and GSTR-3B filings.', userAction: 'Trigger annual consolidation.', output: 'Consolidated Yearly Data', statusType: 'System Process' },
      { id: 2, title: 'Annual Summary', explanation: 'Review Outward/Inward supplies and Tax.', icon: BarChart, purpose: 'Provides high-level totals for auditing.', systemAction: 'Generates Part II & III of GSTR-9.', userAction: 'Reconcile totals with trial balance.', output: 'Annual Summary Tables', statusType: 'Validation Required' },
      { id: 3, title: 'Tax & ITC Details', explanation: 'Compare claimed vs eligible ITC.', icon: Calculator, purpose: 'Highlights ITC mismatches across the year.', systemAction: 'Compares GSTR-3B ITC claimed vs GSTR-2A eligible ITC.', userAction: 'Identify reasons for ITC differences.', output: 'ITC Reconciliation Report', statusType: 'Validation Required' },
      { id: 4, title: 'Preview Return', explanation: 'Download and verify the draft.', icon: FileText, purpose: 'Final check before permanent filing.', systemAction: 'Generates a PDF draft of the GSTR-9.', userAction: 'Review draft with auditors.', output: 'GSTR-9 Draft PDF', statusType: 'Manual' },
      { id: 5, title: 'Submit Return', explanation: 'File the annual return via DSC/EVC.', icon: CheckCircle, purpose: 'Submits the final annual data to GSTN.', systemAction: 'Transmits data and records ARN.', userAction: 'Sign and file the return.', output: 'GSTR-9 ARN', statusType: 'Manual' }
    ],
    businessImpact: [
      'Closes the financial year for GST compliance',
      'Highlights accounting mismatches',
      'Finalizes total ITC claimed vs reversed',
      'Creates a clean audit trail'
    ],
    timeline: [
      { day: 'April-March', title: 'Financial Year Ends' },
      { day: 'Oct-Nov', title: 'Data Consolidation' },
      { day: 'Dec 15', title: 'Draft Review' },
      { day: 'Dec 31', title: 'Annual Filing Deadline' }
    ],
    didYouKnow: 'Failing to file GSTR-9 incurs a late fee of ₹200 per day, subject to a maximum of 0.5% of turnover.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'Late fees up to 0.5% of turnover.',
        'Reconciliation with books is mandatory.',
        'Cannot claim missed ITC through GSTR-9.'
      ]
    },
    relatedReturns: ['GSTR-1', 'GSTR-3B', 'GSTR-9C'],
    example: {
      scenario: 'Consolidating 12 months of GST data.',
      steps: [
        'ERP fetches 12 months of GSTR-1 & 3B.',
        'Summarizes total tax liability.',
        'Identifies ₹5000 excess ITC claimed.',
        'Reverses excess ITC and files return.'
      ]
    }
  },
  {
    id: 'gstr-9c',
    title: 'GSTR-9C',
    category: 'GST Returns',
    themeColor: 'indigo',
    purpose: 'A Reconciliation Statement used to compare the financial statements (Books of Accounts) with the GSTR-9 Annual Return.',
    filedBy: 'Taxpayers (Turnover > 5Cr)',
    frequency: 'Annually',
    generatedFrom: ['GSTR-9', 'Audited Financial Statements'],
    workflow: [
      { id: 1, title: 'Load Financial Data', explanation: 'Fetch audited book turnover.', icon: FileJson, purpose: 'Establishes the baseline from Audited Financials.', systemAction: 'Imports turnover and tax data from the Trial Balance.', userAction: 'Upload Audited TB/Financials.', output: 'Book Turnover Data', statusType: 'Manual' },
      { id: 2, title: 'Load GSTR-9 Data', explanation: 'Fetch filed GSTR-9 summary.', icon: RefreshCw, purpose: 'Establishes the GST declared baseline.', systemAction: 'Pulls the filed GSTR-9 API data.', userAction: 'None (Automated pull).', output: 'Declared GST Turnover', statusType: 'System Process' },
      { id: 3, title: 'Reconciliation', explanation: 'Compare Books with GSTR-9.', icon: SearchCode, purpose: 'Identifies exact differences between Books and Returns.', systemAction: 'Performs a variance analysis on Turnover and Tax Paid.', userAction: 'Review the variance report.', output: 'Reconciliation Variances', statusType: 'Auto Generated' },
      { id: 4, title: 'Difference Summary', explanation: 'Record adjustment reasons/remarks.', icon: AlertCircle, purpose: 'Provides explanations to the tax officer for any mismatches.', systemAction: 'Flags un-reconciled amounts for user input.', userAction: 'Enter text remarks for each difference.', output: 'Documented Differences', statusType: 'Validation Required' },
      { id: 5, title: 'Submit 9C', explanation: 'Upload signed reconciliation statement.', icon: Send, purpose: 'Files the mandatory self-certified statement.', systemAction: 'Transmits GSTR-9C JSON to the portal.', userAction: 'Digitally sign (DSC) and submit.', output: 'GSTR-9C ARN', statusType: 'Manual' }
    ],
    businessImpact: [
      'Explains differences between books and returns',
      'Prevents department notices and audits',
      'Requires CA/CMA certification (historically) / self-certification',
      'Identifies unrecorded tax liabilities'
    ],
    timeline: [
      { day: 'Post-Audit', title: 'Books Finalized' },
      { day: 'Nov-Dec', title: 'Compare with GSTR-9' },
      { day: 'Dec 20', title: 'Document Explanations' },
      { day: 'Dec 31', title: 'Filing Deadline' }
    ],
    didYouKnow: 'GSTR-9C is now self-certified by the taxpayer, eliminating the mandatory requirement for a CA/CMA signature.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'Mandatory if turnover exceeds ₹5 Crore.',
        'Must reconcile audited financials with GSTR-9.',
        'Unreconciled amounts may trigger audit.'
      ]
    },
    relatedReturns: ['GSTR-9', 'GST Health Check'],
    example: {
      scenario: 'Year-end financial audit reveals a ₹10,000 mismatch.',
      steps: [
        'GSTR-9 shows ₹10L turnover.',
        'Audited books show ₹10.1L turnover.',
        'Mismatch identified as an unrecorded credit note.',
        'Adjustment remark added and filed in 9C.'
      ]
    }
  },
  {
    id: 'gstr-2a',
    title: 'GSTR-2A',
    category: 'Statements & Reconciliation',
    themeColor: 'orange',
    purpose: 'A dynamic, read-only auto-generated GST statement showing all purchase invoices uploaded by your suppliers in their GSTR-1.',
    filedBy: 'Auto-generated by GSTN',
    frequency: 'Dynamic (Updates Continuously)',
    generatedFrom: ['Suppliers GSTR-1', 'GST Portal'],
    workflow: [
      { id: 1, title: 'Supplier Files GSTR-1', explanation: 'Supplier uploads their sales invoices.', icon: UploadCloud, purpose: 'Initiates the ITC data flow.', systemAction: 'GSTN receives the supplier\'s outward supply data.', userAction: 'None (Supplier action).', output: 'Supplier GSTR-1', statusType: 'System Process' },
      { id: 2, title: 'Appears in GSTR-2A', explanation: 'Invoice automatically reflects in your 2A.', icon: FileText, purpose: 'Makes the purchase data visible to the buyer.', systemAction: 'GSTN dynamically updates the buyer\'s 2A ledger.', userAction: 'None (Automated).', output: 'Updated GSTR-2A', statusType: 'Auto Generated' },
      { id: 3, title: 'Fetch Data', explanation: 'Pull data from GST Portal into ERP.', icon: RefreshCw, purpose: 'Syncs portal data with internal ERP for reconciliation.', systemAction: 'Calls GSTN APIs to download the latest JSON.', userAction: 'Click "Sync from Portal".', output: 'Local 2A Database', statusType: 'Manual' },
      { id: 4, title: 'View Summary', explanation: 'Analyze total suppliers and taxable amount.', icon: Search, purpose: 'Provides an overview of ITC available from compliant suppliers.', systemAction: 'Aggregates invoices by supplier GSTIN.', userAction: 'Review the high-level summary.', output: 'Supplier Summary', statusType: 'Auto Generated' },
      { id: 5, title: 'Review Invoices', explanation: 'Check individual invoice details.', icon: Receipt, purpose: 'Allows granular verification of specific transactions.', systemAction: 'Displays line-level details of taxes.', userAction: 'Search or filter for specific invoices.', output: 'Invoice Details', statusType: 'Manual' }
    ],
    businessImpact: [
      'Provides a real-time view of supplier compliance',
      'Helps identify missing purchase invoices',
      'Forms the basis for GST reconciliation',
      'Prevents ITC loss due to supplier negligence'
    ],
    timeline: [
      { day: 'Real-time', title: 'Suppliers Upload Invoices' },
      { day: 'Continuous', title: 'GSTR-2A Updates' },
      { day: 'Before Filing', title: 'Fetch Latest Data' },
      { day: 'Monthly', title: 'Review Supplier Status' }
    ],
    didYouKnow: 'Because GSTR-2A is dynamic, its values can change even after the month ends if a supplier files a late return.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'GSTR-2A is dynamic and changes continuously.',
        'Cannot be used as the final basis for ITC claims.',
        'Always rely on GSTR-2B for filing GSTR-3B.'
      ]
    },
    relatedReturns: ['GSTR-2B', 'GSTR-3B', 'GST Reconciliation'],
    example: {
      scenario: 'Checking if a new vendor uploaded their invoice.',
      steps: [
        'Vendor files GSTR-1 late.',
        'You fetch GSTR-2A data.',
        'The late invoice appears in your 2A.',
        'You can now track this transaction.'
      ]
    }
  },
  {
    id: 'gstr-2b',
    title: 'GSTR-2B',
    category: 'Statements & Reconciliation',
    themeColor: 'amber',
    purpose: 'A static auto-generated statement providing the final, locked-in eligible Input Tax Credit (ITC) for the month based on supplier filings by the cut-off date.',
    filedBy: 'Auto-generated by GSTN',
    frequency: 'Monthly (Static)',
    generatedFrom: ['Suppliers GSTR-1', 'GST Portal'],
    workflow: [
      { id: 1, title: 'Supplier Filing Cut-off', explanation: 'Suppliers file GSTR-1 by 11th/13th.', icon: Clock, purpose: 'Establishes the legal deadline for ITC inclusion.', systemAction: 'GSTN freezes data collection for the current month.', userAction: 'Ensure vendors filed on time.', output: 'Data Freeze', statusType: 'System Process' },
      { id: 2, title: 'GSTR-2B Generation', explanation: 'GSTN generates static 2B on 14th.', icon: FileText, purpose: 'Creates the legally binding ITC statement.', systemAction: 'GSTN computes eligible and ineligible ITC.', userAction: 'None (Automated).', output: 'Static GSTR-2B', statusType: 'Auto Generated' },
      { id: 3, title: 'Fetch 2B Data', explanation: 'ERP downloads the locked ITC data.', icon: RefreshCw, purpose: 'Syncs the locked ITC statement into the ERP.', systemAction: 'Calls GSTN APIs to download the static JSON.', userAction: 'Click "Fetch 2B".', output: 'Local 2B Database', statusType: 'Manual' },
      { id: 4, title: 'Verify Eligible ITC', explanation: 'System segregates eligible vs ineligible ITC.', icon: Calculator, purpose: 'Identifies exactly how much ITC can be claimed this month.', systemAction: 'Applies rules to separate eligible from ineligible (e.g. Blocked ITC).', userAction: 'Review the segregation.', output: 'ITC Claim Limit', statusType: 'Validation Required' },
      { id: 5, title: 'Claim in 3B', explanation: 'Use 2B data to file GSTR-3B.', icon: CheckCircle, purpose: 'Finalizes the monthly tax offset.', systemAction: 'Auto-populates ITC fields in GSTR-3B.', userAction: 'Approve and file GSTR-3B.', output: 'Filed GSTR-3B', statusType: 'Manual' }
    ],
    businessImpact: [
      'Determines the exact, legal ITC claim limit for the month',
      'Provides a locked snapshot that never changes',
      'Prevents ITC over-claiming penalties',
      'Streamlines monthly 3B filing'
    ],
    timeline: [
      { day: 'Day 11/13', title: 'Supplier Cut-off' },
      { day: 'Day 14', title: 'GSTR-2B Generated' },
      { day: 'Day 15', title: 'Reconcile 2B' },
      { day: 'Day 20', title: 'Claim ITC in 3B' }
    ],
    didYouKnow: 'You can only claim ITC that legally appears in your GSTR-2B. Claiming more can result in notices and interest.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'Claiming ITC beyond GSTR-2B is illegal.',
        'Attracts 24% p.a. interest on excess claims.',
        'Constant mismatches trigger notices.'
      ]
    },
    relatedReturns: ['GSTR-2A', 'GSTR-3B', 'GST Reconciliation'],
    example: {
      scenario: 'Vendor A files on 10th, Vendor B files on 15th.',
      steps: [
        'GSTR-2B generates on 14th.',
        'Vendor A\'s invoice is included in 2B.',
        'Vendor B\'s invoice misses the cut-off.',
        'You claim Vendor A\'s ITC this month, and B\'s next month.'
      ]
    }
  },
  {
    id: 'gst-reconciliation',
    title: 'GST Reconciliation',
    category: 'Statements & Reconciliation',
    themeColor: 'sky',
    purpose: 'Compare ERP purchase records with GST Portal data (GSTR-2A/2B) to identify mismatched, missing, or erroneous invoices before claiming ITC.',
    filedBy: 'Internal Finance Team',
    frequency: 'Monthly',
    generatedFrom: ['Purchase Module', 'GSTR-2A', 'GSTR-2B'],
    workflow: [
      { id: 1, title: 'Fetch Portal Data', explanation: 'Download 2A/2B into the ERP.', icon: UploadCloud, purpose: 'Gets the government baseline for matching.', systemAction: 'Downloads GSTR-2A/2B JSON files.', userAction: 'Trigger fetch.', output: 'Raw Portal Data', statusType: 'System Process' },
      { id: 2, title: 'Auto Match', explanation: 'System matches invoices by exact value/number.', icon: Settings, purpose: 'Automatically clears perfect matches to save time.', systemAction: 'Runs matching algorithm based on Invoice No, GSTIN, and Amount.', userAction: 'None (Automated).', output: 'Matched Invoices', statusType: 'Auto Generated' },
      { id: 3, title: 'Identify Differences', explanation: 'Flags partial matches and missing invoices.', icon: AlertTriangle, purpose: 'Highlights discrepancies that require human attention.', systemAction: 'Categorizes mismatches (e.g. Value Mismatch, Missing in PR).', userAction: 'Review mismatch categories.', output: 'Mismatch Categories', statusType: 'Validation Required' },
      { id: 4, title: 'Manual Match', explanation: 'User resolves fuzzy matches.', icon: SearchCode, purpose: 'Allows human intervention for formatting errors.', systemAction: 'Suggests probable matches based on fuzzy logic.', userAction: 'Manually link mismatched invoices.', output: 'Manually Matched Invoices', statusType: 'Manual' },
      { id: 5, title: 'Export Report', explanation: 'Generate reconciliation summary.', icon: FileJson, purpose: 'Creates actionable reports for vendor follow-up.', systemAction: 'Generates Excel/PDF showing missing invoices.', userAction: 'Download and send to vendors.', output: 'Vendor Follow-up Report', statusType: 'Manual' }
    ],
    businessImpact: [
      'Maximizes eligible Input Tax Credit',
      'Identifies defaulting suppliers early',
      'Prevents department notices for ITC mismatch',
      'Ensures accurate 3B filing'
    ],
    timeline: [
      { day: 'Day 14', title: '2B Generated' },
      { day: 'Day 15', title: 'Run Auto-Match' },
      { day: 'Day 16', title: 'Resolve Mismatches' },
      { day: 'Day 17', title: 'Finalize ITC Claim' }
    ],
    didYouKnow: 'A common mismatch is rounding differences (e.g., ₹100.50 vs ₹101). The ERP allows you to set a tolerance limit to auto-match these.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'Reconciliation is mandatory before 3B filing.',
        'Supplier follow-ups are critical for missing ITC.',
        'Reconciliation history must be saved for audits.'
      ]
    },
    relatedReturns: ['GSTR-2A', 'GSTR-2B', 'GSTR-3B'],
    example: {
      scenario: 'ERP shows ₹50,000 ITC, but Portal shows ₹40,000.',
      steps: [
        'Run Reconciliation Engine.',
        'System flags a ₹10,000 invoice as "Missing in Portal".',
        'You follow up with the supplier.',
        'Supplier files, and you claim it next month.'
      ]
    }
  },
  {
    id: 'e-invoice',
    title: 'E-Invoice',
    category: 'GST Digital Services',
    themeColor: 'teal',
    purpose: 'Generates GST-compliant electronic invoices by reporting them to the Invoice Registration Portal (IRP) to receive an IRN and QR Code.',
    filedBy: 'Applicable Taxpayers',
    frequency: 'Real-time per invoice',
    generatedFrom: ['Sales Invoice', 'ERP Billing Module'],
    workflow: [
      { id: 1, title: 'Sales Invoice Created', explanation: 'Standard invoice saved in ERP.', icon: Receipt, purpose: 'Creates the base transaction document.', systemAction: 'Saves invoice data in the database.', userAction: 'Generate and save a standard invoice.', output: 'Draft ERP Invoice', statusType: 'Manual' },
      { id: 2, title: 'Generate IRN Request', explanation: 'JSON data sent to IRP via API.', icon: Send, purpose: 'Formats data securely for government validation.', systemAction: 'Constructs the official E-Invoice JSON schema.', userAction: 'Click "Generate E-Invoice".', output: 'API Request Payload', statusType: 'System Process' },
      { id: 3, title: 'IRN Generated', explanation: 'IRP validates and returns digital signature.', icon: Zap, purpose: 'Legally authenticates the invoice.', systemAction: 'IRP validates uniqueness and returns a 64-char IRN.', userAction: 'None (Automated).', output: 'IRN & Signed QR Code', statusType: 'Auto Generated' },
      { id: 4, title: 'Update ERP', explanation: 'QR code embedded into the ERP PDF.', icon: FileText, purpose: 'Stores the government authentication locally.', systemAction: 'Embeds the QR code and IRN directly onto the Invoice PDF layout.', userAction: 'None.', output: 'Compliant E-Invoice PDF', statusType: 'Auto Generated' },
      { id: 5, title: 'Share Invoice', explanation: 'Valid e-invoice sent to customer.', icon: CheckCircle, purpose: 'Delivers the legal document to the buyer.', systemAction: 'Emails the PDF and JSON to the customer.', userAction: 'Click "Send to Customer".', output: 'Email Delivery', statusType: 'Manual' }
    ],
    businessImpact: [
      'Standardizes B2B invoicing nationwide',
      'Auto-populates GSTR-1 & E-Way Bills',
      'Eliminates fake invoices',
      'Speeds up the ITC claim process for buyers'
    ],
    timeline: [
      { day: 'T: 00:00', title: 'Invoice Saved' },
      { day: 'T: 00:01', title: 'Sent to IRP API' },
      { day: 'T: 00:03', title: 'IRN/QR Received' },
      { day: 'T: 00:05', title: 'PDF Ready to Print' }
    ],
    didYouKnow: 'An E-Invoice can only be cancelled within 24 hours of generation. After that, a credit note must be issued.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'E-Invoice cancellation only allowed within 24 hours.',
        'Cannot be partially cancelled.',
        'B2B invoices without IRN are invalid.'
      ]
    },
    relatedReturns: ['E-Way Bill', 'GSTR-1'],
    example: {
      scenario: 'Generating a B2B invoice for a large corporate client.',
      steps: [
        'Billing creates ₹5 Lakh invoice.',
        'ERP auto-pushes JSON to NIC IRP.',
        'IRP returns unique 64-character IRN & QR.',
        'QR printed on final invoice PDF.'
      ]
    }
  },
  {
    id: 'eway-bill',
    title: 'E-Way Bill',
    category: 'GST Digital Services',
    themeColor: 'violet',
    purpose: 'An electronic document generated before transporting goods worth more than the prescribed limit under GST.',
    filedBy: 'Consignors / Transporters',
    frequency: 'Per shipment',
    generatedFrom: ['Sales Invoice', 'Delivery Challan', 'Transport Details'],
    workflow: [
      { id: 1, title: 'Challan Ready', explanation: 'Document for goods movement prepared.', icon: FileText, purpose: 'Prepares the core document detailing the goods.', systemAction: 'Extracts item and value details from the invoice.', userAction: 'Generate a delivery challan.', output: 'Delivery Challan', statusType: 'Manual' },
      { id: 2, title: 'Transport Details', explanation: 'Add Transporter ID or Vehicle Number.', icon: Truck, purpose: 'Assigns the logistical information for transit tracking.', systemAction: 'Validates Transporter ID (Part B).', userAction: 'Enter vehicle number and distance.', output: 'EWB Part B Data', statusType: 'Validation Required' },
      { id: 3, title: 'Generate EWB', explanation: 'API call to E-Way Bill portal.', icon: Zap, purpose: 'Legally authorizes the movement of goods.', systemAction: 'Calls NIC API to generate the E-Way Bill Number.', userAction: 'Click "Generate E-Way Bill".', output: '12-Digit EWB Number', statusType: 'System Process' },
      { id: 4, title: 'EWB Active', explanation: 'EWB number assigned with validity.', icon: CheckCircle, purpose: 'Confirms the active status and expiration time.', systemAction: 'Calculates validity based on distance (1 day / 200km).', userAction: 'Review the validity period.', output: 'Active EWB PDF', statusType: 'Auto Generated' },
      { id: 5, title: 'Transit Update', explanation: 'Update part B if vehicle changes.', icon: RefreshCw, purpose: 'Maintains legality if logistics change during transit.', systemAction: 'Updates the existing EWB with a new vehicle number.', userAction: 'Enter new vehicle details.', output: 'Updated EWB', statusType: 'Manual' }
    ],
    businessImpact: [
      'Ensures legal transportation of goods',
      'Prevents tax evasion during transit',
      'Tracks vehicle movement and validity',
      'Reduces check-post wait times'
    ],
    timeline: [
      { day: 'Pre-dispatch', title: 'Generate EWB' },
      { day: 'In Transit', title: 'Validity active (km-based)' },
      { day: 'Check-post', title: 'QR Scan verification' },
      { day: 'Delivery', title: 'EWB Expires/Closes' }
    ],
    didYouKnow: 'E-Way Bill validity depends on the distance. Usually 1 day for every 200 km for regular cargo.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'Moving goods without EWB leads to 200% penalty.',
        'Validity extension must happen before expiry.',
        'Part B must be updated if vehicle changes.'
      ]
    },
    relatedReturns: ['E-Invoice', 'GSTR-1'],
    example: {
      scenario: 'Shipping goods from Mumbai to Delhi.',
      steps: [
        'Sales invoice generated.',
        'Truck number MH04xx entered.',
        'E-way bill generated via API.',
        'Driver carries EWB print/digital copy.'
      ]
    }
  },
  {
    id: 'msme-1',
    title: 'MSME-1',
    category: 'Compliance & ERP',
    themeColor: 'pink',
    purpose: 'A government report used to report payments that are pending for more than 45 days to MSME registered suppliers.',
    filedBy: 'Corporate Buyers',
    frequency: 'Half-Yearly',
    generatedFrom: ['Purchase Invoices', 'Vendor Master', 'Accounts Payable'],
    workflow: [
      { id: 1, title: 'Invoice Booked', explanation: 'Invoice from MSME vendor booked.', icon: Receipt, purpose: 'Records the liability to the MSME vendor.', systemAction: 'Flags the vendor as MSME based on Master Data.', userAction: 'Book the purchase invoice.', output: 'Accounts Payable Entry', statusType: 'Manual' },
      { id: 2, title: 'Ageing Analysis', explanation: 'System tracks days pending.', icon: Clock, purpose: 'Monitors payment timelines automatically.', systemAction: 'Calculates days since invoice date every night.', userAction: 'None (Automated).', output: 'Ageing Report', statusType: 'System Process' },
      { id: 3, title: 'Identify >45 Days', explanation: 'Filters invoices crossing the limit.', icon: AlertTriangle, purpose: 'Highlights potential legal non-compliance.', systemAction: 'Flags all invoices exceeding 45 unpaid days.', userAction: 'Review the flagged invoices.', output: 'Defaulter List', statusType: 'Auto Generated' },
      { id: 4, title: 'Return Prep', explanation: 'Consolidate pending amounts.', icon: FileText, purpose: 'Prepares the data required for MCA reporting.', systemAction: 'Aggregates amounts, vendor details, and reasons for delay.', userAction: 'Input the reason for the delay.', output: 'Draft MSME-1 Report', statusType: 'Validation Required' },
      { id: 5, title: 'Generate Report', explanation: 'Export MSME-1 file for ROC filing.', icon: CheckCircle, purpose: 'Creates the final compliant file.', systemAction: 'Generates the required format for MCA portal upload.', userAction: 'Export and upload to MCA.', output: 'MSME-1 JSON/Excel', statusType: 'Manual' }
    ],
    businessImpact: [
      'Ensures compliance with MSME Development Act',
      'Avoids heavy legal penalties and interest',
      'Improves supplier relationship',
      'Highlights cash-flow bottlenecks'
    ],
    timeline: [
      { day: 'Day 1', title: 'Invoice Date' },
      { day: 'Day 45', title: 'MSME Payment Due' },
      { day: 'Day 46+', title: 'Flagged for Report' },
      { day: 'Apr & Oct', title: 'Half-yearly Filing' }
    ],
    didYouKnow: 'If you delay MSME payments beyond 45 days, you must pay compound interest at 3x the RBI notified rate.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'Compound interest at 3x RBI rate for delays.',
        'Mandatory half-yearly reporting to MCA.',
        'Interest paid is not tax-deductible.'
      ]
    },
    relatedReturns: ['GST Reconciliation'],
    example: {
      scenario: 'Invoice from a micro-enterprise vendor is unpaid for 60 days.',
      steps: [
        'Accounts payable dashboard flags invoice.',
        'MSME-1 module picks it up during half-yearly run.',
        'Company files the delay reason with MCA.',
        'Mandatory interest liability is calculated.'
      ]
    }
  },
  {
    id: 'gst-health',
    title: 'GST Health Check',
    category: 'Compliance & ERP',
    themeColor: 'yellow',
    purpose: 'An ERP validation module that proactively checks GST data before filing to identify missing invoices, incorrect GSTINs, and mismatches.',
    filedBy: 'Internal Finance Team',
    frequency: 'Pre-filing (Monthly)',
    generatedFrom: ['All GST Data', 'Masters', 'Transactions'],
    workflow: [
      { id: 1, title: 'Run Engine', explanation: 'Scans all transactions for the period.', icon: Settings, purpose: 'Initiates a comprehensive data audit.', systemAction: 'Scans thousands of rows against 50+ validation rules.', userAction: 'Click "Run Health Check".', output: 'Scan Progress', statusType: 'System Process' },
      { id: 2, title: 'Identify Errors', explanation: 'Flags HSN errors, invalid GSTINs.', icon: AlertTriangle, purpose: 'Highlights specific records that will cause portal rejections.', systemAction: 'Generates an error log categorized by severity.', userAction: 'Review the error dashboard.', output: 'Error Log / Health Score', statusType: 'Auto Generated' },
      { id: 3, title: 'Correction Center', explanation: 'Fix errors directly from dashboard.', icon: RefreshCw, purpose: 'Allows rapid fixing of master data without leaving the module.', systemAction: 'Updates underlying invoices and masters globally.', userAction: 'Correct the invalid GSTINs or HSNs.', output: 'Clean Data', statusType: 'Manual' },
      { id: 4, title: 'Re-Validation', explanation: 'Re-run checks until Health Score is 100%.', icon: SearchCode, purpose: 'Ensures all corrections were effective.', systemAction: 'Re-runs the engine only on modified records.', userAction: 'Ensure score reaches 100%.', output: '100% Health Score', statusType: 'Validation Required' },
      { id: 5, title: 'Ready to File', explanation: 'Generate clean JSON for portal.', icon: CheckCircle, purpose: 'Approves the data for portal submission.', systemAction: 'Unlocks the GSTR-1/3B filing modules.', userAction: 'Proceed to GST Filing.', output: 'Unlocked Filing Modules', statusType: 'Auto Generated' }
    ],
    businessImpact: [
      'Prevents filing invalid returns',
      'Avoids GST departmental notices',
      'Saves time on manual cross-checking',
      'Ensures accurate ITC flow'
    ],
    timeline: [
      { day: 'Day 5', title: 'Run Initial Check' },
      { day: 'Day 6-8', title: 'Fix Master Data' },
      { day: 'Day 9', title: 'Re-validate 100%' },
      { day: 'Day 10', title: 'File Clean Return' }
    ],
    didYouKnow: 'Filing returns with invalid HSN codes or incorrect GSTINs can trigger automated notices from the GSTN AI systems.',
    importantNote: {
      title: '⚠ Important',
      items: [
        'Run health check before every GSTR-1/3B filing.',
        'Filing with errors invites automated notices.',
        'HSN mismatch causes ITC denial for buyers.'
      ]
    },
    relatedReturns: ['GSTR-1', 'GSTR-3B', 'GSTR-9'],
    example: {
      scenario: 'User accidentally typed a 14-digit GSTIN.',
      steps: [
        'Health Check runs before GSTR-1.',
        'Flags the invoice: "Invalid GSTIN Length".',
        'User clicks and corrects the GSTIN.',
        'Returns are filed flawlessly.'
      ]
    }
  }
];
