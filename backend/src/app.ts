import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from './config/upload';
import './shared/infra/connection/typeorm';
import { AppError } from './config/errors/AppError';
import router from './shared/infra/routes';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.directory));

app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
