import { IUser } from '../common/database/models/user.model';
import { IResponseModel } from '../common/models/response.model';

export const getUserClearDataResponse = (user: Partial<IUser> & { _id: any }): IResponseModel => ({
    code: '0000',
    description: 'successful',
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
});