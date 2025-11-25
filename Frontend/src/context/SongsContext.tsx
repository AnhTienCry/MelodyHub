import React, { useEffect, useState } from 'react'
import { fetchSongs as fetchSongsFromLib, type Song as LibSong } from '../lib/data'
import { SongsContext } from './useSongs'

type Song = LibSong

export const SongsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      // Fetch comprehensive data from backend (which will fetch ~500 items from Spotify)
      const data = await fetchSongsFromLib()
      setSongs(data)
    } catch (err: unknown) {
      console.error('Failed to fetch songs', err)
      setError('Failed to load songs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // On first mount, load comprehensive songs from backend
    void load()
  }, [])

  const refresh = async () => {
    await load()
  }

  return (
    <SongsContext.Provider value={{ songs, loading, error, refresh }}>
      {children}
    </SongsContext.Provider>
  )
}
