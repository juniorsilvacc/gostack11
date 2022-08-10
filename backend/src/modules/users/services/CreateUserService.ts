import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../models/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

class CreateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const checkUser = await this.usersRepository.findByEmail(email);

    if (checkUser) {
      throw new Error('User already exists');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export { CreateUserService };
