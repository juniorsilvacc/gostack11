import { IUsersRepository } from '../repositories/IUsersRepository';
import { User } from '../models/User';
import { AppError } from '../../../config/errors/AppError';
import { IStorageProviderImplementations } from '../../../shared/providers/storege/IStorageProviderImplementations';

interface IRequest {
  user_id: string;
  image: string;
}

class UpdateAvatarService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly IStorageProvider: IStorageProviderImplementations,
  ) {}

  async execute({ user_id, image }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.IStorageProvider.deleteFile(user.avatar);
    }

    const filename = await this.IStorageProvider.saveFile(image);

    user.avatar = filename;

    return await this.usersRepository.save(user);
  }
}

export { UpdateAvatarService };
