import { Express } from 'express';
import { Request, Response } from 'express'

export default (app: Express) => {
    app.get('/api/test', (req: Request, res: Response) => {
        res.status(200).send('Successful test');
    })
}