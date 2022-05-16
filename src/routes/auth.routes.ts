import express from 'express';
import { 
    signInUserMiddleware, 
    signUpUserMiddleware 
} from '../middlewares/auth.middleware';
import { 
    signInUserController, 
    signUpUserController 
} from '../controllers/auth.controller';

const authRoutes = express.Router();

authRoutes.post('/user/signup', signUpUserMiddleware, signUpUserController);
authRoutes.post('/user/signin', signInUserMiddleware, signInUserController);

export default authRoutes;