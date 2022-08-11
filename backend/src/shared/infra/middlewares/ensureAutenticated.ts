import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../config/auth';

interface IPayload {
  sub: string;
}

export default function ensureAutenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as IPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}
