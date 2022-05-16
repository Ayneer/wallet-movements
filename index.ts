import 'dotenv/config';
import { Logger } from 'tslog';
import app from './src/app';
import { PORT } from './src/common/constants.common';
import { isConnected, connect } from './src/common/database/index.database';
import { errorHandler } from './src/middlewares/errorHandler.middleware';

const logger: Logger = new Logger();

//Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, async () => {
    if (!isConnected()) {
        await connect();
    }
    logger.info(`App is running on port ${PORT}`);
});