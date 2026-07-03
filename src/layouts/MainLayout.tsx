import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import BackToTop from '../components/BackToTop/BackToTop';
import Footer from '../components/Footer/Footer';
import BackgroundEffects from '../components/BackgroundEffects/BackgroundEffects';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-slate-900 dark:text-slate-100">
      <BackgroundEffects />
      <ScrollProgress />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 relative">
          <div className="max-w-6xl mx-auto relative z-10 flex flex-col">
            <Outlet />
            <Footer />
          </div>
          <BackToTop />
        </main>
      </div>
    </div>
  );
}
