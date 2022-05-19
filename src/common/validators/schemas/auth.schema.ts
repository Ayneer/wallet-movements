import Joi from 'joi';
import {
    getSchemaErrorAuthMessage,
    getSchemaErrorMessage,
    getSchemaErrorMessageAny,
    patternEmail
} from '../utils.validator';

const MIN_LENGTH_PASSWORD = 6;

const addressSchema = Joi.object({
    country: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('country')),
    city: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('city')),
    zipCode: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('zipCode')),
});

const personalDataSchema = Joi.object({
    firstName: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('firstName')),
    lastName: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('lastName')),
    gender: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('gender')),
    birthday: Joi
        .string()
        .required()
        .messages(getSchemaErrorMessage('birthday'))
});

const sessionDataSchema = Joi.object({
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

export const signUpUserSchema = Joi.object({
    personalData: personalDataSchema,
    address: addressSchema,
    sessionData: sessionDataSchema
}).messages(getSchemaErrorMessageAny());

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

export const tokenSchema = Joi.object({
    authorization: Joi
        .string()
        .required()
        .messages(getSchemaErrorAuthMessage())
}).unknown(true);