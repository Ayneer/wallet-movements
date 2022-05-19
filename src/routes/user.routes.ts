import express from 'express';
import { signInUserMeMiddleware } from '../middlewares/auth.middleware';
import { addPocketToUserController, createUserMovementController } from '../controllers/user.controller';
import { addPocketToUserMiddleware, createUserMovementMiddleware } from '../middlewares/user.middleware';

const userRoutes = express.Router();

userRoutes.post('/new/pocket', signInUserMeMiddleware, addPocketToUserMiddleware, addPocketToUserController);
userRoutes.post('/new/pocket/movement', signInUserMeMiddleware, createUserMovementMiddleware, createUserMovementController);

export default userRoutes;