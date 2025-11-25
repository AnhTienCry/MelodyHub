import { createContext, useContext } from 'react'
import type { Song } from '../lib/data'

export type SongsContextValue = {
  songs: Song[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export const SongsContext = createContext<SongsContextValue | undefined>(undefined)

export function useSongs() {
  const ctx = useContext(SongsContext)
  if (!ctx) throw new Error('useSongs must be used within SongsProvider')
  return ctx
}

export default useSongs
