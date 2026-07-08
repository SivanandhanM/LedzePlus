import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home/Home'));
const Purchase = lazy(() => import('./pages/Purchase/Purchase'));
const Sales = lazy(() => import('./pages/Sales/Sales'));
const Billing = lazy(() => import('./pages/Billing/Billing'));
const Inventory = lazy(() => import('./pages/Inventory/Inventory'));
const Accounting = lazy(() => import('./pages/Accounting/Accounting'));
const Payroll = lazy(() => import('./pages/Payroll/Payroll'));
const Banking = lazy(() => import('./pages/Banking/Banking'));
const GateManagement = lazy(() => import('./pages/GateManagement/GateManagement'));
const GST = lazy(() => import('./pages/GST/GST'));

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="purchase" element={<Purchase />} />
          <Route path="sales" element={<Sales />} />
          <Route path="billing" element={<Billing />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="banking" element={<Banking />} />
          <Route path="gate-management" element={<GateManagement />} />
          <Route path="gst" element={<GST />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;