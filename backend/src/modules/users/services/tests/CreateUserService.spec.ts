import { AppError } from '../../../../config/errors/AppError';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserService } from '../CreateUserService';

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUser = new CreateUserService(inMemoryUsersRepository);
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
