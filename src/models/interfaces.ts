import mongoose from 'mongoose'

export interface IUserDocument extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: string): Promise<boolean>
}

export interface ISessionDocument extends mongoose.Document {
    user: IUserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
  }

export interface IBannerDocument extends mongoose.Document {
    user: IUserDocument['_id'],
    text: string,
    image: string,
    createdAt: Date;
    updatedAt: Date;
}