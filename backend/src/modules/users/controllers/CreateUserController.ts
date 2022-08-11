import { Request, Response } from 'express';
import { UsersRepository } from '../repositories/implementations/UsersRepository';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUserServices = new CreateUserService(usersRepository);

    const user = await createUserServices.execute({ name, email, password });

    delete user.password;

    return response.status(201).json(user);
  }
}

export { CreateUserController };
