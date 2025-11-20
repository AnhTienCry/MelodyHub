import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  onLogout: () => void;
}

function AdminSidebar({ onLogout }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-dark text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">🎵 Admin Panel</h1>
        <nav className="space-y-2">
          <Link
            to="/admin/dashboard"
            className="block px-4 py-3 rounded-lg hover:bg-dark-lighter transition"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="block px-4 py-3 rounded-lg hover:bg-dark-lighter transition"
          >
            👥 Users
          </Link>
          <Link
            to="/admin/songs"
            className="block px-4 py-3 rounded-lg hover:bg-dark-lighter transition"
          >
            🎵 Songs
          </Link>
          <Link
            to="/admin/playlists"
            className="block px-4 py-3 rounded-lg hover:bg-dark-lighter transition"
          >
            📚 Playlists
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-dark-lighter">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
