import { Outlet } from 'react-router-dom';
import Navbar from '@/features/Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* padding top chico para que no tape el header */}
      <div className="pt-2">
        <Outlet />
      </div>
    </div>
  );
}
