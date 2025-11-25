import apiClient from './api'

export async function searchTracks(q: string, limit = 20) {
  const res = await apiClient.get(`/api/spotify/search?q=${encodeURIComponent(q)}&type=track&limit=${limit}`)
  return res.data
}

export async function getTrack(id: string) {
  const res = await apiClient.get(`/api/spotify/track/${id}`)
  return res.data
}

export async function getAlbum(id: string) {
  const res = await apiClient.get(`/api/spotify/album/${id}`)
  return res.data
}

export async function getPlaylist(id: string) {
  const res = await apiClient.get(`/api/spotify/playlist/${id}`)
  return res.data
}

export async function getPlaylistTracks(id: string, limit = 50, offset = 0) {
  const res = await apiClient.get(`/api/spotify/playlist/${id}/tracks?limit=${limit}&offset=${offset}`)
  return res.data
}

export async function getNewReleases(limit = 20) {
  const res = await apiClient.get(`/api/spotify/new-releases?limit=${limit}`)
  return res.data
}

export async function getCategories(limit = 20) {
  const res = await apiClient.get(`/api/spotify/categories?limit=${limit}`)
  return res.data
}

export async function getCategoryPlaylists(categoryId: string, limit = 20) {
  const res = await apiClient.get(`/api/spotify/categories/${categoryId}/playlists?limit=${limit}`)
  return res.data
}

export async function getArtistTopTracks(artistId: string, country = 'US') {
  const res = await apiClient.get(`/api/spotify/artist/${artistId}/top-tracks?country=${country}`)
  return res.data
}

export async function getArtistAlbums(artistId: string, limit = 20) {
  const res = await apiClient.get(`/api/spotify/artist/${artistId}/albums?limit=${limit}`)
  return res.data
}

export async function getAudioFeatures(trackId: string) {
  const res = await apiClient.get(`/api/spotify/audio-features/${trackId}`)
  return res.data
}

export async function getRecommendations(params: { seed_tracks?: string[], seed_artists?: string[], seed_genres?: string[], limit?: number }) {
  const qs = [] as string[]
  if (params.seed_tracks) qs.push(`seed_tracks=${params.seed_tracks.join(',')}`)
  if (params.seed_artists) qs.push(`seed_artists=${params.seed_artists.join(',')}`)
  if (params.seed_genres) qs.push(`seed_genres=${params.seed_genres.join(',')}`)
  if (params.limit) qs.push(`limit=${params.limit}`)
  const q = qs.length ? `?${qs.join('&')}` : ''
  const res = await apiClient.get(`/api/spotify/recommendations${q}`)
  return res.data
}

export async function importFromSpotify(q = 'lofi', limit = 24) {
  // Import can take a long time; allow a longer timeout for this request.
  const res = await apiClient.get(`/api/spotify/import?q=${encodeURIComponent(q)}&limit=${limit}`, { timeout: 120000 })
  return res.data
}

export async function getImportStatus() {
  const res = await apiClient.get(`/api/spotify/import/status`)
  return res.data
}

export default {
  searchTracks,
  getTrack,
  getAlbum,
  getPlaylist,
  getPlaylistTracks,
  getNewReleases,
  getCategories,
  getCategoryPlaylists,
  getArtistTopTracks,
  getArtistAlbums,
  getAudioFeatures,
  getRecommendations,
  importFromSpotify,
}
