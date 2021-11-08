import { Express } from 'express';
import { Request, Response } from 'express'
import { createUserHandler } from './controller/user.controller';
import { createUserSchema } from './schema/user.schema';
import validateResources from './middleware/validateResources';

export default (app: Express) => {
    app.get('/api/test', (req: Request, res: Response) => {
        res.status(200).send('Successful test');
    })

    app.post('/api/users', validateResources(createUserSchema) , createUserHandler)
}