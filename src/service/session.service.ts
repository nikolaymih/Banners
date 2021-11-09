import { FilterQuery, UpdateQuery } from "mongoose";
import { ISessionDocument } from "../models/interfaces";
import { jwtSign, jwtVerify } from "../utils/jwt";
import { get } from 'lodash';
import SessionModel from "../models/session.model"
import { findUserById } from "./user.service";
import config from "config";

export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}

export const getAllSessions = async (query: FilterQuery<ISessionDocument>) => {
    return SessionModel.find(query).lean();
}

export const updateSession = async (query: FilterQuery<ISessionDocument>, update: UpdateQuery<ISessionDocument>) => {
    return SessionModel.updateOne(query, update);
}

export const reIssueAccessToken = async (refreshToken: string) => {
    const { decoded } = jwtVerify(refreshToken);

    //check if the token is decoded or there is session id
    if (!decoded || !get(decoded, 'session')) {
        return false;
    }

    // check if session is valid
    const session = await SessionModel.findById(get(decoded, 'session'));

    if (!session || !session.valid) {
        return false;
    }

    // check if user exists
    const user = await findUserById(get(decoded, '_id'));

    if (!user) {
        return false;
    }

    // issue new access token
    const accessToken = jwtSign(
        { ...user, session: session._id },
        { expiresIn: config.get<string>('accessTokenExpiration') }
    );

    // return access token
    return accessToken;
}
