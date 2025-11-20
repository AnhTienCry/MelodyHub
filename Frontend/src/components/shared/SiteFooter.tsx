import { Link } from 'react-router-dom'
import { Twitter, Instagram, Github } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="w-full bg-black/40 border-t border-white/5 pt-16 pb-32 px-6 md:px-12 backdrop-blur-xl">
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
              <Link to="#" className="hover:text-white transition-colors">
                New Releases
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors">
                Trending
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors">
                Genres
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors">
                Artists
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Community</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <Link to="#" className="hover:text-white transition-colors">
                For Artists
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors">
                Developers
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors">
                Advertising
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition-colors">
                Investors
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <div className="flex gap-4">
            <Link to="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white text-white/50 transition-all">
              <Twitter size={18} />
            </Link>
            <Link to="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white text-white/50 transition-all">
              <Instagram size={18} />
            </Link>
            <Link to="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white text-white/50 transition-all">
              <Github size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
        <p>© 2025 MelodyHub. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
