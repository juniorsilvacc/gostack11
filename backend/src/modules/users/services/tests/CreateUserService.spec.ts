import { AppError } from '../../../../config/errors/AppError';
import { InMemoryBcryptProviderImplementations } from '../../../../shared/providers/bcrypt/in-memory/InMemoryBcryptProviderImplementations';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserService } from '../CreateUserService';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryBcryptProviderImplementations;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashProvider = new InMemoryBcryptProviderImplementations();
    createUser = new CreateUserService(
      inMemoryUsersRepository,
      inMemoryHashProvider,
    );
  });

  it('should create a new user', async () => {
    const user = await createUser.execute({
      name: 'JúniorSilva',
      email: 'junior@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'SilvaJunior',
      email: 'junior@hotmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'JúniorSilva',
        email: 'junior@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
