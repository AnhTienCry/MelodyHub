import type { Song, SpotifyTrack } from "./types"

/**
 * Recommendation Service - Handles curated music recommendations
 * Since Spotify's recommendation API requires user authentication,
 * we use search-based recommendations instead
 */
class RecommendationService {
  private baseUrl = '/api/songs'

  // Curated search queries for different music genres/moods
  private readonly curatedQueries = [
    'indie pop',
    'alternative rock',
    'electronic chill',
    'jazz standards',
    'classical piano',
    'ambient music',
    'folk acoustic',
    'hip hop beats',
    'lo-fi beats',
    'synthwave',
    'dream pop',
    'post rock'
  ] as const

  /**
   * Get curated recommendations using search API
   * @param limit - Number of recommendations to fetch (default: 24)
   * @param fallbackTracks - Tracks to use as fallback if API fails
   * @returns Promise<Song[]>
   */
  async getCuratedRecommendations(limit: number = 24, fallbackTracks: Song[] = []): Promise<Song[]> {
    try {
      // Select random curated query
      const randomQuery = this.getRandomCuratedQuery()

      const response = await fetch(
        `${this.baseUrl}/search?q=${encodeURIComponent(randomQuery)}&type=track&limit=${limit}`
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      const transformed = this.transformSpotifyTracks(data.tracks?.items || [])

      // Return transformed tracks or fallback
      return transformed.length > 0 ? transformed : fallbackTracks.slice(0, 12)
    } catch (error) {
      console.error('RecommendationService: Failed to fetch curated recommendations', error)

      // Return fallback tracks if available
      if (fallbackTracks.length > 0) {
        return fallbackTracks.slice(0, Math.min(12, fallbackTracks.length))
      }

      throw new Error('Unable to load music recommendations. Please try again later.')
    }
  }

  /**
   * Get recommendations by specific genre/mood
   * @param genre - Specific genre to search for
   * @param limit - Number of tracks to fetch (default: 20)
   * @returns Promise<Song[]>
   */
  async getRecommendationsByGenre(genre: string, limit: number = 20): Promise<Song[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/search?q=${encodeURIComponent(genre)}&type=track&limit=${limit}`
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return this.transformSpotifyTracks(data.tracks?.items || [])
    } catch (error) {
      console.error(`RecommendationService: Failed to fetch recommendations for genre: ${genre}`, error)
      throw error
    }
  }

  /**
   * Get random curated query
   * @returns string
   */
  getRandomCuratedQuery(): string {
    return this.curatedQueries[Math.floor(Math.random() * this.curatedQueries.length)]
  }

  /**
   * Get all available curated queries
   * @returns readonly string[]
   */
  getAllCuratedQueries(): readonly string[] {
    return this.curatedQueries
  }

  /**
   * Transform Spotify tracks to our Song format
   * @param tracks - Array of Spotify tracks
   * @returns Song[]
   */
  private transformSpotifyTracks(tracks: SpotifyTrack[]): Song[] {
    return tracks.map((track: SpotifyTrack) => ({
      id: track.id,
      title: track.name,
      artistId: { _id: track.artists?.[0]?.id || track.id, name: track.artists?.[0]?.name || "Unknown Artist" },
      albumId: { _id: track.album?.id || track.id, name: track.album?.name || "Unknown Album" },
      cover: track.album?.images?.[0]?.url,
      duration: track.duration_ms
        ? `${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, "0")}`
        : "0:00",
      preview_url: track.preview_url,
    }))
  }
}

// Export singleton instance
export const recommendationService = new RecommendationService()

// Export class for testing purposes
export { RecommendationService }