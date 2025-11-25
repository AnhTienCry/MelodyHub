import type { Song } from "../lib/data"

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
  artists: { name: string }[]
  album: { name: string; images: { url: string }[] }
  duration_ms: number
  preview_url?: string
}

/**
 * Fetch music categories from Spotify API
 */
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch("/api/songs/categories?limit=12")
    const data = await response.json()
    return data.categories?.items || []
  } catch (err) {
    console.error("Failed to fetch categories", err)
    throw err
  }
}

/**
 * Fetch new releases from Spotify API
 */
export const fetchNewReleases = async (): Promise<NewRelease[]> => {
  try {
    const response = await fetch("/api/songs/new-releases?limit=20")
    const data = await response.json()
    return data.albums?.items || []
  } catch (err) {
    console.error("Failed to fetch new releases", err)
    throw err
  }
}

/**
 * Fetch curated recommendations using search API
 * Since Spotify recommendations API requires user authentication,
 * we use curated search queries instead
 */
export const fetchCuratedRecommendations = async (fallbackTracks: Song[] = []): Promise<Song[]> => {
  try {
    // Use search API with curated queries instead of recommendations API
    // since recommendations require user authentication
    const curatedQueries = ['indie pop', 'alternative rock', 'electronic chill', 'jazz standards', 'classical piano']
    const randomQuery = curatedQueries[Math.floor(Math.random() * curatedQueries.length)]

    const response = await fetch(
      `/api/songs/search?q=${encodeURIComponent(randomQuery)}&type=track&limit=24`,
    )
    const data = await response.json()
    const transformed = (data.tracks?.items || []).map((track: SpotifyTrack) => ({
      id: track.id,
      title: track.name,
      artistId: { name: track.artists?.[0]?.name || "Unknown Artist" },
      albumId: { name: track.album?.name || "Unknown Album" },
      cover: track.album?.images?.[0]?.url,
      duration: track.duration_ms
        ? `${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, "0")}`
        : "0:00",
      preview_url: track.preview_url,
    }))
    return transformed
  } catch (err) {
    console.error("Failed to fetch recommendations", err)
    // Fallback to some tracks from the main collection
    return fallbackTracks.slice(0, 12)
  }
}