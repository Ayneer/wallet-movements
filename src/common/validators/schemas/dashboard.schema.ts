import Joi from 'joi';
import { getSchemaErrorMessage } from '../utils.validator';

export const dashboardUserMovementFilteringSchema = Joi.object({
    filterType: Joi
        .string()
        .valid('CUSTOM', 'THIS_MONTH', 'THIS_WEEK', 'FIRST_15TH_CURRENT_MONTH', 'SECOND_15TH_CURRENT_MONTH')
        .required()
        .messages(getSchemaErrorMessage('filterType')),
    pocketId: Joi
        .array()
        .items(Joi.string())
        .required()
        .messages(getSchemaErrorMessage('pocketId')),
    categoryId: Joi
        .string()
        .messages(getSchemaErrorMessage('categoryId')),
    userId: Joi
        .string()
}).when(
    Joi.object({ filterType: Joi.string().valid('CUSTOM') }).unknown(), {
    then: Joi.object({
        initialDate: Joi
            .string()
            .required()
            .messages(getSchemaErrorMessage('initialDate')),
        finalDate: Joi
            .string()
            .required()
            .messages(getSchemaErrorMessage('finalDate')),
    }).unknown(false)
});