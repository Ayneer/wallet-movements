import express from 'express';
import { signInUserMeMiddleware } from '../middlewares/auth.middleware';

const dashboardRoutes = express.Router();

dashboardRoutes.get('/', signInUserMeMiddleware);

export default dashboardRoutes;