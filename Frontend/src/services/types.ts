import type { Song } from "../lib/data"

/**
 * Common types used across services
 */

export interface Category {
  id: string
  name: string
  icons: { url: string }[]
}

export interface NewRelease {
  id: string
  name: string
  images: { url: string }[]
  artists: { name: string }[]
  release_date: string
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: { id: string; name: string }[]
  album: { id: string; name: string; images: { url: string }[] }
  duration_ms: number
  preview_url?: string
}

export interface ArtistItem {
  name: string
  image: string
  song: Song
}

// Re-export Song type for convenience
export type { Song }