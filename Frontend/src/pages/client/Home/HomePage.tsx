"use client"

import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useSongs } from "../../../context/useSongs"
import type { Song } from "../../../lib/data"
import { Play, Heart, MoreHorizontal, RefreshCw, Music, Sparkles, Disc, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import PlayPreviewButton from "../../../components/player/PlayPreviewButton"
import { useHomeData } from "../../../hooks/useHomeData"
import type { ArtistItem } from "../../../services/types"

export default function HomePage() {
  const { songs, loading, refresh } = useSongs()
  const tracks: Song[] = songs

  // Use custom hook for all homepage data
  const {
    categories,
    newReleases,
    recommendations,
    loadingCategories,
    loadingNewReleases,
    loadingRecommendations,
    refreshAllData
  } = useHomeData(tracks)

  const handleRefresh = async () => {
    try {
      await refresh()
      // Also refresh homepage data
      await refreshAllData()
    } catch (err) {
      console.error("Refresh failed", err)
    }
  }

  const navigate = useNavigate()
  const [hovered, setHovered] = useState<string | null>(null)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const featuredRef = useRef<HTMLDivElement | null>(null)

  const scrollFeatured = (delta: number) => {
    try {
      featuredRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
    } catch {
      // silent
    }
  }

  // safe reader for optional string fields on unknown objects (avoids `any`)
  const readStr = (obj: unknown, key: string): string | undefined => {
    try {
      const v = (obj as Record<string, unknown>)[key]
      return typeof v === 'string' ? v : undefined
    } catch {
      return undefined
    }
  }

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const openMore = (id: string) => {
    // placeholder for more actions: show menu or modal later
    console.log('More actions for', id)
  }

  return (
    <main className="relative w-full min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#1a0f2e] to-[#0f1419] text-white">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-blue-600/25 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[100px]"
        />

        {/* Grain Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <div className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        {/* Hero Section - Enhanced */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-linear-to-b from-purple-500 to-blue-500 rounded-full" />
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                <span className="bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Discover
                </span>
              </h1>
            </div>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed mb-6">
              Immerse yourself in extraordinary soundscapes. Your personal journey through music starts here.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="group flex items-center gap-3 px-6 py-3.5 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
              >
                <RefreshCw
                  size={18}
                  className={loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}
                />
                Refresh Collection
              </button>
              <Link
                to="/client/search"
                className="flex items-center gap-2 px-6 py-3.5 glass-panel glass-hover rounded-2xl text-white/80 font-medium"
              >
                <Music size={18} />
                Explore More
              </Link>
            </div>
          </motion.div>

          {/* Featured Tracks - Premium Cards */}
          <div className="relative">
            <div ref={featuredRef} className="overflow-x-auto no-scrollbar pb-8 -mx-6 px-6 md:-mx-12 md:px-12">
              <div className="flex gap-6 min-w-max">
                {loading && tracks.length === 0 ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="w-[340px] h-[480px] glass-panel rounded-3xl animate-pulse" />
                  ))
                ) : tracks.length === 0 ? (
                  <div className="glass-panel rounded-3xl p-12 text-center">
                    <Music className="w-16 h-16 mx-auto mb-4 text-white/30" />
                    <p className="text-white/60 text-lg mb-4">No tracks available yet</p>
                    <button onClick={handleRefresh} className="text-purple-400 hover:text-purple-300 underline">
                      Refresh Collection
                    </button>
                  </div>
                ) : (
                  tracks.slice(0, 10).map((track: Song, index: number) => {
                    const id = track.id ?? (track as { _id?: string })._id ?? `track-${index}`
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.5 }}
                        className="group relative w-[340px] shrink-0"
                        onMouseEnter={() => setHovered(id)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div
                          className="relative h-[480px] glass-panel rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
                          onClick={() => navigate("/client/player", { state: { songId: id } })}
                        >
                          {/* Album Cover */}
                            <div className="relative h-full">
                            <img
                              src={track.cover || "/placeholder.svg"}
                              alt={track.title}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            />
                            {/* Invisible hover overlay to trigger preview */}
                            <div className="absolute inset-0">
                              <PlayPreviewButton
                                url={track.preview_url || track.audioUrl}
                                title={track.title}
                                artist={track.artistId?.name}
                                cover={track.cover}
                                hideTrigger
                                forceShow={hovered === id}
                                metadata={{
                                  album: track.albumId?.name,
                                  category: readStr(track, 'category'),
                                  duration: track.duration,
                                  releaseDate: readStr(track, 'releaseDate'),
                                }}
                              />
                            </div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                          </div>

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            {/* Play Button */}
                            <motion.div
                              initial={false}
                              animate={{ scale: hovered === id ? 1 : 0.8, opacity: hovered === id ? 1 : 0 }}
                              className="mb-6"
                            >
                              <button className="w-16 h-16 rounded-full bg-linear-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-110 transition-all duration-300">
                                <Play size={24} className="fill-white text-white ml-1" />
                              </button>
                            </motion.div>

                            {/* Track Info */}
                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight line-clamp-2">
                              {track.title}
                            </h3>
                            <p className="text-white/70 font-medium mb-4">{track.artistId?.name || "Unknown Artist"}</p>

                            {/* Actions */}
                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleLike(id)
                                }}
                                className={
                                  "w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/20 transition-colors " +
                                  (liked.has(id) ? "text-red-400" : "text-white/80")
                                }
                                aria-pressed={liked.has(id)}
                                title={liked.has(id) ? "Unlike" : "Like"}
                              >
                                <Heart size={18} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openMore(id)
                                }}
                                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/20 transition-colors"
                                title="More"
                              >
                                <MoreHorizontal size={18} className="text-white/80" />
                              </button>
                            </div>
                          </div>

                          {/* Glow Effect */}
                          <div className="absolute -inset-1 bg-linear-to-r from-purple-600/0 via-purple-600/50 to-blue-600/0 opacity-0 group-hover:opacity-100 blur-2xl -z-10 transition-opacity duration-500" />
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Carousel controls */}
            <button
              onClick={() => scrollFeatured(-380)}
              aria-label="Scroll left"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center shadow-md"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scrollFeatured(380)}
              aria-label="Scroll right"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* Categories Grid - Modern Design */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <Music className="text-purple-400" size={20} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Browse by Mood</h2>
                <p className="text-white/50 text-sm">Find your perfect soundtrack</p>
              </div>
            </div>
            <Link to="/client/search" className="text-sm text-white/50 hover:text-white transition-colors font-medium">
              View All →
            </Link>
          </div>

          {loadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {categories.slice(0, 12).map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer glass-panel hover:scale-105 transition-all duration-300"
                  onClick={() => navigate(`/client/search?category=${category.id}`)}
                >
                  <img
                    src={category.icons?.[0]?.url || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-sm truncate">{category.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* New Releases - Horizontal Scroll */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-600/20 to-emerald-600/20 flex items-center justify-center">
                <Disc className="text-green-400" size={20} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Fresh Releases</h2>
                <p className="text-white/50 text-sm">Latest drops from your favorite artists</p>
              </div>
            </div>
            <Link to="/client/search" className="text-sm text-white/50 hover:text-white transition-colors font-medium">
              View All →
            </Link>
          </div>

          {loadingNewReleases ? (
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-[220px] aspect-square rounded-2xl bg-white/5 animate-pulse shrink-0" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto no-scrollbar -mx-6 px-6 md:-mx-12 md:px-12">
              <div className="flex gap-6 min-w-max pb-4">
                {newReleases.map((release, idx) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="w-[220px] group cursor-pointer shrink-0"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 glass-panel group-hover:scale-105 transition-all duration-300">
                      <img
                        src={release.images?.[0]?.url || "/placeholder.svg"}
                        alt={release.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate("/client/player", { state: { songId: release.id } })
                        }}
                        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-green-600/40 hover:scale-110"
                        title="Play"
                      >
                        <Play size={20} className="fill-white text-white ml-0.5" />
                      </button>
                    </div>
                    <h4 className="text-white font-semibold truncate mb-1">{release.name}</h4>
                    <p className="text-white/50 text-sm truncate">{release.artists?.[0]?.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Top Artists - Circular Grid */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-yellow-600/20 to-orange-600/20 flex items-center justify-center">
                <Star className="text-yellow-400" size={20} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Trending Artists</h2>
                <p className="text-white/50 text-sm">Popular creators right now</p>
              </div>
            </div>
            <Link to="/client/search" className="text-sm text-white/50 hover:text-white transition-colors font-medium">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {tracks
              .slice(0, 24)
              .reduce((artists: ArtistItem[], track) => {
                const artistName = track.artistId?.name
                if (artistName && !artists.find((a) => a.name === artistName)) {
                  artists.push({
                    name: artistName,
                    image: track.cover || "https://via.placeholder.com/150",
                    song: track,
                  })
                }
                return artists
              }, [])
              .slice(0, 16)
              .map((artist: ArtistItem, i: number) => (
                <motion.div
                  key={`artist-${i}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="group text-center cursor-pointer"
                  onClick={() => navigate("/client/player", { state: { songId: artist.song.id } })}
                >
                  <div className="relative w-full aspect-square mx-auto mb-3 rounded-full overflow-hidden glass-panel group-hover:scale-110 transition-all duration-300">
                    <img
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0">
                      <PlayPreviewButton
                        url={(artist.song as Song).preview_url || (artist.song as Song).audioUrl}
                        title={artist.name}
                        artist={artist.name}
                        cover={artist.image}
                        hideTrigger
                        metadata={{
                          album: (artist.song as Song).albumId?.name,
                          category: readStr(artist.song, 'category'),
                          duration: (artist.song as Song).duration,
                          releaseDate: readStr(artist.song, 'releaseDate'),
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play size={18} className="fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h4 className="text-white/90 font-medium text-sm truncate group-hover:text-white transition-colors">
                    {artist.name}
                  </h4>
                </motion.div>
              ))}
          </div>
        </section>

        {/* Recommendations - List View */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-pink-600/20 to-purple-600/20 flex items-center justify-center">
                <Sparkles className="text-pink-400" size={20} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Curated Picks</h2>
                <p className="text-white/50 text-sm">Handpicked tracks for your listening pleasure</p>
              </div>
            </div>
          </div>

          {loadingRecommendations ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-panel rounded-2xl p-4 animate-pulse h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendations.slice(0, 12).map((track: Song, i: number) => {
                const id = track.id ?? `rec-${i}`
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex items-center gap-4 p-4 rounded-2xl glass-panel glass-hover cursor-pointer"
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => navigate("/client/player", { state: { songId: id } })}
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={track.cover || "/placeholder.svg"}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                      <div className="absolute inset-0">
                      <PlayPreviewButton
                        url={track.preview_url || track.audioUrl}
                        title={track.title}
                        artist={track.artistId?.name}
                        cover={track.cover}
                        hideTrigger
                        forceShow={hovered === id}
                        metadata={{
                          album: track.albumId?.name,
                          category: readStr(track, 'category'),
                          duration: track.duration,
                          releaseDate: readStr(track, 'releaseDate'),
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={16} className="fill-white text-white" />
                    </div>
                  </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold truncate group-hover:text-purple-300 transition-colors">
                        {track.title}
                      </h4>
                      <p className="text-white/50 text-sm truncate">{track.artistId?.name || "Unknown Artist"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-sm font-mono">{track.duration}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(id)
                        }}
                        className={
                          "opacity-0 group-hover:opacity-100 transition-opacity hover:text-white " +
                          (liked.has(id) ? "text-red-400" : "text-white/60")
                        }
                        title={liked.has(id) ? "Unlike" : "Like"}
                        aria-pressed={liked.has(id)}
                      >
                        <Heart size={18} />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </section>

        {/* Recently Played */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
                <Clock className="text-blue-400" size={20} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Continue Listening</h2>
                <p className="text-white/50 text-sm">Pick up where you left off</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tracks
              .slice(-9)
              .reverse()
              .map((track: Song, i: number) => (
                <motion.div
                  key={track.id ?? `recent-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl glass-panel glass-hover cursor-pointer"
                  onMouseEnter={() => setHovered(track.id ?? null)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => navigate("/client/player", { state: { songId: track.id } })}
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={track.cover || "/placeholder.svg"}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0">
                      <PlayPreviewButton
                        url={track.preview_url || track.audioUrl}
                        title={track.title}
                        artist={track.artistId?.name}
                        cover={track.cover}
                        hideTrigger
                        metadata={{
                          album: track.albumId?.name,
                          category: readStr(track, 'category'),
                          duration: track.duration,
                          releaseDate: readStr(track, 'releaseDate'),
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={14} className="fill-white text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm truncate">{track.title}</h4>
                    <p className="text-white/50 text-xs truncate">{track.artistId?.name}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>
      </div>
    </main>
  )
}
