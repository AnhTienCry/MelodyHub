import mongoose, { Document } from 'mongoose';
export interface IAudioFeature extends Document {
    spotifyId?: string;
    danceability?: number;
    energy?: number;
    key?: number;
    loudness?: number;
    mode?: number;
    speechiness?: number;
    acousticness?: number;
    instrumentalness?: number;
    liveness?: number;
    valence?: number;
    tempo?: number;
    createdAt: Date;
}
declare const _default: mongoose.Model<IAudioFeature, {}, {}, {}, mongoose.Document<unknown, {}, IAudioFeature, {}, {}> & IAudioFeature & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=AudioFeature.d.ts.map