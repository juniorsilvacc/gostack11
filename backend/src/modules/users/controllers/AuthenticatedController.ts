import { Request, Response } from 'express';
import { UsersRepository } from '../repositories/implementations/UsersRepository';
import { AuthenticatedService } from '../services/AuthenticatedService';

class AuthenticatedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const authenticatedService = new AuthenticatedService(usersRepository);

    const user = await authenticatedService.execute({
      email,
      password,
    });

    return response.status(200).json(user);
  }
}

export { AuthenticatedController };
