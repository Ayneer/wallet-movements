import Joi from 'joi';
import { 
    getSchemaErrorMessage, 
    patternEmail 
} from '../utils.validator';

const MIN_LENGTH_PASSWORD = 6;

export const signUpUserSchema = Joi.object({
    firstName: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('firstName')),
    lastName: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('lastName')),
    email: Joi
        .string()
        .regex(patternEmail)
        .required()
        .messages(getSchemaErrorMessage('email')),
    password: Joi
        .string()
        .min(MIN_LENGTH_PASSWORD)
        .required()
        .messages(getSchemaErrorMessage('password'))
});

export const signInUserSchema = Joi.object({
    email: Joi
        .string()
        .regex(patternEmail)
        .required()
        .messages(getSchemaErrorMessage('email')),
    password: Joi
        .string()
        .min(MIN_LENGTH_PASSWORD)
        .required()
        .messages(getSchemaErrorMessage('password'))
});