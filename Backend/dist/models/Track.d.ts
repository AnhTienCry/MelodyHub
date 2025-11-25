import mongoose, { Document } from 'mongoose';
export interface ITrack extends Document {
    title: string;
    artist: string;
    album?: string;
    duration?: string;
    cover?: string;
    color?: string;
    audioUrl?: string;
    fileMp3?: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<ITrack, {}, {}, {}, mongoose.Document<unknown, {}, ITrack, {}, {}> & ITrack & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Track.d.ts.map