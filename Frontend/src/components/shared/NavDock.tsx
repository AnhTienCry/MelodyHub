import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Heart, Music, Settings } from 'lucide-react';

export function NavDock() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/client' },
    { icon: Search, label: 'Search', path: '/client/search' },
    { icon: Music, label: 'Player', path: '/client/player' },
    { icon: Library, label: 'Library', path: '/client/library' },
    { icon: Heart, label: 'Favorites', path: '/client/favorites' },
    { icon: Settings, label: 'Settings', path: '/client/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group p-3 rounded-full transition-all duration-300 ${
                active 
                  ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
              </div>
              
              {/* Active Indicator */}
              {active && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
