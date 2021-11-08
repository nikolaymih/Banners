import { DocumentDefinition } from "mongoose";
import { IUser } from "../models/interfaces";
import User from '../models/user.model';

export const createUser = async (
    payload: DocumentDefinition<
        Omit<IUser, 'createdAt' | 'updatedAt' | 'comparePassword'>
    >
    ): Promise<IUser> => {
    const createdUser: IUser = await User.create(payload);

    const user: IUser = await createdUser.save();
    
    return user;
}