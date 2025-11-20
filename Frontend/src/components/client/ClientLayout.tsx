import { Outlet } from 'react-router-dom';
import SiteHeader from '../shared/SiteHeader';
import SiteFooter from '../shared/SiteFooter';

function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export default ClientLayout;
