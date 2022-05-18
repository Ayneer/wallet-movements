import express from 'express';
import { createCategoryController } from '../controllers/category.controller';
import { createCategoryMiddleware } from '../middlewares/category.middleware';

const categoryRoutes = express.Router();

categoryRoutes.post('/', createCategoryMiddleware, createCategoryController);

export default categoryRoutes;