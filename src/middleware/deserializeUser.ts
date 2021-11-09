import exp from "constants";
import { Request, Response, NextFunction } from "express";
import { get } from 'lodash';
import { jwtVerify } from '../utils/jwt';

export const deserialzeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );

    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = jwtVerify(accessToken);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    return next();
}