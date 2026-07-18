export interface ModuleStep {
  id: number;
  color: string; // key into COLOR_MAP: 'blue' | 'emerald' | 'amber' | 'cyan' | 'purple' | 'rose' | 'pink' | 'indigo' | 'orange' | 'teal'
  icon: string;  // lucide-react icon name (PascalCase)
  title: string;
  description: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  rules: string[];
  next: number[];
}

export interface ExtraFeature {
  icon: string;  // lucide-react icon name
  color: string;
  title: string;
  desc: string;
}

export interface Benefit {
  icon: string;  // lucide-react icon name
  color: string;
  text: string;
}

export interface ModuleWorkflowConfig {
  moduleName: string;         // e.g. "LEDZE+ Purchase"
  moduleLabel: string;        // e.g. "Purchase Module"
  subtitle: string;           // e.g. "Stock-to-Shelf Automation"
  stepCountLabel: string;     // e.g. "6 automated steps"
  bannerGradient: string;     // Tailwind gradient classes, e.g. "from-emerald-600 via-teal-600 to-cyan-700"
  steps: ModuleStep[];
  extraFeatures: ExtraFeature[];
  benefits: Benefit[];
}
