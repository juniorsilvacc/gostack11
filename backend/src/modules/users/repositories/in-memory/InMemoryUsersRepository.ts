import { User } from '../../models/User';
import { IUsersRepository } from '../IUsersRepository';
import { v4 as uuid } from 'uuid';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export { InMemoryUsersRepository };
