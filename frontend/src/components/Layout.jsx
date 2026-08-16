import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Loader from './Loader.jsx';
import Cursor from './Cursor.jsx';
import { useReveal } from '../lib/hooks.js';

export default function Layout() {
  const location = useLocation();
  useReveal(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <>
      <Loader />
      <Cursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
