import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map