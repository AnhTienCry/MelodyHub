"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { LogOut, LogIn } from "lucide-react"

export function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/5">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">MelodyHub</span>
      </Link>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
          <Link to="#" className="hover:text-white transition-colors">
            Discover
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Library
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Radio
          </Link>
        </nav>

        <div className="h-6 w-px bg-white/10 hidden md:block" />

        {isLoggedIn ? (
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
          >
            <div className="w-6 h-6 rounded-full bg-linear-to-br from-emerald-400 to-cyan-500" />
            <span className="text-sm font-medium text-white hidden sm:block">Alex</span>
            <LogOut size={16} className="text-white/50 group-hover:text-white ml-1" />
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
          >
            <span className="text-sm font-medium text-white">Login</span>
            <LogIn size={16} className="text-white/50 group-hover:text-white" />
          </Link>
        )}
      </div>
    </header>
  )
}

export default SiteHeader
