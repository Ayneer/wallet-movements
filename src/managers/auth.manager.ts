import {
    createUser,
    getUserByEmail
} from '../common/database/controllers/user.controller';
import { IUser } from '../common/database/models/user.model';
import { Logger } from 'tslog';
import { IResponseModel } from '../common/models/response.model';
import { getUserClearDataResponse, getUserDataToDashboardResponse } from './utils.manager';
import { generateBcryptHash, compareBcryptHash, generateJWT } from '../common/utils.common';
import { getErrorWithDetail } from '../common/errors/index.error';
import { ISessionData } from '../common/database/models/sessionData.model';

const logger: Logger = new Logger();
const ONE_DAY_SEC = 86400;

export const signUpUserManager = async (userBody: IUser): Promise<IResponseModel> => {
    try {
        await validateUserPreSingUp(userBody.sessionData.email);
        userBody.sessionData.password = await generateBcryptHash(userBody.sessionData.password);
        const user = await createUser(userBody);
        return getUserClearDataResponse(user);
    } catch (error) {
        logger.info(error);
        throw new Error(error.message);
    }
}

export const signInUserManager = async (userBody: ISessionData): Promise<IResponseModel> => {
    try {
        const user = await validateUserPosSingUp(
            userBody.email,
            userBody.password
        );
        return {
            ...getUserDataToDashboardResponse(user),
            sessionToken: generateJWT(user._id, ONE_DAY_SEC)
        };
    } catch (error) {
        logger.info(error);
        throw new Error(error.message);
    }
}

const validateUserPreSingUp = async (email: string): Promise<void> => {
    const user = await getUserByEmail(email);
    if (user?._id) {
        throw new Error(getErrorWithDetail('account_already_exist', email));
    }
}

const validateUserPosSingUp = async (email: string, actualPassword: string): Promise<IUser & { _id: any; }> => {
    const user = await getUserByEmail(email);
    if (!user?._id) {
        throw new Error(getErrorWithDetail('login_error', 'Invalid credentials'));
    } else if (!(await compareBcryptHash(actualPassword, user.sessionData.password))) {
        throw new Error(getErrorWithDetail('login_error', 'Invalid credentials'));
    }
    return user;
}