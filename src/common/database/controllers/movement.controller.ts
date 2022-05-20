import Mongoose from 'mongoose';
import { Logger } from 'tslog';
import { getErrorWithDetail } from '../../errors/index.error';
import { IDasboardFilteringDates } from '../../models/dasboardRequest.model';
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

export const getUserMovementsByPocketId = async (
    userId: string,
    pocketIds: [string],
    dates: IDasboardFilteringDates
) => {
    const pocketsObjectIds = pocketIds.map(id => new Mongoose.Types.ObjectId(id));
    const { initialDate, finalDate } = dates;
    try {
        return await Movement.aggregate([
            {
                $project: {
                    _id: 1,
                    categoryId: 1,
                    amount: 1,
                    userId: 1,
                    pocketId: 1,
                    type: 1,
                    date: 1
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $match: {
                    userId: new Mongoose.Types.ObjectId(userId),
                    pocketId: { $in: pocketsObjectIds },
                    date: { $gte: initialDate, $lte: finalDate }
                }
            },
            {
                $group: {
                    _id: { type: '$type', categoryId: '$categoryId', category: '$category' },
                    categoryTotalAmount: { $sum: '$amount' },
                    movementIds: { $push: '$$ROOT._id' }
                }
            },
            {
                $group: {
                    _id: '$_id.type',
                    typeTotalAmount: { $sum: '$categoryTotalAmount' },
                    categories: {
                        $push: {
                            categoryId: "$$ROOT._id.categoryId",
                            totalAmount: "$$ROOT.categoryTotalAmount",
                            movementId: "$$ROOT.movementIds",
                            categoryData: { $first: "$$ROOT._id.category" }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    typeTotalAmount: 1,
                    categories: {
                        $map: {
                            input: "$$ROOT.categories",
                            as: "category",
                            in: {
                                categoryId: "$$category.categoryId",
                                totalAmount: "$$category.totalAmount",
                                percentage: { $round: [{ $divide: [{ $multiply: ["$$category.totalAmount", 100] }, "$$ROOT.typeTotalAmount"] }, 2] },
                                movementId: "$$category.movementId",
                                categoryName: "$$category.categoryData.name"
                            }
                        }
                    }

                }
            },
            { $unwind: "$categories" },
            {
                $sort: {
                    "categories.percentage": -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    typeTotalAmount: { $first: '$typeTotalAmount' },
                    categories: { $push: '$categories' }
                }
            }
        ]);
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'Movement collection'));
    }
}