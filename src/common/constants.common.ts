export enum HttpCodeEnum {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    SERVER_UNAVAILABLE = 503
}

export const ERROR_WITH_DETAIL = 'errorWithDetailWalletMovementsAPI';

export const SPLIT_OPERATOR_VALUE = '#';

export const ARRAY_POSITION = {
    ZERO: 0,
    ONE: 1,
    TWO: 2
}

export const PORT = process.env.PORT;

export const BCRYPT_SALT: number = Number.parseInt(process.env.BCRYPT_SALT);
