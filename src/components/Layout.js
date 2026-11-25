import { useEffect } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import RegisterStatus from './RegisterStatus';

export default function Layout() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView?.();
    } else if (navigationType === 'PUSH') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash, navigationType]);

  return (
    <div className="min-h-screen bg-[#f7f8f2] text-[#24362b]">
      <Navbar />
      <Outlet />
      <RegisterStatus />
      <Footer />
    </div>
  );
}
