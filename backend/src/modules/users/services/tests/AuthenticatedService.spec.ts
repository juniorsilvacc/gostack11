import { AppError } from '../../../../config/errors/AppError';
import { InMemoryBcryptProviderImplementations } from '../../../../shared/providers/bcrypt/in-memory/InMemoryBcryptProviderImplementations';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { AuthenticatedService } from '../AuthenticatedService';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryBcryptProviderImplementations;
let authenticated: AuthenticatedService;

describe('Authenticated', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashProvider = new InMemoryBcryptProviderImplementations();
    authenticated = new AuthenticatedService(
      inMemoryUsersRepository,
      inMemoryHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'JúniorSilva',
      email: 'junior@hotmail.com',
      password: '123456',
    });

    const response = await authenticated.execute({
      email: 'junior@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.name).toBe(user.name);
    expect(response.email).toBe(user.email);
  });

  it('should not be able to authenticate with non existent user', async () => {
    await expect(
      authenticated.execute({
        email: 'junior@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'JúniorSilva',
      email: 'junior@hotmail.com',
      password: '123456',
    });

    await expect(
      authenticated.execute({
        email: 'junior@hotmail.com',
        password: '123654',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
