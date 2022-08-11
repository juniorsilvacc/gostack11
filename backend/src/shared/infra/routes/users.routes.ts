import { Router } from 'express';
import { AuthenticatedController } from '../../../modules/users/controllers/AuthenticatedController';
import { CreateUserController } from '../../../modules/users/controllers/CreateUserController';
import multer from 'multer';
import uploadConfig from '../../../config/upload';
import ensureAutenticated from '../middlewares/ensureAutenticated';
import { UpdateAvatarController } from '../../../modules/users/controllers/UpdateAvatarController';

const usersRouter = Router();

const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const authenticatedController = new AuthenticatedController();
const updateAvatarController = new UpdateAvatarController();

usersRouter.post('/create', createUserController.handle);

usersRouter.post('/session', authenticatedController.handle);

usersRouter.patch(
  '/avatar',
  ensureAutenticated,
  upload.single('avatar'),
  updateAvatarController.handle,
);

export default usersRouter;
