import apiClient from '../services/api'

export type Song = {
  id?: string
  _id?: string
  spotifyId?: string
  title: string
  artistId?: { _id: string; name: string; images?: string[] } | null
  albumId?: { _id: string; name: string; images?: string[] } | null
  duration?: string
  cover?: string
  audioUrl?: string
  preview_url?: string
  color?: string
}

export async function fetchSongs(): Promise<Song[]> {
  // Request comprehensive data (up to 500 items) from backend
  const resp = await apiClient.get('/api/songs?limit=500')
  return resp.data || []
}

export default { fetchSongs }
