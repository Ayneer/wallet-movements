import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BCRYPT_SALT } from './constants.common';
import { getErrorWithDetail } from './errors/index.error';

const ONE_THOUSAND = 1000;

export const generateBcryptHash = async (text: string): Promise<string> => {
    const salt = await bcrypt.genSalt(BCRYPT_SALT);
    return await bcrypt.hash(text, salt);
}

export const generateJWT = (data: object | string, expInSec: number): string => {
    return jwt.sign({
        exp: Math.floor(Date.now() / ONE_THOUSAND) + (expInSec),
        data
    }, process.env.JWT_SECRET);
}

export const validateJWT = (token: string): any  => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error(getErrorWithDetail('unauthorized', 'The JWT is not valid, it could be expired or broken'));
    }
}

export const compareBcryptHash = async (text: string, hash: string): Promise<boolean> =>
    await bcrypt.compare(text, hash);