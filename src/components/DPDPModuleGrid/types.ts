import React from 'react';

export interface SecurityIconItem {
  icon: React.ReactNode;
  label: string;
}

export interface DPDPModuleData {
  moduleKey: string;
  shortDesc: string;
  description: string;
  securityIcons: SecurityIconItem[];
  features: string[];
  complianceScore: number;
  status: 'compliant' | 'partial' | 'review';
  owner: string;
  retentionPolicy: string;
  accessModel: string;
  auditTrail: string;
  protectionLayers: string[];
  implementationNote: string;
}

export interface DPDPTheme {
  name: string;
  cardBg: string;
  accent: string;
  accentLight: string;
  accentRgb: string;
  icon: React.ReactNode;
}
