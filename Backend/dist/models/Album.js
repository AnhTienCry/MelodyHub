import mongoose, { Schema } from 'mongoose';
const AlbumSchema = new Schema({
    spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
    name: { type: String, required: true, trim: true },
    artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    images: { type: [{ url: String, height: Number, width: Number }], default: [] },
    releaseDate: { type: String },
    totalTracks: { type: Number },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Album', AlbumSchema);
//# sourceMappingURL=Album.js.map