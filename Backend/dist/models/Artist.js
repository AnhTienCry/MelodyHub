import mongoose, { Schema } from 'mongoose';
const ArtistSchema = new Schema({
    spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
    name: { type: String, required: true, trim: true },
    genres: { type: [String], default: [] },
    images: { type: [{ url: String, height: Number, width: Number }], default: [] },
    popularity: { type: Number },
    followers: { type: Number },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Artist', ArtistSchema);
//# sourceMappingURL=Artist.js.map