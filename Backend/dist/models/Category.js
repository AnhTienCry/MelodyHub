import mongoose, { Schema } from 'mongoose';
const CategorySchema = new Schema({
    spotifyId: { type: String, trim: true, index: { unique: true, sparse: true } },
    name: { type: String, required: true, trim: true },
    icons: { type: [{ url: String }], default: [] },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Category', CategorySchema);
//# sourceMappingURL=Category.js.map