import { HttpCodeEnum } from '../constants.common';

export interface ErrorModel {
    code: string;
    description: string;
    detail: string;
    status: HttpCodeEnum;
}