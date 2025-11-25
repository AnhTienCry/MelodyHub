import { useState, useEffect, useCallback } from "react"
import { categoryService } from "../services/categoryService"
import { releaseService } from "../services/releaseService"
import { recommendationService } from "../services/recommendationService"
import type { Category, NewRelease, Song } from "../services/types"

/**
 * Custom hook for managing homepage data fetching
 * Handles categories, new releases, and recommendations with loading states
 */
export const useHomeData = (tracks: Song[] = []) => {
  // State for data
  const [categories, setCategories] = useState<Category[]>([])
  const [newReleases, setNewReleases] = useState<NewRelease[]>([])
  const [recommendations, setRecommendations] = useState<Song[]>([])

  // Loading states
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [loadingNewReleases, setLoadingNewReleases] = useState(false)
  const [loadingRecommendations, setLoadingRecommendations] = useState(false)

  // Individual fetch functions
  const fetchCategoriesData = useCallback(async () => {
    setLoadingCategories(true)
    try {
      const data = await categoryService.getCategories(12)
      setCategories(data)
    } catch (err) {
      console.error("Failed to fetch categories", err)
    } finally {
      setLoadingCategories(false)
    }
  }, [])

  const fetchNewReleasesData = useCallback(async () => {
    setLoadingNewReleases(true)
    try {
      const data = await releaseService.getNewReleases(20)
      setNewReleases(data)
    } catch (err) {
      console.error("Failed to fetch new releases", err)
    } finally {
      setLoadingNewReleases(false)
    }
  }, [])

  const fetchRecommendationsData = useCallback(async () => {
    setLoadingRecommendations(true)
    try {
      const data = await recommendationService.getCuratedRecommendations(24, tracks)
      setRecommendations(data)
    } catch (err) {
      console.error("Failed to fetch recommendations", err)
      // Fallback to some tracks from the main collection
      setRecommendations(tracks.slice(0, 12))
    } finally {
      setLoadingRecommendations(false)
    }
  }, [tracks])

  // Combined loading state
  const isLoading = loadingCategories || loadingNewReleases || loadingRecommendations

  // Refresh all data
  const refreshAllData = useCallback(async () => {
    await Promise.all([
      fetchCategoriesData(),
      fetchNewReleasesData(),
      fetchRecommendationsData()
    ])
  }, [fetchCategoriesData, fetchNewReleasesData, fetchRecommendationsData])

  // Initial data fetch
  useEffect(() => {
    fetchCategoriesData()
    fetchNewReleasesData()
    fetchRecommendationsData()
  }, [fetchCategoriesData, fetchNewReleasesData, fetchRecommendationsData])

  return {
    // Data
    categories,
    newReleases,
    recommendations,

    // Loading states
    loadingCategories,
    loadingNewReleases,
    loadingRecommendations,
    isLoading,

    // Actions
    refreshAllData,
    fetchCategoriesData,
    fetchNewReleasesData,
    fetchRecommendationsData,
  }
}