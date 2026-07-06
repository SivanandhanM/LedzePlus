import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import Purchase from './pages/Purchase/Purchase';
import Sales from './pages/Sales/Sales';
import Billing from './pages/Billing/Billing';
import Inventory from './pages/Inventory/Inventory';
import Accounting from './pages/Accounting/Accounting';
import Payroll from './pages/Payroll/Payroll';
import Banking from './pages/Banking/Banking';
import GateManagement from './pages/GateManagement/GateManagement';
import GST from './pages/GST/GST';

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
