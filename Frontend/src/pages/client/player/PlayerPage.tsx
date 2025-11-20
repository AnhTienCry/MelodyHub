import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Volume2, MoreHorizontal } from 'lucide-react'
import { fetchTracks, type Track } from '../../../lib/data'
import { Visualizer, PlayerControls, TrackList } from '../../../components'

export default function PlayerPage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulate progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])

  // Load tracks from backend
  useEffect(() => {
    let mounted = true
    fetchTracks().then((data) => {
      if (!mounted) return
      setTracks(data)
      setCurrentTrack((prev) => prev ?? (data.length > 0 ? data[0] : null))
    })
    return () => {
      mounted = false
    }
  }, [])

  const handleNext = () => {
    if (!currentTrack || tracks.length === 0) return
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    setCurrentTrack(tracks[nextIndex])
    setProgress(0)
  }

  const handlePrev = () => {
    if (!currentTrack || tracks.length === 0) return
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
    setCurrentTrack(tracks[prevIndex])
    setProgress(0)
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black selection:bg-purple-500/30">
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          key={currentTrack?.id ?? 'bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className={`absolute inset-0 bg-linear-to-br ${currentTrack?.color ?? 'from-purple-600 to-pink-500'} opacity-20 blur-[100px]`}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-end items-center z-30">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/5 transition-all hover:scale-105 group"
        >
          <Menu size={20} className="text-white/70 group-hover:text-white" />
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6 gap-12">
        {/* Visualizer & Album Art Container */}
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
          {/* The Visualizer Ring */}
          <Visualizer isPlaying={isPlaying} />

          {/* Album Art */}
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden border-4 border-white/5"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear', repeatType: 'loop' }}
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
          >
            <AnimatePresence mode="wait">
              {currentTrack ? (
                <motion.img
                  key={currentTrack.id}
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-700 to-gray-900 text-white/60">Loading</div>
              )}
            </AnimatePresence>

            {/* Vinyl Center Hole */}
            <div className="absolute inset-0 m-auto w-20 h-20 bg-black/80 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-3 h-3 bg-[#1a1a1a] rounded-full border border-white/20" />
            </div>
          </motion.div>

          {/* Floating Song Info (Behind/Around) */}
          <div className="absolute -bottom-24 text-center space-y-2 z-20">
            <motion.h1
              key={currentTrack?.title ?? 'title'}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg"
            >
              {currentTrack?.title ?? 'No track loaded'}
            </motion.h1>
            <motion.p
              key={currentTrack?.artist ?? 'artist'}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/50 font-medium tracking-wide"
            >
              {currentTrack?.artist ?? ''}
            </motion.p>
          </div>
        </div>

        {/* Spacer for layout balance */}
        <div className="h-16" />

        {/* Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={handleNext}
          onPrev={handlePrev}
          progress={progress}
        />
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-center z-30 pointer-events-none">
        <button className="pointer-events-auto p-3 rounded-full hover:bg-white/5 text-white/30 hover:text-white transition-colors">
          <Volume2 size={20} />
        </button>
        <button className="pointer-events-auto p-3 rounded-full hover:bg-white/5 text-white/30 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Side Drawer */}
      <TrackList
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        tracks={tracks}
        currentTrack={currentTrack}
        onSelect={(track) => {
          setCurrentTrack(track)
          setIsPlaying(true)
          setProgress(0)
        }}
      />
    </div>
  )
}
