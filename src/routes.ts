import { Express } from 'express';
import { Request, Response } from 'express'
import { createUserHandler } from './controller/user.controller';
import { createUserSchema } from './schema/user.schema';
import validateResources from './middleware/validateResources';
import { createUserSessionHandler } from './controller/session.controller';
import { sessionSchema } from './schema/session.schema';

export default (app: Express) => {
    app.get('/api/test', (req: Request, res: Response) => {
        res.status(200).send('Successful test');
    })

    app.post('/api/users', validateResources(createUserSchema), createUserHandler)

    app.post('/api/sessions', validateResources(sessionSchema), createUserSessionHandler)

}