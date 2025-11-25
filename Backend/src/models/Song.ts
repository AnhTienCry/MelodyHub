import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artistId?: mongoose.Types.ObjectId | null;
  albumId?: mongoose.Types.ObjectId | null;
  duration?: string;
  cover?: string;
  color?: string;
  audioUrl?: string;
  spotifyId?: string;
  fileMp3?: string; // Path to uploaded MP3 file
  createdAt: Date;
}

const SongSchema: Schema = new Schema({
  spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
  title: { type: String, required: true, trim: true },
  artistId: { type: Schema.Types.ObjectId, ref: 'Artist', default: null },
  albumId: { type: Schema.Types.ObjectId, ref: 'Album', default: null },
  duration: { type: String, trim: true },
  cover: { type: String, trim: true },
  color: { type: String, trim: true },
  audioUrl: { type: String, trim: true },
  fileMp3: { type: String, trim: true }, // Path to uploaded MP3 file
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISong>('Song', SongSchema);
