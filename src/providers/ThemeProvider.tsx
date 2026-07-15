import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { moduleThemes, hexToRgbString } from '../theme/moduleThemes';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // Determine the active module from the pathname (e.g., /purchase -> purchase)
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const activeModule = pathSegments.length > 0 ? pathSegments[0] : 'default';
    
    // Retrieve the specific theme or fallback to default
    const theme = moduleThemes[activeModule] || moduleThemes['default'];

    const primaryRgb = hexToRgbString(theme.primary);
    const secondaryRgb = hexToRgbString(theme.secondary);
    const accentRgb = hexToRgbString(theme.accent);

    const root = document.documentElement;
    root.style.setProperty('--color-primary', primaryRgb);
    root.style.setProperty('--color-secondary', secondaryRgb);
    root.style.setProperty('--color-accent', accentRgb);
    
    // Also inject hex values in case some arbitrary JS components need them directly via CSS vars
    root.style.setProperty('--color-primary-hex', theme.primary);
    root.style.setProperty('--color-secondary-hex', theme.secondary);
    root.style.setProperty('--color-accent-hex', theme.accent);
  }, [location.pathname]);

  return <>{children}</>;
}
