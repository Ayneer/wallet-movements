import { NextFunction, Request, Response } from 'express';
import { HttpCodeEnum } from '../common/constants.common';
import { 
    signUpUserManager, 
    signInUserManager 
} from '../managers/auth.manager';

export const signUpUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const managerRes = await signUpUserManager(req.body);
        res.status(HttpCodeEnum.SUCCESS).json(managerRes);
    } catch (error) {
        next(error.message);
    }
}

export const signInUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const managerRes = await signInUserManager(req.body);
        res.status(HttpCodeEnum.SUCCESS).json(managerRes);
    } catch (error) {
        next(error.message);
    }
}