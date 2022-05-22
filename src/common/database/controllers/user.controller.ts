import { IUser, User } from '../models/user.model';
import { Logger } from 'tslog';
import { getErrorWithDetail } from '../../errors/index.error';
import { IPocket, Pocket } from '../models/pocket.model';
const logger: Logger = new Logger();

export const createUser = async (user: Partial<IUser>) => {
    try {
        const newUser = new User(user);
        const pocket = new Pocket({
            name: 'My wallet',
            description: 'My fisic wallet',
            totalAmount: 0,
            canDelete: false,
            code: 'PK_1'
        });
        newUser.pockets.push(pocket);
        return await newUser.save();
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'User collection - createUser'));
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        return await User.findOne({
            email
        })
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'User collection - getUserByEmail'));
    }
}

export const getUserByPocketAndUserId = async (userId: string, pocketId: string) => {
    try {
        return await User.findOne(
            { _id: userId, "pockets._id": pocketId }
        ).select({
            pockets: {
                $elemMatch: { _id: pocketId }
            }
        })
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'User collection - getUserByPocketAndUserId'));
    }
}

export const updatePocketTotalAmountByUserId = async (amount: number, userId: string, pocketId: string) => {
    try {
        return await User.updateOne(
            { _id: userId, "pockets._id": pocketId },
            {
                $inc: { "pockets.$.totalAmount": amount }
            }
        )
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'User collection - updatePocketTotalAmountByUserId'));
    }
}

export const getUserPocketNumber = async (userId: string) => {
    try {
        return await User.count(
            { _id: userId }
        );
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'User collection - getUserPocketNumber'));
    }
}

export const addPocketByUserId = async (pocket: Partial<IPocket>, userId: string) => {
    try {
        return await User.updateOne(
            { _id: userId },
            {
                $push: { pockets: pocket }
            }
        );
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'User collection - addPocketByUserId'));
    }
}