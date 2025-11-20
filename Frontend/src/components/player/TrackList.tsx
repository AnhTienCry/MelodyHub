"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Music2 } from 'lucide-react'
import type { Track } from '../../lib/data'

interface TrackListProps {
  isOpen: boolean
  onClose: () => void
  tracks: Track[]
  currentTrack?: Track | null
  onSelect: (track: Track) => void
}

export function TrackList({ isOpen, onClose, tracks, currentTrack, onSelect }: TrackListProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] bg-[#0a0a10]/90 border-l border-white/10 backdrop-blur-xl z-50 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold tracking-wider flex items-center gap-2">
                <Music2 size={20} className="text-purple-500" />
                PLAYLIST
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelect(track)}
                  className={`group p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-300 border border-transparent ${
                    currentTrack && currentTrack.id === track.id
                      ? 'bg-white/10 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                      : 'hover:bg-white/5 hover:border-white/5'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src={track.cover || '/placeholder.svg'} alt={track.title} className="object-cover w-full h-full" />
                    {currentTrack && currentTrack.id === track.id && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-1 h-3 bg-white mx-0.5 animate-pulse" />
                        <div className="w-1 h-5 bg-white mx-0.5 animate-pulse delay-75" />
                        <div className="w-1 h-2 bg-white mx-0.5 animate-pulse delay-150" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium truncate ${currentTrack && currentTrack.id === track.id ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                      {track.title}
                    </h3>
                    <p className="text-sm text-white/40 truncate group-hover:text-white/60">{track.artist}</p>
                  </div>

                  <span className="text-xs text-white/30 font-mono">{track.duration}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TrackList
