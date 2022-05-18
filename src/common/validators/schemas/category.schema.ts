import Joi from 'joi';
import { getSchemaErrorMessage } from '../utils.validator';

export const categorySchema = Joi.object({
    name: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('name')),
    description: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('description')),
    type: Joi
        .string()
        .valid(...['I', 'E'])
        .required()
        .messages(getSchemaErrorMessage('type')),
    relatedKeyWords: Joi
        .array()
        .items(Joi.string())
        .required()
        .messages(getSchemaErrorMessage('relatedKeyWords'))
});