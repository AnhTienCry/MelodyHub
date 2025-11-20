import mongoose, { Document, Schema } from 'mongoose';

export interface ITrack extends Document {
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  cover?: string;
  color?: string;
  audioUrl?: string;
  createdAt: Date;
}

const TrackSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  album: { type: String, trim: true },
  duration: { type: String, trim: true },
  cover: { type: String, trim: true },
  color: { type: String, trim: true },
  audioUrl: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITrack>('Track', TrackSchema);
