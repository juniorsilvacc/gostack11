import { Request, Response } from 'express';
import { AppError } from '../../../config/errors/AppError';
import { DiskStorageProviderImplementations } from '../../../shared/providers/storege/implementations/DiskStorageProviderImplementations';
import { UsersRepository } from '../repositories/implementations/UsersRepository';
import { UpdateAvatarService } from '../services/UpdateAvatarService';

class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const usersRepository = new UsersRepository();
    const DiskStorageProvider = new DiskStorageProviderImplementations();
    const updateAvatarService = new UpdateAvatarService(
      usersRepository,
      DiskStorageProvider,
    );

    if (!request.file) {
      throw new AppError('Error: upload image');
    } else {
      const { filename: image } = request.file;

      const user = await updateAvatarService.execute({
        user_id,
        image,
      });

      delete user.password;

      return response.status(200).json(user);
    }
  }
}

export { UpdateAvatarController };
