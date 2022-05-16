import { RequestHandler } from 'express';
import { 
    signInUserSchema, 
    signUpUserSchema 
} from '../common/validators/schemas/auth.schema';

export const signUpUserMiddleware: RequestHandler = (req, res, next) => {
    const { error } = signUpUserSchema.validate(req.body);
    if (error?.message) {
        throw new Error(error?.message);
    }
    next();
}

export const signInUserMiddleware: RequestHandler = (req, res, next) => {
    const { error } = signInUserSchema.validate(req.body);
    if (error?.message) {
        throw new Error(error?.message);
    }
    next();
}