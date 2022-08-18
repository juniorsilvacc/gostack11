import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { AuthenticatedService } from '../AuthenticatedService';
import { CreateUserService } from '../CreateUserService';

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticated: AuthenticatedService;
let createUser: CreateUserService;

describe('Authenticated', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUser = new CreateUserService(inMemoryUsersRepository);
    authenticated = new AuthenticatedService(inMemoryUsersRepository);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
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
});
