import type { Category } from "./types"

/**
 * Category Service - Handles Spotify category-related API calls
 */
class CategoryService {
  private baseUrl = '/api/songs'

  /**
   * Fetch music categories from Spotify
   * @param limit - Number of categories to fetch (default: 12)
   * @returns Promise<Category[]>
   */
  async getCategories(limit: number = 12): Promise<Category[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories?limit=${limit}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.categories?.items || []
    } catch (error) {
      console.error('CategoryService: Failed to fetch categories', error)
      throw new Error('Unable to load music categories. Please try again later.')
    }
  }

  /**
   * Get category details by ID
   * @param categoryId - Spotify category ID
   * @returns Promise<unknown>
   */
  async getCategoryDetails(categoryId: string): Promise<unknown> {
    try {
      const response = await fetch(`${this.baseUrl}/categories/${categoryId}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`CategoryService: Failed to fetch category ${categoryId}`, error)
      throw error
    }
  }

  /**
   * Get playlists for a specific category
   * @param categoryId - Spotify category ID
   * @param limit - Number of playlists to fetch (default: 20)
   * @returns Promise<unknown>
   */
  async getCategoryPlaylists(categoryId: string, limit: number = 20): Promise<unknown> {
    try {
      const response = await fetch(`${this.baseUrl}/categories/${categoryId}/playlists?limit=${limit}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.playlists?.items || []
    } catch (error) {
      console.error(`CategoryService: Failed to fetch playlists for category ${categoryId}`, error)
      throw error
    }
  }
}

// Export singleton instance
export const categoryService = new CategoryService()

// Export class for testing purposes
export { CategoryService }