import errorList from './errors.json';
import { ErrorModel } from '../models/error.model';
import { ARRAY_POSITION, ERROR_WITH_DETAIL, SPLIT_OPERATOR_VALUE } from '../constants.common';

export const getErrorByKey = (errorKey: string): ErrorModel => {
    const errorWithDetail = validateErrorWithDetail(errorKey);
    const {
        code, description, detail, status
    } = errorList[errorKey] ?? errorList[errorWithDetail.key] ?? errorList['unexpected_error'];
    const errorDetail = errorWithDetail.detail ?? detail;
    return {
        code,
        description,
        detail: code === '0001' ? errorKey : errorDetail,
        status
    };
}

const validateErrorWithDetail = (error: string) => {
    const hasDetail = error.includes(ERROR_WITH_DETAIL);
    let detail: string = null;
    let key: string = null;
    if (hasDetail) {
        key = error.split(SPLIT_OPERATOR_VALUE)[ARRAY_POSITION.ONE];
        detail = error.split(SPLIT_OPERATOR_VALUE)[ARRAY_POSITION.TWO];
    }
    return {
        hasDetail,
        detail,
        key
    }
}

export const getErrorWithDetail = (errorKey: string, detail: string): string =>
    `${ERROR_WITH_DETAIL}${SPLIT_OPERATOR_VALUE}${errorKey}${SPLIT_OPERATOR_VALUE}${detail}`;
