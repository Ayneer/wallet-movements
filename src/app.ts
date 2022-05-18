import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';

const app = express();

//Statics Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

//health Check Route
const healthCheckRoute = express.Router();
healthCheckRoute.get('/', (req, res) => res.json({ message: 'App health status is OK' }));

app.use('/api/v1/healthcheck', healthCheckRoute);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);

export default app;