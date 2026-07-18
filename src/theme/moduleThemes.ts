export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export const moduleThemes: Record<string, ThemeColors> = {
  purchase: {
    primary: "#2F5FE3",
    secondary: "#1E3A8A",
    accent: "#60A5FA"
  },
  sales: {
    primary: "#059669",
    secondary: "#065F46",
    accent: "#34D399"
  },
  billing: {
    primary: "#7C3AED",
    secondary: "#5B21B6",
    accent: "#A78BFA"
  },
  accounting: {
    primary: "#D97706",
    secondary: "#92400E",
    accent: "#FBBF24"
  },
  payroll: {
    primary: "#BE185D",
    secondary: "#831843",
    accent: "#F472B6"
  },
  banking: {
    primary: "#2563EB",
    secondary: "#1E3A8A",
    accent: "#60A5FA"
  },
  "gate-management": {
    primary: "#6D28D9",
    secondary: "#4338CA",
    accent: "#8B5CF6"
  },
  gst: {
    primary: "#EA580C",
    secondary: "#9A3412",
    accent: "#FB923C"
  },
  "gst-knowledge-center": { 
    primary: "#EA580C",
    secondary: "#9A3412",
    accent: "#FB923C"
  },
  "dpdp-compliance": { 
    primary: "#4F46E5",
    secondary: "#3730A3",
    accent: "#818CF8"
  },
  default: { 
    primary: "#4F46E5",
    secondary: "#4338CA",
    accent: "#818CF8"
  }
};

/**
 * Converts a HEX color to an RGB string formatted as "R G B" 
 * for Tailwind's opacity modifier syntax (e.g., bg-primary/10)
 */
export const hexToRgbString = (hex: string): string => {
  const cleanHex = hex.replace('#', '');
  
  // Handle 3-digit hex
  const fullHex = cleanHex.length === 3 
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  return `${r} ${g} ${b}`;
};
