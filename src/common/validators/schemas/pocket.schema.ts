import Joi from 'joi';
import { getSchemaErrorMessage } from '../utils.validator';

const movementSchema = Joi.object({
    description: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('description')),
    date: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('date')),
    amount: Joi
        .number()
        .required()
        .messages(getSchemaErrorMessage('amount')),
    categoryId: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('categoryId')),
    type: Joi
        .string()
        .valid(...['I', 'E'])
        .required()
        .messages(getSchemaErrorMessage('type')),
    pocketId: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('pocketId'))
});

export const pocketMovementSchema = Joi.object({
    movement: movementSchema,
    userId: Joi
        .string()
        .required()
});

export const pocketToAddToUserSchema = Joi.object({
    name: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('name')),
    description: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('description')),
    userId: Joi
        .string()
        .required()
});