import { IAddress } from '../database/models/address.model';
import { ICategory } from '../database/models/category.model';
import { IPersonalData } from '../database/models/personalData.model';
import { IPocket } from '../database/models/pocket.model';
import { IPocketMovements } from './pocketMovements.model';

export interface IResponseModel {
    code: string;
    description: string;
    email?: string;
    sessionToken?: string;
    personalData?: IPersonalData;
    address?: IAddress;
    pockets?: [IPocket];
    pocketsMovements?: [IPocketMovements];
    category?: ICategory;
}