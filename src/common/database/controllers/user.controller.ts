import { IUser, User } from '../models/user.model';
import { Logger } from 'tslog';
import { getErrorWithDetail } from '../../errors/index.error';
import { Pocket } from '../models/pocket.model';
const logger: Logger = new Logger();

export const createUser = async (user: Partial<IUser>) => {
    try {
        const newUser = new User(user);
        const pocket = new Pocket({
            name: 'Pricipal Account',
            description: 'Pricipal account',
            totalAmount: 0,
            canDelete: false
        });
        newUser.pockets.push(pocket);
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