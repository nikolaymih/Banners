import UserModel from '../models/user.model';
import { DocumentDefinition } from "mongoose";
import { IUserDocument } from '../models/interfaces';
import { omit } from 'lodash';

export const createUser = async (
    payload: DocumentDefinition<
        Omit<IUserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
    >
): Promise<IUserDocument> => {
    const createdUser: IUserDocument = await UserModel.create(payload);

    const user: IUserDocument = await createdUser.save();

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

    return omit(user.toJSON(), "password") as IUserDocument
}

export const findUserById = async (id : string) => {
    return UserModel.findById(id).lean();
}

