import { AppError } from '../../../../config/errors/AppError';
import { InMemoryMailProviderImplementations } from '../../../../shared/providers/mail/in-memory/InMemoryMailProviderImplementations';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { SendForgotPasswordEmailService } from '../SendForgotPasswordEmailService';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryMailProvider: InMemoryMailProviderImplementations;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('Send Forgot Password', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryMailProvider = new InMemoryMailProviderImplementations();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      inMemoryUsersRepository,
      inMemoryMailProvider,
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
});
