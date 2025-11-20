import type { ReactNode } from 'react';
import SiteHeader from '../shared/SiteHeader';
import SiteFooter from '../shared/SiteFooter';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-20 p-8 bg-gray-50">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export default Layout;
