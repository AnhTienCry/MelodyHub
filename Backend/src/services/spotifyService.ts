import axios from 'axios'
import qs from 'qs'

let cache: { token?: string; expiry?: number } = {}

export async function getAppToken(): Promise<string> {
  if (cache.token && Date.now() < (cache.expiry || 0)) return cache.token
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  if (!clientId || !clientSecret) throw new Error('Missing Spotify client credentials in env')

  const resp = await axios.post(
    'https://accounts.spotify.com/api/token',
    qs.stringify({ grant_type: 'client_credentials' }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
    }
  )

  cache.token = resp.data.access_token
  cache.expiry = Date.now() + (resp.data.expires_in - 10) * 1000
  return cache.token!
}

export async function search(q: string, type = 'track', limit = 10, offset = 0): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get('https://api.spotify.com/v1/search', {
    headers: { Authorization: `Bearer ${token}` },
    params: { q, type, limit, offset },
  })
  return r.data
}

export async function getArtist(id: string): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return r.data
}

export async function getTrack(id: string): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return r.data
}

export async function getAlbum(id: string): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return r.data
}

export async function getPlaylist(id: string): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return r.data
}

export async function getPlaylistTracks(id: string, limit = 50, offset = 0): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit, offset },
  })
  return r.data
}

export async function getNewReleases(limit = 20): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit },
  })
  return r.data
}

export async function getCategories(limit = 20): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get('https://api.spotify.com/v1/browse/categories', {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit },
  })
  return r.data
}

export async function getCategoryPlaylists(categoryId: string, limit = 20): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit },
  })
  return r.data
}

export async function getArtistTopTracks(artistId: string, country = 'US'): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { country },
  })
  return r.data
}

export async function getArtistAlbums(artistId: string, limit = 20): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { limit },
  })
  return r.data
}

export async function getAudioFeatures(id: string): Promise<any> {
  const token = await getAppToken()
  const r = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return r.data
}

export async function getAvailableGenreSeeds(): Promise<string[]> {
  const token = await getAppToken()
  const r = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return r.data.genres
}

export async function getRecommendations(seed_tracks?: string[], seed_artists?: string[], seed_genres?: string[], limit = 20): Promise<any> {
  const token = await getAppToken()
  const params: any = { limit }
  if (seed_tracks && seed_tracks.length) params.seed_tracks = seed_tracks
  if (seed_artists && seed_artists.length) params.seed_artists = seed_artists
  if (seed_genres && seed_genres.length) {
    // Filter to valid genres and send as array for proper query parameter handling
    const availableGenres = await getAvailableGenreSeeds()
    const validGenres = seed_genres.filter(g => availableGenres.includes(g))
    if (validGenres.length > 0) {
      params.seed_genres = validGenres.join(',')

    }
  }
  const r = await axios.get('https://api.spotify.com/v1/recommendations', {
    headers: { Authorization: `Bearer ${token}` },
    params,
  })
  return r.data
}

export default {
  getAppToken,
  search,
  getArtist,
}
