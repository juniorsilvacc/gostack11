import { IUsersRepository } from '../repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import auth from '../../../config/auth';
import { AppError } from '../../../config/errors/AppError';
import { IBcryptProviderImplementations } from '../../../shared/providers/bcrypt/IBcryptProviderImplementations';

interface IRequest {
  email: string;
  password: string;
}

class AuthenticatedService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly bcryptHashProvider: IBcryptProviderImplementations,
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect', 401);
    }

    const passwordMatched = await this.bcryptHashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Email or password incorrect', 401);
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthenticatedService };
