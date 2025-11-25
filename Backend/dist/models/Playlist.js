import mongoose, { Schema } from 'mongoose';
const PlaylistSchema = new Schema({
    spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
    name: { type: String, required: true, trim: true },
    owner: { type: { id: String, name: String }, default: {} },
    description: { type: String },
    images: { type: [{ url: String }], default: [] },
    tracksCount: { type: Number },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Playlist', PlaylistSchema);
//# sourceMappingURL=Playlist.js.map