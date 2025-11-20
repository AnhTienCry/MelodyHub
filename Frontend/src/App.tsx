import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, ClientLayout, ProtectedRoute, NavDock } from './components';
import LoginPage from './pages/client/login/LoginPage';
import RegisterPage from './pages/client/register/RegisterPage';
import PlayerPage from './pages/client/player/PlayerPage';
import SearchPage from './pages/client/search/SearchPage';

// Client Pages
import ClientHome from './pages/client/Home/HomePage';

// Admin Pages
import AdminDashboard from './pages/admin/dashboard/DashboardPage';
import AdminUsers from './pages/admin/users/UsersPage';
import AdminSongs from './pages/admin/songs/SongsPage';

function App() {
  return (
    <Router>
      <div className="dark antialiased bg-black text-white min-h-screen">
        <Routes>
        {/* Public Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Redirect root to client */}
        <Route path="/" element={<Navigate to="/client" replace />} />
        
        {/* Client Routes - Protected */}
        <Route
          path="/client"
          element={
            <ProtectedRoute>
              <ClientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ClientHome />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="player" element={<PlayerPage />} />
        </Route>
        
        {/* Admin Routes - Protected with admin role */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="songs" element={<AdminSongs />} />
        </Route>
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/client" replace />} />
      </Routes>
      <NavDock />
      </div>
    </Router>
  );
}

export default App;
