import { NextFunction, Request, Response } from 'express';
import { HttpCodeEnum } from '../common/constants.common';
import { getUserResumeInformationManager } from '../managers/dashboard.manager';

export const getUserResumeInformationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const managerRes = await getUserResumeInformationManager(req.body);
        res.status(HttpCodeEnum.SUCCESS).json(managerRes);
    } catch (error) {
        next(error.message);
    }
}
