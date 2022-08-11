import 'reflect-metadata';
import express from 'express';
import uploadConfig from './config/upload';
import './shared/infra/connection/typeorm';
import router from './shared/infra/routes';
const app = express();

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(router);

export default app;
