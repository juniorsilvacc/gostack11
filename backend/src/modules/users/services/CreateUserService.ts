import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../models/User';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { AppError } from '../../../config/errors/AppError';
import { IBcryptProviderImplementations } from '../../../shared/providers/bcrypt/IBcryptProviderImplementations';

class CreateUserService {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly bcryptHashProvider: IBcryptProviderImplementations,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const checkUser = await this.usersRepository.findByEmail(email);

    if (checkUser) {
      throw new AppError('User already exists');
    }

    const passwordHash = await this.bcryptHashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserService };
