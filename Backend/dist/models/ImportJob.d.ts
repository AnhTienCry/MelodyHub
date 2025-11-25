import mongoose, { Document } from 'mongoose';
export interface IImportJob extends Document {
    q: string;
    totalRequested: number;
    processed: number;
    status: 'pending' | 'running' | 'completed' | 'failed';
    startedAt?: Date;
    finishedAt?: Date;
    error?: string;
}
declare const _default: mongoose.Model<IImportJob, {}, {}, {}, mongoose.Document<unknown, {}, IImportJob, {}, {}> & IImportJob & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=ImportJob.d.ts.map