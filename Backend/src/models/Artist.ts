import mongoose, { Document, Schema } from 'mongoose'

export interface IArtist extends Document {
  spotifyId?: string
  name: string
  genres?: string[]
  images?: { url: string; height?: number; width?: number }[]
  popularity?: number
  followers?: number
  createdAt: Date
}

const ArtistSchema: Schema = new Schema({
  spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
  name: { type: String, required: true, trim: true },
  genres: { type: [String], default: [] },
  images: { type: [{ url: String, height: Number, width: Number }], default: [] },
  popularity: { type: Number },
  followers: { type: Number },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IArtist>('Artist', ArtistSchema)
