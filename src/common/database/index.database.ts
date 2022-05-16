import mongoose from 'mongoose';
import { Logger } from 'tslog';

const logger: Logger = new Logger();

export const connect = async () => {
    const { MONGO_DATABASE, MONGO_USER, MONGO_PASSWORD } = process.env;
    logger.info(`Connecting to ${MONGO_DATABASE}`);
    try {
        await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@energia-app.schjs.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`);
        logger.info('Connected successfully to mongodb');
    } catch (err) {
        logger.error('Mongodb connection error', err);
        throw new Error('internal_DB_Connection_Failed');
    }
};

export const isConnected = () =>
    mongoose.connection.readyState === 1 ? true : false;