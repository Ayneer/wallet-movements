import { ICategory } from '../common/database/models/category.model';
import { IUser } from '../common/database/models/user.model';
import { IResponseModel } from '../common/models/response.model';

export const getUserClearDataResponse = (user: Partial<IUser> & { _id: any }): IResponseModel => ({
    code: '0000',
    description: 'successful',
    personalData: user.personalData,
    email: user.sessionData.email
});

export const getUserDataToDashboardResponse = (user: Partial<IUser> & { _id: any }): IResponseModel => ({
    code: '0000',
    description: 'successful',
    personalData: user.personalData,
    email: user.sessionData.email,
    address: user.address,
    pockets: user.pockets
});