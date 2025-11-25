"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import PreviewCard from "./PreviewCard"

export default function PlayPreviewButton({
  url,
  title,
  artist,
  cover,
  metadata,
  forceShow,
  onOpen,
  hideTrigger,
  triggerClassName,
}: {
  url?: string
  title?: string
  artist?: string
  cover?: string
  metadata?: {
    album?: string
    category?: string
    duration?: string
    releaseDate?: string
    [key: string]: string | undefined
  }
  forceShow?: boolean
  onOpen?: () => void
  hideTrigger?: boolean
  triggerClassName?: string
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [show, setShow] = useState(false)
  const [pos, setPos] = useState<{ left: number; top: number; width: number; height: number } | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const hideTimer = useRef<number | null>(null)
  const hoverDelayTimer = useRef<number | null>(null)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(30)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current && url) {
      const a = new Audio(url)
      a.preload = "metadata"
      a.onloadedmetadata = () => {
        setDuration(Math.floor(a.duration || 30))
      }
      a.onended = () => setPlaying(false)
      a.onerror = () => {
        console.error("Audio load error")
        setPlaying(false)
      }
      audioRef.current = a
    }
  }, [url])

  useEffect(() => {
    let t: number | undefined
    if (playing && audioRef.current) {
      t = window.setInterval(() => {
        setCurrent(Math.floor(audioRef.current?.currentTime || 0))
        if ((audioRef.current?.currentTime || 0) >= 30) {
          audioRef.current!.pause()
          setPlaying(false)
        }
      }, 250)
    }
    return () => {
      if (t) window.clearInterval(t)
    }
  }, [playing])

  const getElementRect = useCallback(() => {
    const el = wrapperRef.current?.closest(".group")?.querySelector("img") as HTMLElement | null
    const fallback = wrapperRef.current as HTMLElement | null
    return el || fallback
  }, [])

  const calculatePosition = useCallback(() => {
    const el = getElementRect()
    if (!el) return null

    const r = el.getBoundingClientRect()
    const isVisible = r.bottom > 0 && r.top < window.innerHeight
    if (!isVisible) return null

    return {
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
    }
  }, [getElementRect])

  // compute position when forceShow toggles on
  useEffect(() => {
    if (forceShow) {
      const position = calculatePosition()
      if (!position) {
        queueMicrotask(() => setShow(false))
        return
      }

      queueMicrotask(() => {
        setPos(position)
        if (hoverDelayTimer.current) {
          window.clearTimeout(hoverDelayTimer.current)
        }
        hoverDelayTimer.current = window.setTimeout(() => {
          setShow(true)
          // Auto-play when shown
          if (url) {
            try {
              if (!audioRef.current) {
                const a = new Audio(url)
                a.preload = "auto"
                a.onloadedmetadata = () => setDuration(Math.floor(a.duration || 30))
                a.onended = () => setPlaying(false)
                audioRef.current = a
              }
              void audioRef.current
                .play()
                .then(() => setPlaying(true))
                .catch(() => {})
            } catch {
              void 0
            }
          }
          hoverDelayTimer.current = null
        }, 3000) // 3 second delay
      })
    } else {
      // Cancel delay timer on mouse leave
      if (hoverDelayTimer.current) {
        window.clearTimeout(hoverDelayTimer.current)
        hoverDelayTimer.current = null
      }
      queueMicrotask(() => setShow(false))
    }
  }, [forceShow, url, calculatePosition])

  // Watch scroll/resize and hide if source moves out of view
  useEffect(() => {
    if (!show) return
    const onCheck = () => {
      try {
        const el = getElementRect()
        if (!el) {
          setShow(false)
          return
        }
        const r = el.getBoundingClientRect()
        const isVisible = r.bottom > 0 && r.top < window.innerHeight
        if (!isVisible) {
          setShow(false)
          if (audioRef.current) {
            audioRef.current.pause()
            setPlaying(false)
          }
        } else {
          // Update position on scroll
          setPos({
            left: r.left,
            top: r.top,
            width: r.width,
            height: r.height,
          })
        }
      } catch {
        void 0
      }
    }
    window.addEventListener("scroll", onCheck, true)
    window.addEventListener("resize", onCheck)
    return () => {
      window.removeEventListener("scroll", onCheck, true)
      window.removeEventListener("resize", onCheck)
    }
  }, [show, getElementRect])

  const toggle = async () => {
    try {
      if (!audioRef.current) return
      if (playing) {
        audioRef.current.pause()
        setPlaying(false)
      } else {
        if (audioRef.current.currentTime >= (audioRef.current.duration || 30)) {
          audioRef.current.currentTime = 0
        }
        await audioRef.current.play()
        setPlaying(true)
      }
    } catch (err) {
      console.error("Preview play error", err)
    }
  }

  const remaining = Math.max(0, (duration || 30) - current)

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        const position = calculatePosition()
        if (position) {
          setPos(position)
        }

        if (hideTimer.current) {
          window.clearTimeout(hideTimer.current)
          hideTimer.current = null
        }

        if (hoverDelayTimer.current) {
          window.clearTimeout(hoverDelayTimer.current)
        }
        hoverDelayTimer.current = window.setTimeout(() => {
          setShow(true)
          // Auto-play on hover after delay
          if (url) {
            try {
              if (!audioRef.current) {
                const a = new Audio(url)
                a.preload = "auto"
                a.onloadedmetadata = () => setDuration(Math.floor(a.duration || 30))
                a.onended = () => setPlaying(false)
                audioRef.current = a
              }
              void audioRef.current
                .play()
                .then(() => setPlaying(true))
                .catch(() => {})
            } catch {
              void 0
            }
          }
          hoverDelayTimer.current = null
        }, 3000) // 3 second delay
      }}
      onMouseLeave={() => {
        // Cancel hover delay timer
        if (hoverDelayTimer.current) {
          window.clearTimeout(hoverDelayTimer.current)
          hoverDelayTimer.current = null
        }

        if (hideTimer.current) window.clearTimeout(hideTimer.current)
        hideTimer.current = window.setTimeout(() => {
          setShow(false)
          try {
            if (audioRef.current) {
              audioRef.current.pause()
              setPlaying(false)
            }
          } catch {
            void 0
          }
          hideTimer.current = null
        }, 220)
      }}
    >
      <button
        onClick={toggle}
        className={
          hideTrigger
            ? "absolute inset-0 w-full h-full bg-transparent p-0 m-0"
            : triggerClassName ||
              "w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition"
        }
        style={hideTrigger ? { opacity: 0, pointerEvents: "auto" as const } : undefined}
        aria-pressed={playing}
      >
        {!hideTrigger ? (playing ? "❚❚" : "▶") : null}
      </button>

      {show &&
        pos &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: pos.left,
              top: pos.top,
              width: pos.width,
              height: pos.height,
              zIndex: 10050,
              pointerEvents: "none",
            }}
          >
            <div
              onMouseEnter={() => {
                if (hideTimer.current) {
                  window.clearTimeout(hideTimer.current)
                  hideTimer.current = null
                }
              }}
              onMouseLeave={() => {
                if (hideTimer.current) window.clearTimeout(hideTimer.current)
                hideTimer.current = window.setTimeout(() => {
                  setShow(false)
                  try {
                    if (audioRef.current) {
                      audioRef.current.pause()
                      setPlaying(false)
                    }
                  } catch {
                    void 0
                  }
                  hideTimer.current = null
                }, 180)
              }}
              className="w-full h-full"
              style={{ pointerEvents: "auto" }}
            >
              <PreviewCard
                url={url}
                title={title}
                artist={artist}
                cover={cover}
                metadata={metadata}
                playing={playing}
                progress={duration ? current / duration : 0}
                remaining={remaining}
                onToggle={toggle}
                style={{
                  pointerEvents: "auto",
                  width: "100%",
                  height: "100%",
                }}
                onOpen={onOpen}
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
