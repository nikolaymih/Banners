import express, { Express } from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { deserializeUser } from './middleware/deserializeUser';

let port: number = config.get('port');

const app: Express = express();

app.use(cors({
    origin: config.get<string>('origin'),
    credentials: true
}))

app.use(cookieParser());

app.use(express.json());

app.use(deserializeUser);

app.listen(port, () => {
    logger.info(`The server has started listening on port ${port}`);

    connect();

    routes(app);
})


