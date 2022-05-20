import express from 'express';
import { getUserResumeInformationController } from '../controllers/dashboard.controller';
import { signInUserMeMiddleware } from '../middlewares/auth.middleware';
import { dashboardUserMovementFilteringMiddleware } from '../middlewares/dashboard.middleware';

const dashboardRoutes = express.Router();

dashboardRoutes.get('/', signInUserMeMiddleware, dashboardUserMovementFilteringMiddleware, getUserResumeInformationController);

export default dashboardRoutes;