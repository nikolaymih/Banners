import mongoose from 'mongoose';
import { IBannerDocument } from './interfaces';

const bannerSchema = new mongoose.Schema<IBannerDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

export default mongoose.model<IBannerDocument>('Banner', bannerSchema);