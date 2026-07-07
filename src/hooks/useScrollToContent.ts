import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Global counter to track if this is the first time the hook runs in the SPA session
let mountCount = 0;

export function useScrollToContent() {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    mountCount++;
    const scrollKey = `scrolled_${location.key}`;

    // 1. If we've already scrolled for this specific history entry (e.g., user hit Back/Forward), 
    // we skip forced scrolling and let the browser's native scroll restoration handle it.
    if (sessionStorage.getItem(scrollKey)) {
      return;
    }

    // 2. On the very first render of a module page in a session, check if it was a browser refresh.
    // If it was a refresh, we skip forced scrolling so the browser can restore the exact scroll position.
    if (mountCount === 1) {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const isReload = navEntries.length > 0 
        ? navEntries[0].type === 'reload'
        : (performance.navigation && performance.navigation.type === 1);
        
      if (isReload) {
        sessionStorage.setItem(scrollKey, 'true');
        return;
      }
    }

    // 3. Otherwise (direct visit, or fresh SPA navigation from Home), execute the smooth scroll.
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        sessionStorage.setItem(scrollKey, 'true');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.key]);

  return ref;
}
