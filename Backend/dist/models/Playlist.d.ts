import mongoose, { Document } from 'mongoose';
export interface IPlaylist extends Document {
    spotifyId?: string;
    name: string;
    owner?: {
        id?: string;
        name?: string;
    };
    description?: string;
    images?: {
        url: string;
    }[];
    tracksCount?: number;
    createdAt: Date;
}
declare const _default: mongoose.Model<IPlaylist, {}, {}, {}, mongoose.Document<unknown, {}, IPlaylist, {}, {}> & IPlaylist & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Playlist.d.ts.map