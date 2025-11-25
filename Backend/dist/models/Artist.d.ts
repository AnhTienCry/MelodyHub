import mongoose, { Document } from 'mongoose';
export interface IArtist extends Document {
    spotifyId?: string;
    name: string;
    genres?: string[];
    images?: {
        url: string;
        height?: number;
        width?: number;
    }[];
    popularity?: number;
    followers?: number;
    createdAt: Date;
}
declare const _default: mongoose.Model<IArtist, {}, {}, {}, mongoose.Document<unknown, {}, IArtist, {}, {}> & IArtist & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Artist.d.ts.map