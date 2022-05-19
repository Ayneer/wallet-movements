import { Logger } from 'tslog';
import { getErrorWithDetail } from '../../errors/index.error';
import { IMovement, Movement } from '../models/movement.model';

const logger: Logger = new Logger();

export const createMovement = async (movement: Partial<IMovement>) => {
    try {
        return await new Movement(movement).save();
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'Movement collection'));
    }
}