import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../models/User';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import { AppError } from '../../../config/errors/AppError';

class CreateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const checkUser = await this.usersRepository.findByEmail(email);

    if (checkUser) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserService };
