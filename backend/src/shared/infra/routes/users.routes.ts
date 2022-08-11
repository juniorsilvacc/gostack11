import { Router } from 'express';
import { AuthenticatedController } from '../../../modules/users/controllers/AuthenticatedController';
import { CreateUserController } from '../../../modules/users/controllers/CreateUserController';

const usersRouter = Router();

const createUserController = new CreateUserController();
const authenticatedController = new AuthenticatedController();

usersRouter.post('/create', createUserController.handle);
usersRouter.post('/session', authenticatedController.handle);

export default usersRouter;
