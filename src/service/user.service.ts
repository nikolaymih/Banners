import UserModel from '../models/user.model';
import { DocumentDefinition } from "mongoose";
import { IUser } from '../models/interfaces';
import { omit } from 'lodash';

export const createUser = async (
    payload: DocumentDefinition<
        Omit<IUser, 'createdAt' | 'updatedAt' | 'comparePassword'>
    >
): Promise<IUser> => {
    const createdUser: IUser = await UserModel.create(payload);

    const user: IUser = await createdUser.save();

    return user;
}

export const validatePassword = async ({
    email,
    password
}: {
    email: string,
    password: string
}) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
        return false;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return false;
    }

    return omit(user.toJSON(), "password") as IUser
}

export const findUserById = async (id : string) => {
    return UserModel.findById(id).lean();
}

