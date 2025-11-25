import mongoose, { Document, Schema } from 'mongoose'

export interface IAudioFeature extends Document {
  spotifyId?: string
  danceability?: number
  energy?: number
  key?: number
  loudness?: number
  mode?: number
  speechiness?: number
  acousticness?: number
  instrumentalness?: number
  liveness?: number
  valence?: number
  tempo?: number
  createdAt: Date
}

const AudioFeatureSchema: Schema = new Schema({
  spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
  danceability: Number,
  energy: Number,
  key: Number,
  loudness: Number,
  mode: Number,
  speechiness: Number,
  acousticness: Number,
  instrumentalness: Number,
  liveness: Number,
  valence: Number,
  tempo: Number,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IAudioFeature>('AudioFeature', AudioFeatureSchema)
