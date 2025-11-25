"use client"

import type React from "react"

export default function PreviewCard({
  url,
  title,
  artist,
  cover,
  playing,
  progress,
  remaining,
  onToggle,
  onOpen,
  style,
  metadata,
}: {
  url?: string
  title?: string
  artist?: string
  cover?: string
  playing?: boolean
  progress?: number
  remaining?: number
  onToggle?: () => void
  onOpen?: () => void
  style?: React.CSSProperties
  metadata?: {
    album?: string
    category?: string
    duration?: string
    releaseDate?: string
    [key: string]: string | undefined
  }
}) {
  const fmt = (s?: number) => {
    if (s == null) return ""
    const m = Math.floor(s / 60)
    const sec = String(s % 60).padStart(2, "0")
    return `${m}:${sec}`
  }

  return (
    <div
      style={style}
      className="rounded-2xl bg-[#0a0f17]/95 border border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-white transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col w-full h-full">
        {/* Top 50%: Cover Image with Preview Controls */}
        <div className="relative flex-1 min-h-0">
          {cover ? (
            <img src={cover || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/10" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Preview Badge */}
          <div className="absolute left-3 top-3 text-[11px] text-purple-300/90 font-medium tracking-wide bg-black/50 px-2 py-1 rounded">
            Preview • 30s
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={onToggle}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 ${
              url ? "bg-linear-to-br from-purple-500 to-blue-600 hover:scale-110" : "bg-white/20 cursor-default"
            }`}
          >
            <span className="text-white text-lg">{playing ? "❚❚" : "▶"}</span>
          </button>

          {/* Progress Bar at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-linear-to-r from-purple-400 to-blue-400 transition-all duration-200"
              style={{ width: `${Math.round((progress || 0) * 100)}%` }}
            />
          </div>
        </div>

        {/* Bottom 50%: Song Information */}
        <div className="flex-1 p-4 flex flex-col justify-between bg-linear-to-t from-[#0a0f17] to-[#0a0f17]/80">
          {/* Song Title & Artist */}
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white truncate leading-tight">{title}</h3>
            <p className="text-sm text-white/60 truncate">{artist}</p>
          </div>

          {/* Metadata */}
          <div className="text-[12px] text-white/70 space-y-1 my-2">
            {metadata?.album && (
              <div className="flex items-center gap-2">
                <span className="text-white/40">Album:</span>
                <span className="truncate">{metadata.album}</span>
              </div>
            )}
            {metadata?.category && (
              <div className="flex items-center gap-2">
                <span className="text-white/40">Category:</span>
                <span className="truncate">{metadata.category}</span>
              </div>
            )}
            {metadata?.duration && (
              <div className="flex items-center gap-2">
                <span className="text-white/40">Duration:</span>
                <span className="truncate">{metadata.duration}</span>
              </div>
            )}
            {metadata?.releaseDate && (
              <div className="flex items-center gap-2">
                <span className="text-white/40">Released:</span>
                <span className="truncate">{metadata.releaseDate}</span>
              </div>
            )}
          </div>

          {/* Time remaining & Open button */}
          <div className="flex items-center justify-between text-[12px] text-white/60 mt-auto">
            <span>{fmt(remaining)} left</span>
            <button
              onClick={onOpen}
              className="px-3 py-1.5 rounded-md text-[12px] bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 backdrop-blur-sm transition-colors"
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
