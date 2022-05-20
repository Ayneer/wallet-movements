import { RequestHandler } from 'express';
import { dashboardUserMovementFilteringSchema } from '../common/validators/schemas/dashboard.schema';

export const dashboardUserMovementFilteringMiddleware: RequestHandler = (req, res, next) => {
    const { error } = dashboardUserMovementFilteringSchema.validate(req.body);
    if (error?.message) {
        console.log(error)
        throw new Error(error?.message);
    }
    next();
}