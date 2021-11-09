import mongoose from 'mongoose';
import { ISessionDocument } from './interfaces';

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    valid: {
        type: Boolean, default: true
    },
    userAgent: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose.model<ISessionDocument>('Session', sessionSchema);