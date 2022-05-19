import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import userRoutes from './routes/user.routes';
import dashboardRoutes from './routes/dashboard.routes';

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
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

export default app;