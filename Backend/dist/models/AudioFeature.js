import mongoose, { Schema } from 'mongoose';
const AudioFeatureSchema = new Schema({
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
});
export default mongoose.model('AudioFeature', AudioFeatureSchema);
//# sourceMappingURL=AudioFeature.js.map