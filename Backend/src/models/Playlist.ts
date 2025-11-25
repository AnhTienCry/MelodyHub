import mongoose, { Document, Schema } from 'mongoose'

export interface IPlaylist extends Document {
  spotifyId?: string
  name: string
  owner?: { id?: string; name?: string }
  description?: string
  images?: { url: string }[]
  tracksCount?: number
  createdAt: Date
}

const PlaylistSchema: Schema = new Schema({
  spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
  name: { type: String, required: true, trim: true },
  owner: { type: { id: String, name: String }, default: {} },
  description: { type: String },
  images: { type: [{ url: String }], default: [] },
  tracksCount: { type: Number },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema)
