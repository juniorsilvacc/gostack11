import { AppError } from '../../../../config/errors/AppError';
import { InMemoryStorageProviderImplementations } from '../../../../shared/providers/storege/in-memory/InMemoryStorageProviderImplementations';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { UpdateAvatarService } from '../UpdateAvatarService';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStorageProvider: InMemoryStorageProviderImplementations;
let updateAvatar: UpdateAvatarService;

describe('UpdateAvatar', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStorageProvider = new InMemoryStorageProviderImplementations();
    updateAvatar = new UpdateAvatarService(
      inMemoryUsersRepository,
      inMemoryStorageProvider,
    );
  });

  it('should upload avatar', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'JuniorSilva',
      email: 'junior@gmail.com',
      password: '123456',
    });

    await updateAvatar.execute({
      user_id: user.id,
      image: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to upload avatar from non existing user', async () => {
    await expect(
      updateAvatar.execute({
        user_id: 'non-existing',
        image: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
