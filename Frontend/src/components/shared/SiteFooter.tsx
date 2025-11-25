import { Link } from 'react-router-dom'
import { Twitter, Instagram, Github } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="w-full bg-black/40 border-t border-white/5 pt-12 pb-12 px-6 md:px-12 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-linear-to-tr from-purple-600 to-indigo-600" />
            <span className="text-lg font-bold tracking-tighter text-white">MelodyHub</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">
            Immersive sonic landscapes for the digital age. Experience music like never before.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Discover</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <Link to="/client" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/client/search" className="hover:text-white transition-colors">
                Search
              </Link>
            </li>
            <li>
              <Link to="/client/player" className="hover:text-white transition-colors">
                Player
              </Link>
            </li>
            <li>
              <Link to="/client/library" className="hover:text-white transition-colors">
                Library
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Community</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <Link to="/register" className="hover:text-white transition-colors">
                Join Us
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-white transition-colors">
                Admin
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors">
                Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white text-white/50 transition-all">
              <Twitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white text-white/50 transition-all">
              <Instagram size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white text-white/50 transition-all">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
        <p>© 2025 MelodyHub. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
