import { Toaster } from 'sonner';
import Sidebar from './Sidebar';
import MobileDrawer from './MobileDrawer';
import Navbar from './Navbar';
import Footer from './Footer';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileDrawer />

      {/* Main content column */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>

        <Footer />
      </div>

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}