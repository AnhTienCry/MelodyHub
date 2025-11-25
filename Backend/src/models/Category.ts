import mongoose, { Document, Schema } from 'mongoose'

export interface ICategory extends Document {
  spotifyId?: string
  name: string
  icons?: { url: string }[]
  createdAt: Date
}

const CategorySchema: Schema = new Schema({
  spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
  name: { type: String, required: true, trim: true },
  icons: { type: [{ url: String }], default: [] },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<ICategory>('Category', CategorySchema)
