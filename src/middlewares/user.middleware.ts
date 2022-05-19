import { RequestHandler } from 'express';
import { pocketMovementSchema, pocketToAddToUserSchema } from '../common/validators/schemas/pocket.schema';

export const addPocketToUserMiddleware: RequestHandler = (req, res, next) => {
    const { error } = pocketToAddToUserSchema.validate(req.body);
    if (error?.message) {
        console.log(error)
        throw new Error(error?.message);
    }
    next();
}

export const createUserMovementMiddleware: RequestHandler = (req, res, next) => {
    const { error } = pocketMovementSchema.validate(req.body);
    if (error?.message) {
        console.log(error)
        throw new Error(error?.message);
    }
    next();
}