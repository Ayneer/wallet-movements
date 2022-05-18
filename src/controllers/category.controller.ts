import { NextFunction, Request, Response } from 'express';
import { HttpCodeEnum } from '../common/constants.common';
import { createCategoryManager } from '../managers/category.manager';

export const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const managerRes = await createCategoryManager(req.body);
        res.status(HttpCodeEnum.SUCCESS).json(managerRes);
    } catch (error) {
        next(error.message);
    }
}
