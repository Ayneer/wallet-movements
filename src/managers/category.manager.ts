import { createCategory, getCategoryByName } from '../common/database/controllers/category.controller';
import { ICategory } from '../common/database/models/category.model';
import { IResponseModel } from '../common/models/response.model';
import { Logger } from 'tslog';
import { getErrorWithDetail } from '../common/errors/index.error';

const logger: Logger = new Logger();

export const createCategoryManager = async (categoryBody: ICategory): Promise<IResponseModel> => {
    try {
        await validatePreCreateCategory(categoryBody.name);
        const category = await createCategory(categoryBody);
        return {
            code: '0000',
            description: 'successful',
            category
        }
    } catch (error) {
        logger.info(error);
        throw new Error(error.message);
    }
}

const validatePreCreateCategory = async (categoryName: string) => {
    const category = await getCategoryByName(categoryName);
    if (category?._id) throw new Error(getErrorWithDetail('category_already_exist', categoryName));
}