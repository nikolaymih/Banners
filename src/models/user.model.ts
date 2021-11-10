import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { IUserDocument } from './interfaces';

const userSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    let user: IUserDocument = this as IUserDocument;

    if (!user.isModified('password')) {
        return next();
    }

    const saltRounds: string = await bcrypt.genSalt(config.get('saltRounds'));

    const hash: string = await bcrypt.hash(user.password, saltRounds);

    this.password = hash;

    return next();
})

userSchema.methods.comparePassword = async function(
    candidatePassword: string
    ): Promise<boolean> {
    const user = this as IUserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

export default mongoose.model<IUserDocument>('User', userSchema);