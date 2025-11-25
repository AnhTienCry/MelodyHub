import type { Request, Response } from 'express'
import * as spotifyService from '../services/spotifyService.js'
import Song from '../models/Song.js'

export const search = async (req: Request, res: Response) => {
  try {
    const q = String(req.query.q || '')
    const type = String(req.query.type || 'track')
    const limit = Number(req.query.limit || 10)
    if (!q) return res.status(400).json({ error: 'Missing query q' })
    const data = await spotifyService.search(q, type, limit)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify search error', err?.message || err)
    return res.status(500).json({ error: 'Spotify search failed', details: err?.message })
  }
}

export const artist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'Missing artist id' })
    const data = await spotifyService.getArtist(id)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify artist error', err?.message || err)
    return res.status(500).json({ error: 'Spotify artist failed', details: err?.message })
  }
}

export const track = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'Missing track id' })
    const data = await spotifyService.getTrack(id)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify track error', err?.message || err)
    return res.status(500).json({ error: 'Spotify track failed', details: err?.message })
  }
}

export const album = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'Missing album id' })
    const data = await spotifyService.getAlbum(id)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify album error', err?.message || err)
    return res.status(500).json({ error: 'Spotify album failed', details: err?.message })
  }
}

export const playlist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'Missing playlist id' })
    const data = await spotifyService.getPlaylist(id)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify playlist error', err?.message || err)
    return res.status(500).json({ error: 'Spotify playlist failed', details: err?.message })
  }
}

export const playlistTracks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const limit = Number(req.query.limit || 50)
    const offset = Number(req.query.offset || 0)
    if (!id) return res.status(400).json({ error: 'Missing playlist id' })
    const data = await spotifyService.getPlaylistTracks(id, limit, offset)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify playlist tracks error', err?.message || err)
    return res.status(500).json({ error: 'Spotify playlist tracks failed', details: err?.message })
  }
}

export const newReleases = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit || 20)
    const data = await spotifyService.getNewReleases(limit)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify new releases error', err?.message || err)
    return res.status(500).json({ error: 'Spotify new releases failed', details: err?.message })
  }
}

export const categories = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit || 20)
    const data = await spotifyService.getCategories(limit)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify categories error', err?.message || err)
    return res.status(500).json({ error: 'Spotify categories failed', details: err?.message })
  }
}

export const categoryPlaylists = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const limit = Number(req.query.limit || 20)
    if (!id) return res.status(400).json({ error: 'Missing category id' })
    const data = await spotifyService.getCategoryPlaylists(id, limit)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify category playlists error', err?.message || err)
    return res.status(500).json({ error: 'Spotify category playlists failed', details: err?.message })
  }
}

export const artistTopTracks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const country = String(req.query.country || 'US')
    if (!id) return res.status(400).json({ error: 'Missing artist id' })
    const data = await spotifyService.getArtistTopTracks(id, country)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify artist top tracks error', err?.message || err)
    return res.status(500).json({ error: 'Spotify artist top tracks failed', details: err?.message })
  }
}

export const artistAlbums = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const limit = Number(req.query.limit || 20)
    if (!id) return res.status(400).json({ error: 'Missing artist id' })
    const data = await spotifyService.getArtistAlbums(id, limit)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify artist albums error', err?.message || err)
    return res.status(500).json({ error: 'Spotify artist albums failed', details: err?.message })
  }
}

export const audioFeatures = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'Missing track id' })
    const data = await spotifyService.getAudioFeatures(id)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify audio features error', err?.message || err)
    return res.status(500).json({ error: 'Spotify audio features failed', details: err?.message })
  }
}

export const recommendations = async (req: Request, res: Response) => {
  try {
    const seed_tracks = String(req.query.seed_tracks || '').split(',').filter(Boolean)
    const seed_artists = String(req.query.seed_artists || '').split(',').filter(Boolean)
    const seed_genres = String(req.query.seed_genres || '').split(',').filter(Boolean).slice(0, 5) // Limit to 5 as per Spotify API
    const limit = Number(req.query.limit || 20)
    const data = await spotifyService.getRecommendations(seed_tracks, seed_artists, seed_genres, limit)
    return res.json(data)
  } catch (err: any) {
    console.error('spotify recommendations error', err?.message || err)
    return res.status(500).json({ error: 'Spotify recommendations failed', details: err?.message })
  }
}




