import { Logger } from 'tslog';
import { getCategoryById } from '../common/database/controllers/category.controller';
import { createMovement } from '../common/database/controllers/movement.controller';
import { 
    addPocketByUserId, 
    getUserByPocketAndUserId, 
    getUserPocketNumber, 
    updatePocketTotalAmountByUserId 
} from '../common/database/controllers/user.controller';
import { IMovement } from '../common/database/models/movement.model';
import { IPocket } from '../common/database/models/pocket.model';
import { getErrorWithDetail } from '../common/errors/index.error';
import { IResponseModel } from '../common/models/response.model';

const logger: Logger = new Logger();

export const addPocketToUserManager = async (name: string, description: string, userId: string): Promise<IResponseModel> => {
    try {
        let countDocs = await getUserPocketNumber(userId);
        const pocket = await addPocketByUserId({
            name,
            description,
            totalAmount: 0,
            canDelete: true,
            code: `PK_${countDocs++}`
        }, userId);
        console.log(pocket)
        return {
            code: '0000',
            description: 'successful',
        }
    } catch (error) {
        logger.info(error);
        throw new Error(error.message);
    }
}

export const createUserMovementManager = async (movement: IMovement, pocketId: string, userId: string): Promise<IResponseModel> => {
    try {
        await validateDataPreCreationUserMovement({ categoryId: movement.categoryId, pocketId, userId, amount: movement.amount });
        movement.userId = userId;
        const createdMovement = await createMovement(movement);
        await updatePocketTotalAmountByUserId(movement.amount, userId, pocketId);
        return {
            code: '0000',
            description: 'successful',
            movement: createdMovement
        }
    } catch (error) {
        logger.info(error);
        throw new Error(error.message);
    }
}

const validateDataPreCreationUserMovement = async (preCreationPocketData: { categoryId: string, pocketId: string, userId: string, amount: number }) => {
    const { categoryId, pocketId, userId, amount } = preCreationPocketData;
    const category = await getCategoryById(categoryId);
    if (!category?._id) throw new Error(getErrorWithDetail('category_not_exist', categoryId));
    const user = await getUserByPocketAndUserId(userId, pocketId);
    if (!user?._id) throw new Error(getErrorWithDetail('pocket_not_exist', pocketId));
    validatePocketCapacity(user.pockets[0], amount);
}

const validatePocketCapacity = (pocket: IPocket, amount: number) => {
    if ((pocket.totalAmount + amount) < 0)
        throw new Error(getErrorWithDetail('pocket_capacity_error', `You current pocket capacity: ${pocket.totalAmount} and you movement: ${amount}`));
}