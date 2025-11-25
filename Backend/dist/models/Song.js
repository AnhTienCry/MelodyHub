import mongoose, { Schema } from 'mongoose';
const SongSchema = new Schema({
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
export default mongoose.model('Song', SongSchema);
//# sourceMappingURL=Song.js.map