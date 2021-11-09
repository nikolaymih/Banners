import express, { Express } from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';

import { deserialzeUser } from './middleware/deserializeUser';

const app: Express = express();

app.use(express.json());

app.use(deserialzeUser);

let port: number = config.get('port');

app.listen(port, () => {
    logger.info(`The server has started listening on port ${port}`);

    connect();

    routes(app);
})


