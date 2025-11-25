import type { NewRelease } from "./types"

/**
 * Release Service - Handles Spotify new releases API calls
 */
class ReleaseService {
  private baseUrl = '/api/songs'

  /**
   * Fetch new releases from Spotify
   * @param limit - Number of releases to fetch (default: 20)
   * @returns Promise<NewRelease[]>
   */
  async getNewReleases(limit: number = 20): Promise<NewRelease[]> {
    try {
      const response = await fetch(`${this.baseUrl}/new-releases?limit=${limit}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.albums?.items || []
    } catch (error) {
      console.error('ReleaseService: Failed to fetch new releases', error)
      throw new Error('Unable to load new music releases. Please try again later.')
    }
  }

  /**
   * Get album details by ID
   * @param albumId - Spotify album ID
   * @returns Promise<unknown>
   */
  async getAlbumDetails(albumId: string): Promise<unknown> {
    try {
      const response = await fetch(`${this.baseUrl}/album/${albumId}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`ReleaseService: Failed to fetch album ${albumId}`, error)
      throw error
    }
  }

  /**
   * Get album tracks
   * @param albumId - Spotify album ID
   * @param limit - Number of tracks to fetch (default: 50)
   * @param offset - Offset for pagination (default: 0)
   * @returns Promise<unknown>
   */
  async getAlbumTracks(albumId: string, limit: number = 50, offset: number = 0): Promise<unknown> {
    try {
      const response = await fetch(`${this.baseUrl}/album/${albumId}/tracks?limit=${limit}&offset=${offset}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.items || []
    } catch (error) {
      console.error(`ReleaseService: Failed to fetch tracks for album ${albumId}`, error)
      throw error
    }
  }
}

// Export singleton instance
export const releaseService = new ReleaseService()

// Export class for testing purposes
export { ReleaseService }