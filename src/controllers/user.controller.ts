import { NextFunction, Request, Response } from 'express';
import { HttpCodeEnum } from '../common/constants.common';
import { addPocketToUserManager, createUserMovementManager } from '../managers/user.manager';

export const addPocketToUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, userId } = req.body;
        const managerRes = await addPocketToUserManager(name, description, userId);
        res.status(HttpCodeEnum.SUCCESS).json(managerRes);
    } catch (error) {
        next(error.message);
    }
}

export const createUserMovementController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { movement, userId } = req.body;
        const managerRes = await createUserMovementManager(movement, movement.pocketId, userId);
        res.status(HttpCodeEnum.SUCCESS).json(managerRes);
    } catch (error) {
        next(error.message);
    }
}