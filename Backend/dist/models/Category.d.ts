import mongoose, { Document } from 'mongoose';
export interface ICategory extends Document {
    spotifyId?: string;
    name: string;
    icons?: {
        url: string;
    }[];
    createdAt: Date;
}
declare const _default: mongoose.Model<ICategory, {}, {}, {}, mongoose.Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Category.d.ts.map