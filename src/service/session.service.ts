import { FilterQuery } from "mongoose";
import { ISessionDocument } from "../models/interfaces";
import SessionModel from "../models/session.model"

export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}

export const getAllSessions = async (query: FilterQuery<ISessionDocument>) => {
    return await SessionModel.find(query).lean();
}

