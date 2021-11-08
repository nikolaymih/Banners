import { Request, Response } from 'express';
import { IUser } from '../models/interfaces';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import { omit } from 'lodash';
import logger from '../utils/logger';

export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput['body']>,
    res: Response
): Promise<void> => {
    try {
        const user: IUser = await createUser(req.body);
        res.status(201).send(omit(user.toJSON(), 'password'));
    } catch (e: any) {
        logger.error(e);
        res.status(404).send(e.message);
    }
}