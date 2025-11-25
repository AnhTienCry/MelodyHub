import mongoose, { Document, Schema } from 'mongoose'

export interface IAlbum extends Document {
  spotifyId?: string
  name: string
  artists?: mongoose.Types.ObjectId[]
  images?: { url: string; height?: number; width?: number }[]
  releaseDate?: string
  totalTracks?: number
  createdAt: Date
}

const AlbumSchema: Schema = new Schema({
  spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
  name: { type: String, required: true, trim: true },
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  images: { type: [{ url: String, height: Number, width: Number }], default: [] },
  releaseDate: { type: String },
  totalTracks: { type: Number },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IAlbum>('Album', AlbumSchema)