// List songs for clients. Always fetch from Spotify, upsert into DB, and return saved songs.
export const listSongs = async (req: Request, res: Response) => {
  try {
    const q = String(req.query.q || 'popular music')
    const limit = Number(req.query.limit || 50) // Increased default limit

    let songs = await Song.find().populate('artistId').populate('albumId').sort({ createdAt: -1 }).lean()
    if (!songs || songs.length === 0) {
      // Fetch comprehensive data from Spotify and upsert into DB with relational data
      try {
        // Fetch multiple queries to get diverse content
        const queries = ['nhạc việt', 'vietnamese music', 'rap việt', 'vietnamese rap', 'popular', 'trending', 'top hits', 'new music', 'electronic', 'pop', 'rock', 'hip hop', 'jazz', 'classical']
        const allItems: any[] = []

        for (const query of queries) {
          try {
            const spotifyData = await spotifyService.search(query, 'track', Math.ceil(limit / queries.length))
            const items = spotifyData?.tracks?.items || []
            allItems.push(...items.slice(0, Math.ceil(limit / queries.length)))
          } catch (err) {
            console.warn(`Failed to fetch for query "${query}":`, err)
          }
        }

        // Remove duplicates based on spotifyId
        const uniqueItems = allItems.filter((item, index, self) =>
          index === self.findIndex(i => i.id === item.id)
        ).slice(0, limit)

        if (uniqueItems.length > 0) {
          // Collect unique artists and albums
          const artistMap = new Map<string, any>()
          const albumMap = new Map<string, any>()
          for (const t of uniqueItems) {
            const album = t.album
            if (album && album.id && !albumMap.has(album.id)) albumMap.set(album.id, album)
            for (const a of t.artists || []) if (a && a.id && !artistMap.has(a.id)) artistMap.set(a.id, a)
          }

          const ArtistModel = (await import('../models/Artist.js')).default
          const AlbumModel = (await import('../models/Album.js')).default

          const artistIdMap = new Map<string, any>()
          if (artistMap.size > 0) {
            const upsertArtists = Array.from(artistMap.values()).map(async (a: any) => {
              try {
                const doc = { spotifyId: a.id, name: a.name, images: a.images || [], genres: a.genres || [] }
                const updated = await ArtistModel.findOneAndUpdate({ spotifyId: a.id }, { $set: doc }, { upsert: true, new: true })
                if (updated) artistIdMap.set(a.id, updated._id)
              } catch (e) {
                console.warn('artist upsert failed for', a.id, e)
              }
            })
            await Promise.all(upsertArtists)
          }

          const albumIdMap = new Map<string, any>()
          if (albumMap.size > 0) {
            const upsertAlbums = Array.from(albumMap.values()).map(async (al: any) => {
              try {
                const artistIds = (al.artists || []).map((a: any) => artistIdMap.get(a.id)).filter(Boolean)
                const doc = { spotifyId: al.id, name: al.name, images: al.images || [], releaseDate: al.release_date, totalTracks: al.total_tracks, artists: artistIds }
                const updated = await AlbumModel.findOneAndUpdate({ spotifyId: al.id }, { $set: doc }, { upsert: true, new: true })
                if (updated) albumIdMap.set(al.id, updated._id)
              } catch (e) {
                console.warn('album upsert failed for', al.id, e)
              }
            })
            await Promise.all(upsertAlbums)
          }

          // Upsert songs with references
          const ops: any[] = uniqueItems.map((t: any) => {
            const firstArtist = (t.artists || [])[0]
            const artistId = firstArtist ? artistIdMap.get(firstArtist.id) || null : null
            const albumId = t.album && t.album.id ? albumIdMap.get(t.album.id) || null : null
            const doc: any = {
              spotifyId: t.id,
              title: t.name,
              duration: t.duration_ms ? `${Math.floor(t.duration_ms / 60000)}:${String(Math.floor((t.duration_ms % 60000)/1000)).padStart(2,'0')}` : undefined,
              cover: t.album?.images?.[0]?.url,
              audioUrl: t.preview_url || undefined,
              artistId: artistId,
              albumId: albumId,
            }
            return { updateOne: { filter: { spotifyId: t.id }, update: { $set: doc }, upsert: true } }
          })

          if (ops.length > 0) {
            try {
              await Song.bulkWrite(ops)
              console.log(`Successfully upserted ${ops.length} songs`)
            } catch (bulkErr) {
              console.error('Failed to bulk upsert songs', bulkErr)
              return res.json([])
            }
          }

          // Read back with populate
          songs = await Song.find({ spotifyId: { $in: uniqueItems.map((t: any) => t.id) } }).populate('artistId').populate('albumId').sort({ createdAt: -1 }).lean()
        }
      } catch (err) {
        console.error('Failed to fetch from Spotify', err)
        return res.json([])
      }
    }

    return res.json(songs)
  } catch (err) {
    console.error('listSongs error', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const getSong = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'Missing song id' })
    const song = await Song.findById(id).populate('artistId').populate('albumId').lean()
    if (!song) return res.status(404).json({ error: 'Song not found' })
    return res.json(song)
  } catch (err: any) {
    console.error('getSong error', err?.message || err)
    return res.status(500).json({ error: 'Failed to get song', details: err?.message })
  }
}

export default {
  search,
  artist,
  track,
  album,
  playlist,
  playlistTracks,
  newReleases,
  categories,
  categoryPlaylists,
  artistTopTracks,
  artistAlbums,
  audioFeatures,
  recommendations,
  listSongs,
  getSong,
}
