"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Volume2, MoreHorizontal, Heart, Share2, ListMusic } from "lucide-react"
import type { Song } from "../../../lib/data"
import { Visualizer, PlayerControls, SongList } from "../../../components"
import { useSongs } from "../../../context/useSongs"

export default function PlayerPage() {
  const { songs, loading, error } = useSongs()
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev: number) => (prev >= 100 ? 0 : prev + 0.5))
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])

  useEffect(() => {
    if (!currentSong && songs && songs.length > 0) {
      const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => setCurrentSong(songs[0]), 0)
      return () => clearTimeout(timeoutId)
    }
    return undefined
  }, [songs, currentSong])

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return
    const currentIndex = songs.findIndex((song: Song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songs.length
    setCurrentSong(songs[nextIndex])
    setProgress(0)
  }

  const handlePrev = () => {
    if (!currentSong || songs.length === 0) return
    const currentIndex = songs.findIndex((song: Song) => song.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    setCurrentSong(songs[prevIndex])
    setProgress(0)
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-[#0a0a0f] via-[#1a0f2e] to-[#0f1419]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          key={currentSong?.id ?? "bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          {/* Dynamic Color Orbs based on song */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/40 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-blue-600/35 rounded-full blur-[130px]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Top Navigation - Glassmorphism */}
      <nav className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <ListMusic size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider">Now Playing</p>
            <p className="text-white font-semibold">Your Queue</p>
          </div>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="p-3 rounded-xl glass-panel glass-hover group">
          <Menu size={20} className="text-white/70 group-hover:text-white transition-colors" />
        </button>
      </nav>

      {/* Main Player Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6 gap-16">
        {loading ? (
          <div className="text-white text-xl">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-xl">{error}</div>
        ) : (
          <>
            {/* Album Art with Visualizer */}
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px]">
              {/* Visualizer Ring */}
              <Visualizer isPlaying={isPlaying} />

              {/* Album Art - Premium Design */}
              <motion.div
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden z-10 shadow-2xl"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 80px rgba(168, 85, 247, 0.4)",
                }}
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: 20,
                  repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                <AnimatePresence mode="wait">
                  {currentSong ? (
                    <motion.div
                      key={currentSong.id}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full h-full"
                    >
                      <img
                        src={currentSong.cover || "/placeholder.svg"}
                        alt={currentSong.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Vinyl Center */}
                      <div className="absolute inset-0 m-auto w-24 h-24 rounded-full glass-panel flex items-center justify-center">
                        <div className="w-4 h-4 bg-black/60 rounded-full border-2 border-white/30" />
                      </div>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900 text-white/40">
                      No song
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Glow Effect */}
              <div className="absolute -inset-8 bg-linear-to-r from-purple-600/30 via-blue-600/30 to-pink-600/30 opacity-60 blur-3xl -z-10" />
            </div>

            {/* Song Info - Enhanced Typography */}
            <div className="text-center space-y-3 max-w-2xl">
              <motion.h1
                key={currentSong?.title ?? "title"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg"
              >
                {currentSong?.title ?? "No song loaded"}
              </motion.h1>
              <motion.p
                key={currentSong?.artistId?.name ?? "artist"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-white/60 font-medium"
              >
                {currentSong?.artistId?.name ?? "Unknown Artist"}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-4 pt-4"
              >
                <button onClick={() => setIsLiked(!isLiked)} className="p-3 rounded-full glass-panel glass-hover group">
                  <Heart
                    size={20}
                    className={`transition-all ${isLiked ? "fill-pink-500 text-pink-500" : "text-white/60 group-hover:text-white"}`}
                  />
                </button>
                <button className="p-3 rounded-full glass-panel glass-hover group">
                  <Share2 size={20} className="text-white/60 group-hover:text-white transition-colors" />
                </button>
                <button className="p-3 rounded-full glass-panel glass-hover group">
                  <MoreHorizontal size={20} className="text-white/60 group-hover:text-white transition-colors" />
                </button>
              </motion.div>
            </div>

            {/* Player Controls */}
            <div className="w-full max-w-2xl">
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onNext={handleNext}
                onPrev={handlePrev}
                progress={progress}
              />
            </div>
          </>
        )}
      </div>

      {/* Bottom Volume Controls */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center z-30 pointer-events-none">
        <button className="pointer-events-auto p-3 rounded-full glass-panel glass-hover group">
          <Volume2 size={20} className="text-white/50 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Song List Drawer */}
      <SongList
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        songs={songs}
        currentSong={currentSong}
        onSelect={(song: Song) => {
          setCurrentSong(song)
          setIsPlaying(true)
          setProgress(0)
        }}
      />
    </div>
  )
}
