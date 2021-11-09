import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { reIssueAccessToken } from '../service/session.service';
import { jwtVerify } from '../utils/jwt';

export const deserialzeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, 'headers.authorization', '').replace(
        /^Bearer\s/,
        ""
    );

    const refreshToken = get(req, 'headers.x-refresh', '');

    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = jwtVerify(accessToken);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    if (refreshToken && expired) {
        const newAccessToken = await reIssueAccessToken(refreshToken);

        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);
        }

        const result = jwtVerify(newAccessToken as string);

        res.locals.user = result.decoded;

        return next();
    }

    return next();
}