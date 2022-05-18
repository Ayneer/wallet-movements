import { RequestHandler } from 'express';
import { categorySchema } from '../common/validators/schemas/category.schema';

export const createCategoryMiddleware: RequestHandler = (req, res, next) => {
    const { error } = categorySchema.validate(req.body);
    if (error?.message) {
        console.log(error)
        throw new Error(error?.message);
    }
    next();
}