import mongoose, { Document } from 'mongoose';
export interface IAlbum extends Document {
    spotifyId?: string;
    name: string;
    artists?: mongoose.Types.ObjectId[];
    images?: {
        url: string;
        height?: number;
        width?: number;
    }[];
    releaseDate?: string;
    totalTracks?: number;
    createdAt: Date;
}
declare const _default: mongoose.Model<IAlbum, {}, {}, {}, mongoose.Document<unknown, {}, IAlbum, {}, {}> & IAlbum & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Album.d.ts.map