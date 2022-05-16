import { IUser, User } from '../models/user.model';
import { Logger } from 'tslog';
import { getErrorWithDetail } from '../../errors/index.error';
const logger: Logger = new Logger();

export const createUser = async (user: Partial<IUser>) => {
    try {
        const newUser = new User(user);
        return await newUser.save();
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'User model'));
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        return await User.findOne({
            email
        })
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'User model'));
    }
}