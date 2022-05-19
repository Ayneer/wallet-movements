import { RequestHandler } from 'express';
import { ARRAY_POSITION } from '../common/constants.common';
import { getErrorWithDetail } from '../common/errors/index.error';
import { validateJWT } from '../common/utils.common';
import { 
    signInUserSchema, 
    signUpUserSchema, 
    tokenSchema
} from '../common/validators/schemas/auth.schema';

export const signUpUserMiddleware: RequestHandler = (req, res, next) => {
    const { error } = signUpUserSchema.validate(req.body);
    if (error?.message) {
        console.log(error)
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

export const signInUserMeMiddleware: RequestHandler = (req, res, next) => {
    const { error } = tokenSchema.validate(req.headers);
    if (error?.message) {
        throw new Error(error?.message);
    }
    const token = req.headers.authorization.split('Bearer ')[ARRAY_POSITION.ONE];
    const { data } = validateJWT(token);
    if (!data) {
        throw new Error(getErrorWithDetail('unauthorized', 'Invalid Token'));
    }
    req.body = { ...req.body, userId: data };
    next();
}