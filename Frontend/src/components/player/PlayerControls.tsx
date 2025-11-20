import { Play, Pause, SkipBack, SkipForward, Shuffle, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

interface PlayerControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrev: () => void
  progress: number
}

export function PlayerControls({ isPlaying, onPlayPause, onNext, onPrev, progress }: PlayerControlsProps) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md z-20">
      {/* Progress Bar */}
      <div className="w-full group cursor-pointer">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.5 }}
          />
          {/* Glow effect on progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-full w-full bg-white/20 blur-md"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/40 mt-2 font-mono">
          <span>1:24</span>
          <span>3:50</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-between w-full px-4">
        <button className="text-white/40 hover:text-white transition-colors">
          <Shuffle size={20} />
        </button>

        <div className="flex items-center gap-6">
          <button onClick={onPrev} className="text-white/70 hover:text-white transition-transform hover:scale-110">
            <SkipBack size={28} fill="currentColor" className="opacity-50" />
          </button>

          <motion.button
            onClick={onPlayPause}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </motion.button>

          <button onClick={onNext} className="text-white/70 hover:text-white transition-transform hover:scale-110">
            <SkipForward size={28} fill="currentColor" className="opacity-50" />
          </button>
        </div>

        <button className="text-white/40 hover:text-pink-500 transition-colors">
          <Heart size={20} />
        </button>
      </div>
    </div>
  )
}

export default PlayerControls
