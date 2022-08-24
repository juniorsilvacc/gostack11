import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUsersTokenRepository } from '../../repositories/in-memory/InMemoryUsersTokenRepository';
import { ResetPasswordService } from '../ResetPasswordService';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUsersTokenRepository: InMemoryUsersTokenRepository;
let resetPassword: ResetPasswordService;

describe('Reset Password', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokenRepository = new InMemoryUsersTokenRepository();
    resetPassword = new ResetPasswordService(
      inMemoryUsersRepository,
      inMemoryUsersTokenRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'JúniorSilva',
      email: 'junior@hotmail.com',
      password: '123456',
    });

    const { token } = await inMemoryUsersTokenRepository.generate(user.id);

    await resetPassword.execute({
      password: '654321',
      token,
    });

    const updateUser = await inMemoryUsersRepository.findById(user.id);

    expect(updateUser.password).toBe('654321');
  });
});
