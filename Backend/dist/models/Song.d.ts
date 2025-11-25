import mongoose, { Document } from 'mongoose';
export interface ISong extends Document {
    title: string;
    artistId?: mongoose.Types.ObjectId | null;
    albumId?: mongoose.Types.ObjectId | null;
    duration?: string;
    cover?: string;
    color?: string;
    audioUrl?: string;
    spotifyId?: string;
    fileMp3?: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<ISong, {}, {}, {}, mongoose.Document<unknown, {}, ISong, {}, {}> & ISong & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Song.d.ts.map