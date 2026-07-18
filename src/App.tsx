import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import MotionProvider from './providers/MotionProvider';
import ThemeProvider from './providers/ThemeProvider';

import { lazy, useEffect } from 'react';

const Home = lazy(() => import('./pages/Home/Home'));
const Purchase = lazy(() => import('./pages/Purchase/Purchase'));
const Sales = lazy(() => import('./pages/Sales/Sales'));
const Billing = lazy(() => import('./pages/Billing/Billing'));
const Accounting = lazy(() => import('./pages/Accounting/Accounting'));
const Payroll = lazy(() => import('./pages/Payroll/Payroll'));
const Banking = lazy(() => import('./pages/Banking/Banking'));
const GateManagement = lazy(() => import('./pages/GateManagement/GateManagement'));
const GST = lazy(() => import('./pages/GST/GST'));
const DPDPCompliance = lazy(() => import('./pages/DPDPCompliance/DPDPCompliance'));
const GstLearningCenter = lazy(() => import('./pages/GstLearningCenter'));
const GSTKnowledgeCenter = lazy(() => import('./pages/GSTKnowledgeCenter/GSTKnowledgeCenter'));

function App() {
  useEffect(() => {
    // Intelligent idle preloading for high-probability routes
    const prefetchRoutes = () => {
      import('./pages/GstLearningCenter');
      import('./pages/GST/GST');
      import('./pages/DPDPCompliance/DPDPCompliance');
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(prefetchRoutes, { timeout: 2000 });
      } else {
        setTimeout(prefetchRoutes, 1000);
      }
    }
  }, []);

  return (
    <MotionProvider>
      <HashRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />

              <Route path="purchase" element={<Purchase />} />
              <Route path="sales" element={<Sales />} />
              <Route path="billing" element={<Billing />} />
              <Route path="accounting" element={<Accounting />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="banking" element={<Banking />} />
              <Route path="gate-management" element={<GateManagement />} />
              <Route path="gst" element={<GST />} />
              <Route path="dpdp-compliance" element={<DPDPCompliance />} />
              <Route path="gst-learning" element={<GstLearningCenter />} />
              <Route path="gst-knowledge-center" element={<GSTKnowledgeCenter />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </MotionProvider>
  );
}

export default App;