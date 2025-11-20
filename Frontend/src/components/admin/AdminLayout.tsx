import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

function AdminLayout() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex">
      <AdminSidebar onLogout={handleLogout} />
      
      {/* Admin Content */}
      <main className="flex-1 bg-gray-50">
        <div className="bg-white shadow-sm p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
