import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

export default async () => {
    const dbUri: string = config.get('dbUri');

    try {
        await mongoose.connect(dbUri);
        logger.info('Db connected');
    } catch (error) {
        logger.info('Db could not connect');
        process.exit(1);
    }
}