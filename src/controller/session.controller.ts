import { Request, Response } from 'express';
import config from 'config';
import { createSession } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { jwtSign } from '../utils/jwt';

export const createUserSessionHandler = async (req: Request, res: Response) => {
    // Validate if there is such email and if the password is accurate
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    // create sesssion
    const session = await createSession(user._id, req.get('user-agent') || '');

    // create access token
    const accessToken = jwtSign(
        { ...user, session: session._id },
        { expiresIn: config.get<string>('accessTokenExpiration') }
    )

    // create refresh token

    const refreshToken = jwtSign(
        { ...user, session: session._id },
        { expiresIn: config.get<string>('refreshTokenExpiration') }
    )

    // return access and refresh token
    return res.send({ accessToken, refreshToken });
}

