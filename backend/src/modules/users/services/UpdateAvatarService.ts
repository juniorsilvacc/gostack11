import { IUsersRepository } from '../repositories/IUsersRepository';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../../config/upload';
import { User } from '../models/User';

interface IRequest {
  user_id: string;
  image: string;
}

class UpdateAvatarService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ user_id, image }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = image;

    return await this.usersRepository.save(user);
  }
}

export { UpdateAvatarService };
