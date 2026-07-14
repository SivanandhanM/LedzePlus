export interface TooltipData {
  purpose: string;
  inputs?: string[];
  outputs?: string[];
  relatedModules?: string[];
  estimatedTime?: string;
}

export interface WorkflowNode {
  id: string;
  label: string;
  icon: string;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  color?: string; // e.g., 'text-blue-500'
  tooltip?: TooltipData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  path?: string; // Optional custom SVG path data relative to 100x100 viewBox
}

export interface WorkflowData {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
