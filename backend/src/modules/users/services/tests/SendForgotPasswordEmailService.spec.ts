import { AppError } from '../../../../config/errors/AppError';
import { InMemoryMailProviderImplementations } from '../../../../shared/providers/mail/in-memory/InMemoryMailProviderImplementations';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { InMemoryUsersTokenRepository } from '../../repositories/in-memory/InMemoryUsersTokenRepository';
import { SendForgotPasswordEmailService } from '../SendForgotPasswordEmailService';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryMailProvider: InMemoryMailProviderImplementations;
let inMemoryUsersTokenRepository: InMemoryUsersTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('Send Forgot Password', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryMailProvider = new InMemoryMailProviderImplementations();
    inMemoryUsersTokenRepository = new InMemoryUsersTokenRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      inMemoryUsersRepository,
      inMemoryMailProvider,
      inMemoryUsersTokenRepository,
    );
  });

  it('should be able to send forgot password email', async () => {
    const sendMail = jest.spyOn(inMemoryMailProvider, 'sendMail');

    await inMemoryUsersRepository.create({
      name: 'JúniorSilva',
      email: 'junior@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'junior@hotmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'junior@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(inMemoryUsersTokenRepository, 'generate');

    const user = await inMemoryUsersRepository.create({
      name: 'JúniorSilva',
      email: 'junior@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'junior@hotmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
