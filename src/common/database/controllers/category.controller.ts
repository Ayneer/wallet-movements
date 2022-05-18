import { Category, ICategory } from '../models/category.model';
import { Logger } from 'tslog';
import { getErrorWithDetail } from '../../errors/index.error';

const logger: Logger = new Logger();

export const createCategory = async (category: Partial<ICategory>) => {
    try {
        return await new Category(category).save();
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'Category model'));
    }
}

export const getCategoryById = async (categoryId: string) => {
    try {
        return await Category.findById(categoryId);
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'Category model'));
    }
}

export const getCategoryByName = async (categoryName: string) => {
    try {
        return await Category.findOne({
            name: categoryName
        });
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'Category model'));
    }
}

export const getAllCategories = async () => {
    try {
        return await Category.find();
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'Category model'));
    }
}

export const deleteCategoryById = async (categoryId: string) => {
    try {
        return await Category.deleteOne({
            _id: categoryId
        });
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'Category model'));
    }
}

export const addKeyWordToCategoryById = async (categoryId: string, keyWords: [string]) => {
    try {
        return await Category.updateOne(
            { _id: categoryId },
            { $push: { relatedKeyWords: keyWords } }
        )
    } catch (error) {
        logger.error(error);
        throw new Error(getErrorWithDetail('crud_error', 'Category model'));
    }
}