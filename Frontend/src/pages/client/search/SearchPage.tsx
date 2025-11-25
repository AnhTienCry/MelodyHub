"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowRight, Sparkles, Clock } from "lucide-react"
import PlayPreviewButton from "../../../components/player/PlayPreviewButton"
import apiClient from "../../../services/api"

interface SpotifyTrack {
  id: string
  name: string
  artists: [{ name: string }]
  album: {
    name: string
    images: [{ url: string }]
  }
  external_urls: { spotify: string }
  preview_url?: string
  duration_ms: number
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[]
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchTracks = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setTracks([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<SpotifySearchResponse>(
        `/api/spotify/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=20`,
      )
      setTracks(response.data.tracks.items)
    } catch (err) {
      console.error("Search error:", err)
      setError("Failed to search tracks. Please try again.")
      setTracks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchTracks(query)
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [query])

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <main className="relative w-full min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#1a0f2e] to-[#0f1419] flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-6xl mx-auto w-full p-8 md:p-12 pt-32">
        {/* Search Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
              <Search className="text-purple-400" size={24} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Search</h1>
              <p className="text-white/50 text-lg">Discover millions of tracks</p>
            </div>
          </motion.div>

          {/* Search Input - Premium Design */}
          <div className="relative">
            <div className="relative glass-panel rounded-3xl overflow-hidden">
              <input
                type="text"
                placeholder="Artists, songs, or albums..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-2xl md:text-3xl font-semibold text-white placeholder:text-white/20 focus:outline-none px-8 py-6"
                autoFocus
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
                  />
                ) : (
                  <Search className="text-white/30" size={28} />
                )}
              </div>
            </div>

            {/* Search Status */}
            <AnimatePresence>
              {query && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-white/40 text-sm mt-4 ml-2"
                >
                  {loading ? "Searching..." : `${tracks.length} results found`}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 pb-24">
          {/* Empty State */}
          {!query && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="text-purple-400" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Start Your Search</h3>
              <p className="text-white/50 text-lg">Find your next favorite track</p>
            </motion.div>
          )}

          {/* No Results */}
          {query && !loading && tracks.length === 0 && !error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-3">No results found</h3>
              <p className="text-white/50">Try searching with different keywords</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel rounded-2xl p-8 text-center"
            >
              <p className="text-red-400 text-lg">{error}</p>
            </motion.div>
          )}

          {/* Results Grid */}
          {tracks.length > 0 && (
            <div className="grid gap-3">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="group flex items-center justify-between p-5 rounded-2xl glass-panel glass-hover">
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      {/* Album Art */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-lg">
                        <img
                          src={track.album.images[0]?.url || "/placeholder.jpg"}
                          alt={track.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors truncate">
                          {track.name}
                        </h3>
                        <p className="text-white/50 group-hover:text-white/70 transition-colors truncate">
                          {track.artists.map((artist) => artist.name).join(", ")}
                        </p>
                        <p className="text-white/30 text-sm truncate">{track.album.name}</p>
                      </div>

                      {/* Duration */}
                      <div className="hidden md:flex items-center gap-2 text-white/40">
                        <Clock size={14} />
                        <span className="text-sm font-mono">{formatDuration(track.duration_ms)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 ml-4">
                      {track.preview_url && <PlayPreviewButton url={track.preview_url} />}
                      <a
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110"
                      >
                        <ArrowRight className="text-white" size={18} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
