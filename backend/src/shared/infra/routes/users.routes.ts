import { Router } from 'express';
import { CreateUserController } from '../../../modules/users/controllers/CreateUserController';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/create', createUserController.handle);

export default usersRouter;
