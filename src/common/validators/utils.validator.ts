import { ERROR_WITH_DETAIL, SPLIT_OPERATOR_VALUE } from '../constants.common';
import { getErrorWithDetail } from '../errors/index.error';

export const getSchemaErrorMessage = (name: string) => ({
    'string.base': getErrorWithDetail('invalid_field_type', name),
    'string.empty': getErrorWithDetail('empty_field', name),
    'string.alphanum': getErrorWithDetail('invalid_field_format', name),
    'any.only': getErrorWithDetail('invalid_field_value', name),
    'any.required': getErrorWithDetail('required_field', name),
    'string.pattern.base': getErrorWithDetail('invalid_field_format', name),
    'string.min': getErrorWithDetail('invalid_field_length', name),
    'object.unknown': getErrorWithDetail('unknown_field', name)
});
export const patternEmail = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
export const getSchemaErrorMessageAny = () => ({
    'object.unknown': `${ERROR_WITH_DETAIL}${SPLIT_OPERATOR_VALUE}unknown_field${SPLIT_OPERATOR_VALUE}{{#key}}`
});